import React from 'react';

const reports = [
  {
    id: 1,
    category: 'Equipment Purchase',
    amount: 1200,
    date: '2026-01-10',
    status: 'Approved',
  },
  {
    id: 2,
    category: 'Facility Maintenance',
    amount: 800,
    date: '2026-01-15',
    status: 'Pending',
  },
  {
    id: 3,
    category: 'Event Organization',
    amount: 1500,
    date: '2026-01-20',
    status: 'Approved',
  },
  {
    id: 4,
    category: 'Miscellaneous',
    amount: 300,
    date: '2026-01-22',
    status: 'Rejected',
  },
];

const statusColor = (status: string) => {
  switch (status) {
    case 'Approved':
      return 'text-green-600';
    case 'Pending':
      return 'text-yellow-600';
    case 'Rejected':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

const FinancialReportsScreen = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Financial Reports</h1>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Amount ($)</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, idx) => (
              <tr key={report.id} className="border-b hover:bg-blue-50">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2 font-medium">{report.category}</td>
                <td className="px-4 py-2">{report.amount}</td>
                <td className="px-4 py-2">{report.date}</td>
                <td className={`px-4 py-2 font-semibold ${statusColor(report.status)}`}>{report.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialReportsScreen;
