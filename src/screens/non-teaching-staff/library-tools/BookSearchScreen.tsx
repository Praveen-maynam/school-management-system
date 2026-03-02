import React, { useState } from 'react';

// Types
interface Book {
  id: number;
  bookId: string;
  title: string;
  author: string;
  subject: string;
  isbn: string;
  rackNumber: string;
  shelfNumber: string;
  status: 'Available' | 'Issued' | 'Reserved';
  issuedTo?: string;
  publisher?: string;
  edition?: string;
  year?: number;
  totalCopies?: number;
  availableCopies?: number;
  condition?: string;
}

interface BookDetailsModalProps {
  book: Book | null;
  onClose: () => void;
}

interface SearchFilters {
  title: string;
  author: string;
  bookId: string;
  subject: string;
  status: string;
}

// Mock data
const mockBooks: Book[] = [
  {
    id: 1,
    bookId: 'BK-2023-001',
    title: 'Advanced Mathematics for Class 12',
    author: 'Dr. R.K. Sharma',
    subject: 'Mathematics',
    isbn: '978-81-7450-123-4',
    rackNumber: 'R-01',
    shelfNumber: 'S-03',
    status: 'Available',
    publisher: 'Pearson Education',
    edition: '5th Edition',
    year: 2023,
    totalCopies: 25,
    availableCopies: 18,
    condition: 'Good'
  },
  {
    id: 2,
    bookId: 'BK-2023-045',
    title: 'English Literature: Complete Guide',
    author: 'Jane Williams',
    subject: 'English',
    isbn: '978-93-8654-789-1',
    rackNumber: 'R-03',
    shelfNumber: 'S-02',
    status: 'Issued',
    issuedTo: 'Priya Sharma (STU002)',
    publisher: 'Oxford University Press',
    edition: '3rd Edition',
    year: 2022,
    totalCopies: 30,
    availableCopies: 0,
    condition: 'Excellent'
  },
  {
    id: 3,
    bookId: 'BK-2023-078',
    title: 'Physics Fundamentals',
    author: 'Prof. S.N. Gupta',
    subject: 'Physics',
    isbn: '978-81-2345-678-9',
    rackNumber: 'R-02',
    shelfNumber: 'S-01',
    status: 'Reserved',
    issuedTo: 'Amit Patel (STU003)',
    publisher: 'S. Chand Publishing',
    edition: '2nd Edition',
    year: 2023,
    totalCopies: 20,
    availableCopies: 15,
    condition: 'Good'
  },
  {
    id: 4,
    bookId: 'BK-2023-112',
    title: 'Chemistry: The Central Science',
    author: 'Dr. M.K. Jain',
    subject: 'Chemistry',
    isbn: '978-93-1234-567-8',
    rackNumber: 'R-02',
    shelfNumber: 'S-04',
    status: 'Available',
    publisher: 'McGraw Hill',
    edition: '4th Edition',
    year: 2023,
    totalCopies: 22,
    availableCopies: 20,
    condition: 'Excellent'
  },
  {
    id: 5,
    bookId: 'BK-2023-156',
    title: 'Indian History and Culture',
    author: 'Dr. Ashok Kumar',
    subject: 'History',
    isbn: '978-81-9876-543-2',
    rackNumber: 'R-04',
    shelfNumber: 'S-05',
    status: 'Available',
    publisher: 'Arihant Publications',
    edition: '1st Edition',
    year: 2022,
    totalCopies: 15,
    availableCopies: 12,
    condition: 'Good'
  },
  {
    id: 6,
    bookId: 'BK-2023-189',
    title: 'Computer Science Fundamentals',
    author: 'Prof. Rajesh Verma',
    subject: 'Computer Science',
    isbn: '978-93-5678-123-4',
    rackNumber: 'R-05',
    shelfNumber: 'S-02',
    status: 'Issued',
    issuedTo: 'Rahul Singh (STU005)',
    publisher: 'Tata McGraw Hill',
    edition: '6th Edition',
    year: 2023,
    totalCopies: 28,
    availableCopies: 0,
    condition: 'Excellent'
  }
];

