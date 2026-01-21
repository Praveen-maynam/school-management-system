import React, { useState } from 'react';

interface ReturnForm {
  bookId: number | '';
  studentName: string;
}

const mockIssuedBooks = [
  { id: 2, title: 'Physics for Beginners', student: 'Alice Johnson' },
];

const ReturnBookScreen: React.FC = () => {
  const [form, setForm] = useState<ReturnForm>({ bookId: '', studentName: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'bookId' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!form.bookId) {
      setError('Please select a book.');
      return;
    }
    if (!form.studentName.trim()) {
      setError('Please enter the student name.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setSuccess(`Book returned by ${form.studentName} successfully.`);
      setForm({ bookId: '', studentName: '' });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Return Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="bookId" className="block text-sm font-medium text-gray-700">Issued Book</label>
          <select
            id="bookId"
            name="bookId"
            value={form.bookId}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select a book</option>
            {mockIssuedBooks.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title} (Issued to {book.student})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">Student Name</label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            value={form.studentName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? 'Returning...' : 'Return Book'}
        </button>
      </form>
      {error && <div className="mt-4 text-red-600 font-medium">{error}</div>}
      {success && <div className="mt-4 text-green-600 font-medium">{success}</div>}
    </div>
  );
};

export default ReturnBookScreen;
