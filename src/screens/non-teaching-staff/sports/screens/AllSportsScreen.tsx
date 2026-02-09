import React, { useState } from 'react';

const mockSports = [
  { id: 1, name: 'Basketball', coach: 'John Doe', teams: 4 },
  { id: 2, name: 'Football', coach: 'Jane Smith', teams: 6 },
  { id: 3, name: 'Swimming', coach: 'Alice Brown', teams: 2 },
  { id: 4, name: 'Tennis', coach: 'Bob Lee', teams: 3 },
];

const AllSportsScreen = () => {
  const [search, setSearch] = useState('');
  const filtered = mockSports.filter(sport =>
    sport.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">All Sports</h1>
      <input
        className="border px-3 py-2 rounded mb-4 w-full max-w-xs"
        placeholder="Search sports..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-blue-100 text-blue-900">
              <th className="py-2 px-4 text-left">Sport</th>
              <th className="py-2 px-4 text-left">Coach</th>
              <th className="py-2 px-4 text-left">Teams</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(sport => (
              <tr key={sport.id} className="border-b hover:bg-blue-50">
                <td className="py-2 px-4">{sport.name}</td>
                <td className="py-2 px-4">{sport.coach}</td>
                <td className="py-2 px-4">{sport.teams}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={3} className="py-4 text-center text-gray-400">No sports found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllSportsScreen;
