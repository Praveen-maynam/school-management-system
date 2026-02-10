// import React, { useState } from 'react';
// import { Calendar, TrendingUp, Users, FileText, AlertCircle, Award, Clock, BookOpen, BarChart3, Download, Filter, Search, Plus, Eye, Edit2, Trash2, CheckCircle, XCircle, Bell, Target, Zap, Activity } from 'lucide-react';

// const ExamDashboard = () => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [selectedExam, setSelectedExam] = useState(null);
//   const [filterStatus, setFilterStatus] = useState('all');

//   // Sample data
//   const stats = {
//     totalExams: 12,
//     upcoming: 4,
//     ongoing: 2,
//     completed: 6,
//     resultsPublished: 5,
//     avgPassRate: 86,
//     topClass: '10-A',
//     lowPerformClasses: 2,
//     totalStudents: 856,
//     attendanceRate: 94
//   };

//   const exams = [
//     { id: 1, name: 'Mid Term Exam', type: 'Offline', classes: '6-10', startDate: '10 Feb', endDate: '18 Feb', status: 'ongoing', students: 324, completed: 45, passRate: null },
//     { id: 2, name: 'Final Exam', type: 'Offline', classes: '1-12', startDate: '15 Mar', endDate: '28 Mar', status: 'upcoming', students: 856, completed: 0, passRate: null },
//     { id: 3, name: 'Unit Test 1', type: 'Online', classes: '6-8', startDate: '20 Jan', endDate: '25 Jan', status: 'completed', students: 245, completed: 100, passRate: 88 },
//     { id: 4, name: 'Quarterly Exam', type: 'Offline', classes: '9-12', startDate: '15 Dec', endDate: '22 Dec', status: 'completed', students: 387, completed: 100, passRate: 84 },
//   ];

//   const recentActivity = [
//     { type: 'publish', message: 'Results published for Unit Test 1 - Class 7A', time: '2 hours ago', class: '7-A' },
//     { type: 'alert', message: 'Low attendance in Math exam - Class 9B', time: '5 hours ago', class: '9-B' },
//     { type: 'success', message: 'Marks entry completed for Science - Class 10A', time: '1 day ago', class: '10-A' },
//     { type: 'warning', message: 'Pending marks submission - English, Class 8C', time: '2 days ago', class: '8-C' },
//   ];

//   const subjectPerformance = [
//     { subject: 'Mathematics', avgScore: 78, passRate: 85, trend: '+5%', status: 'good' },
//     { subject: 'Science', avgScore: 82, passRate: 91, trend: '+8%', status: 'excellent' },
//     { subject: 'English', avgScore: 74, passRate: 79, trend: '-2%', status: 'warning' },
//     { subject: 'Social Studies', avgScore: 80, passRate: 88, trend: '+3%', status: 'good' },
//     { subject: 'Hindi', avgScore: 76, passRate: 82, trend: '+1%', status: 'good' },
//   ];

//   const upcomingDeadlines = [
//     { task: 'Marks submission - Mid Term Math', deadline: '2 days', priority: 'high' },
//     { task: 'Result publication - Unit Test 2', deadline: '5 days', priority: 'medium' },
//     { task: 'Exam paper submission - Final Exam', deadline: '10 days', priority: 'low' },
//   ];

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'ongoing': return 'bg-blue-100 text-blue-700 border-blue-200';
//       case 'upcoming': return 'bg-amber-100 text-amber-700 border-amber-200';
//       case 'completed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
//       default: return 'bg-gray-100 text-gray-700 border-gray-200';
//     }
//   };

//   const getPerformanceColor = (status) => {
//     switch(status) {
//       case 'excellent': return 'text-emerald-600';
//       case 'good': return 'text-blue-600';
//       case 'warning': return 'text-amber-600';
//       default: return 'text-gray-600';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 shadow-sm">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//                 <BookOpen className="w-7 h-7 text-indigo-600" />
//                 Exam Control Center
//               </h1>
//               <p className="text-sm text-gray-600 mt-1">Academic Year 2024-25 • Manage & Monitor All Examinations</p>
//             </div>
//             <div className="flex gap-3">
//               <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors">
//                 <Download className="w-4 h-4" />
//                 Export Report
//               </button>
//               <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-colors shadow-sm">
//                 <Plus className="w-4 h-4" />
//                 Create Exam
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-6">
//         {/* Quick Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
//           <div className="bg-white rounded-xl p-5 border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
//             <div className="flex items-center justify-between mb-2">
//               <div className="p-2 bg-indigo-100 rounded-lg">
//                 <FileText className="w-5 h-5 text-indigo-600" />
//               </div>
//               <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">Total</span>
//             </div>
//             <p className="text-2xl font-bold text-gray-900">{stats.totalExams}</p>
//             <p className="text-sm text-gray-600 mt-1">Total Exams</p>
//           </div>

