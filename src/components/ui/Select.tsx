import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

export type SelectOption = { label: string; value: string };

export interface SelectProps {
  options: SelectOption[];
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  label?: string;
  multiple?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * Production-level Select/Dropdown component supporting single/multi-select, search, keyboard navigation, ARIA, and custom className.
 * @param {SelectProps} props - Select props
 */
const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  label,
  multiple = false,
  searchable = false,
  disabled = false,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) setSearch('');
  }, [open]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const filtered = searchable
    ? options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  const isSelected = (val: string) =>
    multiple && Array.isArray(value)
      ? value.includes(val)
      : value === val;

  const handleSelect = (val: string) => {
    if (multiple) {
      if (!Array.isArray(value)) onChange([val]);
      else if (value.includes(val)) onChange(value.filter(v => v !== val));
      else onChange([...value, val]);
    } else {
      onChange(val);
      setOpen(false);
    }
  };

  return (
    <div ref={containerRef} className={clsx('relative', className)}>
      {label && <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>}
      <button
        type="button"
        className={clsx(
          'w-full border rounded px-3 py-2 text-left bg-white focus:outline-none focus:ring-2 focus:ring-blue-500',
          disabled && 'opacity-60 cursor-not-allowed'
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => !disabled && setOpen(o => !o)}
        disabled={disabled}
      >
        <span className={clsx('truncate', !value && 'text-gray-400')}>
          {multiple && Array.isArray(value) && value.length > 0
            ? options.filter(o => value.includes(o.value)).map(o => o.label).join(', ')
            : !multiple && value
            ? options.find(o => o.value === value)?.label
            : placeholder}
        </span>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {open && (
        <div
          className="absolute z-10 mt-1 w-full bg-white border rounded shadow-lg max-h-60 overflow-auto"
          role="listbox"
        >
          {searchable && (
            <input
              ref={inputRef}
              className="w-full px-3 py-2 border-b outline-none"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              autoFocus
            />
          )}
          {filtered.length === 0 && (
            <div className="px-3 py-2 text-gray-500">No options</div>
          )}
          {filtered.map(option => (
            <div
              key={option.value}
              role="option"
              aria-selected={isSelected(option.value)}
              className={clsx(
                'px-3 py-2 cursor-pointer hover:bg-blue-50',
                isSelected(option.value) && 'bg-blue-100 font-semibold'
              )}
              onClick={() => handleSelect(option.value)}
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') handleSelect(option.value);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
