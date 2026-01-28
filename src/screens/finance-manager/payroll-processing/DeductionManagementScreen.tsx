import React from 'react';

// Mock data
const deductions = [
  { id: 1, type: 'PF', amount: 1200 },
  { id: 2, type: 'ESI', amount: 800 },
  { id: 3, type: 'TDS', amount: 500 },
];

const DeductionManagementScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Deduction Management</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Type</th>
              <th className="py-2 px-4 font-medium text-gray-700">Amount</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deductions.map((d) => (
              <tr key={d.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{d.type}</td>
                <td className="py-2 px-4 whitespace-nowrap">₹{d.amount.toLocaleString()}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">Add Deduction</button>
      </div>
    </div>
  );
};

export default DeductionManagementScreen;
