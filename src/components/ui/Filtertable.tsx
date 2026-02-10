import React from 'react';

interface Column<T> {
  key: keyof T;
  label: string;
}

interface TableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
}

function Table<T extends object>({ columns, data }: TableProps<T>) {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          {columns.map(col => (
            <th key={String(col.key)} className="border border-gray-300 p-2 text-left">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {columns.map(col => (
              <td key={String(col.key)} className="border border-gray-300 p-2">
                {String(row[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function FilterableTable<T extends object>({
  columns,
  data
}: TableProps<T>) {
  const [query, setQuery] = React.useState('')

  const filtered = data.filter((row: T) =>
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(query.toLowerCase())
    )
  )

  return (
    <>
      <input
        className="mb-3 border p-2 rounded w-full"
        placeholder="Search..."
        onChange={e => setQuery(e.target.value)}
      />
      <Table columns={columns} data={filtered} />
    </>
  )
}
