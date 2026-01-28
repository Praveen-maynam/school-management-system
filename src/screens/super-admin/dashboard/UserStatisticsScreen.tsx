
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// Mock summary data
const summary = [
  { label: 'Total Users', value: 15432 },
  { label: 'Teachers', value: 1200 },
  { label: 'Students', value: 13500 },
  { label: 'Admins', value: 120 },
  { label: 'Parents', value: 612 },
];

// Mock user distribution data
const userTypeData = [
  { name: 'Teachers', value: 1200 },
  { name: 'Students', value: 13500 },
  { name: 'Admins', value: 120 },
  { name: 'Parents', value: 612 },
];
const COLORS = ['#2563eb', '#10b981', '#f59e42', '#a855f7'];

// Mock top schools
const topSchools = [
  { name: 'Springfield High', teachers: 80, students: 1200, admins: 8, parents: 300, total: 1588 },
  { name: 'Shelbyville Academy', teachers: 60, students: 900, admins: 6, parents: 200, total: 1166 },
  { name: 'Westfield School', teachers: 50, students: 800, admins: 5, parents: 180, total: 1035 },
  { name: 'Eastside Elementary', teachers: 40, students: 600, admins: 4, parents: 120, total: 764 },
];

const UserStatisticsScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Statistics</h1>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {summary.map((s) => (
          <div key={s.label} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <div className="text-2xl font-bold mb-2">{s.value}</div>
            <div className="text-gray-500 text-sm text-center">{s.label}</div>
          </div>
        ))}
      </div>

      {/* User Distribution Chart */}
      <div className="bg-white rounded-lg shadow p-6 mb-8 flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-4">User Type Distribution</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={userTypeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {userTypeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Top Schools Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Top Schools by User Count</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">School</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teachers</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Students</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Admins</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parents</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topSchools.map((school) => (
                <tr key={school.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-semibold">{school.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{school.teachers}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{school.students}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{school.admins}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{school.parents}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{school.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserStatisticsScreen;
