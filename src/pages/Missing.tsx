import { Button } from "../components/Button.tsx"
import { PageEnter } from "../components/PageEnter.tsx"
import { paths } from "../lib/routes.ts"
import { useTitle } from "../lib/useTitle.ts"

export function Missing({
  title = "Page not found",
  body = "That page isn't here.",
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
        Back to the start
      </Button>
    </PageEnter>
  )
}
