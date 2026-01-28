import React from 'react';

// Mock data
const dailyCollections = [
  { id: 1, date: '2026-01-25', collected: 12000, payments: 15 },
  { id: 2, date: '2026-01-24', collected: 15000, payments: 18 },
];

const DailyCollectionReportScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Daily Collection Report</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Date</th>
              <th className="py-2 px-4 font-medium text-gray-700">Collected</th>
              <th className="py-2 px-4 font-medium text-gray-700">Payments</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dailyCollections.map((r) => (
              <tr key={r.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{r.date}</td>
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

export default DailyCollectionReportScreen;
