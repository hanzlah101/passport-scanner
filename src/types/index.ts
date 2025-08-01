import type { FieldName } from "mrz"

export type ExtendedFile = File & {
  preview: string
  width: number
  height: number
}

export type LoadingState =
  | { status: "idle"; progress: null }
  | { status: "initializing"; progress: 0 }
  | { status: "recognizing"; progress: number }
  | { status: "done"; progress: 100 }

export type PassportInfo = {
  details: ValidDetails[]
  mzn: string[]
  text: string
}

export type ValidDetails = {
  field: FieldName
  value: string
  label: string
}
