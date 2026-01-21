import React, { useState } from 'react';

interface Section {
    id: number;
    name: string;
    className: string;
    students: number;
}

const mockSections: Section[] = [
    { id: 1, name: 'A', className: 'Class 1', students: 30 },
    { id: 2, name: 'B', className: 'Class 1', students: 28 },
    { id: 3, name: 'A', className: 'Class 2', students: 32 },
];

const SectionListScreen: React.FC = () => {
    const [sections, setSections] = useState<Section[]>(mockSections);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedSection, setSelectedSection] = useState<Section | null>(null);

    const handleDelete = (id: number) => {
        setLoading(true);
        setError(null);
        setTimeout(() => {
            setSections((prev) => prev.filter((sec) => sec.id !== id));
            setLoading(false);
        }, 1000);
    };

    const handleView = (sec: Section) => {
        setSelectedSection(sec);
    };

    const handleCloseModal = () => {
        setSelectedSection(null);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Section List</h2>
            {loading && <div className="mb-4 text-blue-600">Processing...</div>}
            {error && <div className="mb-4 text-red-600">{error}</div>}
            <table className="min-w-full bg-gray-50 rounded-md overflow-hidden">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Section Name</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Class</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Students</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sections.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="px-4 py-2 text-center text-gray-400">No sections found.</td>
                        </tr>
                    ) : (
                        sections.map((sec) => (
                            <tr key={sec.id}>
                                <td className="px-4 py-2 text-gray-700">{sec.name}</td>
                                <td className="px-4 py-2 text-gray-700">{sec.className}</td>
                                <td className="px-4 py-2 text-gray-700">{sec.students}</td>
                                <td className="px-4 py-2">
                                    <button
                                        className="mr-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        onClick={() => handleView(sec)}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="mr-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                        // onClick={() => handleEdit(sec.id)}
                                        disabled
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        onClick={() => handleDelete(sec.id)}
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
            {/* Modal for viewing section details */}
            {selectedSection && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-2">Section Details</h3>
                        <p><span className="font-semibold">Name:</span> {selectedSection.name}</p>
                        <p><span className="font-semibold">Class:</span> {selectedSection.className}</p>
                        <p><span className="font-semibold">Students:</span> {selectedSection.students}</p>
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

export default SectionListScreen;
