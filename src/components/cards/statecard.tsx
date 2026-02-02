import React from 'react'

type StatCardProps = {
  label: string
  value: string | number
  icon?: React.ReactNode
}

const StatCard = ({ label, value, icon }: StatCardProps) => (
  <div className="bg-white border rounded-xl p-5 flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
    {icon && <div className="text-gray-400">{icon}</div>}
  </div>
)

export default StatCard
