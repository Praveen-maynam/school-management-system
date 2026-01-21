import React, { useState } from 'react';

interface ExamResult {
	id: number;
	exam: string;
	published: boolean;
}

const mockResults: ExamResult[] = [
	{ id: 1, exam: 'Midterm Exam', published: false },
	{ id: 2, exam: 'Final Exam', published: false },
	{ id: 3, exam: 'Quiz 1', published: true },
];

const PublishResultsScreen: React.FC = () => {
	const [results, setResults] = useState<ExamResult[]>(mockResults);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const handlePublish = (id: number) => {
		setLoading(true);
		setError(null);
		setTimeout(() => {
			setResults((prev) =>
				prev.map((item) =>
					item.id === id ? { ...item, published: true } : item
				)
			);
			setSuccess('Results published successfully!');
			setLoading(false);
		}, 800);
	};

	return (
		<div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
			<h2 className="text-2xl font-bold mb-4 text-gray-800">Publish Results</h2>
			{loading && <div className="mb-4 text-blue-600">Processing...</div>}
			{error && <div className="mb-4 text-red-600">{error}</div>}
			{success && <div className="mb-4 text-green-600">{success}</div>}
			<table className="min-w-full bg-gray-50 rounded-md overflow-hidden mb-4">
				<thead>
					<tr>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Exam</th>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Actions</th>
					</tr>
				</thead>
				<tbody>
					{results.length === 0 ? (
						<tr>
							<td colSpan={3} className="px-4 py-2 text-center text-gray-400">No results to publish.</td>
						</tr>
					) : (
						results.map((item) => (
							<tr key={item.id}>
								<td className="px-4 py-2 text-gray-700">{item.exam}</td>
								<td className="px-4 py-2 text-gray-700">{item.published ? 'Published' : 'Pending'}</td>
								<td className="px-4 py-2">
									<button
										className={`px-2 py-1 rounded text-white ${item.published ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
										onClick={() => handlePublish(item.id)}
										disabled={item.published || loading}
									>
										{item.published ? 'Published' : 'Publish'}
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

export default PublishResultsScreen;