//           <div className="bg-white rounded-xl p-5 border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
//             <div className="flex items-center justify-between mb-2">
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <Clock className="w-5 h-5 text-blue-600" />
//               </div>
//               <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">Active</span>
//             </div>
//             <p className="text-2xl font-bold text-gray-900">{stats.ongoing}</p>
//             <p className="text-sm text-gray-600 mt-1">Ongoing Now</p>
//           </div>

//           <div className="bg-white rounded-xl p-5 border border-amber-100 shadow-sm hover:shadow-md transition-shadow">
//             <div className="flex items-center justify-between mb-2">
//               <div className="p-2 bg-amber-100 rounded-lg">
//                 <Calendar className="w-5 h-5 text-amber-600" />
//               </div>
//               <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">Soon</span>
//             </div>
//             <p className="text-2xl font-bold text-gray-900">{stats.upcoming}</p>
//             <p className="text-sm text-gray-600 mt-1">Upcoming</p>
//           </div>

//           <div className="bg-white rounded-xl p-5 border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
//             <div className="flex items-center justify-between mb-2">
//               <div className="p-2 bg-emerald-100 rounded-lg">
//                 <TrendingUp className="w-5 h-5 text-emerald-600" />
//               </div>
//               <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Rate</span>
//             </div>
//             <p className="text-2xl font-bold text-gray-900">{stats.avgPassRate}%</p>
//             <p className="text-sm text-gray-600 mt-1">Avg Pass Rate</p>
//           </div>

//           <div className="bg-white rounded-xl p-5 border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
//             <div className="flex items-center justify-between mb-2">
//               <div className="p-2 bg-purple-100 rounded-lg">
//                 <Award className="w-5 h-5 text-purple-600" />
//               </div>
//               <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">Top</span>
//             </div>
//             <p className="text-2xl font-bold text-gray-900">{stats.topClass}</p>
//             <p className="text-sm text-gray-600 mt-1">Best Performer</p>
//           </div>
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column - Exams List & Performance */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Active Exams */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//               <div className="p-5 border-b border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                     <Activity className="w-5 h-5 text-indigo-600" />
//                     Exam Management
//                   </h2>
//                   <div className="flex gap-2">
//                     <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-1">
//                       <Filter className="w-4 h-4" />
//                       Filter
//                     </button>
//                     <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-1">
//                       <Search className="w-4 h-4" />
//                       Search
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <div className="p-5">
//                 <div className="space-y-3">
//                   {exams.map(exam => (
//                     <div key={exam.id} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:shadow-sm transition-all">
//                       <div className="flex items-start justify-between mb-3">
//                         <div>
//                           <h3 className="font-semibold text-gray-900 mb-1">{exam.name}</h3>
//                           <div className="flex items-center gap-3 text-sm text-gray-600">
//                             <span className="flex items-center gap-1">
//                               <Users className="w-3.5 h-3.5" />
//                               Classes {exam.classes}
//                             </span>
//                             <span className="flex items-center gap-1">
//                               <Calendar className="w-3.5 h-3.5" />
//                               {exam.startDate} - {exam.endDate}
//                             </span>
//                           </div>
//                         </div>
//                         <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(exam.status)}`}>
//                           {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
//                         </span>
//                       </div>
                      
