import React from 'react';

// Mock data
const issues = [
  { id: 1, book: 'Mathematics 101', user: 'John Doe', date: '2026-01-20', status: 'Issued' },
  { id: 2, book: 'English Grammar', user: 'Jane Smith', date: '2026-01-18', status: 'Returned' },
];

const BookIssueReturnScreen: React.FC = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Book Issue / Return</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Book</th>
              <th className="py-2 px-4 font-medium text-gray-700">User</th>
              <th className="py-2 px-4 font-medium text-gray-700">Date</th>
              <th className="py-2 px-4 font-medium text-gray-700">Status</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((i) => (
              <tr key={i.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{i.book}</td>
                <td className="py-2 px-4 whitespace-nowrap">{i.user}</td>
                <td className="py-2 px-4 whitespace-nowrap">{i.date}</td>
                <td className={`py-2 px-4 whitespace-nowrap font-semibold ${i.status === 'Issued' ? 'text-yellow-600' : 'text-green-600'}`}>{i.status}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">Return</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">Issue Book</button>
      </div>
    </div>
  );
};

export default BookIssueReturnScreen;
