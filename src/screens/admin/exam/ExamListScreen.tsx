
import React, { useState } from 'react';

interface Exam {
	id: number;
	name: string;
	date: string;
	status: 'Scheduled' | 'Completed' | 'Published';
}

const mockExams: Exam[] = [
	{ id: 1, name: 'Midterm Exam', date: '2026-02-10', status: 'Scheduled' },
	{ id: 2, name: 'Final Exam', date: '2026-04-20', status: 'Completed' },
	{ id: 3, name: 'Quiz 1', date: '2026-01-25', status: 'Published' },
];

const ExamListScreen: React.FC = () => {
	const [exams, setExams] = useState<Exam[]>(mockExams);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [selectedExam, setSelectedExam] = useState<Exam | null>(null);

	const handleDelete = (id: number) => {
		setLoading(true);
		setError(null);
		setTimeout(() => {
			setExams((prev) => prev.filter((exam) => exam.id !== id));
			setLoading(false);
		}, 1000);
	};

	const handleView = (exam: Exam) => {
		setSelectedExam(exam);
	};

	const handleCloseModal = () => {
		setSelectedExam(null);
	};

	return (
		<div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
			<h2 className="text-2xl font-bold mb-4 text-gray-800">Exam List</h2>
			{loading && <div className="mb-4 text-blue-600">Processing...</div>}
			{error && <div className="mb-4 text-red-600">{error}</div>}
			<table className="min-w-full bg-gray-50 rounded-md overflow-hidden">
				<thead>
					<tr>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Name</th>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Date</th>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Actions</th>
					</tr>
				</thead>
				<tbody>
					{exams.length === 0 ? (
						<tr>
							<td colSpan={4} className="px-4 py-2 text-center text-gray-400">No exams found.</td>
						</tr>
					) : (
						exams.map((exam) => (
							<tr key={exam.id}>
								<td className="px-4 py-2 text-gray-700">{exam.name}</td>
								<td className="px-4 py-2 text-gray-700">{exam.date}</td>
								<td className="px-4 py-2 text-gray-700">{exam.status}</td>
								<td className="px-4 py-2">
									<button
										className="mr-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
										onClick={() => handleView(exam)}
									>
										View
									</button>
									<button
										className="mr-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
										// onClick={() => handleEdit(exam.id)}
										disabled
									>
										Edit
									</button>
									<button
										className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
										onClick={() => handleDelete(exam.id)}
										disabled={loading}
									>
										Delete
									</button>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
			{/* Modal for viewing exam details */}
			{selectedExam && (
				<div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
						<h3 className="text-xl font-bold mb-2">Exam Details</h3>
						<p><span className="font-semibold">Name:</span> {selectedExam.name}</p>
						<p><span className="font-semibold">Date:</span> {selectedExam.date}</p>
						<p><span className="font-semibold">Status:</span> {selectedExam.status}</p>
						<button
							className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
							onClick={handleCloseModal}
						>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ExamListScreen;