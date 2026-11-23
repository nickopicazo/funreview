import type { ReactNode } from "react"
import { Link } from "react-router-dom"

type Variant = "gold" | "green" | "blue" | "coral" | "ghost"

type Props = {
  children: ReactNode
  variant?: Variant
  to?: string
  onClick?: () => void
  type?: "button" | "submit"
  disabled?: boolean
  block?: boolean
}

export function Button({
  children,
  variant = "gold",
  to,
  onClick,
  type = "button",
  disabled,
  block,
}: Props) {
  const className = `btn btn-${variant}${block ? " btn-block" : ""}`
  if (to) return <Link className={className} to={to}>{children}</Link>
  return (
    <button className={className} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
