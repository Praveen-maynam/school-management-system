import React, { useState } from 'react';
import { Search, X, Plus, ArrowLeft, Calendar, AlertCircle, CheckCircle, Clock, XCircle, Filter, Download, Eye, Trash2, RotateCcw } from 'lucide-react';

// Types
interface Book {
  id: string;
  title: string;
  accessionNo: string;
  availableCopies: number;
  totalCopies: number;
}

interface User {
  id: string;
  name: string;
  type: 'Student' | 'Teacher';
  class?: string;
  section?: string;
}

interface Transaction {
  id: string;
  bookTitle: string;
  accessionNo: string;
  userName: string;
  userType: 'Student' | 'Teacher';
  class?: string;
  section?: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'Issued' | 'Returned' | 'Overdue' | 'Lost';
  fineAmount: number;
  lateDays?: number;
  remarks?: string;
  librarianName?: string;
}

const LibraryIssueReturn: React.FC = () => {
  // State management
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showViewDrawer, setShowViewDrawer] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  
  // Issue form state
  const [issueForm, setIssueForm] = useState({
    studentSearch: '',
    bookSearch: '',
    issueType: 'Student',
    remarks: '',
    selectedStudent: null as User | null,
    selectedBook: null as Book | null,
  });

  // Mock data for summary cards
  const summaryData = {
    issuedToday: 12,
    returnedToday: 8,
    currentlyIssued: 145,
    overdue: 23
  };

  // Mock transactions data
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'TXN001',
      bookTitle: 'Mathematics for Class X',
      accessionNo: 'ACC-2024-101',
      userName: 'John Doe',
      userType: 'Student',
      class: '10',
      section: 'A',
      issueDate: '2026-01-20',
      dueDate: '2026-02-04',
      status: 'Issued',
      fineAmount: 0,
      librarianName: 'Mrs. Anderson',
      remarks: 'First issue'
    },
    {
      id: 'TXN002',
      bookTitle: 'English Grammar & Composition',
      accessionNo: 'ACC-2024-045',
      userName: 'Jane Smith',
      userType: 'Student',
      class: '9',
      section: 'B',
      issueDate: '2026-01-05',
      dueDate: '2026-01-20',
      returnDate: '2026-01-18',
      status: 'Returned',
      fineAmount: 0,
      librarianName: 'Mrs. Anderson'
    },
    {
      id: 'TXN003',
      bookTitle: 'Physics Practical Manual',
      accessionNo: 'ACC-2024-178',
      userName: 'Robert Johnson',
      userType: 'Student',
      class: '11',
      section: 'C',
      issueDate: '2026-01-08',
      dueDate: '2026-01-23',
      status: 'Overdue',
      fineAmount: 30,
      lateDays: 6,
      librarianName: 'Mrs. Anderson'
    },
    {
      id: 'TXN004',
      bookTitle: 'Advanced Chemistry Vol. II',
      accessionNo: 'ACC-2024-234',
      userName: 'Dr. Michael Brown',
      userType: 'Teacher',
      issueDate: '2026-01-15',
      dueDate: '2026-02-15',
      status: 'Issued',
      fineAmount: 0,
      librarianName: 'Mrs. Anderson'
    },
    {
      id: 'TXN005',
      bookTitle: 'World History: Modern Era',
      accessionNo: 'ACC-2024-089',
      userName: 'Emily Davis',
      userType: 'Student',
      class: '12',
      section: 'A',
      issueDate: '2025-12-28',
      dueDate: '2026-01-12',
      status: 'Overdue',
      fineAmount: 85,
      lateDays: 17,
      librarianName: 'Mrs. Anderson'
    }
  ]);

  // Mock books for search
  const mockBooks: Book[] = [
    { id: 'B001', title: 'Mathematics for Class X', accessionNo: 'ACC-2024-101', availableCopies: 3, totalCopies: 5 },
    { id: 'B002', title: 'English Grammar & Composition', accessionNo: 'ACC-2024-045', availableCopies: 0, totalCopies: 4 },
    { id: 'B003', title: 'Physics Practical Manual', accessionNo: 'ACC-2024-178', availableCopies: 2, totalCopies: 3 },
  ];

  // Mock students for search
  const mockStudents: User[] = [
    { id: 'S001', name: 'Alice Williams', type: 'Student', class: '10', section: 'B' },
    { id: 'S002', name: 'Bob Martinez', type: 'Student', class: '9', section: 'A' },
    { id: 'T001', name: 'Prof. Sarah Connor', type: 'Teacher' },
  ];

  // Status badge component
  const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const styles = {
      Issued: 'bg-blue-50 text-blue-700 border-blue-200',
      Returned: 'bg-green-50 text-green-700 border-green-200',
      Overdue: 'bg-red-50 text-red-700 border-red-200',
      Lost: 'bg-gray-50 text-gray-700 border-gray-200'
    };

    const icons = {
      Issued: Clock,
      Returned: CheckCircle,
      Overdue: AlertCircle,
      Lost: XCircle
    };

    const Icon = icons[status as keyof typeof icons];

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
        <Icon size={12} />
        {status}
      </span>
    );
  };

  // Handle issue book
  const handleIssueBook = () => {
    if (!issueForm.selectedBook || !issueForm.selectedStudent) {
      alert('Please select both book and user');
      return;
    }

    if (issueForm.selectedBook.availableCopies === 0) {
      alert('Book is out of stock');
      return;
    }

    const newTransaction: Transaction = {
      id: `TXN${String(transactions.length + 1).padStart(3, '0')}`,
      bookTitle: issueForm.selectedBook.title,
      accessionNo: issueForm.selectedBook.accessionNo,
      userName: issueForm.selectedStudent.name,
      userType: issueForm.selectedStudent.type,
      class: issueForm.selectedStudent.class,
      section: issueForm.selectedStudent.section,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Issued',
      fineAmount: 0,
      remarks: issueForm.remarks,
      librarianName: 'Mrs. Anderson'
    };

    setTransactions([newTransaction, ...transactions]);
    setShowIssueModal(false);
    setIssueForm({
      studentSearch: '',
      bookSearch: '',
      issueType: 'Student',
      remarks: '',
      selectedStudent: null,
      selectedBook: null,
    });
  };

  // Handle return book
  const handleReturnBook = (transaction: Transaction) => {
    const updatedTransactions = transactions.map(t => {
      if (t.id === transaction.id) {
        return {
          ...t,
          status: 'Returned' as const,
          returnDate: new Date().toISOString().split('T')[0]
        };
      }
      return t;
    });
    setTransactions(updatedTransactions);
    setShowReturnModal(false);
    setSelectedTransaction(null);
  };

  // Calculate late days and fine
  const calculateLateDays = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diff = Math.floor((today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const calculateFine = (lateDays: number, finePerDay: number = 5) => {
    return lateDays * finePerDay;
  };

  // Filter transactions
  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.accessionNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Custom Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Work+Sans:wght@300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Work Sans', sans-serif;
        }
        
        .heading-font {
          font-family: 'Playfair Display', serif;
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-slide-up {
          animation: slideInUp 0.5s ease-out;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out;
        }
        
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .glass-morphism {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
        
        .table-row-hover {
          transition: all 0.2s ease;
        }
        
        .table-row-hover:hover {
          background: rgba(59, 130, 246, 0.05);
          transform: scale(1.002);
        }
        
        .overdue-row {
          background: linear-gradient(90deg, rgba(254, 202, 202, 0.3) 0%, transparent 100%);
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          transition: all 0.3s ease;
        }
        
        .btn-primary:hover {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
        }
        
        .search-input:focus {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .modal-overlay {
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
        }
      `}</style>

      {/* Header */}
      <header className="glass-morphism shadow-sm sticky top-0 z-40 animate-slide-up">
        <div className="max-w-[1600px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold heading-font text-slate-900">Library Management</h1>
              <p className="text-slate-600 mt-1 text-sm">Issue, Return & Track Books</p>
            </div>
            <button
              onClick={() => setShowIssueModal(true)}
              className="btn-primary text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg"
            >
              <Plus size={20} />
              Issue New Book
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Issued Today', value: summaryData.issuedToday, color: 'blue', icon: Plus, delay: '0s' },
            { label: 'Returned Today', value: summaryData.returnedToday, color: 'green', icon: CheckCircle, delay: '0.1s' },
            { label: 'Currently Issued', value: summaryData.currentlyIssued, color: 'indigo', icon: Clock, delay: '0.2s' },
            { label: 'Overdue Books', value: summaryData.overdue, color: 'red', icon: AlertCircle, delay: '0.3s' }
          ].map((item, idx) => {
            const Icon = item.icon;
            const colorClasses = {
              blue: 'from-blue-500 to-blue-600 bg-blue-50',
              green: 'from-green-500 to-green-600 bg-green-50',
              indigo: 'from-indigo-500 to-indigo-600 bg-indigo-50',
              red: 'from-red-500 to-red-600 bg-red-50'
            };
            
            return (
              <div
                key={idx}
                className="card-hover bg-white rounded-2xl p-6 shadow-md border border-slate-200 animate-slide-up"
                style={{ animationDelay: item.delay }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[item.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[item.color as keyof typeof colorClasses].split(' ')[1]} flex items-center justify-center`}>
                    <Icon className="text-white" size={24} />
                  </div>
                </div>
                <p className="text-slate-600 text-sm font-medium mb-1">{item.label}</p>
                <p className="text-4xl font-bold heading-font text-slate-900">{item.value}</p>
              </div>
            );
          })}
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search by book title, student name, or accession number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none search-input focus:border-blue-500 transition-all"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 bg-white transition-all"
            >
              <option value="All">All Status</option>
              <option value="Issued">Issued</option>
              <option value="Returned">Returned</option>
              <option value="Overdue">Overdue</option>
              <option value="Lost">Lost</option>
            </select>

            {/* Date Range */}
            <div className="flex gap-2">
              <input
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                className="px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
              />
              <input
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                className="px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            {/* Export */}
            <button className="px-6 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 font-medium">
              <Download size={18} />
              Export
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="w-full">
            <table className="w-full text-xs sm:text-sm md:text-base">
              <thead className="bg-gradient-to-r from-slate-50 to-blue-50 sticky top-0">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Transaction ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Book Details</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">User Details</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Issue Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Return Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Fine</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredTransactions.map((transaction, idx) => (
                  <tr
                    key={transaction.id}
                    className={`table-row-hover ${transaction.status === 'Overdue' ? 'overdue-row' : ''}`}
                    style={{ animationDelay: `${0.6 + idx * 0.05}s` }}
                  >
                    <td className="px-4 py-2 break-words max-w-[100px]">
                      <span className="font-mono text-sm font-semibold text-slate-900">{transaction.id}</span>
                    </td>
                    <td className="px-4 py-2 break-words max-w-[180px]">
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{transaction.bookTitle}</p>
                        <p className="text-xs text-slate-500 font-mono">{transaction.accessionNo}</p>
                      </div>
                    </td>
                    <td className="px-4 py-2 break-words max-w-[120px]">
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{transaction.userName}</p>
                        <p className="text-xs text-slate-500">
                          {transaction.userType}
                          {transaction.class && transaction.section && ` - ${transaction.class}${transaction.section}`}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-2 break-words max-w-[100px] text-sm text-slate-700">{transaction.issueDate}</td>
                    <td className="px-4 py-2 break-words max-w-[100px] text-sm text-slate-700">{transaction.dueDate}</td>
                    <td className="px-4 py-2 break-words max-w-[100px] text-sm text-slate-700">
                      {transaction.returnDate || '-'}
                    </td>
                    <td className="px-4 py-2 break-words max-w-[100px]">
                      <StatusBadge status={transaction.status} />
                    </td>
                    <td className="px-4 py-2 break-words max-w-[80px]">
                      {transaction.fineAmount > 0 ? (
                        <span className="text-red-600 font-bold">₹{transaction.fineAmount}</span>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-2 break-words max-w-[120px] text-right">
                      <div className="flex items-center justify-end gap-2">
                        {transaction.status === 'Issued' || transaction.status === 'Overdue' ? (
                          <button
                            onClick={() => {
                              setSelectedTransaction(transaction);
                              setShowReturnModal(true);
                            }}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all"
                            title="Return Book"
                          >
                            <RotateCcw size={18} />
                          </button>
                        ) : null}
                        <button
                          onClick={() => {
                            setSelectedTransaction(transaction);
                            setShowViewDrawer(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Issue Book Modal */}
      {showIssueModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-6 rounded-t-2xl flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold heading-font">Issue New Book</h2>
                <p className="text-blue-100 text-sm mt-1">Fill in the details to issue a book</p>
              </div>
              <button
                onClick={() => setShowIssueModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Issue Type */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Issue Type</label>
                <div className="flex gap-4">
                  {['Student', 'Teacher'].map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="issueType"
                        value={type}
                        checked={issueForm.issueType === type}
                        onChange={(e) => setIssueForm({ ...issueForm, issueType: e.target.value })}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-slate-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Search Student/Teacher */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Search {issueForm.issueType}
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    placeholder={`Search by name, ID, ${issueForm.issueType === 'Student' ? 'class...' : 'department...'}`}
                    value={issueForm.studentSearch}
                    onChange={(e) => setIssueForm({ ...issueForm, studentSearch: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>
                {issueForm.studentSearch && (
                  <div className="mt-2 border border-slate-200 rounded-xl overflow-hidden">
                    {mockStudents
                      .filter(s => s.type === issueForm.issueType && s.name.toLowerCase().includes(issueForm.studentSearch.toLowerCase()))
                      .map(student => (
                        <button
                          key={student.id}
                          onClick={() => setIssueForm({ ...issueForm, selectedStudent: student, studentSearch: student.name })}
                          className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-all border-b last:border-b-0 border-slate-200"
                        >
                          <p className="font-semibold text-slate-900">{student.name}</p>
                          <p className="text-xs text-slate-500">
                            {student.type === 'Student' ? `${student.class}${student.section} - ${student.id}` : student.id}
                          </p>
                        </button>
                      ))}
                  </div>
                )}
                {issueForm.selectedStudent && (
                  <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <p className="text-sm font-semibold text-blue-900">Selected: {issueForm.selectedStudent.name}</p>
                    <p className="text-xs text-blue-700">
                      {issueForm.selectedStudent.type === 'Student'
                        ? `Class ${issueForm.selectedStudent.class}${issueForm.selectedStudent.section}`
                        : 'Teacher'}
                    </p>
                  </div>
                )}
              </div>

              {/* Search Book */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Search Book</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search by title or accession number..."
                    value={issueForm.bookSearch}
                    onChange={(e) => setIssueForm({ ...issueForm, bookSearch: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>
                {issueForm.bookSearch && (
                  <div className="mt-2 border border-slate-200 rounded-xl overflow-hidden">
                    {mockBooks
                      .filter(b => b.title.toLowerCase().includes(issueForm.bookSearch.toLowerCase()) || b.accessionNo.toLowerCase().includes(issueForm.bookSearch.toLowerCase()))
                      .map(book => (
                        <button
                          key={book.id}
                          onClick={() => setIssueForm({ ...issueForm, selectedBook: book, bookSearch: book.title })}
                          disabled={book.availableCopies === 0}
                          className={`w-full px-4 py-3 text-left transition-all border-b last:border-b-0 border-slate-200 ${
                            book.availableCopies === 0 ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'hover:bg-blue-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-slate-900">{book.title}</p>
                              <p className="text-xs text-slate-500 font-mono">{book.accessionNo}</p>
                            </div>
                            <div className="text-right">
                              <p className={`text-sm font-bold ${book.availableCopies > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {book.availableCopies > 0 ? `${book.availableCopies} Available` : 'Out of Stock'}
                              </p>
                              <p className="text-xs text-slate-500">of {book.totalCopies} total</p>
                            </div>
                          </div>
                        </button>
                      ))}
                  </div>
                )}
                {issueForm.selectedBook && (
                  <div className="mt-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <p className="text-sm font-semibold text-green-900">Selected: {issueForm.selectedBook.title}</p>
                    <p className="text-xs text-green-700">{issueForm.selectedBook.availableCopies} copies available</p>
                  </div>
                )}
              </div>

              {/* Date Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Issue Date</label>
                  <input
                    type="text"
                    value={new Date().toISOString().split('T')[0]}
                    disabled
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-slate-50 text-slate-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Due Date</label>
                  <input
                    type="text"
                    value={new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                    disabled
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-slate-50 text-slate-600"
                  />
                  <p className="text-xs text-slate-500 mt-1">15 days from today</p>
                </div>
              </div>

              {/* Remarks */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Remarks (Optional)</label>
                <textarea
                  value={issueForm.remarks}
                  onChange={(e) => setIssueForm({ ...issueForm, remarks: e.target.value })}
                  placeholder="Add any additional notes..."
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 transition-all resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowIssueModal(false)}
                  className="flex-1 px-6 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-all font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleIssueBook}
                  disabled={!issueForm.selectedBook || !issueForm.selectedStudent || issueForm.selectedBook.availableCopies === 0}
                  className="flex-1 btn-primary text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Issue Book
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Return Book Modal */}
      {showReturnModal && selectedTransaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 animate-scale-in">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-6 rounded-t-2xl flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold heading-font">Return Book</h2>
                <p className="text-green-100 text-sm mt-1">Process book return</p>
              </div>
              <button
                onClick={() => {
                  setShowReturnModal(false);
                  setSelectedTransaction(null);
                }}
                className="p-2 hover:bg-white/20 rounded-lg transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Book Details */}
              <div className="bg-slate-50 p-4 rounded-xl">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Book Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Title:</span>
                    <span className="text-sm font-semibold text-slate-900">{selectedTransaction.bookTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Accession No:</span>
                    <span className="text-sm font-mono text-slate-900">{selectedTransaction.accessionNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Issued To:</span>
                    <span className="text-sm font-semibold text-slate-900">{selectedTransaction.userName}</span>
                  </div>
                </div>
              </div>

              {/* Date Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="text-xs text-blue-600 font-semibold mb-1">Issue Date</p>
                  <p className="text-sm font-bold text-blue-900">{selectedTransaction.issueDate}</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl">
                  <p className="text-xs text-orange-600 font-semibold mb-1">Due Date</p>
                  <p className="text-sm font-bold text-orange-900">{selectedTransaction.dueDate}</p>
                </div>
              </div>

              {/* Fine Calculation */}
              {(() => {
                const lateDays = calculateLateDays(selectedTransaction.dueDate);
                const fine = calculateFine(lateDays);
                
                return (
                  <>
                    {lateDays > 0 && (
                      <div className="bg-red-50 border-2 border-red-200 p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                          <AlertCircle className="text-red-600" size={20} />
                          <h3 className="text-sm font-semibold text-red-900">Late Return Detected</h3>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-red-700">Late Days:</span>
                            <span className="text-sm font-bold text-red-900">{lateDays} days</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-red-700">Fine per Day:</span>
                            <span className="text-sm font-bold text-red-900">₹5</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-red-200">
                            <span className="text-sm font-semibold text-red-700">Total Fine:</span>
                            <span className="text-lg font-bold text-red-900">₹{fine}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    {lateDays === 0 && (
                      <div className="bg-green-50 border-2 border-green-200 p-4 rounded-xl">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="text-green-600" size={20} />
                          <span className="text-sm font-semibold text-green-900">On-time return • No fine</span>
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => {
                    setShowReturnModal(false);
                    setSelectedTransaction(null);
                  }}
                  className="flex-1 px-6 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-all font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleReturnBook(selectedTransaction)}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all"
                >
                  Confirm Return
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Details Drawer */}
      {showViewDrawer && selectedTransaction && (
        <div className="fixed inset-0 z-50 animate-fade-in">
          <div className="absolute inset-0 modal-overlay" onClick={() => setShowViewDrawer(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl animate-slide-up overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-6 flex items-center justify-between z-10">
              <div>
                <h2 className="text-2xl font-bold heading-font">Transaction Details</h2>
                <p className="text-indigo-100 text-sm mt-1">{selectedTransaction.id}</p>
              </div>
              <button
                onClick={() => setShowViewDrawer(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Book Information */}
              <div>
                <h3 className="text-lg font-bold heading-font text-slate-900 mb-4">Book Information</h3>
                <div className="bg-slate-50 p-6 rounded-xl space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Title:</span>
                    <span className="text-sm font-semibold text-slate-900 text-right">{selectedTransaction.bookTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Accession No:</span>
                    <span className="text-sm font-mono text-slate-900">{selectedTransaction.accessionNo}</span>
                  </div>
                </div>
              </div>

              {/* User Information */}
              <div>
                <h3 className="text-lg font-bold heading-font text-slate-900 mb-4">User Information</h3>
                <div className="bg-slate-50 p-6 rounded-xl space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Name:</span>
                    <span className="text-sm font-semibold text-slate-900">{selectedTransaction.userName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Type:</span>
                    <span className="text-sm font-semibold text-slate-900">{selectedTransaction.userType}</span>
                  </div>
                  {selectedTransaction.class && selectedTransaction.section && (
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Class & Section:</span>
                      <span className="text-sm font-semibold text-slate-900">
                        {selectedTransaction.class}{selectedTransaction.section}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Transaction Timeline */}
              <div>
                <h3 className="text-lg font-bold heading-font text-slate-900 mb-4">Transaction Timeline</h3>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Calendar className="text-blue-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900">Book Issued</p>
                      <p className="text-xs text-slate-600">{selectedTransaction.issueDate}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <Clock className="text-orange-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900">Due Date</p>
                      <p className="text-xs text-slate-600">{selectedTransaction.dueDate}</p>
                    </div>
                  </div>
                  {selectedTransaction.returnDate && (
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="text-green-600" size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-900">Book Returned</p>
                        <p className="text-xs text-slate-600">{selectedTransaction.returnDate}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Status & Fine */}
              <div>
                <h3 className="text-lg font-bold heading-font text-slate-900 mb-4">Status & Fine</h3>
                <div className="bg-slate-50 p-6 rounded-xl space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Current Status:</span>
                    <StatusBadge status={selectedTransaction.status} />
                  </div>
                  {selectedTransaction.fineAmount > 0 && (
                    <>
                      {selectedTransaction.lateDays && (
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">Late Days:</span>
                          <span className="text-sm font-bold text-red-600">{selectedTransaction.lateDays} days</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Fine Amount:</span>
                        <span className="text-lg font-bold text-red-600">₹{selectedTransaction.fineAmount}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Additional Details */}
              {(selectedTransaction.remarks || selectedTransaction.librarianName) && (
                <div>
                  <h3 className="text-lg font-bold heading-font text-slate-900 mb-4">Additional Details</h3>
                  <div className="bg-slate-50 p-6 rounded-xl space-y-3">
                    {selectedTransaction.librarianName && (
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Processed By:</span>
                        <span className="text-sm font-semibold text-slate-900">{selectedTransaction.librarianName}</span>
                      </div>
                    )}
                    {selectedTransaction.remarks && (
                      <div>
                        <span className="text-sm text-slate-600 block mb-1">Remarks:</span>
                        <p className="text-sm text-slate-900 bg-white p-3 rounded-lg">{selectedTransaction.remarks}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryIssueReturn;