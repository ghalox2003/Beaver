import { createApp } from './app.ts'
import { config } from './config.ts'
import { runMigrations } from './db/migrate.ts'
import { startSessionCleanup } from './db/sessions.ts'

const applied = runMigrations()
if (applied.length) console.log(`Applied migrations: ${applied.join(', ')}`)

startSessionCleanup()

createApp().listen(config.port, () => {
  console.log(`Beaver API listening on http://localhost:${config.port}`)
})
