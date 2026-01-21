import React, { useState } from 'react';

interface SchoolClass {
    id: number;
    name: string;
    sectionCount: number;
    classTeacher: string;
}

const mockClasses: SchoolClass[] = [
    { id: 1, name: 'Class 1', sectionCount: 2, classTeacher: 'Mr. Smith' },
    { id: 2, name: 'Class 2', sectionCount: 3, classTeacher: 'Ms. Johnson' },
    { id: 3, name: 'Class 3', sectionCount: 1, classTeacher: 'Mrs. Lee' },
];

const ClassListScreen: React.FC = () => {
    const [classes, setClasses] = useState<SchoolClass[]>(mockClasses);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedClass, setSelectedClass] = useState<SchoolClass | null>(null);

    const handleDelete = (id: number) => {
        setLoading(true);
        setError(null);
        setTimeout(() => {
            setClasses((prev) => prev.filter((cls) => cls.id !== id));
            setLoading(false);
        }, 1000);
    };

    const handleView = (cls: SchoolClass) => {
        setSelectedClass(cls);
    };

    const handleCloseModal = () => {
        setSelectedClass(null);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Class List</h2>
            {loading && <div className="mb-4 text-blue-600">Processing...</div>}
            {error && <div className="mb-4 text-red-600">{error}</div>}
            <table className="min-w-full bg-gray-50 rounded-md overflow-hidden">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Class Name</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Sections</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Class Teacher</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="px-4 py-2 text-center text-gray-400">No classes found.</td>
                        </tr>
                    ) : (
                        classes.map((cls) => (
                            <tr key={cls.id}>
                                <td className="px-4 py-2 text-gray-700">{cls.name}</td>
                                <td className="px-4 py-2 text-gray-700">{cls.sectionCount}</td>
                                <td className="px-4 py-2 text-gray-700">{cls.classTeacher}</td>
                                <td className="px-4 py-2">
                                    <button
                                        className="mr-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        onClick={() => handleView(cls)}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="mr-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                        // onClick={() => handleEdit(cls.id)}
                                        disabled
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        onClick={() => handleDelete(cls.id)}
                                        disabled={loading}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            {/* Modal for viewing class details */}
            {selectedClass && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-2">Class Details</h3>
                        <p><span className="font-semibold">Name:</span> {selectedClass.name}</p>
                        <p><span className="font-semibold">Sections:</span> {selectedClass.sectionCount}</p>
                        <p><span className="font-semibold">Class Teacher:</span> {selectedClass.classTeacher}</p>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            onClick={handleCloseModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClassListScreen;
