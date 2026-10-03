import { Router } from 'express'
import { db } from '../db/connection.ts'

export const healthRouter = Router()

healthRouter.get('/', (_req, res) => {
  let database: 'ok' | 'error' = 'ok'
  try {
    db.prepare('SELECT 1').get()
  } catch {
    database = 'error'
  }

  res.status(database === 'ok' ? 200 : 503).json({
    status: database === 'ok' ? 'ok' : 'degraded',
    service: 'beaver-api',
    database,
    time: new Date().toISOString(),
  })
})
