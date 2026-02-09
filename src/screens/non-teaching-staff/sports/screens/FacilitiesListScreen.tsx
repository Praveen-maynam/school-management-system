import React from 'react';

const facilities = [
  {
    id: 1,
    name: 'Main Sports Hall',
    type: 'Indoor',
    capacity: 500,
    status: 'Available',
  },
  {
    id: 2,
    name: 'Football Field',
    type: 'Outdoor',
    capacity: 1000,
    status: 'Under Maintenance',
  },
  {
    id: 3,
    name: 'Swimming Pool',
    type: 'Indoor',
    capacity: 200,
    status: 'Available',
  },
  {
    id: 4,
    name: 'Tennis Court',
    type: 'Outdoor',
    capacity: 100,
    status: 'Available',
  },
];

const statusColor = (status: string) => {
  switch (status) {
    case 'Available':
      return 'text-green-600';
    case 'Under Maintenance':
      return 'text-yellow-600';
    default:
      return 'text-gray-600';
  }
};

const FacilitiesListScreen = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Facilities List</h1>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Facility Name</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Capacity</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {facilities.map((facility, idx) => (
              <tr key={facility.id} className="border-b hover:bg-blue-50">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2 font-medium">{facility.name}</td>
                <td className="px-4 py-2">{facility.type}</td>
                <td className="px-4 py-2">{facility.capacity}</td>
                <td className={`px-4 py-2 font-semibold ${statusColor(facility.status)}`}>{facility.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FacilitiesListScreen;
