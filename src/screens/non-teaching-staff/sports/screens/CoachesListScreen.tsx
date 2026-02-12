import React, { useState } from 'react';

const mockCoaches = [
  { id: 1, name: 'John Doe', sport: 'Basketball', teams: 2 },
  { id: 2, name: 'Jane Smith', sport: 'Football', teams: 3 },
  { id: 3, name: 'Alice Brown', sport: 'Swimming', teams: 1 },
];

const CoachesListScreen = () => {
  const [search, setSearch] = useState('');
  const filtered = mockCoaches.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.sport.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">All Coaches</h1>
      <input
        className="border px-3 py-2 rounded mb-4 w-full max-w-xs"
        placeholder="Search coaches..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-blue-100 text-blue-900">
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Sport</th>
              <th className="py-2 px-4 text-left">Teams</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="border-b hover:bg-blue-50">
                <td className="py-2 px-4">{c.name}</td>
                <td className="py-2 px-4">{c.sport}</td>
                <td className="py-2 px-4">{c.teams}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={3} className="py-4 text-center text-gray-400">No coaches found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoachesListScreen;
