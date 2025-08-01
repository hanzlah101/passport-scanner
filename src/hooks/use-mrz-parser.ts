import { parse } from "mrz"
import { useCallback, useState, useRef } from "react"
import { createWorker, PSM, type Worker } from "tesseract.js"
import { processPassportDetails } from "@/lib/formatters"
import type { LoadingState, PassportInfo, ExtendedFile } from "@/types"
import {
  LANGUAGES,
  PASSPORT_TERMS,
  REQUIRED_PASSPORT_FIELDS
} from "@/lib/constants"

export const useMRZParser = () => {
  const [file, setFile] = useState<ExtendedFile | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<PassportInfo>()
  const [loading, setLoading] = useState<LoadingState>({
    status: "idle",
    progress: null
  })

  const workerRef = useRef<Worker | null>(null)

  const preprocessImage = async (file: ExtendedFile) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new window.Image()

    if (!ctx) throw new Error("Canvas context missing.")

    img.crossOrigin = "anonymous"

    await new Promise((resolve, reject) => {
      img.onload = resolve
      img.onerror = reject
      img.src = file.preview
    })

    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
      const gray = Math.round(
        0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
      )
      const contrast = 1.5
      const factor =
        (259 * (contrast * 255 + 255)) / (255 * (259 - contrast * 255))
      const newGray = Math.min(255, Math.max(0, factor * (gray - 128) + 128))
      data[i] = data[i + 1] = data[i + 2] = newGray
    }

    ctx.putImageData(imageData, 0, 0)
    return canvas.toDataURL()
  }

  const parseMRZ = (text: string) => {
    try {
      const lines = text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)

      if (lines.length < 2) {
        setError("MRZ not detected. Ensure the passport is clearly visible.")
        return
      }

      const firstMRZIndex = lines.findIndex((line) => {
        const cleaned = line.replace(/\s/g, "")
        return (
          cleaned.length >= 44 &&
          cleaned.includes("<") &&
          /[A-Z]/.test(cleaned) &&
          cleaned.split("<").length >= 3
        )
      })

      if (firstMRZIndex === -1 || firstMRZIndex + 1 >= lines.length) {
        setError(
          "Incomplete or missing MRZ. Ensure both MRZ lines are visible."
        )
        return
      }

      const mrzLines = [
        lines[firstMRZIndex].replace(/\s/g, "").slice(0, 44),
        lines[firstMRZIndex + 1].replace(/\s/g, "").slice(0, 44)
      ]

      const result = parse(mrzLines)

      if (!result.details.length) {
        setError("Invalid MRZ. Ensure the passport is clearly visible.")
        return
      }

      const missingFields = REQUIRED_PASSPORT_FIELDS.filter(
        (field) =>
          !result.details.some((d) => d.field === field && d.value?.trim())
      ).map((field) => {
        const label = result.details.find((d) => d.field === field)?.label
        return label ?? field
      })

      if (missingFields.length) {
        setError(`Missing required fields: ${missingFields.join(", ")}`)
        return
      }

      return { details: processPassportDetails(result.details), mzn: mrzLines }
    } catch {
      setError("Failed to parse MRZ. Try a clearer image.")
    }
  }

  const parseImage = useCallback(async (inputFile: ExtendedFile) => {
    if (!inputFile) return

    setError(null)
    setData(undefined)
    setFile(inputFile)
    setLoading({ status: "initializing", progress: 0 })

    try {
      const worker = await createWorker(LANGUAGES, 1, {
        logger: ({ status, progress }) => {
          if (status === "recognizing text") {
            setLoading({
              status: "recognizing",
              progress: 10 + Math.round(Math.min(progress / 0.7, 1) * 80)
            })
          }
        }
      })

      workerRef.current = worker

      await worker.setParameters({
        tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
        preserve_interword_spaces: "1",
        tessedit_char_whitelist:
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>/-., "
      })

      const imgData = await preprocessImage(inputFile)
      const { data } = await worker.recognize(imgData)

      setLoading({ status: "recognizing", progress: 90 })

      await worker.terminate()
      workerRef.current = null

      const { text, confidence } = data

      if (!text.trim()) {
        setError("No text found. Try a clearer image.")
        return
      }

      if (confidence < 30) {
        setError("Image too blurry.")
        return
      }

      const foundKeywords = PASSPORT_TERMS.filter((term) =>
        text.toLowerCase().includes(term)
      )

      if (foundKeywords.length < 1 && !/</.test(text)) {
        setError("Invalid passport. Make sure the passport is clearly visible.")
        return
      }

      const details = parseMRZ(text)
      if (details) {
        setData({ text, ...details })
        setLoading({ status: "done", progress: 100 })
        setError(null)

        setTimeout(() => {
          setLoading({ status: "idle", progress: null })
        }, 500)
      }
    } catch {
      setError("Unexpected error occurred.")
    } finally {
      setLoading((prev) =>
        prev.status !== "done" ? { status: "idle", progress: null } : prev
      )
    }
  }, [])

  const reset = useCallback(async () => {
    setFile(null)
    setError(null)
    setData(undefined)
    setLoading({ status: "idle", progress: null })
    if (workerRef.current) {
      await workerRef.current.terminate()
      workerRef.current = null
    }
  }, [])

  const retry = useCallback(async () => {
    if (file) await parseImage(file)
  }, [file, parseImage])

  return {
    parseImage,
    file,
    error,
    loading,
    data,
    reset,
    retry,
    isParsing: loading.status !== "idle"
  }
}
