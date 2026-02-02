
import React, { useState } from 'react';

// Mock security staff/log data
const securityLogs = [
  { id: 1, name: 'Ravi Kumar', type: 'Staff', shift: 'Morning', status: 'On Duty', lastAction: 'Gate Check', lastUpdated: '2026-02-01' },
  { id: 2, name: 'Visitor: S. Sharma', type: 'Visitor', purpose: 'Parent Meeting', status: 'Checked In', lastAction: 'Reception', lastUpdated: '2026-02-02' },
  { id: 3, name: 'Priya Singh', type: 'Staff', shift: 'Evening', status: 'Off Duty', lastAction: 'Patrol', lastUpdated: '2026-01-31' },
  { id: 4, name: 'Incident: Lost ID', type: 'Incident', status: 'Reported', lastAction: 'Report Filed', lastUpdated: '2026-01-30' },
  { id: 5, name: 'Visitor: A. Verma', type: 'Visitor', purpose: 'Delivery', status: 'Checked Out', lastAction: 'Exit', lastUpdated: '2026-01-29' },
];

const SecurityScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const filtered = securityLogs.filter(s => s.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Security Management</h1>
      <input
        type="text"
        className="w-full border rounded px-3 py-2 mb-4"
        placeholder="Search by name or type..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Name/Incident</th>
              <th className="py-2 px-4 font-medium text-gray-700">Type</th>
              <th className="py-2 px-4 font-medium text-gray-700">Details</th>
              <th className="py-2 px-4 font-medium text-gray-700">Status</th>
              <th className="py-2 px-4 font-medium text-gray-700">Last Action</th>
              <th className="py-2 px-4 font-medium text-gray-700">Last Updated</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} className="py-4 text-center text-gray-400">No records found.</td></tr>
            ) : (
              filtered.map((s) => (
                <tr key={s.id} className="border-b last:border-b-0">
                  <td className="py-2 px-4 whitespace-nowrap">{s.name}</td>
                  <td className="py-2 px-4 whitespace-nowrap">{s.type}</td>
                  <td className="py-2 px-4 whitespace-nowrap">
                    {s.type === 'Staff' ? (
                      <>Shift: <span className="font-semibold">{s.shift}</span></>
                    ) : s.type === 'Visitor' ? (
                      <>Purpose: <span className="font-semibold">{s.purpose}</span></>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  <td className={`py-2 px-4 whitespace-nowrap font-semibold ${s.status === 'On Duty' || s.status === 'Checked In' || s.status === 'Reported' ? 'text-green-600' : s.status === 'Checked Out' ? 'text-blue-600' : 'text-yellow-600'}`}>{s.status}</td>
                  <td className="py-2 px-4 whitespace-nowrap">{s.lastAction}</td>
                  <td className="py-2 px-4 whitespace-nowrap">{s.lastUpdated}</td>
                  <td className="py-2 px-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:underline mr-2">View</button>
                    <button className="text-green-600 hover:underline">Update</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SecurityScreen;
