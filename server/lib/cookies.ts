/** Minimal Cookie header parser (we only need to read one cookie, so no extra dependency). */
export function parseCookies(header: string | undefined): Record<string, string> {
  const cookies = Object.create(null) as Record<string, string>
  if (!header) return cookies

  for (const part of header.split(';')) {
    const separator = part.indexOf('=')
    if (separator < 0) continue
    const key = part.slice(0, separator).trim()
    const value = part.slice(separator + 1).trim()
    if (!key) continue
    try {
      cookies[key] = decodeURIComponent(value)
    } catch {
      cookies[key] = value
    }
  }

  return cookies
}
