import React from 'react';

// Mock data
const lateFees = [
  { id: 1, daysLate: 5, amount: 100 },
  { id: 2, daysLate: 10, amount: 250 },
  { id: 3, daysLate: 20, amount: 500 },
];

const LateFeeConfigScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Late Fee Configuration</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Days Late</th>
              <th className="py-2 px-4 font-medium text-gray-700">Late Fee Amount</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lateFees.map((fee) => (
              <tr key={fee.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{fee.daysLate} days</td>
                <td className="py-2 px-4 whitespace-nowrap">₹{fee.amount.toLocaleString()}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">Add Late Fee Rule</button>
      </div>
    </div>
  );
};

export default LateFeeConfigScreen;
