import React, { useState } from 'react';

const MarkAttendanceScreen: React.FC = () => {
  const [status, setStatus] = useState<'Present' | 'Absent' | ''>('');
  const [marked, setMarked] = useState(false);

  const handleMark = (s: 'Present' | 'Absent') => {
    setStatus(s);
    setMarked(true);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Mark Attendance</h1>
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <div className="mb-4">
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded mr-4"
            onClick={() => handleMark('Present')}
            disabled={marked}
          >
            Present
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded"
            onClick={() => handleMark('Absent')}
            disabled={marked}
          >
            Absent
          </button>
        </div>
        {marked && (
          <div className={`text-lg font-bold ${status === 'Present' ? 'text-green-600' : 'text-red-600'}`}>Marked as {status}</div>
        )}
      </div>
    </div>
  );
};

export default MarkAttendanceScreen;
