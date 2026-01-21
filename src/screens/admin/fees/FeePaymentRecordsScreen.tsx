import React, { useState } from 'react';

interface FeePaymentRecord {
    id: number;
    studentName: string;
    category: string;
    amount: number;
    paidOn: string;
    status: 'Paid' | 'Pending';
}

const mockRecords: FeePaymentRecord[] = [
    { id: 1, studentName: 'Alice Johnson', category: 'Tuition', amount: 5000, paidOn: '2026-01-10', status: 'Paid' },
    { id: 2, studentName: 'Bob Smith', category: 'Transport', amount: 1200, paidOn: '2026-01-12', status: 'Paid' },
    { id: 3, studentName: 'Charlie Lee', category: 'Library', amount: 300, paidOn: '2026-01-15', status: 'Pending' },
    { id: 4, studentName: 'Diana Prince', category: 'Exam', amount: 800, paidOn: '2026-01-18', status: 'Paid' },
];

const FeePaymentRecordsScreen: React.FC = () => {
    const [records, setRecords] = useState<FeePaymentRecord[]>(mockRecords);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const filteredRecords = records.filter(
        (rec) =>
            rec.studentName.toLowerCase().includes(search.toLowerCase()) ||
            rec.category.toLowerCase().includes(search.toLowerCase())
    );

    // Simulate loading state for demonstration
    React.useEffect(() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 700);
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Fee Payment Records</h2>
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
                <div className="text-center py-8 text-blue-600 font-semibold">Loading payment records...</div>
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
                                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Paid On</th>
                                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {filteredRecords.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-6 text-gray-500">No payment records found.</td>
                                </tr>
                            ) : (
                                filteredRecords.map((rec) => (
                                    <tr key={rec.id}>
                                        <td className="px-4 py-2 font-medium text-gray-800">{rec.studentName}</td>
                                        <td className="px-4 py-2 text-gray-700">{rec.category}</td>
                                        <td className="px-4 py-2 text-right text-gray-700">₹{rec.amount.toLocaleString()}</td>
                                        <td className="px-4 py-2 text-center text-gray-700">{rec.paidOn}</td>
                                        <td className="px-4 py-2 text-center">
                                            <span
                                                className={
                                                    rec.status === 'Paid'
                                                        ? 'bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold'
                                                        : 'bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold'
                                                }
                                            >
                                                {rec.status}
                                            </span>
                                        </td>
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

export default FeePaymentRecordsScreen;
