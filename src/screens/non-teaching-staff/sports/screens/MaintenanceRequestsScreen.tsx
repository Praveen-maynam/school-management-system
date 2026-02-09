import React from 'react';

const requests = [
  {
    id: 1,
    facility: 'Football Field',
    issue: 'Broken goal post',
    date: '2026-01-15',
    status: 'Pending',
  },
  {
    id: 2,
    facility: 'Swimming Pool',
    issue: 'Water leakage',
    date: '2026-01-10',
    status: 'In Progress',
  },
  {
    id: 3,
    facility: 'Main Sports Hall',
    issue: 'Lighting issue',
    date: '2026-01-05',
    status: 'Resolved',
  },
];

const statusColor = (status: string) => {
  switch (status) {
    case 'Pending':
      return 'text-yellow-600';
    case 'In Progress':
      return 'text-blue-600';
    case 'Resolved':
      return 'text-green-600';
    default:
      return 'text-gray-600';
  }
};

const MaintenanceRequestsScreen = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Maintenance Requests</h1>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Facility</th>
              <th className="px-4 py-2 text-left">Issue</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, idx) => (
              <tr key={req.id} className="border-b hover:bg-blue-50">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2 font-medium">{req.facility}</td>
                <td className="px-4 py-2">{req.issue}</td>
                <td className="px-4 py-2">{req.date}</td>
                <td className={`px-4 py-2 font-semibold ${statusColor(req.status)}`}>{req.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaintenanceRequestsScreen;
