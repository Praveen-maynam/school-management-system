import React, { useState } from 'react';
import { BookOpen, Plus, Upload, Calendar, Clock, Users, FileText, Edit2, Trash2, Eye, Award, TrendingUp, BarChart3, Download, Filter, Search, ChevronDown, X, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

export default function OfflineExamManagement() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMarksModal, setShowMarksModal] = useState(false);

  const stats = [
    { 
      label: 'Total Exams', 
      value: '48', 
      icon: BookOpen, 
      gradient: 'from-violet-500 to-purple-600',
      lightBg: 'from-violet-50 to-purple-50',
      iconBg: 'bg-gradient-to-br from-violet-400 to-purple-500',
      textColor: 'text-violet-700'
    },
    { 
      label: 'Upcoming Exams', 
      value: '12', 
      icon: Calendar, 
      gradient: 'from-emerald-500 to-teal-600',
      lightBg: 'from-emerald-50 to-teal-50',
      iconBg: 'bg-gradient-to-br from-emerald-400 to-teal-500',
      textColor: 'text-emerald-700'
    },
    { 
      label: 'Ongoing Exams', 
      value: '5', 
      icon: Clock, 
      gradient: 'from-amber-500 to-orange-600',
      lightBg: 'from-amber-50 to-orange-50',
      iconBg: 'bg-gradient-to-br from-amber-400 to-orange-500',
      textColor: 'text-amber-700'
    },
    { 
      label: 'Completed Exams', 
      value: '31', 
      icon: CheckCircle, 
      gradient: 'from-blue-500 to-cyan-600',
      lightBg: 'from-blue-50 to-cyan-50',
      iconBg: 'bg-gradient-to-br from-blue-400 to-cyan-500',
      textColor: 'text-blue-700'
    }
  ];

  const exams = [
    { 
      id: 1, 
      name: 'Mid Term Examination', 
      class: 'Class 8 - A', 
      subject: 'Mathematics', 
      date: '15 Feb 2026', 
      time: '10:00 AM - 1:00 PM', 
      totalMarks: 100, 
      status: 'Upcoming',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-teal-50',
      statusColor: 'bg-emerald-500'
    },
    { 
      id: 2, 
      name: 'Unit Test - Chapter 1-5', 
      class: 'Class 10 - B', 
      subject: 'Physics', 
      date: '11 Feb 2026', 
      time: '9:00 AM - 11:00 AM', 
      totalMarks: 50, 
      status: 'Ongoing',
      bgColor: 'bg-gradient-to-br from-amber-50 to-orange-50',
      statusColor: 'bg-amber-500'
    },
    { 
      id: 3, 
      name: 'Final Semester Exam', 
      class: 'Class 12 - A', 
      subject: 'Chemistry', 
      date: '08 Feb 2026', 
      time: '2:00 PM - 5:00 PM', 
      totalMarks: 100, 
      status: 'Marks Pending',
      bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50',
      statusColor: 'bg-blue-500'
    },
    { 
      id: 4, 
      name: 'Weekly Assessment', 
      class: 'Class 7 - C', 
      subject: 'English', 
      date: '05 Feb 2026', 
      time: '11:00 AM - 12:30 PM', 
      totalMarks: 30, 
      status: 'Result Published',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
      statusColor: 'bg-purple-500'
    },
    { 
      id: 5, 
      name: 'Practical Examination', 
      class: 'Class 9 - A', 
      subject: 'Biology', 
      date: '20 Feb 2026', 
      time: '1:00 PM - 3:00 PM', 
      totalMarks: 50, 
      status: 'Upcoming',
      bgColor: 'bg-gradient-to-br from-rose-50 to-red-50',
      statusColor: 'bg-emerald-500'
    }
  ];

  const students = [
    { rollNo: '001', name: 'Aarav Kumar', marks: 85, grade: 'A', status: 'Pass' },
    { rollNo: '002', name: 'Diya Sharma', marks: 92, grade: 'A+', status: 'Pass' },
    { rollNo: '003', name: 'Rohan Patel', marks: 28, grade: 'F', status: 'Fail' },
    { rollNo: '004', name: 'Ananya Singh', marks: 78, grade: 'B+', status: 'Pass' },
    { rollNo: '005', name: 'Vivaan Reddy', marks: null, grade: '-', status: 'Absent' }
  ];

  const getStatusConfig = (status: string) => {
    const configs = {
      'Upcoming': { 
        icon: Calendar, 
        color: 'bg-gradient-to-r from-emerald-500 to-teal-500', 
        textColor: 'text-emerald-700',
        borderColor: 'border-emerald-200',
        bgLight: 'bg-emerald-50'
      },
      'Ongoing': { 
        icon: Clock, 
        color: 'bg-gradient-to-r from-amber-500 to-orange-500', 
        textColor: 'text-amber-700',
        borderColor: 'border-amber-200',
        bgLight: 'bg-amber-50'
      },
      'Marks Pending': { 
        icon: FileText, 
        color: 'bg-gradient-to-r from-blue-500 to-cyan-500', 
        textColor: 'text-blue-700',
        borderColor: 'border-blue-200',
        bgLight: 'bg-blue-50'
      },
      'Result Published': { 
        icon: Award, 
        color: 'bg-gradient-to-r from-purple-500 to-pink-500', 
        textColor: 'text-purple-700',
        borderColor: 'border-purple-200',
        bgLight: 'bg-purple-50'
      },
      'Cancelled': { 
        icon: XCircle, 
        color: 'bg-gradient-to-r from-red-500 to-rose-500', 
        textColor: 'text-red-700',
        borderColor: 'border-red-200',
        bgLight: 'bg-red-50'
      }
    } as const;
    return configs[status as keyof typeof configs] || configs['Upcoming'];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* ANIMATED BACKGROUND ELEMENTS */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* PAGE HEADER - Vibrant Gradient */}
        <div className="relative bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 opacity-5"></div>
          <div className="relative p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-2xl shadow-lg shadow-purple-500/50 transform hover:scale-105 transition-transform duration-300">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-black bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
                    Offline Exam Management
                  </h1>
                  <p className="text-slate-600 text-lg">Create and manage written classroom examinations</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl hover:shadow-lg hover:shadow-slate-400/50 transition-all duration-300 font-semibold group">
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  <span>Export Exams</span>
                </button>
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 font-semibold transform hover:scale-105 group"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  <span>Create Exam</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* COLORFUL STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.lightBg} opacity-50`}></div>
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 ${stat.iconBg} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <TrendingUp className={`w-5 h-5 ${stat.textColor} opacity-60`} />
                  </div>
                  <h3 className="text-slate-600 text-sm font-semibold mb-2">{stat.label}</h3>
                  <p className={`text-4xl font-black ${stat.textColor}`}>{stat.value}</p>
                </div>
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`}></div>
              </div>
            );
          })}
        </div>

        {/* FILTERS - Colorful Design */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Filter Exams</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Academic Year</label>
              <select className="w-full px-4 py-3 border-2 border-violet-200 rounded-xl focus:ring-4 focus:ring-violet-200 focus:border-violet-500 outline-none transition-all bg-gradient-to-r from-white to-violet-50 text-slate-700 font-medium">
                <option>2024-2025</option>
                <option>2025-2026</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Class</label>
              <select className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all bg-gradient-to-r from-white to-blue-50 text-slate-700 font-medium">
                <option>All Classes</option>
                <option>Class 8</option>
                <option>Class 9</option>
                <option>Class 10</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
              <select className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:ring-4 focus:ring-emerald-200 focus:border-emerald-500 outline-none transition-all bg-gradient-to-r from-white to-emerald-50 text-slate-700 font-medium">
                <option>All Subjects</option>
                <option>Mathematics</option>
                <option>Physics</option>
                <option>Chemistry</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
              <select className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:ring-4 focus:ring-amber-200 focus:border-amber-500 outline-none transition-all bg-gradient-to-r from-white to-amber-50 text-slate-700 font-medium">
                <option>All Status</option>
                <option>Upcoming</option>
                <option>Ongoing</option>
                <option>Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                <input
                  type="text"
                  placeholder="Search exams..."
                  className="w-full pl-11 pr-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 outline-none transition-all bg-gradient-to-r from-white to-purple-50 text-slate-700 font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* EXAM CARDS - Colorful Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {exams.map((exam, index) => {
            const statusConfig = getStatusConfig(exam.status);
            const StatusIcon = statusConfig.icon;
            return (
              <div 
                key={exam.id} 
                className={`relative ${exam.bgColor} rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group transform hover:-translate-y-1`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                
                <div className="relative p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-violet-700 transition-colors">
                        {exam.name}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-sm font-semibold text-violet-700 border border-violet-200">
                          {exam.class}
                        </span>
                        <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-sm font-semibold text-blue-700 border border-blue-200">
                          {exam.subject}
                        </span>
                      </div>
                    </div>
                    <div className={`${statusConfig.color} text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg flex items-center gap-2`}>
                      <StatusIcon className="w-4 h-4" />
                      {exam.status}
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-slate-200">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-violet-600" />
                        <span className="text-xs font-semibold text-slate-500 uppercase">Date</span>
                      </div>
                      <p className="text-sm font-bold text-slate-800">{exam.date}</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-slate-200">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-semibold text-slate-500 uppercase">Time</span>
                      </div>
                      <p className="text-sm font-bold text-slate-800">{exam.time}</p>
                    </div>
                  </div>

                  {/* Total Marks */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-slate-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-600" />
                        <span className="text-sm font-semibold text-slate-600">Total Marks</span>
                      </div>
                      <span className="text-2xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                        {exam.totalMarks}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-300 transition-all duration-300 font-semibold group/btn">
                      <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      <span>View</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl hover:shadow-lg hover:shadow-violet-300 transition-all duration-300 font-semibold group/btn">
                      <Edit2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      <span>Edit</span>
                    </button>
                    <button 
                      onClick={() => setShowMarksModal(true)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-300 transition-all duration-300 font-semibold group/btn"
                    >
                      <FileText className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      <span>Marks</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ANALYTICS SECTION - Colorful */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl shadow-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-black text-slate-800">Performance Analytics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
              <p className="text-sm font-semibold text-blue-600 mb-2">Class Average</p>
              <p className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">78.5%</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200">
              <p className="text-sm font-semibold text-emerald-600 mb-2">Highest Score</p>
              <p className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">98</p>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-2xl p-6 border-2 border-rose-200">
              <p className="text-sm font-semibold text-rose-600 mb-2">Lowest Score</p>
              <p className="text-4xl font-black bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">28</p>
            </div>
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border-2 border-violet-200">
              <p className="text-sm font-semibold text-violet-600 mb-2">Pass Rate</p>
              <p className="text-4xl font-black bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">92%</p>
            </div>
          </div>
        </div>

      </div>

      {/* CREATE EXAM MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-6 flex items-center justify-between rounded-t-3xl">
              <h2 className="text-2xl font-black text-white">Create New Exam</h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-white/20 rounded-xl transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Exam Name</label>
                <input type="text" className="w-full px-4 py-3 border-2 border-violet-200 rounded-xl focus:ring-4 focus:ring-violet-200 focus:border-violet-500 outline-none transition-all" placeholder="e.g., Mid Term Examination" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Class</label>
                  <select className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all">
                    <option>Class 8</option>
                    <option>Class 9</option>
                    <option>Class 10</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Section</label>
                  <select className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:ring-4 focus:ring-emerald-200 focus:border-emerald-500 outline-none transition-all">
                    <option>Section A</option>
                    <option>Section B</option>
                    <option>Section C</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
                <select className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:ring-4 focus:ring-amber-200 focus:border-amber-500 outline-none transition-all">
                  <option>Mathematics</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Exam Date</label>
                  <input type="date" className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Start Time</label>
                  <input type="time" className="w-full px-4 py-3 border-2 border-cyan-200 rounded-xl focus:ring-4 focus:ring-cyan-200 focus:border-cyan-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">End Time</label>
                  <input type="time" className="w-full px-4 py-3 border-2 border-teal-200 rounded-xl focus:ring-4 focus:ring-teal-200 focus:border-teal-500 outline-none transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Total Marks</label>
                  <input type="number" className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 outline-none transition-all" placeholder="100" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Passing Marks</label>
                  <input type="number" className="w-full px-4 py-3 border-2 border-lime-200 rounded-xl focus:ring-4 focus:ring-lime-200 focus:border-lime-500 outline-none transition-all" placeholder="40" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Upload Question Paper (Optional)</label>
                <div className="border-2 border-dashed border-purple-300 rounded-xl p-8 text-center hover:border-purple-500 transition-colors cursor-pointer bg-gradient-to-br from-purple-50 to-pink-50">
                  <Upload className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                  <p className="text-slate-600 font-semibold">Click to upload PDF</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-300 font-bold"
                >
                  Cancel
                </button>
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white rounded-xl hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 font-bold">
                  Save Exam
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MARKS ENTRY MODAL */}
      {showMarksModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-6 rounded-t-3xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-black text-white">Enter Student Marks</h2>
                <button 
                  onClick={() => setShowMarksModal(false)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-xl p-3">
                  <p className="text-white/80 text-sm font-semibold">Progress</p>
                  <p className="text-white text-xl font-black">4 / 5 Completed</p>
                </div>
                <button className="px-6 py-3 bg-white text-emerald-600 rounded-xl hover:shadow-lg transition-all font-bold">
                  Mark All Absent
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-slate-100 to-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-black text-slate-700">Roll No</th>
                      <th className="px-6 py-4 text-left text-sm font-black text-slate-700">Student Name</th>
                      <th className="px-6 py-4 text-left text-sm font-black text-slate-700">Marks Obtained</th>
                      <th className="px-6 py-4 text-left text-sm font-black text-slate-700">Grade</th>
                      <th className="px-6 py-4 text-left text-sm font-black text-slate-700">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {students.map((student, index) => (
                      <tr key={index} className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-colors ${student.status === 'Fail' ? 'bg-red-50' : ''}`}>
                        <td className="px-6 py-4 text-sm font-bold text-slate-700">{student.rollNo}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-800">{student.name}</td>
                        <td className="px-6 py-4">
                          <input 
                            type="number" 
                            value={student.marks || ''} 
                            className="w-24 px-3 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none transition-all font-bold text-slate-800"
                            placeholder="0"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-4 py-1.5 rounded-full text-sm font-black ${
                            student.grade === 'A+' ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700' :
                            student.grade === 'A' ? 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700' :
                            student.grade === 'B+' ? 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700' :
                            student.grade === 'F' ? 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700' :
                            'bg-gray-100 text-gray-500'
                          }`}>
                            {student.grade}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-4 py-1.5 rounded-full text-sm font-black ${
                            student.status === 'Pass' ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700' :
                            student.status === 'Fail' ? 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700' :
                            'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-600'
                          }`}>
                            {student.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex gap-3 pt-6">
                <button 
                  onClick={() => setShowMarksModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-300 font-bold"
                >
                  Cancel
                </button>
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white rounded-xl hover:shadow-xl hover:shadow-emerald-500/50 transition-all duration-300 font-bold">
                  Save All Marks
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}