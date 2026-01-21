import React, { useState } from 'react';

interface ExamForm {
	name: string;
	date: string;
}

const CreateExamScreen: React.FC = () => {
	const [form, setForm] = useState<ExamForm>({ name: '', date: '' });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setSuccess(null);
		if (!form.name.trim()) {
			setError('Exam name is required.');
			return;
		}
		if (!form.date) {
			setError('Exam date is required.');
			return;
		}
		setLoading(true);
		setTimeout(() => {
			setSuccess(`Exam "${form.name}" scheduled for ${form.date} created successfully.`);
			setForm({ name: '', date: '' });
			setLoading(false);
		}, 1200);
	};

	return (
		<div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
			<h2 className="text-2xl font-bold mb-4 text-gray-800">Create Exam</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label htmlFor="name" className="block text-sm font-medium text-gray-700">Exam Name</label>
					<input
						type="text"
						id="name"
						name="name"
						value={form.name}
						onChange={handleChange}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
						required
					/>
				</div>
				<div>
					<label htmlFor="date" className="block text-sm font-medium text-gray-700">Exam Date</label>
					<input
						type="date"
						id="date"
						name="date"
						value={form.date}
						onChange={handleChange}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
						required
					/>
				</div>
				<button
					type="submit"
					className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
					disabled={loading}
				>
					{loading ? 'Creating...' : 'Create Exam'}
				</button>
			</form>
			{error && <div className="mt-4 text-red-600 font-medium">{error}</div>}
			{success && <div className="mt-4 text-green-600 font-medium">{success}</div>}
		</div>
	);
};

export default CreateExamScreen;