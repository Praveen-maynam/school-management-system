import React, { useState } from 'react';

const initialBookings = [
  {
    id: 1,
    facility: 'Tennis Court',
    date: '2026-02-10',
    time: '10:00 AM - 12:00 PM',
    bookedBy: 'Coach John',
  },
  {
    id: 2,
    facility: 'Main Sports Hall',
    date: '2026-02-12',
    time: '2:00 PM - 4:00 PM',
    bookedBy: 'Ms. Smith',
  },
];

const FacilityBookingScreen = () => {
  const [facility, setFacility] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [bookedBy, setBookedBy] = useState('');
  const [bookings, setBookings] = useState(initialBookings);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!facility || !date || !time || !bookedBy) {
      setMessage('Please fill all fields.');
      return;
    }
    setBookings([
      ...bookings,
      {
        id: bookings.length + 1,
        facility,
        date,
        time,
        bookedBy,
      },
    ]);
    setFacility('');
    setDate('');
    setTime('');
    setBookedBy('');
    setMessage('Booking added!');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Facility Booking</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Facility</label>
            <input
              className="border px-3 py-2 rounded w-full"
              value={facility}
              onChange={e => setFacility(e.target.value)}
              placeholder="e.g. Tennis Court"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Date</label>
            <input
              type="date"
              className="border px-3 py-2 rounded w-full"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Time</label>
            <input
              className="border px-3 py-2 rounded w-full"
              value={time}
              onChange={e => setTime(e.target.value)}
              placeholder="e.g. 10:00 AM - 12:00 PM"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Booked By</label>
            <input
              className="border px-3 py-2 rounded w-full"
              value={bookedBy}
              onChange={e => setBookedBy(e.target.value)}
              placeholder="e.g. Coach John"
              required
            />
          </div>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Book Facility</button>
        {message && <div className="text-green-600 mt-2">{message}</div>}
      </form>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Facility</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Booked By</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, idx) => (
              <tr key={b.id} className="border-b hover:bg-blue-50">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2 font-medium">{b.facility}</td>
                <td className="px-4 py-2">{b.date}</td>
                <td className="px-4 py-2">{b.time}</td>
                <td className="px-4 py-2">{b.bookedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FacilityBookingScreen;
