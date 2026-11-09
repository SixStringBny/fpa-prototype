/**
 * Resolve a file in `public/` against Vite's configured base path. This keeps
 * local development at `/` and GitHub Pages at `/fpa-prototype/` working with
 * the same source.
 */
export function asset(path: string): string {
  if (!path) return path
  if (/^(https?:)?\/\//.test(path)) return path
  const base = import.meta.env.BASE_URL
  return `${base}${path.replace(/^\/+/, '')}`
}
