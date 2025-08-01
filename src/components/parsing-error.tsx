"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangleIcon, RefreshCwIcon, XIcon } from "lucide-react"
import { Button } from "./ui/button"

type ParsingErrorProps = {
  error: string
  onRetry: () => void
  onReset: () => void
}

export function ParsingError({ error, onRetry, onReset }: ParsingErrorProps) {
  return (
    <Card className="border-destructive/40 bg-destructive/10 text-destructive h-full items-center justify-center">
      <CardContent className="flex h-full flex-col items-center justify-center text-center">
        <div className="bg-destructive/20 flex size-10 shrink-0 items-center justify-center rounded-full">
          <AlertTriangleIcon className="size-6" />
        </div>

        <h2 className="mt-2 text-lg font-semibold">
          Failed to parse the image.
        </h2>

        <p className="text-destructive/70 text-sm">{error}</p>

        <div className="mt-4 flex items-center gap-3">
          <Button variant="destructive" onClick={onRetry}>
            <RefreshCwIcon />
            Try Again
          </Button>
          <Button
            variant="outline"
            onClick={onReset}
            className="border-destructive/20 dark:bg-destructive/10 dark:hover:bg-destructive/20 dark:border-destructive/20 bg-destructive/10 hover:bg-destructive/20 hover:text-destructive"
          >
            <XIcon />
            Upload New Image
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
