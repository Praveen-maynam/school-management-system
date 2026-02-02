import React, { useState } from 'react';

// Types
interface Book {
  id: number;
  bookId: string;
  title: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
}

interface InventoryHistory {
  id: number;
  bookId: string;
  bookTitle: string;
  date: string;
  action: 'Issued' | 'Returned' | 'Added' | 'Removed';
  quantity: number;
  performedBy: string;
  remarks: string;
}

interface AddCopiesModalProps {
  book: Book | null;
  onClose: () => void;
  onAdd: (data: AddCopiesData) => void;
}

interface RemoveCopiesModalProps {
  book: Book | null;
  onClose: () => void;
  onRemove: (data: RemoveCopiesData) => void;
}

interface InventoryHistoryModalProps {
  book: Book | null;
  onClose: () => void;
}

interface AddCopiesData {
  quantity: number;
  source: string;
  billNo: string;
  remarks: string;
}

interface RemoveCopiesData {
  quantity: number;
  reason: string;
  remarks: string;
}

// Mock data
const mockBooks: Book[] = [
  {
    id: 1,
    bookId: 'BK-2023-001',
    title: 'Advanced Mathematics for Class 12',
    category: 'Mathematics',
    totalCopies: 25,
    availableCopies: 18
  },
  {
    id: 2,
    bookId: 'BK-2023-045',
    title: 'English Literature: Complete Guide',
    category: 'English',
    totalCopies: 30,
    availableCopies: 0
  },
  {
    id: 3,
    bookId: 'BK-2023-078',
    title: 'Physics Fundamentals',
    category: 'Physics',
    totalCopies: 20,
    availableCopies: 2
  },
  {
    id: 4,
    bookId: 'BK-2023-112',
    title: 'Chemistry: The Central Science',
    category: 'Chemistry',
    totalCopies: 22,
    availableCopies: 15
  },
  {
    id: 5,
    bookId: 'BK-2023-156',
    title: 'Indian History and Culture',
    category: 'History',
    totalCopies: 15,
    availableCopies: 8
  }
];

const mockHistory: InventoryHistory[] = [
  {
    id: 1,
    bookId: 'BK-2023-001',
    bookTitle: 'Advanced Mathematics for Class 12',
    date: '2026-01-29',
    action: 'Issued',
    quantity: 1,
    performedBy: 'Librarian - Mrs. Sharma',
    remarks: 'Issued to Student ID: STU001'
  },
  {
    id: 2,
    bookId: 'BK-2023-001',
    bookTitle: 'Advanced Mathematics for Class 12',
    date: '2026-01-28',
    action: 'Returned',
    quantity: 1,
    performedBy: 'Librarian - Mrs. Sharma',
    remarks: 'Returned by Student ID: STU002'
  },
  {
    id: 3,
    bookId: 'BK-2023-001',
    bookTitle: 'Advanced Mathematics for Class 12',
    date: '2026-01-25',
    action: 'Added',
    quantity: 5,
    performedBy: 'Admin - Mr. Kumar',
    remarks: 'New purchase - Bill No: INV-2026-001'
  }
];

// Add Copies Modal
const AddCopiesModal: React.FC<AddCopiesModalProps> = ({ book, onClose, onAdd }) => {
  const [formData, setFormData] = useState<AddCopiesData>({
    quantity: 1,
    source: 'New Purchase',
    billNo: '',
    remarks: ''
  });

  if (!book) return null;

  const handleSubmit = () => {
    if (formData.quantity <= 0) {
      alert('Please enter a valid quantity');
      return;
    }
    if (!formData.billNo) {
      alert('Please enter bill/reference number');
      return;
    }
    onAdd(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-5 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">📦 Add Copies</h2>
            <button onClick={onClose} className="text-white hover:text-gray-200 text-3xl font-bold">
              ×
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Book Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1">Book Title</div>
            <div className="text-lg font-semibold text-gray-900">{book.title}</div>
            <div className="text-sm text-gray-600 mt-2">
              Current Total: <span className="font-bold text-green-600">{book.totalCopies} copies</span>
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Number of Copies to Add <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Source <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option>New Purchase</option>
                <option>Donation</option>
                <option>Replacement</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Bill / Reference No <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.billNo}
              onChange={(e) => setFormData({ ...formData, billNo: e.target.value })}
              placeholder="Enter bill or reference number"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Remarks</label>
            <textarea
              value={formData.remarks}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              rows={3}
              placeholder="Enter any additional remarks..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* New Total Preview */}
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">New Total:</span>
              <span className="text-2xl font-bold text-green-600">
                {book.totalCopies + formData.quantity} copies
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors"
          >
            Update Stock
          </button>
        </div>
      </div>
    </div>
  );
};

