
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data
const summary = [
	{ label: 'Active Schools', value: 120 },
	{ label: 'Suspended Schools', value: 8 },
];

const pieData = [
	{ name: 'Active', value: 120 },
	{ name: 'Suspended', value: 8 },
];
const COLORS = ['#10b981', '#ef4444'];

const schools = [
	{ id: 'SCH-001', name: 'Springfield High', status: 'Active' },
	{ id: 'SCH-002', name: 'Shelbyville Academy', status: 'Active' },
	{ id: 'SCH-003', name: 'Westfield School', status: 'Suspended' },
	{ id: 'SCH-004', name: 'Eastside Elementary', status: 'Active' },
	{ id: 'SCH-005', name: 'Northview School', status: 'Suspended' },
];

const statusColor = {
	Active: 'bg-green-100 text-green-700',
	Suspended: 'bg-red-100 text-red-700',
};

const ActiveVsSuspendedScreen = () => {
	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-6">Active vs Suspended Schools</h1>
			{/* Summary Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
				{summary.map((s) => (
					<div key={s.label} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
						<div className="text-2xl font-bold mb-2">{s.value}</div>
						<div className="text-gray-500 text-sm text-center">{s.label}</div>
					</div>
				))}
			</div>

			{/* Pie Chart */}
			<div className="bg-white rounded-lg shadow p-6 mb-8 flex flex-col items-center">
				<h2 className="text-lg font-semibold mb-4">Distribution</h2>
				<ResponsiveContainer width="100%" height={250}>
					<PieChart>
						<Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
							{pieData.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Tooltip />
					</PieChart>
				</ResponsiveContainer>
			</div>

			{/* Schools Table */}
			<div className="bg-white rounded-lg shadow p-6">
				<h2 className="text-lg font-semibold mb-4">Schools List</h2>
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">School</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{schools.map((school) => (
								<tr key={school.id} className="hover:bg-gray-50">
									<td className="px-6 py-4 whitespace-nowrap font-semibold">{school.name}</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span className={`px-2 py-1 rounded text-xs font-semibold ${statusColor[school.status as keyof typeof statusColor]}`}>{school.status}</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap flex gap-2">
										{school.status === 'Active' ? (
											<button className="text-red-600 hover:underline">Suspend</button>
										) : (
											<button className="text-green-600 hover:underline">Reactivate</button>
										)}
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

export default ActiveVsSuspendedScreen;