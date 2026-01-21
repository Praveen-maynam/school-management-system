import React, { useState } from 'react';

interface FeeInvoiceForm {
    studentName: string;
    category: string;
    amount: number | '';
    dueDate: string;
}

const mockCategories = ['Tuition', 'Transport', 'Library', 'Exam'];
const mockInvoice = {
    studentName: 'Alice Johnson',
    category: 'Tuition',
    amount: 5000,
    dueDate: '2026-02-15',
};

const EditFeeInvoiceScreen: React.FC = () => {
    const [form, setForm] = useState<FeeInvoiceForm>(mockInvoice);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: name === 'amount' ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        if (!form.studentName.trim()) {
            setError('Student name is required.');
            return;
        }
        if (!form.category) {
            setError('Please select a fee category.');
            return;
        }
        if (form.amount === '' || form.amount <= 0) {
            setError('Please enter a valid amount.');
            return;
        }
        if (!form.dueDate) {
            setError('Due date is required.');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setSuccess(`Fee invoice for ${form.studentName} updated successfully.`);
            setLoading(false);
        }, 1200);
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Fee Invoice</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">Student Name</label>
                    <input
                        type="text"
                        id="studentName"
                        name="studentName"
                        value={form.studentName}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Fee Category</label>
                    <select
                        id="category"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select category</option>
                        {mockCategories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        min={1}
                        value={form.amount}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        value={form.dueDate}
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
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
            {error && <div className="mt-4 text-red-600 font-medium">{error}</div>}
            {success && <div className="mt-4 text-green-600 font-medium">{success}</div>}
        </div>
    );
};

export default EditFeeInvoiceScreen;
