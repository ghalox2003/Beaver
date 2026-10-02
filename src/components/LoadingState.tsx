import { LoaderCircle } from 'lucide-react'

type LoadingStateProps = {
  message?: string
}

function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <div
      className="flex min-h-64 flex-col items-center justify-center gap-4 text-center"
      role="status"
      aria-live="polite"
    >
      <LoaderCircle className="animate-spin text-forest-700" size={30} />
      <p className="text-sm font-medium text-forest-900/60">{message}</p>
    </div>
  )
}

export default LoadingState
