
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock summary data
const summary = [
    { label: 'Total Revenue (YTD)', value: '$120,500' },
    { label: 'This Month', value: '$18,000' },
    { label: 'Premium Plan', value: '$90,000' },
    { label: 'Basic Plan', value: '$25,000' },
    { label: 'Custom Plan', value: '$5,500' },
];

// Mock revenue trend data
const revenueData = [
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

// Mock transactions
const transactions = [
    { id: 'TX-001', school: 'Springfield High', plan: 'Premium', amount: 199, date: '2026-01-01', status: 'Paid' },
    { id: 'TX-002', school: 'Shelbyville Academy', plan: 'Basic', amount: 49, date: '2026-01-02', status: 'Paid' },
    { id: 'TX-003', school: 'Westfield School', plan: 'Premium', amount: 199, date: '2026-01-03', status: 'Failed' },
    { id: 'TX-004', school: 'Eastside Elementary', plan: 'Free', amount: 0, date: '2026-01-04', status: 'Paid' },
    { id: 'TX-005', school: 'Springfield High', plan: 'Premium', amount: 199, date: '2026-01-05', status: 'Pending' },
];

const statusColor = {
    Paid: 'bg-green-100 text-green-700',
    Pending: 'bg-yellow-100 text-yellow-800',
    Failed: 'bg-red-100 text-red-700',
};

const RevenueReportsScreen = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Revenue Reports</h1>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {summary.map((s) => (
                    <div key={s.label} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                        <div className="text-2xl font-bold mb-2">{s.value}</div>
                        <div className="text-gray-500 text-sm text-center">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Revenue Trend Chart */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h2 className="text-lg font-semibold mb-4">Revenue Trend (Monthly)</h2>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={revenueData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Recent Transactions Table */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction #</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">School</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {transactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap font-mono">{tx.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{tx.school}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{tx.plan}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">${tx.amount.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{tx.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColor[tx.status as keyof typeof statusColor]}`}>{tx.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RevenueReportsScreen;
