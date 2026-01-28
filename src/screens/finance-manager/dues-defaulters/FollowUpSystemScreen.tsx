import React from 'react';

// Mock data
const followUps = [
  { id: 1, student: 'John Doe', lastContact: '2026-01-20', nextAction: 'Call', status: 'Pending' },
  { id: 2, student: 'Jane Smith', lastContact: '2026-01-18', nextAction: 'Email', status: 'Completed' },
];

const FollowUpSystemScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Follow-up System</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Student</th>
              <th className="py-2 px-4 font-medium text-gray-700">Last Contact</th>
              <th className="py-2 px-4 font-medium text-gray-700">Next Action</th>
              <th className="py-2 px-4 font-medium text-gray-700">Status</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {followUps.map((f) => (
              <tr key={f.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{f.student}</td>
                <td className="py-2 px-4 whitespace-nowrap">{f.lastContact}</td>
                <td className="py-2 px-4 whitespace-nowrap">{f.nextAction}</td>
                <td className={`py-2 px-4 whitespace-nowrap font-semibold ${f.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>{f.status}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">Update</button>
                  <button className="text-red-600 hover:underline">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FollowUpSystemScreen;
