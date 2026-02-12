import React, { useState } from 'react';
import { 
  ChevronDown, 
  Download, 
  FileText, 
  Printer, 
  Eye, 
  TrendingUp, 
  Award,
  AlertCircle,
  Users,
  Calendar,
  Bell,
  Star,
  BarChart3,
  FileSpreadsheet
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Type Definitions
interface Student {
  id: string;
  name: string;
  class: string;
  section: string;
  rollNo: string;
}

interface Report {
  id: number;
  type: string;
  examTerm: string;
  date: string;
  status: 'Published' | 'Processing' | 'Not Available';
  isNew?: boolean;
}

interface SubjectPerformance {
  id: number;
  subject: string;
  icon: string;
  marks: number;
  totalMarks: number;
  grade: string;
  classAverage: number;
  performance: 'good' | 'average' | 'needs-improvement';
}

const ReportsScreen: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<string>('aarav');
  const [selectedYear, setSelectedYear] = useState<string>('2024-25');
  const [activeTab, setActiveTab] = useState<string>('all');

  const students: Student[] = [
    { id: 'aarav', name: 'Aarav Kumar', class: '8', section: 'A', rollNo: '15' },
    { id: 'ananya', name: 'Ananya Sharma', class: '5', section: 'B', rollNo: '22' }
  ];

  const academicYears = ['2024-25', '2023-24', '2022-23'];

  const reports: Report[] = [
    { id: 1, type: 'Exam Report', examTerm: 'Mid Term', date: '10 Feb', status: 'Published', isNew: true },
    { id: 2, type: 'Subject Report', examTerm: 'Mathematics', date: '12 Feb', status: 'Published' },
    { id: 3, type: 'Term Report', examTerm: 'Term 1', date: '20 Jan', status: 'Published' },
    { id: 4, type: 'Exam Report', examTerm: 'Unit Test 3', date: '05 Feb', status: 'Processing' },
    { id: 5, type: 'Subject Report', examTerm: 'Science', date: '15 Feb', status: 'Published' },
    { id: 6, type: 'Term Report', examTerm: 'Term 2', date: '15 Mar', status: 'Not Available' },
  ];

  const subjectPerformance: SubjectPerformance[] = [
    { id: 1, subject: 'Mathematics', icon: '📐', marks: 78, totalMarks: 100, grade: 'B+', classAverage: 72, performance: 'good' },
    { id: 2, subject: 'English', icon: '📘', marks: 85, totalMarks: 100, grade: 'A', classAverage: 78, performance: 'good' },
    { id: 3, subject: 'Science', icon: '🔬', marks: 92, totalMarks: 100, grade: 'A+', classAverage: 80, performance: 'good' },
    { id: 4, subject: 'Social Science', icon: '🌍', marks: 68, totalMarks: 100, grade: 'C+', classAverage: 70, performance: 'needs-improvement' },
    { id: 5, subject: 'Hindi', icon: '🌐', marks: 74, totalMarks: 100, grade: 'B', classAverage: 72, performance: 'average' },
    { id: 6, subject: 'Computer Science', icon: '💻', marks: 88, totalMarks: 100, grade: 'A', classAverage: 75, performance: 'good' },
  ];

  // Chart Data
  const barChartData = subjectPerformance.map(sub => ({
    subject: sub.subject.split(' ')[0],
    marks: sub.marks,
    classAvg: sub.classAverage
  }));

  const lineChartData = [
    { exam: 'UT1', percentage: 72 },
    { exam: 'UT2', percentage: 75 },
    { exam: 'Mid', percentage: 78 },
    { exam: 'UT3', percentage: 80 },
  ];

  const currentStudent = students.find(s => s.id === selectedStudent);
  const overallPercentage = 78;
  const averageGrade = 'B+';
  const subjectsNeedingAttention = subjectPerformance.filter(s => s.performance === 'needs-improvement').length;
  const attendancePercentage = 92;
  const newReportsCount = reports.filter(r => r.isNew).length;
  const bestSubject = subjectPerformance.reduce((max, sub) => sub.marks > max.marks ? sub : max);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-700 border-green-200';
      case 'Processing': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Not Available': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'good': return 'border-green-200 bg-green-50';
      case 'average': return 'border-amber-200 bg-amber-50';
      case 'needs-improvement': return 'border-red-200 bg-red-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getPerformanceIcon = (performance: string) => {
    switch (performance) {
      case 'good': return '🟩';
      case 'average': return '🟨';
      case 'needs-improvement': return '🟥';
      default: return '⬜';
    }
  };

  const filteredReports = activeTab === 'all' 
    ? reports 
    : reports.filter(r => {
        if (activeTab === 'exam') return r.type === 'Exam Report';
        if (activeTab === 'subject') return r.type === 'Subject Report';
        if (activeTab === 'term') return r.type === 'Term Report';
        return true;
      });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 mb-8 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            
            {/* Left: Title */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">📊 Student Reports</h1>
                {newReportsCount > 0 && (
                  <div className="relative">
                    <Bell className="w-6 h-6 text-amber-300" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {newReportsCount}
                    </span>
                  </div>
                )}
              </div>
              <p className="text-indigo-100">Academic performance overview</p>
            </div>

            {/* Right: Student Info Card */}
            <div className="bg-white/95 backdrop-blur rounded-xl p-5 shadow-lg min-w-[280px]">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">👦</span>
                  <select 
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                    className="flex-1 bg-transparent border-0 font-semibold text-slate-800 cursor-pointer focus:outline-none"
                  >
                    {students.map(student => (
                      <option key={student.id} value={student.id}>{student.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center gap-2 text-slate-600">
                  <span>🎓</span>
                  <span className="text-sm">Class {currentStudent?.class} {currentStudent?.section}</span>
                </div>
                
                <div className="flex items-center gap-2 text-slate-600">
                  <span>🆔</span>
                  <span className="text-sm">Roll No: {currentStudent?.rollNo}</span>
                </div>
                
                <div className="relative">
                  <select 
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full appearance-none bg-indigo-50 border border-indigo-200 rounded-lg px-3 py-2 pr-8 text-sm font-medium text-indigo-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  >
                    {academicYears.map(year => (
                      <option key={year} value={year}>📅 {year}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-600 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* Overall Percentage */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-sm border border-green-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white text-xl shadow-md">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-green-700 font-medium">Overall Percentage</p>
                <p className="text-3xl font-bold text-green-800">{overallPercentage}%</p>
              </div>
            </div>
            <div className="w-full bg-green-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${overallPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Average Grade */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 shadow-sm border border-amber-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-white text-xl shadow-md">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-amber-700 font-medium">Average Grade</p>
                <p className="text-3xl font-bold text-amber-800">{averageGrade}</p>
              </div>
            </div>
          </div>

          {/* Subjects Needing Attention */}
          <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-6 shadow-sm border border-red-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center text-white text-xl shadow-md">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-red-700 font-medium">Needs Attention</p>
                <p className="text-3xl font-bold text-red-800">{subjectsNeedingAttention} Subjects</p>
              </div>
            </div>
          </div>

          {/* Attendance Impact */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 shadow-sm border border-blue-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white text-xl shadow-md">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-blue-700 font-medium">Attendance</p>
                <p className="text-3xl font-bold text-blue-800">{attendancePercentage}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* BEST SUBJECT HIGHLIGHT */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex items-center gap-4">
            <Star className="w-10 h-10 text-yellow-300 fill-yellow-300" />
            <div className="flex-1">
              <p className="text-purple-100 text-sm font-medium">⭐ Best Performance</p>
              <p className="text-white text-xl font-bold">{bestSubject.subject} - {bestSubject.marks}/{bestSubject.totalMarks} ({bestSubject.grade})</p>
            </div>
            <div className="text-5xl">{bestSubject.icon}</div>
          </div>
        </div>

        {/* REPORT TYPES SECTION */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mb-8">
          
          {/* Tabs */}
          <div className="border-b border-slate-200 p-2">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Reports', icon: FileText },
                { id: 'exam', label: 'Exam Reports', icon: Award },
                { id: 'subject', label: 'Subject-wise', icon: BarChart3 },
                { id: 'term', label: 'Term-wise', icon: Calendar }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reports Table */}
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Report Type</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Exam / Term</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.map(report => (
                    <tr key={report.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-indigo-600" />
                          <span className="font-medium text-slate-800">{report.type}</span>
                          {report.isNew && (
                            <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-bold">NEW</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-700">{report.examTerm}</td>
                      <td className="py-4 px-4 text-slate-600 text-sm">{report.date}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          {report.status === 'Published' ? (
                            <>
                              <button className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                                <Eye className="w-4 h-4" />
                                View
                              </button>
                              <button className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                                <Download className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <span className="text-slate-400 text-sm">Not available</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SUBJECT-WISE PERFORMANCE CARDS */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-indigo-600" />
            Subject-wise Performance
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjectPerformance.map(subject => (
              <div 
                key={subject.id}
                className={`bg-white rounded-2xl p-6 shadow-sm border-2 transition-all hover:shadow-lg hover:-translate-y-1 ${getPerformanceColor(subject.performance)}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{subject.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-800">{subject.subject}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs">{getPerformanceIcon(subject.performance)}</span>
                      <span className="text-xs font-medium text-slate-500 capitalize">{subject.performance.replace('-', ' ')}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Marks:</span>
                    <span className="text-xl font-bold text-slate-800">{subject.marks} / {subject.totalMarks}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Grade:</span>
                    <span className="text-lg font-bold text-amber-600">{subject.grade}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Class Avg:</span>
                    <span className="text-sm font-semibold text-slate-700">{subject.classAverage}</span>
                  </div>

                  <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-sm">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PERFORMANCE CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Bar Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              Subject-wise Marks Comparison
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="subject" stroke="#64748b" style={{ fontSize: '12px' }} />
                <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }} 
                />
                <Legend />
                <Bar dataKey="marks" fill="#6366f1" name="Your Marks" radius={[8, 8, 0, 0]} />
                <Bar dataKey="classAvg" fill="#94a3b8" name="Class Average" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Progress Over Time
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="exam" stroke="#64748b" style={{ fontSize: '12px' }} />
                <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }} 
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="percentage" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  name="Overall %" 
                  dot={{ fill: '#10b981', r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* INSIGHTS & TEACHER REMARKS */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-8">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            Teacher's Remarks & Insights
          </h3>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-5">
            <p className="text-slate-700 leading-relaxed italic">
              "Student shows strong understanding in Science but needs improvement in Mathematics problem-solving. 
              Consistent effort in homework and class participation is commendable. Recommend additional practice 
              in algebraic concepts and word problems."
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
              <span className="font-semibold">— Ms. Priya Sharma</span>
              <span className="text-slate-400">|</span>
              <span>Class Teacher</span>
            </div>
          </div>
        </div>

        {/* DOWNLOAD & EXPORT SECTION */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-8 shadow-lg">
          <h3 className="text-xl font-bold text-white mb-6">📥 Download & Export Options</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center gap-3 bg-white text-slate-800 px-6 py-4 rounded-xl font-semibold hover:bg-slate-50 transition-all shadow-md hover:shadow-lg">
              <FileText className="w-5 h-5 text-red-600" />
              Download Report Card (PDF)
            </button>
            
            <button className="flex items-center justify-center gap-3 bg-white text-slate-800 px-6 py-4 rounded-xl font-semibold hover:bg-slate-50 transition-all shadow-md hover:shadow-lg">
              <FileSpreadsheet className="w-5 h-5 text-green-600" />
              Export Excel
            </button>
            
            <button className="flex items-center justify-center gap-3 bg-white text-slate-800 px-6 py-4 rounded-xl font-semibold hover:bg-slate-50 transition-all shadow-md hover:shadow-lg">
              <Printer className="w-5 h-5 text-blue-600" />
              Print Report
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReportsScreen;