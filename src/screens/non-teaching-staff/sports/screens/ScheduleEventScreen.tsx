import React, { useState } from 'react';

const ScheduleEventScreen = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [venue, setVenue] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(`Event "${name}" scheduled for ${date} at ${time}, venue: ${venue}`);
    setName('');
    setDate('');
    setTime('');
    setVenue('');
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Schedule Event</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 space-y-4">
        <div>
          <label className="block mb-1 font-medium">Event Name</label>
          <input
            className="border px-3 py-2 rounded w-full"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium">Date</label>
            <input
              type="date"
              className="border px-3 py-2 rounded w-full"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">Time</label>
            <input
              type="time"
              className="border px-3 py-2 rounded w-full"
              value={time}
              onChange={e => setTime(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">Venue</label>
          <input
            className="border px-3 py-2 rounded w-full"
            value={venue}
            onChange={e => setVenue(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Schedule</button>
        {message && <div className="text-green-600 mt-2">{message}</div>}
      </form>
    </div>
  );
};

export default ScheduleEventScreen;
