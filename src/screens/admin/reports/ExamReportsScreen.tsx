import React, { useState } from 'react';

interface ExamReport {
	id: number;
	exam: string;
	date: string;
	average: number;
	downloadUrl: string;
}

const mockReports: ExamReport[] = [
	{ id: 1, exam: 'Midterm Exam', date: '2026-02-10', average: 75.2, downloadUrl: '#' },
	{ id: 2, exam: 'Final Exam', date: '2026-04-20', average: 80.5, downloadUrl: '#' },
	{ id: 3, exam: 'Quiz 1', date: '2026-01-25', average: 68.9, downloadUrl: '#' },
];

const ExamReportsScreen: React.FC = () => {
	const [reports, setReports] = useState<ExamReport[]>(mockReports);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleDownload = (id: number) => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			window.alert('Exam report downloaded!');
		}, 800);
	};

	return (
		<div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
			<h2 className="text-2xl font-bold mb-4 text-gray-800">Exam Reports</h2>
			{loading && <div className="mb-4 text-blue-600">Processing...</div>}
			{error && <div className="mb-4 text-red-600">{error}</div>}
			<table className="min-w-full bg-gray-50 rounded-md overflow-hidden">
				<thead>
					<tr>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Exam</th>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Date</th>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Average</th>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Actions</th>
					</tr>
				</thead>
				<tbody>
					{reports.length === 0 ? (
						<tr>
							<td colSpan={4} className="px-4 py-2 text-center text-gray-400">No exam reports found.</td>
						</tr>
					) : (
						reports.map((report) => (
							<tr key={report.id}>
								<td className="px-4 py-2 text-gray-700">{report.exam}</td>
								<td className="px-4 py-2 text-gray-700">{report.date}</td>
								<td className="px-4 py-2 text-gray-700">{report.average}</td>
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

export default ExamReportsScreen;