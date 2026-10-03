import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { db } from './connection.ts'

const migrationsDir = fileURLToPath(new URL('./migrations/', import.meta.url))

/** Applies every .sql file in ./migrations that has not been applied yet, in filename order. */
export function runMigrations(): string[] {
  db.exec(
    `CREATE TABLE IF NOT EXISTS schema_migrations (
       name TEXT PRIMARY KEY,
       applied_at TEXT NOT NULL DEFAULT (datetime('now'))
     )`,
  )

  const applied = new Set(
    db
      .prepare('SELECT name FROM schema_migrations')
      .all()
      .map((row) => String(row.name)),
  )

  const files = readdirSync(migrationsDir)
    .filter((file) => file.endsWith('.sql'))
    .sort()

  const ran: string[] = []

  for (const file of files) {
    if (applied.has(file)) continue

    db.exec('BEGIN')
    try {
      db.exec(readFileSync(migrationsDir + file, 'utf8'))
      db.prepare('INSERT INTO schema_migrations (name) VALUES (?)').run(file)
      db.exec('COMMIT')
      ran.push(file)
    } catch (error) {
      db.exec('ROLLBACK')
      throw new Error(`Migration ${file} failed`, { cause: error })
    }
  }

  return ran
}
