import React, { useState } from 'react';

interface StudentAttendance {
    id: number;
    name: string;
    present: boolean | null;
}

const mockStudents: StudentAttendance[] = [
    { id: 1, name: 'Alice Johnson', present: null },
    { id: 2, name: 'Bob Smith', present: null },
    { id: 3, name: 'Charlie Lee', present: null },
];

const MarkAttendanceAdminScreen: React.FC = () => {
    const [students, setStudents] = useState<StudentAttendance[]>(mockStudents);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleMark = (id: number, present: boolean) => {
        setStudents((prev) =>
            prev.map((student) =>
                student.id === id ? { ...student, present } : student
            )
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        // Validation: all students must be marked
        for (const student of students) {
            if (student.present === null) {
                setError('Please mark attendance for all students.');
                setLoading(false);
                return;
            }
        }
        setTimeout(() => {
            setSuccess('Attendance marked successfully!');
            setLoading(false);
        }, 1200);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Mark Attendance</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <table className="min-w-full bg-gray-50 rounded-md overflow-hidden mb-4">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Student</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Present</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Absent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="px-4 py-2 text-center text-gray-400">No students found.</td>
                            </tr>
                        ) : (
                            students.map((student) => (
                                <tr key={student.id}>
                                    <td className="px-4 py-2 text-gray-700">{student.name}</td>
                                    <td className="px-4 py-2 text-center">
                                        <input
                                            type="radio"
                                            name={`attendance-${student.id}`}
                                            checked={student.present === true}
                                            onChange={() => handleMark(student.id, true)}
                                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                        />
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <input
                                            type="radio"
                                            name={`attendance-${student.id}`}
                                            checked={student.present === false}
                                            onChange={() => handleMark(student.id, false)}
                                            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
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
                    {loading ? 'Submitting...' : 'Submit Attendance'}
                </button>
            </form>
            {error && <div className="mt-4 text-red-600 font-medium">{error}</div>}
            {success && <div className="mt-4 text-green-600 font-medium">{success}</div>}
        </div>
    );
};

export default MarkAttendanceAdminScreen;
