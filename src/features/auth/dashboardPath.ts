import type { UserRole } from './types'

const dashboardByRole: Record<UserRole, string> = {
  client: '/client',
  professional: '/professional',
  admin: '/admin',
}

export function dashboardPathForRole(role: UserRole): string {
  return dashboardByRole[role]
}
