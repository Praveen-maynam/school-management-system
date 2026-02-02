
import React, { useState } from 'react';

// Mock exam data
const exams = [
  { id: 1, name: 'Mid Term Exam', date: '2026-03-10', status: 'Scheduled', invigilator: 'Mr. John', results: 'Pending' },
  { id: 2, name: 'Final Exam', date: '2026-06-15', status: 'Scheduled', invigilator: 'Ms. Smith', results: 'Pending' },
  { id: 3, name: 'Unit Test 1', date: '2026-01-20', status: 'Completed', invigilator: 'Mr. Lee', results: 'Published' },
  { id: 4, name: 'Unit Test 2', date: '2026-02-15', status: 'Completed', invigilator: 'Ms. Brown', results: 'Published' },
];

const ExaminationScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const filtered = exams.filter(e => e.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Examination Management</h1>
      <input
        type="text"
        className="w-full border rounded px-3 py-2 mb-4"
        placeholder="Search by exam name..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Exam Name</th>
              <th className="py-2 px-4 font-medium text-gray-700">Date</th>
              <th className="py-2 px-4 font-medium text-gray-700">Status</th>
              <th className="py-2 px-4 font-medium text-gray-700">Invigilator</th>
              <th className="py-2 px-4 font-medium text-gray-700">Results</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} className="py-4 text-center text-gray-400">No exams found.</td></tr>
            ) : (
              filtered.map((e) => (
                <tr key={e.id} className="border-b last:border-b-0">
                  <td className="py-2 px-4 whitespace-nowrap">{e.name}</td>
                  <td className="py-2 px-4 whitespace-nowrap">{e.date}</td>
                  <td className={`py-2 px-4 whitespace-nowrap font-semibold ${e.status === 'Scheduled' ? 'text-blue-600' : 'text-green-600'}`}>{e.status}</td>
                  <td className="py-2 px-4 whitespace-nowrap">{e.invigilator}</td>
                  <td className={`py-2 px-4 whitespace-nowrap font-semibold ${e.results === 'Published' ? 'text-green-600' : 'text-yellow-600'}`}>{e.results}</td>
                  <td className="py-2 px-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:underline mr-2">View</button>
                    {e.status === 'Scheduled' && <button className="text-green-600 hover:underline">Assign</button>}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExaminationScreen;
