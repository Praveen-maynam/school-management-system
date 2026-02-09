import React, { useState } from 'react';
import { Table } from './Table';

export type Column<T> = {
  key: keyof T;
  label: string;
};

export type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
};

export function Filtertable<T extends Record<string, any>>({
  columns,
  data
}: TableProps<T>) {
  const [query, setQuery] = useState('');

  const filtered = data.filter((row: T) =>
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(query.toLowerCase())
    )
  );

  return (
    <>
      <input
        className="mb-3 border p-2 rounded w-full"
        placeholder="Search..."
        onChange={e => setQuery(e.target.value)}
      />
      <Table columns={columns} data={filtered} />
    </>
  );
}
