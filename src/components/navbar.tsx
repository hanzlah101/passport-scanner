import { Logo } from "./logo"
import { ModeToggle } from "./mode-toggle"

export function Navbar() {
  return (
    <nav className="bg-background/60 sticky inset-x-0 top-0 z-50 flex items-center justify-between gap-4 border-b px-4 py-5 backdrop-blur-sm">
      <Logo />
      <ModeToggle />
    </nav>
  )
}
