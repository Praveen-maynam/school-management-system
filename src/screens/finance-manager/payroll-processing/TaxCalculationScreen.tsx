import React from 'react';

// Mock data
const taxes = [
  { id: 1, employee: 'Amit Kumar', month: 'January', tax: 1200 },
  { id: 2, employee: 'Priya Singh', month: 'January', tax: 1000 },
];

const TaxCalculationScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Calculations</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Employee</th>
              <th className="py-2 px-4 font-medium text-gray-700">Month</th>
              <th className="py-2 px-4 font-medium text-gray-700">Tax Amount</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {taxes.map((t) => (
              <tr key={t.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{t.employee}</td>
                <td className="py-2 px-4 whitespace-nowrap">{t.month}</td>
                <td className="py-2 px-4 whitespace-nowrap">₹{t.tax.toLocaleString()}</td>
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

export default TaxCalculationScreen;