// Book Details Modal Component
const BookDetailsModal: React.FC<BookDetailsModalProps> = ({ book, onClose }) => {
  if (!book) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'text-green-600 bg-green-50';
      case 'Issued':
        return 'text-red-600 bg-red-50';
      case 'Reserved':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
              <p className="text-blue-100">Book ID: {book.bookId}</p>
            </div>
            <button 
              onClick={onClose} 
              className="text-white hover:text-gray-200 text-3xl font-bold leading-none"
            >
              ×
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-8">
          {/* Status Badge */}
          <div className="mb-6">
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(book.status)}`}>
              <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
              {book.status}
              {book.issuedTo && ` - ${book.issuedTo}`}
            </span>
          </div>

          {/* Book Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-500 block mb-1">Author</label>
                <p className="text-gray-900 font-semibold text-lg">{book.author}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-500 block mb-1">Publisher</label>
                <p className="text-gray-900 font-medium">{book.publisher}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-500 block mb-1">Edition</label>
                <p className="text-gray-900 font-medium">{book.edition}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-500 block mb-1">Year</label>
                <p className="text-gray-900 font-medium">{book.year}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-500 block mb-1">ISBN</label>
                <p className="text-gray-900 font-medium font-mono text-sm">{book.isbn}</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <label className="text-sm font-medium text-blue-700 block mb-1">Subject / Category</label>
                <p className="text-blue-900 font-semibold text-lg">{book.subject}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
                <label className="text-sm font-medium text-purple-700 block mb-2">Location</label>
                <div className="flex gap-4">
                  <div>
                    <p className="text-xs text-purple-600 mb-1">Rack Number</p>
                    <p className="text-purple-900 font-bold text-xl">{book.rackNumber}</p>
                  </div>
                  <div className="border-l-2 border-purple-300"></div>
                  <div>
                    <p className="text-xs text-purple-600 mb-1">Shelf Number</p>
                    <p className="text-purple-900 font-bold text-xl">{book.shelfNumber}</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <label className="text-sm font-medium text-green-700 block mb-2">Copies</label>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-green-600">Total Copies</p>
                    <p className="text-green-900 font-bold text-2xl">{book.totalCopies}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-green-600">Available</p>
                    <p className="text-green-900 font-bold text-2xl">{book.availableCopies}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-500 block mb-1">Book Condition</label>
                <p className="text-gray-900 font-medium">{book.condition}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-8 py-5 rounded-b-2xl flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition-colors"
          >
            Close
          </button>
          {book.status === 'Available' && (
            <button
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              Issue Book
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Component
const LibraryBookSearch: React.FC = () => {
  const [books] = useState<Book[]>(mockBooks);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(mockBooks);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Book; direction: 'asc' | 'desc' } | null>(null);
  
  const [filters, setFilters] = useState<SearchFilters>({
    title: '',
    author: '',
    bookId: '',
    subject: 'All',
    status: 'All'
  });

  const subjects = ['All', 'Mathematics', 'English', 'Physics', 'Chemistry', 'History', 'Computer Science', 'Biology'];

  // Handle search
  const handleSearch = () => {
    let results = books;

    if (filters.title) {
      results = results.filter(book => 
        book.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    if (filters.author) {
      results = results.filter(book => 
        book.author.toLowerCase().includes(filters.author.toLowerCase())
      );
    }

    if (filters.bookId) {
      results = results.filter(book => 
        book.bookId.toLowerCase().includes(filters.bookId.toLowerCase())
      );
    }

    if (filters.subject !== 'All') {
      results = results.filter(book => book.subject === filters.subject);
    }

    if (filters.status !== 'All') {
      results = results.filter(book => book.status === filters.status);
    }

    setFilteredBooks(results);
  };

  // Handle reset
  const handleReset = () => {
    setFilters({
      title: '',
      author: '',
      bookId: '',
      subject: 'All',
      status: 'All'
    });
    setFilteredBooks(books);
  };

  // Handle sort
  const handleSort = (key: keyof Book) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredBooks].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      if (typeof aValue === "number" && typeof bValue === "number") {
        return direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      return direction === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });

    setFilteredBooks(sorted);
  };

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    const styles = {
      Available: 'bg-green-100 text-green-800 border-green-200',
      Issued: 'bg-red-100 text-red-800 border-red-200',
      Reserved: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return styles[status as keyof typeof styles] || styles.Available;
  };

  // Handle view details
  const handleViewDetails = (book: Book) => {
    setSelectedBook(book);
    setShowDetailsModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b-2 border-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Library Book Search
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Search and discover books in our library catalog</p>
            </div>
            <div className="flex gap-3">
              <button className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2">
                <span>📥</span> Export Results
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search & Filter Panel */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-800">Search Filters</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Search by Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📚 Search by Book Title
              </label>
              <input
                type="text"
                value={filters.title}
                onChange={(e) => setFilters({ ...filters, title: e.target.value })}
                placeholder="Enter book title..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Search by Author */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ✍️ Search by Author
              </label>
              <input
                type="text"
                value={filters.author}
                onChange={(e) => setFilters({ ...filters, author: e.target.value })}
                placeholder="Enter author name..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Book ID */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔖 Book ID / Accession No
              </label>
              <input
                type="text"
                value={filters.bookId}
                onChange={(e) => setFilters({ ...filters, bookId: e.target.value })}
                placeholder="Enter book ID..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📖 Subject / Category
              </label>
              <select
                value={filters.subject}
                onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
              >
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ✅ Availability Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
              >
                <option>All</option>
                <option>Available</option>
                <option>Issued</option>
                <option>Reserved</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex items-end gap-3">
              <button
                onClick={handleSearch}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 font-semibold transition-all shadow-md hover:shadow-lg"
              >
                🔍 Search
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 font-semibold transition-colors"
              >
                🔄
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
            <p className="text-sm text-gray-600">
              Found <span className="font-bold text-blue-600">{filteredBooks.length}</span> book(s)
            </p>
          </div>
        </div>

        {/* Book Results Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {filteredBooks.length === 0 ? (
            // Empty State
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-8xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Books Found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search filters</p>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div className="w-full overflow-x-hidden">
                <table className="w-full table-fixed text-[11px] divide-y divide-gray-200">
                  <colgroup>
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '18%' }} />
                    <col style={{ width: '13%' }} />
                    <col style={{ width: '11%' }} />
                    <col style={{ width: '13%' }} />
                    <col style={{ width: '8%' }} />
                    <col style={{ width: '8%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '9%' }} />
                  </colgroup>
                  <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 sticky top-0 z-10">
                    <tr>
                      <th 
                        onClick={() => handleSort('bookId')}
                        className="px-2 py-2 text-left text-[10px] font-bold text-white uppercase tracking-wide cursor-pointer hover:bg-blue-700 transition-colors whitespace-nowrap truncate"
                      >
                        Book ID {sortConfig?.key === 'bookId' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th 
                        onClick={() => handleSort('title')}
                        className="px-2 py-2 text-left text-[10px] font-bold text-white uppercase tracking-wide cursor-pointer hover:bg-blue-700 transition-colors whitespace-nowrap truncate"
                      >
                        Book Title {sortConfig?.key === 'title' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th 
                        onClick={() => handleSort('author')}
                        className="px-2 py-2 text-left text-[10px] font-bold text-white uppercase tracking-wide cursor-pointer hover:bg-blue-700 transition-colors whitespace-nowrap truncate"
                      >
                        Author {sortConfig?.key === 'author' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th className="px-2 py-2 text-left text-[10px] font-bold text-white uppercase tracking-wide whitespace-nowrap truncate">
                        Subject
                      </th>
                      <th className="px-2 py-2 text-left text-[10px] font-bold text-white uppercase tracking-wide whitespace-nowrap truncate">
                        ISBN
                      </th>
                      <th className="px-2 py-2 text-left text-[10px] font-bold text-white uppercase tracking-wide whitespace-nowrap truncate">
                        Rack
                      </th>
                      <th className="px-2 py-2 text-left text-[10px] font-bold text-white uppercase tracking-wide whitespace-nowrap truncate">
                        Shelf
                      </th>
                      <th 
                        onClick={() => handleSort('status')}
                        className="px-2 py-2 text-left text-[10px] font-bold text-white uppercase tracking-wide cursor-pointer hover:bg-blue-700 transition-colors whitespace-nowrap truncate"
                      >
                        Status {sortConfig?.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th className="px-2 py-2 text-left text-[10px] font-bold text-white uppercase tracking-wide whitespace-nowrap truncate">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredBooks.map((book) => (
                      <tr 
                        key={book.id} 
                        className="hover:bg-blue-50 transition-colors duration-150"
                      >
                        <td className="px-2 py-1.5 text-[10px] font-semibold text-gray-900 whitespace-nowrap truncate" title={book.bookId}>
                          {book.bookId}
                        </td>
                        <td className="px-2 py-1.5 text-[10px] text-gray-900 font-medium whitespace-nowrap truncate" title={book.title}>
                          {book.title}
                        </td>
                        <td className="px-2 py-1.5 text-[10px] text-gray-700 whitespace-nowrap truncate" title={book.author}>
                          {book.author}
                        </td>
                        <td className="px-2 py-1.5 text-[10px] whitespace-nowrap truncate" title={book.subject}>
                          <span className="inline-block max-w-full px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded-full font-medium text-[10px] whitespace-nowrap truncate align-middle">
                            {book.subject}
                          </span>
                        </td>
                        <td className="px-2 py-1.5 text-[10px] font-mono text-gray-600 whitespace-nowrap truncate" title={book.isbn}>
                          {book.isbn}
                        </td>
                        <td className="px-2 py-1.5 text-[10px] whitespace-nowrap truncate" title={book.rackNumber}>
                          <span className="inline-block max-w-full px-1.5 py-0.5 bg-purple-100 text-purple-800 rounded font-bold text-[10px] whitespace-nowrap truncate align-middle">
                            {book.rackNumber}
                          </span>
                        </td>
                        <td className="px-2 py-1.5 text-[10px] whitespace-nowrap truncate" title={book.shelfNumber}>
                          <span className="inline-block max-w-full px-1.5 py-0.5 bg-purple-100 text-purple-800 rounded font-bold text-[10px] whitespace-nowrap truncate align-middle">
                            {book.shelfNumber}
                          </span>
                        </td>
                        <td className="px-2 py-1.5 text-[10px] whitespace-nowrap truncate">
                          <div className="group relative inline-block">
                            <span className={`px-1.5 py-0.5 inline-flex text-[10px] leading-4 font-bold rounded-full border ${getStatusBadge(book.status)}`}>
                              {book.status}
                            </span>
                            {book.issuedTo && (
                              <div className="hidden group-hover:block absolute z-10 w-44 p-2 mt-2 text-[10px] text-white bg-gray-900 rounded-lg shadow-lg">
                                Issued to: {book.issuedTo}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-2 py-1.5 text-[10px] whitespace-nowrap">
                          <div className="flex items-center gap-1 whitespace-nowrap">
                            <button
                              onClick={() => handleViewDetails(book)}
                              className="px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-colors text-[10px] leading-none"
                            >
                              👁️
                            </button>
                            {book.status === 'Available' && (
                              <button className="px-2 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium transition-colors text-[10px] leading-none">
                                📤 
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="bg-gray-50 px-3 py-2.5 flex items-center justify-between border-t border-gray-200">
                <div className="text-xs text-gray-700">
                  Showing <span className="font-bold">1</span> to <span className="font-bold">{filteredBooks.length}</span> of{' '}
                  <span className="font-bold">{filteredBooks.length}</span> results
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 border border-gray-300 rounded-md text-xs font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50 transition-colors" disabled>
                    Previous
                  </button>
                  <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-xs font-semibold hover:bg-blue-700 transition-colors">
                    1
                  </button>
                  <button className="px-3 py-1.5 border border-gray-300 rounded-md text-xs font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50 transition-colors" disabled>
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Book Details Modal */}
      {showDetailsModal && (
        <BookDetailsModal
          book={selectedBook}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedBook(null);
          }}
        />
      )}
    </div>
  );
};

export default LibraryBookSearch;