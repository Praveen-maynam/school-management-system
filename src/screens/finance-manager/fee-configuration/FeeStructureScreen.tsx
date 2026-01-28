import React from 'react';

// Mock data
const feeStructures = [
  { id: 1, name: 'Primary', amount: 15000, frequency: 'Annual' },
  { id: 2, name: 'Secondary', amount: 18000, frequency: 'Annual' },
  { id: 3, name: 'Transport', amount: 3000, frequency: 'Monthly' },
];

const FeeStructureScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Fee Structure Setup</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Name</th>
              <th className="py-2 px-4 font-medium text-gray-700">Amount</th>
              <th className="py-2 px-4 font-medium text-gray-700">Frequency</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {feeStructures.map((fee) => (
              <tr key={fee.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{fee.name}</td>
                <td className="py-2 px-4 whitespace-nowrap">₹{fee.amount.toLocaleString()}</td>
                <td className="py-2 px-4 whitespace-nowrap">{fee.frequency}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">Add Fee Structure</button>
      </div>
    </div>
  );
};

export default FeeStructureScreen;
