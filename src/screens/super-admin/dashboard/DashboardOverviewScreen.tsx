import React from "react";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type StatCardProps = {
  title: string;
  value: string;
  change?: string;
};

const StatCard: React.FC<StatCardProps> = ({ title, value, change }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border">
    <p className="text-sm text-gray-500">{title}</p>
    <h2 className="text-3xl font-bold mt-2">{value}</h2>
    {change && (
      <p className="text-sm text-green-600 mt-1">{change}</p>
    )}
  </div>
);

export default function SuperAdminDashboard() {
  const [showReportModal, setShowReportModal] = React.useState(false);
  const [reportType, setReportType] = React.useState('overview');
  const [dateRange, setDateRange] = React.useState({ from: '', to: '' });

  const handleGenerateReport = () => {
    setShowReportModal(true);
  };

  const handleDownload = () => {
    // Simulate report download
    const reportContent = `Report Type: ${reportType}\nFrom: ${dateRange.from}\nTo: ${dateRange.to}\nGenerated: ${new Date().toLocaleString()}`;
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `super-admin-report-${reportType}-${dateRange.from}-${dateRange.to}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setShowReportModal(false);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold">Super Admin Dashboard</h1>
          <p className="text-gray-500">
            Platform overview & system analytics
          </p>
        </div>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium "
          onClick={handleGenerateReport}
        >
          Generate Report
        </button>
      </div>

      {/* Generate Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={() => setShowReportModal(false)}>
              <span className="text-2xl">×</span>
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Generate Report</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                <select
                  value={reportType}
                  onChange={e => setReportType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="overview">Platform Overview</option>
                  <option value="schools">Schools Report</option>
                  <option value="users">Users Report</option>
                  <option value="revenue">Revenue Report</option>
                  <option value="system">System Health</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                  <input
                    type="date"
                    value={dateRange.from}
                    onChange={e => setDateRange({ ...dateRange, from: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                  <input
                    type="date"
                    value={dateRange.to}
                    onChange={e => setDateRange({ ...dateRange, to: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg  font-medium"
                >
                  Download Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Schools" value="148" change="+12 this month" />
        <StatCard title="Total Users" value="68,420" change="+3,200 new" />
        <StatCard title="Monthly Revenue" value="₹8.7L" change="+18%" />
        <StatCard title="Storage Used" value="2.4 TB" />
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Analytics */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-bold mb-4">
            Platform Analytics (Overview)
          </h3>
          <div className="h-64 flex items-center justify-center text-gray-400 border rounded-lg bg-white">
            <Line
              data={{
                labels: [
                  'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'
                ],
                datasets: [
                  {
                    label: 'Revenue (₹L)',
                    data: [6.2, 6.8, 7.1, 7.5, 7.9, 8.1, 8.3, 8.5, 8.6, 8.7, 8.7, 8.7],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99,102,241,0.1)',
                    tension: 0.4,
                    fill: true,
                  },
                  {
                    label: 'Schools',
                    data: [120, 123, 127, 130, 134, 137, 140, 143, 145, 147, 148, 148],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16,185,129,0.1)',
                    tension: 0.4,
                    fill: false,
                  },
                  {
                    label: 'Users',
                    data: [54000, 55500, 57000, 59000, 61000, 63000, 65000, 66000, 67000, 68000, 68420, 68420],
                    borderColor: '#f59e42',
                    backgroundColor: 'rgba(245,158,66,0.1)',
                    tension: 0.4,
                    fill: false,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                    position: 'top',
                  },
                  title: {
                    display: false,
                  },
                  tooltip: {
                    mode: 'index',
                    intersect: false,
                  },
                },
                interaction: {
                  mode: 'nearest',
                  axis: 'x',
                  intersect: false,
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: { color: '#f3f4f6' },
                  },
                  x: {
                    grid: { color: '#f3f4f6' },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-bold mb-4">System Health</h3>

          <ul className="space-y-4">
            <li className="flex justify-between">
              <span>API Status</span>
              <span className="text-green-600 font-medium">Operational</span>
            </li>
            <li className="flex justify-between">
              <span>Database</span>
              <span className="text-green-600 font-medium">Healthy</span>
            </li>
            <li className="flex justify-between">
              <span>Storage</span>
              <span className="text-yellow-600 font-medium">
                78% Used
              </span>
            </li>
            <li className="flex justify-between">
              <span>Auth Service</span>
              <span className="text-green-600 font-medium">Running</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Recent Schools */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="text-lg font-bold mb-4">Recently Added Schools</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-gray-600">
              <tr>
                <th className="text-left p-3">School Name</th>
                <th className="text-left p-3">City</th>
                <th className="text-left p-3">Plan</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: "Green Valley High School",
                  city: "Hyderabad",
                  plan: "Premium",
                  status: "Active",
                  date: "12 Jan 2026",
                },
                {
                  name: "Sunrise Public School",
                  city: "Bengaluru",
                  plan: "Standard",
                  status: "Active",
                  date: "09 Jan 2026",
                },
                {
                  name: "Oxford Model School",
                  city: "Chennai",
                  plan: "Trial",
                  status: "Pending",
                  date: "06 Jan 2026",
                },
              ].map((school, idx) => (
                <tr
                  key={idx}
                  className="border-b last:border-none hover:bg-slate-50"
                >
                  <td className="p-3 font-medium">{school.name}</td>
                  <td className="p-3">{school.city}</td>
                  <td className="p-3">{school.plan}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${
                          school.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                    >
                      {school.status}
                    </span>
                  </td>
                  <td className="p-3">{school.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
