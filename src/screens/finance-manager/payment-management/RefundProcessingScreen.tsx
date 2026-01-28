import React from 'react';

// Mock data
const refunds = [
  { id: 1, student: 'Sam Wilson', amount: 2000, date: '2026-01-25', status: 'Processed' },
  { id: 2, student: 'Jane Smith', amount: 1500, date: '2026-01-24', status: 'Pending' },
];

const RefundProcessingScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Refund Processing</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Student</th>
              <th className="py-2 px-4 font-medium text-gray-700">Amount</th>
              <th className="py-2 px-4 font-medium text-gray-700">Date</th>
              <th className="py-2 px-4 font-medium text-gray-700">Status</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {refunds.map((r) => (
              <tr key={r.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{r.student}</td>
                <td className="py-2 px-4 whitespace-nowrap">₹{r.amount.toLocaleString()}</td>
                <td className="py-2 px-4 whitespace-nowrap">{r.date}</td>
                <td className={`py-2 px-4 whitespace-nowrap font-semibold ${r.status === 'Processed' ? 'text-green-600' : 'text-yellow-600'}`}>{r.status}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">View</button>
                  <button className="text-red-600 hover:underline">Process</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RefundProcessingScreen;
