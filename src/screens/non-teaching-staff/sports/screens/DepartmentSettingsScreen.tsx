import React, { useState } from 'react';

const DepartmentSettingsScreen = () => {
  const [departmentName, setDepartmentName] = useState('Sports Department');
  const [head, setHead] = useState('Coach John');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Settings saved!');
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Department Settings</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 space-y-4">
        <div>
          <label className="block mb-1 font-medium">Department Name</label>
          <input
            className="border px-3 py-2 rounded w-full"
            value={departmentName}
            onChange={e => setDepartmentName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Department Head</label>
          <input
            className="border px-3 py-2 rounded w-full"
            value={head}
            onChange={e => setHead(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save Settings</button>
        {message && <div className="text-green-600 mt-2">{message}</div>}
      </form>
    </div>
  );
};

export default DepartmentSettingsScreen;
