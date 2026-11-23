import { Link, Outlet } from "react-router-dom"
import { paths } from "../lib/routes.ts"
import { MuteButton } from "./MuteButton.tsx"

export function AppShell() {
  return (
    <>
      <a className="skip" href="#nilalaman">
        Tumalon sa nilalaman
      </a>
      <header className="topbar">
        <Link className="brand" to={paths.home}>
          FunReview
        </Link>
        <div className="top-actions">
          <Link className="icon-btn" to={paths.map}>
            Mapa
          </Link>
          <Link className="icon-btn" to={paths.settings}>
            Setting
          </Link>
          <MuteButton />
        </div>
      </header>
      <main id="nilalaman">
        <Outlet />
      </main>
    </>
  )
}
