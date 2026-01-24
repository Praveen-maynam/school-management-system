import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Filter, Download, Plus } from 'lucide-react';

const TeachingStaffDetails = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const teachersPerPage = 15;

  // Static data for 30 teachers (2 pages)
  const allTeachers = [
    { id: 'TCH001', name: 'Dr. Ramesh Kumar', subject: 'Mathematics', classes: '11-A, 12-A', experience: 15, qualification: 'PhD', baseSalary: '$3,500', bonus: '$500', benefits: '$400', total: '$4,400', status: 'Active' },
    { id: 'TCH002', name: 'Mrs. Priya Sharma', subject: 'English', classes: '9-A, 10-B', experience: 12, qualification: 'M.A.', baseSalary: '$3,200', bonus: '$400', benefits: '$350', total: '$3,950', status: 'Active' },
    { id: 'TCH003', name: 'Mr. Vikram Singh', subject: 'Physics', classes: '11-B, 12-B', experience: 18, qualification: 'M.Sc.', baseSalary: '$3,800', bonus: '$600', benefits: '$450', total: '$4,850', status: 'Active' },
    { id: 'TCH004', name: 'Ms. Anjali Desai', subject: 'Chemistry', classes: '10-A, 11-C', experience: 10, qualification: 'M.Sc.', baseSalary: '$3,000', bonus: '$350', benefits: '$300', total: '$3,650', status: 'Active' },
    { id: 'TCH005', name: 'Dr. Suresh Reddy', subject: 'Biology', classes: '11-A, 12-C', experience: 20, qualification: 'PhD', baseSalary: '$4,000', bonus: '$700', benefits: '$500', total: '$5,200', status: 'Active' },
    { id: 'TCH006', name: 'Mrs. Meera Patel', subject: 'Hindi', classes: '7-A, 8-B, 9-C', experience: 8, qualification: 'M.A.', baseSalary: '$2,600', bonus: '$300', benefits: '$250', total: '$3,150', status: 'Active' },
    { id: 'TCH007', name: 'Mr. Arun Verma', subject: 'History', classes: '9-B, 10-C', experience: 14, qualification: 'M.A.', baseSalary: '$3,300', bonus: '$450', benefits: '$350', total: '$4,100', status: 'Active' },
    { id: 'TCH008', name: 'Ms. Kavita Joshi', subject: 'Geography', classes: '8-A, 9-A', experience: 9, qualification: 'M.A.', baseSalary: '$2,800', bonus: '$320', benefits: '$280', total: '$3,400', status: 'Active' },
    { id: 'TCH009', name: 'Dr. Ashok Mehta', subject: 'Computer Science', classes: '10-A, 11-B, 12-A', experience: 16, qualification: 'PhD', baseSalary: '$3,600', bonus: '$550', benefits: '$400', total: '$4,550', status: 'Active' },
    { id: 'TCH010', name: 'Mrs. Deepa Iyer', subject: 'Economics', classes: '11-C, 12-B', experience: 11, qualification: 'M.Com.', baseSalary: '$3,100', bonus: '$380', benefits: '$320', total: '$3,800', status: 'Active' },
    { id: 'TCH011', name: 'Mr. Rajesh Gupta', subject: 'Physical Education', classes: 'All Classes', experience: 13, qualification: 'M.P.Ed.', baseSalary: '$2,900', bonus: '$350', benefits: '$300', total: '$3,550', status: 'Active' },
    { id: 'TCH012', name: 'Ms. Sneha Rao', subject: 'Art & Craft', classes: '7-B, 8-C, 9-B', experience: 7, qualification: 'BFA', baseSalary: '$2,400', bonus: '$250', benefits: '$220', total: '$2,870', status: 'Active' },
    { id: 'TCH013', name: 'Dr. Manish Kapoor', subject: 'Mathematics', classes: '9-C, 10-A', experience: 17, qualification: 'PhD', baseSalary: '$3,700', bonus: '$580', benefits: '$420', total: '$4,700', status: 'Active' },
    { id: 'TCH014', name: 'Mrs. Radha Nair', subject: 'Sanskrit', classes: '8-A, 9-A, 10-B', experience: 10, qualification: 'M.A.', baseSalary: '$2,950', bonus: '$340', benefits: '$290', total: '$3,580', status: 'Active' },
    { id: 'TCH015', name: 'Mr. Kiran Kumar', subject: 'Social Science', classes: '7-C, 8-B', experience: 6, qualification: 'M.A.', baseSalary: '$2,500', bonus: '$280', benefits: '$240', total: '$3,020', status: 'Active' },
    
    { id: 'TCH016', name: 'Ms. Pooja Malhotra', subject: 'English', classes: '11-A, 12-C', experience: 14, qualification: 'M.A.', baseSalary: '$3,300', bonus: '$450', benefits: '$360', total: '$4,110', status: 'Active' },
    { id: 'TCH017', name: 'Dr. Sanjay Bhatt', subject: 'Physics', classes: '10-B, 11-A', experience: 19, qualification: 'PhD', baseSalary: '$3,900', bonus: '$650', benefits: '$480', total: '$5,030', status: 'Active' },
    { id: 'TCH018', name: 'Mrs. Lakshmi Pillai', subject: 'Chemistry', classes: '9-A, 10-C', experience: 11, qualification: 'M.Sc.', baseSalary: '$3,100', bonus: '$380', benefits: '$310', total: '$3,790', status: 'Active' },
    { id: 'TCH019', name: 'Mr. Naveen Choudhary', subject: 'Commerce', classes: '11-B, 12-A', experience: 12, qualification: 'M.Com.', baseSalary: '$3,150', bonus: '$400', benefits: '$330', total: '$3,880', status: 'Active' },
    { id: 'TCH020', name: 'Ms. Divya Saxena', subject: 'Psychology', classes: '11-C, 12-B', experience: 8, qualification: 'M.A.', baseSalary: '$2,750', bonus: '$310', benefits: '$270', total: '$3,330', status: 'Active' },
    { id: 'TCH021', name: 'Dr. Harish Tripathi', subject: 'Political Science', classes: '11-A, 12-C', experience: 21, qualification: 'PhD', baseSalary: '$4,100', bonus: '$750', benefits: '$520', total: '$5,370', status: 'Active' },
    { id: 'TCH022', name: 'Mrs. Nisha Agarwal', subject: 'Home Science', classes: '9-B, 10-A', experience: 9, qualification: 'M.Sc.', baseSalary: '$2,850', bonus: '$330', benefits: '$280', total: '$3,460', status: 'Active' },
    { id: 'TCH023', name: 'Mr. Abhishek Mishra', subject: 'Music', classes: '7-A, 8-A, 9-C', experience: 7, qualification: 'B.Mus.', baseSalary: '$2,450', bonus: '$260', benefits: '$230', total: '$2,940', status: 'Active' },
    { id: 'TCH024', name: 'Ms. Ritu Singh', subject: 'Biology', classes: '9-B, 10-B', experience: 10, qualification: 'M.Sc.', baseSalary: '$3,000', bonus: '$350', benefits: '$300', total: '$3,650', status: 'Active' },
    { id: 'TCH025', name: 'Dr. Prakash Yadav', subject: 'Mathematics', classes: '7-B, 8-C', experience: 15, qualification: 'PhD', baseSalary: '$3,500', bonus: '$500', benefits: '$390', total: '$4,390', status: 'Active' },
    { id: 'TCH026', name: 'Mrs. Sunita Das', subject: 'French', classes: '9-A, 10-A, 11-B', experience: 13, qualification: 'M.A.', baseSalary: '$3,250', bonus: '$420', benefits: '$340', total: '$4,010', status: 'Active' },
    { id: 'TCH027', name: 'Mr. Mohit Banerjee', subject: 'Accountancy', classes: '11-C, 12-B', experience: 11, qualification: 'M.Com., CA', baseSalary: '$3,400', bonus: '$450', benefits: '$350', total: '$4,200', status: 'Active' },
    { id: 'TCH028', name: 'Ms. Shweta Kulkarni', subject: 'Business Studies', classes: '11-A, 12-A', experience: 9, qualification: 'MBA', baseSalary: '$2,900', bonus: '$340', benefits: '$290', total: '$3,530', status: 'Active' },
    { id: 'TCH029', name: 'Dr. Vinay Sharma', subject: 'Philosophy', classes: '11-B, 12-C', experience: 18, qualification: 'PhD', baseSalary: '$3,800', bonus: '$600', benefits: '$450', total: '$4,850', status: 'Active' },
    { id: 'TCH030', name: 'Mrs. Geeta Bajaj', subject: 'Sociology', classes: '11-C, 12-A', experience: 12, qualification: 'M.A.', baseSalary: '$3,200', bonus: '$400', benefits: '$330', total: '$3,930', status: 'Active' }
  ];

  // Filter teachers based on search
  const filteredTeachers = allTeachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.classes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);
  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = filteredTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);

  // Calculate totals
  const totalBaseSalary = allTeachers.reduce((sum, t) => sum + parseFloat(t.baseSalary.replace('$', '').replace(',', '')), 0);
  const totalBonus = allTeachers.reduce((sum, t) => sum + parseFloat(t.bonus.replace('$', '').replace(',', '')), 0);
  const totalBenefits = allTeachers.reduce((sum, t) => sum + parseFloat(t.benefits.replace('$', '').replace(',', '')), 0);
  const grandTotal = allTeachers.reduce((sum, t) => sum + parseFloat(t.total.replace('$', '').replace(',', '')), 0);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <span>Finance</span>
          <ChevronRight className="w-4 h-4" />
          <span>Teaching Staff</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Salary Details</span>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Teaching Staff Salary Details</h1>
        <p className="text-gray-600">Salaries, bonuses, and benefits for teachers based on experience and qualifications</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Total Teachers</div>
          <div className="text-3xl font-bold text-gray-900">30</div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Base Salaries</div>
          <div className="text-3xl font-bold text-gray-900">${totalBaseSalary.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Total Bonuses</div>
          <div className="text-3xl font-bold text-green-600">${totalBonus.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Total Benefits</div>
          <div className="text-3xl font-bold text-blue-600">${totalBenefits.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Grand Total</div>
          <div className="text-3xl font-bold text-purple-600">${grandTotal.toLocaleString()}</div>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="bg-white rounded-lg border border-gray-200 mb-6">
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, ID, subject, or class..."
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
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="w-4 h-4" />
              Add Teacher
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-y border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Teacher ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Classes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Experience</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Qualification</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Base Salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Bonus</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Benefits</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentTeachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{teacher.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{teacher.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{teacher.subject}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{teacher.classes}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{teacher.experience} yrs</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{teacher.qualification}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{teacher.baseSalary}</td>
                  <td className="px-6 py-4 text-sm text-green-600 font-medium">{teacher.bonus}</td>
                  <td className="px-6 py-4 text-sm text-blue-600 font-medium">{teacher.benefits}</td>
                  <td className="px-6 py-4 text-sm font-bold text-purple-600">{teacher.total}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      {teacher.status}
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
            Showing {indexOfFirstTeacher + 1} to {Math.min(indexOfLastTeacher, filteredTeachers.length)} of {filteredTeachers.length} teachers
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

      {/* Salary Structure Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">💡 Salary Calculation</h3>
        <p className="text-sm text-gray-700 mb-3">Teacher salaries are calculated based on:</p>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>• <strong>Base Salary:</strong> Determined by subject expertise, qualifications (PhD, Masters, etc.), and classes taught</li>
          <li>• <strong>Bonus:</strong> Performance-based incentive ranging from 10-20% of base salary, increases with experience</li>
          <li>• <strong>Benefits:</strong> Includes health insurance, provident fund, and allowances (typically 10-15% of base salary)</li>
          <li>• <strong>Experience Factor:</strong> Higher experience (15+ years) results in higher base salary and bonuses</li>
        </ul>
      </div>
    </div>
  );
};

export default TeachingStaffDetails;