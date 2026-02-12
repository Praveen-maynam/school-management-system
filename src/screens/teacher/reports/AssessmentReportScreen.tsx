import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  Users,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  X,
  CheckCircle,
  AlertCircle,
  Clock,
  FileText,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

// Types
interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  department: string;
  employeeId: string;
  joinDate: string;
  status: 'active' | 'on-leave' | 'inactive';
  avatar: string;
  experience: number;
  qualification: string;
  classes: string[];
  performance: number;
  attendance: number;
}

interface TeacherStats {
  totalTeachers: number;
  activeTeachers: number;
  onLeave: number;
  avgPerformance: number;
  avgAttendance: number;
  newThisMonth: number;
}

interface PerformanceData {
  month: string;
  score: number;
  attendance: number;
  studentSatisfaction: number;
}

// Mock Data
const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@school.com',
    phone: '+1 234-567-8901',
    subject: 'Mathematics',
    department: 'Science',
    employeeId: 'EMP001',
    joinDate: '2020-08-15',
    status: 'active',
    avatar: 'SJ',
    experience: 8,
    qualification: 'M.Sc Mathematics',
    classes: ['Grade 9A', 'Grade 10B', 'Grade 11A'],
    performance: 92,
    attendance: 96
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.c@school.com',
    phone: '+1 234-567-8902',
    subject: 'Physics',
    department: 'Science',
    employeeId: 'EMP002',
    joinDate: '2019-06-20',
    status: 'active',
    avatar: 'MC',
    experience: 10,
    qualification: 'Ph.D Physics',
    classes: ['Grade 11B', 'Grade 12A'],
    performance: 95,
    attendance: 98
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@school.com',
    phone: '+1 234-567-8903',
    subject: 'English Literature',
    department: 'Languages',
    employeeId: 'EMP003',
    joinDate: '2021-01-10',
    status: 'active',
    avatar: 'ER',
    experience: 5,
    qualification: 'M.A English',
    classes: ['Grade 8A', 'Grade 9B'],
    performance: 88,
    attendance: 94
  },
  {
    id: '4',
    name: 'David Thompson',
    email: 'david.t@school.com',
    phone: '+1 234-567-8904',
    subject: 'Chemistry',
    department: 'Science',
    employeeId: 'EMP004',
    joinDate: '2018-09-05',
    status: 'on-leave',
    avatar: 'DT',
    experience: 12,
    qualification: 'M.Sc Chemistry',
    classes: ['Grade 10A', 'Grade 11A'],
    performance: 90,
    attendance: 92
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    email: 'lisa.a@school.com',
    phone: '+1 234-567-8905',
    subject: 'History',
    department: 'Social Studies',
    employeeId: 'EMP005',
    joinDate: '2022-03-15',
    status: 'active',
    avatar: 'LA',
    experience: 3,
    qualification: 'M.A History',
    classes: ['Grade 7A', 'Grade 8B'],
    performance: 85,
    attendance: 97
  },
  {
    id: '6',
    name: 'James Wilson',
    email: 'james.w@school.com',
    phone: '+1 234-567-8906',
    subject: 'Computer Science',
    department: 'Technology',
    employeeId: 'EMP006',
    joinDate: '2020-11-20',
    status: 'active',
    avatar: 'JW',
    experience: 6,
    qualification: 'M.Tech CS',
    classes: ['Grade 9A', 'Grade 10A', 'Grade 11B'],
    performance: 93,
    attendance: 95
  }
];

const mockStats: TeacherStats = {
  totalTeachers: 48,
  activeTeachers: 45,
  onLeave: 3,
  avgPerformance: 89.5,
  avgAttendance: 95.2,
  newThisMonth: 2
};

const mockPerformanceData: PerformanceData[] = [
  { month: 'Jan', score: 88, attendance: 94, studentSatisfaction: 85 },
  { month: 'Feb', score: 90, attendance: 96, studentSatisfaction: 87 },
  { month: 'Mar', score: 89, attendance: 95, studentSatisfaction: 86 },
  { month: 'Apr', score: 92, attendance: 97, studentSatisfaction: 90 },
  { month: 'May', score: 91, attendance: 96, studentSatisfaction: 89 },
  { month: 'Jun', score: 93, attendance: 98, studentSatisfaction: 92 }
];

