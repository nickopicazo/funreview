import { Route, Routes } from "react-router-dom"
import { AppShell } from "./components/AppShell.tsx"
import { ActivityPage } from "./pages/ActivityPage.tsx"
import { HomePage } from "./pages/HomePage.tsx"
import { MapPage } from "./pages/MapPage.tsx"
import { Missing } from "./pages/Missing.tsx"
import { QuarterPage } from "./pages/QuarterPage.tsx"
import { SettingsPage } from "./pages/SettingsPage.tsx"
import { SubjectPage } from "./pages/SubjectPage.tsx"
import { WeekPage } from "./pages/WeekPage.tsx"

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="markahan/:quarterId" element={<QuarterPage />} />
        <Route path="markahan/:quarterId/:subjectId" element={<SubjectPage />} />
        <Route path="markahan/:quarterId/:subjectId/:weekId" element={<WeekPage />} />
        <Route
          path="markahan/:quarterId/:subjectId/:weekId/:activityId"
          element={<ActivityPage />}
        />
        <Route path="mapa" element={<MapPage />} />
        <Route path="mga-setting" element={<SettingsPage />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  )
}
