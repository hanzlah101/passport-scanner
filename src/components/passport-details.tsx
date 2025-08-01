"use client"

import { useMemo } from "react"
import { FileTextIcon, HashIcon, RefreshCcwIcon } from "lucide-react"
import { getMrzFieldIcon } from "@/lib/icons"
import { formatMrzFieldValue } from "@/lib/formatters"
import { Button } from "@/components/ui/button"
import { type PassportInfo } from "@/types"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

type PassportDetailProps = PassportInfo & {
  onReset: () => void
  onRetry: () => void
}

export function PassportDetails({
  details,
  mzn,
  onReset,
  onRetry
}: PassportDetailProps) {
  const formattedFields = useMemo(() => {
    return details.map((detail) => ({
      label: detail.label,
      field: detail.field,
      value: formatMrzFieldValue(detail.field, detail.value),
      icon: getMrzFieldIcon(detail.field, detail.value)
    }))
  }, [details])

  return (
    <Card className="h-fit">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileTextIcon className="text-primary size-5" />
          Passport Information
        </CardTitle>
        <CardAction className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                onClick={onRetry}
                className="size-8"
              >
                <RefreshCcwIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Retry OCR</TooltipContent>
          </Tooltip>

          <Button variant="secondary" size="sm" onClick={onReset}>
            Upload New
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <ul className="space-y-4">
          {formattedFields.map((detail) => (
            <li
              key={detail.field}
              className="flex items-center justify-between gap-2 border-b pb-4 text-sm"
            >
              <div className="flex items-center gap-2">
                <div className="bg-primary/15 text-primary flex size-8 shrink-0 items-center justify-center rounded-full">
                  <detail.icon className="size-4.5" />
                </div>
                <span className="text-muted-foreground">{detail.label}</span>
              </div>

              <p>{detail.value}</p>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="flex-col items-start gap-3">
        <div className="flex items-center gap-2">
          <div className="bg-primary/15 text-primary flex size-8 shrink-0 items-center justify-center rounded-full">
            <HashIcon className="size-4.5" />
          </div>
          <p className="text-sm font-medium">Machine Readable Zone:</p>
        </div>
        <code className="bg-accent/80 w-full rounded-lg p-2.5 font-mono text-xs">
          {mzn.map((line) => (
            <p key={line} className="break-all">
              {line}
            </p>
          ))}
        </code>
      </CardFooter>
    </Card>
  )
}
