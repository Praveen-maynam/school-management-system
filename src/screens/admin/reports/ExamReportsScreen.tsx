// import React, { useState } from 'react';
// import { 
//   Search, 
//   Filter, 
//   Download, 
//   Eye, 
//   Edit, 
//   Trash2, 
//   Plus,
//   Mail,
//   Phone,
//   MapPin,
//   Calendar,
//   Award,
//   BookOpen,
//   Users,
//   TrendingUp,
//   TrendingDown,
//   MoreVertical,
//   X,
//   CheckCircle,
//   AlertCircle,
//   Clock,
//   FileText,
//   BarChart3,
//   PieChart,
//   Activity
// } from 'lucide-react';

// // Types
// interface Teacher {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   subject: string;
//   department: string;
//   employeeId: string;
//   joinDate: string;
//   status: 'active' | 'on-leave' | 'inactive';
//   avatar: string;
//   experience: number;
//   qualification: string;
//   classes: string[];
//   performance: number;
//   attendance: number;
// }

// interface TeacherStats {
//   totalTeachers: number;
//   activeTeachers: number;
//   onLeave: number;
//   avgPerformance: number;
//   avgAttendance: number;
//   newThisMonth: number;
// }

// interface PerformanceData {
//   month: string;
//   score: number;
//   attendance: number;
//   studentSatisfaction: number;
// }

// // Mock Data
// const mockTeachers: Teacher[] = [
//   {
//     id: '1',
//     name: 'Sarah Johnson',
//     email: 'sarah.j@school.com',
//     phone: '+1 234-567-8901',
//     subject: 'Mathematics',
//     department: 'Science',
//     employeeId: 'EMP001',
//     joinDate: '2020-08-15',
//     status: 'active',
//     avatar: 'SJ',
//     experience: 8,
//     qualification: 'M.Sc Mathematics',
//     classes: ['Grade 9A', 'Grade 10B', 'Grade 11A'],
//     performance: 92,
//     attendance: 96
//   },
//   {
//     id: '2',
//     name: 'Michael Chen',
//     email: 'michael.c@school.com',
//     phone: '+1 234-567-8902',
//     subject: 'Physics',
//     department: 'Science',
//     employeeId: 'EMP002',
//     joinDate: '2019-06-20',
//     status: 'active',
//     avatar: 'MC',
//     experience: 10,
//     qualification: 'Ph.D Physics',
//     classes: ['Grade 11B', 'Grade 12A'],
//     performance: 95,
//     attendance: 98
//   },
//   {
//     id: '3',
//     name: 'Emily Rodriguez',
//     email: 'emily.r@school.com',
//     phone: '+1 234-567-8903',
//     subject: 'English Literature',
//     department: 'Languages',
//     employeeId: 'EMP003',
//     joinDate: '2021-01-10',
//     status: 'active',
//     avatar: 'ER',
//     experience: 5,
//     qualification: 'M.A English',
//     classes: ['Grade 8A', 'Grade 9B'],
//     performance: 88,
//     attendance: 94
//   },
//   {
//     id: '4',
//     name: 'David Thompson',
//     email: 'david.t@school.com',
//     phone: '+1 234-567-8904',
//     subject: 'Chemistry',
//     department: 'Science',
//     employeeId: 'EMP004',
//     joinDate: '2018-09-05',
//     status: 'on-leave',
//     avatar: 'DT',
//     experience: 12,
//     qualification: 'M.Sc Chemistry',
//     classes: ['Grade 10A', 'Grade 11A'],
//     performance: 90,
//     attendance: 92
//   },
//   {
//     id: '5',
//     name: 'Lisa Anderson',
//     email: 'lisa.a@school.com',
//     phone: '+1 234-567-8905',
//     subject: 'History',
//     department: 'Social Studies',
//     employeeId: 'EMP005',
//     joinDate: '2022-03-15',
//     status: 'active',
//     avatar: 'LA',
//     experience: 3,
//     qualification: 'M.A History',
//     classes: ['Grade 7A', 'Grade 8B'],
//     performance: 85,
//     attendance: 97
//   },
//   {
//     id: '6',
//     name: 'James Wilson',
//     email: 'james.w@school.com',
//     phone: '+1 234-567-8906',
//     subject: 'Computer Science',
//     department: 'Technology',
//     employeeId: 'EMP006',
//     joinDate: '2020-11-20',
//     status: 'active',
//     avatar: 'JW',
//     experience: 6,
//     qualification: 'M.Tech CS',
//     classes: ['Grade 9A', 'Grade 10A', 'Grade 11B'],
//     performance: 93,
//     attendance: 95
//   }
// ];

// const mockStats: TeacherStats = {
//   totalTeachers: 48,
//   activeTeachers: 45,
//   onLeave: 3,
//   avgPerformance: 89.5,
//   avgAttendance: 95.2,
//   newThisMonth: 2
// };

// const mockPerformanceData: PerformanceData[] = [
//   { month: 'Jan', score: 88, attendance: 94, studentSatisfaction: 85 },
//   { month: 'Feb', score: 90, attendance: 96, studentSatisfaction: 87 },
//   { month: 'Mar', score: 89, attendance: 95, studentSatisfaction: 86 },
//   { month: 'Apr', score: 92, attendance: 97, studentSatisfaction: 90 },
//   { month: 'May', score: 91, attendance: 96, studentSatisfaction: 89 },
//   { month: 'Jun', score: 93, attendance: 98, studentSatisfaction: 92 }
// ];

