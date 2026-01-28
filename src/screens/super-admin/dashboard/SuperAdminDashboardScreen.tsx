
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Mock metrics
const metrics = [
    { label: 'Total Schools', value: 128 },
    { label: 'Active Users', value: 15432 },
    { label: 'Revenue (YTD)', value: '$120,500' },
    { label: 'Open Tickets', value: 34 },
    { label: 'System Health', value: 'Healthy' },
];

// Mock chart data
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

const ticketData = [
    { day: 'Mon', tickets: 4 },
    { day: 'Tue', tickets: 6 },
    { day: 'Wed', tickets: 5 },
    { day: 'Thu', tickets: 7 },
    { day: 'Fri', tickets: 8 },
    { day: 'Sat', tickets: 2 },
    { day: 'Sun', tickets: 2 },
];

const SuperAdminDashboardScreen = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Super Admin Dashboard</h1>
            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {metrics.map((m) => (
                    <div key={m.label} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                        <div className="text-3xl font-bold mb-2">{m.value}</div>
                        <div className="text-gray-500 text-sm text-center">{m.label}</div>
                    </div>
                ))}
            </div>

            {/* Mini Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Revenue Trend (Monthly)</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={revenueData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Support Tickets (This Week)</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={ticketData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="tickets" fill="#f59e42" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboardScreen;
