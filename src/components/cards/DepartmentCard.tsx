import React from 'react'
import { ChevronRight } from 'lucide-react'

type DepartmentCardProps = {
  icon: React.ReactNode
  name: string
  head: string
  staffCount: number
  maxStaff?: number
  progressColor?: string
  positions: string[]
  onClick?: () => void
}

const DepartmentCard = ({
  icon,
  name,
  head,
  staffCount,
  maxStaff = 20,
  progressColor = 'bg-blue-500',
  positions,
  onClick
}: DepartmentCardProps) => {
  const progress = Math.min((staffCount / maxStaff) * 100, 100)

  return (
    <div
      onClick={onClick}
      className="bg-white border rounded-2xl p-5 hover:shadow-md transition cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50">
            {icon}
          </div>

          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-500">Head: {head}</p>
          </div>
        </div>

        <ChevronRight className="text-gray-400" />
      </div>

      {/* Staff Count */}
      <div className="mt-5">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-500">Staff Members</span>
          <span className="font-semibold">{staffCount}</span>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div
            className={`h-2 rounded-full ${progressColor}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Positions */}
      <div className="mt-4">
        <p className="text-sm text-gray-500 mb-2">Positions</p>
        <div className="flex flex-wrap gap-2">
          {positions.slice(0, 2).map((pos, i) => (
            <span
              key={i}
              className="px-3 py-1 text-sm bg-gray-100 rounded-lg"
            >
              {pos}
            </span>
          ))}
          {positions.length > 2 && (
            <span className="px-3 py-1 text-sm bg-gray-100 rounded-lg">
              +{positions.length - 2} more
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default DepartmentCard
