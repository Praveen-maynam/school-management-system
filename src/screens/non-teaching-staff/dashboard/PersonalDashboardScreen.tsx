import React from 'react';

// Mock data
const tasks = [
  { id: 1, task: 'Check attendance records', status: 'Pending' },
  { id: 2, task: 'Submit leave application', status: 'Completed' },
  { id: 3, task: 'Update maintenance log', status: 'Pending' },
];
const attendanceStatus = 'Present';
const recentUpdates = [
  'Library inventory updated',
  'New transport route assigned',
  'Payslip for January generated',
];
const quickLinks = [
  { label: 'Mark Attendance', href: '#' },
  { label: 'Apply Leave', href: '#' },
  { label: 'View Payslip', href: '#' },
  { label: 'Role Tools', href: '#' },
];

const PersonalDashboardScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Staff Personal Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Today's Tasks */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Today's Tasks</h2>
          <ul>
            {tasks.map((t) => (
              <li key={t.id} className="mb-2 flex items-center">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${t.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                <span>{t.task}</span>
                <span className={`ml-auto text-xs ${t.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>{t.status}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Attendance Status & Recent Updates */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-2">Attendance Status</h2>
            <span className={`text-2xl font-bold ${attendanceStatus === 'Present' ? 'text-green-600' : 'text-red-600'}`}>{attendanceStatus}</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Recent Updates</h2>
            <ul className="list-disc pl-5">
              {recentUpdates.map((u, idx) => (
                <li key={idx} className="mb-1">{u}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Quick Links */}
      <div className="bg-white rounded-lg shadow p-6 flex flex-wrap gap-4">
        <h2 className="text-lg font-semibold mb-4 w-full">Quick Links</h2>
        {quickLinks.map((link, idx) => (
          <a
            key={idx}
            href={link.href}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default PersonalDashboardScreen;