// const TeachersModule: React.FC = () => {
//   const [activeView, setActiveView] = useState<'list' | 'reports'>('list');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterDepartment, setFilterDepartment] = useState('all');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
//   const [showDetailModal, setShowDetailModal] = useState(false);

//   const filteredTeachers = mockTeachers.filter(teacher => {
//     const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          teacher.subject.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesDepartment = filterDepartment === 'all' || teacher.department === filterDepartment;
//     const matchesStatus = filterStatus === 'all' || teacher.status === filterStatus;
//     return matchesSearch && matchesDepartment && matchesStatus;
//   });

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'active': return 'bg-green-100 text-green-700';
//       case 'on-leave': return 'bg-yellow-100 text-yellow-700';
//       case 'inactive': return 'bg-red-100 text-red-700';
//       default: return 'bg-gray-100 text-gray-700';
//     }
//   };

//   const getPerformanceColor = (score: number) => {
//     if (score >= 90) return 'text-green-600';
//     if (score >= 75) return 'text-blue-600';
//     if (score >= 60) return 'text-yellow-600';
//     return 'text-red-600';
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                 Teachers Management
//               </h1>
//               <p className="text-gray-600 mt-1">Manage and monitor teacher performance</p>
//             </div>
//             <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2">
//               <Plus size={20} />
//               Add Teacher
//             </button>
//           </div>

//           {/* View Toggle */}
//           <div className="flex gap-2 border-b border-gray-200">
//             <button
//               onClick={() => setActiveView('list')}
//               className={`px-6 py-3 font-semibold transition-all duration-200 ${
//                 activeView === 'list'
//                   ? 'text-blue-600 border-b-2 border-blue-600'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               <div className="flex items-center gap-2">
//                 <Users size={18} />
//                 Teachers List
//               </div>
//             </button>
//             <button
//               onClick={() => setActiveView('reports')}
//               className={`px-6 py-3 font-semibold transition-all duration-200 ${
//                 activeView === 'reports'
//                   ? 'text-blue-600 border-b-2 border-blue-600'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               <div className="flex items-center gap-2">
//                 <BarChart3 size={18} />
//                 Reports & Analytics
//               </div>
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-8">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
//           <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//             <div className="flex items-center justify-between mb-3">
//               <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                 <Users className="text-blue-600" size={24} />
//               </div>
//               <TrendingUp className="text-green-500" size={20} />
//             </div>
//             <div className="text-2xl font-bold text-gray-800">{mockStats.totalTeachers}</div>
//             <div className="text-sm text-gray-500">Total Teachers</div>
//           </div>

//           <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//             <div className="flex items-center justify-between mb-3">
//               <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                 <CheckCircle className="text-green-600" size={24} />
//               </div>
//             </div>
//             <div className="text-2xl font-bold text-gray-800">{mockStats.activeTeachers}</div>
//             <div className="text-sm text-gray-500">Active Teachers</div>
//           </div>

//           <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//             <div className="flex items-center justify-between mb-3">
//               <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
//                 <Clock className="text-yellow-600" size={24} />
//               </div>
//             </div>
//             <div className="text-2xl font-bold text-gray-800">{mockStats.onLeave}</div>
//             <div className="text-sm text-gray-500">On Leave</div>
//           </div>

//           <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//             <div className="flex items-center justify-between mb-3">
//               <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
//                 <Award className="text-purple-600" size={24} />
//               </div>
//             </div>
//             <div className="text-2xl font-bold text-gray-800">{mockStats.avgPerformance}%</div>
//             <div className="text-sm text-gray-500">Avg Performance</div>
//           </div>

//           <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//             <div className="flex items-center justify-between mb-3">
//               <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
//                 <Activity className="text-indigo-600" size={24} />
//               </div>
//             </div>
//             <div className="text-2xl font-bold text-gray-800">{mockStats.avgAttendance}%</div>
//             <div className="text-sm text-gray-500">Avg Attendance</div>
//           </div>

//           <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//             <div className="flex items-center justify-between mb-3">
//               <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
//                 <Plus className="text-cyan-600" size={24} />
//               </div>
//             </div>
//             <div className="text-2xl font-bold text-gray-800">{mockStats.newThisMonth}</div>
//             <div className="text-sm text-gray-500">New This Month</div>
//           </div>
//         </div>

//         {/* Teachers List View */}
//         {activeView === 'list' && (
//           <>
//             {/* Filters */}
//             <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                 <div className="md:col-span-2">
//                   <div className="relative">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                     <input
//                       type="text"
//                       placeholder="Search teachers..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <select
//                     value={filterDepartment}
//                     onChange={(e) => setFilterDepartment(e.target.value)}
//                     className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
//                   >
//                     <option value="all">All Departments</option>
//                     <option value="Science">Science</option>
//                     <option value="Languages">Languages</option>
//                     <option value="Social Studies">Social Studies</option>
//                     <option value="Technology">Technology</option>
//                   </select>
//                 </div>

