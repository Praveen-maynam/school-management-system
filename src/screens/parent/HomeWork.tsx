
     




import React, { useState } from 'react';
import { Filter, FileText, Paperclip, X, CheckCircle, Clock, AlertCircle, Calendar } from 'lucide-react';

// Define the Homework type
interface Homework {
  id: number;
  subject: string;
  homework: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'overdue';
  description: string;
  teacherRemarks: string | null;
  attachments: string[];
  submissionDate: string | null;
}

export default function HomeworkScreen() {
  const [selectedStudent, setSelectedStudent] = useState('aarav');
  const [selectedHomework, setSelectedHomework] = useState<Homework | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const students = [
    { id: 'aarav', name: 'Aarav', class: 'Class 8 A' },
    { id: 'ananya', name: 'Ananya', class: 'Class 5 B' }
  ];

  const homeworkData = {
    pending: 2,
    submitted: 4,
    overdue: 1
  };

  const homeworkList: Homework[] = [
    {
      id: 1,
      subject: 'Mathematics',
      homework: 'Complete Chapter 5 Exercises - Questions 1-15',
      dueDate: '10 Feb 2026',
      status: 'pending',
      description: 'Solve all problems from Exercise 5.2 in your textbook. Show all working steps clearly.',
      teacherRemarks: 'Focus on word problems',
      attachments: ['chapter5_exercises.pdf'],
      submissionDate: null
    },
    {
      id: 2,
      subject: 'English',
      homework: 'Write an essay on "Digital India"',
      dueDate: '8 Feb 2026',
      status: 'submitted',
      description: 'Write a 500-word essay discussing the impact of digitalization in India. Include examples and your personal perspective.',
      teacherRemarks: 'Well written! Good use of examples.',
      attachments: [],
      submissionDate: '7 Feb 2026'
    },
    {
      id: 3,
      subject: 'Science',
      homework: 'Lab Report - Chemical Reactions',
      dueDate: '5 Feb 2026',
      status: 'overdue',
      description: 'Complete the lab report based on the chemical reactions experiment conducted in class.',
      teacherRemarks: 'Please submit urgently',
      attachments: ['lab_template.pdf'],
      submissionDate: null
    },
    {
      id: 4,
      subject: 'Social Studies',
      homework: 'Map work - Indian States',
      dueDate: '12 Feb 2026',
      status: 'pending',
      description: 'Mark all Indian states and their capitals on the outline map provided.',
      teacherRemarks: null,
      attachments: ['india_map.pdf'],
      submissionDate: null
    },
    {
      id: 5,
      subject: 'Hindi',
      homework: 'Read Chapter 3 and answer questions',
      dueDate: '6 Feb 2026',
      status: 'submitted',
      description: 'Read "Premchand ki Kahaniyan" Chapter 3 and answer the questions at the end.',
      teacherRemarks: 'Good effort!',
      attachments: [],
      submissionDate: '5 Feb 2026'
    },
    {
      id: 6,
      subject: 'Computer Science',
      homework: 'Create a Python program for calculator',
      dueDate: '9 Feb 2026',
      status: 'submitted',
      description: 'Write a Python program that performs basic calculator operations: addition, subtraction, multiplication, and division.',
      teacherRemarks: 'Excellent code structure!',
      attachments: [],
      submissionDate: '8 Feb 2026'
    },
    {
      id: 7,
      subject: 'Art',
      homework: 'Sketch a landscape',
      dueDate: '7 Feb 2026',
      status: 'submitted',
      description: 'Create a landscape sketch using pencil shading techniques learned in class.',
      teacherRemarks: 'Beautiful shading!',
      attachments: [],
      submissionDate: '6 Feb 2026'
    }
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'overdue':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'overdue':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const openDetailModal = (homework: Homework) => {
    setSelectedHomework(homework);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedHomework(null);
  };

  const currentStudent = students.find(s => s.id === selectedStudent);
  const totalHomework = homeworkList.length;
  const allSubmitted = homeworkData.pending === 0 && homeworkData.overdue === 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Top Header - Sticky */}
      <div className="sticky top-0 z-10 bg-white border-b border-orange-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Homework</h1>
              <p className="text-sm text-gray-600 mt-1">Daily & subject-wise homework tracking</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Student Selector */}
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="px-4 py-2 border border-orange-300 rounded-lg bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name} – {student.class}
                  </option>
                ))}
              </select>
              {/* Filter Icon */}
              <button className="p-2 border border-orange-300 rounded-lg bg-white hover:bg-orange-50 transition-colors">
                <Filter className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Pending Homework Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 border-2 border-amber-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">Pending Homework</div>
                <div className="text-xs text-amber-600 mt-0.5">Needs attention</div>
              </div>
            </div>
            <div className="text-4xl font-bold text-amber-600">{homeworkData.pending}</div>
          </div>

          {/* Submitted Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 border-2 border-green-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">Submitted</div>
                <div className="text-xs text-green-600 mt-0.5">Completed</div>
              </div>
            </div>
            <div className="text-4xl font-bold text-green-600">{homeworkData.submitted}</div>
          </div>

          {/* Overdue Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 border-2 border-red-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">Overdue</div>
                <div className="text-xs text-red-600 mt-0.5">Past due date</div>
              </div>
            </div>
            <div className="text-4xl font-bold text-red-600">{homeworkData.overdue}</div>
          </div>
        </div>

        {/* All Submitted State */}
        {allSubmitted && totalHomework > 0 && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-md p-12 text-center mb-8 border-2 border-green-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-green-900 mb-2">✅ Great job! All homework completed</h3>
            <p className="text-green-700">Keep up the excellent work!</p>
          </div>
        )}

        {/* Empty State - No Homework */}
        {totalHomework === 0 ? (
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl shadow-md p-12 text-center border-2 border-orange-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
              <FileText className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-orange-900 mb-2">🎉 No homework assigned today</h3>
            <p className="text-orange-700">Enjoy your free time!</p>
          </div>
        ) : (
          /* Homework Table */
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
              <h2 className="text-lg font-semibold text-gray-900">Homework List</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-orange-50 border-b border-orange-200 sticky top-0">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Homework</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Due Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {homeworkList.map((hw, index) => (
                    <tr 
                      key={hw.id} 
                      className={`${index % 2 === 0 ? 'bg-white' : 'bg-orange-50/30'} hover:bg-orange-100/50 cursor-pointer transition-colors`}
                      onClick={() => openDetailModal(hw)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-semibold text-gray-900">{hw.subject}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-700 max-w-md truncate">{hw.homework}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          {hw.dueDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(hw.status)}`}>
                          {getStatusIcon(hw.status)}
                          {hw.status.charAt(0).toUpperCase() + hw.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedHomework && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div>
                <h3 className="text-xl font-bold">{selectedHomework.subject}</h3>
                <p className="text-sm text-orange-100 mt-1">Homework Details</p>
              </div>
              <button 
                onClick={closeDetailModal}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Homework Title */}
              <div>
                <div className="text-sm font-medium text-gray-600 mb-2">Homework</div>
                <div className="text-lg font-semibold text-gray-900">{selectedHomework.homework}</div>
              </div>

              {/* Description */}
              <div>
                <div className="text-sm font-medium text-gray-600 mb-2">Description</div>
                <div className="text-gray-700 bg-orange-50 rounded-lg p-4 border border-orange-200">
                  {selectedHomework.description}
                </div>
              </div>

              {/* Due Date & Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-2">Due Date</div>
                  <div className="flex items-center gap-2 text-gray-900 font-semibold">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    {selectedHomework.dueDate}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-2">Status</div>
                  <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border ${getStatusStyle(selectedHomework.status)}`}>
                    {getStatusIcon(selectedHomework.status)}
                    {selectedHomework.status.charAt(0).toUpperCase() + selectedHomework.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Submission Date */}
              {selectedHomework.submissionDate && (
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-2">Submitted On</div>
                  <div className="flex items-center gap-2 text-green-700 font-semibold bg-green-50 rounded-lg p-3 border border-green-200">
                    <CheckCircle className="w-5 h-5" />
                    {selectedHomework.submissionDate}
                  </div>
                </div>
              )}

              {/* Teacher Remarks */}
              {selectedHomework.teacherRemarks && (
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-2">Teacher Remarks</div>
                  <div className="text-gray-700 bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                    💬 {selectedHomework.teacherRemarks}
                  </div>
                </div>
              )}

              {/* Attachments */}
              {selectedHomework.attachments.length > 0 && (
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-3">Attachments</div>
                  <div className="space-y-2">
                    {selectedHomework.attachments.map((file, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                        <Paperclip className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-700 font-medium flex-1">{file}</span>
                        <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex items-center justify-end gap-3 rounded-b-2xl border-t border-gray-200">
              <button 
                onClick={closeDetailModal}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
              {selectedHomework.status !== 'submitted' && (
                <button className="px-6 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors">
                  Mark as Submitted
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}