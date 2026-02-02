import React from 'react'

export type TimeSlot = {
  time: string
  subject?: string
  teacher?: string
  room?: string
  color?: string
}

export type TimetableData = {
  day: string
  slots: TimeSlot[]
}

type TimetableProps = {
  data: TimetableData[]
}

const Timetable = ({ data }: TimetableProps) => {
  if (!data.length) return null

  return (
    <div className="overflow-x-auto border rounded-xl">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left text-sm border">Day</th>
            {data[0].slots.map((slot, index) => (
              <th key={index} className="p-3 text-sm border">
                {slot.time}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((dayRow, i) => (
            <tr key={i} className="border-t">
              <td className="p-3 font-medium border">{dayRow.day}</td>

              {dayRow.slots.map((slot, j) => (
                <td key={j} className="p-2 border">
                  {slot.subject ? (
                    <div
                      className={`rounded-lg p-2 text-sm text-white ${
                        slot.color || 'bg-blue-500'
                      }`}
                    >
                      <p className="font-semibold">{slot.subject}</p>
                      {slot.teacher && (
                        <p className="text-xs opacity-90">{slot.teacher}</p>
                      )}
                      {slot.room && (
                        <p className="text-xs opacity-90">{slot.room}</p>
                      )}
                    </div>
                  ) : (
                    <div className="text-gray-400 text-sm text-center">
                      —
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Timetable