//                 <div>
//                   <select
//                     value={filterStatus}
//                     onChange={(e) => setFilterStatus(e.target.value)}
//                     className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
//                   >
//                     <option value="all">All Status</option>
//                     <option value="active">Active</option>
//                     <option value="on-leave">On Leave</option>
//                     <option value="inactive">Inactive</option>
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* Teachers Table */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50 border-b border-gray-200">
//                     <tr>
//                       <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Teacher</th>
//                       <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
//                       <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Subject</th>
//                       <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Department</th>
//                       <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Performance</th>
//                       <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Attendance</th>
//                       <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
//                       <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {filteredTeachers.map((teacher) => (
//                       <tr key={teacher.id} className="hover:bg-gray-50 transition-colors">
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center gap-3">
//                             <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
//                               {teacher.avatar}
//                             </div>
//                             <div>
//                               <div className="font-semibold text-gray-900">{teacher.name}</div>
//                               <div className="text-sm text-gray-500">{teacher.employeeId}</div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm">
//                             <div className="text-gray-900 flex items-center gap-2">
//                               <Mail size={14} className="text-gray-400" />
//                               {teacher.email}
//                             </div>
//                             <div className="text-gray-500 flex items-center gap-2 mt-1">
//                               <Phone size={14} className="text-gray-400" />
//                               {teacher.phone}
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center gap-2">
//                             <BookOpen size={16} className="text-blue-500" />
//                             <span className="text-sm font-medium text-gray-900">{teacher.subject}</span>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className="text-sm text-gray-600">{teacher.department}</span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center gap-2">
//                             <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
//                               <div 
//                                 className={`h-2 rounded-full ${teacher.performance >= 90 ? 'bg-green-500' : teacher.performance >= 75 ? 'bg-blue-500' : 'bg-yellow-500'}`}
//                                 style={{ width: `${teacher.performance}%` }}
//                               ></div>
//                             </div>
//                             <span className={`text-sm font-semibold ${getPerformanceColor(teacher.performance)}`}>
//                               {teacher.performance}%
//                             </span>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className="text-sm font-medium text-gray-900">{teacher.attendance}%</span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(teacher.status)}`}>
//                             {teacher.status}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center gap-2">
//                             <button 
//                               onClick={() => {
//                                 setSelectedTeacher(teacher);
//                                 setShowDetailModal(true);
//                               }}
//                               className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                               title="View Details"
//                             >
//                               <Eye size={18} />
//                             </button>
//                             <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
//                               <Edit size={18} />
//                             </button>
//                             <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
//                               <Trash2 size={18} />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </>
//         )}

