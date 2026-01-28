import React from 'react';

// Mock data
const cashChequeEntries = [
  { id: 1, student: 'Chris Green', amount: 2000, date: '2026-01-25', type: 'Cash', status: 'Received' },
  { id: 2, student: 'Diana White', amount: 2500, date: '2026-01-24', type: 'Cheque', status: 'Cleared' },
];

const CashChequeEntryScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Cash / Cheque Entry</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Student</th>
              <th className="py-2 px-4 font-medium text-gray-700">Amount</th>
              <th className="py-2 px-4 font-medium text-gray-700">Date</th>
              <th className="py-2 px-4 font-medium text-gray-700">Type</th>
              <th className="py-2 px-4 font-medium text-gray-700">Status</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cashChequeEntries.map((entry) => (
              <tr key={entry.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{entry.student}</td>
                <td className="py-2 px-4 whitespace-nowrap">₹{entry.amount.toLocaleString()}</td>
                <td className="py-2 px-4 whitespace-nowrap">{entry.date}</td>
                <td className="py-2 px-4 whitespace-nowrap">{entry.type}</td>
                <td className={`py-2 px-4 whitespace-nowrap font-semibold ${entry.status === 'Received' || entry.status === 'Cleared' ? 'text-green-600' : 'text-yellow-600'}`}>{entry.status}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">Add Entry</button>
      </div>
    </div>
  );
};

export default CashChequeEntryScreen;
