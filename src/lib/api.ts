export type FieldErrors = Record<string, string>

export class ApiError extends Error {
  status: number
  code: string
  fields: FieldErrors

  constructor(status: number, message: string, code = 'error', fields: FieldErrors = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.fields = fields
  }
}

let sessionExpiredHandler: (() => void) | null = null

/** The auth provider registers here so any expired-session response can log the user out globally. */
export function onSessionExpired(handler: (() => void) | null) {
  sessionExpiredHandler = handler
}

type RequestOptions = { method?: string; body?: unknown }

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function toFieldErrors(value: unknown): FieldErrors {
  if (!isRecord(value)) return {}
  const result: FieldErrors = {}
  for (const [key, message] of Object.entries(value)) {
    if (typeof message === 'string') result[key] = message
  }
  return result
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const hasBody = options.body !== undefined
  let response: Response

  try {
    response = await fetch(`/api${path}`, {
      method: options.method ?? 'GET',
      credentials: 'same-origin',
      headers: hasBody ? { 'Content-Type': 'application/json' } : undefined,
      body: hasBody ? JSON.stringify(options.body) : undefined,
    })
  } catch {
    throw new ApiError(0, 'Cannot reach the server. Check your connection and try again.', 'network_error')
  }

  if (response.status === 204) return undefined as T

  const data: unknown = await response.json().catch(() => null)

  if (!response.ok) {
    const body = isRecord(data) ? data : {}
    const code = typeof body.code === 'string' ? body.code : 'error'
    const message = typeof body.error === 'string' ? body.error : 'Something went wrong. Please try again.'
    if (code === 'session_expired') sessionExpiredHandler?.()
    throw new ApiError(response.status, message, code, toFieldErrors(body.fields))
  }

  return data as T
}
