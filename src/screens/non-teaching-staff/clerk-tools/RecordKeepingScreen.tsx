import React from 'react';

// Mock data
const records = [
  { id: 1, name: 'Attendance Register', updated: '2026-01-20' },
  { id: 2, name: 'Fee Collection Log', updated: '2026-01-18' },
];

const RecordKeepingScreen: React.FC = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Record Keeping</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Record</th>
              <th className="py-2 px-4 font-medium text-gray-700">Last Updated</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{r.name}</td>
                <td className="py-2 px-4 whitespace-nowrap">{r.updated}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">View</button>
                  <button className="text-green-600 hover:underline">Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecordKeepingScreen;
