import React from 'react';

const suppliers = [
  {
    id: 1,
    name: 'SportsPro Supplies',
    contact: 'sportspro@email.com',
    phone: '555-1234',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Athlete Gear Co.',
    contact: 'athletegear@email.com',
    phone: '555-5678',
    status: 'Inactive',
  },
  {
    id: 3,
    name: 'Champion Equipment',
    contact: 'champion@email.com',
    phone: '555-8765',
    status: 'Active',
  },
];

const statusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'text-green-600';
    case 'Inactive':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

const SuppliersScreen = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Suppliers</h1>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Supplier Name</th>
              <th className="px-4 py-2 text-left">Contact Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier, idx) => (
              <tr key={supplier.id} className="border-b hover:bg-blue-50">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2 font-medium">{supplier.name}</td>
                <td className="px-4 py-2">{supplier.contact}</td>
                <td className="px-4 py-2">{supplier.phone}</td>
                <td className={`px-4 py-2 font-semibold ${statusColor(supplier.status)}`}>{supplier.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuppliersScreen;
