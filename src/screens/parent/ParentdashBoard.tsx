





import React, { useState } from 'react';
import { 
  User,
  TrendingUp,
  Calendar,
  BookOpen,
  DollarSign,
  Mail,
  Bell,
  FileText,
  CreditCard,
  MessageSquare,
  Clock,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Award,
  Target,
  Activity,
  PieChart,
  BarChart3,
  Download
} from 'lucide-react';

// Types
interface Child {
  id: string;
  name: string;
  class: string;
  section: string;
  rollNo: number;
  avatar: string;
}

interface DashboardStats {
  attendance: number;
  upcomingExams: number;
  pendingHomework: number;
  feeDue: number;
  unreadMessages: number;
}

interface TodayClass {
  subject: string;
  time: string;
  teacher: string;
  icon: string;
}

interface Homework {
  subject: string;
  task: string;
  dueDate: string;
  status: 'pending' | 'completed';
}

interface Alert {
  id: string;
  type: 'warning' | 'info' | 'urgent';
  message: string;
  date: string;
}

// Mock Data
const mockChildren: Child[] = [
  {
    id: '1',
    name: 'Aarav Kumar',
    class: '8',
    section: 'A',
    rollNo: 12,
    avatar: 'AK'
  },
  {
    id: '2',
    name: 'Ananya Kumar',
    class: '5',
    section: 'B',
    rollNo: 24,
    avatar: 'AN'
  }
];

const mockStats: DashboardStats = {
  attendance: 92,
  upcomingExams: 3,
  pendingHomework: 2,
  feeDue: 4500,
  unreadMessages: 5
};

const mockTodayClasses: TodayClass[] = [
  { subject: 'Mathematics', time: '8:00 AM', teacher: 'Mrs. Sharma', icon: '📐' },
  { subject: 'English', time: '9:00 AM', teacher: 'Mr. Patel', icon: '📚' },
  { subject: 'Science', time: '10:30 AM', teacher: 'Dr. Kumar', icon: '🔬' },
  { subject: 'Social Studies', time: '12:00 PM', teacher: 'Ms. Singh', icon: '🌍' },
  { subject: 'Computer', time: '2:00 PM', teacher: 'Mr. Reddy', icon: '💻' }
];

const mockHomework: Homework[] = [
  {
    subject: 'Mathematics',
    task: 'Complete Chapter 5 Exercises (Q 1-15)',
    dueDate: 'Today',
    status: 'pending'
  },
  {
    subject: 'Science',
    task: 'Draw and label plant cell diagram',
    dueDate: 'Tomorrow',
    status: 'pending'
  }
];

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'urgent',
    message: 'Fee due by 15 Feb 2024',
    date: '2024-02-05'
  },
  {
    id: '2',
    type: 'warning',
    message: 'Parent-Teacher Meeting on Friday, 3:00 PM',
    date: '2024-02-09'
  },
  {
    id: '3',
    type: 'info',
    message: 'Mathematics Unit Test tomorrow',
    date: '2024-02-06'
  }
];

