import React from 'react'

export type DropdownOption = {
  label: string
  value: string | number
}

type DropdownProps = {
  label?: string
  options: DropdownOption[]
  value?: string | number
  placeholder?: string
  onChange: (value: string | number) => void
}

const Dropdown = ({
  label,
  options,
  value,
  placeholder = 'Select option',
  onChange
}: DropdownProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown
