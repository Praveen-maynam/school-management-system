import React from 'react';

// Mock data
const routes = [
  { id: 1, name: 'Route 1', stops: 10, driver: 'Ravi Kumar' },
  { id: 2, name: 'Route 2', stops: 8, driver: 'Sunil Singh' },
];

const RouteManagementScreen: React.FC = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Route Management</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Route</th>
              <th className="py-2 px-4 font-medium text-gray-700">Stops</th>
              <th className="py-2 px-4 font-medium text-gray-700">Driver</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((r) => (
              <tr key={r.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{r.name}</td>
                <td className="py-2 px-4 whitespace-nowrap">{r.stops}</td>
                <td className="py-2 px-4 whitespace-nowrap">{r.driver}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">Add Route</button>
      </div>
    </div>
  );
};

export default RouteManagementScreen;
