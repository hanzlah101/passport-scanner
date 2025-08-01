"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { UploadDropzone } from "@/components/upload-dropzone"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"
import { useMRZParser } from "@/hooks/use-mrz-parser"
import { ImageScanner, ParsingProgress } from "@/components/parsing-progress"
import { ParsingError } from "@/components/parsing-error"
import { PassportDetails } from "@/components/passport-details"

export default function Home() {
  const { data, file, error, parseImage, retry, reset, loading, isParsing } =
    useMRZParser()

  if (!file) {
    return <UploadDropzone onChange={parseImage} />
  }

  return (
    <main className="grid gap-4 md:grid-cols-2">
      <div className="space-y-4">
        <div className="group relative overflow-hidden rounded-xl">
          <Image
            width={file.width}
            height={file.height}
            src={file.preview}
            alt="Uploaded Passport"
            className={cn("bg-card w-full rounded-xl object-contain", {
              "opacity-70 grayscale": isParsing
            })}
          />
          {isParsing && <ImageScanner />}

          {!isParsing && (
            <Button
              size="icon"
              variant="destructive"
              onClick={reset}
              className="absolute top-2 right-2 z-10 size-6 opacity-0 group-hover:opacity-100"
            >
              <XIcon />
              <span className="sr-only">Remove image</span>
            </Button>
          )}
        </div>
      </div>

      {isParsing ? (
        <ParsingProgress onCancel={reset} {...loading} />
      ) : error || !data ? (
        <ParsingError
          error={error ?? "Unexpected error occurred."}
          onRetry={retry}
          onReset={reset}
        />
      ) : (
        <PassportDetails onReset={reset} onRetry={retry} {...data} />
      )}
    </main>
  )
}
