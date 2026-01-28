import React from 'react';

// Mock data
const history = [
  { date: '2026-01-28', status: 'Present' },
  { date: '2026-01-27', status: 'Present' },
  { date: '2026-01-26', status: 'Absent' },
  { date: '2026-01-25', status: 'Present' },
];

const AttendanceHistoryScreen: React.FC = () => {
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Attendance History</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Date</th>
              <th className="py-2 px-4 font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h, idx) => (
              <tr key={idx} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{h.date}</td>
                <td className={`py-2 px-4 whitespace-nowrap font-semibold ${h.status === 'Present' ? 'text-green-600' : 'text-red-600'}`}>{h.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceHistoryScreen;
