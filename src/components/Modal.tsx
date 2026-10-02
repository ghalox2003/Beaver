import { X } from 'lucide-react'
import type { ReactNode } from 'react'

type ModalProps = {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-5 py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-forest-900/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg rounded-3xl bg-paper p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-6">
          <h2
            id="modal-title"
            className="text-xl font-extrabold tracking-tight text-forest-900"
          >
            {title}
          </h2>

          <button
            type="button"
            aria-label="Close dialog"
            className="shrink-0 rounded-full p-2 text-forest-900/50 transition hover:bg-cream hover:text-forest-900"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-5">{children}</div>
      </div>
    </div>
  )
}

export default Modal
