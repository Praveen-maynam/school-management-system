import React, { useState } from 'react';

const mockAthletes = [
  { id: 1, name: 'Michael Jordan', sport: 'Basketball', age: 21 },
  { id: 2, name: 'Serena Williams', sport: 'Tennis', age: 23 },
  { id: 3, name: 'Usain Bolt', sport: 'Track', age: 22 },
  { id: 4, name: 'Katie Ledecky', sport: 'Swimming', age: 20 },
];

const AthletesListScreen = () => {
  const [search, setSearch] = useState('');
  const filtered = mockAthletes.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.sport.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">All Athletes</h1>
      <input
        className="border px-3 py-2 rounded mb-4 w-full max-w-xs"
        placeholder="Search athletes..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-blue-100 text-blue-900">
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Sport</th>
              <th className="py-2 px-4 text-left">Age</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id} className="border-b hover:bg-blue-50">
                <td className="py-2 px-4">{a.name}</td>
                <td className="py-2 px-4">{a.sport}</td>
                <td className="py-2 px-4">{a.age}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={3} className="py-4 text-center text-gray-400">No athletes found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AthletesListScreen;
