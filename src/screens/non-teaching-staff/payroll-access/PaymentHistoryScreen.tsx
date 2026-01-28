import React from 'react';

// Mock data
const payments = [
  { id: 1, date: '2026-01-28', amount: 18000, status: 'Paid' },
  { id: 2, date: '2025-12-28', amount: 17500, status: 'Paid' },
];

const PaymentHistoryScreen: React.FC = () => {
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Payment History</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Date</th>
              <th className="py-2 px-4 font-medium text-gray-700">Amount</th>
              <th className="py-2 px-4 font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{p.date}</td>
                <td className="py-2 px-4 whitespace-nowrap">₹{p.amount.toLocaleString()}</td>
                <td className={`py-2 px-4 whitespace-nowrap font-semibold ${p.status === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistoryScreen;
