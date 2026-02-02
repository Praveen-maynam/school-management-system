
import React, { useState } from 'react';

// Mock inventory data
const inventory = [
  { id: 1, item: 'Projector', category: 'Electronics', quantity: 5, status: 'Available', lastUpdated: '2026-01-15' },
  { id: 2, item: 'Whiteboard Marker', category: 'Stationery', quantity: 40, status: 'Low Stock', lastUpdated: '2026-01-28' },
  { id: 3, item: 'Laptop', category: 'Electronics', quantity: 2, status: 'Issued', lastUpdated: '2026-01-10' },
  { id: 4, item: 'Chairs', category: 'Furniture', quantity: 30, status: 'Available', lastUpdated: '2026-01-20' },
];

const InventoryScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const filtered = inventory.filter(i => i.item.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Inventory Management</h1>
      <input
        type="text"
        className="w-full border rounded px-3 py-2 mb-4"
        placeholder="Search by item name..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Item</th>
              <th className="py-2 px-4 font-medium text-gray-700">Category</th>
              <th className="py-2 px-4 font-medium text-gray-700">Quantity</th>
              <th className="py-2 px-4 font-medium text-gray-700">Status</th>
              <th className="py-2 px-4 font-medium text-gray-700">Last Updated</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} className="py-4 text-center text-gray-400">No items found.</td></tr>
            ) : (
              filtered.map((i) => (
                <tr key={i.id} className="border-b last:border-b-0">
                  <td className="py-2 px-4 whitespace-nowrap">{i.item}</td>
                  <td className="py-2 px-4 whitespace-nowrap">{i.category}</td>
                  <td className="py-2 px-4 whitespace-nowrap">{i.quantity}</td>
                  <td className={`py-2 px-4 whitespace-nowrap font-semibold ${i.status === 'Available' ? 'text-green-600' : i.status === 'Low Stock' ? 'text-yellow-600' : 'text-blue-600'}`}>{i.status}</td>
                  <td className="py-2 px-4 whitespace-nowrap">{i.lastUpdated}</td>
                  <td className="py-2 px-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:underline mr-2">View</button>
                    <button className="text-green-600 hover:underline">Update</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryScreen;
