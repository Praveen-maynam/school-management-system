import React, { useState } from 'react';

interface AddClassForm {
    name: string;
    sectionCount: number | '';
    classTeacher: string;
}

const AddClassScreen: React.FC = () => {
    const [form, setForm] = useState<AddClassForm>({ name: '', sectionCount: '', classTeacher: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: name === 'sectionCount' ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        if (!form.name.trim()) {
            setError('Class name is required.');
            return;
        }
        if (form.sectionCount === '' || form.sectionCount <= 0) {
            setError('Please enter a valid section count.');
            return;
        }
        if (!form.classTeacher.trim()) {
            setError('Class teacher is required.');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setSuccess(`Class "${form.name}" with ${form.sectionCount} section(s) and teacher ${form.classTeacher} added successfully.`);
            setForm({ name: '', sectionCount: '', classTeacher: '' });
            setLoading(false);
        }, 1200);
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Class</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Class Name</label>
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
                    <label htmlFor="sectionCount" className="block text-sm font-medium text-gray-700">Section Count</label>
                    <input
                        type="number"
                        id="sectionCount"
                        name="sectionCount"
                        min={1}
                        value={form.sectionCount}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="classTeacher" className="block text-sm font-medium text-gray-700">Class Teacher</label>
                    <input
                        type="text"
                        id="classTeacher"
                        name="classTeacher"
                        value={form.classTeacher}
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
                    {loading ? 'Adding...' : 'Add Class'}
                </button>
            </form>
            {error && <div className="mt-4 text-red-600 font-medium">{error}</div>}
            {success && <div className="mt-4 text-green-600 font-medium">{success}</div>}
        </div>
    );
};

export default AddClassScreen;
