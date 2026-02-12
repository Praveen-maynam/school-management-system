import React, { useState } from 'react';
import { Calendar, TrendingUp, Award, BookOpen, Target, ArrowLeft, Plus, Star, Trophy, Zap } from 'lucide-react';

const StudentProfileScreen = () => {
  const termProgressData = [
    { subject: 'Maths', term1: 75, term2: 85, term3: 80, color: 'from-blue-400 to-blue-600' },
    { subject: 'Science', term1: 70, term2: 82, term3: 78, color: 'from-purple-400 to-purple-600' },
    { subject: 'English', term1: 68, term2: 80, term3: 75, color: 'from-pink-400 to-pink-600' },
    { subject: 'Hindi', term1: 72, term2: 85, term3: 82, color: 'from-orange-400 to-orange-600' },
    { subject: 'Social', term1: 70, term2: 82, term3: 78, color: 'from-teal-400 to-teal-600' }
  ];

  const subjectPerformance = [
    { subject: 'Maths', percentage: 82, color: 'bg-gradient-to-r from-blue-500 to-blue-600', icon: '📐', grade: 'A' },
    { subject: 'Science', percentage: 82, color: 'bg-gradient-to-r from-purple-500 to-purple-600', icon: '🔬', grade: 'A' },
    { subject: 'English', percentage: 82, color: 'bg-gradient-to-r from-pink-500 to-pink-600', icon: '📚', grade: 'A' },
    { subject: 'Hindi', percentage: 82, color: 'bg-gradient-to-r from-orange-500 to-orange-600', icon: '✍️', grade: 'A' },
    { subject: 'Social', percentage: 82, color: 'bg-gradient-to-r from-teal-500 to-teal-600', icon: '🌍', grade: 'A' }
  ];

  const recentTests = [
    { subject: 'Science', test: 'Unit Test 3', marks: 92, total: 100, date: 'Dec 16', percentage: 92, color: 'emerald' },
    { subject: 'Maths', test: 'Unit Test 3', marks: 92, total: 100, date: 'Dec 16', percentage: 92, color: 'blue' },
    { subject: 'English', test: 'Mid-Term', marks: 85, total: 100, date: 'Dec 10', percentage: 85, color: 'pink' },
  ];

  const getPerformanceColor = (percentage:number) => {
    if (percentage >= 90) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (percentage >= 75) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (percentage >= 60) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  const getGradeColor = (percentage:number) => {
    if (percentage >= 90) return 'bg-gradient-to-br from-emerald-500 to-green-600';
    if (percentage >= 75) return 'bg-gradient-to-br from-blue-500 to-indigo-600';
    if (percentage >= 60) return 'bg-gradient-to-br from-amber-500 to-orange-600';
    return 'bg-gradient-to-br from-rose-500 to-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50">
      {/* Header - Colorful Gradient */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center space-x-4">
            <button className="hover:bg-white/20 p-2 rounded-lg transition-all">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Student Profile</h1>
              <p className="text-emerald-100 text-sm">Complete academic overview</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Student Info Card - Vibrant */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-emerald-100 overflow-hidden relative">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full blur-3xl opacity-50 -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-50 -ml-24 -mb-24"></div>
          
          <div className="relative flex items-start gap-6">
            {/* Avatar with gradient border */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full blur-md opacity-75"></div>
              <div className="relative w-28 h-28 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl border-4 border-white">
                A
              </div>
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full p-2 shadow-lg border-2 border-white">
                <Star className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-3xl font-bold text-slate-800 mb-1">Aarav Sharma</h2>
              <div className="flex items-center space-x-4 mb-3">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">Class 6-A</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">Roll No: 22</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Trophy className="w-4 h-4" />
                  Top Performer
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <Calendar className="w-4 h-4" />
                <span>DOB: 15 Jan 2012</span>
                <span className="mx-2">•</span>
                <span>Parent: Mr. Rajesh Sharma</span>
              </div>
            </div>

            {/* Quick Stats - Colorful Cards */}
            <div className="flex gap-4">
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-6 text-white shadow-lg min-w-[140px]">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-6 h-6 opacity-80" />
                </div>
                <div className="text-4xl font-bold mb-1">92%</div>
                <div className="text-emerald-100 text-sm font-medium">Attendance</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg min-w-[140px]">
                <div className="flex items-center justify-between mb-2">
                  <Award className="w-6 h-6 opacity-80" />
                </div>
                <div className="text-4xl font-bold mb-1">85%</div>
                <div className="text-blue-100 text-sm font-medium">Avg Marks</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - 7 cols */}
          <div className="col-span-7 space-y-8">
            {/* Attendance Section - Always Visible */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-emerald-100">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6">
                <div className="flex items-center space-x-3 text-white">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Attendance Overview</h3>
                    <p className="text-emerald-100 text-sm">Monthly tracking</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-baseline space-x-3 mb-4">
                        <div className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">92%</div>
                        <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">Excellent</div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">This Month</span>
                          <span className="font-semibold text-slate-800">26/30 days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Present Days</span>
                          <span className="font-semibold text-emerald-600">26 days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Absent Days</span>
                          <span className="font-semibold text-rose-600">4 days</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Visual Progress Circle */}
                    <div className="flex items-center justify-center">
                      <div className="relative w-36 h-36">
                        <svg className="transform -rotate-90 w-36 h-36">
                          <circle
                            cx="72"
                            cy="72"
                            r="60"
                            stroke="#D1FAE5"
                            strokeWidth="12"
                            fill="transparent"
                          />
                          <circle
                            cx="72"
                            cy="72"
                            r="60"
                            stroke="url(#gradient)"
                            strokeWidth="12"
                            fill="transparent"
                            strokeDasharray={`${2 * Math.PI * 60}`}
                            strokeDashoffset={`${2 * Math.PI * 60 * (1 - 92 / 100)}`}
                            strokeLinecap="round"
                          />
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#10B981" />
                              <stop offset="100%" stopColor="#14B8A6" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <TrendingUp className="w-8 h-8 text-emerald-600 mb-1" />
                          <span className="text-xs text-slate-600 font-medium">Great!</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-6">
                    <div className="w-full bg-emerald-100 rounded-full h-4 overflow-hidden">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-4 rounded-full shadow-lg transition-all duration-500" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Term-wise Progress - Always Visible */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-blue-100">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6">
                <div className="flex items-center space-x-3 text-white">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Term-wise Progress</h3>
                    <p className="text-blue-100 text-sm">Subject improvement tracking</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                  <div className="flex gap-6 items-end h-72 mb-6">
                    {termProgressData.map((item, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center">
                        <div className="w-full flex gap-2 items-end h-56 mb-3">
                          <div className="flex-1 group relative">
                            <div className={`bg-gradient-to-t ${item.color} rounded-t-lg transition-all hover:opacity-80 shadow-lg`} style={{ height: `${(item.term1 / 100) * 100}%` }}></div>
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              {item.term1}%
                            </div>
                          </div>
                          <div className="flex-1 group relative">
                            <div className={`bg-gradient-to-t ${item.color} rounded-t-lg transition-all hover:opacity-80 shadow-lg`} style={{ height: `${(item.term2 / 100) * 100}%`, filter: 'brightness(1.1)' }}></div>
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              {item.term2}%
                            </div>
                          </div>
                          <div className="flex-1 group relative">
                            <div className={`bg-gradient-to-t ${item.color} rounded-t-lg transition-all hover:opacity-80 shadow-lg`} style={{ height: `${(item.term3 / 100) * 100}%`, filter: 'brightness(0.9)' }}></div>
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              {item.term3}%
                            </div>
                          </div>
                        </div>
                        <div className="text-sm font-semibold text-slate-700">{item.subject}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center gap-8 pt-4 border-t border-blue-200">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded shadow"></div>
                      <span className="text-sm font-medium text-slate-700">Term 1</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-4 bg-gradient-to-r from-blue-500 to-blue-700 rounded shadow" style={{ filter: 'brightness(1.1)' }}></div>
                      <span className="text-sm font-medium text-slate-700">Term 2</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded shadow" style={{ filter: 'brightness(0.9)' }}></div>
                      <span className="text-sm font-medium text-slate-700">Term 3</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - 5 cols */}
          <div className="col-span-5 space-y-8">
            {/* Recent Test Results - Always Visible */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-purple-100">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
                <div className="flex items-center space-x-3 text-white">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Recent Tests</h3>
                    <p className="text-purple-100 text-sm">Latest results</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {recentTests.map((test, idx) => (
                  <div key={idx} className={`bg-gradient-to-br from-${test.color}-50 to-${test.color}-100 border-2 border-${test.color}-200 rounded-2xl p-4 hover:shadow-lg transition-all`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-slate-800 text-lg">{test.subject}</h4>
                        <p className="text-sm text-slate-600">{test.test}</p>
                      </div>
                      <div className={`${getPerformanceColor(test.percentage)} border-2 px-3 py-1 rounded-full text-sm font-bold shadow-sm`}>
                        {test.percentage}%
                      </div>
                    </div>
                    
                    <div className="flex items-baseline space-x-2 mb-3">
                      <span className="text-sm text-slate-600">Score:</span>
                      <span className={`text-3xl font-bold bg-gradient-to-r from-${test.color}-600 to-${test.color}-700 bg-clip-text text-transparent`}>
                        {test.marks}/{test.total}
                      </span>
                      <span className="text-xs text-slate-500 ml-auto">{test.date}</span>
                    </div>
                    
                    <div className="w-full bg-white rounded-full h-3 overflow-hidden shadow-inner">
                      <div 
                        className={`bg-gradient-to-r from-${test.color}-500 to-${test.color}-600 h-3 rounded-full transition-all duration-500 shadow-lg`}
                        style={{ width: `${test.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subject Performance - Always Visible */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-orange-100">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6">
                <div className="flex items-center space-x-3 text-white">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Subject Performance</h3>
                    <p className="text-orange-100 text-sm">Overall grades</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {subjectPerformance.map((item, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-200 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{item.icon}</div>
                        <span className="font-bold text-slate-800">{item.subject}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className={`${getGradeColor(item.percentage)} text-white font-bold px-4 py-2 rounded-xl shadow-lg text-lg`}>
                          {item.grade}
                        </div>
                        <span className="text-xl font-bold text-slate-700">{item.percentage}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden shadow-inner">
                      <div 
                        className={`${item.color} h-3 rounded-full transition-all duration-500 shadow-lg`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Button - Colorful */}
        <div className="mt-8">
          <button className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-700 hover:via-teal-700 hover:to-blue-700 text-white rounded-2xl p-6 font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
              <Plus className="w-6 h-6" />
            </div>
            Post Marks Or Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileScreen;