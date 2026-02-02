import React, { useState } from 'react';

// Types
interface Fine {
  id: number;
  studentId: string;
  studentName: string;
  class: string;
  section: string;
  bookName: string;
  bookId: string;
  issueDate: string;
  dueDate: string;
  returnDate: string | null;
  finePerDay: number;
  paidAmount: number;
  status: 'Paid' | 'Unpaid' | 'Partial';
}

interface CollectFineModalProps {
  fine: Fine | null;
  onClose: () => void;
  onCollect: (data: PaymentData) => void;
}

interface PaymentData {
  amount: number;
  paymentMode: string;
  receiptNo: string;
  remarks: string;
}

// Mock data
const mockFines: Fine[] = [
  {
    id: 1,
    studentId: 'STU001',
    studentName: 'Rajesh Kumar',
    class: '10',
    section: 'A',
    bookName: 'Advanced Mathematics',
    bookId: 'BK-2023-001',
    issueDate: '2026-01-01',
    dueDate: '2026-01-15',
    returnDate: '2026-01-22',
    finePerDay: 5,
    paidAmount: 0,
    status: 'Unpaid'
  },
  {
    id: 2,
    studentId: 'STU002',
    studentName: 'Priya Sharma',
    class: '9',
    section: 'B',
    bookName: 'English Literature',
    bookId: 'BK-2023-045',
    issueDate: '2025-12-28',
    dueDate: '2026-01-11',
    returnDate: '2026-01-20',
    finePerDay: 5,
    paidAmount: 25,
    status: 'Partial'
  },
  {
    id: 3,
    studentId: 'STU003',
    studentName: 'Amit Patel',
    class: '11',
    section: 'A',
    bookName: 'Physics Fundamentals',
    bookId: 'BK-2023-078',
    issueDate: '2026-01-05',
    dueDate: '2026-01-19',
    returnDate: '2026-01-25',
    finePerDay: 5,
    paidAmount: 30,
    status: 'Paid'
  }
];

// Calculate late days and total fine
const calculateFine = (fine: Fine) => {
  if (!fine.returnDate) return { lateDays: 0, totalFine: 0, balance: 0 };
  
  const due = new Date(fine.dueDate);
  const returned = new Date(fine.returnDate);
  const lateDays = Math.max(0, Math.floor((returned.getTime() - due.getTime()) / (1000 * 60 * 60 * 24)));
  const totalFine = lateDays * fine.finePerDay;
  const balance = totalFine - fine.paidAmount;
  
  return { lateDays, totalFine, balance };
};