//         {/* Reports View */}
//         {activeView === 'reports' && (
//           <div className="space-y-6">
//             {/* Performance Overview */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-xl font-bold text-gray-800">Performance Trends</h3>
//                   <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2">
//                     <Download size={18} />
//                     Export
//                   </button>
//                 </div>
//                 <div className="space-y-4">
//                   {mockPerformanceData.map((data, index) => (
//                     <div key={index} className="flex items-center gap-4">
//                       <div className="w-16 text-sm font-semibold text-gray-600">{data.month}</div>
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2 mb-1">
//                           <span className="text-xs text-gray-500">Performance</span>
//                           <span className="text-sm font-semibold text-blue-600">{data.score}%</span>
//                         </div>
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full" style={{ width: `${data.score}%` }}></div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-xl font-bold text-gray-800">Department Distribution</h3>
//                   <PieChart className="text-gray-400" size={24} />
//                 </div>
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
//                     <div className="flex items-center gap-3">
//                       <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
//                       <span className="font-medium text-gray-800">Science</span>
//                     </div>
//                     <span className="text-2xl font-bold text-blue-600">15</span>
//                   </div>
//                   <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
//                     <div className="flex items-center gap-3">
//                       <div className="w-3 h-3 bg-green-600 rounded-full"></div>
//                       <span className="font-medium text-gray-800">Languages</span>
//                     </div>
//                     <span className="text-2xl font-bold text-green-600">12</span>
//                   </div>
//                   <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
//                     <div className="flex items-center gap-3">
//                       <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
//                       <span className="font-medium text-gray-800">Social Studies</span>
//                     </div>
//                     <span className="text-2xl font-bold text-purple-600">10</span>
//                   </div>
//                   <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
//                     <div className="flex items-center gap-3">
//                       <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
//                       <span className="font-medium text-gray-800">Technology</span>
//                     </div>
//                     <span className="text-2xl font-bold text-orange-600">11</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Attendance Report */}
//             <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-xl font-bold text-gray-800">Attendance Report</h3>
//                 <div className="flex gap-2">
//                   <select className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
//                     <option>Last 6 Months</option>
//                     <option>Last 3 Months</option>
//                     <option>This Year</option>
//                   </select>
//                   <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2">
//                     <Download size={18} />
//                     Export
//                   </button>
//                 </div>
//               </div>
//               <div className="space-y-3">
//                 {mockPerformanceData.map((data, index) => (
//                   <div key={index} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
//                     <div className="w-20 text-sm font-semibold text-gray-700">{data.month} 2024</div>
//                     <div className="flex-1">
//                       <div className="flex items-center justify-between mb-2">
//                         <span className="text-sm text-gray-600">Attendance Rate</span>
//                         <span className="text-sm font-bold text-gray-900">{data.attendance}%</span>
//                       </div>
//                       <div className="w-full bg-gray-200 rounded-full h-2.5">
//                         <div 
//                           className="bg-gradient-to-r from-green-500 to-emerald-600 h-2.5 rounded-full" 
//                           style={{ width: `${data.attendance}%` }}
//                         ></div>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm">
//                       {data.attendance > 95 ? (
//                         <>
//                           <TrendingUp className="text-green-500" size={16} />
//                           <span className="text-green-600 font-semibold">Excellent</span>
//                         </>
//                       ) : (
//                         <>
//                           <TrendingDown className="text-yellow-500" size={16} />
//                           <span className="text-yellow-600 font-semibold">Good</span>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Top Performers */}
//             <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-xl font-bold text-gray-800">Top Performers This Month</h3>
//                 <Award className="text-yellow-500" size={24} />
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {mockTeachers
//                   .sort((a, b) => b.performance - a.performance)
//                   .slice(0, 3)
//                   .map((teacher, index) => (
//                     <div key={teacher.id} className="relative p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
//                       <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
//                         {index + 1}
//                       </div>
//                       <div className="flex items-center gap-4 mb-4">
//                         <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
//                           {teacher.avatar}
//                         </div>
//                         <div>
//                           <div className="font-bold text-gray-900">{teacher.name}</div>
//                           <div className="text-sm text-gray-600">{teacher.subject}</div>
//                         </div>
//                       </div>
//                       <div className="space-y-2">
//                         <div className="flex items-center justify-between">
//                           <span className="text-sm text-gray-600">Performance</span>
//                           <span className="text-lg font-bold text-blue-600">{teacher.performance}%</span>
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <span className="text-sm text-gray-600">Attendance</span>
//                           <span className="text-lg font-bold text-green-600">{teacher.attendance}%</span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Teacher Detail Modal */}
//       {showDetailModal && selectedTeacher && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
//             <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex items-center justify-between rounded-t-2xl">
//               <h2 className="text-2xl font-bold">Teacher Details</h2>
//               <button 
//                 onClick={() => setShowDetailModal(false)}
//                 className="p-2 hover:bg-white/20 rounded-lg transition-colors"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             <div className="p-6 space-y-6">
//               {/* Profile Section */}
//               <div className="flex items-start gap-6 pb-6 border-b border-gray-200">
//                 <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg">
//                   {selectedTeacher.avatar}
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedTeacher.name}</h3>
//                   <div className="flex items-center gap-2 mb-2">
//                     <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedTeacher.status)}`}>
//                       {selectedTeacher.status}
//                     </span>
//                     <span className="text-sm text-gray-600">{selectedTeacher.employeeId}</span>
//                   </div>
//                   <div className="flex items-center gap-4 text-sm text-gray-600">
//                     <div className="flex items-center gap-1">
//                       <Calendar size={16} />
//                       Joined {selectedTeacher.joinDate}
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <Award size={16} />
//                       {selectedTeacher.experience} years exp.
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Contact Information */}
//               <div>
//                 <h4 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
//                     <Mail className="text-blue-600" size={20} />
//                     <div>
//                       <div className="text-xs text-gray-500">Email</div>
//                       <div className="font-medium text-gray-900">{selectedTeacher.email}</div>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
//                     <Phone className="text-green-600" size={20} />
//                     <div>
//                       <div className="text-xs text-gray-500">Phone</div>
//                       <div className="font-medium text-gray-900">{selectedTeacher.phone}</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Academic Information */}
//               <div>
//                 <h4 className="text-lg font-bold text-gray-900 mb-4">Academic Information</h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="p-4 bg-blue-50 rounded-lg">
//                     <div className="text-sm text-gray-600 mb-1">Subject</div>
//                     <div className="font-bold text-blue-900">{selectedTeacher.subject}</div>
//                   </div>
//                   <div className="p-4 bg-purple-50 rounded-lg">
//                     <div className="text-sm text-gray-600 mb-1">Department</div>
//                     <div className="font-bold text-purple-900">{selectedTeacher.department}</div>
//                   </div>
//                   <div className="p-4 bg-green-50 rounded-lg">
//                     <div className="text-sm text-gray-600 mb-1">Qualification</div>
//                     <div className="font-bold text-green-900">{selectedTeacher.qualification}</div>
//                   </div>
//                   <div className="p-4 bg-orange-50 rounded-lg">
//                     <div className="text-sm text-gray-600 mb-1">Classes Assigned</div>
//                     <div className="font-bold text-orange-900">{selectedTeacher.classes.length} Classes</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Classes */}
//               <div>
//                 <h4 className="text-lg font-bold text-gray-900 mb-4">Assigned Classes</h4>
//                 <div className="flex flex-wrap gap-2">
//                   {selectedTeacher.classes.map((className, index) => (
//                     <span key={index} className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-semibold text-sm">
//                       {className}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Performance Metrics */}
//               <div>
//                 <h4 className="text-lg font-bold text-gray-900 mb-4">Performance Metrics</h4>
//                 <div className="space-y-4">
//                   <div>
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="text-sm font-medium text-gray-700">Teaching Performance</span>
//                       <span className="text-lg font-bold text-blue-600">{selectedTeacher.performance}%</span>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-3">
//                       <div 
//                         className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full" 
//                         style={{ width: `${selectedTeacher.performance}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                   <div>
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="text-sm font-medium text-gray-700">Attendance Rate</span>
//                       <span className="text-lg font-bold text-green-600">{selectedTeacher.attendance}%</span>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-3">
//                       <div 
//                         className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full" 
//                         style={{ width: `${selectedTeacher.attendance}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-3 pt-4">
//                 <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
//                   Edit Profile
//                 </button>
//                 <button className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
//                   View Full Report
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TeachersModule;




import React, { useState } from 'react';
import {
  Search, Download, Eye, Edit, Trash2, Plus,
  Mail, Phone, Calendar, Award, BookOpen, Users,
  TrendingUp, TrendingDown, X, CheckCircle, Clock,
  BarChart3, PieChart, Activity,
} from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────────
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

