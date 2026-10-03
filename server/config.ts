export const config = {
  port: Number(process.env.PORT ?? 3001),
  isProduction: process.env.NODE_ENV === 'production',
  databasePath: process.env.DATABASE_PATH || 'data/beaver.db',
} as const
