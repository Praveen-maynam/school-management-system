import React, { useState } from 'react';

interface PayrollReport {
	id: number;
	month: string;
	totalPaid: number;
	employees: number;
	downloadUrl: string;
}

const mockReports: PayrollReport[] = [
	{ id: 1, month: 'January', totalPaid: 120000, employees: 25, downloadUrl: '#' },
	{ id: 2, month: 'December', totalPaid: 115000, employees: 24, downloadUrl: '#' },
	{ id: 3, month: 'November', totalPaid: 110000, employees: 23, downloadUrl: '#' },
];

const PayrollReportsScreen: React.FC = () => {
	const [reports, setReports] = useState<PayrollReport[]>(mockReports);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleDownload = (id: number) => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			window.alert('Payroll report downloaded!');
		}, 800);
	};

	return (
		<div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
			<h2 className="text-2xl font-bold mb-4 text-gray-800">Payroll Reports</h2>
			{loading && <div className="mb-4 text-blue-600">Processing...</div>}
			{error && <div className="mb-4 text-red-600">{error}</div>}
			<table className="min-w-full bg-gray-50 rounded-md overflow-hidden">
				<thead>
					<tr>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Month</th>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Total Paid</th>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Employees</th>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Actions</th>
					</tr>
				</thead>
				<tbody>
					{reports.length === 0 ? (
						<tr>
							<td colSpan={4} className="px-4 py-2 text-center text-gray-400">No payroll reports found.</td>
						</tr>
					) : (
						reports.map((report) => (
							<tr key={report.id}>
								<td className="px-4 py-2 text-gray-700">{report.month}</td>
								<td className="px-4 py-2 text-gray-700">₹{report.totalPaid}</td>
								<td className="px-4 py-2 text-gray-700">{report.employees}</td>
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

export default PayrollReportsScreen;