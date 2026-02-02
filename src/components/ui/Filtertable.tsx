export function FilterableTable<T extends object>({
  columns,
  data
}: TableProps<T>) {
  const [query, setQuery] = React.useState('')

  const filtered = data.filter(row =>
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
