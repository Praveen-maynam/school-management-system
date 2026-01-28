import React from 'react';

// Mock data
const payments = [
  { id: 1, employee: 'Amit Kumar', amount: 38000, date: '2026-01-28', status: 'Paid' },
  { id: 2, employee: 'Priya Singh', amount: 33500, date: '2026-01-28', status: 'Pending' },
];

const SalaryPaymentScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Salary Payment Processing</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Employee</th>
              <th className="py-2 px-4 font-medium text-gray-700">Amount</th>
              <th className="py-2 px-4 font-medium text-gray-700">Date</th>
              <th className="py-2 px-4 font-medium text-gray-700">Status</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{p.employee}</td>
                <td className="py-2 px-4 whitespace-nowrap">₹{p.amount.toLocaleString()}</td>
                <td className="py-2 px-4 whitespace-nowrap">{p.date}</td>
                <td className={`py-2 px-4 whitespace-nowrap font-semibold ${p.status === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>{p.status}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">View</button>
                  <button className="text-green-600 hover:underline">Process</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalaryPaymentScreen;