const ParentDashboardScreen: React.FC = () => {
  const [selectedChild, setSelectedChild] = useState<Child>(mockChildren[0]);
  const [showChildDropdown, setShowChildDropdown] = useState(false);

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return 'from-green-400 to-emerald-500';
    if (percentage >= 75) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-rose-500';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-100 via-amber-50 to-yellow-100 border-b border-orange-200 sticky top-0 z-40 shadow-sm backdrop-blur-sm bg-opacity-90">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent mb-2">
                Parent Dashboard
              </h1>
              <p className="text-gray-700 font-medium">Stay updated on your child's school activities</p>
            </div>

            {/* Child Selector */}
            <div className="relative">
              <button
                onClick={() => setShowChildDropdown(!showChildDropdown)}
                className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-orange-200"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {selectedChild.avatar}
                </div>
                <div className="text-left">
                  <div className="font-bold text-gray-900">{selectedChild.name}</div>
                  <div className="text-sm text-gray-600">
                    Class {selectedChild.class} - Section {selectedChild.section}
                  </div>
                </div>
                <ChevronDown className="text-orange-600" size={20} />
              </button>

              {showChildDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border-2 border-orange-200 overflow-hidden z-50">
                  {mockChildren.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => {
                        setSelectedChild(child);
                        setShowChildDropdown(false);
                      }}
                      className={`w-full flex items-center gap-4 p-4 hover:bg-orange-50 transition-colors ${
                        selectedChild.id === child.id ? 'bg-orange-50' : ''
                      }`}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                        {child.avatar}
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-bold text-gray-900">{child.name}</div>
                        <div className="text-sm text-gray-600">
                          Class {child.class} - Section {child.section}
                        </div>
                      </div>
                      {selectedChild.id === child.id && (
                        <CheckCircle className="text-orange-600" size={20} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          

          {/* Attendance */}
          <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-green-100 group cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Activity className="text-green-600" size={24} />
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <div className="relative">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                {mockStats.attendance}%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className={`bg-gradient-to-r ${getAttendanceColor(mockStats.attendance)} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${mockStats.attendance}%` }}
                ></div>
              </div>
              <div className="text-sm font-semibold text-gray-600">Attendance</div>
            </div>
          </div>

          {/* Upcoming Exams */}
          <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-blue-100 group cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="text-blue-600" size={24} />
              </div>
            </div>
            <div className="text-4xl font-bold text-blue-600 mb-2">{mockStats.upcomingExams}</div>
            <div className="text-sm font-semibold text-gray-600">Upcoming Exams</div>
          </div>

          {/* Pending Homework */}
          <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-amber-100 group cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="text-amber-600" size={24} />
              </div>
            </div>
            <div className="text-4xl font-bold text-amber-600 mb-2">{mockStats.pendingHomework}</div>
            <div className="text-sm font-semibold text-gray-600">Pending Tasks</div>
          </div>

          {/* Fee Due */}
          <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-red-100 group cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <DollarSign className="text-red-600" size={24} />
              </div>
              {mockStats.feeDue > 0 && (
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </div>
            <div className="text-3xl font-bold text-red-600 mb-2">₹{mockStats.feeDue.toLocaleString()}</div>
            <div className="text-sm font-semibold text-gray-600">Fee Due</div>
          </div>

          {/* Unread Messages */}
          <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-purple-100 group cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="text-purple-600" size={24} />
              </div>
              {mockStats.unreadMessages > 0 && (
                <span className="px-2 py-1 bg-purple-600 text-white rounded-full text-xs font-bold">
                  {mockStats.unreadMessages}
                </span>
              )}
            </div>
            <div className="text-4xl font-bold text-purple-600 mb-2">{mockStats.unreadMessages}</div>
            <div className="text-sm font-semibold text-gray-600">New Messages</div>
          </div>
        </div>

        {/* Important Alerts */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="text-orange-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-900">Important Alerts</h2>
          </div>
          <div className="space-y-3">
            {mockAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`rounded-2xl p-5 shadow-md border-l-4 ${
                  alert.type === 'urgent'
                    ? 'bg-red-50 border-red-500'
                    : alert.type === 'warning'
                    ? 'bg-amber-50 border-amber-500'
                    : 'bg-blue-50 border-blue-500'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      alert.type === 'urgent'
                        ? 'bg-red-100'
                        : alert.type === 'warning'
                        ? 'bg-amber-100'
                        : 'bg-blue-100'
                    }`}
                  >
                    <AlertCircle
                      className={
                        alert.type === 'urgent'
                          ? 'text-red-600'
                          : alert.type === 'warning'
                          ? 'text-amber-600'
                          : 'text-blue-600'
                      }
                      size={24}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 text-lg">{alert.message}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {new Date(alert.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                  <ChevronRight className="text-gray-400" size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Snapshot */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Today's Timetable */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-orange-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
                  <Calendar className="text-orange-600" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Today's Classes</h3>
              </div>
              <Clock className="text-gray-400" size={20} />
            </div>
            <div className="space-y-3">
              {mockTodayClasses.map((cls, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl hover:shadow-md transition-all border border-orange-100"
                >
                  <div className="text-3xl">{cls.icon}</div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900">{cls.subject}</div>
                    <div className="text-sm text-gray-600">{cls.teacher}</div>
                  </div>
                  <div className="text-sm font-semibold text-orange-600">{cls.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Homework Due Today */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-amber-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
                  <BookOpen className="text-amber-600" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Homework Due</h3>
              </div>
              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-bold">
                {mockHomework.length} Tasks
              </span>
            </div>
            <div className="space-y-3">
              {mockHomework.map((hw, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-100 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-amber-200 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <BookOpen className="text-amber-700" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 mb-1">{hw.subject}</div>
                      <div className="text-sm text-gray-700 mb-2">{hw.task}</div>
                      <div className="flex items-center gap-2">
                        <Clock className="text-amber-600" size={14} />
                        <span className="text-xs font-semibold text-amber-600">Due: {hw.dueDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-orange-100">
          <div className="flex items-center gap-3 mb-6">
            <Target className="text-orange-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <button className="group flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl hover:shadow-xl transition-all border-2 border-blue-100 hover:border-blue-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Award className="text-white" size={28} />
              </div>
              <span className="font-bold text-gray-900 text-center">View Report Card</span>
            </button>

            <button className="group flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-2xl hover:shadow-xl transition-all border-2 border-purple-100 hover:border-purple-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <BookOpen className="text-white" size={28} />
              </div>
              <span className="font-bold text-gray-900 text-center">View Homework</span>
            </button>

            <button className="group flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl hover:shadow-xl transition-all border-2 border-green-100 hover:border-green-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <CreditCard className="text-white" size={28} />
              </div>
              <span className="font-bold text-gray-900 text-center">Pay Fees</span>
            </button>

            <button className="group flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl hover:shadow-xl transition-all border-2 border-orange-100 hover:border-orange-300">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <MessageSquare className="text-white" size={28} />
              </div>
              <span className="font-bold text-gray-900 text-center">Message Teacher</span>
            </button>

            <button className="group flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl hover:shadow-xl transition-all border-2 border-teal-100 hover:border-teal-300">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Calendar className="text-white" size={28} />
              </div>
              <span className="font-bold text-gray-900 text-center">View Timetable</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboardScreen;

