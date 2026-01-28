import React from 'react';

// Mock data
const applications = [
  { id: 1, applicant: 'John Doe', type: 'Leave', status: 'Pending' },
  { id: 2, applicant: 'Jane Smith', type: 'Admission', status: 'Processed' },
];

const ApplicationProcessingScreen: React.FC = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Application Processing</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Applicant</th>
              <th className="py-2 px-4 font-medium text-gray-700">Type</th>
              <th className="py-2 px-4 font-medium text-gray-700">Status</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((a) => (
              <tr key={a.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{a.applicant}</td>
                <td className="py-2 px-4 whitespace-nowrap">{a.type}</td>
                <td className={`py-2 px-4 whitespace-nowrap font-semibold ${a.status === 'Processed' ? 'text-green-600' : 'text-yellow-600'}`}>{a.status}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">View</button>
                  <button className="text-green-600 hover:underline">Process</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationProcessingScreen;