// Remove Copies Modal
const RemoveCopiesModal: React.FC<RemoveCopiesModalProps> = ({ book, onClose, onRemove }) => {
  const [formData, setFormData] = useState<RemoveCopiesData>({
    quantity: 1,
    reason: 'Lost',
    remarks: ''
  });

  if (!book) return null;

  const handleSubmit = () => {
    if (formData.quantity <= 0) {
      alert('Please enter a valid quantity');
      return;
    }
    if (formData.quantity > book.availableCopies) {
      alert(`Cannot remove more than ${book.availableCopies} available copies`);
      return;
    }
    onRemove(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-5 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">🗑️ Remove Copies</h2>
            <button onClick={onClose} className="text-white hover:text-gray-200 text-3xl font-bold">
              ×
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Book Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1">Book Title</div>
            <div className="text-lg font-semibold text-gray-900">{book.title}</div>
            <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
              <div>
                <span className="text-gray-600">Current Total:</span>
                <span className="ml-2 font-bold text-gray-900">{book.totalCopies} copies</span>
              </div>
              <div>
                <span className="text-gray-600">Available:</span>
                <span className="ml-2 font-bold text-green-600">{book.availableCopies} copies</span>
              </div>
            </div>
          </div>

          {/* Warning */}
          {book.availableCopies === 0 && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <div className="font-semibold text-red-800">No Available Copies</div>
                <div className="text-sm text-red-600">All copies are currently issued. Cannot remove any copies.</div>
              </div>
            </div>
          )}

          {/* Form */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Number of Copies to Remove <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                max={book.availableCopies}
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                disabled={book.availableCopies === 0}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <div className="text-xs text-gray-500 mt-1">
                Max: {book.availableCopies} available
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Reason <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                disabled={book.availableCopies === 0}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option>Lost</option>
                <option>Damaged</option>
                <option>Old Stock</option>
                <option>Torn Pages</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Remarks</label>
            <textarea
              value={formData.remarks}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              rows={3}
              disabled={book.availableCopies === 0}
              placeholder="Enter reason for removal..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* New Total Preview */}
          {book.availableCopies > 0 && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">New Total:</span>
                <span className="text-2xl font-bold text-red-600">
                  {book.totalCopies - formData.quantity} copies
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={book.availableCopies === 0}
            className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Remove Stock
          </button>
        </div>
      </div>
    </div>
  );
};

// Inventory History Modal
const InventoryHistoryModal: React.FC<InventoryHistoryModalProps> = ({ book, onClose }) => {
  if (!book) return null;

  const bookHistory = mockHistory.filter(h => h.bookId === book.bookId);

  const getActionBadge = (action: string) => {
    const styles = {
      Issued: 'bg-red-100 text-red-800 border-red-200',
      Returned: 'bg-green-100 text-green-800 border-green-200',
      Added: 'bg-blue-100 text-blue-800 border-blue-200',
      Removed: 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return styles[action as keyof typeof styles] || styles.Added;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-5 rounded-t-2xl sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">📜 Inventory History</h2>
              <p className="text-purple-100 mt-1">{book.title}</p>
            </div>
            <button onClick={onClose} className="text-white hover:text-gray-200 text-3xl font-bold">
              ×
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {bookHistory.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-gray-500 text-lg">No history available for this book</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Action</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Quantity</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Performed By</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Remarks</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookHistory.map((history) => (
                    <tr key={history.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(history.date).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getActionBadge(history.action)}`}>
                          {history.action}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {history.action === 'Issued' || history.action === 'Removed' ? '-' : '+'}{history.quantity}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">{history.performedBy}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{history.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const LibraryInventoryManagement: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(mockBooks);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [stockFilter, setStockFilter] = useState('All');

  // Calculate summary stats
  const totalBookTitles = books.length;
  const totalCopies = books.reduce((sum, book) => sum + book.totalCopies, 0);
  const totalAvailable = books.reduce((sum, book) => sum + book.availableCopies, 0);
  const outOfStock = books.filter(book => book.availableCopies === 0).length;

  // Get stock status
  const getStockStatus = (book: Book) => {
    if (book.availableCopies === 0) return 'Out of Stock';
    if (book.availableCopies <= 2) return 'Low Stock';
    return 'In Stock';
  };

  // Get stock badge
  const getStockBadge = (status: string) => {
    const styles = {
      'In Stock': 'bg-green-100 text-green-800 border-green-200',
      'Low Stock': 'bg-orange-100 text-orange-800 border-orange-200',
      'Out of Stock': 'bg-red-100 text-red-800 border-red-200'
    };
    return styles[status as keyof typeof styles];
  };

  // Handle search and filter
  const handleSearch = () => {
    let results = books;

    if (searchTerm) {
      results = results.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.bookId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (stockFilter !== 'All') {
      results = results.filter(book => getStockStatus(book) === stockFilter);
    }

    setFilteredBooks(results);
  };

  // Handle add copies
  const handleAddCopies = (data: AddCopiesData) => {
    if (!selectedBook) return;

    const updatedBooks = books.map(book =>
      book.id === selectedBook.id
        ? {
            ...book,
            totalCopies: book.totalCopies + data.quantity,
            availableCopies: book.availableCopies + data.quantity
          }
        : book
    );

    setBooks(updatedBooks);
    setFilteredBooks(updatedBooks);
    alert(`Successfully added ${data.quantity} copies!`);
    setShowAddModal(false);
    setSelectedBook(null);
  };

  // Handle remove copies
  const handleRemoveCopies = (data: RemoveCopiesData) => {
    if (!selectedBook) return;

    const updatedBooks = books.map(book =>
      book.id === selectedBook.id
        ? {
            ...book,
            totalCopies: book.totalCopies - data.quantity,
            availableCopies: book.availableCopies - data.quantity
          }
        : book
    );

    setBooks(updatedBooks);
    setFilteredBooks(updatedBooks);
    alert(`Successfully removed ${data.quantity} copies!`);
    setShowRemoveModal(false);
    setSelectedBook(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-2 border-indigo-100">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Library Inventory Management
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Track and manage book stock in real-time</p>
            </div>
            <div className="flex gap-3">
              <button className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2">
                <span>📊</span> Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Total Book Titles</p>
                <p className="text-4xl font-bold">{totalBookTitles}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full p-4">
                <span className="text-3xl">📚</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium mb-1">Total Copies</p>
                <p className="text-4xl font-bold">{totalCopies}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full p-4">
                <span className="text-3xl">📖</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium mb-1">Available Copies</p>
                <p className="text-4xl font-bold">{totalAvailable}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full p-4">
                <span className="text-3xl">✅</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm font-medium mb-1">Out of Stock Books</p>
                <p className="text-4xl font-bold">{outOfStock}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full p-4">
                <span className="text-3xl">⚠️</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔍 Search by Title or Book ID
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter book title or ID..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📊 Filter by Stock Status
              </label>
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option>All</option>
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSearch}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold transition-colors"
            >
              Search
            </button>
            <button
              onClick={() => {
                setSearchTerm('');
                setStockFilter('All');
                setFilteredBooks(books);
              }}
              className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Book ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Book Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Total Copies
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Available
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Issued
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Stock Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBooks.map((book) => {
                  const issuedCopies = book.totalCopies - book.availableCopies;
                  const status = getStockStatus(book);

                  return (
                    <tr key={book.id} className="hover:bg-indigo-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {book.bookId}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {book.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium text-xs">
                          {book.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        {book.totalCopies}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                        {book.availableCopies}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-red-600">
                        {issuedCopies}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1.5 text-xs font-bold rounded-full border-2 ${getStockBadge(status)}`}>
                          {status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedBook(book);
                              setShowAddModal(true);
                            }}
                            className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors text-xs"
                            title="Add Copies"
                          >
                            ➕
                          </button>
                          <button
                            onClick={() => {
                              setSelectedBook(book);
                              setShowRemoveModal(true);
                            }}
                            className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors text-xs"
                            title="Remove Copies"
                          >
                            ➖
                          </button>
                          <button
                            onClick={() => {
                              setSelectedBook(book);
                              setShowHistoryModal(true);
                            }}
                            className="px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-colors text-xs"
                            title="View History"
                          >
                            📜
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t-2 border-gray-200">
            <div className="text-sm text-gray-700">
              Showing <span className="font-bold">1</span> to <span className="font-bold">{filteredBooks.length}</span> of{' '}
              <span className="font-bold">{filteredBooks.length}</span> books
            </div>
            <div className="flex gap-2">
              <button className="px-5 py-2.5 border-2 border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">
                1
              </button>
              <button className="px-5 py-2.5 border-2 border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50" disabled>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddCopiesModal
          book={selectedBook}
          onClose={() => {
            setShowAddModal(false);
            setSelectedBook(null);
          }}
          onAdd={handleAddCopies}
        />
      )}

      {showRemoveModal && (
        <RemoveCopiesModal
          book={selectedBook}
          onClose={() => {
            setShowRemoveModal(false);
            setSelectedBook(null);
          }}
          onRemove={handleRemoveCopies}
        />
      )}

      {showHistoryModal && (
        <InventoryHistoryModal
          book={selectedBook}
          onClose={() => {
            setShowHistoryModal(false);
            setSelectedBook(null);
          }}
        />
      )}
    </div>
  );
};

export default LibraryInventoryManagement;