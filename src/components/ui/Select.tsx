import type { SelectHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'
import { FieldShell } from './Field'

type Option = { value: string; label: string }

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  id: string
  label: string
  hint?: string
  error?: string
  optional?: boolean
  options: Option[]
}

export function SelectField({
  id,
  label,
  hint,
  error,
  optional,
  options,
  className,
  ...props
}: SelectFieldProps) {
  return (
    <FieldShell
      label={label}
      htmlFor={id}
      hint={hint}
      error={error}
      optional={optional}
    >
      <select
        id={id}
        className={cn('select', className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
            .filter(Boolean)
            .join(' ') || undefined
        }
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  )
}
