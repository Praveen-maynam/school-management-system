import React, { useState } from 'react';
import { 
  Calendar,
  TrendingUp,
  CheckCircle,
  XCircle,
  Coffee,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  User,
  Clock,
  FileText,
  Download,
  AlertCircle,
  Info
} from 'lucide-react';

// Types
interface AttendanceDay {
  date: number;
  status: 'present' | 'absent' | 'leave' | 'holiday' | 'future' | null;
  remark?: string;
  subjects?: {
    name: string;
    present: boolean;
  }[];
}

interface MonthData {
  month: string;
  year: number;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  leaveDays: number;
  percentage: number;
  days: AttendanceDay[];
}

interface Child {
  id: string;
  name: string;
  class: string;
  section: string;
  avatar: string;
}

// Mock Data
const mockChildren: Child[] = [
  {
    id: '1',
    name: 'Aarav Kumar',
    class: '8',
    section: 'A',
    avatar: 'AK'
  },
  {
    id: '2',
    name: 'Ananya Kumar',
    class: '5',
    section: 'B',
    avatar: 'AN'
  }
];

const generateMockAttendance = (): AttendanceDay[] => {
  const days: AttendanceDay[] = [];
  const statuses: ('present' | 'absent' | 'leave')[] = ['present', 'present', 'present', 'present', 'present', 'present', 'present', 'present', 'absent', 'present', 'present', 'present', 'leave', 'present', 'present', 'present', 'present', 'present', 'present', 'present', 'absent', 'present'];
  
  for (let i = 1; i <= 28; i++) {
    const dayOfWeek = new Date(2026, 1, i).getDay(); // February 2026
    
    if (dayOfWeek === 0) { // Sunday
      days.push({
        date: i,
        status: 'holiday',
        remark: 'Sunday - Holiday'
      });
    } else if (i > 22) { // Future dates
      days.push({
        date: i,
        status: 'future'
      });
    } else {
      const status = statuses[i - 1] || 'present';
      days.push({
        date: i,
        status: status,
        remark: status === 'absent' ? 'Not marked present' : status === 'leave' ? 'Applied leave' : 'Marked present',
        subjects: status === 'present' ? [
          { name: 'Mathematics', present: true },
          { name: 'English', present: true },
          { name: 'Science', present: true },
          { name: 'Social Studies', present: true }
        ] : []
      });
    }
  }
  
  return days;
};

const mockMonthData: MonthData = {
  month: 'February',
  year: 2026,
  totalDays: 22,
  presentDays: 20,
  absentDays: 1,
  leaveDays: 1,
  percentage: 92,
  days: generateMockAttendance()
};

const AttendanceScreen: React.FC = () => {
  const [selectedChild, setSelectedChild] = useState<Child>(mockChildren[0]);
  const [selectedMonth, setSelectedMonth] = useState('February 2026');
  const [selectedDay, setSelectedDay] = useState<AttendanceDay | null>(null);
  const [showChildDropdown, setShowChildDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'absent':
        return 'bg-red-100 border-red-300 text-red-800';
      case 'leave':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'holiday':
        return 'bg-gray-100 border-gray-300 text-gray-500';
      case 'future':
        return 'bg-gray-50 border-gray-200 text-gray-400';
      default:
        return 'bg-white border-gray-200 text-gray-400';
    }
  };

  const getStatusIcon = (status: string | null) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'absent':
        return <XCircle className="text-red-600" size={20} />;
      case 'leave':
        return <Coffee className="text-yellow-600" size={20} />;
      case 'holiday':
        return <Calendar className="text-gray-500" size={20} />;
      default:
        return null;
    }
  };

  const getAttendanceLabel = (percentage: number) => {
    if (percentage >= 90) return { text: 'Excellent attendance', color: 'text-green-600' };
    if (percentage >= 75) return { text: 'Good attendance', color: 'text-yellow-600' };
    if (percentage >= 60) return { text: 'Average attendance', color: 'text-orange-600' };
    return { text: 'Poor attendance', color: 'text-red-600' };
  };

  // Generate calendar grid with proper starting day
  const getCalendarGrid = () => {
    const firstDay = new Date(2026, 1, 1).getDay(); // 0 = Sunday
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1; // Convert to Mon-Sun (0-6)
    
    const grid: (AttendanceDay | null)[] = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < adjustedFirstDay; i++) {
      grid.push(null);
    }
    
    // Add all days of the month
    grid.push(...mockMonthData.days);
    
    return grid;
  };

  const calendarGrid = getCalendarGrid();
  const attendanceLabel = getAttendanceLabel(mockMonthData.percentage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-100 via-amber-50 to-yellow-100 border-b border-orange-200 sticky top-0 z-40 shadow-sm backdrop-blur-sm bg-opacity-90">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent mb-2">
                Attendance
              </h1>
              <p className="text-gray-700 font-medium">Monthly attendance overview</p>
            </div>

            <div className="flex items-center gap-4">
              {/* Month Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowMonthDropdown(!showMonthDropdown)}
                  className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all border-2 border-orange-200"
                >
                  <Calendar className="text-orange-600" size={20} />
                  <span className="font-semibold text-gray-900">{selectedMonth}</span>
                  <ChevronDown className="text-orange-600" size={18} />
                </button>

                {showMonthDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border-2 border-orange-200 overflow-hidden z-50">
                    {['January 2026', 'February 2026', 'March 2026'].map((month) => (
                      <button
                        key={month}
                        onClick={() => {
                          setSelectedMonth(month);
                          setShowMonthDropdown(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors ${
                          selectedMonth === month ? 'bg-orange-50 font-semibold text-orange-600' : 'text-gray-700'
                        }`}
                      >
                        {month}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Student Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowChildDropdown(!showChildDropdown)}
                  className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all border-2 border-orange-200"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {selectedChild.avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 text-sm">{selectedChild.name}</div>
                    <div className="text-xs text-gray-600">Class {selectedChild.class}-{selectedChild.section}</div>
                  </div>
                  <ChevronDown className="text-orange-600" size={18} />
                </button>

                {showChildDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border-2 border-orange-200 overflow-hidden z-50">
                    {mockChildren.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => {
                          setSelectedChild(child);
                          setShowChildDropdown(false);
                        }}
                        className={`w-full flex items-center gap-3 p-3 hover:bg-orange-50 transition-colors ${
                          selectedChild.id === child.id ? 'bg-orange-50' : ''
                        }`}
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {child.avatar}
                        </div>
                        <div className="text-left flex-1">
                          <div className="font-semibold text-gray-900 text-sm">{child.name}</div>
                          <div className="text-xs text-gray-600">Class {child.class}-{child.section}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Attendance Summary */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-orange-100 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Circular Progress */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <svg className="transform -rotate-90" width="200" height="200">
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="#FED7AA"
                    strokeWidth="12"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 90}`}
                    strokeDashoffset={`${2 * Math.PI * 90 * (1 - mockMonthData.percentage / 100)}`}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F97316" />
                      <stop offset="100%" stopColor="#F59E0B" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                    {mockMonthData.percentage}%
                  </div>
                  <div className="text-sm text-gray-600 font-semibold mt-1">Attendance</div>
                </div>
              </div>
              <div className={`mt-4 text-lg font-bold ${attendanceLabel.color}`}>
                {attendanceLabel.text}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <CheckCircle className="text-white" size={24} />
                  </div>
                  <div className="text-sm font-semibold text-gray-600">Present</div>
                </div>
                <div className="text-4xl font-bold text-green-700">{mockMonthData.presentDays}</div>
                <div className="text-sm text-gray-600 mt-1">Days</div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-6 border-2 border-red-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                    <XCircle className="text-white" size={24} />
                  </div>
                  <div className="text-sm font-semibold text-gray-600">Absent</div>
                </div>
                <div className="text-4xl font-bold text-red-700">{mockMonthData.absentDays}</div>
                <div className="text-sm text-gray-600 mt-1">Days</div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 border-2 border-yellow-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                    <Coffee className="text-white" size={24} />
                  </div>
                  <div className="text-sm font-semibold text-gray-600">Leave</div>
                </div>
                <div className="text-4xl font-bold text-yellow-700">{mockMonthData.leaveDays}</div>
                <div className="text-sm text-gray-600 mt-1">Days</div>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Calendar */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-orange-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Monthly Calendar</h2>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-orange-50 rounded-lg transition-colors">
                <ChevronLeft className="text-orange-600" size={20} />
              </button>
              <span className="font-bold text-lg text-gray-700 px-4">
                {mockMonthData.month} {mockMonthData.year}
              </span>
              <button className="p-2 hover:bg-orange-50 rounded-lg transition-colors">
                <ChevronRight className="text-orange-600" size={20} />
              </button>
            </div>
          </div>

          {/* Week Days Header */}
          <div className="grid grid-cols-7 gap-2 mb-3">
            {weekDays.map((day) => (
              <div key={day} className="text-center font-bold text-gray-600 text-sm py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarGrid.map((day, index) => (
              <div
                key={index}
                onClick={() => day && day.status !== 'future' && setSelectedDay(day)}
                className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                  day
                    ? `${getStatusColor(day.status)} ${
                        day.status !== 'future' && day.status !== 'holiday'
                          ? 'cursor-pointer hover:shadow-lg hover:scale-105'
                          : ''
                      }`
                    : 'bg-transparent border-transparent'
                }`}
              >
                {day && (
                  <>
                    <div className="text-lg font-bold mb-1">{day.date}</div>
                    {getStatusIcon(day.status)}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-orange-100 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Info className="text-orange-600" size={20} />
            <h3 className="text-lg font-bold text-gray-900">Legend</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-200">
              <CheckCircle className="text-green-600" size={20} />
              <span className="font-semibold text-gray-900">Present</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-200">
              <XCircle className="text-red-600" size={20} />
              <span className="font-semibold text-gray-900">Absent</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
              <Coffee className="text-yellow-600" size={20} />
              <span className="font-semibold text-gray-900">Leave</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
              <Calendar className="text-gray-500" size={20} />
              <span className="font-semibold text-gray-900">Holiday</span>
            </div>
          </div>
        </div>

        {/* Day Details Panel */}
        {selectedDay ? (
          <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-orange-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Day Details</h3>
              <button
                onClick={() => setSelectedDay(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
                  {selectedDay.date}
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900 mb-1">
                    {mockMonthData.month} {selectedDay.date}, {mockMonthData.year}
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(selectedDay.status)}
                    <span className="font-semibold text-gray-700 capitalize">
                      {selectedDay.status}
                    </span>
                  </div>
                </div>
              </div>

              {selectedDay.remark && (
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="text-blue-600" size={18} />
                    <span className="font-semibold text-gray-900">Remark</span>
                  </div>
                  <p className="text-gray-700">{selectedDay.remark}</p>
                </div>
              )}

              {selectedDay.subjects && selectedDay.subjects.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Subject-wise Attendance</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedDay.subjects.map((subject, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200"
                      >
                        <span className="font-semibold text-gray-900">{subject.name}</span>
                        {subject.present ? (
                          <CheckCircle className="text-green-600" size={20} />
                        ) : (
                          <XCircle className="text-red-600" size={20} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 shadow-lg border-2 border-orange-100 text-center">
            <Calendar className="text-orange-300 mx-auto mb-4" size={64} />
            <p className="text-gray-500 text-lg font-medium">Select a date to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceScreen;