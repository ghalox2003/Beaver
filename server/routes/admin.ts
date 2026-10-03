import { Router } from 'express'
import { db } from '../db/connection.ts'
import { requireRole } from '../middleware/auth.ts'

export const adminRouter = Router()

adminRouter.get('/stats', ...requireRole('admin'), (_req, res) => {
  const counts = { client: 0, professional: 0, admin: 0 }

  for (const row of db.prepare('SELECT role, COUNT(*) AS count FROM users GROUP BY role').all()) {
    const role = String(row.role) as keyof typeof counts
    if (role in counts) counts[role] = Number(row.count)
  }

  res.json({ users: { total: counts.client + counts.professional + counts.admin, ...counts } })
})
