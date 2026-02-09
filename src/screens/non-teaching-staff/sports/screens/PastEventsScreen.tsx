import React from 'react';

const pastEvents = [
  { id: 1, name: 'Winter Games', date: '2025-12-10', venue: 'Main Arena', winner: 'Lions' },
  { id: 2, name: 'Autumn Open', date: '2025-09-05', venue: 'Tennis Court', winner: 'Serena Williams' },
  { id: 3, name: 'Spring Cup', date: '2025-03-10', venue: 'Football Field', winner: 'Sharks' },
];

const PastEventsScreen = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4 text-blue-900">Past Events</h1>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-blue-100 text-blue-900">
            <th className="py-2 px-4 text-left">Event</th>
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left">Venue</th>
            <th className="py-2 px-4 text-left">Winner</th>
          </tr>
        </thead>
        <tbody>
          {pastEvents.map(e => (
            <tr key={e.id} className="border-b hover:bg-blue-50">
              <td className="py-2 px-4">{e.name}</td>
              <td className="py-2 px-4">{e.date}</td>
              <td className="py-2 px-4">{e.venue}</td>
              <td className="py-2 px-4">{e.winner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default PastEventsScreen;
