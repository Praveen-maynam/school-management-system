
import React, { useState, useEffect } from 'react';

interface Student {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    class: string;
    address?: string;
    parentName?: string;
    parentContact?: string;
}

const mockStudent: Student = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    dob: '2010-05-15',
    class: '3',
    address: '123 Main St, Springfield',
    parentName: 'Jane Doe',
    parentContact: '555-1234',
};

const StudentDetailsScreen: React.FC = () => {
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

    if (loading) return <div className="text-blue-600 p-6">Loading student details...</div>;
    if (error) return <div className="text-red-500 p-6">{error}</div>;
    if (!student) return <div className="text-gray-500 p-6">Student not found.</div>;

    return (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
            <h2 className="text-2xl font-bold mb-4">Student Details</h2>
            <div className="space-y-2">
                <div><span className="font-medium">Name:</span> {student.firstName} {student.lastName}</div>
                <div><span className="font-medium">Email:</span> {student.email}</div>
                <div><span className="font-medium">Date of Birth:</span> {student.dob}</div>
                <div><span className="font-medium">Class:</span> {student.class}</div>
                {student.address && <div><span className="font-medium">Address:</span> {student.address}</div>}
                {student.parentName && <div><span className="font-medium">Parent Name:</span> {student.parentName}</div>}
                {student.parentContact && <div><span className="font-medium">Parent Contact:</span> {student.parentContact}</div>}
            </div>
        </div>
    );
};

export default StudentDetailsScreen;
