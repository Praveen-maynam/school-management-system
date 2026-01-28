import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

// Mock data
const dashboardSummary = {
  todayCollections: 12500,
  pendingDues: 3400,
  monthlyTotal: 98000,
};

const monthlyTrends = [
  { month: 'Jan', amount: 8000 },
  { month: 'Feb', amount: 9500 },
  { month: 'Mar', amount: 11000 },
  { month: 'Apr', amount: 12000 },
  { month: 'May', amount: 13000 },
  { month: 'Jun', amount: 14000 },
  { month: 'Jul', amount: 15000 },
  { month: 'Aug', amount: 16000 },
  { month: 'Sep', amount: 17000 },
  { month: 'Oct', amount: 18000 },
  { month: 'Nov', amount: 19000 },
  { month: 'Dec', amount: 20000 },
];

const paymentMethods = [
  { name: 'Online', value: 60000 },
  { name: 'Cash', value: 25000 },
  { name: 'Cheque', value: 8000 },
  { name: 'Other', value: 5000 },
];

const COLORS = ['#2563eb', '#f59e42', '#10b981', '#a78bfa'];

const quickActions = [
  { label: 'Collect Payment', action: () => {} },
  { label: 'Send Reminder', action: () => {} },
  { label: 'View Defaulters', action: () => {} },
  { label: 'Export Report', action: () => {} },
];

const FinanceDashboardScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Finance Manager Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
          <div className="text-3xl font-bold text-green-700">₹{dashboardSummary.todayCollections.toLocaleString()}</div>
          <div className="text-gray-500 text-sm">Today's Collections</div>
        </div>
        <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
          <div className="text-3xl font-bold text-red-600">₹{dashboardSummary.pendingDues.toLocaleString()}</div>
          <div className="text-gray-500 text-sm">Pending Dues</div>
        </div>
        <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
          <div className="text-3xl font-bold">₹{dashboardSummary.monthlyTotal.toLocaleString()}</div>
          <div className="text-gray-500 text-sm">Monthly Total</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Monthly Trends</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyTrends} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${typeof value === 'number' ? value.toLocaleString() : value}`}/>
              <Bar dataKey="amount" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4">Payment Methods Breakdown</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={paymentMethods}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {paymentMethods.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip formatter={(value) => `₹${typeof value === 'number' ? value.toLocaleString() : value}`}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6 flex flex-wrap gap-4">
        <h2 className="text-lg font-semibold mb-4 w-full">Quick Actions</h2>
        {quickActions.map((action, idx) => (
          <button
            key={idx}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
            onClick={action.action}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FinanceDashboardScreen;
