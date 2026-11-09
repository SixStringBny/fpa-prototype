import type { InputHTMLAttributes } from 'react'

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string
  label: string
}

export function Checkbox({ id, label, ...props }: CheckboxProps) {
  return (
    <label className="checkbox" htmlFor={id}>
      <input id={id} type="checkbox" {...props} />
      <span>{label}</span>
    </label>
  )
}
