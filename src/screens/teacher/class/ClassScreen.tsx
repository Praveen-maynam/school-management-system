import React, { useState } from 'react';
import { GraduationCap, Users, CheckSquare, Award, BookOpen, Plus, X, ChevronRight, AlertCircle, Clock, TrendingUp } from 'lucide-react';

function MyClassesScreen() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const classes = [
    {
      id: 1,
      class: '8-A',
      subject: 'Mathematics',
      role: 'Class Teacher',
      totalStudents: 42,
      alerts: [{ type: 'attendance', message: 'Attendance pending for today' }],
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'from-blue-50 to-indigo-50',
      icon: '📐',
      recentlyOpened: true
    },
    {
      id: 2,
      class: '9-B',
      subject: 'Mathematics',
      role: 'Subject Teacher',
      totalStudents: 38,
      alerts: [],
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'from-blue-50 to-indigo-50',
      icon: '📐',
      recentlyOpened: false
    },
    {
      id: 3,
      class: '10-C',
      subject: 'Physics',
      role: 'Subject Teacher',
      totalStudents: 35,
      alerts: [{ type: 'marks', message: 'Unit Test 2 marks pending' }],
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      icon: '⚛️',
      recentlyOpened: false
    },
    {
      id: 4,
      class: '7-A',
      subject: 'Mathematics',
      role: 'Subject Teacher',
      totalStudents: 40,
      alerts: [],
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'from-blue-50 to-indigo-50',
      icon: '📐',
      recentlyOpened: true
    },
    {
      id: 5,
      class: '8-B',
      subject: 'Science',
      role: 'Subject Teacher',
      totalStudents: 36,
      alerts: [],
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      icon: '🔬',
      recentlyOpened: false
    }
  ];

  const availableClasses = ['6-A', '6-B', '7-A', '7-B', '8-A', '8-B', '9-A', '9-B', '10-A', '10-B'];
  const availableSubjects = [
    { name: 'Mathematics', color: 'blue', icon: '📐' },
    { name: 'Science', color: 'green', icon: '🔬' },
    { name: 'Physics', color: 'purple', icon: '⚛️' },
    { name: 'Chemistry', color: 'pink', icon: '🧪' },
    { name: 'English', color: 'orange', icon: '📚' },
    { name: 'Hindi', color: 'amber', icon: '✍️' },
    { name: 'Social Studies', color: 'teal', icon: '🌍' }
  ];

  const handleAddClass = () => {
    if (!selectedClass || !selectedSubject || !selectedRole) {
      alert('⚠️ Please fill in all fields');
      return;
    }
    alert(`✅ Class added successfully!\nClass: ${selectedClass}\nSubject: ${selectedSubject}\nRole: ${selectedRole}`);
    setShowAddModal(false);
    setSelectedClass('');
    setSelectedSubject('');
    setSelectedRole('');
  };

  const handleClassClick = (classData: any) => {
    // Navigate to class workspace
    console.log('Opening class:', classData);
    alert(`Opening ${classData.class} - ${classData.subject}`);
  };

  const sortedClasses = [...classes].sort((a, b) => {
    if (a.recentlyOpened && !b.recentlyOpened) return -1;
    if (!a.recentlyOpened && b.recentlyOpened) return 1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-white">
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
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">My Classes</h1>
              <p className="text-emerald-100 text-lg">Classes and subjects assigned to you</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-3 rounded-xl transition-all flex items-center space-x-3 border-2 border-white/30 group"
            >
              <div className="bg-white/20 rounded-lg p-2 group-hover:bg-white/30 transition-all">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <span className="text-white font-bold text-lg">Add Class</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border-2 border-emerald-100 p-6 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl p-3">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-800 mb-1">{classes.length}</p>
            <p className="text-sm text-slate-600 font-medium">Total Classes</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-100 p-6 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl p-3">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-800 mb-1">{classes.reduce((sum, c) => sum + c.totalStudents, 0)}</p>
            <p className="text-sm text-slate-600 font-medium">Total Students</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-100 p-6 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl p-3">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-800 mb-1">{classes.filter(c => c.alerts.length > 0).length}</p>
            <p className="text-sm text-slate-600 font-medium">Pending Actions</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border-2 border-purple-100 p-6 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-800 mb-1">{classes.filter(c => c.role === 'Class Teacher').length}</p>
            <p className="text-sm text-slate-600 font-medium">Class Teacher Of</p>
          </div>
        </div>

        {/* Recently Opened Section */}
        {sortedClasses.some(c => c.recentlyOpened) && (
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="w-5 h-5 text-emerald-600" />
              <h2 className="text-xl font-bold text-slate-800">Recently Opened</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedClasses.filter(c => c.recentlyOpened).map(classData => (
                <ClassCard key={classData.id} classData={classData} onClick={handleClassClick} />
              ))}
            </div>
          </div>
        )}

        {/* All Classes Section */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-800 mb-4">All Classes</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedClasses.map(classData => (
            <ClassCard key={classData.id} classData={classData} onClick={handleClassClick} />
          ))}

          {/* Add Class Card */}
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-white rounded-3xl border-4 border-dashed border-emerald-300 hover:border-emerald-500 p-8 transition-all hover:shadow-xl group min-h-[280px] flex flex-col items-center justify-center"
          >
            <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full p-6 mb-4 group-hover:scale-110 transition-transform">
              <Plus className="w-12 h-12 text-emerald-600" />
            </div>
            <p className="text-lg font-bold text-slate-800 mb-1">Add New Class</p>
            <p className="text-sm text-slate-600">Assign yourself to a class</p>
          </button>
        </div>
      </div>

      {/* Add Class Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 text-white">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    <Plus className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Add New Class</h3>
                    <p className="text-emerald-100 text-sm">Assign yourself to a class and subject</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="bg-white/20 hover:bg-white/30 rounded-lg p-2 transition-all"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            <div className="p-8 space-y-6">
              {/* Class Selection */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Select Class & Section
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                >
                  <option value="">Choose a class...</option>
                  {availableClasses.map(cls => (
                    <option key={cls} value={cls}>Class {cls}</option>
                  ))}
                </select>
              </div>

              {/* Subject Selection */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Select Subject
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-4 py-3 bg-purple-50 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium text-slate-800"
                >
                  <option value="">Choose a subject...</option>
                  {availableSubjects.map(subject => (
                    <option key={subject.name} value={subject.name}>
                      {subject.icon} {subject.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">
                  Your Role
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setSelectedRole('Class Teacher')}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      selectedRole === 'Class Teacher'
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-slate-200 bg-slate-50 hover:border-emerald-300'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 mx-auto ${
                      selectedRole === 'Class Teacher' ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}>
                      <Award className={`w-6 h-6 ${selectedRole === 'Class Teacher' ? 'text-white' : 'text-slate-600'}`} />
                    </div>
                    <p className={`font-bold text-center ${
                      selectedRole === 'Class Teacher' ? 'text-emerald-700' : 'text-slate-700'
                    }`}>
                      Class Teacher
                    </p>
                  </button>

                  <button
                    onClick={() => setSelectedRole('Subject Teacher')}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      selectedRole === 'Subject Teacher'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 bg-slate-50 hover:border-blue-300'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 mx-auto ${
                      selectedRole === 'Subject Teacher' ? 'bg-blue-500' : 'bg-slate-300'
                    }`}>
                      <BookOpen className={`w-6 h-6 ${selectedRole === 'Subject Teacher' ? 'text-white' : 'text-slate-600'}`} />
                    </div>
                    <p className={`font-bold text-center ${
                      selectedRole === 'Subject Teacher' ? 'text-blue-700' : 'text-slate-700'
                    }`}>
                      Subject Teacher
                    </p>
                  </button>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border-2 border-blue-200">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-800 font-medium">
                      <strong>Academic Year:</strong> 2025-26 (Auto-assigned)
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      Your request will be reviewed by the admin before final assignment.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddClass}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl"
                >
                  Add Class
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Class Card Component
function ClassCard({ classData, onClick }: any) {
  return (
    <div
      onClick={() => onClick(classData)}
      className="bg-white rounded-3xl shadow-lg border-2 border-emerald-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group"
    >
      {/* Header with Gradient */}
      <div className={`bg-gradient-to-r ${classData.color} p-6`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-3xl">
              {classData.icon}
            </div>
            <div className="text-white">
              <h3 className="text-2xl font-bold">Class {classData.class}</h3>
              <p className="text-sm opacity-90">{classData.subject}</p>
            </div>
          </div>
          {classData.recentlyOpened && (
            <div className="bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>Recent</span>
            </div>
          )}
        </div>

        <div className={`inline-block px-4 py-1.5 rounded-lg ${
          classData.role === 'Class Teacher' 
            ? 'bg-emerald-400/30 border border-emerald-300' 
            : 'bg-white/20 border border-white/30'
        }`}>
          <p className="text-xs font-bold text-white">{classData.role}</p>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Alerts */}
        {classData.alerts.length > 0 && (
          <div className="mb-4 space-y-2">
            {classData.alerts.map((alert: any, idx: number) => (
              <div key={idx} className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                alert.type === 'attendance' ? 'bg-amber-50 border border-amber-200' : 'bg-rose-50 border border-rose-200'
              }`}>
                <AlertCircle className={`w-4 h-4 flex-shrink-0 ${
                  alert.type === 'attendance' ? 'text-amber-600' : 'text-rose-600'
                }`} />
                <p className={`text-xs font-medium ${
                  alert.type === 'attendance' ? 'text-amber-800' : 'text-rose-800'
                }`}>
                  {alert.message}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Student Count */}
        <div className={`bg-gradient-to-br ${classData.bgColor} rounded-2xl p-4 mb-4 border-2 border-slate-100`}>
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <Users className="w-6 h-6 text-slate-700" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{classData.totalStudents}</p>
              <p className="text-xs text-slate-600 font-medium">Students Enrolled</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2">
          <button className="bg-blue-50 hover:bg-blue-100 rounded-xl p-3 transition-all group/btn flex flex-col items-center">
            <Users className="w-5 h-5 text-blue-600 mb-1 group-hover/btn:scale-110 transition-transform" />
            <span className="text-xs font-bold text-blue-700">Students</span>
          </button>
          <button className="bg-emerald-50 hover:bg-emerald-100 rounded-xl p-3 transition-all group/btn flex flex-col items-center">
            <CheckSquare className="w-5 h-5 text-emerald-600 mb-1 group-hover/btn:scale-110 transition-transform" />
            <span className="text-xs font-bold text-emerald-700">Attendance</span>
          </button>
          <button className="bg-purple-50 hover:bg-purple-100 rounded-xl p-3 transition-all group/btn flex flex-col items-center">
            <Award className="w-5 h-5 text-purple-600 mb-1 group-hover/btn:scale-110 transition-transform" />
            <span className="text-xs font-bold text-purple-700">Marks</span>
          </button>
        </div>

        {/* Open Class Arrow */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-emerald-600 group-hover:text-emerald-700">
          <span className="font-bold text-sm">Open Class</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}

export default MyClassesScreen;