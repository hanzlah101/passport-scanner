import Link from "next/link"
import { ScanIcon } from "lucide-react"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="bg-primary flex size-8 items-center justify-center rounded-lg">
        <ScanIcon className="text-primary-foreground size-5" />
      </div>
      <span className="text-xl font-bold">PassportScan</span>
    </Link>
  )
}
