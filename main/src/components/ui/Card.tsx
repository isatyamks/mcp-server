import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white dark:bg-dark-200 rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  )
} 