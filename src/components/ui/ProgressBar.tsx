import { cn } from '../../lib/cn'

type ProgressBarProps = {
  value: number
  label: string
  showValue?: boolean
  size?: 'sm' | 'md'
  className?: string
}

export function ProgressBar({
  value,
  label,
  showValue = false,
  size = 'md',
  className,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)))
  return (
    <div className={cn('progress-row', className)}>
      <div
        className={cn('progress', size === 'sm' && 'progress--sm')}
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
      >
        <div className="progress__bar" style={{ width: `${clamped}%` }} />
      </div>
      {showValue ? (
        <span className="progress-row__label">{clamped}%</span>
      ) : null}
    </div>
  )
}
