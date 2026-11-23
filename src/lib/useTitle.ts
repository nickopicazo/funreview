import { useEffect } from "react"
import { SITE_DESCRIPTION, SITE_TITLE } from "./seo.ts"

type TitleOptions = {
  description?: string
  noindex?: boolean
}

function meta(selector: string, attributes: Record<string, string>, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement("meta")
    for (const [key, value] of Object.entries(attributes)) el.setAttribute(key, value)
    document.head.appendChild(el)
  }
  el.content = content
}

function canonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement("link")
    el.rel = "canonical"
    document.head.appendChild(el)
  }
  el.href = href
}

function apply(title: string, description: string, robots: string, url: string) {
  document.title = title
  meta('meta[name="description"]', { name: "description" }, description)
  meta('meta[property="og:title"]', { property: "og:title" }, title)
  meta('meta[property="og:description"]', { property: "og:description" }, description)
  meta('meta[name="twitter:title"]', { name: "twitter:title" }, title)
  meta('meta[name="twitter:description"]', { name: "twitter:description" }, description)
  meta('meta[name="robots"]', { name: "robots" }, robots)
  meta('meta[property="og:url"]', { property: "og:url" }, url)
  canonical(url)
}

export function useTitle(title: string, options?: TitleOptions) {
  const description = options?.description ?? SITE_DESCRIPTION
  const noindex = options?.noindex === true

  useEffect(() => {
    const url = `${location.origin}${location.pathname}`
    apply(title, description, noindex ? "noindex" : "index, follow", url)
    return () => {
      apply(SITE_TITLE, SITE_DESCRIPTION, "index, follow", `${location.origin}/`)
    }
  }, [title, description, noindex])
}
