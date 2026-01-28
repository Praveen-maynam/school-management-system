import React from 'react';

// Mock data
const bankEntries = [
  { id: 1, date: '2026-01-25', description: 'Fee Collection', amount: 12000, status: 'Matched' },
  { id: 2, date: '2026-01-24', description: 'Transport Fee', amount: 3000, status: 'Unmatched' },
];

const BankReconciliationScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Bank Reconciliation</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Date</th>
              <th className="py-2 px-4 font-medium text-gray-700">Description</th>
              <th className="py-2 px-4 font-medium text-gray-700">Amount</th>
              <th className="py-2 px-4 font-medium text-gray-700">Status</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bankEntries.map((entry) => (
              <tr key={entry.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{entry.date}</td>
                <td className="py-2 px-4 whitespace-nowrap">{entry.description}</td>
                <td className="py-2 px-4 whitespace-nowrap">₹{entry.amount.toLocaleString()}</td>
                <td className={`py-2 px-4 whitespace-nowrap font-semibold ${entry.status === 'Matched' ? 'text-green-600' : 'text-yellow-600'}`}>{entry.status}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">Match</button>
                  <button className="text-red-600 hover:underline">Flag</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BankReconciliationScreen;
