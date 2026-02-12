import React from 'react';

const events = [
  { id: 1, name: 'Basketball Championship', date: '2026-02-15', time: '10:00 AM', venue: 'Main Arena' },
  { id: 2, name: 'Swimming Competition', date: '2026-02-18', time: '02:00 PM', venue: 'Aquatic Center' },
  { id: 3, name: 'Track & Field Meet', date: '2026-02-22', time: '09:00 AM', venue: 'Athletic Stadium' },
];

const EventCalendarScreen = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4 text-blue-900">Event Calendar</h1>
    <div className="space-y-4">
      {events.map(event => (
        <div key={event.id} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors bg-white">
          <h3 className="font-semibold text-slate-900 mb-2">{event.name}</h3>
          <div className="grid grid-cols-3 gap-2 text-sm text-slate-600">
            <div>{event.date}</div>
            <div>{event.time}</div>
            <div>{event.venue}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default EventCalendarScreen;
