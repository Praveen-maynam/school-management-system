import React, { useState } from 'react';

interface FeeReport {
	id: number;
	month: string;
	collected: number;
	pending: number;
	downloadUrl: string;
}

const mockReports: FeeReport[] = [
	{ id: 1, month: 'January', collected: 50000, pending: 2000, downloadUrl: '#' },
	{ id: 2, month: 'December', collected: 48000, pending: 3500, downloadUrl: '#' },
	{ id: 3, month: 'November', collected: 47000, pending: 4000, downloadUrl: '#' },
];

const FeeReportsScreen: React.FC = () => {
	const [reports, setReports] = useState<FeeReport[]>(mockReports);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleDownload = (id: number) => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			window.alert('Fee report downloaded!');
		}, 800);
	};

	return (
		<div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
			<h2 className="text-2xl font-bold mb-4 text-gray-800">Fee Reports</h2>
			{loading && <div className="mb-4 text-blue-600">Processing...</div>}
			{error && <div className="mb-4 text-red-600">{error}</div>}
			<table className="min-w-full bg-gray-50 rounded-md overflow-hidden">
				<thead>
					<tr>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Month</th>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Collected</th>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Pending</th>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Actions</th>
					</tr>
				</thead>
				<tbody>
					{reports.length === 0 ? (
						<tr>
							<td colSpan={4} className="px-4 py-2 text-center text-gray-400">No fee reports found.</td>
						</tr>
					) : (
						reports.map((report) => (
							<tr key={report.id}>
								<td className="px-4 py-2 text-gray-700">{report.month}</td>
								<td className="px-4 py-2 text-gray-700">₹{report.collected}</td>
								<td className="px-4 py-2 text-gray-700">₹{report.pending}</td>
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

export default FeeReportsScreen;
