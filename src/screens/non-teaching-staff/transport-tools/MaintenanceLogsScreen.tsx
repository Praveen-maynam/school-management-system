import React from 'react';

// Mock data
const logs = [
  { id: 1, vehicle: 'KA01AB1234', date: '2026-01-20', issue: 'Oil Change', status: 'Completed' },
  { id: 2, vehicle: 'KA01CD5678', date: '2026-01-18', issue: 'Brake Check', status: 'Pending' },
];

const MaintenanceLogsScreen: React.FC = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Maintenance Logs</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Vehicle</th>
              <th className="py-2 px-4 font-medium text-gray-700">Date</th>
              <th className="py-2 px-4 font-medium text-gray-700">Issue</th>
              <th className="py-2 px-4 font-medium text-gray-700">Status</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((l) => (
              <tr key={l.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{l.vehicle}</td>
                <td className="py-2 px-4 whitespace-nowrap">{l.date}</td>
                <td className="py-2 px-4 whitespace-nowrap">{l.issue}</td>
                <td className={`py-2 px-4 whitespace-nowrap font-semibold ${l.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>{l.status}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">Update</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaintenanceLogsScreen;
