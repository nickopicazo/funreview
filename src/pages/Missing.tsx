import { Button } from "../components/Button.tsx"
import { PageEnter } from "../components/PageEnter.tsx"
import { paths } from "../lib/routes.ts"
import { useTitle } from "../lib/useTitle.ts"

export function Missing({
  title = "Hindi mahanap",
  body = "Wala ang pahinang iyan.",
}: {
  title?: string
  body?: string
}) {
  useTitle("FunReview")
  return (
    <PageEnter>
      <h1>{title}</h1>
      <p>{body}</p>
      <Button to={paths.home} block>
        Bumalik sa simula
      </Button>
    </PageEnter>
  )
}