//                       {/* Progress Bar */}
//                       <div className="mb-3">
//                         <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
//                           <span>Progress</span>
//                           <span>{exam.completed}% Complete</span>
//                         </div>
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div 
//                             className={`h-2 rounded-full ${exam.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-500'}`}
//                             style={{ width: `${exam.completed}%` }}
//                           ></div>
//                         </div>
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-4 text-xs text-gray-600">
//                           <span className="flex items-center gap-1">
//                             <Users className="w-3.5 h-3.5" />
//                             {exam.students} Students
//                           </span>
//                           {exam.passRate && (
//                             <span className="flex items-center gap-1 text-emerald-600 font-medium">
//                               <TrendingUp className="w-3.5 h-3.5" />
//                               {exam.passRate}% Pass Rate
//                             </span>
//                           )}
//                         </div>
//                         <div className="flex gap-1">
//                           <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="View Details">
//                             <Eye className="w-4 h-4 text-gray-600" />
//                           </button>
//                           <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
//                             <Edit2 className="w-4 h-4 text-gray-600" />
//                           </button>
//                           {exam.status === 'completed' && (
//                             <button className="p-1.5 hover:bg-emerald-50 rounded-lg transition-colors" title="Publish Results">
//                               <CheckCircle className="w-4 h-4 text-emerald-600" />
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Subject Performance Analytics */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//               <div className="p-5 border-b border-gray-200">
//                 <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                   <BarChart3 className="w-5 h-5 text-indigo-600" />
//                   Subject-wise Performance
//                 </h2>
//               </div>
//               <div className="p-5">
//                 <div className="space-y-3">
//                   {subjectPerformance.map((subject, idx) => (
//                     <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//                       <div className="flex-1">
//                         <div className="flex items-center justify-between mb-2">
//                           <span className="font-medium text-gray-900">{subject.subject}</span>
//                           <div className="flex items-center gap-4">
//                             <span className={`text-sm font-semibold ${getPerformanceColor(subject.status)}`}>
//                               {subject.trend}
//                             </span>
//                             <span className="text-sm text-gray-600">{subject.avgScore}/100</span>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-3">
//                           <div className="flex-1 bg-gray-200 rounded-full h-2">
//                             <div 
//                               className={`h-2 rounded-full ${subject.status === 'excellent' ? 'bg-emerald-500' : subject.status === 'good' ? 'bg-blue-500' : 'bg-amber-500'}`}
//                               style={{ width: `${subject.passRate}%` }}
//                             ></div>
//                           </div>
//                           <span className="text-xs text-gray-600 w-16 text-right">{subject.passRate}% pass</span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Activity & Alerts */}
//           <div className="space-y-6">
//             {/* Upcoming Deadlines */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//               <div className="p-5 border-b border-gray-200">
//                 <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                   <Target className="w-5 h-5 text-indigo-600" />
//                   Upcoming Deadlines
//                 </h2>
//               </div>
//               <div className="p-5">
//                 <div className="space-y-3">
//                   {upcomingDeadlines.map((item, idx) => (
//                     <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
//                       <div className={`p-2 rounded-lg ${item.priority === 'high' ? 'bg-rose-100' : item.priority === 'medium' ? 'bg-amber-100' : 'bg-blue-100'}`}>
//                         <Clock className={`w-4 h-4 ${item.priority === 'high' ? 'text-rose-600' : item.priority === 'medium' ? 'text-amber-600' : 'text-blue-600'}`} />
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-sm font-medium text-gray-900 mb-1">{item.task}</p>
//                         <p className="text-xs text-gray-600">Due in {item.deadline}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Recent Activity Feed */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//               <div className="p-5 border-b border-gray-200">
//                 <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                   <Bell className="w-5 h-5 text-indigo-600" />
//                   Recent Activity
//                 </h2>
//               </div>
//               <div className="p-5">
//                 <div className="space-y-3">
//                   {recentActivity.map((activity, idx) => (
//                     <div key={idx} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
//                       <div className={`p-2 rounded-lg ${
//                         activity.type === 'publish' ? 'bg-emerald-100' :
//                         activity.type === 'alert' ? 'bg-rose-100' :
//                         activity.type === 'success' ? 'bg-blue-100' : 'bg-amber-100'
//                       }`}>
//                         {activity.type === 'publish' ? <CheckCircle className="w-4 h-4 text-emerald-600" /> :
//                          activity.type === 'alert' ? <AlertCircle className="w-4 h-4 text-rose-600" /> :
//                          activity.type === 'success' ? <Zap className="w-4 h-4 text-blue-600" /> :
//                          <Clock className="w-4 h-4 text-amber-600" />}
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-sm text-gray-900 mb-1">{activity.message}</p>
//                         <div className="flex items-center gap-2">
//                           <span className="text-xs text-gray-500">{activity.time}</span>
//                           <span className="text-xs text-indigo-600 font-medium">{activity.class}</span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Quick Actions */}
//             <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-sm p-5 text-white">
//               <h3 className="font-semibold mb-4 flex items-center gap-2">
//                 <Zap className="w-5 h-5" />
//                 Quick Actions
//               </h3>
//               <div className="space-y-2">
//                 <button className="w-full py-2.5 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-sm font-medium transition-all backdrop-blur-sm">
//                   📝 Enter Marks
//                 </button>
//                 <button className="w-full py-2.5 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-sm font-medium transition-all backdrop-blur-sm">
//                   📊 Generate Report Card
//                 </button>
//                 <button className="w-full py-2.5 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-sm font-medium transition-all backdrop-blur-sm">
//                   📢 Publish Results
//                 </button>
//                 <button className="w-full py-2.5 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-sm font-medium transition-all backdrop-blur-sm">
//                   ⚙️ Exam Settings
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExamDashboard;






