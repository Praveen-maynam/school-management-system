import React from 'react';

// Mock data
const monthlyReports = [
  { id: 1, month: 'January', collected: 98000, payments: 120 },
  { id: 2, month: 'December', collected: 92000, payments: 110 },
];

const MonthlyReportScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Monthly Report</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Month</th>
              <th className="py-2 px-4 font-medium text-gray-700">Collected</th>
              <th className="py-2 px-4 font-medium text-gray-700">Payments</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {monthlyReports.map((r) => (
              <tr key={r.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{r.month}</td>
                <td className="py-2 px-4 whitespace-nowrap">₹{r.collected.toLocaleString()}</td>
                <td className="py-2 px-4 whitespace-nowrap">{r.payments}</td>
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

export default MonthlyReportScreen;
