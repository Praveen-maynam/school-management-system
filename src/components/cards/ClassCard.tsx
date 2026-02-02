import React from 'react'
import { Users, BookOpen } from 'lucide-react'

type ClassCardProps = {
  className: string
  section?: string
  totalStudents: number
  classTeacher?: string
  onClick?: () => void
}

const ClassCard = ({
  className,
  section,
  totalStudents,
  classTeacher,
  onClick
}: ClassCardProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-white border rounded-xl p-5 cursor-pointer hover:shadow transition"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">
          Class {className}
          {section && <span className="text-gray-400"> - {section}</span>}
        </h3>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Users size={16} />
          <span>{totalStudents} Students</span>
        </div>

        {classTeacher && (
          <div className="flex items-center gap-1">
            <BookOpen size={16} />
            <span>{classTeacher}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ClassCard