interface StatCard {
  icon: React.ReactNode;
  iconBg: string;
  val: string | number;
  label: string;
}

interface PerformanceData {
  month: string;
  score: number;
  attendance: number;
}

// ── Mock Data ──────────────────────────────────────────────────────────────────
const mockTeachers: Teacher[] = [
  { id: '1', name: 'Sarah Johnson',    email: 'sarah.j@school.com',   phone: '+1 234-567-8901', subject: 'Mathematics',       department: 'Science',       employeeId: 'EMP001', joinDate: '2020-08-15', status: 'active',   avatar: 'SJ', experience: 8,  qualification: 'M.Sc Mathematics', classes: ['Grade 9A', 'Grade 10B', 'Grade 11A'], performance: 92, attendance: 96 },
  { id: '2', name: 'Michael Chen',     email: 'michael.c@school.com', phone: '+1 234-567-8902', subject: 'Physics',           department: 'Science',       employeeId: 'EMP002', joinDate: '2019-06-20', status: 'active',   avatar: 'MC', experience: 10, qualification: 'Ph.D Physics',     classes: ['Grade 11B', 'Grade 12A'],             performance: 95, attendance: 98 },
  { id: '3', name: 'Emily Rodriguez',  email: 'emily.r@school.com',   phone: '+1 234-567-8903', subject: 'English Literature', department: 'Languages',    employeeId: 'EMP003', joinDate: '2021-01-10', status: 'active',   avatar: 'ER', experience: 5,  qualification: 'M.A English',      classes: ['Grade 8A', 'Grade 9B'],               performance: 88, attendance: 94 },
  { id: '4', name: 'David Thompson',   email: 'david.t@school.com',   phone: '+1 234-567-8904', subject: 'Chemistry',         department: 'Science',       employeeId: 'EMP004', joinDate: '2018-09-05', status: 'on-leave', avatar: 'DT', experience: 12, qualification: 'M.Sc Chemistry',   classes: ['Grade 10A', 'Grade 11A'],             performance: 90, attendance: 92 },
  { id: '5', name: 'Lisa Anderson',    email: 'lisa.a@school.com',    phone: '+1 234-567-8905', subject: 'History',           department: 'Social Studies',employeeId: 'EMP005', joinDate: '2022-03-15', status: 'active',   avatar: 'LA', experience: 3,  qualification: 'M.A History',      classes: ['Grade 7A', 'Grade 8B'],               performance: 85, attendance: 97 },
  { id: '6', name: 'James Wilson',     email: 'james.w@school.com',   phone: '+1 234-567-8906', subject: 'Computer Science',  department: 'Technology',    employeeId: 'EMP006', joinDate: '2020-11-20', status: 'active',   avatar: 'JW', experience: 6,  qualification: 'M.Tech CS',        classes: ['Grade 9A', 'Grade 10A', 'Grade 11B'], performance: 93, attendance: 95 },
];

