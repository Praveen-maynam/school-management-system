
import React, { useState } from 'react';

interface TransportReport {
	id: number;
	route: string;
	date: string;
	status: string;
	remarks?: string;
}

const sampleReports: TransportReport[] = [
	{ id: 1, route: 'Route 1', date: '2026-01-20', status: 'On Time', remarks: 'No issues' },
	{ id: 2, route: 'Route 2', date: '2026-01-20', status: 'Delayed', remarks: 'Traffic jam' },
];

const TransportReportsScreen: React.FC = () => {
	const [reports, setReports] = useState<TransportReport[]>(sampleReports);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Simulate delete action
	const handleDelete = (id: number) => {
		setLoading(true);
		setTimeout(() => {
			setReports((prev) => prev.filter((r) => r.id !== id));
			setLoading(false);
		}, 800);
	};

	return (
		<div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
			<h2 className="text-2xl font-bold mb-4">Transport Reports</h2>
			{error && <div className="text-red-500 mb-2">{error}</div>}
			{loading && <div className="text-blue-600 mb-2">Processing...</div>}
			{reports.length === 0 ? (
				<div className="text-gray-500 py-8 text-center">No reports found.</div>
			) : (
				<div className="overflow-x-auto">
					<table className="min-w-full border">
						<thead>
							<tr className="bg-gray-100">
								<th className="px-4 py-2 text-left">Route</th>
								<th className="px-4 py-2 text-left">Date</th>
								<th className="px-4 py-2 text-left">Status</th>
								<th className="px-4 py-2 text-left">Remarks</th>
								<th className="px-4 py-2 text-left">Actions</th>
							</tr>
						</thead>
						<tbody>
							{reports.map((report) => (
								<tr key={report.id} className="border-b">
									<td className="px-4 py-2">{report.route}</td>
									<td className="px-4 py-2">{report.date}</td>
									<td className="px-4 py-2">{report.status}</td>
									<td className="px-4 py-2">{report.remarks || '-'}</td>
									<td className="px-4 py-2 flex gap-2">
										<button className="text-blue-600 hover:underline text-sm">View</button>
										<button
											className="text-red-600 hover:underline text-sm"
											onClick={() => handleDelete(report.id)}
											disabled={loading}
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default TransportReportsScreen;