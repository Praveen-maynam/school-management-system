
import React, { useState } from 'react';

interface InventoryReport {
	id: number;
	item: string;
	date: string;
	action: string;
	remarks?: string;
}

const sampleReports: InventoryReport[] = [
	{ id: 1, item: 'Projector', date: '2026-01-20', action: 'Issued', remarks: 'To Room 101' },
	{ id: 2, item: 'Desk', date: '2026-01-19', action: 'Returned', remarks: 'From Room 201' },
];

const InventoryReportsScreen: React.FC = () => {
	const [reports, setReports] = useState<InventoryReport[]>(sampleReports);
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
			<h2 className="text-2xl font-bold mb-4">Inventory Reports</h2>
			{error && <div className="text-red-500 mb-2">{error}</div>}
			{loading && <div className="text-blue-600 mb-2">Processing...</div>}
			{reports.length === 0 ? (
				<div className="text-gray-500 py-8 text-center">No reports found.</div>
			) : (
				<div className="overflow-x-auto">
					<table className="min-w-full border">
						<thead>
							<tr className="bg-gray-100">
								<th className="px-4 py-2 text-left">Item</th>
								<th className="px-4 py-2 text-left">Date</th>
								<th className="px-4 py-2 text-left">Action</th>
								<th className="px-4 py-2 text-left">Remarks</th>
								<th className="px-4 py-2 text-left">Actions</th>
							</tr>
						</thead>
						<tbody>
							{reports.map((report) => (
								<tr key={report.id} className="border-b">
									<td className="px-4 py-2">{report.item}</td>
									<td className="px-4 py-2">{report.date}</td>
									<td className="px-4 py-2">{report.action}</td>
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

export default InventoryReportsScreen;