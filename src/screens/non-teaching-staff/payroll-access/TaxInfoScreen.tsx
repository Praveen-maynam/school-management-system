import React from 'react';

// Mock data
const taxes = [
  { id: 1, year: '2025-26', tax: 1200 },
  { id: 2, year: '2024-25', tax: 1100 },
];

const TaxInfoScreen: React.FC = () => {
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Tax Information</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Year</th>
              <th className="py-2 px-4 font-medium text-gray-700">Tax Amount</th>
            </tr>
          </thead>
          <tbody>
            {taxes.map((t) => (
              <tr key={t.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{t.year}</td>
                <td className="py-2 px-4 whitespace-nowrap">₹{t.tax.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaxInfoScreen;
