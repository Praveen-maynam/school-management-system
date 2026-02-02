import React from 'react'

type DatePickerProps = {
  label?: string
  value?: string
  onChange: (date: string) => void
  minDate?: string
  maxDate?: string
  disabled?: boolean
}

const DatePicker = ({
  label,
  value,
  onChange,
  minDate,
  maxDate,
  disabled = false
}: DatePickerProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-1 text-gray-700">
          {label}
        </label>
      )}

      <input
        type="date"
        value={value}
        min={minDate}
        max={maxDate}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   disabled:bg-gray-100"
      />
    </div>
  )
}

export default DatePicker
