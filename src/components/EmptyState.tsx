import type { LucideIcon } from 'lucide-react'
import { Inbox } from 'lucide-react'
import type { ReactNode } from 'react'

type EmptyStateProps = {
  title: string
  message: string
  icon?: LucideIcon
  action?: ReactNode
}

function EmptyState({
  title,
  message,
  icon: Icon = Inbox,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cream-dark text-forest-700">
        <Icon size={22} />
      </div>

      <h2 className="mt-4 text-lg font-bold text-forest-900">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-forest-900/60">
        {message}
      </p>

      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export default EmptyState
