import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data
const loginSummary = {
  total: 12450,
  failed: 120,
  uniqueUsers: 3400,
};

const loginTrendData = [
  { day: 'Mon', logins: 1800 },
  { day: 'Tue', logins: 2100 },
  { day: 'Wed', logins: 2000 },
  { day: 'Thu', logins: 2200 },
  { day: 'Fri', logins: 2500 },
  { day: 'Sat', logins: 1200 },
  { day: 'Sun', logins: 650 },
];

const failedLogins = [
  { user: 'john.doe', time: '2026-01-27 09:12', reason: 'Wrong password' },
  { user: 'jane.smith', time: '2026-01-27 10:45', reason: 'Account locked' },
  { user: 'admin', time: '2026-01-27 11:03', reason: 'Wrong password' },
  { user: 'student01', time: '2026-01-27 12:22', reason: 'User not found' },
  { user: 'parent02', time: '2026-01-27 13:10', reason: 'Wrong password' },
];

const LoginAnalyticsScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Login Analytics</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
          <div className="text-3xl font-bold">{loginSummary.total.toLocaleString()}</div>
          <div className="text-gray-500 text-sm">Total Logins (This Week)</div>
        </div>
        <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
          <div className="text-3xl font-bold text-red-600">{loginSummary.failed.toLocaleString()}</div>
          <div className="text-gray-500 text-sm">Failed Logins</div>
        </div>
        <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
          <div className="text-3xl font-bold">{loginSummary.uniqueUsers.toLocaleString()}</div>
          <div className="text-gray-500 text-sm">Unique Users</div>
        </div>
      </div>

      {/* Login Trends Chart */}
      <div className="bg-white rounded-lg shadow p-6 mb-10">
        <h2 className="text-lg font-semibold mb-4">Login Trends (This Week)</h2>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={loginTrendData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip formatter={(value) => `${typeof value === 'number' ? value.toLocaleString() : value}`}/>
            <Bar dataKey="logins" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Failed Logins Table */}
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Recent Failed Login Attempts</h2>
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">User</th>
              <th className="py-2 px-4 font-medium text-gray-700">Time</th>
              <th className="py-2 px-4 font-medium text-gray-700">Reason</th>
            </tr>
          </thead>
          <tbody>
            {failedLogins.map((item, idx) => (
              <tr key={idx} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{item.user}</td>
                <td className="py-2 px-4 whitespace-nowrap">{item.time}</td>
                <td className="py-2 px-4 whitespace-nowrap">{item.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoginAnalyticsScreen;
