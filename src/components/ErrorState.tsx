import { AlertCircle } from 'lucide-react'
import type { ReactNode } from 'react'

type ErrorStateProps = {
  title?: string
  message?: string
  action?: ReactNode
}

function ErrorState({
  title = 'Something went wrong',
  message = "We couldn't load this content. Please try again.",
  action,
}: ErrorStateProps) {
  return (
    <div
      className="flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center"
      role="alert"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-700">
        <AlertCircle size={22} />
      </div>

      <h2 className="mt-4 text-lg font-bold text-forest-900">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-forest-900/60">
        {message}
      </p>

      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export default ErrorState
