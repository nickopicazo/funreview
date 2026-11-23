import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App.tsx"
import { ErrorBoundary } from "./components/ErrorBoundary.tsx"
import { AppStateProvider } from "./lib/appState.tsx"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppStateProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </AppStateProvider>
    </BrowserRouter>
  </StrictMode>,
)
