import { runMigrations } from '../db/migrate.ts'

const ran = runMigrations()
console.log(ran.length ? `Applied: ${ran.join(', ')}` : 'Database is up to date.')
