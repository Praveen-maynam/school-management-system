import React from 'react';

// Mock data
const inventory = [
  { id: 1, title: 'Mathematics 101', total: 10, available: 7 },
  { id: 2, title: 'English Grammar', total: 8, available: 0 },
];

const InventoryManagementScreen: React.FC = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Inventory Management</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Title</th>
              <th className="py-2 px-4 font-medium text-gray-700">Total</th>
              <th className="py-2 px-4 font-medium text-gray-700">Available</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((b) => (
              <tr key={b.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{b.title}</td>
                <td className="py-2 px-4 whitespace-nowrap">{b.total}</td>
                <td className={`py-2 px-4 whitespace-nowrap font-semibold ${b.available > 0 ? 'text-green-600' : 'text-red-600'}`}>{b.available}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">Add</button>
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

export default InventoryManagementScreen;
