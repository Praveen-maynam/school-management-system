
import React, { useState } from 'react';
import AddTeacherScreen from './AddTeacherScreen';

interface Teacher {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
}

const sampleTeachers: Teacher[] = [
    { id: 1, firstName: 'Alice', lastName: 'Johnson', email: 'alice.j@email.com', subject: 'Math' },
    { id: 2, firstName: 'Bob', lastName: 'Smith', email: 'bob.s@email.com', subject: 'Science' },
    { id: 3, firstName: 'Carol', lastName: 'Brown', email: 'carol.b@email.com', subject: 'English' },
];

const TeacherListScreen: React.FC = () => {
    const [teachers, setTeachers] = useState<Teacher[]>(sampleTeachers);
    const [loading, setLoading] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    // Simulate delete action
    const handleDelete = (id: number) => {
        setLoading(true);
        setTimeout(() => {
            setTeachers((prev) => prev.filter((t) => t.id !== id));
            setLoading(false);
        }, 800);
    };

    // Modal close handler
    const handleCloseModal = () => setShowAddModal(false);

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Teacher List</h2>
                <button
                    className="bg-blue-600 text-white px-5 py-2 rounded font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setShowAddModal(true)}
                    aria-label="Add new teacher"
                >
                    Add New Teacher
                </button>
            </div>
            {loading && <div className="text-blue-600 mb-2">Processing...</div>}
            {teachers.length === 0 ? (
                <div className="text-gray-500 py-8 text-center">No teachers found.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Email</th>
                                <th className="px-4 py-2 text-left">Subject</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.map((teacher) => (
                                <tr key={teacher.id} className="border-b">
                                    <td className="px-4 py-2">{teacher.firstName} {teacher.lastName}</td>
                                    <td className="px-4 py-2">{teacher.email}</td>
                                    <td className="px-4 py-2">{teacher.subject}</td>
                                    <td className="px-4 py-2 flex gap-2">
                                        <button className="text-blue-600 hover:underline text-sm">View</button>
                                        <button className="text-green-600 hover:underline text-sm">Edit</button>
                                        <button
                                            className="text-red-600 hover:underline text-sm"
                                            onClick={() => handleDelete(teacher.id)}
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

            {/* Modal for Add Teacher */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full relative animate-fadeIn">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                            onClick={handleCloseModal}
                            aria-label="Close add teacher modal"
                        >
                            &times;
                        </button>
                        <AddTeacherScreen />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherListScreen;
