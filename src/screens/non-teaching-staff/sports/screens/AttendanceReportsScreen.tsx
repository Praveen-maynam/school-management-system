import React from 'react';

const attendanceData = [
  {
    id: 1,
    student: 'Alice Johnson',
    sport: 'Basketball',
    attended: 18,
    total: 20,
  },
  {
    id: 2,
    student: 'Bob Smith',
    sport: 'Football',
    attended: 15,
    total: 20,
  },
  {
    id: 3,
    student: 'Cathy Lee',
    sport: 'Swimming',
    attended: 20,
    total: 20,
  },
  {
    id: 4,
    student: 'David Kim',
    sport: 'Tennis',
    attended: 17,
    total: 20,
  },
];

const getPercentage = (attended: number, total: number) => {
  return ((attended / total) * 100).toFixed(1);
};

const percentageColor = (percentage: number) => {
  if (percentage >= 90) return 'text-green-600';
  if (percentage >= 75) return 'text-blue-600';
  if (percentage >= 50) return 'text-yellow-600';
  return 'text-red-600';
};

const AttendanceReportsScreen = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Attendance Reports</h1>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Student</th>
              <th className="px-4 py-2 text-left">Sport</th>
              <th className="px-4 py-2 text-left">Attended</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Attendance (%)</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((row, idx) => {
              const percent = Number(getPercentage(row.attended, row.total));
              return (
                <tr key={row.id} className="border-b hover:bg-blue-50">
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2 font-medium">{row.student}</td>
                  <td className="px-4 py-2">{row.sport}</td>
                  <td className="px-4 py-2">{row.attended}</td>
                  <td className="px-4 py-2">{row.total}</td>
                  <td className={`px-4 py-2 font-semibold ${percentageColor(percent)}`}>{getPercentage(row.attended, row.total)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceReportsScreen;
