import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react'
import { cn } from '../../lib/cn'

type FieldShellProps = {
  label: string
  htmlFor: string
  hint?: string
  error?: string
  optional?: boolean
  children: ReactNode
}

export function FieldShell({
  label,
  htmlFor,
  hint,
  error,
  optional = false,
  children,
}: FieldShellProps) {
  const describedBy = [hint ? `${htmlFor}-hint` : null, error ? `${htmlFor}-error` : null]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="field">
      <label className="field__label" htmlFor={htmlFor}>
        {label}
        {optional ? <span className="field__optional"> (optional)</span> : null}
      </label>
      {children}
      {hint ? (
        <p className="field__hint" id={`${htmlFor}-hint`}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="field__error" id={`${htmlFor}-error`} role="alert">
          {error}
        </p>
      ) : null}
      {describedBy ? <span className="visually-hidden">{describedBy}</span> : null}
    </div>
  )
}

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string
  label: string
  hint?: string
  error?: string
  optional?: boolean
}

export function TextField({
  id,
  label,
  hint,
  error,
  optional,
  className,
  ...props
}: TextFieldProps) {
  return (
    <FieldShell
      label={label}
      htmlFor={id}
      hint={hint}
      error={error}
      optional={optional}
    >
      <input
        id={id}
        className={cn('input', className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
            .filter(Boolean)
            .join(' ') || undefined
        }
        {...props}
      />
    </FieldShell>
  )
}

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string
  label: string
  hint?: string
  error?: string
  optional?: boolean
}

export function TextAreaField({
  id,
  label,
  hint,
  error,
  optional,
  className,
  ...props
}: TextAreaFieldProps) {
  return (
    <FieldShell
      label={label}
      htmlFor={id}
      hint={hint}
      error={error}
      optional={optional}
    >
      <textarea
        id={id}
        className={cn('textarea', className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
            .filter(Boolean)
            .join(' ') || undefined
        }
        {...props}
      />
    </FieldShell>
  )
}
