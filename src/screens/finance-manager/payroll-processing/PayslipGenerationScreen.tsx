import React from 'react';

// Mock data
const payslips = [
  { id: 1, employee: 'Amit Kumar', month: 'January', net: 38000 },
  { id: 2, employee: 'Priya Singh', month: 'January', net: 33500 },
];

const PayslipGenerationScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Payslip Generation</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Employee</th>
              <th className="py-2 px-4 font-medium text-gray-700">Month</th>
              <th className="py-2 px-4 font-medium text-gray-700">Net Salary</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payslips.map((p) => (
              <tr key={p.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{p.employee}</td>
                <td className="py-2 px-4 whitespace-nowrap">{p.month}</td>
                <td className="py-2 px-4 whitespace-nowrap font-bold">₹{p.net.toLocaleString()}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">View</button>
                  <button className="text-green-600 hover:underline">Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayslipGenerationScreen;
