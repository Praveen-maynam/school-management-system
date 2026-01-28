import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

// Mock data
const revenueSummary = {
  total: 120500,
  monthly: 18000,
  growth: 12.5, // percent
};

const revenueTrendData = [
  { month: 'Jan', revenue: 8000 },
  { month: 'Feb', revenue: 9500 },
  { month: 'Mar', revenue: 11000 },
  { month: 'Apr', revenue: 12000 },
  { month: 'May', revenue: 13000 },
  { month: 'Jun', revenue: 14000 },
  { month: 'Jul', revenue: 15000 },
  { month: 'Aug', revenue: 16000 },
  { month: 'Sep', revenue: 17000 },
  { month: 'Oct', revenue: 18000 },
  { month: 'Nov', revenue: 19000 },
  { month: 'Dec', revenue: 20000 },
];

const revenueBreakdown = [
  { name: 'Subscriptions', value: 70000 },
  { name: 'One-time Fees', value: 25000 },
  { name: 'Add-ons', value: 15500 },
  { name: 'Other', value: 10000 },
];

const COLORS = ['#2563eb', '#f59e42', '#10b981', '#a78bfa'];

const RevenueTrendsScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Revenue Breakdown & Trends</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
          <div className="text-3xl font-bold">${revenueSummary.total.toLocaleString()}</div>
          <div className="text-gray-500 text-sm">Total Revenue (YTD)</div>
        </div>
        <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
          <div className="text-3xl font-bold">${revenueSummary.monthly.toLocaleString()}</div>
          <div className="text-gray-500 text-sm">This Month</div>
        </div>
        <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
          <div className="text-3xl font-bold text-green-600">{revenueSummary.growth}%</div>
          <div className="text-gray-500 text-sm">Growth Rate</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Monthly Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={revenueTrendData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `$${typeof value === 'number' ? value.toLocaleString() : value}`}/>
              <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4">Revenue Breakdown</h2>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={revenueBreakdown}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {revenueBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip formatter={(value) => `$${typeof value === 'number' ? value.toLocaleString() : value}`}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RevenueTrendsScreen;
