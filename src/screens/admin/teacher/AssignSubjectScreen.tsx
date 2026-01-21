
import React, { useState } from 'react';

interface Teacher {
    id: number;
    name: string;
    subject?: string;
}

const sampleTeachers: Teacher[] = [
    { id: 1, name: 'Alice Johnson' },
    { id: 2, name: 'Bob Smith' },
    { id: 3, name: 'Carol Brown' },
];

const subjects = ['Math', 'Science', 'English', 'History', 'Art'];

const AssignSubjectScreen: React.FC = () => {
    const [teachers, setTeachers] = useState<Teacher[]>(sampleTeachers);
    const [selectedTeacher, setSelectedTeacher] = useState<number | null>(null);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleAssign = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedTeacher || !selectedSubject) {
            setError('Select a teacher and a subject.');
            return;
        }
        setLoading(true);
        setError(null);
        setSuccess(false);
        setTimeout(() => {
            setTeachers((prev) =>
                prev.map((t) =>
                    t.id === selectedTeacher ? { ...t, subject: selectedSubject } : t
                )
            );
            setSelectedTeacher(null);
            setSelectedSubject('');
            setLoading(false);
            setSuccess(true);
        }, 1200);
    };

    return (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
            <h2 className="text-2xl font-bold mb-4">Assign Subject to Teacher</h2>
            <form onSubmit={handleAssign} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1">Select Teacher</label>
                    <select
                        value={selectedTeacher ?? ''}
                        onChange={e => setSelectedTeacher(Number(e.target.value))}
                        className="w-full border rounded px-3 py-2"
                        required
                    >
                        <option value="">Choose Teacher</option>
                        {teachers.map(t => (
                            <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block font-medium mb-1">Select Subject</label>
                    <select
                        value={selectedSubject}
                        onChange={e => setSelectedSubject(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        required
                    >
                        <option value="">Choose Subject</option>
                        {subjects.map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
                {error && <div className="text-red-500">{error}</div>}
                {success && <div className="text-green-600">Subject assigned successfully!</div>}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700"
                    disabled={loading}
                >
                    {loading ? 'Assigning...' : 'Assign Subject'}
                </button>
            </form>
            <div className="mt-6">
                <h3 className="font-semibold mb-2">Current Assignments</h3>
                <ul className="list-disc pl-6 text-gray-700">
                    {teachers.map(t => (
                        <li key={t.id}>{t.name}: {t.subject || 'No subject assigned'}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AssignSubjectScreen;
