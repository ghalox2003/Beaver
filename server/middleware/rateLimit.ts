import type { RequestHandler } from 'express'

type Options = { windowMs: number; max: number; message: string }

/** Simple in-memory fixed-window limiter per client IP. Fine for one server; use a shared store if we ever run several. */
export function rateLimit({ windowMs, max, message }: Options): RequestHandler {
  const hits = new Map<string, { count: number; resetAt: number }>()

  setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of hits) if (entry.resetAt <= now) hits.delete(key)
  }, windowMs).unref()

  return (req, res, next) => {
    const now = Date.now()
    const key = req.ip ?? 'unknown'

    let entry = hits.get(key)
    if (!entry || entry.resetAt <= now) {
      entry = { count: 0, resetAt: now + windowMs }
      hits.set(key, entry)
    }

    entry.count++
    if (entry.count > max) {
      res.setHeader('Retry-After', Math.ceil((entry.resetAt - now) / 1000))
      res.status(429).json({ error: message, code: 'rate_limited' })
      return
    }

    next()
  }
}
