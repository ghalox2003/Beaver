import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { config } from '../config.ts'

mkdirSync(dirname(config.databasePath), { recursive: true })

export const db = new DatabaseSync(config.databasePath)

db.exec('PRAGMA journal_mode = WAL')
db.exec('PRAGMA foreign_keys = ON')
