
import React, { useState, useEffect } from 'react';

interface Parent {
    name: string;
    contact: string;
    email: string;
    address?: string;
}

interface Student {
    id: number;
    firstName: string;
    lastName: string;
    parent: Parent;
}

const mockStudent: Student = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    parent: {
        name: 'Jane Doe',
        contact: '555-1234',
        email: 'jane.doe@email.com',
        address: '123 Main St, Springfield',
    },
};

const ParentInfoViewScreen: React.FC = () => {
    const [student, setStudent] = useState<Student | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setStudent(mockStudent);
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) return <div className="text-blue-600 p-6">Loading parent info...</div>;
    if (error) return <div className="text-red-500 p-6">{error}</div>;
    if (!student) return <div className="text-gray-500 p-6">Student not found.</div>;

    return (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
            <h2 className="text-2xl font-bold mb-4">Parent Information</h2>
            <div className="space-y-2">
                <div><span className="font-medium">Student Name:</span> {student.firstName} {student.lastName}</div>
                <div><span className="font-medium">Parent Name:</span> {student.parent.name}</div>
                <div><span className="font-medium">Contact:</span> {student.parent.contact}</div>
                <div><span className="font-medium">Email:</span> {student.parent.email}</div>
                {student.parent.address && <div><span className="font-medium">Address:</span> {student.parent.address}</div>}
            </div>
        </div>
    );
};

export default ParentInfoViewScreen;
