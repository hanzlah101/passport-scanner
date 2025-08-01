import {
  UserIcon,
  FingerprintIcon,
  CalendarIcon,
  BadgeCheckIcon,
  GlobeIcon,
  HashIcon,
  ShieldCheckIcon,
  VenusIcon,
  ClockIcon,
  FileTextIcon,
  MarsIcon
} from "lucide-react"

const MRZ_FIELD_ICONS = {
  fullName: UserIcon,
  documentCode: FileTextIcon,
  issuingState: GlobeIcon,
  documentNumber: HashIcon,
  documentNumberCheckDigit: ShieldCheckIcon,
  nationality: GlobeIcon,
  birthDate: CalendarIcon,
  birthDateCheckDigit: ShieldCheckIcon,
  sex: VenusIcon,
  expirationDate: ClockIcon,
  expirationDateCheckDigit: ShieldCheckIcon,
  personalNumber: FingerprintIcon,
  personalNumberCheckDigit: ShieldCheckIcon,
  compositeCheckDigit: BadgeCheckIcon,
  default: HashIcon
}

export function getMrzFieldIcon(field: string | null, value: string | null) {
  switch (field) {
    case "sex":
      if (!value) return MRZ_FIELD_ICONS.sex
      return value.toLowerCase() === "female" ? VenusIcon : MarsIcon
    default:
      return (
        MRZ_FIELD_ICONS[field as keyof typeof MRZ_FIELD_ICONS] ??
        MRZ_FIELD_ICONS.default
      )
  }
}
