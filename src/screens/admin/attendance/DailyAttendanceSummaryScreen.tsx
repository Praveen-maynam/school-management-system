import React, { useState } from 'react';

interface AttendanceSummary {
    date: string;
    totalStudents: number;
    present: number;
    absent: number;
}

const mockSummary: AttendanceSummary = {
    date: '2026-01-21',
    totalStudents: 130,
    present: 120,
    absent: 10,
};

const DailyAttendanceSummaryScreen: React.FC = () => {
    const [summary, setSummary] = useState<AttendanceSummary | null>(mockSummary);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Simulate loading state
    React.useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 800);
    }, []);

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Daily Attendance Summary</h2>
            {loading && <div className="mb-4 text-blue-600">Loading summary...</div>}
            {error && <div className="mb-4 text-red-600">{error}</div>}
            {!loading && summary ? (
                <div className="space-y-2">
                    <div className="text-lg font-semibold text-gray-700">Date: {summary.date}</div>
                    <div className="text-gray-700">Total Students: {summary.totalStudents}</div>
                    <div className="text-green-700">Present: {summary.present}</div>
                    <div className="text-red-700">Absent: {summary.absent}</div>
                </div>
            ) : null}
            {!loading && !summary && (
                <div className="text-gray-400">No summary available.</div>
            )}
        </div>
    );
};

export default DailyAttendanceSummaryScreen;
