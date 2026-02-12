
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, GraduationCap, Calendar, BarChart3, Settings, BookOpen, Search, Plus, Filter, Download, Edit, Trash2, Eye, ChevronRight, BookMarked, UserCheck, RefreshCw, AlertCircle } from 'lucide-react';
const SchoolAdminDashboard = () => {
  const navigate = useNavigate();
  // Search state for Issue/Return
  const [issueReturnSearch, setIssueReturnSearch] = useState('');
  // Return Book Modal State
  const [showReturnBookModal, setShowReturnBookModal] = useState(false);
  const [returnBookRecord, setReturnBookRecord] = useState<any>(null);
  const [returnBookError, setReturnBookError] = useState<string | null>(null);
  const [returnBookSuccess, setReturnBookSuccess] = useState<string | null>(null);
  const [returnBookLoading, setReturnBookLoading] = useState(false);
  // Issue Book Modal State (for + button)
  const [showIssueBookModal, setShowIssueBookModal] = useState(false);
  const [issueBookForm, setIssueBookForm] = useState({ bookId: '', studentId: '' });
  const [issueBookError, setIssueBookError] = useState<string | null>(null);
  const [issueBookSuccess, setIssueBookSuccess] = useState<string | null>(null);
  const [issueBookLoading, setIssueBookLoading] = useState(false);
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [activeLibrarySection, setActiveLibrarySection] = useState('overview');
  type LibraryBook = {
    id: number;
    title: string;
    author: string;
    isbn: string;
    category: string;
    copies: number;
    available: number;
    issued: number;
  };
  
  const [selectedBook, setSelectedBook] = useState<LibraryBook | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Library Data
  const [libraryBooks, setLibraryBooks] = useState<LibraryBook[]>([
    { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0-06-112008-4', category: 'Fiction', copies: 5, available: 3, issued: 2 },
    { id: 2, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0-7432-7356-5', category: 'Fiction', copies: 4, available: 1, issued: 3 },
    { id: 3, title: 'Physics Volume 1', author: 'HC Verma', isbn: '978-81-7709-859-3', category: 'Science', copies: 15, available: 8, issued: 7 },
    { id: 4, title: 'Mathematics Class 10', author: 'R.D. Sharma', isbn: '978-93-5201-254-8', category: 'Mathematics', copies: 20, available: 12, issued: 8 },
    { id: 5, title: '1984', author: 'George Orwell', isbn: '978-0-452-28423-4', category: 'Fiction', copies: 6, available: 4, issued: 2 },
    { id: 6, title: 'Chemistry Today', author: 'G.R. Bathla', isbn: '978-93-5201-445-0', category: 'Science', copies: 12, available: 7, issued: 5 },
  ]);

  // Add Book Modal State
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [addBookForm, setAddBookForm] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    copies: '',
    available: '',
  });
  const [addBookError, setAddBookError] = useState<string | null>(null);

  // Add Book Modal
  const AddBookModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-8 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          onClick={() => {
            setShowAddBookModal(false);
            setAddBookForm({ title: '', author: '', isbn: '', category: '', copies: '', available: '' });
            setAddBookError(null);
          }}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-6 text-gray-900">Add New Book</h2>
        {addBookError && <div className="mb-4 text-red-600 text-sm">{addBookError}</div>}
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!addBookForm.title.trim() || !addBookForm.author.trim() || !addBookForm.isbn.trim() || !addBookForm.category.trim() || !addBookForm.copies.trim() || !addBookForm.available.trim()) {
              setAddBookError('All fields are required.');
              return;
            }
            if (isNaN(Number(addBookForm.copies)) || isNaN(Number(addBookForm.available))) {
              setAddBookError('Copies and Available must be numbers.');
              return;
            }
            if (Number(addBookForm.available) > Number(addBookForm.copies)) {
              setAddBookError('Available cannot exceed Copies.');
              return;
            }
            setLibraryBooks(prev => [
              ...prev,
              {
                id: prev.length ? Math.max(...prev.map(b => b.id)) + 1 : 1,
                title: addBookForm.title,
                author: addBookForm.author,
                isbn: addBookForm.isbn,
                category: addBookForm.category,
                copies: Number(addBookForm.copies),
                available: Number(addBookForm.available),
                issued: Number(addBookForm.copies) - Number(addBookForm.available),
              },
            ]);
            setShowAddBookModal(false);
            setAddBookForm({ title: '', author: '', isbn: '', category: '', copies: '', available: '' });
            setAddBookError(null);
          }}
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={addBookForm.title}
              onChange={e => setAddBookForm(f => ({ ...f, title: e.target.value }))}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Author</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={addBookForm.author}
              onChange={e => setAddBookForm(f => ({ ...f, author: e.target.value }))}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">ISBN</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={addBookForm.isbn}
              onChange={e => setAddBookForm(f => ({ ...f, isbn: e.target.value }))}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Category</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={addBookForm.category}
              onChange={e => setAddBookForm(f => ({ ...f, category: e.target.value }))}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Total Copies</label>
            <input
              type="number"
              min="1"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={addBookForm.copies}
              onChange={e => setAddBookForm(f => ({ ...f, copies: e.target.value }))}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">Available Copies</label>
            <input
              type="number"
              min="0"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={addBookForm.available}
              onChange={e => setAddBookForm(f => ({ ...f, available: e.target.value }))}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              onClick={() => {
                setShowAddBookModal(false);
                setAddBookForm({ title: '', author: '', isbn: '', category: '', copies: '', available: '' });
                setAddBookError(null);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const [libraryMembers, setLibraryMembers] = useState([
    { id: 1, name: 'Aarav Sharma', class: '10-A', roll: '101', booksIssued: 2, status: 'Active', joinDate: '2024-04-15' },
    { id: 2, name: 'Priya Patel', class: '10-B', roll: '205', booksIssued: 1, status: 'Active', joinDate: '2024-03-20' },
    { id: 3, name: 'Rahul Kumar', class: '9-A', roll: '045', booksIssued: 0, status: 'Active', joinDate: '2024-05-10' },
    { id: 4, name: 'Sneha Reddy', class: '10-A', roll: '115', booksIssued: 3, status: 'Active', joinDate: '2024-02-28' },
  ]);

  // Add Member Modal State
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [addMemberForm, setAddMemberForm] = useState({
    name: '',
    class: '',
    roll: '',
    joinDate: '',
  });
  const [addMemberError, setAddMemberError] = useState<string | null>(null);
  const [addMemberSuccess, setAddMemberSuccess] = useState<string | null>(null);

  // Add Member Modal
  const AddMemberModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-8 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          onClick={() => {
            setShowAddMemberModal(false);
            setAddMemberForm({ name: '', class: '', roll: '', joinDate: '' });
            setAddMemberError(null);
            setAddMemberSuccess(null);
          }}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-6 text-gray-900">Add New Member</h2>
        {addMemberError && <div className="mb-4 text-red-600 text-sm">{addMemberError}</div>}
        {addMemberSuccess && <div className="mb-4 text-green-600 text-sm">{addMemberSuccess}</div>}
        <form
          onSubmit={e => {
            e.preventDefault();
            setAddMemberError(null);
            setAddMemberSuccess(null);
            if (!addMemberForm.name.trim() || !addMemberForm.class.trim() || !addMemberForm.roll.trim() || !addMemberForm.joinDate.trim()) {
              setAddMemberError('All fields are required.');
              return;
            }
            // Optionally, add more validation here
            setLibraryMembers(prev => [
              ...prev,
              {
                id: prev.length ? Math.max(...prev.map(m => m.id)) + 1 : 1,
                name: addMemberForm.name,
                class: addMemberForm.class,
                roll: addMemberForm.roll,
                booksIssued: 0,
                status: 'Active',
                joinDate: addMemberForm.joinDate,
              },
            ]);
            setAddMemberSuccess('Member added successfully.');
            setTimeout(() => {
              setShowAddMemberModal(false);
              setAddMemberForm({ name: '', class: '', roll: '', joinDate: '' });
              setAddMemberSuccess(null);
            }, 1200);
          }}
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={addMemberForm.name}
              onChange={e => setAddMemberForm(f => ({ ...f, name: e.target.value }))}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Class</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={addMemberForm.class}
              onChange={e => setAddMemberForm(f => ({ ...f, class: e.target.value }))}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Roll No</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={addMemberForm.roll}
              onChange={e => setAddMemberForm(f => ({ ...f, roll: e.target.value }))}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">Join Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={addMemberForm.joinDate}
              onChange={e => setAddMemberForm(f => ({ ...f, joinDate: e.target.value }))}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              onClick={() => {
                setShowAddMemberModal(false);
                setAddMemberForm({ name: '', class: '', roll: '', joinDate: '' });
                setAddMemberError(null);
                setAddMemberSuccess(null);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const [issueRecords, setIssueRecords] = useState([
    { id: 1, student: 'Aarav Sharma', book: 'Physics Volume 1', issueDate: '2026-01-15', dueDate: '2026-01-29', status: 'Issued', fine: 0 },
    { id: 2, student: 'Priya Patel', book: 'The Great Gatsby', issueDate: '2026-01-10', dueDate: '2026-01-24', status: 'Issued', fine: 0 },
    { id: 3, student: 'Sneha Reddy', book: 'To Kill a Mockingbird', issueDate: '2026-01-08', dueDate: '2026-01-22', status: 'Overdue', fine: 20 },
    { id: 4, student: 'Rahul Kumar', book: 'Mathematics Class 10', issueDate: '2025-12-20', dueDate: '2026-01-03', status: 'Returned', fine: 0 },
  ]);

  const LibraryOverview = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-left">Library Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <BookOpen className="w-8 h-8 text-blue-600 mb-3" />
          <p className="text-sm text-gray-600">Total Books</p>
          <p className="text-3xl font-bold text-gray-900">1,247</p>
        </div>
        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <BookMarked className="w-8 h-8 text-green-600 mb-3" />
          <p className="text-sm text-gray-600">Available</p>
          <p className="text-3xl font-bold text-gray-900">892</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
          <RefreshCw className="w-8 h-8 text-purple-600 mb-3" />
          <p className="text-sm text-gray-600">Books Issued</p>
          <p className="text-3xl font-bold text-gray-900">355</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
          <AlertCircle className="w-8 h-8 text-orange-600 mb-3" />
          <p className="text-sm text-gray-600">Overdue</p>
          <p className="text-3xl font-bold text-gray-900">23</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button onClick={() => setActiveLibrarySection('books')} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 border border-gray-200">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <div className="text-left flex-1">
                <p className="font-medium text-gray-900">Manage Books</p>
                <p className="text-sm text-gray-500">Add, edit, or remove books</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button onClick={() => setActiveLibrarySection('issue')} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 border border-gray-200">
              <RefreshCw className="w-5 h-5 text-green-600" />
              <div className="text-left flex-1">
                <p className="font-medium text-gray-900">Issue/Return Books</p>
                <p className="text-sm text-gray-500">Manage book transactions</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button onClick={() => setActiveLibrarySection('members')} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 border border-gray-200">
              <UserCheck className="w-5 h-5 text-purple-600" />
              <div className="text-left flex-1">
                <p className="font-medium text-gray-900">Library Members</p>
                <p className="text-sm text-gray-500">View and manage members</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {issueRecords.slice(0, 5).map((record) => (
              <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 text-sm">{record.student}</p>
                  <p className="text-xs text-gray-500">{record.book}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  record.status === 'Issued' ? 'bg-blue-100 text-blue-700' :
                  record.status === 'Returned' ? 'bg-green-100 text-green-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {record.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const BooksManagement = () => (
    <div>
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Books Management</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => setShowAddBookModal(true)}
          >
            <Plus className="w-4 h-4" />
            Add Book
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Book Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ISBN</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Copies</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Available</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {libraryBooks.filter(book => 
              book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              book.author.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((book) => (
              <tr key={book.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{book.title}</p>
                    <p className="text-sm text-gray-500">{book.author}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{book.isbn}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                    {book.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{book.copies}</td>
                <td className="px-6 py-4">
                  <span className={`font-medium ${book.available > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {book.available}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => setSelectedBook(book)} className="p-1 hover:bg-gray-100 rounded">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded" onClick={() => {
                      setAddBookForm({
                        title: book.title,
                        author: book.author,
                        isbn: book.isbn,
                        category: book.category,
                        copies: String(book.copies),
                        available: String(book.available),
                      });
                      setShowAddBookModal(true);
                    }}>
                      <Edit className="w-4 h-4 text-blue-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded" onClick={() => {
                      if (window.confirm(`Are you sure you want to delete '${book.title}'?`)) {
                        setLibraryBooks(prev => prev.filter(b => b.id !== book.id));
                      }
                    }}>
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Book Details</h3>
              <button onClick={() => setSelectedBook(null)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Title</p>
                  <p className="font-medium text-gray-900">{selectedBook.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Author</p>
                  <p className="font-medium text-gray-900">{selectedBook.author}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ISBN</p>
                  <p className="font-medium text-gray-900">{selectedBook.isbn}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium text-gray-900">{selectedBook.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Copies</p>
                  <p className="font-medium text-gray-900">{selectedBook.copies}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Available</p>
                  <p className="font-medium text-green-600">{selectedBook.available}</p>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Issue Book
                </button>
                <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Edit Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const [memberSearch, setMemberSearch] = useState("");
  const MembersManagement = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Library Members</h2>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => {
            setShowAddMemberModal(true);
            setAddMemberError(null);
            setAddMemberSuccess(null);
          }}
        >
          <Plus className="w-4 h-4" />
          Add Member
        </button>
      </div>

      <div className="mb-4 flex justify-end">
        <input
          type="text"
          className="w-full max-w-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search by member name..."
          value={memberSearch}
          onChange={e => setMemberSearch(e.target.value)}
        />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Roll No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Books Issued</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {libraryMembers
              .filter(member =>
                member.name.toLowerCase().includes(memberSearch.toLowerCase())
              )
              .map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{member.class}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{member.roll}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{member.booksIssued}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {showAddMemberModal && <AddMemberModal />}
    </div>
  );

  const IssueReturn = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Issue & Return Records</h2>
        <div className="flex gap-3 items-center">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by student name..."
              value={issueReturnSearch}
              onChange={e => setIssueReturnSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => {
              setShowIssueBookModal(true);
              setIssueBookError(null);
              setIssueBookSuccess(null);
              setIssueBookForm({ bookId: '', studentId: '' });
            }}
          >
            <Plus className="w-4 h-4" />
            Issue Book
          </button>
          {/* Issue Book Modal (for + button) */}
          {showIssueBookModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Issue Book</h3>
                  <button onClick={() => setShowIssueBookModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    setIssueBookError(null);
                    setIssueBookSuccess(null);
                    setIssueBookLoading(true);
                    if (!issueBookForm.bookId.trim() || !issueBookForm.studentId.trim()) {
                      setIssueBookError('Both Book ID and Student ID are required.');
                      setIssueBookLoading(false);
                      return;
                    }
                    const book = libraryBooks.find(b => b.id === Number(issueBookForm.bookId));
                    if (!book) {
                      setIssueBookError('Book not found.');
                      setIssueBookLoading(false);
                      return;
                    }
                    if (book.available < 1) {
                      setIssueBookError('No available copies to issue.');
                      setIssueBookLoading(false);
                      return;
                    }
                    // Simulate API call
                    setTimeout(() => {
                      setLibraryBooks(prev => prev.map(b => b.id === book.id ? { ...b, available: b.available - 1, issued: b.issued + 1 } : b));
                      setIssueBookSuccess('Book issued successfully.');
                      setIssueBookLoading(false);
                      setTimeout(() => {
                        setShowIssueBookModal(false);
                        setIssueBookForm({ bookId: '', studentId: '' });
                        setIssueBookSuccess(null);
                      }, 1200);
                    }, 1000);
                  }}
                >
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Book ID</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={issueBookForm.bookId}
                      onChange={e => setIssueBookForm(f => ({ ...f, bookId: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Student ID</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={issueBookForm.studentId}
                      onChange={e => setIssueBookForm(f => ({ ...f, studentId: e.target.value }))}
                      required
                    />
                  </div>
                  {issueBookError && <div className="mb-2 text-red-600 text-sm">{issueBookError}</div>}
                  {issueBookSuccess && <div className="mb-2 text-green-600 text-sm">{issueBookSuccess}</div>}
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowIssueBookModal(false)}
                      disabled={issueBookLoading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold"
                      disabled={issueBookLoading}
                    >
                      {issueBookLoading ? 'Issuing...' : 'Issue Book'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Book Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issue Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fine</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {issueRecords
              .filter(record =>
                record.student.toLowerCase().includes(issueReturnSearch.toLowerCase())
              )
              .map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{record.student}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{record.book}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{record.issueDate}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{record.dueDate}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    record.status === 'Issued' ? 'bg-blue-100 text-blue-700' :
                    record.status === 'Returned' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {record.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  {record.fine > 0 ? (
                    <span className="text-red-600 font-medium">₹{record.fine}</span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {record.status !== 'Returned' && (
                    <button
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                      onClick={() => {
                        setShowReturnBookModal(true);
                        setReturnBookRecord(record);
                        setReturnBookError(null);
                        setReturnBookSuccess(null);
                      }}
                    >
                      Return
                    </button>
                  )}
                      {/* Return Book Modal */}
                      {showReturnBookModal && returnBookRecord && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                          <div className="bg-white rounded-lg max-w-md w-full p-6">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-bold text-gray-900">Return Book</h3>
                              <button onClick={() => setShowReturnBookModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                            </div>
                            <div className="mb-4">
                              <p className="text-gray-700 mb-2">Are you sure you want to mark <span className="font-semibold">{returnBookRecord.book}</span> as returned for <span className="font-semibold">{returnBookRecord.student}</span>?</p>
                            </div>
                            {returnBookError && <div className="mb-2 text-red-600 text-sm">{returnBookError}</div>}
                            {returnBookSuccess && <div className="mb-2 text-green-600 text-sm">{returnBookSuccess}</div>}
                            <div className="flex justify-end gap-2 mt-4">
                              <button
                                type="button"
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                                onClick={() => setShowReturnBookModal(false)}
                                disabled={returnBookLoading}
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 font-semibold"
                                disabled={returnBookLoading}
                                onClick={() => {
                                  setReturnBookError(null);
                                  setReturnBookSuccess(null);
                                  setReturnBookLoading(true);
                                  // Simulate API call
                                  setTimeout(() => {
                                    // Mark as returned in issueRecords (if stateful, update state)
                                    setIssueRecords((prev: any[]) => prev.map(r => r.id === returnBookRecord.id ? { ...r, status: 'Returned' } : r));
                                    setReturnBookSuccess('Book marked as returned.');
                                    setReturnBookLoading(false);
                                    setTimeout(() => {
                                      setShowReturnBookModal(false);
                                      setReturnBookRecord(null);
                                      setReturnBookSuccess(null);
                                    }, 1200);
                                  }, 1000);
                                }}
                              >
                                {returnBookLoading ? 'Returning...' : 'Confirm Return'}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderLibraryContent = () => {
    switch (activeLibrarySection) {
      case 'overview':
        return <LibraryOverview />;
      case 'books':
        return <BooksManagement />;
      case 'members':
        return <MembersManagement />;
      case 'issue':
        return <IssueReturn />;
      default:
        return <LibraryOverview />;
    }
  };

  const renderContent = () => {
    if (activeScreen === 'library') {
      return renderLibraryContent();
    }

    return (
      <div className="text-center py-12">
       {renderLibraryContent()}
      </div>
    );
  };

  const menuItems = [
    
    { id: 'library', label: 'Library', icon: <BookOpen className="w-5 h-5" /> },
   
  ];

  const librarySubMenu = [
    { id: 'overview', label: 'Overview' },
    { id: 'books', label: 'Books' },
    { id: 'members', label: 'Members' },
    { id: 'issue', label: 'Issue/Return' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {showAddBookModal && <AddBookModal />}
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SchoolAdminDashboard;