
import React, { useState } from 'react';

// Mock sports equipment/activity data
const sportsData = [
  { id: 1, name: 'Football', type: 'Equipment', quantity: 10, status: 'Available', lastUsed: '2026-01-25' },
  { id: 2, name: 'Basketball', type: 'Equipment', quantity: 7, status: 'Available', lastUsed: '2026-01-22' },
  { id: 3, name: 'Annual Sports Day', type: 'Event', date: '2026-03-05', status: 'Scheduled', coordinator: 'Mr. Patel' },
  { id: 4, name: 'Cricket Bat', type: 'Equipment', quantity: 5, status: 'Issued', lastUsed: '2026-01-20' },
  { id: 5, name: 'Inter-school Volleyball', type: 'Event', date: '2026-02-18', status: 'Completed', coordinator: 'Ms. Rao' },
];


const SportsScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const filtered = sportsData.filter(s => s.name.toLowerCase().includes(query.toLowerCase()));

  // Dashboard summary
  const totalEquipment = sportsData.filter(s => s.type === 'Equipment').length;
  const totalEvents = sportsData.filter(s => s.type === 'Event').length;
  const issuedEquipment = sportsData.filter(s => s.type === 'Equipment' && s.status === 'Issued').length;
  const upcomingEvents = sportsData.filter(s => s.type === 'Event' && s.status === 'Scheduled').length;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-blue-800">Sports Staff Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-100 to-blue-300 rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-4xl font-bold text-blue-700">{totalEquipment}</span>
          <span className="mt-2 text-lg font-medium text-blue-900">Total Equipment</span>
        </div>
        <div className="bg-gradient-to-br from-green-100 to-green-300 rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-4xl font-bold text-green-700">{totalEvents}</span>
          <span className="mt-2 text-lg font-medium text-green-900">Total Events</span>
        </div>
        <div className="bg-gradient-to-br from-yellow-100 to-yellow-300 rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-4xl font-bold text-yellow-700">{issuedEquipment}</span>
          <span className="mt-2 text-lg font-medium text-yellow-900">Issued Equipment</span>
        </div>
        <div className="bg-gradient-to-br from-purple-100 to-purple-300 rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-4xl font-bold text-purple-700">{upcomingEvents}</span>
          <span className="mt-2 text-lg font-medium text-purple-900">Upcoming Events</span>
        </div>
      </div>

      {/* Search and Table */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h2 className="text-xl font-semibold text-gray-800">Equipment & Events</h2>
          <input
            type="text"
            className="w-full md:w-64 border-2 border-blue-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Search by name..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-blue-50">
                <th className="py-3 px-4 font-semibold text-blue-700">Name</th>
                <th className="py-3 px-4 font-semibold text-blue-700">Type</th>
                <th className="py-3 px-4 font-semibold text-blue-700">Details</th>
                <th className="py-3 px-4 font-semibold text-blue-700">Status</th>
                <th className="py-3 px-4 font-semibold text-blue-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="py-6 text-center text-gray-400">No records found.</td></tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.id} className="border-b last:border-b-0 hover:bg-blue-50 transition">
                    <td className="py-3 px-4 whitespace-nowrap font-medium">{s.name}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{s.type}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {s.type === 'Equipment' ? (
                        <>
                          Qty: <span className="font-semibold">{s.quantity}</span><br />
                          Last Used: <span className="font-semibold">{s.lastUsed}</span>
                        </>
                      ) : (
                        <>
                          Date: <span className="font-semibold">{s.date}</span><br />
                          Coordinator: <span className="font-semibold">{s.coordinator}</span>
                        </>
                      )}
                    </td>
                    <td className={`py-3 px-4 whitespace-nowrap font-semibold ${s.status === 'Available' || s.status === 'Scheduled' ? 'text-green-600' : s.status === 'Issued' ? 'text-yellow-600' : 'text-blue-600'}`}>{s.status}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
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
    </div>
  );
};

export default SportsScreen;
