import React from 'react';

// Mock data
const reminders = [
  { id: 1, student: 'John Doe', due: 3000, contact: '9876543210', status: 'Sent' },
  { id: 2, student: 'Jane Smith', due: 4500, contact: '9876543211', status: 'Pending' },
];

const PaymentRemindersScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Payment Reminders</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Student</th>
              <th className="py-2 px-4 font-medium text-gray-700">Due Amount</th>
              <th className="py-2 px-4 font-medium text-gray-700">Contact</th>
              <th className="py-2 px-4 font-medium text-gray-700">Status</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reminders.map((r) => (
              <tr key={r.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{r.student}</td>
                <td className="py-2 px-4 whitespace-nowrap">₹{r.due.toLocaleString()}</td>
                <td className="py-2 px-4 whitespace-nowrap">{r.contact}</td>
                <td className={`py-2 px-4 whitespace-nowrap font-semibold ${r.status === 'Sent' ? 'text-green-600' : 'text-yellow-600'}`}>{r.status}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">Resend</button>
                  <button className="text-red-600 hover:underline">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentRemindersScreen;
