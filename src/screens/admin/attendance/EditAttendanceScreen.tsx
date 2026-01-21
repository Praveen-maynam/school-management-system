import React, { useState } from 'react';

interface StudentAttendance {
    id: number;
    name: string;
    present: boolean;
}

const mockAttendance: StudentAttendance[] = [
    { id: 1, name: 'Alice Johnson', present: true },
    { id: 2, name: 'Bob Smith', present: false },
    { id: 3, name: 'Charlie Lee', present: true },
];

const EditAttendanceScreen: React.FC = () => {
    const [attendance, setAttendance] = useState<StudentAttendance[]>(mockAttendance);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleToggle = (id: number) => {
        setAttendance((prev) =>
            prev.map((student) =>
                student.id === id ? { ...student, present: !student.present } : student
            )
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        setTimeout(() => {
            setSuccess('Attendance updated successfully!');
            setLoading(false);
        }, 1200);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Attendance</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <table className="min-w-full bg-gray-50 rounded-md overflow-hidden mb-4">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Student</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Present</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendance.length === 0 ? (
                            <tr>
                                <td colSpan={2} className="px-4 py-2 text-center text-gray-400">No students found.</td>
                            </tr>
                        ) : (
                            attendance.map((student) => (
                                <tr key={student.id}>
                                    <td className="px-4 py-2 text-gray-700">{student.name}</td>
                                    <td className="px-4 py-2">
                                        <input
                                            type="checkbox"
                                            checked={student.present}
                                            onChange={() => handleToggle(student.id)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
            {error && <div className="mt-4 text-red-600 font-medium">{error}</div>}
            {success && <div className="mt-4 text-green-600 font-medium">{success}</div>}
        </div>
    );
};

export default EditAttendanceScreen;
