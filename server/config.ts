const DAY_MS = 24 * 60 * 60 * 1000

export const config = {
  port: Number(process.env.PORT ?? 3001),
  isProduction: process.env.NODE_ENV === 'production',
  databasePath: process.env.DATABASE_PATH || 'data/beaver.db',
  sessionCookieName: 'beaver_session',
  sessionTtlMs: 7 * DAY_MS,
} as const
