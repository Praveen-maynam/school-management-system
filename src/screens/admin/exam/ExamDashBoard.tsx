import React, { useState, useMemo } from 'react';
import { Filter, Copy, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExamDashboard = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [selectedTerm, setSelectedTerm] = useState('All Terms');
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [selectedStatus, setSelectedStatus] = useState('All Status');

  const allExams = useMemo(() => [
    {
      id: 1,
      name: 'Final Examination 2024',
      type: 'Final exam',
      year: '2023-2024',
      term: 'Term 3',
      classes: ['9th', '10th', '12'],
      duration: 'May 15 - May 30',
      days: '16 days',
      status: 'Scheduled',
      icon: 'B',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Mid-Term Examination',
      type: 'Mid-Term',
      year: '2023-2024',
      term: 'Term 2',
      classes: ['8th', '10th', '11th'],
      duration: 'Mar 10 - Mar 22',
      days: '12 days',
      status: 'Ongoing',
      icon: 'M',
      color: 'bg-purple-500'
    },
    {
      id: 3,
      name: 'Unit Test 3',
      type: 'Monthly Assessment',
      year: '2023-2024',
      term: 'Term 2',
      classes: ['8th', '10th'],
      duration: 'Feb 20 - Feb 25',
      days: '5 days',
      status: 'Completed',
      icon: 'U',
      color: 'bg-green-600'
    },
    {
      id: 4,
      name: 'Unit Test 2',
      type: 'Monthly Assessment',
      year: '2023-2024',
      term: 'Term 2',
      classes: ['All'],
      duration: 'Jan 15 - Jan 20',
      days: '5 days',
      status: 'Completed',
      icon: 'U',
      color: 'bg-orange-500'
    },
    {
      id: 5,
      name: 'Pre-Board Examination',
      type: 'Mock Board Exam',
      year: '2023-2024',
      term: 'Term 3',
      classes: ['10th', '12th'],
      duration: 'Apr 5 - Apr 18',
      days: '13 days',
      status: 'Draft',
      icon: 'P',
      color: 'bg-red-500'
    },
    {
      id: 6,
      name: 'Unit Test 1',
      type: 'Monthly Assessment',
      year: '2022-2023',
      term: 'Term 1',
      classes: ['8th', '9th', '10th'],
      duration: 'Nov 10 - Nov 15',
      days: '5 days',
      status: 'Completed',
      icon: 'U',
      color: 'bg-orange-500'
    },
    {
      id: 7,
      name: 'Annual Examination 2023',
      type: 'Annual exam',
      year: '2022-2023',
      term: 'Term 3',
      classes: ['11th', '12th'],
      duration: 'Apr 1 - Apr 20',
      days: '19 days',
      status: 'Completed',
      icon: 'A',
      color: 'bg-indigo-500'
    }
  ], []);

  // Dynamic filtering
  const filteredExams = useMemo(() => {
    return allExams.filter(exam => {
      // Filter by Academic Year
      if (selectedYear !== 'All Years' && exam.year !== selectedYear) {
        return false;
      }

      // Filter by Term
      if (selectedTerm !== 'All Terms' && exam.term !== selectedTerm) {
        return false;
      }

      // Filter by Class
      if (selectedClass !== 'All Classes') {
        // Check if the exam includes the selected class or has "All"
        if (!exam.classes.includes(selectedClass) && !exam.classes.includes('All')) {
          return false;
        }
      }

      // Filter by Status
      if (selectedStatus !== 'All Status' && exam.status !== selectedStatus) {
        return false;
      }

      return true;
    });
  }, [allExams, selectedYear, selectedTerm, selectedClass, selectedStatus]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Scheduled': return 'bg-green-100 text-green-700';
      case 'Ongoing': return 'bg-blue-100 text-blue-700';
      case 'Completed': return 'bg-gray-100 text-gray-700';
      case 'Draft': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Tabs */}
        <div className="flex items-center space-x-8 mb-6 border-b border-gray-200">
          <button className="pb-3 px-1 text-blue-600 border-b-2 border-blue-600 font-medium">Exams</button>
          <button 
            onClick={() => navigate('/admin/exams/schedule')}
            className="pb-3 px-1 text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-300"
          >
            Schedule
          </button>
          <button 
            onClick={() => navigate('/admin/exams/marks')}
            className="pb-3 px-1 text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-300"
          >
            Marks Control
          </button>
          <button 
            onClick={() => navigate('/admin/exams/grade-config')}
            className="pb-3 px-1 text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-300"
          >
            Grade Config
          </button>
          <button 
            onClick={() => navigate('/admin/exams/results')}
            className="pb-3 px-1 text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-300"
          >
            Results
          </button>
          {/* <button className="pb-3 px-1 text-gray-600 hover:text-gray-900">Reports</button> */}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="grid grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                aria-label="Academic Year"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>All Years</option>
                <option>2023-2024</option>
                <option>2022-2023</option>
                <option>2024-2025</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Term</label>
              <select 
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                aria-label="Term"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>All Terms</option>
                <option>Term 1</option>
                <option>Term 2</option>
                <option>Term 3</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
              <select 
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                aria-label="Class"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>All Classes</option>
                <option>8th</option>
                <option>9th</option>
                <option>10th</option>
                <option>11th</option>
                <option>12th</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                aria-label="Status"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>All Status</option>
                <option>Scheduled</option>
                <option>Ongoing</option>
                <option>Completed</option>
                <option>Draft</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                onClick={() => {
                  setSelectedYear('All Years');
                  setSelectedTerm('All Terms');
                  setSelectedClass('All Classes');
                  setSelectedStatus('All Status');
                }}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center justify-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>
          
          {/* Active Filters Display */}
          {(selectedYear !== 'All Years' || selectedTerm !== 'All Terms' || selectedClass !== 'All Classes' || selectedStatus !== 'All Status') && (
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Active filters:</span>
              {selectedYear !== 'All Years' && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                  Year: {selectedYear}
                </span>
              )}
              {selectedTerm !== 'All Terms' && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                  {selectedTerm}
                </span>
              )}
              {selectedClass !== 'All Classes' && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                  Class: {selectedClass}
                </span>
              )}
              {selectedStatus !== 'All Status' && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                  {selectedStatus}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Exam Table */}
        <div className="bg-white rounded-lg mb-6 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left w-12">
                    <input type="checkbox" className="rounded border-gray-300" title="Select all exams" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Academic Year</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Term</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredExams.length > 0 ? (
                  filteredExams.map((exam) => (
                    <tr key={exam.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input type="checkbox" className="rounded border-gray-300" title={`Select ${exam.name}`} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 ${exam.color} rounded flex items-center justify-center text-white font-bold text-lg`}>
                            {exam.icon}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{exam.name}</div>
                            <div className="text-sm text-gray-500">{exam.type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{exam.year}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{exam.term}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {exam.classes.map((cls, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                              {cls}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{exam.duration}</div>
                        <div className="text-xs text-gray-500">{exam.days}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(exam.status)}`}>
                          {exam.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-1.5 hover:bg-gray-100 rounded" title="Copy"><Copy className="w-4 h-4 text-gray-600" /></button>
                          <button className="p-1.5 hover:bg-gray-100 rounded" title="Edit"><Edit className="w-4 h-4 text-gray-600" /></button>
                          <button className="p-1.5 hover:bg-gray-100 rounded" title="Delete"><Trash2 className="w-4 h-4 text-gray-600" /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <p className="text-lg font-medium">No exams found</p>
                        <p className="text-sm mt-1">Try adjusting your filters to see more results</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {filteredExams.length > 0 ? '1' : '0'} to {Math.min(5, filteredExams.length)} of {filteredExams.length} exams
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50" disabled={filteredExams.length === 0}>&lt;</button>
              <button className="px-3 py-1.5 bg-blue-600 text-white rounded">1</button>
              <button className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50" disabled={filteredExams.length <= 5}>2</button>
              <button className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50" disabled={filteredExams.length <= 10}>3</button>
              <button className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50" disabled={filteredExams.length <= 5}>&gt;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamDashboard;