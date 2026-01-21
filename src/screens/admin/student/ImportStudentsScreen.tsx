
import React, { useState } from 'react';

interface Student {
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    class: string;
}

const ImportStudentsScreen: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0] || null);
        setSuccess(false);
        setError(null);
    };

    const handleImport = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file to import.');
            return;
        }
        setLoading(true);
        setError(null);
        setSuccess(false);
        // Simulate import
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 1200);
    };

    return (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
            <h2 className="text-2xl font-bold mb-4">Import Students</h2>
            <form onSubmit={handleImport} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1">Upload CSV File</label>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                {error && <div className="text-red-500">{error}</div>}
                {success && <div className="text-green-600">Students imported successfully!</div>}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700"
                    disabled={loading}
                >
                    {loading ? 'Importing...' : 'Import Students'}
                </button>
            </form>
            <div className="mt-4 text-sm text-gray-500">
                <span>Download sample CSV: </span>
                <a href="#" className="text-blue-600 hover:underline">students_sample.csv</a>
            </div>
        </div>
    );
};

export default ImportStudentsScreen;
