import React, { useState } from 'react';

interface PendingFee {
    id: number;
    studentName: string;
    category: string;
    amount: number;
    dueDate: string;
}

const mockPendingFees: PendingFee[] = [
    { id: 1, studentName: 'Charlie Lee', category: 'Library', amount: 300, dueDate: '2026-02-01' },
    { id: 2, studentName: 'Eve Adams', category: 'Tuition', amount: 5000, dueDate: '2026-02-10' },
    { id: 3, studentName: 'Frank Miller', category: 'Transport', amount: 1200, dueDate: '2026-02-05' },
];

const PendingFeesListScreen: React.FC = () => {
    const [pendingFees, setPendingFees] = useState<PendingFee[]>(mockPendingFees);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    React.useEffect(() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 700);
    }, []);

    const filteredFees = pendingFees.filter(
        (fee) =>
            fee.studentName.toLowerCase().includes(search.toLowerCase()) ||
            fee.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Pending Fees List</h2>
            <div className="mb-4 flex flex-col md:flex-row gap-3 md:items-center">
                <input
                    type="text"
                    placeholder="Search by student or category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                />
            </div>
            {loading ? (
                <div className="text-center py-8 text-blue-600 font-semibold">Loading pending fees...</div>
            ) : error ? (
                <div className="text-center py-8 text-red-600 font-semibold">{error}</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Due Date</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {filteredFees.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-6 text-gray-500">No pending fees found.</td>
                                </tr>
                            ) : (
                                filteredFees.map((fee) => (
                                    <tr key={fee.id}>
                                        <td className="px-4 py-2 font-medium text-gray-800">{fee.studentName}</td>
                                        <td className="px-4 py-2 text-gray-700">{fee.category}</td>
                                        <td className="px-4 py-2 text-right text-gray-700">₹{fee.amount.toLocaleString()}</td>
                                        <td className="px-4 py-2 text-center text-gray-700">{fee.dueDate}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PendingFeesListScreen;
