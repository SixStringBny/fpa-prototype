import type { ReactNode } from 'react'

type FilterPanelProps = {
  title?: string
  onClear?: () => void
  clearDisabled?: boolean
  children: ReactNode
}

export function FilterPanel({
  title = 'Filters',
  onClear,
  clearDisabled = false,
  children,
}: FilterPanelProps) {
  return (
    <div className="filter-panel">
      <div className="filter-panel__header">
        <h2 className="filter-panel__title">{title}</h2>
        {onClear ? (
          <button
            type="button"
            className="filter-clear"
            onClick={onClear}
            disabled={clearDisabled}
          >
            Clear all
          </button>
        ) : null}
      </div>
      {children}
    </div>
  )
}

type FilterGroupProps = {
  legend: string
  children: ReactNode
}

export function FilterGroup({ legend, children }: FilterGroupProps) {
  return (
    <fieldset className="filter-group" style={{ border: 0, margin: 0, padding: 0 }}>
      <legend className="filter-group__legend">{legend}</legend>
      {children}
    </fieldset>
  )
}
