import React, { useState } from 'react';

interface TransportReport {
	id: number;
	route: string;
	vehicle: string;
	students: number;
	downloadUrl: string;
}

const mockReports: TransportReport[] = [
	{ id: 1, route: 'Route A', vehicle: 'Bus 1', students: 40, downloadUrl: '#' },
	{ id: 2, route: 'Route B', vehicle: 'Bus 2', students: 35, downloadUrl: '#' },
	{ id: 3, route: 'Route C', vehicle: 'Van 1', students: 20, downloadUrl: '#' },
];

const TransportReportsScreen: React.FC = () => {
	const [reports, setReports] = useState<TransportReport[]>(mockReports);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleDownload = (id: number) => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			window.alert('Transport report downloaded!');
		}, 800);
	};

	return (
		<div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
			<h2 className="text-2xl font-bold mb-4 text-gray-800">Transport Reports</h2>
			{loading && <div className="mb-4 text-blue-600">Processing...</div>}
			{error && <div className="mb-4 text-red-600">{error}</div>}
			<table className="min-w-full bg-gray-50 rounded-md overflow-hidden">
				<thead>
					<tr>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Route</th>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Vehicle</th>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Students</th>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Actions</th>
					</tr>
				</thead>
				<tbody>
					{reports.length === 0 ? (
						<tr>
							<td colSpan={4} className="px-4 py-2 text-center text-gray-400">No transport reports found.</td>
						</tr>
					) : (
						reports.map((report) => (
							<tr key={report.id}>
								<td className="px-4 py-2 text-gray-700">{report.route}</td>
								<td className="px-4 py-2 text-gray-700">{report.vehicle}</td>
								<td className="px-4 py-2 text-gray-700">{report.students}</td>
								<td className="px-4 py-2">
									<button
										className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
										onClick={() => handleDownload(report.id)}
										disabled={loading}
									>
										Download
									</button>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
};

export default TransportReportsScreen;