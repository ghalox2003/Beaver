import type { ReactNode } from 'react'

type PageContainerProps = {
  children: ReactNode
  className?: string
}

function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 sm:py-10 ${className}`}
    >
      {children}
    </div>
  )
}

export default PageContainer