const TeachersModule: React.FC = () => {
  const [activeView, setActiveView] = useState<'list' | 'reports'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const filteredTeachers = mockTeachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         teacher.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || teacher.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || teacher.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'on-leave': return 'bg-yellow-100 text-yellow-700';
      case 'inactive': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Teachers Management
              </h1>
              <p className="text-gray-600 mt-1">Manage and monitor teacher performance</p>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2">
              <Plus size={20} />
              Add Teacher
            </button>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2 border-b border-gray-200">
            <button
              onClick={() => setActiveView('list')}
              className={`px-6 py-3 font-semibold transition-all duration-200 ${
                activeView === 'list'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Users size={18} />
                Teachers List
              </div>
            </button>
            <button
              onClick={() => setActiveView('reports')}
              className={`px-6 py-3 font-semibold transition-all duration-200 ${
                activeView === 'reports'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <BarChart3 size={18} />
                Reports & Analytics
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="text-blue-600" size={24} />
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <div className="text-2xl font-bold text-gray-800">{mockStats.totalTeachers}</div>
            <div className="text-sm text-gray-500">Total Teachers</div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800">{mockStats.activeTeachers}</div>
            <div className="text-sm text-gray-500">Active Teachers</div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="text-yellow-600" size={24} />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800">{mockStats.onLeave}</div>
            <div className="text-sm text-gray-500">On Leave</div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="text-purple-600" size={24} />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800">{mockStats.avgPerformance}%</div>
            <div className="text-sm text-gray-500">Avg Performance</div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Activity className="text-indigo-600" size={24} />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800">{mockStats.avgAttendance}%</div>
            <div className="text-sm text-gray-500">Avg Attendance</div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                <Plus className="text-cyan-600" size={24} />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800">{mockStats.newThisMonth}</div>
            <div className="text-sm text-gray-500">New This Month</div>
          </div>
        </div>

        {/* Teachers List View */}
        {activeView === 'list' && (
          <>
            {/* Filters */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search teachers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <select
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="all">All Departments</option>
                    <option value="Science">Science</option>
                    <option value="Languages">Languages</option>
                    <option value="Social Studies">Social Studies</option>
                    <option value="Technology">Technology</option>
                  </select>
                </div>

                <div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="on-leave">On Leave</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Teachers Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Teacher</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Subject</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Performance</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Attendance</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredTeachers.map((teacher) => (
                      <tr key={teacher.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {teacher.avatar}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{teacher.name}</div>
                              <div className="text-sm text-gray-500">{teacher.employeeId}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">
                            <div className="text-gray-900 flex items-center gap-2">
                              <Mail size={14} className="text-gray-400" />
                              {teacher.email}
                            </div>
                            <div className="text-gray-500 flex items-center gap-2 mt-1">
                              <Phone size={14} className="text-gray-400" />
                              {teacher.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <BookOpen size={16} className="text-blue-500" />
                            <span className="text-sm font-medium text-gray-900">{teacher.subject}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600">{teacher.department}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                              <div 
                                className={`h-2 rounded-full ${teacher.performance >= 90 ? 'bg-green-500' : teacher.performance >= 75 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                                style={{ width: `${teacher.performance}%` }}
                              ></div>
                            </div>
                            <span className={`text-sm font-semibold ${getPerformanceColor(teacher.performance)}`}>
                              {teacher.performance}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900">{teacher.attendance}%</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(teacher.status)}`}>
                            {teacher.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => {
                                setSelectedTeacher(teacher);
                                setShowDetailModal(true);
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye size={18} />
                            </button>
                            <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                              <Edit size={18} />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Reports View */}
        {activeView === 'reports' && (
          <div className="space-y-6">
            {/* Performance Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Performance Trends</h3>
                  <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2">
                    <Download size={18} />
                    Export
                  </button>
                </div>
                <div className="space-y-4">
                  {mockPerformanceData.map((data, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-16 text-sm font-semibold text-gray-600">{data.month}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-gray-500">Performance</span>
                          <span className="text-sm font-semibold text-blue-600">{data.score}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full" style={{ width: `${data.score}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Department Distribution</h3>
                  <PieChart className="text-gray-400" size={24} />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      <span className="font-medium text-gray-800">Science</span>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">15</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      <span className="font-medium text-gray-800">Languages</span>
                    </div>
                    <span className="text-2xl font-bold text-green-600">12</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                      <span className="font-medium text-gray-800">Social Studies</span>
                    </div>
                    <span className="text-2xl font-bold text-purple-600">10</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                      <span className="font-medium text-gray-800">Technology</span>
                    </div>
                    <span className="text-2xl font-bold text-orange-600">11</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Attendance Report */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Attendance Report</h3>
                <div className="flex gap-2">
                  <select className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                    <option>Last 6 Months</option>
                    <option>Last 3 Months</option>
                    <option>This Year</option>
                  </select>
                  <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2">
                    <Download size={18} />
                    Export
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {mockPerformanceData.map((data, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-20 text-sm font-semibold text-gray-700">{data.month} 2024</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Attendance Rate</span>
                        <span className="text-sm font-bold text-gray-900">{data.attendance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-600 h-2.5 rounded-full" 
                          style={{ width: `${data.attendance}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {data.attendance > 95 ? (
                        <>
                          <TrendingUp className="text-green-500" size={16} />
                          <span className="text-green-600 font-semibold">Excellent</span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className="text-yellow-500" size={16} />
                          <span className="text-yellow-600 font-semibold">Good</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performers */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Top Performers This Month</h3>
                <Award className="text-yellow-500" size={24} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockTeachers
                  .sort((a, b) => b.performance - a.performance)
                  .slice(0, 3)
                  .map((teacher, index) => (
                    <div key={teacher.id} className="relative p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        {index + 1}
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                          {teacher.avatar}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{teacher.name}</div>
                          <div className="text-sm text-gray-600">{teacher.subject}</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Performance</span>
                          <span className="text-lg font-bold text-blue-600">{teacher.performance}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Attendance</span>
                          <span className="text-lg font-bold text-green-600">{teacher.attendance}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Teacher Detail Modal */}
      {showDetailModal && selectedTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold">Teacher Details</h2>
              <button 
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Profile Section */}
              <div className="flex items-start gap-6 pb-6 border-b border-gray-200">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                  {selectedTeacher.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedTeacher.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedTeacher.status)}`}>
                      {selectedTeacher.status}
                    </span>
                    <span className="text-sm text-gray-600">{selectedTeacher.employeeId}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      Joined {selectedTeacher.joinDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <Award size={16} />
                      {selectedTeacher.experience} years exp.
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Mail className="text-blue-600" size={20} />
                    <div>
                      <div className="text-xs text-gray-500">Email</div>
                      <div className="font-medium text-gray-900">{selectedTeacher.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Phone className="text-green-600" size={20} />
                    <div>
                      <div className="text-xs text-gray-500">Phone</div>
                      <div className="font-medium text-gray-900">{selectedTeacher.phone}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-4">Academic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Subject</div>
                    <div className="font-bold text-blue-900">{selectedTeacher.subject}</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Department</div>
                    <div className="font-bold text-purple-900">{selectedTeacher.department}</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Qualification</div>
                    <div className="font-bold text-green-900">{selectedTeacher.qualification}</div>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Classes Assigned</div>
                    <div className="font-bold text-orange-900">{selectedTeacher.classes.length} Classes</div>
                  </div>
                </div>
              </div>

              {/* Classes */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-4">Assigned Classes</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTeacher.classes.map((className, index) => (
                    <span key={index} className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-semibold text-sm">
                      {className}
                    </span>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-4">Performance Metrics</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Teaching Performance</span>
                      <span className="text-lg font-bold text-blue-600">{selectedTeacher.performance}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full" 
                        style={{ width: `${selectedTeacher.performance}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Attendance Rate</span>
                      <span className="text-lg font-bold text-green-600">{selectedTeacher.attendance}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full" 
                        style={{ width: `${selectedTeacher.attendance}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                  Edit Profile
                </button>
                <button className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                  View Full Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeachersModule;