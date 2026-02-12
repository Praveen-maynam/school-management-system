import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon,
  ChevronDown,
  Search,
  Users,
  UserCheck,
  UserX,
  Clock,
  TrendingUp,
  Download,
  Send,
  Edit,
  Eye,
  CheckCircle,
  AlertTriangle,
  FileText,
  X,
  Mail
} from 'lucide-react';
import {
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
  rollNo: string;
  name: string;
  status: 'Present' | 'Absent' | 'Leave';
  inTime?: string;
  remarks?: string;
  attendancePercentage: number;
  presentDays: number;
  absentDays: number;
  leaveDays: number;
  monthlyAttendance: { date: string; status: 'Present' | 'Absent' | 'Leave' }[];
}

interface ClassSection {
  id: string;
  name: string;
}

interface CalendarDay {
  date: number;
  presentCount: number;
  absentCount: number;
  leaveCount: number;
  isToday: boolean;
}

const ViewAttendanceScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('2025-02-10');
  const [selectedClass, setSelectedClass] = useState<string>('class-6a');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showMarkAllModal, setShowMarkAllModal] = useState<boolean>(false);

  const classes: ClassSection[] = [
    { id: 'class-6a', name: 'Class 6 - A' },
    { id: 'class-6b', name: 'Class 6 - B' },
    { id: 'class-7a', name: 'Class 7 - A' },
    { id: 'class-8a', name: 'Class 8 - A' },
  ];

  const students: Student[] = [
    {
      rollNo: '01',
      name: 'Rahul Kumar',
      status: 'Present',
      inTime: '09:05 AM',
      remarks: '',
      attendancePercentage: 92,
      presentDays: 23,
      absentDays: 1,
      leaveDays: 1,
      monthlyAttendance: []
    },
    {
      rollNo: '02',
      name: 'Sita Devi',
      status: 'Absent',
      remarks: 'Sick',
      attendancePercentage: 68,
      presentDays: 17,
      absentDays: 7,
      leaveDays: 1,
      monthlyAttendance: []
    },
    {
      rollNo: '03',
      name: 'Arjun Rao',
      status: 'Leave',
      remarks: 'Approved',
      attendancePercentage: 88,
      presentDays: 22,
      absentDays: 1,
      leaveDays: 2,
      monthlyAttendance: []
    },
    {
      rollNo: '04',
      name: 'Priya Sharma',
      status: 'Present',
      inTime: '08:55 AM',
      attendancePercentage: 96,
      presentDays: 24,
      absentDays: 0,
      leaveDays: 1,
      monthlyAttendance: []
    },
    {
      rollNo: '05',
      name: 'Amit Singh',
      status: 'Present',
      inTime: '09:10 AM',
      attendancePercentage: 84,
      presentDays: 21,
      absentDays: 3,
      leaveDays: 1,
      monthlyAttendance: []
    },
    {
      rollNo: '06',
      name: 'Neha Patel',
      status: 'Absent',
      remarks: 'Not informed',
      attendancePercentage: 72,
      presentDays: 18,
      absentDays: 6,
      leaveDays: 1,
      monthlyAttendance: []
    },
    {
      rollNo: '07',
      name: 'Karan Mehta',
      status: 'Present',
      inTime: '09:00 AM',
      attendancePercentage: 90,
      presentDays: 23,
      absentDays: 2,
      leaveDays: 0,
      monthlyAttendance: []
    },
    {
      rollNo: '08',
      name: 'Anjali Verma',
      status: 'Leave',
      remarks: 'Family function',
      attendancePercentage: 86,
      presentDays: 22,
      absentDays: 2,
      leaveDays: 1,
      monthlyAttendance: []
    },
  ];

  // Calendar data for February 2025
  const calendarDays: CalendarDay[] = Array.from({ length: 28 }, (_, i) => ({
    date: i + 1,
    presentCount: Math.floor(Math.random() * 10) + 30,
    absentCount: Math.floor(Math.random() * 5) + 2,
    leaveCount: Math.floor(Math.random() * 3) + 1,
    isToday: i + 1 === 10
  }));

  // Trend data
  const trendData = [
    { week: 'Week 1', percentage: 88 },
    { week: 'Week 2', percentage: 90 },
    { week: 'Week 3', percentage: 85 },
    { week: 'Week 4', percentage: 87 },
  ];

  // Calculations
  const totalStudents = students.length;
  const presentCount = students.filter(s => s.status === 'Present').length;
  const absentCount = students.filter(s => s.status === 'Absent').length;
  const leaveCount = students.filter(s => s.status === 'Leave').length;
  const attendancePercentage = Math.round((presentCount / totalStudents) * 100);
  const lowAttendanceStudents = students.filter(s => s.attendancePercentage < 75);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNo.includes(searchQuery)
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Present':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'Absent':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'Leave':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Present':
        return '🟢';
      case 'Absent':
        return '🔴';
      case 'Leave':
        return '🟡';
      default:
        return '⚪';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 mb-8 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            
            {/* Left: Title */}
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">📊 Student Attendance</h1>
              <p className="text-indigo-100">Class-wise & date-wise attendance overview</p>
            </div>

            {/* Right: Controls */}
            <div className="bg-white/95 backdrop-blur rounded-xl p-5 shadow-lg min-w-[320px]">
              <div className="space-y-3">
                
                {/* Date Picker */}
                <div className="relative">
                  <label className="text-xs font-medium text-slate-600 mb-1 block">📅 Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                </div>

                {/* Class Dropdown */}
                <div className="relative">
                  <label className="text-xs font-medium text-slate-600 mb-1 block">🏫 Class</label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full appearance-none px-3 py-2 pr-8 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  >
                    {classes.map(cls => (
                      <option key={cls.id} value={cls.id}>{cls.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-[34px] w-4 h-4 text-slate-400 pointer-events-none" />
                </div>

                {/* Search */}
                <div className="relative">
                  <label className="text-xs font-medium text-slate-600 mb-1 block">🔍 Search</label>
                  <input
                    type="text"
                    placeholder="Name or Roll No..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 pl-9 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                  <Search className="absolute left-3 top-[34px] w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          
          {/* Total Students */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs text-slate-600 font-medium">Total Students</p>
                <p className="text-2xl font-bold text-slate-800">{totalStudents}</p>
              </div>
            </div>
          </div>

          {/* Present */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 shadow-sm border border-green-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-green-700 font-medium">Present</p>
                <p className="text-2xl font-bold text-green-800">{presentCount}</p>
              </div>
            </div>
          </div>

          {/* Absent */}
          <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-5 shadow-sm border border-red-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <UserX className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-red-700 font-medium">Absent</p>
                <p className="text-2xl font-bold text-red-800">{absentCount}</p>
              </div>
            </div>
          </div>

          {/* On Leave */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-5 shadow-sm border border-yellow-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-yellow-700 font-medium">On Leave</p>
                <p className="text-2xl font-bold text-yellow-800">{leaveCount}</p>
              </div>
            </div>
          </div>

          {/* Attendance % */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5 shadow-sm border border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-blue-700 font-medium">Attendance %</p>
                <p className="text-2xl font-bold text-blue-800">{attendancePercentage}%</p>
              </div>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${attendancePercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* ATTENTION ALERT */}
        {lowAttendanceStudents.length > 0 && (
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 mb-8 shadow-lg">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-white flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-white text-lg font-bold mb-2">⚠️ Attention Required</h3>
                <p className="text-white/90 mb-3">
                  {lowAttendanceStudents.length} student{lowAttendanceStudents.length > 1 ? 's' : ''} with attendance below 75%
                </p>
                <div className="flex flex-wrap gap-2">
                  {lowAttendanceStudents.map(student => (
                    <span key={student.rollNo} className="px-3 py-1 bg-white/20 backdrop-blur rounded-lg text-white text-sm font-medium">
                      {student.name} ({student.attendancePercentage}%)
                    </span>
                  ))}
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-white text-orange-600 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
                <Send className="w-4 h-4" />
                Notify Parents
              </button>
            </div>
          </div>
        )}

        {/* MONTHLY CALENDAR */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-indigo-600" />
            February 2025 - Monthly Overview
          </h2>
          
          <div className="grid grid-cols-7 gap-2">
            {/* Day headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-xs font-semibold text-slate-600 py-2">
                {day}
              </div>
            ))}
            
            {/* Empty cells for alignment (Feb 2025 starts on Saturday) */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square"></div>
            ))}
            
            {/* Calendar days */}
            {calendarDays.map(day => (
              <div
                key={day.date}
                className={`aspect-square border rounded-lg p-2 cursor-pointer hover:shadow-md transition-all ${
                  day.isToday
                    ? 'bg-indigo-100 border-indigo-400 ring-2 ring-indigo-300'
                    : 'bg-white border-slate-200 hover:border-indigo-300'
                }`}
                title={`Present: ${day.presentCount}, Absent: ${day.absentCount}, Leave: ${day.leaveCount}`}
              >
                <div className="text-sm font-semibold text-slate-800 mb-1">{day.date}</div>
                <div className="flex gap-0.5">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Present</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Absent</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Leave</span>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button 
            onClick={() => setShowMarkAllModal(true)}
            className="flex items-center gap-2 px-5 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-md"
          >
            <CheckCircle className="w-5 h-5" />
            Mark All Present
          </button>
          
          <button className="flex items-center gap-2 px-5 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors shadow-md">
            <Send className="w-5 h-5" />
            Send Absentee Notification
          </button>
          
          <button className="flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-md">
            <Download className="w-5 h-5" />
            Export Excel
          </button>
          
          <button className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md">
            <FileText className="w-5 h-5" />
            Export PDF
          </button>
        </div>

        {/* STUDENT ATTENDANCE TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mb-8">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Users className="w-6 h-6 text-indigo-600" />
              Today's Attendance ({selectedDate})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Roll No</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Student Name</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">In Time</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Remarks</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr 
                    key={student.rollNo}
                    className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                      student.attendancePercentage < 75 ? 'bg-red-50' : ''
                    }`}
                  >
                    <td className="py-4 px-6">
                      <span className="font-semibold text-slate-700">{student.rollNo}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-800">{student.name}</span>
                        {student.attendancePercentage < 75 && (
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span>{getStatusIcon(student.status)}</span>
                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getStatusBadge(student.status)}`}>
                          {student.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-slate-600 text-sm">
                        {student.inTime || '—'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-slate-600 text-sm">
                        {student.remarks || '—'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setSelectedStudent(student)}
                          className="p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-2 bg-amber-100 text-amber-600 rounded-lg hover:bg-amber-200 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        {student.status === 'Absent' && (
                          <button 
                            className="p-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors"
                            title="Notify Parent"
                          >
                            <Mail className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ATTENDANCE TREND CHART */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-600" />
            Class Attendance Trend (Monthly)
          </h2>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="week" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} domain={[0, 100]} />
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
                name="Attendance %"
                dot={{ fill: '#10b981', r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* STUDENT DETAIL DRAWER */}
      {selectedStudent && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedStudent(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-8 rounded-t-3xl">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedStudent.name}</h2>
                  <p className="text-indigo-100">Roll No: {selectedStudent.rollNo}</p>
                </div>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="p-2 bg-white/20 backdrop-blur rounded-lg hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-8">
              {/* Monthly Summary */}
              <h3 className="text-lg font-bold text-slate-800 mb-4">📅 Monthly Attendance Summary</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-sm text-green-700 font-medium mb-1">🟢 Present Days</p>
                  <p className="text-3xl font-bold text-green-800">{selectedStudent.presentDays}</p>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-sm text-red-700 font-medium mb-1">🔴 Absent Days</p>
                  <p className="text-3xl font-bold text-red-800">{selectedStudent.absentDays}</p>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <p className="text-sm text-yellow-700 font-medium mb-1">🟡 Leave Days</p>
                  <p className="text-3xl font-bold text-yellow-800">{selectedStudent.leaveDays}</p>
                </div>
                
                <div className={`border-2 rounded-xl p-4 ${
                  selectedStudent.attendancePercentage >= 75 
                    ? 'bg-blue-50 border-blue-300' 
                    : 'bg-red-50 border-red-300'
                }`}>
                  <p className={`text-sm font-medium mb-1 ${
                    selectedStudent.attendancePercentage >= 75 ? 'text-blue-700' : 'text-red-700'
                  }`}>
                    📈 Attendance %
                  </p>
                  <p className={`text-3xl font-bold ${
                    selectedStudent.attendancePercentage >= 75 ? 'text-blue-800' : 'text-red-800'
                  }`}>
                    {selectedStudent.attendancePercentage}%
                  </p>
                </div>
              </div>

              {/* Warning if low */}
              {selectedStudent.attendancePercentage < 75 && (
                <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-800">Low Attendance Alert</p>
                      <p className="text-sm text-red-700 mt-1">
                        This student's attendance is below the required 75%. Parent notification recommended.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Teacher Remarks */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h4 className="font-semibold text-slate-800 mb-2">📝 Teacher Remarks</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {selectedStudent.remarks || 'No remarks available for this student.'}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
                  <Edit className="w-5 h-5" />
                  Edit Attendance
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors">
                  <Send className="w-5 h-5" />
                  Notify Parent
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MARK ALL PRESENT MODAL */}
      {showMarkAllModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setShowMarkAllModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Mark All Students Present?</h3>
              <p className="text-slate-600 mb-6">
                This will mark all {totalStudents} students as present for {selectedDate}.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowMarkAllModal(false)}
                  className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Mark all present logic here
                    setShowMarkAllModal(false);
                  }}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAttendanceScreen;