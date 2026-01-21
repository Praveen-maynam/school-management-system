import React, { useState } from 'react';

interface FeeCategory {
    id: number;
    name: string;
    description: string;
}

const mockCategories: FeeCategory[] = [
    { id: 1, name: 'Tuition', description: 'Regular tuition fees' },
    { id: 2, name: 'Transport', description: 'Bus and transport fees' },
    { id: 3, name: 'Library', description: 'Library membership and fines' },
    { id: 4, name: 'Exam', description: 'Examination fees' },
];

const FeeCategoriesScreen: React.FC = () => {
    const [categories, setCategories] = useState<FeeCategory[]>(mockCategories);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const resetForm = () => {
        setName('');
        setDescription('');
        setEditingId(null);
    };

    const handleAddOrEdit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        if (!name.trim()) {
            setError('Category name is required.');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            if (editingId !== null) {
                setCategories((prev) =>
                    prev.map((cat) =>
                        cat.id === editingId ? { ...cat, name, description } : cat
                    )
                );
                setSuccess('Category updated successfully.');
            } else {
                setCategories((prev) => [
                    ...prev,
                    { id: Date.now(), name, description },
                ]);
                setSuccess('Category added successfully.');
            }
            setLoading(false);
            resetForm();
        }, 900);
    };

    const handleEdit = (cat: FeeCategory) => {
        setName(cat.name);
        setDescription(cat.description);
        setEditingId(cat.id);
        setSuccess(null);
        setError(null);
    };

    const handleDelete = (id: number) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        setTimeout(() => {
            setCategories((prev) => prev.filter((cat) => cat.id !== id));
            setLoading(false);
            setSuccess('Category deleted successfully.');
            if (editingId === id) resetForm();
        }, 700);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Fee Categories</h2>
            <form onSubmit={handleAddOrEdit} className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                    required
                />
                <input
                    type="text"
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                >
                    {editingId !== null ? (loading ? 'Saving...' : 'Update') : (loading ? 'Adding...' : 'Add')}
                </button>
                {editingId !== null && (
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md shadow hover:bg-gray-400"
                        onClick={resetForm}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                )}
            </form>
            {error && <div className="mb-4 text-red-600 font-medium">{error}</div>}
            {success && <div className="mb-4 text-green-600 font-medium">{success}</div>}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                            <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {categories.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="text-center py-6 text-gray-500">No categories found.</td>
                            </tr>
                        ) : (
                            categories.map((cat) => (
                                <tr key={cat.id}>
                                    <td className="px-4 py-2 font-medium text-gray-800">{cat.name}</td>
                                    <td className="px-4 py-2 text-gray-700">{cat.description || '-'}</td>
                                    <td className="px-4 py-2 flex gap-2">
                                        <button
                                            className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                                            onClick={() => handleEdit(cat)}
                                            disabled={loading}
                                        >Edit</button>
                                        <button
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                            onClick={() => handleDelete(cat.id)}
                                            disabled={loading}
                                        >Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FeeCategoriesScreen;
