import React, { useState } from 'react';
import { Monitor, Plus, Users, Clock, CheckCircle, XCircle, PlayCircle, PauseCircle, Settings, BarChart3, Download, Filter, Search, Eye, Edit2, Trash2, Copy, Share2, Lock, Unlock, TrendingUp, AlertCircle, FileQuestion, Award, Globe, Wifi, WifiOff, Video, MessageSquare, Bell } from 'lucide-react';

export default function OnlineExamManagement() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMonitorModal, setShowMonitorModal] = useState(false);

  const stats = [
    { 
      label: 'Total Online Exams', 
      value: '36', 
      icon: Monitor, 
      gradient: 'from-cyan-500 to-blue-600',
      lightBg: 'from-cyan-50 to-blue-50',
      iconBg: 'bg-gradient-to-br from-cyan-400 to-blue-500',
      textColor: 'text-cyan-700',
      trend: '+12%'
    },
    { 
      label: 'Active Now', 
      value: '8', 
      icon: PlayCircle, 
      gradient: 'from-green-500 to-emerald-600',
      lightBg: 'from-green-50 to-emerald-50',
      iconBg: 'bg-gradient-to-br from-green-400 to-emerald-500',
      textColor: 'text-green-700',
      trend: 'Live',
      pulse: true
    },
    { 
      label: 'Scheduled', 
      value: '15', 
      icon: Clock, 
      gradient: 'from-orange-500 to-red-600',
      lightBg: 'from-orange-50 to-red-50',
      iconBg: 'bg-gradient-to-br from-orange-400 to-red-500',
      textColor: 'text-orange-700',
      trend: '+8%'
    },
    { 
      label: 'Students Online', 
      value: '234', 
      icon: Users, 
      gradient: 'from-purple-500 to-pink-600',
      lightBg: 'from-purple-50 to-pink-50',
      iconBg: 'bg-gradient-to-br from-purple-400 to-pink-500',
      textColor: 'text-purple-700',
      trend: '+45'
    }
  ];

  const onlineExams = [
    { 
      id: 1, 
      name: 'Advanced Mathematics Quiz', 
      class: 'Class 10 - A', 
      subject: 'Mathematics',
      type: 'MCQ',
      date: '12 Feb 2026', 
      time: '2:00 PM - 3:30 PM', 
      duration: '90 mins',
      totalMarks: 100,
      questions: 50,
      status: 'Active',
      studentsAttempted: 28,
      totalStudents: 35,
      bgColor: 'from-green-50 via-emerald-50 to-teal-50',
      statusColor: 'from-green-500 to-emerald-500',
      proctoring: true,
      autoGrade: true
    },
    { 
      id: 2, 
      name: 'Physics Theory Assessment', 
      class: 'Class 12 - B', 
      subject: 'Physics',
      type: 'Mixed',
      date: '13 Feb 2026', 
      time: '10:00 AM - 12:00 PM', 
      duration: '120 mins',
      totalMarks: 80,
      questions: 40,
      status: 'Scheduled',
      studentsAttempted: 0,
      totalStudents: 42,
      bgColor: 'from-blue-50 via-indigo-50 to-purple-50',
      statusColor: 'from-blue-500 to-indigo-500',
      proctoring: true,
      autoGrade: false
    },
    { 
      id: 3, 
      name: 'English Grammar Test', 
      class: 'Class 9 - C', 
      subject: 'English',
      type: 'MCQ',
      date: '10 Feb 2026', 
      time: '11:00 AM - 12:00 PM', 
      duration: '60 mins',
      totalMarks: 50,
      questions: 30,
      status: 'Completed',
      studentsAttempted: 38,
      totalStudents: 38,
      bgColor: 'from-purple-50 via-pink-50 to-rose-50',
      statusColor: 'from-purple-500 to-pink-500',
      proctoring: false,
      autoGrade: true
    },
    { 
      id: 4, 
      name: 'Chemistry Lab Quiz', 
      class: 'Class 11 - A', 
      subject: 'Chemistry',
      type: 'Subjective',
      date: '14 Feb 2026', 
      time: '3:00 PM - 4:30 PM', 
      duration: '90 mins',
      totalMarks: 60,
      questions: 20,
      status: 'Draft',
      studentsAttempted: 0,
      totalStudents: 40,
      bgColor: 'from-amber-50 via-orange-50 to-yellow-50',
      statusColor: 'from-amber-500 to-orange-500',
      proctoring: true,
      autoGrade: false
    }
  ];

  const liveStudents = [
    { name: 'Aarav Kumar', progress: 85, status: 'active', warnings: 0 },
    { name: 'Diya Sharma', progress: 92, status: 'active', warnings: 1 },
    { name: 'Rohan Patel', progress: 45, status: 'suspicious', warnings: 3 },
    { name: 'Ananya Singh', progress: 78, status: 'active', warnings: 0 },
    { name: 'Vivaan Reddy', progress: 60, status: 'idle', warnings: 0 }
  ];

  const getStatusConfig = (status: string) => {
    const configs = {
      'Active': { 
        icon: PlayCircle, 
        color: 'from-green-500 to-emerald-500', 
        textColor: 'text-green-700',
        bgLight: 'bg-green-50',
        borderColor: 'border-green-200',
        pulse: true
      },
      'Scheduled': { 
        icon: Clock, 
        color: 'from-blue-500 to-indigo-500', 
        textColor: 'text-blue-700',
        bgLight: 'bg-blue-50',
        borderColor: 'border-blue-200',
        pulse: false
      },
      'Completed': { 
        icon: CheckCircle, 
        color: 'from-purple-500 to-pink-500', 
        textColor: 'text-purple-700',
        bgLight: 'bg-purple-50',
        borderColor: 'border-purple-200',
        pulse: false
      },
      'Draft': { 
        icon: Edit2, 
        color: 'from-amber-500 to-orange-500', 
        textColor: 'text-amber-700',
        bgLight: 'bg-amber-50',
        borderColor: 'border-amber-200',
        pulse: false
      },
      'Cancelled': { 
        icon: XCircle, 
        color: 'from-red-500 to-rose-500', 
        textColor: 'text-red-700',
        bgLight: 'bg-red-50',
        borderColor: 'border-red-200',
        pulse: false
      }
    } as const;
    return configs[status as keyof typeof configs] || configs['Scheduled'];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 p-6 relative overflow-hidden">
      
      {/* ANIMATED BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        
        {/* PAGE HEADER */}
        <div className="relative bg-white rounded-3xl shadow-2xl border border-cyan-100 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 opacity-5"></div>
          <div className="relative p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 rounded-2xl shadow-xl shadow-cyan-500/50 transform hover:scale-110 hover:rotate-3 transition-all duration-300">
                  <Monitor className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                    Online Exam Management
                  </h1>
                  <p className="text-slate-600 text-lg">Create and monitor digital examinations with real-time proctoring</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl hover:shadow-xl hover:shadow-slate-400/50 transition-all duration-300 font-semibold group">
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  <span>Export Reports</span>
                </button>
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 font-semibold transform hover:scale-105 group"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  <span>Create Online Exam</span>
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
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.lightBg} opacity-60`}></div>
                
                {stat.pulse && (
                  <div className="absolute top-3 right-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                  </div>
                )}
                
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 ${stat.iconBg} rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-black ${stat.textColor} px-2 py-1 bg-white/80 rounded-full`}>
                        {stat.trend}
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm font-semibold mb-1">{stat.label}</p>
                  <p className={`text-4xl font-black ${stat.textColor}`}>{stat.value}</p>
                </div>
                <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${stat.gradient}`}></div>
              </div>
            );
          })}
        </div>

        {/* FILTERS */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg shadow-lg">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Filter Online Exams</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Academic Year</label>
              <select className="w-full px-4 py-3 border-2 border-cyan-200 rounded-xl focus:ring-4 focus:ring-cyan-200 focus:border-cyan-500 outline-none transition-all bg-gradient-to-r from-white to-cyan-50 text-slate-700 font-medium">
                <option>2024-2025</option>
                <option>2025-2026</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Class</label>
              <select className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all bg-gradient-to-r from-white to-blue-50 text-slate-700 font-medium">
                <option>All Classes</option>
                <option>Class 9</option>
                <option>Class 10</option>
                <option>Class 11</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Exam Type</label>
              <select className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 outline-none transition-all bg-gradient-to-r from-white to-purple-50 text-slate-700 font-medium">
                <option>All Types</option>
                <option>MCQ</option>
                <option>Subjective</option>
                <option>Mixed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
              <select className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:ring-4 focus:ring-emerald-200 focus:border-emerald-500 outline-none transition-all bg-gradient-to-r from-white to-emerald-50 text-slate-700 font-medium">
                <option>All Status</option>
                <option>Active</option>
                <option>Scheduled</option>
                <option>Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-400" />
                <input
                  type="text"
                  placeholder="Search exams..."
                  className="w-full pl-11 pr-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-500 outline-none transition-all bg-gradient-to-r from-white to-pink-50 text-slate-700 font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ONLINE EXAM CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {onlineExams.map((exam, index) => {
            const statusConfig = getStatusConfig(exam.status);
            const StatusIcon = statusConfig.icon;
            const progressPercent = (exam.studentsAttempted / exam.totalStudents) * 100;
            
            return (
              <div 
                key={exam.id} 
                className={`relative bg-gradient-to-br ${exam.bgColor} rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group transform hover:-translate-y-1 border-2 border-white/50`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16"></div>
                
                <div className="relative p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Monitor className="w-5 h-5 text-cyan-600" />
                        <h3 className="text-xl font-bold text-slate-800 group-hover:text-cyan-700 transition-colors">
                          {exam.name}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-indigo-700 border border-indigo-200">
                          {exam.class}
                        </span>
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-purple-700 border border-purple-200">
                          {exam.subject}
                        </span>
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-pink-700 border border-pink-200">
                          {exam.type}
                        </span>
                      </div>
                    </div>
                    <div className={`bg-gradient-to-r ${statusConfig.color} text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg flex items-center gap-2 ${statusConfig.pulse ? 'animate-pulse' : ''}`}>
                      <StatusIcon className="w-4 h-4" />
                      {exam.status}
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-slate-200">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-semibold text-slate-500">DATE & TIME</span>
                      </div>
                      <p className="text-sm font-bold text-slate-800">{exam.date}</p>
                      <p className="text-xs font-semibold text-slate-600">{exam.time}</p>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-slate-200">
                      <div className="flex items-center gap-2 mb-1">
                        <FileQuestion className="w-4 h-4 text-purple-600" />
                        <span className="text-xs font-semibold text-slate-500">QUESTIONS</span>
                      </div>
                      <p className="text-2xl font-black text-purple-700">{exam.questions}</p>
                      <p className="text-xs font-semibold text-slate-600">{exam.duration}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex gap-2 mb-4">
                    {exam.proctoring && (
                      <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-100 to-orange-100 rounded-lg border border-red-200">
                        <Video className="w-4 h-4 text-red-600" />
                        <span className="text-xs font-bold text-red-700">AI Proctoring</span>
                      </div>
                    )}
                    {exam.autoGrade && (
                      <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border border-green-200">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-xs font-bold text-green-700">Auto-Grade</span>
                      </div>
                    )}
                  </div>

                  {/* Student Progress */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-200 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-cyan-600" />
                        <span className="text-sm font-semibold text-slate-600">Students Progress</span>
                      </div>
                      <span className="text-sm font-black text-slate-800">
                        {exam.studentsAttempted} / {exam.totalStudents}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Total Marks */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-slate-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-600" />
                        <span className="text-sm font-semibold text-slate-600">Total Marks</span>
                      </div>
                      <span className="text-3xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                        {exam.totalMarks}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => exam.status === 'Active' && setShowMonitorModal(true)}
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 font-bold ${
                        exam.status === 'Active' 
                          ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-lg hover:shadow-red-300' 
                          : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-300'
                      }`}
                    >
                      {exam.status === 'Active' ? (
                        <>
                          <Eye className="w-5 h-5" />
                          <span>Monitor Live</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-5 h-5" />
                          <span>View</span>
                        </>
                      )}
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:shadow-lg hover:shadow-indigo-300 transition-all duration-300 font-bold">
                      <Settings className="w-5 h-5" />
                      <span>Settings</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-300 transition-all duration-300 font-bold">
                      <Copy className="w-5 h-5" />
                      <span>Duplicate</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-xl hover:shadow-lg hover:shadow-violet-300 transition-all duration-300 font-bold">
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ANALYTICS */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl shadow-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-black text-slate-800">Real-Time Analytics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-cyan-200 hover:shadow-lg transition-all">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-5 h-5 text-cyan-600" />
                <p className="text-sm font-semibold text-cyan-700">Avg. Completion</p>
              </div>
              <p className="text-4xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">82%</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200 hover:shadow-lg transition-all">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <p className="text-sm font-semibold text-emerald-700">Pass Rate</p>
              </div>
              <p className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">94%</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-orange-200 hover:shadow-lg transition-all">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <p className="text-sm font-semibold text-orange-700">Violations</p>
              </div>
              <p className="text-4xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">12</p>
            </div>
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border-2 border-violet-200 hover:shadow-lg transition-all">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-violet-600" />
                <p className="text-sm font-semibold text-violet-700">Avg. Duration</p>
              </div>
              <p className="text-4xl font-black bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">75m</p>
            </div>
          </div>
        </div>

      </div>

      {/* CREATE EXAM MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-6 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 p-6 flex items-center justify-between rounded-t-3xl z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Monitor className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-black text-white">Create Online Exam</h2>
              </div>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-white/20 rounded-xl transition-colors"
              >
                <XCircle className="w-6 h-6 text-white" />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <FileQuestion className="w-5 h-5 text-cyan-600" />
                  Basic Information
                </h3>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Exam Title</label>
                  <input type="text" className="w-full px-4 py-3 border-2 border-cyan-200 rounded-xl focus:ring-4 focus:ring-cyan-200 focus:border-cyan-500 outline-none transition-all" placeholder="e.g., Advanced Mathematics Quiz" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Class</label>
                    <select className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all">
                      <option>Class 9</option>
                      <option>Class 10</option>
                      <option>Class 11</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Section</label>
                    <select className="w-full px-4 py-3 border-2 border-indigo-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all">
                      <option>Section A</option>
                      <option>Section B</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
                    <select className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 outline-none transition-all">
                      <option>Mathematics</option>
                      <option>Physics</option>
                      <option>Chemistry</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Exam Type */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-purple-600" />
                  Exam Configuration
                </h3>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">Exam Type</label>
                  <div className="grid grid-cols-3 gap-3">
                    <label className="relative flex items-center justify-center p-4 border-2 border-emerald-200 rounded-xl cursor-pointer hover:border-emerald-500 transition-all bg-gradient-to-br from-emerald-50 to-teal-50">
                      <input type="radio" name="examType" className="sr-only peer" />
                      <div className="text-center peer-checked:scale-110 transition-transform">
                        <CheckCircle className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                        <span className="font-bold text-emerald-700">MCQ</span>
                      </div>
                    </label>
                    <label className="relative flex items-center justify-center p-4 border-2 border-purple-200 rounded-xl cursor-pointer hover:border-purple-500 transition-all bg-gradient-to-br from-purple-50 to-pink-50">
                      <input type="radio" name="examType" className="sr-only peer" />
                      <div className="text-center peer-checked:scale-110 transition-transform">
                        <Edit2 className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                        <span className="font-bold text-purple-700">Subjective</span>
                      </div>
                    </label>
                    <label className="relative flex items-center justify-center p-4 border-2 border-orange-200 rounded-xl cursor-pointer hover:border-orange-500 transition-all bg-gradient-to-br from-orange-50 to-yellow-50">
                      <input type="radio" name="examType" className="sr-only peer" />
                      <div className="text-center peer-checked:scale-110 transition-transform">
                        <FileQuestion className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                        <span className="font-bold text-orange-700">Mixed</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Total Questions</label>
                    <input type="number" className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-500 outline-none transition-all" placeholder="50" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Duration (mins)</label>
                    <input type="number" className="w-full px-4 py-3 border-2 border-rose-200 rounded-xl focus:ring-4 focus:ring-rose-200 focus:border-rose-500 outline-none transition-all" placeholder="90" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Total Marks</label>
                    <input type="number" className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:ring-4 focus:ring-amber-200 focus:border-amber-500 outline-none transition-all" placeholder="100" />
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Schedule Exam
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Exam Date</label>
                    <input type="date" className="w-full px-4 py-3 border-2 border-cyan-200 rounded-xl focus:ring-4 focus:ring-cyan-200 focus:border-cyan-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Start Time</label>
                    <input type="time" className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">End Time</label>
                    <input type="time" className="w-full px-4 py-3 border-2 border-indigo-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all" />
                  </div>
                </div>
              </div>

              {/* Features Toggle */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-red-600" />
                  Security & Features
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center justify-between p-4 border-2 border-red-200 rounded-xl cursor-pointer hover:border-red-500 transition-all bg-gradient-to-br from-red-50 to-orange-50">
                    <div className="flex items-center gap-3">
                      <Video className="w-5 h-5 text-red-600" />
                      <span className="font-bold text-slate-700">AI Proctoring</span>
                    </div>
                    <input type="checkbox" className="w-5 h-5 text-red-600 rounded focus:ring-red-500" />
                  </label>
                  <label className="flex items-center justify-between p-4 border-2 border-green-200 rounded-xl cursor-pointer hover:border-green-500 transition-all bg-gradient-to-br from-green-50 to-emerald-50">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-bold text-slate-700">Auto Grade</span>
                    </div>
                    <input type="checkbox" className="w-5 h-5 text-green-600 rounded focus:ring-green-500" />
                  </label>
                  <label className="flex items-center justify-between p-4 border-2 border-purple-200 rounded-xl cursor-pointer hover:border-purple-500 transition-all bg-gradient-to-br from-purple-50 to-pink-50">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-purple-600" />
                      <span className="font-bold text-slate-700">Browser Lock</span>
                    </div>
                    <input type="checkbox" className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500" />
                  </label>
                  <label className="flex items-center justify-between p-4 border-2 border-blue-200 rounded-xl cursor-pointer hover:border-blue-500 transition-all bg-gradient-to-br from-blue-50 to-cyan-50">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-blue-600" />
                      <span className="font-bold text-slate-700">Notify Students</span>
                    </div>
                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" defaultChecked />
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-slate-200">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-6 py-4 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-300 font-bold"
                >
                  Cancel
                </button>
                <button className="flex-1 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:shadow-xl hover:shadow-amber-500/50 transition-all duration-300 font-bold">
                  Save as Draft
                </button>
                <button className="flex-1 px-6 py-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 font-bold">
                  Create & Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LIVE MONITORING MODAL */}
      {showMonitorModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-6 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 p-6 rounded-t-3xl z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg animate-pulse">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white">Live Exam Monitoring</h2>
                    <p className="text-white/80 text-sm">Advanced Mathematics Quiz - Class 10-A</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowMonitorModal(false)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                >
                  <XCircle className="w-6 h-6 text-white" />
                </button>
              </div>
              
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                  <p className="text-white/80 text-xs font-semibold mb-1">Students Online</p>
                  <p className="text-2xl font-black text-white">28 / 35</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                  <p className="text-white/80 text-xs font-semibold mb-1">Time Remaining</p>
                  <p className="text-2xl font-black text-white">45:30</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                  <p className="text-white/80 text-xs font-semibold mb-1">Violations</p>
                  <p className="text-2xl font-black text-white">3</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                  <p className="text-white/80 text-xs font-semibold mb-1">Avg Progress</p>
                  <p className="text-2xl font-black text-white">72%</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-slate-100 to-slate-50 border-b-2 border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-black text-slate-700">Student Name</th>
                      <th className="px-6 py-4 text-left text-sm font-black text-slate-700">Progress</th>
                      <th className="px-6 py-4 text-left text-sm font-black text-slate-700">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-black text-slate-700">Warnings</th>
                      <th className="px-6 py-4 text-left text-sm font-black text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {liveStudents.map((student, index) => (
                      <tr key={index} className={`hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 transition-colors ${
                        student.status === 'suspicious' ? 'bg-red-50' : 
                        student.status === 'idle' ? 'bg-amber-50' : ''
                      }`}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${
                              student.status === 'active' ? 'bg-green-500 animate-pulse' :
                              student.status === 'suspicious' ? 'bg-red-500 animate-pulse' :
                              'bg-amber-500'
                            }`}></div>
                            <span className="font-bold text-slate-800">{student.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all"
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-bold text-slate-700 w-12">{student.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1.5 rounded-full text-xs font-black ${
                            student.status === 'active' ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700' :
                            student.status === 'suspicious' ? 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700' :
                            'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700'
                          }`}>
                            {student.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {student.warnings > 0 ? (
                            <span className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-100 to-rose-100 text-red-700 rounded-full text-xs font-black w-fit">
                              <AlertCircle className="w-3 h-3" />
                              {student.warnings} warnings
                            </span>
                          ) : (
                            <span className="text-slate-400 text-sm">No issues</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all">
                              <Video className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all">
                              <MessageSquare className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}