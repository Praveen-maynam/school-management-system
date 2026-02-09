import React, { useState } from 'react';

const mockTeams = [
  { id: 1, name: 'Lions', sport: 'Basketball', coach: 'John Doe', members: 12 },
  { id: 2, name: 'Sharks', sport: 'Swimming', coach: 'Alice Brown', members: 8 },
  { id: 3, name: 'Eagles', sport: 'Football', coach: 'Jane Smith', members: 15 },
];

const TeamsManagementScreen = () => {
  const [teams, setTeams] = useState(mockTeams);
  const handleRemove = (id: number) => {
    setTeams(teams.filter(t => t.id !== id));
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Teams Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-blue-100 text-blue-900">
              <th className="py-2 px-4 text-left">Team</th>
              <th className="py-2 px-4 text-left">Sport</th>
              <th className="py-2 px-4 text-left">Coach</th>
              <th className="py-2 px-4 text-left">Members</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams.map(team => (
              <tr key={team.id} className="border-b hover:bg-blue-50">
                <td className="py-2 px-4">{team.name}</td>
                <td className="py-2 px-4">{team.sport}</td>
                <td className="py-2 px-4">{team.coach}</td>
                <td className="py-2 px-4">{team.members}</td>
                <td className="py-2 px-4">
                  <button className="text-red-600 hover:underline" onClick={() => handleRemove(team.id)}>Remove</button>
                </td>
              </tr>
            ))}
            {teams.length === 0 && (
              <tr><td colSpan={5} className="py-4 text-center text-gray-400">No teams found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamsManagementScreen;
