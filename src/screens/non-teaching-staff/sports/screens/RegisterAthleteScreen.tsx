import React, { useState } from 'react';

const RegisterAthleteScreen = () => {
  const [name, setName] = useState('');
  const [sport, setSport] = useState('');
  const [age, setAge] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(`Athlete "${name}" registered for "${sport}"!`);
    setName('');
    setSport('');
    setAge('');
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Register Athlete</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 space-y-4">
        <div>
          <label className="block mb-1 font-medium">Athlete Name</label>
          <input
            className="border px-3 py-2 rounded w-full"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Sport</label>
          <input
            className="border px-3 py-2 rounded w-full"
            value={sport}
            onChange={e => setSport(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Age</label>
          <input
            type="number"
            className="border px-3 py-2 rounded w-full"
            value={age}
            onChange={e => setAge(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Register</button>
        {message && <div className="text-green-600 mt-2">{message}</div>}
      </form>
    </div>
  );
};

export default RegisterAthleteScreen;
