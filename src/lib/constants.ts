import type { FieldName } from "mrz"

export const MAX_IMAGE_SIZE = 10 * 1024 * 1024 // 5 MB

export const PASSPORT_TERMS = [
  "passport",
  "passeport",
  "reisepass",
  "pasaporte",
  "passaporto",
  "паспорт",
  "republic",
  "république",
  "bundesrepublik",
  "república",
  "repubblica",
  "nationality",
  "nationalité",
  "staatsangehörigkeit",
  "nacionalidad",
  "date",
  "birth",
  "expiry",
  "mrz",
  "given",
  "surname",
  "nom",
  "name",
  "document",
  "dokument",
  "documento",
  "documento"
]

export const LANGUAGES = ["eng", "fra", "spa", "ara", "chi_sim", "urd"]

export const REQUIRED_PASSPORT_FIELDS: FieldName[] = [
  "firstName",
  "documentNumber",
  "nationality",
  "expirationDate"
]