import React, { useState } from 'react';
import './ExaminationScreen.css';
import { 
  BookOpen, Plus, Calendar, BarChart3, FileText, Users, Clock, 
  CheckCircle, AlertTriangle, XCircle, TrendingUp, 
  Eye, Edit2, Download, Upload, Settings, Bell, Target,
  PieChart, Activity, Zap, ChevronRight, Search, Filter
} from 'lucide-react';

const ExamDashboard = () => {
  // Metrics Data
  const metrics = [
    { 
      title: 'Total Exams', 
      value: '12', 
      icon: BookOpen, 
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      trend: '+2 this month'
    },
    { 
      title: 'Completed Exams', 
      value: '7', 
      icon: CheckCircle, 
      color: 'from-emerald-500 to-green-600',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      trend: '58% complete'
    },
    { 
      title: 'Ongoing Exams', 
      value: '3', 
      icon: Clock, 
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
      trend: 'In progress'
    },
    { 
      title: 'Pending Results', 
      value: '2', 
      icon: AlertTriangle, 
      color: 'from-rose-500 to-red-600',
      bgColor: 'bg-rose-50',
      iconColor: 'text-rose-600',
      trend: 'Need attention'
    },
    { 
      title: 'Classes Covered', 
      value: '18', 
      icon: Users, 
      color: 'from-purple-500 to-violet-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      trend: 'All grades'
    },
    { 
      title: 'Students Appeared', 
      value: '1,245', 
      icon: Target, 
      color: 'from-cyan-500 to-blue-600',
      bgColor: 'bg-cyan-50',
      iconColor: 'text-cyan-600',
      trend: '94% attendance'
    },
  ];

  // Exam Data
  const exams = [
    { 
      id: 1, 
      name: 'Mid Term Examination', 
      class: 'Class 10', 
      subjects: 6, 
      startDate: '10 Feb', 
      endDate: '18 Feb', 
      status: 'ongoing',
      progress: 45,
      studentsAppeared: 324
    },
    { 
      id: 2, 
      name: 'Unit Test 2', 
      class: 'Class 8', 
      subjects: 5, 
      startDate: '02 Feb', 
      endDate: '05 Feb', 
      status: 'completed',
      progress: 100,
      studentsAppeared: 278
    },
    { 
      id: 3, 
      name: 'Annual Examination', 
      class: 'Class 12', 
      subjects: 7, 
      startDate: '01 Mar', 
      endDate: '20 Mar', 
      status: 'upcoming',
      progress: 0,
      studentsAppeared: 0
    },
    { 
      id: 4, 
      name: 'Quarterly Assessment', 
      class: 'Class 6', 
      subjects: 5, 
      startDate: '25 Jan', 
      endDate: '30 Jan', 
      status: 'completed',
      progress: 100,
      studentsAppeared: 245
    },
    { 
      id: 5, 
      name: 'Final Term', 
      class: 'Class 9', 
      subjects: 6, 
      startDate: '15 Feb', 
      endDate: '25 Feb', 
      status: 'ongoing',
      progress: 30,
      studentsAppeared: 298
    },
  ];

  // Alerts Data
  const alerts = [
    { 
      type: 'error', 
      message: 'Results not published for Class 9 – Mathematics', 
      time: '2 hours ago',
      priority: 'high'
    },
    { 
      type: 'warning', 
      message: 'Evaluation pending for Science – Class 10', 
      time: '5 hours ago',
      priority: 'medium'
    },
    { 
      type: 'error', 
      message: 'Exam schedule clash detected – English & Social Studies', 
      time: '1 day ago',
      priority: 'high'
    },
    { 
      type: 'warning', 
      message: 'Low attendance in Physics exam – Class 11 (72%)', 
      time: '2 days ago',
      priority: 'medium'
    },
  ];

  // Progress Data
  const evaluationProgress = {
    answerSheets: { evaluated: 820, total: 1245, percentage: 66 },
    resultsPublished: { published: 9, total: 12, percentage: 75 },
    pendingEvaluations: 3
  };

  // Chart Data
  const examStatusData = [
    { status: 'Completed', count: 7, color: 'bg-emerald-500', percentage: 58 },
    { status: 'Ongoing', count: 3, color: 'bg-amber-500', percentage: 25 },
    { status: 'Upcoming', count: 2, color: 'bg-blue-500', percentage: 17 },
  ];

  const passFailData = [
    { class: 'Class 6', pass: 92, fail: 8 },
    { class: 'Class 7', pass: 88, fail: 12 },
    { class: 'Class 8', pass: 85, fail: 15 },
    { class: 'Class 9', pass: 79, fail: 21 },
    { class: 'Class 10', pass: 86, fail: 14 },
    { class: 'Class 11', pass: 81, fail: 19 },
    { class: 'Class 12', pass: 90, fail: 10 },
  ];

  const getStatusBadge = (status: 'ongoing' | 'completed' | 'upcoming') => {
    switch(status) {
      case 'ongoing':
        return <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full border border-amber-200">🟨 Ongoing</span>;
      case 'completed':
        return <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">🟩 Completed</span>;
      case 'upcoming':
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">🟦 Upcoming</span>;
      default:
        return null;
    }
  };

  const getAlertStyle = (type: 'error' | 'warning') => {
    if (type === 'error') {
      return 'bg-red-50 border-red-200 text-red-800';
    }
    return 'bg-amber-50 border-amber-200 text-amber-800';
  };

  const getAlertIcon = (type: 'error' | 'warning') => {
    if (type === 'error') {
      return <XCircle className="w-5 h-5 text-red-600" />;
    }
    return <AlertTriangle className="w-5 h-5 text-amber-600" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER SECTION */}
      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
                  <BookOpen className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">🎓 Examination Dashboard</h1>
                  <p className="text-blue-100 mt-1">Manage exams, schedules, evaluation & results</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-5 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl font-medium transition-all flex items-center gap-2 backdrop-blur-sm">
                <Calendar className="w-4 h-4" />
                Exam Schedule
              </button>
              <button className="px-5 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl font-medium transition-all flex items-center gap-2 backdrop-blur-sm">
                <BarChart3 className="w-4 h-4" />
                View Reports
              </button>
              <button className="px-5 py-3 bg-white hover:bg-gray-50 text-indigo-700 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg">
                <Plus className="w-4 h-4" />
                Create Exam
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* METRIC CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          {metrics.map((metric, idx) => (
            <div 
              key={idx} 
              className={`${metric.bgColor} rounded-2xl p-5 border border-gray-200 hover:shadow-lg transition-all cursor-pointer group`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-3 bg-gradient-to-br ${metric.color} rounded-xl shadow-md group-hover:scale-110 transition-transform`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className={`w-4 h-4 ${metric.iconColor} opacity-60`} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</h3>
              <p className="text-sm font-medium text-gray-700 mb-1">{metric.title}</p>
              <p className="text-xs text-gray-500">{metric.trend}</p>
            </div>
          ))}
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN - EXAM TABLE & CHARTS */}
          <div className="lg:col-span-2 space-y-6">
            {/* EXAM STATUS OVERVIEW TABLE */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-indigo-600" />
                    Exam Overview
                  </h2>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                      <Search className="w-4 h-4" />
                      Search
                    </button>
                    <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                      <Filter className="w-4 h-4" />
                      Filter
                    </button>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Exam Name</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Class</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Subjects</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Start Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">End Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {exams.map((exam) => (
                      <tr key={exam.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900">{exam.name}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {exam.studentsAppeared > 0 ? `${exam.studentsAppeared} students` : 'Not started'}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 font-medium">{exam.class}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                            {exam.subjects} subjects
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{exam.startDate}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{exam.endDate}</td>
                        <td className="px-6 py-4">{getStatusBadge(exam.status as 'ongoing' | 'completed' | 'upcoming')}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors group" title="View Details">
                              <Eye className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                            </button>
                            {exam.status === 'completed' && (
                              <button className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg text-xs font-semibold transition-colors">
                                Results
                              </button>
                            )}
                            {exam.status !== 'completed' && (
                              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors group" title="Edit">
                                <Edit2 className="w-4 h-4 text-gray-600 group-hover:text-indigo-600" />
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

            {/* CHARTS SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* EXAM STATUS PIE CHART */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-indigo-600" />
                  Exam Status Distribution
                </h3>
                <div className="space-y-4">
                  {examStatusData.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                          <span className="text-sm font-medium text-gray-700">{item.status}</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">{item.count} exams</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`${item.color} h-3 rounded-full transition-all duration-500 exam-progress-segment`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 text-right">{item.percentage}%</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PASS/FAIL BAR CHART */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-600" />
                  Pass vs Fail Ratio
                </h3>
                <div className="space-y-3">
                  {passFailData.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{item.class}</span>
                        <span className="text-xs text-gray-500">{item.pass}% pass</span>
                      </div>
                      <div className="flex gap-1 h-6">
                        <div 
                          className="exam-bar-segment exam-bar-segment-pass transition-all duration-500"
                          style={{ width: `${item.pass}%` }}
                        >
                          {item.pass > 15 && <span className="text-xs font-bold text-white">{item.pass}%</span>}
                        </div>
                        <div 
                          className="exam-bar-segment exam-bar-segment-fail transition-all duration-500"
                          style={{ width: `${item.fail}%` }}
                        >
                          {item.fail > 15 && <span className="text-xs font-bold text-white">{item.fail}%</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - PROGRESS, ALERTS, QUICK ACTIONS */}
          <div className="space-y-6">
            {/* EVALUATION & RESULT PROGRESS */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-600" />
                Evaluation Progress
              </h3>
              <div className="space-y-5">
                {/* Answer Sheets */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">📝 Answer Sheets Evaluated</span>
                    <span className="text-sm font-bold text-indigo-600">
                      {evaluationProgress.answerSheets.evaluated} / {evaluationProgress.answerSheets.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-blue-500 h-3 rounded-full transition-all duration-500 exam-progress-segment"
                      style={{ width: `${evaluationProgress.answerSheets.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 text-right">{evaluationProgress.answerSheets.percentage}% complete</div>
                </div>

                {/* Results Published */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">📊 Results Published</span>
                    <span className="text-sm font-bold text-emerald-600">
                      {evaluationProgress.resultsPublished.published} / {evaluationProgress.resultsPublished.total} Exams
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-green-500 h-3 rounded-full transition-all duration-500 exam-progress-segment"
                      style={{ width: `${evaluationProgress.resultsPublished.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 text-right">{evaluationProgress.resultsPublished.percentage}% complete</div>
                </div>

                {/* Pending */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="text-sm font-bold text-amber-900">⚠️ Pending Evaluations</p>
                      <p className="text-xs text-amber-700 mt-1">{evaluationProgress.pendingEvaluations} subjects need evaluation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* QUICK ALERTS PANEL */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-rose-600" />
                  Quick Alerts
                </h3>
                <span className="px-2 py-1 bg-rose-100 text-rose-700 text-xs font-bold rounded-full">
                  {alerts.filter(a => a.priority === 'high').length} High
                </span>
              </div>
              <div className="space-y-3">
                {alerts.map((alert, idx) => (
                  <div 
                    key={idx} 
                    className={`border rounded-xl p-4 ${getAlertStyle(alert.type as 'error' | 'warning')}`}
                  >
                    <div className="flex items-start gap-3">
                      {getAlertIcon(alert.type as 'error' | 'warning')}
                      <div className="flex-1">
                        <p className="text-sm font-semibold mb-1">{alert.message}</p>
                        <p className="text-xs opacity-75">{alert.time}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-60" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* QUICK ACTION SHORTCUTS */}
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl text-sm font-semibold transition-all backdrop-blur-sm flex items-center justify-between px-4">
                  <span className="flex items-center gap-2">
                    📝 Create New Exam
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button className="w-full py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl text-sm font-semibold transition-all backdrop-blur-sm flex items-center justify-between px-4">
                  <span className="flex items-center gap-2">
                    📄 Upload Marks
                  </span>
                  <Upload className="w-4 h-4" />
                </button>
                <button className="w-full py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl text-sm font-semibold transition-all backdrop-blur-sm flex items-center justify-between px-4">
                  <span className="flex items-center gap-2">
                    📊 Publish Results
                  </span>
                  <CheckCircle className="w-4 h-4" />
                </button>
                <button className="w-full py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl text-sm font-semibold transition-all backdrop-blur-sm flex items-center justify-between px-4">
                  <span className="flex items-center gap-2">
                    📁 Grade Setup
                  </span>
                  <Settings className="w-4 h-4" />
                </button>
                <button className="w-full py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl text-sm font-semibold transition-all backdrop-blur-sm flex items-center justify-between px-4">
                  <span className="flex items-center gap-2">
                    📑 Exam Reports
                  </span>
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamDashboard;