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
        <Route path="quarter/:quarterId" element={<QuarterPage />} />
        <Route path="quarter/:quarterId/:subjectId" element={<SubjectPage />} />
        <Route path="quarter/:quarterId/:subjectId/:weekId" element={<WeekPage />} />
        <Route
          path="quarter/:quarterId/:subjectId/:weekId/:activityId"
          element={<ActivityPage />}
        />
        <Route path="map" element={<MapPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  )
}
