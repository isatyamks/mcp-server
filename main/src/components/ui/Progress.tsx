interface ProgressProps {
  value: number
  className?: string
}

export function Progress({ value, className = '' }: ProgressProps) {
  return (
    <div className={`w-full h-2 bg-gray-200 dark:bg-dark-300 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-primary-600 transition-all duration-300 ease-in-out"
        style={{ width: `${value}%` }}
      />
    </div>
  )
} 