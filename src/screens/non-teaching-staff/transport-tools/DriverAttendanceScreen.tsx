import React from 'react';

// Mock data
const drivers = [
  { id: 1, name: 'Ravi Kumar', status: 'Present' },
  { id: 2, name: 'Sunil Singh', status: 'Absent' },
];

const DriverAttendanceScreen: React.FC = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Driver Attendance</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Driver</th>
              <th className="py-2 px-4 font-medium text-gray-700">Status</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((d) => (
              <tr key={d.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{d.name}</td>
                <td className={`py-2 px-4 whitespace-nowrap font-semibold ${d.status === 'Present' ? 'text-green-600' : 'text-red-600'}`}>{d.status}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">Mark Present</button>
                  <button className="text-red-600 hover:underline">Mark Absent</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriverAttendanceScreen;
