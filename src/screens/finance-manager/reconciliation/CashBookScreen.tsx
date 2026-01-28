import React from 'react';

// Mock data
const cashBook = [
  { id: 1, date: '2026-01-25', description: 'Fee Collection', inAmount: 12000, outAmount: 0, balance: 50000 },
  { id: 2, date: '2026-01-24', description: 'Salary Payment', inAmount: 0, outAmount: 38000, balance: 38000 },
];

const CashBookScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Cash Book</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Date</th>
              <th className="py-2 px-4 font-medium text-gray-700">Description</th>
              <th className="py-2 px-4 font-medium text-gray-700">In</th>
              <th className="py-2 px-4 font-medium text-gray-700">Out</th>
              <th className="py-2 px-4 font-medium text-gray-700">Balance</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cashBook.map((entry) => (
              <tr key={entry.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{entry.date}</td>
                <td className="py-2 px-4 whitespace-nowrap">{entry.description}</td>
                <td className="py-2 px-4 whitespace-nowrap">₹{entry.inAmount.toLocaleString()}</td>
                <td className="py-2 px-4 whitespace-nowrap">₹{entry.outAmount.toLocaleString()}</td>
                <td className="py-2 px-4 whitespace-nowrap font-bold">₹{entry.balance.toLocaleString()}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CashBookScreen;
