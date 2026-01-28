import React from 'react';

// Mock data
const categories = [
  { id: 1, category: 'Tuition', collected: 60000 },
  { id: 2, category: 'Transport', collected: 20000 },
  { id: 3, category: 'Library', collected: 8000 },
];

const CategoryBreakdownScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Category-wise Breakdown</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Category</th>
              <th className="py-2 px-4 font-medium text-gray-700">Collected</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{c.category}</td>
                <td className="py-2 px-4 whitespace-nowrap">₹{c.collected.toLocaleString()}</td>
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

export default CategoryBreakdownScreen;
