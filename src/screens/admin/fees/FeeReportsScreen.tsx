import React, { useState } from 'react';

interface FeeReportSummary {
    totalCollected: number;
    totalPending: number;
    totalInvoices: number;
    paidInvoices: number;
    pendingInvoices: number;
}

const mockSummary: FeeReportSummary = {
    totalCollected: 150000,
    totalPending: 12000,
    totalInvoices: 120,
    paidInvoices: 110,
    pendingInvoices: 10,
};

const FeeReportsScreen: React.FC = () => {
    const [summary, setSummary] = useState<FeeReportSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [downloading, setDownloading] = useState(false);

    React.useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setSummary(mockSummary);
            setLoading(false);
        }, 900);
    }, []);

    const handleDownload = () => {
        setDownloading(true);
        setTimeout(() => {
            // Simulate CSV download
            const csv = `Type,Value\nTotal Collected,${summary?.totalCollected}\nTotal Pending,${summary?.totalPending}\nTotal Invoices,${summary?.totalInvoices}\nPaid Invoices,${summary?.paidInvoices}\nPending Invoices,${summary?.pendingInvoices}`;
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'fee-report-summary.csv';
            a.click();
            window.URL.revokeObjectURL(url);
            setDownloading(false);
        }, 800);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Fee Reports</h2>
            {loading ? (
                <div className="text-center py-8 text-blue-600 font-semibold">Loading report summary...</div>
            ) : error ? (
                <div className="text-center py-8 text-red-600 font-semibold">{error}</div>
            ) : summary ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-blue-50 p-4 rounded shadow flex flex-col items-center">
                            <span className="text-lg font-semibold text-blue-700">Total Collected</span>
                            <span className="text-2xl font-bold text-blue-900">₹{summary.totalCollected.toLocaleString()}</span>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded shadow flex flex-col items-center">
                            <span className="text-lg font-semibold text-yellow-700">Total Pending</span>
                            <span className="text-2xl font-bold text-yellow-900">₹{summary.totalPending.toLocaleString()}</span>
                        </div>
                        <div className="bg-green-50 p-4 rounded shadow flex flex-col items-center">
                            <span className="text-lg font-semibold text-green-700">Paid Invoices</span>
                            <span className="text-2xl font-bold text-green-900">{summary.paidInvoices}</span>
                        </div>
                        <div className="bg-red-50 p-4 rounded shadow flex flex-col items-center">
                            <span className="text-lg font-semibold text-red-700">Pending Invoices</span>
                            <span className="text-2xl font-bold text-red-900">{summary.pendingInvoices}</span>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={handleDownload}
                            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={downloading}
                        >
                            {downloading ? 'Downloading...' : 'Download Summary CSV'}
                        </button>
                    </div>
                </>
            ) : (
                <div className="text-center py-8 text-gray-500">No report data available.</div>
            )}
        </div>
    );
};

export default FeeReportsScreen;
