import React from 'react';

// Mock data
const dues = [
  { id: 1, student: 'John Doe', total: 15000, paid: 12000, due: 3000 },
  { id: 2, student: 'Jane Smith', total: 18000, paid: 13500, due: 4500 },
];

const DueTrackingScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Due Amount Tracking</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Student</th>
              <th className="py-2 px-4 font-medium text-gray-700">Total Fee</th>
              <th className="py-2 px-4 font-medium text-gray-700">Paid</th>
              <th className="py-2 px-4 font-medium text-gray-700">Due</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dues.map((d) => (
              <tr key={d.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{d.student}</td>
                <td className="py-2 px-4 whitespace-nowrap">₹{d.total.toLocaleString()}</td>
                <td className="py-2 px-4 whitespace-nowrap">₹{d.paid.toLocaleString()}</td>
                <td className="py-2 px-4 whitespace-nowrap text-red-600 font-bold">₹{d.due.toLocaleString()}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">Remind</button>
                  <button className="text-green-600 hover:underline">Mark Paid</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DueTrackingScreen;
