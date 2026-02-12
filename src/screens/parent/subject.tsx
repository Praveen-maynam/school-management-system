import React, { useState } from 'react';
import { BookOpen, Clock, TrendingUp, ChevronDown, Calendar, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const SubjectsScreen = () => {
  const [selectedStudent, setSelectedStudent] = useState('aarav');
  
  const students = [
    { id: 'aarav', name: 'Aarav', class: 'Class 8 A' },
    { id: 'ananya', name: 'Ananya', class: 'Class 5 B' }
  ];

  const subjects = [
    {
      id: 1,
      name: 'English',
      icon: '📘',
      color: 'bg-blue-50 border-blue-200',
      accentColor: 'bg-blue-500',
      teacher: 'Mrs. Sarah Johnson',
      periodsPerWeek: 6,
      progress: 68,
      status: 'ongoing',
      statusColor: 'text-green-600 bg-green-50'
    },
    {
      id: 2,
      name: 'Mathematics',
      icon: '📐',
      color: 'bg-purple-50 border-purple-200',
      accentColor: 'bg-purple-500',
      teacher: 'Mr. Rajesh Kumar',
      periodsPerWeek: 7,
      progress: 72,
      status: 'ongoing',
      statusColor: 'text-green-600 bg-green-50'
    },
    {
      id: 3,
      name: 'Science',
      icon: '🔬',
      color: 'bg-teal-50 border-teal-200',
      accentColor: 'bg-teal-500',
      teacher: 'Dr. Priya Sharma',
      periodsPerWeek: 6,
      progress: 65,
      status: 'assessment-soon',
      statusColor: 'text-amber-600 bg-amber-50'
    },
    {
      id: 4,
      name: 'Social Science',
      icon: '🌍',
      color: 'bg-emerald-50 border-emerald-200',
      accentColor: 'bg-emerald-500',
      teacher: 'Mr. Amit Verma',
      periodsPerWeek: 5,
      progress: 58,
      status: 'ongoing',
      statusColor: 'text-green-600 bg-green-50'
    },
    {
      id: 5,
      name: 'Physics',
      icon: '🧪',
      color: 'bg-indigo-50 border-indigo-200',
      accentColor: 'bg-indigo-500',
      teacher: 'Dr. Michael Chen',
      periodsPerWeek: 4,
      progress: 70,
      status: 'assessment-soon',
      statusColor: 'text-amber-600 bg-amber-50'
    },
    {
      id: 6,
      name: 'Chemistry',
      icon: '⚗️',
      color: 'bg-rose-50 border-rose-200',
      accentColor: 'bg-rose-500',
      teacher: 'Mrs. Kavita Reddy',
      periodsPerWeek: 4,
      progress: 63,
      status: 'ongoing',
      statusColor: 'text-green-600 bg-green-50'
    },
    {
      id: 7,
      name: 'Computer Science',
      icon: '💻',
      color: 'bg-slate-50 border-slate-200',
      accentColor: 'bg-slate-500',
      teacher: 'Mr. Arjun Patel',
      periodsPerWeek: 3,
      progress: 75,
      status: 'assessment-soon',
      statusColor: 'text-amber-600 bg-amber-50'
    },
    {
      id: 8,
      name: 'Hindi',
      icon: '🌐',
      color: 'bg-orange-50 border-orange-200',
      accentColor: 'bg-orange-500',
      teacher: 'Mrs. Deepa Mishra',
      periodsPerWeek: 5,
      progress: 60,
      status: 'ongoing',
      statusColor: 'text-green-600 bg-green-50'
    },
    {
      id: 9,
      name: 'Physical Education',
      icon: '🏃',
      color: 'bg-lime-50 border-lime-200',
      accentColor: 'bg-lime-500',
      teacher: 'Coach Rahul Singh',
      periodsPerWeek: 2,
      progress: 80,
      status: 'ongoing',
      statusColor: 'text-green-600 bg-green-50'
    }
  ];

  const getStatusText = (status: string) => {
    switch(status) {
      case 'ongoing': return 'Ongoing';
      case 'assessment-soon': return 'Assessment Soon';
      case 'completed': return 'Completed';
      default: return 'Ongoing';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'ongoing': return <CheckCircle className="w-3.5 h-3.5" />;
      case 'assessment-soon': return <AlertCircle className="w-3.5 h-3.5" />;
      case 'completed': return <CheckCircle className="w-3.5 h-3.5" />;
      default: return <CheckCircle className="w-3.5 h-3.5" />;
    }
  };

  const assessmentsCount = subjects.filter(s => s.status === 'assessment-soon').length;
  const currentStudent = students.find(s => s.id === selectedStudent);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-1">Subjects</h1>
            <p className="text-slate-600">Subjects your child is currently learning</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Student Selector */}
            <div className="relative">
              <select 
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-3 pr-10 font-medium text-slate-700 cursor-pointer hover:border-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name} – {student.class}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>

            {/* Academic Year Badge */}
            <div className="bg-blue-100 text-blue-700 px-4 py-3 rounded-xl font-semibold flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              2024-25
            </div>
          </div>
        </div>

        {/* SUBJECT OVERVIEW SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
                📚
              </div>
              <div>
                <p className="text-slate-600 text-sm">Total Subjects</p>
                <p className="text-3xl font-bold text-slate-800">{subjects.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-2xl">
                📝
              </div>
              <div>
                <p className="text-slate-600 text-sm">Assessments Ongoing</p>
                <p className="text-3xl font-bold text-slate-800">{assessmentsCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">
                📄
              </div>
              <div>
                <p className="text-slate-600 text-sm">Homework Active</p>
                <p className="text-3xl font-bold text-slate-800">2</p>
              </div>
            </div>
          </div>
        </div>

        {/* SUBJECT CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <div 
              key={subject.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1"
            >
              {/* Colored Top Strip */}
              <div className={`h-2 ${subject.accentColor}`}></div>
              
              <div className="p-6">
                {/* Icon & Subject Name */}
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-14 h-14 rounded-xl ${subject.color} border flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                    {subject.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-800 mb-1">{subject.name}</h3>
                    <p className="text-sm text-slate-500">{subject.teacher}</p>
                  </div>
                </div>

                {/* Weekly Periods */}
                <div className="flex items-center gap-2 mb-4 text-slate-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{subject.periodsPerWeek} classes/week</span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">Progress</span>
                    <span className="text-sm font-bold text-slate-800">{subject.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className={`h-full ${subject.accentColor} rounded-full transition-all duration-500`}
                      style={{ width: `${subject.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${subject.statusColor}`}>
                    {getStatusIcon(subject.status)}
                    {getStatusText(subject.status)}
                  </span>
                  
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold hover:gap-2 flex items-center gap-1 transition-all">
                    View Details
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (hidden when subjects exist) */}
        {subjects.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
              📚
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No Subjects Assigned Yet</h3>
            <p className="text-slate-600">Subjects will appear once class allocation is completed</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default SubjectsScreen;