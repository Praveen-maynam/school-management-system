import React from 'react'

export type Column<T> = {
  key: keyof T
  label: string
}

type TableProps<T> = {
  columns: Column<T>[]
  data: T[]
}

export function Table<T extends object>({ columns, data }: TableProps<T>) {
  return (
    <table className="w-full border rounded-lg overflow-hidden">
      <thead className="bg-gray-50">
        <tr>
          {columns.map(col => (
            <th key={String(col.key)} className="p-3 text-left text-sm">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-t">
            {columns.map(col => (
              <td key={String(col.key)} className="p-3">
                {String(row[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
