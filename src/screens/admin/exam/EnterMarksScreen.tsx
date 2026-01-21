import React, { useState } from 'react';

interface StudentMark {
	id: number;
	name: string;
	mark: number | '';
}

const mockStudents: StudentMark[] = [
	{ id: 1, name: 'Alice Johnson', mark: '' },
	{ id: 2, name: 'Bob Smith', mark: '' },
	{ id: 3, name: 'Charlie Lee', mark: '' },
];

const EnterMarksScreen: React.FC = () => {
	const [students, setStudents] = useState<StudentMark[]>(mockStudents);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const handleChange = (id: number, value: string) => {
		setStudents((prev) =>
			prev.map((student) =>
				student.id === id ? { ...student, mark: value === '' ? '' : Number(value) } : student
			)
		);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setSuccess(null);
		// Validation: all marks must be entered and between 0-100
		for (const student of students) {
			if (student.mark === '' || student.mark < 0 || student.mark > 100) {
				setError('Please enter valid marks (0-100) for all students.');
				return;
			}
		}
		setLoading(true);
		setTimeout(() => {
			setSuccess('Marks entered successfully!');
			setLoading(false);
		}, 1200);
	};

	return (
		<div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
			<h2 className="text-2xl font-bold mb-4 text-gray-800">Enter Marks</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<table className="min-w-full bg-gray-50 rounded-md overflow-hidden mb-4">
					<thead>
						<tr>
							<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Student</th>
							<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Mark (0-100)</th>
						</tr>
					</thead>
					<tbody>
						{students.length === 0 ? (
							<tr>
								<td colSpan={2} className="px-4 py-2 text-center text-gray-400">No students found.</td>
							</tr>
						) : (
							students.map((student) => (
								<tr key={student.id}>
									<td className="px-4 py-2 text-gray-700">{student.name}</td>
									<td className="px-4 py-2">
										<input
											type="number"
											min={0}
											max={100}
											value={student.mark}
											onChange={(e) => handleChange(student.id, e.target.value)}
											className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
											required
										/>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
				<button
					type="submit"
					className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
					disabled={loading}
				>
					{loading ? 'Submitting...' : 'Submit Marks'}
				</button>
			</form>
			{error && <div className="mt-4 text-red-600 font-medium">{error}</div>}
			{success && <div className="mt-4 text-green-600 font-medium">{success}</div>}
		</div>
	);
};

export default EnterMarksScreen;