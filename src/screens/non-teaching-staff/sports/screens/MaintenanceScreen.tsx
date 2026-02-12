import React from 'react';

const maintenanceLogs = [
  { id: 1, facility: 'Aquatic Center', issue: 'Filter replacement', date: '2026-02-01', status: 'Completed' },
  { id: 2, facility: 'Main Arena', issue: 'Lighting repair', date: '2026-02-03', status: 'In Progress' },
  { id: 3, facility: 'Athletic Stadium', issue: 'Track resurfacing', date: '2026-01-28', status: 'Scheduled' },
];

const MaintenanceScreen = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4 text-blue-900">Maintenance Logs</h1>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-blue-100 text-blue-900">
            <th className="py-2 px-4 text-left">Facility</th>
            <th className="py-2 px-4 text-left">Issue</th>
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {maintenanceLogs.map(log => (
            <tr key={log.id} className="border-b hover:bg-blue-50">
              <td className="py-2 px-4">{log.facility}</td>
              <td className="py-2 px-4">{log.issue}</td>
              <td className="py-2 px-4">{log.date}</td>
              <td className="py-2 px-4">
                <span className={
                  log.status === 'Completed' ? 'text-green-600 font-semibold' :
                  log.status === 'In Progress' ? 'text-yellow-600 font-semibold' :
                  'text-blue-600 font-semibold'
                }>{log.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default MaintenanceScreen;
