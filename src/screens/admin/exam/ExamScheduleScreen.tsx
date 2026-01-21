import React, { useState } from 'react';

interface ExamSchedule {
	id: number;
	examName: string;
	date: string;
	time: string;
	room: string;
}

const mockSchedules: ExamSchedule[] = [
	{ id: 1, examName: 'Midterm Exam', date: '2026-02-10', time: '10:00 AM', room: 'A101' },
	{ id: 2, examName: 'Final Exam', date: '2026-04-20', time: '1:00 PM', room: 'B202' },
	{ id: 3, examName: 'Quiz 1', date: '2026-01-25', time: '9:00 AM', room: 'C303' },
];

const ExamScheduleScreen: React.FC = () => {
	const [schedules, setSchedules] = useState<ExamSchedule[]>(mockSchedules);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [selectedSchedule, setSelectedSchedule] = useState<ExamSchedule | null>(null);

	const handleView = (schedule: ExamSchedule) => {
		setSelectedSchedule(schedule);
	};

	const handleCloseModal = () => {
		setSelectedSchedule(null);
	};

	// Edit action placeholder
	const handleEdit = (id: number) => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setError('Edit functionality is not implemented yet.');
		}, 800);
	};

	return (
		<div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
			<h2 className="text-2xl font-bold mb-4 text-gray-800">Exam Schedule</h2>
			{loading && <div className="mb-4 text-blue-600">Processing...</div>}
			{error && <div className="mb-4 text-red-600">{error}</div>}
			<table className="min-w-full bg-gray-50 rounded-md overflow-hidden">
				<thead>
					<tr>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Exam</th>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Date</th>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Time</th>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Room</th>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Actions</th>
					</tr>
				</thead>
				<tbody>
					{schedules.length === 0 ? (
						<tr>
							<td colSpan={5} className="px-4 py-2 text-center text-gray-400">No schedules found.</td>
						</tr>
					) : (
						schedules.map((schedule) => (
							<tr key={schedule.id}>
								<td className="px-4 py-2 text-gray-700">{schedule.examName}</td>
								<td className="px-4 py-2 text-gray-700">{schedule.date}</td>
								<td className="px-4 py-2 text-gray-700">{schedule.time}</td>
								<td className="px-4 py-2 text-gray-700">{schedule.room}</td>
								<td className="px-4 py-2">
									<button
										className="mr-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
										onClick={() => handleView(schedule)}
									>
										View
									</button>
									<button
										className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
										onClick={() => handleEdit(schedule.id)}
										disabled={loading}
									>
										Edit
									</button>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
			{/* Modal for viewing schedule details */}
			{selectedSchedule && (
				<div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
						<h3 className="text-xl font-bold mb-2">Schedule Details</h3>
						<p><span className="font-semibold">Exam:</span> {selectedSchedule.examName}</p>
						<p><span className="font-semibold">Date:</span> {selectedSchedule.date}</p>
						<p><span className="font-semibold">Time:</span> {selectedSchedule.time}</p>
						<p><span className="font-semibold">Room:</span> {selectedSchedule.room}</p>
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

export default ExamScheduleScreen;