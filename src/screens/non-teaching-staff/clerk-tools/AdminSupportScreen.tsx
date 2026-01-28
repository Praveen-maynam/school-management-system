import React from 'react';

// Mock data
const supports = [
  { id: 1, request: 'Prepare ID cards', status: 'Pending' },
  { id: 2, request: 'Update staff list', status: 'Completed' },
];

const AdminSupportScreen: React.FC = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Administrative Support</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Request</th>
              <th className="py-2 px-4 font-medium text-gray-700">Status</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {supports.map((s) => (
              <tr key={s.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{s.request}</td>
                <td className={`py-2 px-4 whitespace-nowrap font-semibold ${s.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>{s.status}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">View</button>
                  <button className="text-green-600 hover:underline">Complete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSupportScreen;
