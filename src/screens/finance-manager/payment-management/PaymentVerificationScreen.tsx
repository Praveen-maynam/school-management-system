import React from 'react';

// Mock data
const verifications = [
  { id: 1, paymentId: 'ONL-1001', student: 'John Doe', amount: 5000, status: 'Verified' },
  { id: 2, paymentId: 'MAN-2002', student: 'Alice Brown', amount: 4000, status: 'Pending' },
];

const PaymentVerificationScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Payment Verification</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Payment ID</th>
              <th className="py-2 px-4 font-medium text-gray-700">Student</th>
              <th className="py-2 px-4 font-medium text-gray-700">Amount</th>
              <th className="py-2 px-4 font-medium text-gray-700">Status</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {verifications.map((v) => (
              <tr key={v.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{v.paymentId}</td>
                <td className="py-2 px-4 whitespace-nowrap">{v.student}</td>
                <td className="py-2 px-4 whitespace-nowrap">₹{v.amount.toLocaleString()}</td>
                <td className={`py-2 px-4 whitespace-nowrap font-semibold ${v.status === 'Verified' ? 'text-green-600' : 'text-yellow-600'}`}>{v.status}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">Verify</button>
                  <button className="text-red-600 hover:underline">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentVerificationScreen;
