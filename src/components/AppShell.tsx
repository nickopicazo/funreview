import { Link, Outlet } from "react-router-dom"
import { paths } from "../lib/routes.ts"
import { MuteButton } from "./MuteButton.tsx"

export function AppShell() {
  return (
    <>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <header className="topbar">
        <Link className="brand" to={paths.home}>
          FunReview
        </Link>
        <div className="top-actions">
          <Link className="icon-btn" to={paths.map}>
            Map
          </Link>
          <Link className="icon-btn" to={paths.settings}>
            Grown-ups
          </Link>
          <MuteButton />
        </div>
      </header>
      <main id="content">
        <Outlet />
      </main>
    </>
  )
}
