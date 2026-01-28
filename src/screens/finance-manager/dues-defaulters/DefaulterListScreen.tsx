import React from 'react';

// Mock data
const defaulters = [
  { id: 1, student: 'John Doe', due: 3000, lastPaid: '2025-12-15', contact: '9876543210' },
  { id: 2, student: 'Jane Smith', due: 4500, lastPaid: '2025-11-20', contact: '9876543211' },
  { id: 3, student: 'Sam Wilson', due: 2000, lastPaid: '2025-10-10', contact: '9876543212' },
];

const DefaulterListScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Defaulter List</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Student</th>
              <th className="py-2 px-4 font-medium text-gray-700">Due Amount</th>
              <th className="py-2 px-4 font-medium text-gray-700">Last Paid</th>
              <th className="py-2 px-4 font-medium text-gray-700">Contact</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {defaulters.map((d: { id: number; student: string; due: number; lastPaid: string; contact: string }) => (
              <tr key={d.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{d.student}</td>
                <td className="py-2 px-4 whitespace-nowrap">₹{d.due.toLocaleString()}</td>
                <td className="py-2 px-4 whitespace-nowrap">{d.lastPaid}</td>
                <td className="py-2 px-4 whitespace-nowrap">{d.contact}</td>
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

export default DefaulterListScreen;
