import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Filter, Download } from 'lucide-react';

const StudentDuesDetail = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const studentsPerPage = 15;

  // Static data for 50 students
  const allStudents = [
    { id: 'STU001', name: 'Aarav Sharma', class: '10-A', totalFees: '$2,500', paid: '$2,500', pending: '$0', dueDate: 'Jan 15, 2024', status: 'Paid' },
    { id: 'STU002', name: 'Priya Patel', class: '9-B', totalFees: '$2,300', paid: '$1,500', pending: '$800', dueDate: 'Jan 20, 2024', status: 'Pending' },
    { id: 'STU003', name: 'Rohan Gupta', class: '11-A', totalFees: '$2,700', paid: '$2,700', pending: '$0', dueDate: 'Jan 10, 2024', status: 'Paid' },
    { id: 'STU004', name: 'Ananya Singh', class: '8-C', totalFees: '$2,200', paid: '$1,000', pending: '$1,200', dueDate: 'Jan 25, 2024', status: 'Overdue' },
    { id: 'STU005', name: 'Arjun Reddy', class: '12-B', totalFees: '$2,800', paid: '$2,800', pending: '$0', dueDate: 'Jan 05, 2024', status: 'Paid' },
    { id: 'STU006', name: 'Diya Kapoor', class: '7-A', totalFees: '$2,100', paid: '$1,500', pending: '$600', dueDate: 'Jan 30, 2024', status: 'Pending' },
    { id: 'STU007', name: 'Kabir Mehta', class: '10-C', totalFees: '$2,500', paid: '$2,500', pending: '$0', dueDate: 'Jan 12, 2024', status: 'Paid' },
    { id: 'STU008', name: 'Aisha Khan', class: '9-A', totalFees: '$2,400', paid: '$800', pending: '$1,600', dueDate: 'Jan 18, 2024', status: 'Overdue' },
    { id: 'STU009', name: 'Vihaan Joshi', class: '11-B', totalFees: '$2,600', paid: '$2,600', pending: '$0', dueDate: 'Jan 08, 2024', status: 'Paid' },
    { id: 'STU010', name: 'Saanvi Desai', class: '8-A', totalFees: '$2,250', paid: '$2,000', pending: '$250', dueDate: 'Feb 05, 2024', status: 'Pending' },
    { id: 'STU011', name: 'Advait Verma', class: '12-A', totalFees: '$2,900', paid: '$2,900', pending: '$0', dueDate: 'Jan 03, 2024', status: 'Paid' },
    { id: 'STU012', name: 'Ira Malhotra', class: '7-B', totalFees: '$2,150', paid: '$1,200', pending: '$950', dueDate: 'Jan 22, 2024', status: 'Overdue' },
    { id: 'STU013', name: 'Reyansh Iyer', class: '10-B', totalFees: '$2,550', paid: '$2,550', pending: '$0', dueDate: 'Jan 14, 2024', status: 'Paid' },
    { id: 'STU014', name: 'Myra Nair', class: '9-C', totalFees: '$2,350', paid: '$1,800', pending: '$550', dueDate: 'Feb 01, 2024', status: 'Pending' },
    { id: 'STU015', name: 'Ayaan Das', class: '11-C', totalFees: '$2,650', paid: '$2,650', pending: '$0', dueDate: 'Jan 07, 2024', status: 'Paid' },
    
    { id: 'STU016', name: 'Kiara Bose', class: '8-B', totalFees: '$2,200', paid: '$1,100', pending: '$1,100', dueDate: 'Jan 28, 2024', status: 'Overdue' },
    { id: 'STU017', name: 'Ishaan Pillai', class: '12-C', totalFees: '$2,850', paid: '$2,850', pending: '$0', dueDate: 'Jan 04, 2024', status: 'Paid' },
    { id: 'STU018', name: 'Zara Ali', class: '7-C', totalFees: '$2,100', paid: '$1,600', pending: '$500', dueDate: 'Feb 10, 2024', status: 'Pending' },
    { id: 'STU019', name: 'Vivaan Rao', class: '10-A', totalFees: '$2,500', paid: '$2,500', pending: '$0', dueDate: 'Jan 11, 2024', status: 'Paid' },
    { id: 'STU020', name: 'Anvi Saxena', class: '9-B', totalFees: '$2,300', paid: '$900', pending: '$1,400', dueDate: 'Jan 19, 2024', status: 'Overdue' },
    { id: 'STU021', name: 'Aditya Bhatt', class: '11-A', totalFees: '$2,700', paid: '$2,700', pending: '$0', dueDate: 'Jan 09, 2024', status: 'Paid' },
    { id: 'STU022', name: 'Navya Choudhury', class: '8-C', totalFees: '$2,250', paid: '$1,700', pending: '$550', dueDate: 'Feb 08, 2024', status: 'Pending' },
    { id: 'STU023', name: 'Dhruv Sinha', class: '12-B', totalFees: '$2,800', paid: '$2,800', pending: '$0', dueDate: 'Jan 06, 2024', status: 'Paid' },
    { id: 'STU024', name: 'Siya Mishra', class: '7-A', totalFees: '$2,100', paid: '$700', pending: '$1,400', dueDate: 'Jan 24, 2024', status: 'Overdue' },
    { id: 'STU025', name: 'Atharv Pandey', class: '10-C', totalFees: '$2,500', paid: '$2,500', pending: '$0', dueDate: 'Jan 13, 2024', status: 'Paid' },
    { id: 'STU026', name: 'Riya Ghosh', class: '9-A', totalFees: '$2,400', paid: '$2,100', pending: '$300', dueDate: 'Feb 03, 2024', status: 'Pending' },
    { id: 'STU027', name: 'Shaurya Kumar', class: '11-B', totalFees: '$2,600', paid: '$2,600', pending: '$0', dueDate: 'Jan 08, 2024', status: 'Paid' },
    { id: 'STU028', name: 'Pari Banerjee', class: '8-A', totalFees: '$2,200', paid: '$1,300', pending: '$900', dueDate: 'Jan 26, 2024', status: 'Overdue' },
    { id: 'STU029', name: 'Arnav Jain', class: '12-A', totalFees: '$2,900', paid: '$2,900', pending: '$0', dueDate: 'Jan 02, 2024', status: 'Paid' },
    { id: 'STU030', name: 'Mira Shah', class: '7-B', totalFees: '$2,150', paid: '$1,900', pending: '$250', dueDate: 'Feb 12, 2024', status: 'Pending' },
    
    { id: 'STU031', name: 'Krish Agarwal', class: '10-B', totalFees: '$2,550', paid: '$2,550', pending: '$0', dueDate: 'Jan 14, 2024', status: 'Paid' },
    { id: 'STU032', name: 'Tara Tripathi', class: '9-C', totalFees: '$2,350', paid: '$1,000', pending: '$1,350', dueDate: 'Jan 21, 2024', status: 'Overdue' },
    { id: 'STU033', name: 'Rudra Chatterjee', class: '11-C', totalFees: '$2,650', paid: '$2,650', pending: '$0', dueDate: 'Jan 07, 2024', status: 'Paid' },
    { id: 'STU034', name: 'Avni Sengupta', class: '8-B', totalFees: '$2,200', paid: '$1,800', pending: '$400', dueDate: 'Feb 06, 2024', status: 'Pending' },
    { id: 'STU035', name: 'Yash Kulkarni', class: '12-C', totalFees: '$2,850', paid: '$2,850', pending: '$0', dueDate: 'Jan 05, 2024', status: 'Paid' },
    { id: 'STU036', name: 'Kashvi Dubey', class: '7-C', totalFees: '$2,100', paid: '$800', pending: '$1,300', dueDate: 'Jan 27, 2024', status: 'Overdue' },
    { id: 'STU037', name: 'Sai Yadav', class: '10-A', totalFees: '$2,500', paid: '$2,500', pending: '$0', dueDate: 'Jan 10, 2024', status: 'Paid' },
    { id: 'STU038', name: 'Nitya Rathore', class: '9-B', totalFees: '$2,300', paid: '$2,000', pending: '$300', dueDate: 'Feb 04, 2024', status: 'Pending' },
    { id: 'STU039', name: 'Shivansh Tiwari', class: '11-A', totalFees: '$2,700', paid: '$2,700', pending: '$0', dueDate: 'Jan 09, 2024', status: 'Paid' },
    { id: 'STU040', name: 'Ananya Chauhan', class: '8-C', totalFees: '$2,250', paid: '$900', pending: '$1,350', dueDate: 'Jan 23, 2024', status: 'Overdue' },
    { id: 'STU041', name: 'Om Sharma', class: '12-B', totalFees: '$2,800', paid: '$2,800', pending: '$0', dueDate: 'Jan 06, 2024', status: 'Paid' },
    { id: 'STU042', name: 'Aadhya Bajaj', class: '7-A', totalFees: '$2,100', paid: '$1,500', pending: '$600', dueDate: 'Feb 09, 2024', status: 'Pending' },
    { id: 'STU043', name: 'Pranav Khanna', class: '10-C', totalFees: '$2,500', paid: '$2,500', pending: '$0', dueDate: 'Jan 12, 2024', status: 'Paid' },
    { id: 'STU044', name: 'Shanaya Arora', class: '9-A', totalFees: '$2,400', paid: '$1,200', pending: '$1,200', dueDate: 'Jan 20, 2024', status: 'Overdue' },
    { id: 'STU045', name: 'Aayansh Goyal', class: '11-B', totalFees: '$2,600', paid: '$2,600', pending: '$0', dueDate: 'Jan 08, 2024', status: 'Paid' },
    { id: 'STU046', name: 'Pihu Sethi', class: '8-A', totalFees: '$2,200', paid: '$1,900', pending: '$300', dueDate: 'Feb 07, 2024', status: 'Pending' },
    { id: 'STU047', name: 'Veer Ahuja', class: '12-A', totalFees: '$2,900', paid: '$2,900', pending: '$0', dueDate: 'Jan 03, 2024', status: 'Paid' },
    { id: 'STU048', name: 'Mahika Bhatia', class: '7-B', totalFees: '$2,150', paid: '$700', pending: '$1,450', dueDate: 'Jan 25, 2024', status: 'Overdue' },
    { id: 'STU049', name: 'Lakshya Singh', class: '10-B', totalFees: '$2,550', paid: '$2,550', pending: '$0', dueDate: 'Jan 14, 2024', status: 'Paid' },
    { id: 'STU050', name: 'Aarna Chopra', class: '9-C', totalFees: '$2,350', paid: '$2,100', pending: '$250', dueDate: 'Feb 11, 2024', status: 'Pending' }
  ];

  // Filter students based on search
  const filteredStudents = allStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  // Calculate totals
  const totalAmount = allStudents.reduce((sum, s) => sum + parseFloat(s.totalFees.replace('$', '').replace(',', '')), 0);
  const totalPaid = allStudents.reduce((sum, s) => sum + parseFloat(s.paid.replace('$', '').replace(',', '')), 0);
  const totalPending = allStudents.reduce((sum, s) => sum + parseFloat(s.pending.replace('$', '').replace(',', '')), 0);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
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
          <span>Students</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Due Details</span>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Students Payment Details</h1>
        <p className="text-gray-600">Track tuition fees, scholarships, and payment status</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Total Students</div>
          <div className="text-3xl font-bold text-gray-900">50</div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Total Fees</div>
          <div className="text-3xl font-bold text-gray-900">${totalAmount.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Amount Paid</div>
          <div className="text-3xl font-bold text-green-600">${totalPaid.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Amount Pending</div>
          <div className="text-3xl font-bold text-red-600">${totalPending.toLocaleString()}</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 mb-6">
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, ID, or class..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-y border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Student ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Student Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Total Fees</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Paid Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Pending Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{student.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{student.class}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{student.totalFees}</td>
                  <td className="px-6 py-4 text-sm text-green-600 font-medium">{student.paid}</td>
                  <td className="px-6 py-4 text-sm text-red-600 font-medium">{student.pending}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{student.dueDate}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(student.status)}`}>
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {indexOfFirstStudent + 1} to {Math.min(indexOfLastStudent, filteredStudents.length)} of {filteredStudents.length} students
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx + 1}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === idx + 1
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {idx + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDuesDetail;