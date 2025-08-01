"use client"

import { cn } from "@/lib/utils"
import { UploadIcon } from "lucide-react"
import { motion } from "motion/react"
import { useDropzone } from "react-dropzone"
import { MAX_IMAGE_SIZE } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { type ExtendedFile } from "@/types"

type UploadDropzoneProps = {
  onChange: (file: ExtendedFile) => Promise<void>
}

export const UploadDropzone = ({ onChange }: UploadDropzoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    accept: { "image/*": [] },
    maxFiles: 1,
    maxSize: MAX_IMAGE_SIZE,
    onDrop: (files) => {
      const file = files[0]
      if (!file) return

      const objectUrl = URL.createObjectURL(file)
      const img = new Image()

      img.onload = async () => {
        Object.assign(file, {
          preview: objectUrl,
          width: img.width,
          height: img.height
        })
        await onChange(file as unknown as ExtendedFile)
      }

      img.src = objectUrl
    },
    onDropRejected: (error) => {
      console.log(error)
    }
  })

  return (
    <div
      className={cn(
        "mx-auto my-auto flex aspect-video w-full max-w-xl cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed text-center transition-all duration-200",
        isDragActive
          ? "border-primary bg-primary/5 scale-105"
          : "border-muted-foreground/25 hover:bg-primary/5 hover:border-primary/50"
      )}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <motion.div
        transition={{ duration: 0.2 }}
        animate={{ scale: isDragActive ? 1.2 : 1 }}
        className={cn(
          "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full",
          isDragActive
            ? "bg-primary text-primary-foreground"
            : "bg-primary/10 dark:bg-primary/15 text-primary"
        )}
      >
        <UploadIcon className="size-8" />
      </motion.div>
      <h3 className="mb-0.5 text-lg font-semibold">
        Drop your passport image here
      </h3>
      <p className="text-muted-foreground mb-6">or click to browse files</p>
      <Button size="lg">Choose File</Button>
    </div>
  )
}
