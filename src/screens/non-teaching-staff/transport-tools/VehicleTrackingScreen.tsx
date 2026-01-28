import React from 'react';

// Mock data
const vehicles = [
  { id: 1, number: 'KA01AB1234', status: 'On Route', location: 'Stop 5' },
  { id: 2, number: 'KA01CD5678', status: 'Idle', location: 'School' },
];

const VehicleTrackingScreen: React.FC = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Vehicle Tracking</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Vehicle Number</th>
              <th className="py-2 px-4 font-medium text-gray-700">Status</th>
              <th className="py-2 px-4 font-medium text-gray-700">Current Location</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => (
              <tr key={v.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{v.number}</td>
                <td className={`py-2 px-4 whitespace-nowrap font-semibold ${v.status === 'On Route' ? 'text-green-600' : 'text-yellow-600'}`}>{v.status}</td>
                <td className="py-2 px-4 whitespace-nowrap">{v.location}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">Track</button>
                  <button className="text-red-600 hover:underline">Report Issue</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleTrackingScreen;
