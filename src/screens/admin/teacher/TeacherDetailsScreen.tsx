
import React, { useState, useEffect } from 'react';

interface Teacher {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    phone?: string;
    address?: string;
}

const mockTeacher: Teacher = {
    id: 1,
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.j@email.com',
    subject: 'Math',
    phone: '555-9876',
    address: '456 School Rd, Springfield',
};

const TeacherDetailsScreen: React.FC = () => {
    const [teacher, setTeacher] = useState<Teacher | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setTeacher(mockTeacher);
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) return <div className="text-blue-600 p-6">Loading teacher details...</div>;
    if (error) return <div className="text-red-500 p-6">{error}</div>;
    if (!teacher) return <div className="text-gray-500 p-6">Teacher not found.</div>;

    return (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
            <h2 className="text-2xl font-bold mb-4">Teacher Details</h2>
            <div className="space-y-2">
                <div><span className="font-medium">Name:</span> {teacher.firstName} {teacher.lastName}</div>
                <div><span className="font-medium">Email:</span> {teacher.email}</div>
                <div><span className="font-medium">Subject:</span> {teacher.subject}</div>
                {teacher.phone && <div><span className="font-medium">Phone:</span> {teacher.phone}</div>}
                {teacher.address && <div><span className="font-medium">Address:</span> {teacher.address}</div>}
            </div>
        </div>
    );
};

export default TeacherDetailsScreen;
