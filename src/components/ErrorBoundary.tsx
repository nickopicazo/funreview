import { Component, type ReactNode } from "react"
import { Button } from "./Button.tsx"
import { SpeechBubble } from "./SpeechBubble.tsx"

type State = { failed: boolean }

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <main className="page">
        <h1>Something went wrong</h1>
        <SpeechBubble speaker="ana" text="Something went wrong." />
        <SpeechBubble speaker="ben" text="A reload should fix it." />
        <div className="stack">
          <Button block onClick={() => window.location.reload()}>
            Reload
          </Button>
          <Button variant="blue" block to="/">
            Home
          </Button>
        </div>
      </main>
    )
  }
}
