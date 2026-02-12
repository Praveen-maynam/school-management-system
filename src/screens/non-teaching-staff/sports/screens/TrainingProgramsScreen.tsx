import React, { useState } from 'react';

const mockPrograms = [
  { id: 1, name: 'Strength Training', coach: 'John Doe', duration: '8 weeks' },
  { id: 2, name: 'Endurance Boost', coach: 'Jane Smith', duration: '6 weeks' },
  { id: 3, name: 'Speed Drills', coach: 'Alice Brown', duration: '4 weeks' },
];

const TrainingProgramsScreen = () => {
  const [programs, setPrograms] = useState(mockPrograms);
  const handleRemove = (id: number) => {
    setPrograms(programs.filter(p => p.id !== id));
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Training Programs</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-blue-100 text-blue-900">
              <th className="py-2 px-4 text-left">Program</th>
              <th className="py-2 px-4 text-left">Coach</th>
              <th className="py-2 px-4 text-left">Duration</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {programs.map(program => (
              <tr key={program.id} className="border-b hover:bg-blue-50">
                <td className="py-2 px-4">{program.name}</td>
                <td className="py-2 px-4">{program.coach}</td>
                <td className="py-2 px-4">{program.duration}</td>
                <td className="py-2 px-4">
                  <button className="text-red-600 hover:underline" onClick={() => handleRemove(program.id)}>Remove</button>
                </td>
              </tr>
            ))}
            {programs.length === 0 && (
              <tr><td colSpan={4} className="py-4 text-center text-gray-400">No programs found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainingProgramsScreen;
