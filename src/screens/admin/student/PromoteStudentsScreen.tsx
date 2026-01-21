
import React, { useState } from 'react';

interface Student {
    id: number;
    firstName: string;
    lastName: string;
    class: string;
}

const sampleStudents: Student[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', class: '3' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', class: '2' },
    { id: 3, firstName: 'Sam', lastName: 'Brown', class: '1' },
];

const PromoteStudentsScreen: React.FC = () => {
    const [students, setStudents] = useState<Student[]>(sampleStudents);
    const [selected, setSelected] = useState<number[]>([]);
    const [newClass, setNewClass] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSelect = (id: number) => {
        setSelected((prev) => prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]);
    };

    const handlePromote = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newClass || selected.length === 0) {
            setError('Select students and a new class.');
            return;
        }
        setLoading(true);
        setError(null);
        setSuccess(false);
        setTimeout(() => {
            setStudents((prev) => prev.map(s => selected.includes(s.id) ? { ...s, class: newClass } : s));
            setSelected([]);
            setNewClass('');
            setLoading(false);
            setSuccess(true);
        }, 1200);
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
            <h2 className="text-2xl font-bold mb-4">Promote Students</h2>
            <form onSubmit={handlePromote} className="space-y-4">
                <div className="overflow-x-auto">
                    <table className="min-w-full border">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left">Select</th>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Current Class</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id} className="border-b">
                                    <td className="px-4 py-2">
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(student.id)}
                                            onChange={() => handleSelect(student.id)}
                                        />
                                    </td>
                                    <td className="px-4 py-2">{student.firstName} {student.lastName}</td>
                                    <td className="px-4 py-2">{student.class}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <label className="block font-medium mb-1">Promote to Class</label>
                    <select
                        value={newClass}
                        onChange={e => setNewClass(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        required
                    >
                        <option value="">Select Class</option>
                        <option value="1">Class 1</option>
                        <option value="2">Class 2</option>
                        <option value="3">Class 3</option>
                        <option value="4">Class 4</option>
                        <option value="5">Class 5</option>
                    </select>
                </div>
                {error && <div className="text-red-500">{error}</div>}
                {success && <div className="text-green-600">Students promoted successfully!</div>}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700"
                    disabled={loading}
                >
                    {loading ? 'Promoting...' : 'Promote Selected'}
                </button>
            </form>
        </div>
    );
};

export default PromoteStudentsScreen;
