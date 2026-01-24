
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Dummy data for demonstration
const teachers = [
    {
        id: 1,
        employeeId: 'EMP-001',
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.j@email.com',
        department: 'Math',
        phone: '9876543210',
        status: 'Active',
        subjects: 'Algebra, Geometry',
        classes: '6A, 7B',
    },
    {
        id: 2,
        employeeId: 'EMP-002',
        firstName: 'Bob',
        lastName: 'Smith',
        email: 'bob.s@email.com',
        department: 'Science',
        phone: '9123456789',
        status: 'Inactive',
        subjects: 'Physics',
        classes: '8A',
    },
];

const EditTeacherScreen: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const teacher = teachers.find(t => String(t.id) === id);
    const [form, setForm] = useState(teacher || {
        firstName: '', lastName: '', employeeId: '', email: '', department: '', phone: '', status: 'Active', subjects: '', classes: ''
    });

    if (!teacher) return <div className="p-6">Teacher not found.</div>;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Teacher updated (dummy)');
        navigate('/admin/teachers');
    };

    return (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
            <h2 className="text-2xl font-bold mb-4">Edit Teacher</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-2">
                    <input className="input w-1/2" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
                    <input className="input w-1/2" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
                </div>
                <input className="input w-full" name="employeeId" placeholder="Employee ID" value={form.employeeId} onChange={handleChange} required />
                <input className="input w-full" name="email" placeholder="Email" value={form.email} onChange={handleChange} required type="email" />
                <input className="input w-full" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
                <select className="input w-full" name="department" value={form.department} onChange={handleChange} required>
                    <option value="">Select Department</option>
                    <option value="Math">Math</option>
                    <option value="Science">Science</option>
                    <option value="English">English</option>
                </select>
                <input className="input w-full" name="subjects" placeholder="Subjects (comma separated)" value={form.subjects} onChange={handleChange} />
                <input className="input w-full" name="classes" placeholder="Classes (comma separated)" value={form.classes} onChange={handleChange} />
                <select className="input w-full" name="status" value={form.status} onChange={handleChange} required>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
                <div className="flex gap-2 mt-6">
                    <button type="submit" className="btn-primary">Update</button>
                    <button type="button" className="btn-secondary ml-auto" onClick={() => navigate('/admin/teachers')}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditTeacherScreen;
