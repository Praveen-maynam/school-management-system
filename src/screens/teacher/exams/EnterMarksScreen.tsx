import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, GraduationCap, HelpCircle, CheckCircle, AlertCircle, Clock, Lock, Unlock, Save, Send, X, Search, User } from 'lucide-react';

function EnterMarksScreen() {
  const [selectedExam, setSelectedExam] = useState('Unit Test 1');
  const [selectedClass, setSelectedClass] = useState('6-A');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [maxMarks, setMaxMarks] = useState('100');
  const [isLocked, setIsLocked] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [students, setStudents] = useState([
    { id: 1, rollNo: '001', name: 'Aarav Sharma', marks: '85', status: 'entered', isAbsent: false },
    { id: 2, rollNo: '002', name: 'Diya Patel', marks: '92', status: 'entered', isAbsent: false },
    { id: 3, rollNo: '003', name: 'Arjun Reddy', marks: '', status: 'pending', isAbsent: false },
    { id: 4, rollNo: '004', name: 'Ananya Singh', marks: '', status: 'pending', isAbsent: true },
    { id: 5, rollNo: '005', name: 'Rohan Kumar', marks: '78', status: 'entered', isAbsent: false },
    { id: 6, rollNo: '006', name: 'Ishita Gupta', marks: '88', status: 'entered', isAbsent: false },
    { id: 7, rollNo: '007', name: 'Kabir Joshi', marks: '75', status: 'entered', isAbsent: false },
    { id: 8, rollNo: '008', name: 'Myra Kapoor', marks: '', status: 'pending', isAbsent: false },
  ]);

  const exams = ['Unit Test 1', 'Unit Test 2', 'Mid Term', 'Final Exam', 'Quarterly Exam'];
  const classes = ['6-A', '6-B', '7-A', '7-B', '8-A', '8-B'];
  const subjects = ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies'];

  const enteredCount = students.filter(s => s.status === 'entered' || s.isAbsent).length;
  const totalCount = students.length;
  const progressPercentage = (enteredCount / totalCount) * 100;

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNo.includes(searchQuery)
  );

  const handleMarksChange = (studentId: number, value: string) => {
    setHasUnsavedChanges(true);
    setStudents(students.map(s => {
      if (s.id === studentId) {
        const isValid = value === '' || (parseInt(value) >= 0 && parseInt(value) <= parseInt(maxMarks));
        return {
          ...s,
          marks: value,
          status: value === '' ? 'pending' : (isValid ? 'entered' : 'error')
        };
      }
      return s;
    }));
  };

  const toggleAbsent = (studentId: number) => {
    setHasUnsavedChanges(true);
    setStudents(students.map(s => 
      s.id === studentId ? { ...s, isAbsent: !s.isAbsent, marks: !s.isAbsent ? '' : s.marks, status: !s.isAbsent ? 'entered' : s.status } : s
    ));
  };

  const handleSaveDraft = () => {
    setHasUnsavedChanges(false);
    // Toast notification here
    alert('✅ Marks saved as draft successfully!');
  };

  const handleSubmitAndLock = () => {
    const pendingCount = students.filter(s => s.status === 'pending').length;
    if (pendingCount > 0) {
      alert(`⚠️ You still have ${pendingCount} pending entries. Please complete all marks before submitting.`);
      return;
    }
    setShowConfirmModal(true);
  };

  const confirmSubmit = () => {
    setIsLocked(true);
    setShowConfirmModal(false);
    setHasUnsavedChanges(false);
    alert('✅ Marks submitted and locked successfully!');
  };

  const getStatusColor = (status: string, isAbsent: boolean) => {
    if (isAbsent) return 'bg-slate-100 text-slate-600';
    switch(status) {
      case 'entered': return 'bg-emerald-100 text-emerald-700';
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'error': return 'bg-rose-100 text-rose-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-emerald-100 px-6 py-3 shadow-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <GraduationCap className="w-8 h-8 text-emerald-600" />
            <span className="text-xl font-semibold text-slate-800">School ERP</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-600">Academic Year: 2025-26</span>
          </div>
        </div>
      </nav>

      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="hover:bg-white/20 p-2 rounded-lg transition-all">
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white">Exams & Marks Entry</h1>
                <p className="text-emerald-100 text-sm mt-1">Enter and manage student marks securely</p>
              </div>
            </div>
            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 p-2 rounded-lg transition-all">
              <HelpCircle className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filter Selection Panel */}
        <div className="bg-white rounded-3xl shadow-lg border-2 border-emerald-100 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-800">Exam Details</h3>
            <p className="text-sm text-slate-600">Select exam context before entering marks</p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 gap-6 mb-4">
              {/* Exam Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Exam / Test Name</label>
                <select 
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  disabled={isLocked}
                  className="w-full px-4 py-3 bg-emerald-50 border-2 border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-slate-800"
                >
                  {exams.map(exam => <option key={exam} value={exam}>{exam}</option>)}
                </select>
              </div>

              {/* Class Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Class & Section</label>
                <select 
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  disabled={isLocked}
                  className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-slate-800"
                >
                  {classes.map(cls => <option key={cls} value={cls}>Class {cls}</option>)}
                </select>
              </div>

              {/* Subject Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
                <select 
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  disabled={isLocked}
                  className="w-full px-4 py-3 bg-purple-50 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-slate-800"
                >
                  {subjects.map(subject => <option key={subject} value={subject}>{subject}</option>)}
                </select>
              </div>

              {/* Max Marks Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Maximum Marks</label>
                <input
                  type="number"
                  value={maxMarks}
                  onChange={(e) => setMaxMarks(e.target.value)}
                  disabled={isLocked}
                  className="w-full px-4 py-3 bg-orange-50 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-slate-800 text-lg"
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border-2 border-blue-200">
              <p className="text-sm text-blue-800 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                <span className="font-medium">Marks will be entered for <strong>{selectedExam}</strong> - Class <strong>{selectedClass}</strong> - <strong>{selectedSubject}</strong></span>
              </p>
            </div>
          </div>
        </div>

        {/* Exam Status Summary */}
        <div className="bg-white rounded-3xl shadow-lg border-2 border-emerald-100 overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">Entry Progress</h3>
                <p className="text-sm text-slate-600">Track your marks entry completion</p>
              </div>
              <div className={`px-4 py-2 rounded-xl flex items-center space-x-2 ${isLocked ? 'bg-red-100 border-2 border-red-300' : 'bg-emerald-100 border-2 border-emerald-300'}`}>
                {isLocked ? (
                  <>
                    <Lock className="w-5 h-5 text-red-600" />
                    <span className="font-bold text-red-700">Locked</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-5 h-5 text-emerald-600" />
                    <span className="font-bold text-emerald-700">Editable</span>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border-2 border-emerald-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-slate-600">Marks Entered</p>
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <p className="text-3xl font-bold text-emerald-700">{enteredCount} / {totalCount}</p>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border-2 border-amber-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-slate-600">Pending Entries</p>
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                </div>
                <p className="text-3xl font-bold text-amber-700">{totalCount - enteredCount} Students</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border-2 border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-slate-600">Last Updated</p>
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-lg font-bold text-blue-700">Today, 11:40 AM</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-600">Overall Progress</span>
                <span className="text-sm font-bold text-emerald-600">{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-4 rounded-full transition-all duration-500 shadow-lg"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Student Marks Table */}
        <div className="bg-white rounded-3xl shadow-lg border-2 border-emerald-100 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Student Marks</h3>
                <p className="text-sm text-slate-600">Enter marks for each student</p>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search student..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100 border-b-2 border-slate-200 sticky top-0">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Roll No</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Student Name</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-slate-700">Marks (out of {maxMarks})</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-slate-700">Absent</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-slate-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr 
                    key={student.id} 
                    className={`border-b border-slate-100 hover:bg-emerald-50 transition-colors ${student.status === 'error' ? 'bg-rose-50' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold text-slate-700">{student.rollNo}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                          {student.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-slate-800">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={student.isAbsent ? 'AB' : student.marks}
                        onChange={(e) => handleMarksChange(student.id, e.target.value)}
                        disabled={isLocked || student.isAbsent}
                        placeholder="0"
                        className={`w-24 px-4 py-2 border-2 rounded-lg text-center font-bold text-lg focus:outline-none focus:ring-2 mx-auto block disabled:opacity-50 disabled:cursor-not-allowed ${
                          student.status === 'error' 
                            ? 'border-rose-300 bg-rose-50 text-rose-700 focus:ring-rose-500' 
                            : student.isAbsent
                            ? 'border-slate-200 bg-slate-100 text-slate-500'
                            : 'border-emerald-200 bg-emerald-50 text-emerald-700 focus:ring-emerald-500'
                        }`}
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => toggleAbsent(student.id)}
                        disabled={isLocked}
                        className={`px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                          student.isAbsent 
                            ? 'bg-slate-600 text-white hover:bg-slate-700' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {student.isAbsent ? 'AB' : 'Present'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(student.status, student.isAbsent)}`}>
                        {student.isAbsent ? (
                          <>
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Absent
                          </>
                        ) : student.status === 'entered' ? (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Entered
                          </>
                        ) : student.status === 'error' ? (
                          <>
                            <X className="w-3 h-3 mr-1" />
                            Invalid
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3 mr-1" />
                            Pending
                          </>
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Bar - Sticky Bottom */}
        {!isLocked && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-emerald-200 shadow-2xl p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {hasUnsavedChanges && (
                  <div className="flex items-center space-x-2 text-amber-600">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">You have unsaved changes</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleSaveDraft}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-bold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg hover:shadow-xl flex items-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>Save Draft</span>
                </button>
                <button 
                  onClick={handleSubmitAndLock}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl flex items-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Submit & Lock</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Confirm Submission</h3>
                  <p className="text-amber-100 text-sm">Please review before locking</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-slate-700 mb-6 leading-relaxed">
                Once you submit and lock the marks, <strong>they cannot be edited</strong>. Please ensure all marks are correct before proceeding.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSubmit}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg"
                >
                  Yes, Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EnterMarksScreen;