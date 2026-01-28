import React from 'react';

// Mock data
const categories = [
  { id: 1, name: 'Tuition', description: 'Covers academic fees' },
  { id: 2, name: 'Transport', description: 'Bus/van charges' },
  { id: 3, name: 'Library', description: 'Library usage fees' },
];

const FeeCategoryScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Fee Category Management</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Category</th>
              <th className="py-2 px-4 font-medium text-gray-700">Description</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{cat.name}</td>
                <td className="py-2 px-4 whitespace-nowrap">{cat.description}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">Add Category</button>
      </div>
    </div>
  );
};

export default FeeCategoryScreen;
