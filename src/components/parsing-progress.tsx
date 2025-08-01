"use client"

import { memo } from "react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TextShimmer } from "@/components/ui/text-shimmer"
import { Card, CardContent } from "@/components/ui/card"
import { type LoadingState } from "@/types"

type ParsingProgressProps = LoadingState & {
  onCancel: () => void
}

export function ParsingProgress({
  progress,
  status,
  onCancel
}: ParsingProgressProps) {
  return (
    <Card className="items-center justify-center">
      <CardContent className="flex w-full flex-col items-center justify-center space-y-6">
        <div className="w-full text-center">
          <TextShimmer className="mb-4 text-lg font-medium capitalize">{`${status}...`}</TextShimmer>
          <Progress value={progress} className="mx-auto w-full max-w-sm" />
          <p className="text-muted-foreground mt-2 text-sm">
            {Math.round(progress ?? 0)}% complete
          </p>
        </div>

        <div className="space-y-2 text-center">
          <motion.div
            className="text-muted-foreground inline-flex items-center gap-2 text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            <motion.div
              className="bg-primary size-2 shrink-0 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
            />
            Analyzing document structure
          </motion.div>
        </div>

        <Button variant="destructive" onClick={onCancel} className="px-8">
          Cancel Processing
        </Button>
      </CardContent>
    </Card>
  )
}

function ImageScannerComponent() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Scanning line that goes back and forth */}
      <motion.div
        className="via-primary shadow-primary/50 absolute right-0 left-0 h-1 bg-gradient-to-r from-transparent to-transparent shadow-lg"
        initial={{ top: "0%" }}
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut"
        }}
      />

      {/* Scanning overlay that follows the line */}
      <motion.div
        className="from-primary/10 absolute inset-0 bg-gradient-to-b via-transparent to-transparent"
        initial={{ scaleY: 0, transformOrigin: "top" }}
        animate={{
          scaleY: [0, 1, 0],
          transformOrigin: ["top", "top", "bottom"]
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut"
        }}
      />

      {/* Corner brackets */}
      <div className="absolute inset-4">
        <motion.div
          className="border-primary absolute top-0 left-0 h-8 w-8 border-t-2 border-l-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <motion.div
          className="border-primary absolute top-0 right-0 h-8 w-8 border-t-2 border-r-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <motion.div
          className="border-primary absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
        <motion.div
          className="border-primary absolute right-0 bottom-0 h-8 w-8 border-r-2 border-b-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
      </div>

      {/* Pulse effect */}
      <motion.div
        className="border-primary/30 absolute inset-0 rounded-lg border-2"
        initial={{ scale: 1, opacity: 0.5 }}
        animate={{ scale: [1, 1.02, 1], opacity: [0.5, 0.2, 0.5] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  )
}

export const ImageScanner = memo(ImageScannerComponent)
