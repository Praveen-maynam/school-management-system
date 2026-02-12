import React, { useState } from 'react';

const AddSportScreen = () => {
  const [name, setName] = useState('');
  const [coach, setCoach] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(`Sport "${name}" with coach "${coach}" added!`);
    setName('');
    setCoach('');
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Add New Sport</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 space-y-4">
        <div>
          <label className="block mb-1 font-medium">Sport Name</label>
          <input
            className="border px-3 py-2 rounded w-full"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Coach Name</label>
          <input
            className="border px-3 py-2 rounded w-full"
            value={coach}
            onChange={e => setCoach(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Sport</button>
        {message && <div className="text-green-600 mt-2">{message}</div>}
      </form>
    </div>
  );
};

export default AddSportScreen;
