import React, { useState } from 'react';
import { ChevronRight, Search, BarChart3, TrendingUp, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// Type Definitions
type ClassName = "Class 6-A" | "Class 6-B" | "Class 7-A" | "Class 7-B" | "Class 8-A";

interface Student {
  id: number;
  name: string;
  rollNo: number;
  attendance: number;
  class: ClassName;
}


const StudentListByClassScreen = () => {
  // State Management
  const [selectedClass, setSelectedClass] = useState<ClassName>("Class 6-A");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
const navigate = useNavigate();
  // Data Constants
  const classes: ClassName[] = [
    "Class 6-A",
    "Class 6-B",
    "Class 7-A",
    "Class 7-B",
    "Class 8-A",
  ];

  const classStats: Record<ClassName, { total: number; boys: number; girls: number }> = {
    "Class 6-A": { total: 40, boys: 22, girls: 18 },
    "Class 6-B": { total: 38, boys: 20, girls: 18 },
    "Class 7-A": { total: 42, boys: 23, girls: 19 },
    "Class 7-B": { total: 39, boys: 21, girls: 18 },
    "Class 8-A": { total: 45, boys: 24, girls: 21 },
  };

  const students: Student[] = [
    { id: 1, name: 'Aarav Sharma', rollNo: 22, attendance: 85, class: 'Class 6-A' },
    { id: 2, name: 'Priya Patel', rollNo: 15, attendance: 92, class: 'Class 6-A' },
    { id: 3, name: 'Rohan Kumar', rollNo: 8, attendance: 78, class: 'Class 6-A' },
    { id: 4, name: 'Ananya Singh', rollNo: 31, attendance: 88, class: 'Class 6-A' },
    { id: 5, name: 'Arjun Reddy', rollNo: 12, attendance: 95, class: 'Class 6-A' },
    { id: 6, name: 'Kavya Iyer', rollNo: 27, attendance: 82, class: 'Class 6-A' },
  ];

  const studentDetails = {
    attendance: {
      thisMonth: 80,
      overall: 85
    },
    termProgress: [
      { subject: 'Maths', term1: 85, term2: 90 },
      { subject: 'Science', term1: 78, term2: 92 },
      { subject: 'English', term1: 88, term2: 85 },
      { subject: 'History', term1: 82, term2: 88 },
      { subject: 'Geography', term1: 90, term2: 95 }
    ],
    recentTests: [
      { subject: 'Science', marks: 45, total: 50, date: '2025-12-20' },
      { subject: 'Maths', marks: 48, total: 50, date: '2025-12-18' },
      { subject: 'English', marks: 42, total: 50, date: '2025-12-15' }
    ]
  };

  // Derived Values
  const currentStats = classStats[selectedClass];
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNo.toString().includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold">Student Details</h1>
          <p className="text-blue-100 mt-1">Manage and view student information</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Student List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Class Selector */}
              <div className="p-6 border-b border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Class
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value as ClassName)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800 text-lg"
                >
                  {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-3 gap-4 p-6 bg-blue-50">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">{currentStats.total}</div>
                  <div className="text-sm text-gray-600 mt-1">Total Students</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">{currentStats.boys}</div>
                  <div className="text-sm text-gray-600 mt-1">Boys</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">{currentStats.girls}</div>
                  <div className="text-sm text-gray-600 mt-1">Girls</div>
                </div>
              </div>

              {/* Search Bar */}
              <div className="p-6 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search by name or roll number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Student List */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{selectedClass} Students</h3>
                <div className="space-y-3">
                  {filteredStudents.map(student => (
                    <div
                      key={student.id}
                     onClick={() => navigate ('/teacher/students/profile/' + student.id)}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-blue-50 cursor-pointer transition group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">{student.name}</div>
                          <div className="text-sm text-gray-500">Roll No: {student.rollNo}</div>
                        </div>
                      </div>
                      <ChevronRight className="text-gray-400 group-hover:text-blue-600 transition" size={24} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Student Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              {selectedStudent ? (
                <div className="space-y-6">
                  {/* Student Header */}
                  <div className="text-center pb-6 border-b border-gray-200">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">
                      {selectedStudent.name.charAt(0)}
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">{selectedStudent.name}</h2>
                    <p className="text-gray-500">{selectedClass}</p>
                    <p className="text-sm text-gray-400 mt-1">Roll No: {selectedStudent.rollNo}</p>
                  </div>

                  {/* Attendance */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="text-blue-600" size={20} />
                      <h3 className="font-bold text-gray-800">Attendance</h3>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="text-center mb-2">
                        <div className="text-sm text-gray-600">This Month</div>
                        <div className="text-4xl font-bold text-blue-600">{studentDetails.attendance.thisMonth}%</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className="bg-blue-600 h-full rounded-full transition-all"
                          style={{ width: `${studentDetails.attendance.thisMonth}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Term-wise Progress */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <BarChart3 className="text-blue-600" size={20} />
                      <h3 className="font-bold text-gray-800">Term-wise Progress</h3>
                    </div>
                    <div className="space-y-3">
                      {studentDetails.termProgress.map(subject => (
                        <div key={subject.subject} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold text-gray-700">{subject.subject}</span>
                            <span className="text-xs text-gray-500">Term 1 vs Term 2</span>
                          </div>
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-400 rounded-full"
                                  style={{ width: `${subject.term1}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-center mt-1 text-gray-600">{subject.term1}%</div>
                            </div>
                            <div className="flex-1">
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-600 rounded-full"
                                  style={{ width: `${subject.term2}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-center mt-1 text-gray-600">{subject.term2}%</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Test Results */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="text-blue-600" size={20} />
                      <h3 className="font-bold text-gray-800">Recent Test Results</h3>
                    </div>
                    <div className="space-y-2">
                      {studentDetails.recentTests.map((test, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
                          <div>
                            <div className="font-semibold text-gray-800">{test.subject}</div>
                            <div className="text-xs text-gray-500">{test.date}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-blue-600">{test.marks}/{test.total}</div>
                            <div className="text-xs text-gray-500">{Math.round((test.marks/test.total)*100)}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="text-gray-400" size={32} />
                  </div>
                  <p className="text-gray-500">Select a student to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentListByClassScreen;