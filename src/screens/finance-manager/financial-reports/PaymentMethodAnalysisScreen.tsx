import React from 'react';

// Mock data
const methods = [
  { id: 1, method: 'Online', collected: 60000 },
  { id: 2, method: 'Cash', collected: 25000 },
  { id: 3, method: 'Cheque', collected: 8000 },
  { id: 4, method: 'Other', collected: 5000 },
];

const PaymentMethodAnalysisScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Payment Method Analysis</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Method</th>
              <th className="py-2 px-4 font-medium text-gray-700">Collected</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {methods.map((m) => (
              <tr key={m.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{m.method}</td>
                <td className="py-2 px-4 whitespace-nowrap">₹{m.collected.toLocaleString()}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">View</button>
                  <button className="text-green-600 hover:underline">Export</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentMethodAnalysisScreen;
