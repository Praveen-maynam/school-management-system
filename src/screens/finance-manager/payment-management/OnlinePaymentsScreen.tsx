import React from 'react';

// Mock data
const onlinePayments = [
  { id: 1, student: 'John Doe', amount: 5000, date: '2026-01-25', status: 'Success' },
  { id: 2, student: 'Jane Smith', amount: 3000, date: '2026-01-25', status: 'Pending' },
  { id: 3, student: 'Sam Wilson', amount: 4500, date: '2026-01-24', status: 'Failed' },
];

const OnlinePaymentsScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Online Payments</h1>
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
            {onlinePayments.map((p) => (
              <tr key={p.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{p.student}</td>
                <td className="py-2 px-4 whitespace-nowrap">₹{p.amount.toLocaleString()}</td>
                <td className="py-2 px-4 whitespace-nowrap">{p.date}</td>
                <td className={`py-2 px-4 whitespace-nowrap font-semibold ${p.status === 'Success' ? 'text-green-600' : p.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'}`}>{p.status}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">View</button>
                  <button className="text-red-600 hover:underline">Refund</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OnlinePaymentsScreen;
