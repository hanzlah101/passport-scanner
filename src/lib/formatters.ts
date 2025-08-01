import sortBy from "lodash.sortby"
import countries from "i18n-iso-countries"
import en from "i18n-iso-countries/langs/en.json"
import { format, parse } from "date-fns"
import { ValidDetails } from "@/types"
import { Details, FieldName } from "mrz"

countries.registerLocale(en)

function formatCountry(code: string) {
  return countries.getName(code, "en", { select: "official" }) ?? code
}

function formatDate(date: string) {
  if (!/^\d{6}$/.test(date)) return date
  const year = parseInt(date.slice(0, 2), 10)
  const month = date.slice(2, 4)
  const day = date.slice(4, 6)

  const currentYear = new Date().getFullYear()
  const currentCentury = Math.floor(currentYear / 100) * 100
  const fullYear =
    year + currentCentury > currentYear + 10
      ? year + currentCentury - 100
      : year + currentCentury

  const parsed = parse(`${fullYear}-${month}-${day}`, "yyyy-MM-dd", new Date())
  return format(parsed, "dd MMM yyyy") // e.g. 18 Oct 2021
}

function formatSex(value: string) {
  const val = value.toLowerCase()
  if (val === "m" || val === "male") return "Male"
  if (val === "f" || val === "female") return "Female"
  return value
}

export function formatMrzFieldValue(field: string, value: string) {
  switch (field) {
    case "birthDate":
    case "expirationDate":
      return formatDate(value)
    case "nationality":
    case "issuingState":
      return formatCountry(value)
    case "sex":
      return formatSex(value)
    default:
      return value
  }
}

const PRIORITY_FIELDS: Record<string, number> = {
  fullName: 0,
  documentNumber: 2,
  birthDate: 3,
  sex: 4,
  nationality: 5,
  expirationDate: 6
}

export function processPassportDetails(details: Details[]) {
  const validDetails = details
    .filter((d) => !!d?.field && !!d?.value?.trim())
    .map((d) => ({
      field: d.field,
      value: d.value?.trim(),
      label: d.label
    })) as ValidDetails[]

  const firstName = validDetails.find((d) => d.field === "firstName")
  const lastName = validDetails.find((d) => d.field === "lastName")

  const processedDetails = validDetails.filter(
    (d) => d.field !== "firstName" && d.field !== "lastName"
  )

  if (firstName || lastName) {
    const fullNameValue = [firstName?.value, lastName?.value]
      .filter(Boolean)
      .join(" ")
      .trim()

    if (fullNameValue) {
      const fullNameDetail: ValidDetails = {
        field: "fullName" as FieldName,
        label: "Full Name",
        value: fullNameValue
      }
      processedDetails.unshift(fullNameDetail)
    }
  }

  const sortedDetails = sortBy(
    processedDetails,
    (d) => PRIORITY_FIELDS[d.field] ?? Number.MAX_SAFE_INTEGER
  )

  return sortedDetails
}
