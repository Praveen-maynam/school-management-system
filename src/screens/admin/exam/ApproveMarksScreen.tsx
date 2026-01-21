import React, { useState } from 'react';

interface MarkApproval {
	id: number;
	student: string;
	mark: number;
	approved: boolean;
}

const mockApprovals: MarkApproval[] = [
	{ id: 1, student: 'Alice Johnson', mark: 88, approved: false },
	{ id: 2, student: 'Bob Smith', mark: 76, approved: false },
	{ id: 3, student: 'Charlie Lee', mark: 92, approved: false },
];

const ApproveMarksScreen: React.FC = () => {
	const [approvals, setApprovals] = useState<MarkApproval[]>(mockApprovals);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const handleApprove = (id: number) => {
		setLoading(true);
		setError(null);
		setTimeout(() => {
			setApprovals((prev) =>
				prev.map((item) =>
					item.id === id ? { ...item, approved: true } : item
				)
			);
			setSuccess('Mark approved successfully!');
			setLoading(false);
		}, 800);
	};

	return (
		<div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
			<h2 className="text-2xl font-bold mb-4 text-gray-800">Approve Marks</h2>
			{loading && <div className="mb-4 text-blue-600">Processing...</div>}
			{error && <div className="mb-4 text-red-600">{error}</div>}
			{success && <div className="mb-4 text-green-600">{success}</div>}
			<table className="min-w-full bg-gray-50 rounded-md overflow-hidden mb-4">
				<thead>
					<tr>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Student</th>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Mark</th>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Actions</th>
					</tr>
				</thead>
				<tbody>
					{approvals.length === 0 ? (
						<tr>
							<td colSpan={4} className="px-4 py-2 text-center text-gray-400">No marks to approve.</td>
						</tr>
					) : (
						approvals.map((item) => (
							<tr key={item.id}>
								<td className="px-4 py-2 text-gray-700">{item.student}</td>
								<td className="px-4 py-2 text-gray-700">{item.mark}</td>
								<td className="px-4 py-2 text-gray-700">{item.approved ? 'Approved' : 'Pending'}</td>
								<td className="px-4 py-2">
									<button
										className={`px-2 py-1 rounded text-white ${item.approved ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
										onClick={() => handleApprove(item.id)}
										disabled={item.approved || loading}
									>
										{item.approved ? 'Approved' : 'Approve'}
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

export default ApproveMarksScreen;