import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Search, Filter, Download, Plus, BookOpen } from 'lucide-react';

const LibraryFinance = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  // Pagination state for books table
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Static data for 10 books with various categories
  const books = [
    { 
      id: 'BK001', 
      title: 'Advanced Mathematics for Class 12', 
      author: 'R.D. Sharma', 
      category: 'Textbook',
      quantity: 50,
      unitCost: '$25',
      totalCost: '$1,250',
      purchaseDate: 'Jan 10, 2024',
      condition: 'New',
      status: 'Available'
    },
    { 
      id: 'BK002', 
      title: 'Harry Potter and the Philosopher\'s Stone', 
      author: 'J.K. Rowling', 
      category: 'Fiction',
      quantity: 30,
      unitCost: '$15',
      totalCost: '$450',
      purchaseDate: 'Dec 15, 2023',
      condition: 'Good',
      status: 'Available'
    },
    { 
      id: 'BK003', 
      title: 'Physics: Principles and Practice', 
      author: 'H.C. Verma', 
      category: 'Textbook',
      quantity: 45,
      unitCost: '$30',
      totalCost: '$1,350',
      purchaseDate: 'Jan 05, 2024',
      condition: 'New',
      status: 'Available'
    },
    { 
      id: 'BK004', 
      title: 'The Complete Works of Shakespeare', 
      author: 'William Shakespeare', 
      category: 'Literature',
      quantity: 20,
      unitCost: '$35',
      totalCost: '$700',
      purchaseDate: 'Nov 20, 2023',
      condition: 'Good',
      status: 'Available'
    },
    { 
      id: 'BK005', 
      title: 'Indian History: Ancient to Modern', 
      author: 'Bipan Chandra', 
      category: 'History',
      quantity: 40,
      unitCost: '$22',
      totalCost: '$880',
      purchaseDate: 'Jan 12, 2024',
      condition: 'New',
      status: 'Available'
    },
    { 
      id: 'BK006', 
      title: 'Oxford English Dictionary', 
      author: 'Oxford University Press', 
      category: 'Reference',
      quantity: 15,
      unitCost: '$50',
      totalCost: '$750',
      purchaseDate: 'Oct 10, 2023',
      condition: 'Excellent',
      status: 'Available'
    },
    { 
      id: 'BK007', 
      title: 'Wings of Fire', 
      author: 'A.P.J. Abdul Kalam', 
      category: 'Biography',
      quantity: 35,
      unitCost: '$18',
      totalCost: '$630',
      purchaseDate: 'Dec 01, 2023',
      condition: 'Good',
      status: 'Available'
    },
    { 
      id: 'BK008', 
      title: 'Organic Chemistry', 
      author: 'Morrison & Boyd', 
      category: 'Textbook',
      quantity: 38,
      unitCost: '$32',
      totalCost: '$1,216',
      purchaseDate: 'Jan 08, 2024',
      condition: 'New',
      status: 'Available'
    },
    { 
      id: 'BK009', 
      title: 'The Diary of a Young Girl', 
      author: 'Anne Frank', 
      category: 'Biography',
      quantity: 25,
      unitCost: '$12',
      totalCost: '$300',
      purchaseDate: 'Nov 15, 2023',
      condition: 'Good',
      status: 'Available'
    },
    { 
      id: 'BK010', 
      title: 'Computer Science with Python', 
      author: 'Sumita Arora', 
      category: 'Textbook',
      quantity: 42,
      unitCost: '$28',
      totalCost: '$1,176',
      purchaseDate: 'Jan 15, 2024',
      condition: 'New',
      status: 'Available'
    }
  ];

  // Calculate totals
  const totalBooks = books.reduce((sum, book) => sum + book.quantity, 0);
  const totalInvestment = books.reduce((sum, book) => sum + parseFloat(book.totalCost.replace(/[$,]/g, '')), 0);
  const totalCategories = Array.from(new Set(books.map(book => book.category))).length;

  // Filter books based on search
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Textbook': return 'bg-blue-100 text-blue-800';
      case 'Fiction': return 'bg-purple-100 text-purple-800';
      case 'Literature': return 'bg-pink-100 text-pink-800';
      case 'History': return 'bg-orange-100 text-orange-800';
      case 'Reference': return 'bg-green-100 text-green-800';
      case 'Biography': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionColor = (condition: string) => {
    switch(condition) {
      case 'New': return 'bg-green-100 text-green-800';
      case 'Excellent': return 'bg-blue-100 text-blue-800';
      case 'Good': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <span>Finance</span>
          <ChevronRight className="w-4 h-4" />
          <span>Non-Teaching Staff</span>
          <ChevronRight className="w-4 h-4" />
          <span>Library</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Books Inventory</span>
        </div>
        {/* Back Button */}
        <button
          className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 mb-4"
          onClick={() => navigate('/admin/finance')}
          aria-label="Back to Finance Dashboard"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Back
        </button>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-100 rounded-lg">
            <BookOpen className="w-8 h-8 text-orange-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Library Finance - Books Inventory</h1>
            <p className="text-gray-600">Track book purchases, costs, and library investments</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Total Books</div>
            <div className="text-2xl">📚</div>
          </div>
          <div className="text-3xl font-bold text-gray-900">{totalBooks}</div>
          <div className="text-xs text-gray-500 mt-1">Across all categories</div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Total Investment</div>
            <div className="text-2xl">💰</div>
          </div>
          <div className="text-3xl font-bold text-orange-600">${totalInvestment.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">Current fiscal year</div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Book Categories</div>
            <div className="text-2xl">📖</div>
          </div>
          <div className="text-3xl font-bold text-blue-600">{totalCategories}</div>
          <div className="text-xs text-gray-500 mt-1">Different types</div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Library Staff</div>
            <div className="text-2xl">👥</div>
          </div>
          <div className="text-3xl font-bold text-purple-600">12</div>
          <div className="text-xs text-gray-500 mt-1">Librarians & assistants</div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Books by Category</h2>
        <div className="grid grid-cols-6 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">📘</div>
            <div className="text-sm font-medium text-gray-700">Textbooks</div>
            <div className="text-2xl font-bold text-blue-600">175</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">📕</div>
            <div className="text-sm font-medium text-gray-700">Fiction</div>
            <div className="text-2xl font-bold text-purple-600">30</div>
          </div>
          <div className="bg-pink-50 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">📗</div>
            <div className="text-sm font-medium text-gray-700">Literature</div>
            <div className="text-2xl font-bold text-pink-600">20</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">📙</div>
            <div className="text-sm font-medium text-gray-700">History</div>
            <div className="text-2xl font-bold text-orange-600">40</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">📓</div>
            <div className="text-sm font-medium text-gray-700">Reference</div>
            <div className="text-2xl font-bold text-green-600">15</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">📔</div>
            <div className="text-sm font-medium text-gray-700">Biography</div>
            <div className="text-2xl font-bold text-yellow-600">60</div>
          </div>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="bg-white rounded-lg border border-gray-200 mb-6">
        <div className="p-6 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, author, category, or ID..."
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
              <Plus className="w-4 h-4" />
              Add Book
            </button>
          </div>
        </div>

        {/* Books Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Book ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Unit Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Total Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Purchase Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Condition</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedBooks.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-4">No books found.</td>
                </tr>
              ) : (
                paginatedBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{book.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                      <div className="font-medium">{book.title}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{book.author}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(book.category)}`}>
                        {book.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{book.quantity}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{book.unitCost}</td>
                    <td className="px-6 py-4 text-sm font-bold text-orange-600">{book.totalCost}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{book.purchaseDate}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getConditionColor(book.condition)}`}>
                        {book.condition}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        {book.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot className="bg-gray-50 border-t-2 border-gray-300">
              <tr>
                <td colSpan={4} className="px-6 py-4 text-sm font-bold text-gray-900">TOTAL</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">{totalBooks}</td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4 text-sm font-bold text-orange-600">${totalInvestment.toLocaleString()}</td>
                <td colSpan={3}></td>
              </tr>
            </tfoot>
          </table>
        </div>
        {/* Pagination Controls */}
        {filteredBooks.length > itemsPerPage && (
          <div className="flex justify-end items-center mt-4 gap-2">
            <button
              className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="mx-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span>💡</span> Library Budget Allocation
          </h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Textbooks (54%)</span>
              <span className="font-semibold">${(totalInvestment * 0.54).toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span>Reference Materials (15%)</span>
              <span className="font-semibold">${(totalInvestment * 0.15).toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span>Fiction & Literature (18%)</span>
              <span className="font-semibold">${(totalInvestment * 0.18).toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span>Other Categories (13%)</span>
              <span className="font-semibold">${(totalInvestment * 0.13).toFixed(0)}</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span>📊</span> Library Statistics
          </h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Average cost per book</span>
              <span className="font-semibold">${(totalInvestment / totalBooks).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Most expensive book</span>
              <span className="font-semibold">$50.00</span>
            </div>
            <div className="flex justify-between">
              <span>Books purchased this month</span>
              <span className="font-semibold">175</span>
            </div>
            <div className="flex justify-between">
              <span>Library staff salaries</span>
              <span className="font-semibold">$28,500/month</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryFinance;