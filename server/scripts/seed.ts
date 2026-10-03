import { randomBytes } from 'node:crypto'
import { runMigrations } from '../db/migrate.ts'
import { createUser, findUserByEmail } from '../db/users.ts'
import type { UserRole } from '../db/users.ts'
import { hashPassword } from '../lib/password.ts'

runMigrations()

// One shared password for the seeded accounts. Set SEED_PASSWORD in .env to choose it;
// otherwise a random one is generated and printed once. Never commit real passwords.
const generated = !process.env.SEED_PASSWORD
const password = process.env.SEED_PASSWORD || randomBytes(9).toString('base64url')

const accounts: { email: string; fullName: string; role: UserRole }[] = [
  { email: 'admin@beaver.test', fullName: 'Beaver Admin', role: 'admin' },
  { email: 'client@beaver.test', fullName: 'Demo Client', role: 'client' },
  { email: 'pro@beaver.test', fullName: 'Demo Professional', role: 'professional' },
]

let created = 0
for (const account of accounts) {
  if (findUserByEmail(account.email)) {
    console.log(`exists   ${account.email}`)
    continue
  }
  createUser({ ...account, passwordHash: await hashPassword(password) })
  console.log(`created  ${account.email} (${account.role})`)
  created++
}

if (created > 0) {
  console.log(generated ? `\nPassword for new accounts (shown once): ${password}` : '\nNew accounts use SEED_PASSWORD from .env.')
}