// Collect Fine Modal Component
const CollectFineModal: React.FC<CollectFineModalProps> = ({ fine, onClose, onCollect }) => {
  const [paymentData, setPaymentData] = useState<PaymentData>({
    amount: 0,
    paymentMode: 'Cash',
    receiptNo: '',
    remarks: ''
  });

  if (!fine) return null;

  const { lateDays, totalFine, balance } = calculateFine(fine);

  const handleCollect = () => {
    if (paymentData.amount > balance) {
      alert('Payment amount cannot exceed balance amount');
      return;
    }
    if (paymentData.amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    if (!paymentData.receiptNo) {
      alert('Please enter receipt number');
      return;
    }
    onCollect(paymentData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-4 rounded-t-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Collect Fine</h2>
            <button onClick={onClose} className="text-white hover:text-gray-200 text-2xl font-bold">
              ×
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Student Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-3 text-lg">Student Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Student ID:</span>
                <span className="ml-2 font-medium">{fine.studentId}</span>
              </div>
              <div>
                <span className="text-gray-500">Student Name:</span>
                <span className="ml-2 font-medium">{fine.studentName}</span>
              </div>
              <div>
                <span className="text-gray-500">Class:</span>
                <span className="ml-2 font-medium">{fine.class} - {fine.section}</span>
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-3 text-lg">Book Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Book Name:</span>
                <span className="ml-2 font-medium">{fine.bookName}</span>
              </div>
              <div>
                <span className="text-gray-500">Book ID:</span>
                <span className="ml-2 font-medium">{fine.bookId}</span>
              </div>
              <div>
                <span className="text-gray-500">Due Date:</span>
                <span className="ml-2 font-medium">{fine.dueDate}</span>
              </div>
              <div>
                <span className="text-gray-500">Return Date:</span>
                <span className="ml-2 font-medium">{fine.returnDate}</span>
              </div>
              <div>
                <span className="text-gray-500">Late Days:</span>
                <span className="ml-2 font-medium text-red-600">{lateDays} days</span>
              </div>
            </div>
          </div>

          {/* Fine Summary */}
          <div className="bg-amber-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-3 text-lg">Fine Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Fine per Day:</span>
                <span className="font-medium">₹{fine.finePerDay}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Fine:</span>
                <span className="font-medium">₹{totalFine}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Already Paid:</span>
                <span className="font-medium text-green-600">₹{fine.paidAmount}</span>
              </div>
              <div className="flex justify-between border-t-2 border-amber-200 pt-2">
                <span className="text-gray-800 font-semibold">Balance Amount:</span>
                <span className="font-bold text-red-600 text-lg">₹{balance}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paying Now <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={paymentData.amount}
                  onChange={(e) => setPaymentData({ ...paymentData, amount: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter amount"
                  max={balance}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Mode <span className="text-red-500">*</span>
                </label>
                <select
                  value={paymentData.paymentMode}
                  onChange={(e) => setPaymentData({ ...paymentData, paymentMode: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option>Cash</option>
                  <option>UPI</option>
                  <option>Card</option>
                  <option>Net Banking</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Receipt No <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={paymentData.receiptNo}
                  onChange={(e) => setPaymentData({ ...paymentData, receiptNo: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter receipt number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="text"
                  value={new Date().toLocaleDateString('en-IN')}
                  disabled
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Remarks
              </label>
              <textarea
                value={paymentData.remarks}
                onChange={(e) => setPaymentData({ ...paymentData, remarks: e.target.value })}
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter any remarks..."
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-xl flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCollect}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
          >
            Collect Fine
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const LibraryFineCollection: React.FC = () => {
  const [fines, setFines] = useState<Fine[]>(mockFines);
  const [selectedFine, setSelectedFine] = useState<Fine | null>(null);
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [filters, setFilters] = useState({
    class: '',
    section: '',
    studentName: '',
    studentId: '',
    status: 'All',
    fromDate: '',
    toDate: ''
  });

  // Calculate summary statistics
  const totalStudentsWithFine = fines.filter(f => calculateFine(f).balance > 0).length;
  const totalPendingFine = fines.reduce((sum, f) => sum + calculateFine(f).balance, 0);
  const fineCollectedToday = 150; // Mock data
  const fineCollectedMonth = 2500; // Mock data

  const handleCollectFine = (fine: Fine) => {
    setSelectedFine(fine);
    setShowCollectModal(true);
  };

  const handlePaymentCollect = (data: PaymentData) => {
    console.log('Payment collected:', data);
    alert(`Fine of ₹${data.amount} collected successfully!`);
    setShowCollectModal(false);
    setSelectedFine(null);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      Paid: 'bg-green-100 text-green-800 border-green-200',
      Unpaid: 'bg-red-100 text-red-800 border-red-200',
      Partial: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return styles[status as keyof typeof styles] || styles.Unpaid;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Library Fine Collection</h1>
              <p className="text-gray-500 mt-1">Track and collect library fines from students</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors flex items-center gap-2">
                <span>📊</span> Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Students with Fine</p>
                <p className="text-3xl font-bold mt-2">{totalStudentsWithFine}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full p-3">
                <span className="text-2xl">👥</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm font-medium">Total Pending Fine</p>
                <p className="text-3xl font-bold mt-2">₹{totalPendingFine}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full p-3">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Collected Today</p>
                <p className="text-3xl font-bold mt-2">₹{fineCollectedToday}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full p-3">
                <span className="text-2xl">📅</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Collected This Month</p>
                <p className="text-3xl font-bold mt-2">₹{fineCollectedMonth}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full p-3">
                <span className="text-2xl">📈</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters & Search</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
              <select 
                value={filters.class}
                onChange={(e) => setFilters({...filters, class: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Classes</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
              <select 
                value={filters.section}
                onChange={(e) => setFilters({...filters, section: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Sections</option>
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Student Name</label>
              <input
                type="text"
                value={filters.studentName}
                onChange={(e) => setFilters({...filters, studentName: e.target.value})}
                placeholder="Search by name..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
              <input
                type="text"
                value={filters.studentId}
                onChange={(e) => setFilters({...filters, studentId: e.target.value})}
                placeholder="Search by ID..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fine Status</label>
              <select 
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option>All</option>
                <option>Paid</option>
                <option>Unpaid</option>
                <option>Partial</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
              <input
                type="date"
                value={filters.fromDate}
                onChange={(e) => setFilters({...filters, fromDate: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
              <input
                type="date"
                value={filters.toDate}
                onChange={(e) => setFilters({...filters, toDate: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="flex items-end gap-2">
              <button className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors">
                🔍 Search
              </button>
              <button 
                onClick={() => setFilters({ class: '', section: '', studentName: '', studentId: '', status: 'All', fromDate: '', toDate: '' })}
                className="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition-colors"
              >
                🔄
              </button>
            </div>
          </div>
        </div>

        {/* Fine Collection Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-indigo-600 to-indigo-700 sticky top-0">
                <tr>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Student ID</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Student Name</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Class</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Section</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Book Name</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Book ID</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Issue Date</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Due Date</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Return Date</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Late Days</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Fine/Day</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Total Fine</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Paid</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Balance</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Status</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {fines.map((fine) => {
                  const { lateDays, totalFine, balance } = calculateFine(fine);
                  return (
                    <tr key={fine.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{fine.studentId}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{fine.studentName}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{fine.class}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{fine.section}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{fine.bookName}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{fine.bookId}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{fine.issueDate}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{fine.dueDate}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{fine.returnDate || 'N/A'}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-red-600">{lateDays}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">₹{fine.finePerDay}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">₹{totalFine}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-green-600 font-medium">₹{fine.paidAmount}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-red-600">₹{balance}</td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusBadge(fine.status)}`}>
                          {fine.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-800 font-medium">👁️</button>
                          <button 
                            onClick={() => handleCollectFine(fine)}
                            className="text-green-600 hover:text-green-800 font-medium"
                          >
                            💵
                          </button>
                          <button className="text-purple-600 hover:text-purple-800 font-medium">📜</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of{' '}
              <span className="font-medium">3</span> results
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
                1
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50" disabled>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Collect Fine Modal */}
      {showCollectModal && (
        <CollectFineModal
          fine={selectedFine}
          onClose={() => {
            setShowCollectModal(false);
            setSelectedFine(null);
          }}
          onCollect={handlePaymentCollect}
        />
      )}
    </div>
  );
};

export default LibraryFineCollection;