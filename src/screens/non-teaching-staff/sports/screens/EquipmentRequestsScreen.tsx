import React from 'react';

const requests = [
  {
    id: 1,
    item: 'Basketballs',
    quantity: 10,
    requestedBy: 'Coach John',
    date: '2026-01-20',
    status: 'Pending',
  },
  {
    id: 2,
    item: 'Team Jerseys',
    quantity: 25,
    requestedBy: 'Ms. Smith',
    date: '2026-01-18',
    status: 'Approved',
  },
  {
    id: 3,
    item: 'First Aid Kits',
    quantity: 5,
    requestedBy: 'Coach Lee',
    date: '2026-01-15',
    status: 'Rejected',
  },
];

const statusColor = (status: string) => {
  switch (status) {
    case 'Pending':
      return 'text-yellow-600';
    case 'Approved':
      return 'text-green-600';
    case 'Rejected':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

const EquipmentRequestsScreen = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Equipment Requests</h1>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Item</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Requested By</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, idx) => (
              <tr key={req.id} className="border-b hover:bg-blue-50">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2 font-medium">{req.item}</td>
                <td className="px-4 py-2">{req.quantity}</td>
                <td className="px-4 py-2">{req.requestedBy}</td>
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

export default EquipmentRequestsScreen;
