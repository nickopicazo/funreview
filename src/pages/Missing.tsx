import { Button } from "../components/Button.tsx"
import { PageEnter } from "../components/PageEnter.tsx"
import { paths } from "../lib/routes.ts"
import { SITE_TITLE } from "../lib/seo.ts"
import { useTitle } from "../lib/useTitle.ts"

export function Missing({
  title = "Oops!",
  body = "This page isn't here.",
}: {
  title?: string
  body?: string
}) {
  useTitle(SITE_TITLE, { description: "This page isn't here." })
  return (
    <PageEnter>
      <h1>{title}</h1>
      <p>{body}</p>
      <Button to={paths.home} block>
        ← Home
      </Button>
    </PageEnter>
  )
}