const mockPerformanceData: PerformanceData[] = [
  { month: 'Jan', score: 88, attendance: 94 },
  { month: 'Feb', score: 90, attendance: 96 },
  { month: 'Mar', score: 89, attendance: 95 },
  { month: 'Apr', score: 92, attendance: 97 },
  { month: 'May', score: 91, attendance: 96 },
  { month: 'Jun', score: 93, attendance: 98 },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
const statusClasses = (status: Teacher['status']): string => ({
  'active':   'bg-emerald-100 text-emerald-700',
  'on-leave': 'bg-amber-100 text-amber-700',
  'inactive': 'bg-red-100 text-red-700',
}[status] ?? 'bg-gray-100 text-gray-700');

const perfTextClass = (score: number): string =>
  score >= 90 ? 'text-emerald-600' : score >= 75 ? 'text-blue-600' : 'text-amber-600';

const perfBarClass = (score: number): string =>
  score >= 90 ? 'bg-emerald-500' : score >= 75 ? 'bg-blue-500' : 'bg-amber-500';

// ── Sub-components ─────────────────────────────────────────────────────────────

/** Reusable progress bar */
const Bar: React.FC<{ pct: number; gradient?: string }> = ({ pct, gradient }) => (
  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
    <div
      className={`h-full rounded-full ${gradient ?? ''}`}
      style={{ width: `${pct}%`, ...(gradient ? {} : {}) }}
    />
  </div>
);

/** Stat card */
const StatCard: React.FC<StatCard> = ({ icon, iconBg, val, label }) => (
  <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100 flex flex-col gap-1 min-w-0">
    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBg}`}>{icon}</div>
    <div className="text-xl font-extrabold text-slate-800 leading-tight">{val}</div>
    <div className="text-[11px] text-slate-500">{label}</div>
  </div>
);

// ── Main Component ─────────────────────────────────────────────────────────────
const TeachersModule: React.FC = () => {
  const [activeView, setActiveView] = useState<'list' | 'reports'>('list');
  const [searchQuery, setSearchQuery]       = useState('');
  const [filterDept, setFilterDept]         = useState('all');
  const [filterStatus, setFilterStatus]     = useState('all');
  const [selected, setSelected]             = useState<Teacher | null>(null);

  const filtered = mockTeachers.filter(t => {
    const q = searchQuery.toLowerCase();
    return (
      (t.name.toLowerCase().includes(q) || t.email.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q)) &&
      (filterDept   === 'all' || t.department === filterDept) &&
      (filterStatus === 'all' || t.status     === filterStatus)
    );
  });

  const stats: StatCard[] = [
    { icon: <Users     size={18} className="text-blue-600"   />, iconBg: 'bg-blue-100',    val: 48,      label: 'Total Teachers' },
    { icon: <CheckCircle size={18} className="text-emerald-600" />, iconBg: 'bg-emerald-100', val: 45,  label: 'Active' },
    { icon: <Clock     size={18} className="text-amber-600"  />, iconBg: 'bg-amber-100',   val: 3,       label: 'On Leave' },
    { icon: <Award     size={18} className="text-violet-600" />, iconBg: 'bg-violet-100',  val: '89.5%', label: 'Avg Performance' },
    { icon: <Activity  size={18} className="text-cyan-600"   />, iconBg: 'bg-cyan-100',    val: '95.2%', label: 'Avg Attendance' },
    { icon: <Plus      size={18} className="text-sky-600"    />, iconBg: 'bg-sky-100',     val: 2,       label: 'New This Month' },
  ];

  return (
    /* Root: full viewport, no overflow */
    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 font-sans">

      {/* ── STICKY HEADER ── */}
      <header className="bg-white border-b border-slate-200 shadow-sm flex-shrink-0 z-40">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-3 pb-0">

          {/* Title row */}
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
            <div>
              <h1 className="text-[clamp(18px,3vw,26px)] font-extrabold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent leading-tight">
                Teachers Management
              </h1>
              <p className="text-slate-500 text-xs mt-0.5">Manage and monitor teacher performance</p>
            </div>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl font-semibold text-sm cursor-pointer whitespace-nowrap hover:opacity-90 transition-opacity">
              <Plus size={15} /> Add Teacher
            </button>
          </div>

          {/* Tabs */}
          <nav className="flex gap-1 border-b border-slate-200">
            {([
              ['list',    <Users size={14} />,    'Teachers List'],
              ['reports', <BarChart3 size={14} />, 'Reports & Analytics'],
            ] as const).map(([key, icon, label]) => (
              <button
                key={key}
                onClick={() => setActiveView(key)}
                className={`flex items-center gap-1.5 px-4 py-2.5 font-semibold text-sm border-b-2 -mb-px transition-colors cursor-pointer ${
                  activeView === key
                    ? 'text-blue-600 border-blue-600'
                    : 'text-slate-500 border-transparent hover:text-slate-700'
                }`}
              >
                {icon}{label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* ── SCROLLABLE BODY ── */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4">

          {/* Stats grid */}
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-4">
            {stats.map((s, i) => <StatCard key={i} {...s} />)}
          </div>

          {/* ── LIST VIEW ── */}
          {activeView === 'list' && (
            <>
              {/* Filter bar */}
              <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-slate-100 mb-3 flex flex-wrap gap-2.5">
                {/* Search */}
                <div className="relative flex-1 min-w-[160px]">
                  <Search size={15} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search teachers..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>
                {/* Department */}
                <select
                  value={filterDept}
                  onChange={e => setFilterDept(e.target.value)}
                  className="flex-1 min-w-[130px] px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-400 bg-white cursor-pointer"
                >
                  {[['all','All Departments'],['Science','Science'],['Languages','Languages'],['Social Studies','Social Studies'],['Technology','Technology']].map(([v,l]) => (
                    <option key={v} value={v}>{l}</option>
                  ))}
                </select>
                {/* Status */}
                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  className="flex-1 min-w-[120px] px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-400 bg-white cursor-pointer"
                >
                  {[['all','All Status'],['active','Active'],['on-leave','On Leave'],['inactive','Inactive']].map(([v,l]) => (
                    <option key={v} value={v}>{l}</option>
                  ))}
                </select>
              </div>

              {/* Table card */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">

                {/* ── MOBILE CARDS (< md) ── */}
                <div className="md:hidden divide-y divide-slate-100">
                  {filtered.map(t => (
                    <div key={t.id} className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {t.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-slate-800 text-sm truncate">{t.name}</div>
                          <div className="text-xs text-slate-500 truncate">{t.employeeId} · {t.subject}</div>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 ${statusClasses(t.status)}`}>
                          {t.status === 'on-leave' ? 'Leave' : t.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 text-xs mb-3">
                        <div className="text-slate-600"><span className="text-slate-400">Dept: </span>{t.department}</div>
                        <div className="text-slate-600"><span className="text-slate-400">Exp: </span>{t.experience}y</div>
                        <div><span className="text-slate-400">Perf: </span><span className={`font-bold ${perfTextClass(t.performance)}`}>{t.performance}%</span></div>
                        <div className="text-slate-600"><span className="text-slate-400">Att: </span>{t.attendance}%</div>
                      </div>

                      <div className="flex gap-2 justify-end">
                        {[
                          { label:'View', click:() => setSelected(t),   cls:'bg-blue-50 text-blue-600 border-blue-200' },
                          { label:'Edit', click:() => {},                cls:'bg-emerald-50 text-emerald-600 border-emerald-200' },
                          { label:'Del',  click:() => {},                cls:'bg-red-50 text-red-600 border-red-200' },
                        ].map(b => (
                          <button key={b.label} onClick={b.click} className={`px-3 py-1.5 text-xs font-semibold border rounded-lg cursor-pointer hover:opacity-80 transition-opacity ${b.cls}`}>{b.label}</button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* ── DESKTOP TABLE (≥ md) ── */}
                <div className="hidden md:block w-full">
                  <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
                    <colgroup>
                      <col className="w-[20%]" />
                      <col className="w-[18%]" />
                      <col className="w-[12%]" />
                      <col className="w-[11%]" />
                      <col className="w-[17%]" />
                      <col className="w-[8%]"  />
                      <col className="w-[8%]"  />
                      <col className="w-[9%]"  />
                    </colgroup>
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        {['Teacher','Contact','Subject','Department','Performance','Attend.','Status','Actions'].map(h => (
                          <th key={h} className="px-3 py-2.5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filtered.map(t => (
                        <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                          {/* Teacher */}
                          <td className="px-3 py-2.5">
                            <div className="flex items-center gap-2.5">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                                {t.avatar}
                              </div>
                              <div className="min-w-0">
                                <div className="font-bold text-slate-800 text-[13px] truncate">{t.name}</div>
                                <div className="text-[11px] text-slate-400">{t.employeeId}</div>
                              </div>
                            </div>
                          </td>
                          {/* Contact */}
                          <td className="px-3 py-2.5">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1 text-[11px] text-slate-600 truncate"><Mail size={10} className="text-slate-400 flex-shrink-0" />{t.email}</div>
                              <div className="flex items-center gap-1 text-[11px] text-slate-500"><Phone size={10} className="text-slate-400 flex-shrink-0" />{t.phone}</div>
                            </div>
                          </td>
                          {/* Subject */}
                          <td className="px-3 py-2.5">
                            <div className="flex items-center gap-1.5">
                              <BookOpen size={12} className="text-blue-500 flex-shrink-0" />
                              <span className="text-[12px] font-semibold text-slate-800 truncate">{t.subject}</span>
                            </div>
                          </td>
                          {/* Department */}
                          <td className="px-3 py-2.5">
                            <span className="text-[12px] text-slate-600">{t.department}</span>
                          </td>
                          {/* Performance */}
                          <td className="px-3 py-2.5">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                                <div className={`h-full rounded-full ${perfBarClass(t.performance)}`} style={{ width: `${t.performance}%` }} />
                              </div>
                              <span className={`text-[12px] font-bold whitespace-nowrap ${perfTextClass(t.performance)}`}>{t.performance}%</span>
                            </div>
                          </td>
                          {/* Attendance */}
                          <td className="px-3 py-2.5">
                            <span className="text-[13px] font-bold text-slate-800">{t.attendance}%</span>
                          </td>
                          {/* Status */}
                          <td className="px-3 py-2.5">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusClasses(t.status)}`}>
                              {t.status === 'on-leave' ? 'Leave' : t.status}
                            </span>
                          </td>
                          {/* Actions */}
                          <td className="px-3 py-2.5">
                            <div className="flex items-center gap-1">
                              <button onClick={() => setSelected(t)} title="View" className="w-7 h-7 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors"><Eye size={13} /></button>
                              <button title="Edit"   className="w-7 h-7 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center cursor-pointer hover:bg-emerald-100 transition-colors"><Edit size={13} /></button>
                              <button title="Delete" className="w-7 h-7 rounded-md bg-red-50 text-red-600 flex items-center justify-center cursor-pointer hover:bg-red-100 transition-colors"><Trash2 size={13} /></button>
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

          {/* ── REPORTS VIEW ── */}
          {activeView === 'reports' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Performance Trends */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[15px] font-extrabold text-slate-800">Performance Trends</h3>
                  <button className="flex items-center gap-1 px-3 py-1.5 border border-blue-200 rounded-lg bg-blue-50 text-blue-600 text-xs font-semibold cursor-pointer hover:opacity-80">
                    <Download size={12} />Export
                  </button>
                </div>
                <div className="space-y-3">
                  {mockPerformanceData.map((d, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-7 text-xs font-bold text-slate-500 flex-shrink-0">{d.month}</span>
                      <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-600" style={{ width: `${d.score}%` }} />
                      </div>
                      <span className="text-xs font-bold text-blue-600 w-9 text-right flex-shrink-0">{d.score}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Department Distribution */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[15px] font-extrabold text-slate-800">Department Distribution</h3>
                  <PieChart size={17} className="text-slate-400" />
                </div>
                <div className="space-y-2.5">
                  {([
                    ['Science',       15, 'bg-blue-600',   'text-blue-600',   'bg-blue-50'  ],
                    ['Languages',     12, 'bg-emerald-600','text-emerald-600','bg-emerald-50'],
                    ['Social Studies',10, 'bg-violet-600', 'text-violet-600', 'bg-violet-50' ],
                    ['Technology',    11, 'bg-amber-500',  'text-amber-600',  'bg-amber-50'  ],
                  ] as const).map(([dept, count, dot, text, bg]) => (
                    <div key={dept} className={`flex items-center justify-between px-4 py-2.5 rounded-lg ${bg}`}>
                      <div className="flex items-center gap-2.5">
                        <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${dot}`} />
                        <span className="text-sm font-semibold text-slate-800">{dept}</span>
                      </div>
                      <span className={`text-xl font-extrabold ${text}`}>{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attendance Report */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[15px] font-extrabold text-slate-800">Attendance Report</h3>
                  <button className="flex items-center gap-1 px-3 py-1.5 border border-emerald-200 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-semibold cursor-pointer hover:opacity-80">
                    <Download size={12} />Export
                  </button>
                </div>
                <div className="space-y-3">
                  {mockPerformanceData.map((d, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-7 text-xs font-bold text-slate-500 flex-shrink-0">{d.month}</span>
                      <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-600" style={{ width: `${d.attendance}%` }} />
                      </div>
                      <span className="text-xs font-bold text-emerald-600 w-9 text-right flex-shrink-0">{d.attendance}%</span>
                      {d.attendance > 95
                        ? <TrendingUp  size={13} className="text-emerald-500 flex-shrink-0" />
                        : <TrendingDown size={13} className="text-amber-500 flex-shrink-0"  />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Performers */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[15px] font-extrabold text-slate-800">Top Performers</h3>
                  <Award size={17} className="text-amber-500" />
                </div>
                <div className="space-y-2.5">
                  {[...mockTeachers].sort((a, b) => b.performance - a.performance).slice(0, 3).map((t, i) => (
                    <div key={t.id} className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-violet-50 rounded-xl border border-indigo-100">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-extrabold flex-shrink-0 ${['bg-amber-400','bg-slate-400','bg-orange-700'][i]}`}>{i + 1}</div>
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">{t.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-800 text-sm truncate">{t.name}</div>
                        <div className="text-[11px] text-slate-500">{t.subject}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-[14px] font-extrabold text-blue-600">{t.performance}%</div>
                        <div className="text-[10px] text-slate-400">Att: {t.attendance}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── DETAIL MODAL ── */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-[560px] max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">

            {/* Modal header */}
            <div className="bg-gradient-to-r from-blue-600 to-violet-600 text-white px-5 py-4 flex items-center justify-between flex-shrink-0">
              <h2 className="text-lg font-extrabold">Teacher Details</h2>
              <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                <X size={17} />
              </button>
            </div>

            {/* Modal body */}
            <div className="overflow-y-auto flex-1 p-5 space-y-5">

              {/* Profile */}
              <div className="flex gap-4 pb-4 border-b border-slate-100 flex-wrap">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-extrabold text-xl flex-shrink-0">
                  {selected.avatar}
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-800 mb-1">{selected.name}</h3>
                  <div className="flex gap-2 flex-wrap items-center mb-1.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${statusClasses(selected.status)}`}>{selected.status}</span>
                    <span className="text-xs text-slate-500">{selected.employeeId}</span>
                  </div>
                  <div className="flex gap-4 flex-wrap">
                    <span className="text-xs text-slate-500 flex items-center gap-1"><Calendar size={12} />Joined {selected.joinDate}</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1"><Award size={12} />{selected.experience}y experience</span>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <section>
                <h4 className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-2.5">Contact</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { icon: <Mail  size={15} className="text-blue-600"    />, label:'Email', val: selected.email, bg:'bg-blue-50'    },
                    { icon: <Phone size={15} className="text-emerald-600" />, label:'Phone', val: selected.phone, bg:'bg-emerald-50' },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center gap-2.5 p-3 ${item.bg} rounded-xl`}>
                      {item.icon}
                      <div>
                        <div className="text-[10px] text-slate-400">{item.label}</div>
                        <div className="text-[13px] font-semibold text-slate-800 break-all">{item.val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Academic */}
              <section>
                <h4 className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-2.5">Academic</h4>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { label:'Subject',       val: selected.subject,                     bg:'bg-blue-50',   text:'text-blue-900'   },
                    { label:'Department',    val: selected.department,                  bg:'bg-violet-50', text:'text-violet-900' },
                    { label:'Qualification', val: selected.qualification,               bg:'bg-emerald-50',text:'text-emerald-900'},
                    { label:'Classes',       val: `${selected.classes.length} assigned`,bg:'bg-orange-50', text:'text-orange-900' },
                  ].map((item, i) => (
                    <div key={i} className={`p-3 ${item.bg} rounded-xl`}>
                      <div className="text-[10px] text-slate-400 mb-0.5">{item.label}</div>
                      <div className={`text-[13px] font-bold ${item.text}`}>{item.val}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Classes */}
              <section>
                <h4 className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-2.5">Classes</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selected.classes.map((c, i) => (
                    <span key={i} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold">{c}</span>
                  ))}
                </div>
              </section>

              {/* Performance */}
              <section>
                <h4 className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-2.5">Performance</h4>
                {[
                  { label:'Teaching Performance', val: selected.performance, textColor:'text-blue-600',    barCls:'from-blue-500 to-violet-600'    },
                  { label:'Attendance Rate',       val: selected.attendance,  textColor:'text-emerald-600', barCls:'from-emerald-500 to-green-600' },
                ].map((m, i) => (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between mb-1.5">
                      <span className="text-xs font-semibold text-slate-600">{m.label}</span>
                      <span className={`text-sm font-extrabold ${m.textColor}`}>{m.val}%</span>
                    </div>
                    <div className="bg-slate-200 rounded-full h-2.5 overflow-hidden">
                      <div className={`h-full rounded-full bg-gradient-to-r ${m.barCls}`} style={{ width: `${m.val}%` }} />
                    </div>
                  </div>
                ))}
              </section>

              {/* Actions */}
              <div className="flex gap-2.5 pt-1">
                <button className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl font-bold text-sm cursor-pointer hover:opacity-90 transition-opacity">
                  Edit Profile
                </button>
                <button className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm cursor-pointer hover:bg-slate-200 transition-colors">
                  View Report
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