import express from 'express'
import type { ErrorRequestHandler } from 'express'
import { adminRouter } from './routes/admin.ts'
import { authRouter } from './routes/auth.ts'
import { healthRouter } from './routes/health.ts'
import { marketplaceRouter } from './routes/marketplace.ts'
import { quoteRequestsRouter } from './routes/quoteRequests.ts'

export function createApp() {
  const app = express()

  app.disable('x-powered-by')
  // The API sits behind the Vite dev proxy / ngrok, so trust one proxy hop for the real client IP.
  app.set('trust proxy', 1)

  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff')
    next()
  })
  app.use(express.json({ limit: '100kb' }))

  app.use('/api/health', healthRouter)
  app.use('/api/auth', authRouter)
  app.use('/api/admin', adminRouter)
  app.use('/api', marketplaceRouter)
  app.use('/api/quote-requests', quoteRequestsRouter)

  app.use('/api', (_req, res) => {
    res.status(404).json({ error: 'Not found' })
  })

  // Express only treats a handler as an error handler if it declares 4 parameters.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    const status = typeof err?.status === 'number' ? err.status : 500

    // Client mistakes (e.g. malformed JSON, body too large) get a generic 4xx, never internals.
    if (status >= 400 && status < 500) {
      res.status(status).json({ error: 'Invalid request.', code: 'bad_request' })
      return
    }

    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
  app.use(errorHandler)

  return app
}
