import React, { useState } from 'react';

const LeaveApplicationScreen: React.FC = () => {
  const [reason, setReason] = useState('');
  const [days, setDays] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Leave Application</h1>
      <form className="bg-white rounded-lg shadow p-6" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Reason</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={reason}
            onChange={e => setReason(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Number of Days</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={days}
            min={1}
            onChange={e => setDays(Number(e.target.value))}
            required
          />
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition" type="submit">
          Apply
        </button>
        {submitted && <div className="mt-4 text-green-600 font-semibold">Leave application submitted!</div>}
      </form>
    </div>
  );
};

export default LeaveApplicationScreen;
