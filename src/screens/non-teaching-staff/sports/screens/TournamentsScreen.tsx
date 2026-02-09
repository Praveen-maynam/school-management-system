import React from 'react';

const tournaments = [
  { id: 1, name: 'Spring Cup', sport: 'Football', date: '2026-03-10', status: 'Upcoming' },
  { id: 2, name: 'Summer Splash', sport: 'Swimming', date: '2026-06-15', status: 'Completed' },
  { id: 3, name: 'Autumn Open', sport: 'Tennis', date: '2026-09-05', status: 'Upcoming' },
];

const TournamentsScreen = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4 text-blue-900">Tournaments</h1>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-blue-100 text-blue-900">
            <th className="py-2 px-4 text-left">Tournament</th>
            <th className="py-2 px-4 text-left">Sport</th>
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {tournaments.map(t => (
            <tr key={t.id} className="border-b hover:bg-blue-50">
              <td className="py-2 px-4">{t.name}</td>
              <td className="py-2 px-4">{t.sport}</td>
              <td className="py-2 px-4">{t.date}</td>
              <td className="py-2 px-4">
                <span className={
                  t.status === 'Upcoming' ? 'text-green-600 font-semibold' : 'text-gray-500'
                }>{t.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default TournamentsScreen;
