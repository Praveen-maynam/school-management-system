import React from 'react';

const mockHealth = [
  { id: 1, athlete: 'Michael Jordan', sport: 'Basketball', status: 'Fit', lastCheck: '2026-01-10' },
  { id: 2, athlete: 'Serena Williams', sport: 'Tennis', status: 'Injured', lastCheck: '2026-01-20' },
  { id: 3, athlete: 'Usain Bolt', sport: 'Track', status: 'Fit', lastCheck: '2026-01-15' },
];

const HealthRecordsScreen = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4 text-blue-900">Health Records</h1>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-blue-100 text-blue-900">
            <th className="py-2 px-4 text-left">Athlete</th>
            <th className="py-2 px-4 text-left">Sport</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Last Check</th>
          </tr>
        </thead>
        <tbody>
          {mockHealth.map(h => (
            <tr key={h.id} className="border-b hover:bg-blue-50">
              <td className="py-2 px-4">{h.athlete}</td>
              <td className="py-2 px-4">{h.sport}</td>
              <td className="py-2 px-4">
                <span className={h.status === 'Fit' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>{h.status}</span>
              </td>
              <td className="py-2 px-4">{h.lastCheck}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default HealthRecordsScreen;
