import React from 'react';

const inventory = [
  {
    id: 1,
    item: 'Football',
    category: 'Equipment',
    quantity: 30,
    status: 'Available',
  },
  {
    id: 2,
    item: 'Tennis Racket',
    category: 'Equipment',
    quantity: 15,
    status: 'Low Stock',
  },
  {
    id: 3,
    item: 'Team Jersey',
    category: 'Apparel',
    quantity: 50,
    status: 'Available',
  },
  {
    id: 4,
    item: 'Swimming Goggles',
    category: 'Equipment',
    quantity: 8,
    status: 'Low Stock',
  },
  {
    id: 5,
    item: 'First Aid Kit',
    category: 'Medical',
    quantity: 5,
    status: 'Critical',
  },
];

const statusColor = (status: string) => {
  switch (status) {
    case 'Available':
      return 'text-green-600';
    case 'Low Stock':
      return 'text-yellow-600';
    case 'Critical':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

const InventoryListScreen = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Inventory List</h1>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Item</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((inv, idx) => (
              <tr key={inv.id} className="border-b hover:bg-blue-50">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2 font-medium">{inv.item}</td>
                <td className="px-4 py-2">{inv.category}</td>
                <td className="px-4 py-2">{inv.quantity}</td>
                <td className={`px-4 py-2 font-semibold ${statusColor(inv.status)}`}>{inv.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryListScreen;
