import type { ReactNode } from 'react'

type StatCardProps = {
  icon: ReactNode
  value: string | number
  label: string
}

export function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-card__icon" aria-hidden="true">
        {icon}
      </div>
      <p className="stat-card__value">{value}</p>
      <p className="stat-card__label">{label}</p>
    </div>
  )
}
