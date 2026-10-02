import { CheckCircle2, X } from 'lucide-react'
import type { ReactNode } from 'react'

type ToastProps = {
  message: ReactNode
  onClose: () => void
}

function Toast({ message, onClose }: ToastProps) {
  return (
    <div
      className="fixed bottom-5 right-5 z-[100] flex max-w-sm items-center gap-3 rounded-2xl bg-forest-900 px-4 py-3 text-white shadow-xl"
      role="status"
      aria-live="polite"
    >
      <CheckCircle2 className="shrink-0 text-sage" size={20} />

      <p className="flex-1 text-sm font-semibold">{message}</p>

      <button
        type="button"
        aria-label="Dismiss notification"
        className="shrink-0 rounded-full p-1 text-white/60 transition hover:bg-white/10 hover:text-white"
        onClick={onClose}
      >
        <X size={17} />
      </button>
    </div>
  )
}

export default Toast
