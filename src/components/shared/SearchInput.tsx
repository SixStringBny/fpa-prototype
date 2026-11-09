import { Search } from 'lucide-react'
import { useId } from 'react'

type SearchInputProps = {
  value: string
  onChange: (value: string) => void
  label: string
  placeholder?: string
}

export function SearchInput({
  value,
  onChange,
  label,
  placeholder = 'Search…',
}: SearchInputProps) {
  const id = useId()
  return (
    <div className="search-field">
      <label className="visually-hidden" htmlFor={id}>
        {label}
      </label>
      <Search className="search-field__icon" size={18} aria-hidden="true" />
      <input
        id={id}
        className="input"
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}
