import React from 'react';

// Mock data
const increments = [
  { id: 1, year: '2026', amount: 1000 },
  { id: 2, year: '2025', amount: 800 },
];

const IncrementDetailsScreen: React.FC = () => {
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Increment Details</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Year</th>
              <th className="py-2 px-4 font-medium text-gray-700">Increment Amount</th>
            </tr>
          </thead>
          <tbody>
            {increments.map((i) => (
              <tr key={i.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{i.year}</td>
                <td className="py-2 px-4 whitespace-nowrap">₹{i.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncrementDetailsScreen;
