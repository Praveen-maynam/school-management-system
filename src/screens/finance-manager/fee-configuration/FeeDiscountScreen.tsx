import React from 'react';

// Mock data
const discounts = [
  { id: 1, name: 'Sibling Discount', value: '10%', criteria: 'For siblings' },
  { id: 2, name: 'Merit Scholarship', value: '15%', criteria: 'Top 5% students' },
  { id: 3, name: 'Early Bird', value: '5%', criteria: 'Paid before 1st April' },
];

const FeeDiscountScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Discount Rules</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Name</th>
              <th className="py-2 px-4 font-medium text-gray-700">Value</th>
              <th className="py-2 px-4 font-medium text-gray-700">Criteria</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((d) => (
              <tr key={d.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{d.name}</td>
                <td className="py-2 px-4 whitespace-nowrap">{d.value}</td>
                <td className="py-2 px-4 whitespace-nowrap">{d.criteria}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">Add Discount Rule</button>
      </div>
    </div>
  );
};

export default FeeDiscountScreen;
