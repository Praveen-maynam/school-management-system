
import React, { useState } from 'react';
import AddStudentScreen from './AddStudentScreen';

interface Student {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    class: string;
}

const sampleStudents: Student[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@email.com', class: '3' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@email.com', class: '2' },
    { id: 3, firstName: 'Sam', lastName: 'Brown', email: 'sam.brown@email.com', class: '1' },
];



const StudentListScreen: React.FC = () => {
    const [students, setStudents] = useState<Student[]>(sampleStudents);
    const [loading, setLoading] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    // Simulate delete action
    const handleDelete = (id: number) => {
        setLoading(true);
        setTimeout(() => {
            setStudents((prev) => prev.filter((s) => s.id !== id));
            setLoading(false);
        }, 800);
    };

    // Modal close handler
    const handleCloseModal = () => setShowAddModal(false);

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Student List</h2>
                <button
                    className="bg-blue-600 text-white px-5 py-2 rounded font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setShowAddModal(true)}
                    aria-label="Add new student"
                >
                    Add New Student
                </button>
            </div>
            {/* error state removed as setError is unused */}
            {loading && <div className="text-blue-600 mb-2">Processing...</div>}
            {students.length === 0 ? (
                <div className="text-gray-500 py-8 text-center">No students found.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Email</th>
                                <th className="px-4 py-2 text-left">Class</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id} className="border-b">
                                    <td className="px-4 py-2">{student.firstName} {student.lastName}</td>
                                    <td className="px-4 py-2">{student.email}</td>
                                    <td className="px-4 py-2">{student.class}</td>
                                    <td className="px-4 py-2 flex gap-2">
                                        <button className="text-blue-600 hover:underline text-sm">View</button>
                                        <button className="text-green-600 hover:underline text-sm">Edit</button>
                                        <button
                                            className="text-red-600 hover:underline text-sm"
                                            onClick={() => handleDelete(student.id)}
                                            disabled={loading}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal for Add Student */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full relative animate-fadeIn">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                            onClick={handleCloseModal}
                            aria-label="Close add student modal"
                        >
                            &times;
                        </button>
                        <AddStudentScreen />
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentListScreen;
