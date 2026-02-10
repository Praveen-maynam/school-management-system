import React from 'react'

type ExportButtonProps<T> = {
  data: T[]
  fileName: string
  label?: string
}

function convertToCSV<T extends Record<string, any>>(data: T[]) {
  if (!data.length) return ''

  const headers = Object.keys(data[0]).join(',')
  const rows = data.map(row =>
    Object.values(row)
      .map(value => `"${String(value).replace(/"/g, '""')}"`)
      .join(',')
  )

  return [headers, ...rows].join('\n')
}

const ExportButton = <T extends object>({
  data,
  fileName,
  label = 'Export CSV'
}: ExportButtonProps<T>) => {
  const handleExport = () => {
    const csv = convertToCSV(data)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${fileName}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
    >
      ⬇ Export
    </button>
  )
}

export default ExportButton
