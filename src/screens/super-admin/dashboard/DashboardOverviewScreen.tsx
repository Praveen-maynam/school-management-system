// import React, { useState, useEffect } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
// import { School, Users, DollarSign, HardDrive, LifeBuoy, Activity, LogIn } from 'lucide-react';

// // Mock metrics
// const metrics = [
//   { label: 'Total Schools', value: 128 },
//   { label: 'Active Users', value: 15432 },
//   { label: 'Revenue (YTD)', value: '$120,500' },
//   { label: 'Storage Used', value: '2.1 TB' },
//   { label: 'Open Tickets', value: 34 },
//   { label: 'System Health', value: 'Healthy' },
// ];

// // Mock chart data
// const revenueData = [
//   { month: 'Jan', revenue: 8000 },
//   { month: 'Feb', revenue: 9500 },
//   { month: 'Mar', revenue: 11000 },
//   { month: 'Apr', revenue: 12000 },
//   { month: 'May', revenue: 13000 },
//   { month: 'Jun', revenue: 14000 },
//   { month: 'Jul', revenue: 15000 },
//   { month: 'Aug', revenue: 16000 },
//   { month: 'Sep', revenue: 17000 },
//   { month: 'Oct', revenue: 18000 },
//   { month: 'Nov', revenue: 19000 },
//   { month: 'Dec', revenue: 20000 },
// ];

// const loginData = [
//   { day: 'Mon', logins: 1200 },
//   { day: 'Tue', logins: 1350 },
//   { day: 'Wed', logins: 1400 },
//   { day: 'Thu', logins: 1300 },
//   { day: 'Fri', logins: 1500 },
//   { day: 'Sat', logins: 900 },
//   { day: 'Sun', logins: 800 },
// ];

// const metricIcons: Record<string, React.ReactNode> = {
//   'Total Schools': <School className="text-blue-600 w-8 h-8 mb-2" />,
//   'Active Users': <Users className="text-green-600 w-8 h-8 mb-2" />,
//   'Revenue (YTD)': <DollarSign className="text-yellow-500 w-8 h-8 mb-2" />,
//   'Storage Used': <HardDrive className="text-purple-600 w-8 h-8 mb-2" />,
//   'Open Tickets': <LifeBuoy className="text-pink-600 w-8 h-8 mb-2" />,
//   'System Health': <Activity className="text-emerald-600 w-8 h-8 mb-2" />,
// };

// const DashboardOverviewScreen: React.FC = () => {
//   // Simulate loading and error for production readiness
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     // Simulate API call
//     const timer = setTimeout(() => {
//       setLoading(false);
//       // setError('Failed to load data'); // Uncomment to test error state
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-96">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         <span className="ml-4 text-lg text-gray-500">Loading dashboard...</span>
//       </div>
//     );
//   }
//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center h-96 text-red-600">
//         <LifeBuoy className="w-12 h-12 mb-2" />
//         <span className="text-lg">{error}</span>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Super Admin Dashboard Overview</h1>
//       {/* Metric Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
//         {metrics.map((m) => (
//           <div key={m.label} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
//             {metricIcons[m.label] || <Activity className="w-8 h-8 mb-2 text-gray-400" />}
//             <div className="text-3xl font-bold mb-2">{m.value}</div>
//             <div className="text-gray-500 text-sm text-center">{m.label}</div>
//           </div>
//         ))}
//       </div>
//       {/* Mini Charts */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
//             <DollarSign className="w-5 h-5 text-yellow-500" /> Revenue Trend (Monthly)
//           </h2>
//           <ResponsiveContainer width="100%" height={200}>
//             <LineChart data={revenueData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
//             <LogIn className="w-5 h-5 text-emerald-600" /> Login Analytics (This Week)
//           </h2>
//           <ResponsiveContainer width="100%" height={200}>
//             <BarChart data={loginData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="day" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="logins" fill="#10b981" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardOverviewScreen;
import React from "react";

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
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">
          Generate Report
        </button>
      </div>

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
          <div className="h-64 flex items-center justify-center text-gray-400 border rounded-lg">
            📊 Chart Placeholder (Revenue / Schools / Users)
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
