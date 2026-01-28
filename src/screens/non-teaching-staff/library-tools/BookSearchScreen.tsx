import React, { useState } from 'react';

// Mock data
const books = [
  { id: 1, title: 'Mathematics 101', author: 'A. Sharma', available: true },
  { id: 2, title: 'English Grammar', author: 'B. Verma', available: false },
];

const BookSearchScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const filtered = books.filter(b => b.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Book Search</h1>
      <input
        type="text"
        className="w-full border rounded px-3 py-2 mb-4"
        placeholder="Search by title..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Title</th>
              <th className="py-2 px-4 font-medium text-gray-700">Author</th>
              <th className="py-2 px-4 font-medium text-gray-700">Availability</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{b.title}</td>
                <td className="py-2 px-4 whitespace-nowrap">{b.author}</td>
                <td className={`py-2 px-4 whitespace-nowrap font-semibold ${b.available ? 'text-green-600' : 'text-red-600'}`}>{b.available ? 'Available' : 'Issued'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookSearchScreen;
