import React from 'react';

// Mock data
const manualPayments = [
  { id: 1, student: 'Alice Brown', amount: 4000, date: '2026-01-25', method: 'Cash', status: 'Verified' },
  { id: 2, student: 'Bob Lee', amount: 3500, date: '2026-01-24', method: 'Cheque', status: 'Pending' },
];

const ManualPaymentsScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manual Payments</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Student</th>
              <th className="py-2 px-4 font-medium text-gray-700">Amount</th>
              <th className="py-2 px-4 font-medium text-gray-700">Date</th>
              <th className="py-2 px-4 font-medium text-gray-700">Method</th>
              <th className="py-2 px-4 font-medium text-gray-700">Status</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {manualPayments.map((p) => (
              <tr key={p.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{p.student}</td>
                <td className="py-2 px-4 whitespace-nowrap">₹{p.amount.toLocaleString()}</td>
                <td className="py-2 px-4 whitespace-nowrap">{p.date}</td>
                <td className="py-2 px-4 whitespace-nowrap">{p.method}</td>
                <td className={`py-2 px-4 whitespace-nowrap font-semibold ${p.status === 'Verified' ? 'text-green-600' : 'text-yellow-600'}`}>{p.status}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">Verify</button>
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

export default ManualPaymentsScreen;
