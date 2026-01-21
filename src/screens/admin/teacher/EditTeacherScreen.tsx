
import React, { useState } from 'react';

interface Teacher {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
}

// Simulate fetching teacher data
const mockTeacher: Teacher = {
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.j@email.com',
    subject: 'Math',
};

const EditTeacherScreen: React.FC = () => {
    const [teacher, setTeacher] = useState<Teacher>(mockTeacher);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setTeacher({ ...teacher, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 1200);
    };

    return (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
            <h2 className="text-2xl font-bold mb-4">Edit Teacher</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={teacher.firstName}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={teacher.lastName}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={teacher.email}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Subject</label>
                    <select
                        name="subject"
                        value={teacher.subject}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    >
                        <option value="">Select Subject</option>
                        <option value="Math">Math</option>
                        <option value="Science">Science</option>
                        <option value="English">English</option>
                        <option value="History">History</option>
                        <option value="Art">Art</option>
                    </select>
                </div>
                {error && <div className="text-red-500">{error}</div>}
                {success && <div className="text-green-600">Teacher updated successfully!</div>}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700"
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
};

export default EditTeacherScreen;
