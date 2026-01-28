import React from 'react';

// Mock data
const fines = [
  { id: 1, user: 'John Doe', book: 'Mathematics 101', amount: 50, date: '2026-01-22' },
  { id: 2, user: 'Jane Smith', book: 'English Grammar', amount: 30, date: '2026-01-19' },
];

const FineCollectionScreen: React.FC = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Fine Collection</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">User</th>
              <th className="py-2 px-4 font-medium text-gray-700">Book</th>
              <th className="py-2 px-4 font-medium text-gray-700">Amount</th>
              <th className="py-2 px-4 font-medium text-gray-700">Date</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fines.map((f) => (
              <tr key={f.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{f.user}</td>
                <td className="py-2 px-4 whitespace-nowrap">{f.book}</td>
                <td className="py-2 px-4 whitespace-nowrap">₹{f.amount.toLocaleString()}</td>
                <td className="py-2 px-4 whitespace-nowrap">{f.date}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">Collect</button>
                  <button className="text-red-600 hover:underline">Waive</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FineCollectionScreen;
