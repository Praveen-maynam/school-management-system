import React, { useState } from 'react';

interface AssignTeacherForm {
    className: string;
    teacherName: string;
}

const mockClasses = ['Class 1', 'Class 2', 'Class 3'];
const mockTeachers = ['Mr. Smith', 'Ms. Johnson', 'Mrs. Lee'];

const AssignClassTeacherScreen: React.FC = () => {
    const [form, setForm] = useState<AssignTeacherForm>({ className: '', teacherName: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        if (!form.className) {
            setError('Please select a class.');
            return;
        }
        if (!form.teacherName) {
            setError('Please select a teacher.');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setSuccess(`Teacher ${form.teacherName} assigned to ${form.className} successfully.`);
            setForm({ className: '', teacherName: '' });
            setLoading(false);
        }, 1200);
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Assign Class Teacher</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="className" className="block text-sm font-medium text-gray-700">Class</label>
                    <select
                        id="className"
                        name="className"
                        value={form.className}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select a class</option>
                        {mockClasses.map((cls) => (
                            <option key={cls} value={cls}>{cls}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="teacherName" className="block text-sm font-medium text-gray-700">Teacher</label>
                    <select
                        id="teacherName"
                        name="teacherName"
                        value={form.teacherName}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select a teacher</option>
                        {mockTeachers.map((teacher) => (
                            <option key={teacher} value={teacher}>{teacher}</option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                >
                    {loading ? 'Assigning...' : 'Assign Teacher'}
                </button>
            </form>
            {error && <div className="mt-4 text-red-600 font-medium">{error}</div>}
            {success && <div className="mt-4 text-green-600 font-medium">{success}</div>}
        </div>
    );
};

export default AssignClassTeacherScreen;
