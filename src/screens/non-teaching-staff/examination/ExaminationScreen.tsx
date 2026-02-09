
// import React, { useState } from 'react';
// import { ClipboardCheck, FileText, Calendar, Users, BookOpen, BarChart3, Settings, Bell, Search, Menu, X, LogOut, ChevronDown, Clock, AlertCircle, CheckCircle2, FileSpreadsheet, Printer, Download, Upload, UserCheck, Award, TrendingUp, Activity, FilePlus, Edit3, Eye, MapPin, Shield, Plus, Filter, Save, Trash2, RefreshCw } from 'lucide-react';

// export default function ExamCoordinatorSystem() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [activeMenu, setActiveMenu] = useState('overview');
//   const [expandedMenus, setExpandedMenus] = useState(['exams']);

//   const toggleSubmenu = (menuId: string) => {
//     setExpandedMenus(prev =>
//       prev.includes(menuId)
//         ? prev.filter(id => id !== menuId)
//         : [...prev, menuId]
//     );
//   };

//   const navItems = [
//     { id: 'overview', icon: BarChart3, label: 'Overview Dashboard', badge: null },
//     {
//       id: 'exams',
//       icon: ClipboardCheck,
//       label: 'Examination Management',
//       badge: 4,
//       subItems: [
//         { id: 'schedule-exam', label: 'Schedule Exams', icon: Calendar },
//         { id: 'exam-list', label: 'All Examinations', icon: FileText },
//         { id: 'create-exam', label: 'Create New Exam', icon: FilePlus },
//         { id: 'exam-templates', label: 'Exam Templates', icon: BookOpen }
//       ]
//     },
//     {
//       id: 'students',
//       icon: Users,
//       label: 'Student Management',
//       subItems: [
//         { id: 'student-list', label: 'All Students', icon: Users },
//         { id: 'student-enrollment', label: 'Exam Enrollment', icon: UserCheck },
//         { id: 'student-results', label: 'Results Entry', icon: Award }
//       ]
//     },
//     {
//       id: 'venues',
//       icon: MapPin,
//       label: 'Venue Management',
//       badge: 2,
//       subItems: [
//         { id: 'venue-list', label: 'All Venues', icon: MapPin },
//         { id: 'seating-plan', label: 'Seating Arrangements', icon: Users }
//       ]
//     },
//     {
//       id: 'reports',
//       icon: FileSpreadsheet,
//       label: 'Reports & Analytics',
//       subItems: [
//         { id: 'exam-reports', label: 'Exam Reports', icon: BarChart3 },
//         { id: 'attendance-reports', label: 'Attendance', icon: CheckCircle2 },
//         { id: 'performance-analytics', label: 'Performance Analytics', icon: TrendingUp }
//       ]
//     },
//     {
//       id: 'resources',
//       icon: FileText,
//       label: 'Resources',
//       subItems: [
//         { id: 'question-bank', label: 'Question Bank', icon: BookOpen },
//         { id: 'answer-sheets', label: 'Answer Sheets', icon: FileText },
//         { id: 'materials', label: 'Exam Materials', icon: Upload }
//       ]
//     },
//     {
//       id: 'settings',
//       icon: Settings,
//       label: 'Settings',
//       subItems: [
//         { id: 'exam-settings', label: 'Exam Settings', icon: Settings },
//         { id: 'security', label: 'Security & Access', icon: Shield }
//       ]
//     }
//   ];

//   const renderContent = () => {
//     switch(activeMenu) {
//       case 'overview': return <OverviewDashboard />;
//       case 'schedule-exam': return <ScheduleExam />;
//       case 'exam-list': return <ExamList />;
//       case 'create-exam': return <CreateExam />;
//       case 'exam-templates': return <ExamTemplates />;
//       case 'student-list': return <StudentList />;
//       case 'student-enrollment': return <StudentEnrollment />;
//       case 'student-results': return <StudentResults />;
//       case 'venue-list': return <VenueList />;
//       case 'seating-plan': return <SeatingPlan />;
//       case 'exam-reports': return <ExamReports />;
//       case 'attendance-reports': return <AttendanceReports />;
//       case 'performance-analytics': return <PerformanceAnalytics />;
//       case 'question-bank': return <QuestionBank />;
//       case 'answer-sheets': return <AnswerSheets />;
//       case 'materials': return <ExamMaterials />;
//       case 'exam-settings': return <ExamSettings />;
//       case 'security': return <SecuritySettings />;
//       default: return <OverviewDashboard />;
//     }
//   };

 

//   return (
//     <div className="min-h-screen bg-slate-50 flex">
//       <aside className={`bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 ${isSidebarOpen ? 'w-72' : 'w-20'} flex flex-col`}>
//         <div className="p-4 border-b border-slate-700">
//           {isSidebarOpen ? (
//             <div className="flex items-center justify-between mb-4">
             
//               <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-slate-800 rounded-lg">
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//           ) : (
//             <button onClick={() => setIsSidebarOpen(true)} className="mx-auto p-2 hover:bg-slate-800 rounded-lg">
//               <Menu className="w-5 h-5" />
//             </button>
//           )}
//         </div>

        

//         <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
//           {navItems.map((item) => (
//             <div key={item.id}>
//               <button
//                 onClick={() => {
//                   setActiveMenu(item.id);
//                   if (item.subItems) toggleSubmenu(item.id);
//                 }}
//                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
//                   activeMenu === item.id ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 shadow-lg' : 'hover:bg-slate-800'
//                 } ${!isSidebarOpen && 'justify-center'}`}
//               >
//                 <item.icon className="w-5 h-5 flex-shrink-0" />
//                 {isSidebarOpen && (
//                   <>
//                     <span className="flex-1 text-left">{item.label}</span>
//                     {item.badge && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{item.badge}</span>}
//                     {item.subItems && <ChevronDown className={`w-4 h-4 transition-transform ${expandedMenus.includes(item.id) ? 'rotate-180' : ''}`} />}
//                   </>
//                 )}
//               </button>

//               {isSidebarOpen && item.subItems && expandedMenus.includes(item.id) && (
//                 <div className="mt-2 ml-4 space-y-1">
//                   {item.subItems.map((subItem) => (
//                     <button
//                       key={subItem.id}
//                       onClick={() => setActiveMenu(subItem.id)}
//                       className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all ${
//                         activeMenu === subItem.id ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
//                       }`}
//                     >
//                       <subItem.icon className="w-4 h-4" />
//                       {subItem.label}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </nav>

//         <div className="p-4 border-t border-slate-700">
//           <button onClick={() => setIsLoggedIn(false)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-900/30 text-red-400 transition-all ${!isSidebarOpen && 'justify-center'}`}>
//             <LogOut className="w-5 h-5" />
//             {isSidebarOpen && <span>Logout</span>}
//           </button>
//         </div>
//       </aside>

//       <main className="flex-1 flex flex-col overflow-hidden">
        

//         <div className="flex-1 overflow-y-auto p-8">
//           {renderContent()}
//         </div>
//       </main>
//     </div>
//   );
// }

// // Page Components
// function OverviewDashboard() {
//   const stats = [
//     { title: 'Upcoming Exams', value: '8', change: '+2 this week', icon: Calendar, bgColor: 'bg-emerald-50', iconColor: 'text-emerald-600' },
//     { title: 'Enrolled Students', value: '2,456', change: '+124 today', icon: Users, bgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
//     { title: 'Pending Results', value: '12', change: '-5 from yesterday', icon: AlertCircle, bgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
//     { title: 'Completed Exams', value: '34', change: '+3 this month', icon: CheckCircle2, bgColor: 'bg-violet-50', iconColor: 'text-violet-600' }
//   ];

//   const upcomingExams = [
//     { subject: 'Advanced Mathematics', date: 'Feb 15, 2026', time: '09:00 AM', students: 245, venue: 'Hall A', status: 'scheduled' },
//     { subject: 'Computer Science Theory', date: 'Feb 18, 2026', time: '02:00 PM', students: 189, venue: 'Lab Building', status: 'scheduled' },
//     { subject: 'Physics Practical', date: 'Feb 20, 2026', time: '10:00 AM', students: 156, venue: 'Science Lab', status: 'pending' }
//   ];

//   return (
//     <>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {stats.map((stat, idx) => (
//           <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
//             <div className="flex items-start justify-between mb-4">
//               <div className={`${stat.bgColor} p-3 rounded-lg`}>
//                 <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
//               </div>
//               <div className="text-sm font-medium text-green-600">{stat.change}</div>
//             </div>
//             <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
//             <div className="text-sm text-slate-600">{stat.title}</div>
//           </div>
//         ))}
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//         <h2 className="text-xl font-bold text-slate-900 mb-6">Upcoming Examinations</h2>
//         <div className="space-y-4">
//           {upcomingExams.map((exam, idx) => (
//             <div key={idx} className="border border-slate-200 rounded-lg p-4 hover:border-emerald-300 transition-colors">
//               <div className="flex items-start gap-4">
//                 <div className="bg-emerald-50 rounded-lg p-3 text-center min-w-[60px]">
//                   <div className="text-2xl font-bold text-emerald-600">{exam.date.split(' ')[1].replace(',', '')}</div>
//                   <div className="text-xs text-emerald-600 font-medium">{exam.date.split(' ')[0]}</div>
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="font-semibold text-slate-900 mb-2">{exam.subject}</h3>
//                   <div className="grid grid-cols-3 gap-4 text-sm text-slate-600">
//                     <div className="flex items-center gap-1"><Clock className="w-4 h-4" />{exam.time}</div>
//                     <div className="flex items-center gap-1"><Users className="w-4 h-4" />{exam.students}</div>
//                     <div className="flex items-center gap-1"><MapPin className="w-4 h-4" />{exam.venue}</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// function ScheduleExam() {
//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
//       <h2 className="text-2xl font-bold text-slate-900 mb-6">Schedule New Examination</h2>
//       <div className="grid grid-cols-2 gap-6">
//         <div><label className="block text-sm font-medium text-slate-700 mb-2">Exam Title</label><input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg" placeholder="Enter exam title" /></div>
//         <div><label className="block text-sm font-medium text-slate-700 mb-2">Subject</label><select className="w-full px-4 py-2 border border-slate-300 rounded-lg"><option>Mathematics</option></select></div>
//         <div><label className="block text-sm font-medium text-slate-700 mb-2">Exam Date</label><input type="date" className="w-full px-4 py-2 border border-slate-300 rounded-lg" /></div>
//         <div><label className="block text-sm font-medium text-slate-700 mb-2">Start Time</label><input type="time" className="w-full px-4 py-2 border border-slate-300 rounded-lg" /></div>
//       </div>
//       <div className="mt-6 flex gap-4">
//         <button className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-lg font-semibold">Schedule Exam</button>
//         <button className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg font-semibold">Cancel</button>
//       </div>
//     </div>
//   );
// }

// function ExamList() {
//   const exams = [
//     { id: 'EX001', title: 'Advanced Mathematics', date: 'Feb 15, 2026', students: 245, status: 'Scheduled' },
//     { id: 'EX002', title: 'Computer Science Theory', date: 'Feb 18, 2026', students: 189, status: 'Scheduled' }
//   ];

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-slate-900">All Examinations</h2>
//         <button className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-lg flex items-center gap-2"><Plus className="w-4 h-4" />New Exam</button>
//       </div>
//       <table className="w-full">
//         <thead className="bg-slate-50 border-y border-slate-200">
//           <tr>
//             <th className="px-4 py-3 text-left text-sm font-semibold">Exam ID</th>
//             <th className="px-4 py-3 text-left text-sm font-semibold">Title</th>
//             <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
//             <th className="px-4 py-3 text-left text-sm font-semibold">Students</th>
//             <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-slate-200">
//           {exams.map((exam) => (
//             <tr key={exam.id} className="hover:bg-slate-50">
//               <td className="px-4 py-4 text-sm">{exam.id}</td>
//               <td className="px-4 py-4 text-sm">{exam.title}</td>
//               <td className="px-4 py-4 text-sm">{exam.date}</td>
//               <td className="px-4 py-4 text-sm">{exam.students}</td>
//               <td className="px-4 py-4"><span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">{exam.status}</span></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// function CreateExam() {
//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
//       <h2 className="text-2xl font-bold text-slate-900 mb-6">Create New Examination</h2>
//       <div className="space-y-6">
//         <div className="grid grid-cols-2 gap-6">
//           <div><label className="block text-sm font-medium text-slate-700 mb-2">Exam Code</label><input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg" placeholder="EX-2026-001" /></div>
//           <div><label className="block text-sm font-medium text-slate-700 mb-2">Exam Type</label><select className="w-full px-4 py-2 border border-slate-300 rounded-lg"><option>Midterm</option></select></div>
//         </div>
//         <button className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-lg font-semibold">Create Exam</button>
//       </div>
//     </div>
//   );
// }

// function ExamTemplates() {
//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//       <h2 className="text-2xl font-bold text-slate-900 mb-6">Exam Templates</h2>
//       <div className="grid grid-cols-4 gap-6">
//         {['Midterm Template', 'Final Exam Template', 'Quiz Template', 'Practical Template'].map((t, i) => (
//           <div key={i} className="border border-slate-200 rounded-lg p-6 hover:border-emerald-300">
//             <BookOpen className="w-8 h-8 text-emerald-600 mb-3" />
//             <h3 className="font-semibold mb-2">{t}</h3>
//             <button className="w-full px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg">Use Template</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function StudentList() {
//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//       <h2 className="text-2xl font-bold text-slate-900 mb-6">Student Directory</h2>
//       <div className="text-center py-12 text-slate-500">Student list will be displayed here</div>
//     </div>
//   );
// }

// function StudentEnrollment() {
//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
//       <h2 className="text-2xl font-bold text-slate-900 mb-6">Exam Enrollment</h2>
//       <div className="space-y-6">
//         <div className="grid grid-cols-2 gap-6">
//           <div><label className="block text-sm font-medium text-slate-700 mb-2">Select Exam</label><select className="w-full px-4 py-2 border border-slate-300 rounded-lg"><option>Advanced Mathematics</option></select></div>
//           <div><label className="block text-sm font-medium text-slate-700 mb-2">Enrollment Method</label><select className="w-full px-4 py-2 border border-slate-300 rounded-lg"><option>Individual Student</option></select></div>
//         </div>
//         <button className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-lg font-semibold">Enroll Students</button>
//       </div>
//     </div>
//   );
// }

// function StudentResults() {
//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
//       <h2 className="text-2xl font-bold text-slate-900 mb-6">Results Entry</h2>
//       <div className="text-center py-12 text-slate-500">Results entry form will be displayed here</div>
//     </div>
//   );
// }

// function VenueList() {
//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//       <h2 className="text-2xl font-bold text-slate-900 mb-6">Venue Management</h2>
//       <div className="grid grid-cols-2 gap-6">
//         {['Hall A', 'Hall B', 'Lab Building', 'Science Lab'].map((v, i) => (
//           <div key={i} className="border border-slate-200 rounded-lg p-6">
//             <h3 className="text-lg font-semibold mb-2">{v}</h3>
//             <p className="text-sm text-slate-600">Capacity: 300 students</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function SeatingPlan() {
//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
//       <h2 className="text-2xl font-bold text-slate-900 mb-6">Seating Arrangements</h2>
//       <div className="text-center py-12 text-slate-500">Seating plan generator will be displayed here</div>
//     </div>
//   );
// }

// function ExamReports() {
//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//       <h2 className="text-2xl font-bold text-slate-900 mb-6">Examination Reports</h2>
//       <div className="grid grid-cols-3 gap-6">
//         {['Overall Performance', 'Subject Analysis', 'Comparative Report'].map((r, i) => (
//           <div key={i} className="border border-slate-200 rounded-lg p-6">
//             <BarChart3 className="w-10 h-10 text-emerald-600 mb-4" />
//             <h3 className="font-semibold mb-2">{r}</h3>
//             <button className="w-full px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg">Generate</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function AttendanceReports() {
//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//       <h2 className="text-2xl font-bold text-slate-900 mb-6">Attendance Reports</h2>
//       <div className="grid grid-cols-3 gap-6">
//         <div className="bg-green-50 border border-green-200 rounded-lg p-6">
//           <div className="text-3xl font-bold text-green-700 mb-2">92%</div>
//           <div className="text-sm text-green-600">Overall Attendance</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function PerformanceAnalytics() {
//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//       <h2 className="text-2xl font-bold text-slate-900 mb-6">Performance Analytics</h2>
//       <div className="text-center py-12 text-slate-500">Performance charts will be displayed here</div>
//     </div>
//   );
// }

// function QuestionBank() {
//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//       <h2 className="text-2xl font-bold text-slate-900 mb-6">Question Bank</h2>
//       <div className="text-center py-12 text-slate-500">Question bank will be displayed here</div>
//     </div>
//   );
// }

// function AnswerSheets() {
//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//       <h2 className="text-2xl font-bold text-slate-900 mb-6">Answer Sheets Management</h2>
//       <div className="text-center py-12 text-slate-500">Answer sheets upload area</div>
//     </div>
//   );
// }

// function ExamMaterials() {
//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//       <h2 className="text-2xl font-bold text-slate-900 mb-6">Exam Materials</h2>
//       <div className="text-center py-12 text-slate-500">Exam materials repository</div>
//     </div>
//   );
// }

// function ExamSettings() {
//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
//       <h2 className="text-2xl font-bold text-slate-900 mb-6">Exam Settings</h2>
//       <div className="text-center py-12 text-slate-500">Settings configuration panel</div>
//     </div>
//   );
// }

// function SecuritySettings() {
//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
//       <h2 className="text-2xl font-bold text-slate-900 mb-6">Security & Access Control</h2>
//       <div className="text-center py-12 text-slate-500">Security settings panel</div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  FileText,
  BookOpen,
  Search,
  Filter,
  Download,
  Plus,
  Edit2,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  TrendingUp,
  AlertCircle,
  Award,
  ClipboardList,
  Upload,
  Printer,
  Send,
  GraduationCap,
  BarChart3,
  LucideIcon,
  Mail,
  Target,
  ListChecks,
  FileEdit,
  History,
  Settings,
  UserCheck
} from 'lucide-react';

// Types
interface Exam {
  id: string;
  code: string;
  title: string;
  subject: string;
  type: 'midterm' | 'final' | 'quiz' | 'practical' | 'assignment';
  date: string;
  time: string;
  duration: number; // in minutes
  totalMarks: number;
  passingMarks: number;
  venue: string;
  department: string;
  semester: string;
  academicYear: string;
  invigilator: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  studentsEnrolled: number;
  instructions?: string;
}

interface Student {
  id: string;
  rollNumber: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  semester: string;
  photo: string;
  status: 'active' | 'inactive';
}

interface Result {
  id: string;
  examId: string;
  studentId: string;
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D' | 'F';
  status: 'pass' | 'fail';
  remarks?: string;
  submittedDate: string;
}

interface Attendance {
  id: string;
  examId: string;
  studentId: string;
  status: 'present' | 'absent' | 'late';
  checkInTime?: string;
  remarks?: string;
}

interface Stats {
  totalExams: number;
  upcomingExams: number;
  completedExams: number;
  totalStudents: number;
  averageAttendance: number;
  passPercentage: number;
}

// Data generators
const generateSampleExams = (): Exam[] => [
  {
    id: '1',
    code: 'EXM001',
    title: 'Data Structures Midterm',
    subject: 'Data Structures',
    type: 'midterm',
    date: '2024-02-15',
    time: '10:00',
    duration: 120,
    totalMarks: 100,
    passingMarks: 40,
    venue: 'Hall A',
    department: 'Computer Science',
    semester: '3rd',
    academicYear: '2023-24',
    invigilator: 'Dr. Sharma',
    status: 'scheduled',
    studentsEnrolled: 85,
    instructions: 'Bring calculator and student ID'
  },
  {
    id: '2',
    code: 'EXM002',
    title: 'Database Management Final',
    subject: 'Database Management',
    type: 'final',
    date: '2024-02-20',
    time: '14:00',
    duration: 180,
    totalMarks: 100,
    passingMarks: 40,
    venue: 'Hall B',
    department: 'Computer Science',
    semester: '4th',
    academicYear: '2023-24',
    invigilator: 'Prof. Kumar',
    status: 'scheduled',
    studentsEnrolled: 92,
    instructions: 'No electronic devices allowed'
  },
  {
    id: '3',
    code: 'EXM003',
    title: 'Web Development Quiz',
    subject: 'Web Development',
    type: 'quiz',
    date: '2024-02-10',
    time: '09:00',
    duration: 60,
    totalMarks: 50,
    passingMarks: 20,
    venue: 'Lab 1',
    department: 'Computer Science',
    semester: '5th',
    academicYear: '2023-24',
    invigilator: 'Dr. Patel',
    status: 'completed',
    studentsEnrolled: 78,
    instructions: 'Online quiz - laptops provided'
  },
  {
    id: '4',
    code: 'EXM004',
    title: 'Operating Systems Practical',
    subject: 'Operating Systems',
    type: 'practical',
    date: '2024-02-12',
    time: '11:00',
    duration: 90,
    totalMarks: 50,
    passingMarks: 20,
    venue: 'Lab 2',
    department: 'Computer Science',
    semester: '3rd',
    academicYear: '2023-24',
    invigilator: 'Dr. Singh',
    status: 'ongoing',
    studentsEnrolled: 65,
    instructions: 'Hands-on practical examination'
  },
  {
    id: '5',
    code: 'EXM005',
    title: 'Computer Networks Assignment',
    subject: 'Computer Networks',
    type: 'assignment',
    date: '2024-02-18',
    time: '15:00',
    duration: 120,
    totalMarks: 100,
    passingMarks: 40,
    venue: 'Hall C',
    department: 'Computer Science',
    semester: '6th',
    academicYear: '2023-24',
    invigilator: 'Prof. Reddy',
    status: 'scheduled',
    studentsEnrolled: 56,
    instructions: 'Submit assignment before deadline'
  }
];

const generateSampleStudents = (): Student[] => [
  {
    id: '1',
    rollNumber: 'CS2021001',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@university.edu',
    phone: '+91 98765 43210',
    department: 'Computer Science',
    semester: '3rd',
    photo: '👨‍🎓',
    status: 'active'
  },
  {
    id: '2',
    rollNumber: 'CS2021002',
    name: 'Priya Patel',
    email: 'priya.patel@university.edu',
    phone: '+91 98765 43211',
    department: 'Computer Science',
    semester: '3rd',
    photo: '👩‍🎓',
    status: 'active'
  },
  {
    id: '3',
    rollNumber: 'CS2021003',
    name: 'Amit Kumar',
    email: 'amit.kumar@university.edu',
    phone: '+91 98765 43212',
    department: 'Computer Science',
    semester: '4th',
    photo: '👨‍🎓',
    status: 'active'
  },
  {
    id: '4',
    rollNumber: 'CS2021004',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@university.edu',
    phone: '+91 98765 43213',
    department: 'Computer Science',
    semester: '4th',
    photo: '👩‍🎓',
    status: 'active'
  },
  {
    id: '5',
    rollNumber: 'CS2021005',
    name: 'Vikram Singh',
    email: 'vikram.singh@university.edu',
    phone: '+91 98765 43214',
    department: 'Computer Science',
    semester: '5th',
    photo: '👨‍🎓',
    status: 'active'
  }
];

const generateSampleResults = (): Result[] => {
  const exams = generateSampleExams();
  const students = generateSampleStudents();
  const results: Result[] = [];

  exams.forEach(exam => {
    if (exam.status === 'completed') {
      students.forEach((student, index) => {
        const marksObtained = Math.floor(Math.random() * (exam.totalMarks - 30)) + 30;
        const percentage = (marksObtained / exam.totalMarks) * 100;
        
        let grade: Result['grade'];
        if (percentage >= 90) grade = 'A+';
        else if (percentage >= 80) grade = 'A';
        else if (percentage >= 70) grade = 'B+';
        else if (percentage >= 60) grade = 'B';
        else if (percentage >= 50) grade = 'C';
        else if (percentage >= 40) grade = 'D';
        else grade = 'F';

        results.push({
          id: `${exam.id}-${student.id}`,
          examId: exam.id,
          studentId: student.id,
          marksObtained,
          totalMarks: exam.totalMarks,
          percentage,
          grade,
          status: marksObtained >= exam.passingMarks ? 'pass' : 'fail',
          remarks: marksObtained >= exam.passingMarks ? 'Good performance' : 'Needs improvement',
          submittedDate: exam.date
        });
      });
    }
  });

  return results;
};

const generateSampleAttendance = (): Attendance[] => {
  const exams = generateSampleExams();
  const students = generateSampleStudents();
  const attendance: Attendance[] = [];

  exams.forEach(exam => {
    students.forEach(student => {
      const statuses: Attendance['status'][] = ['present', 'present', 'present', 'absent', 'late'];
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      attendance.push({
        id: `${exam.id}-${student.id}`,
        examId: exam.id,
        studentId: student.id,
        status,
        checkInTime: status !== 'absent' ? exam.time : undefined,
        remarks: status === 'late' ? 'Arrived 10 minutes late' : undefined
      });
    });
  });

  return attendance;
};

// Main App Component
export default function ExaminationManagementSystem() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'exams' | 'students' | 'results' | 'attendance' | 'reports'>('dashboard');
  const [exams, setExams] = useState<Exam[]>(generateSampleExams());
  const [students, setStudents] = useState<Student[]>(generateSampleStudents());
  const [results, setResults] = useState<Result[]>(generateSampleResults());
  const [attendance, setAttendance] = useState<Attendance[]>(generateSampleAttendance());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'exam' | 'student' | 'result' | 'attendance'>('exam');

  const filteredExams = exams.filter(exam =>
    exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats: Stats = {
    totalExams: exams.length,
    upcomingExams: exams.filter(e => e.status === 'scheduled').length,
    completedExams: exams.filter(e => e.status === 'completed').length,
    totalStudents: students.length,
    averageAttendance: Math.round((attendance.filter(a => a.status === 'present').length / attendance.length) * 100),
    passPercentage: Math.round((results.filter(r => r.status === 'pass').length / results.length) * 100)
  };

  const openModal = (type: 'exam' | 'student' | 'result' | 'attendance', exam?: Exam, student?: Student) => {
    if (exam) setSelectedExam(exam);
    if (student) setSelectedStudent(student);
    setModalType(type);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Examination Management System
                </h1>
                <p className="text-sm text-slate-400">Academic Assessment & Evaluation</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-slate-400">Academic Year</p>
                <p className="text-sm font-medium">2023-24</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/30 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'dashboard' as const, label: 'Dashboard', icon: BarChart3 },
              { id: 'exams' as const, label: 'Examinations', icon: BookOpen },
              { id: 'students' as const, label: 'Students', icon: Users },
              { id: 'results' as const, label: 'Results', icon: Award },
              { id: 'attendance' as const, label: 'Attendance', icon: UserCheck },
              { id: 'reports' as const, label: 'Reports', icon: FileText }
            ].map(tab => {
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-medium transition-all flex items-center gap-2 relative whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-emerald-400'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard stats={stats} exams={exams} students={students} results={results} attendance={attendance} />
        )}

        {activeTab === 'exams' && (
          <ExamsTab
            exams={filteredExams}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            openModal={openModal}
          />
        )}

        {activeTab === 'students' && (
          <StudentsTab
            students={filteredStudents}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            openModal={openModal}
          />
        )}

        {activeTab === 'results' && (
          <ResultsTab
            exams={exams}
            students={students}
            results={results}
            setResults={setResults}
          />
        )}

        {activeTab === 'attendance' && (
          <AttendanceTab
            exams={exams}
            students={students}
            attendance={attendance}
            setAttendance={setAttendance}
          />
        )}

        {activeTab === 'reports' && (
          <ReportsTab
            exams={exams}
            students={students}
            results={results}
            attendance={attendance}
          />
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <Modal
          type={modalType}
          exam={selectedExam}
          student={selectedStudent}
          onClose={() => setShowModal(false)}
          results={selectedExam ? results.filter(r => r.examId === selectedExam.id) : []}
          attendance={selectedExam ? attendance.filter(a => a.examId === selectedExam.id) : []}
          students={students}
        />
      )}
    </div>
  );
}

// Dashboard Component
interface DashboardProps {
  stats: Stats;
  exams: Exam[];
  students: Student[];
  results: Result[];
  attendance: Attendance[];
}

function Dashboard({ stats, exams, students, results, attendance }: DashboardProps) {
  const upcomingExams = exams.filter(e => e.status === 'scheduled').slice(0, 5);
  const recentResults = results.slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Examinations"
          value={stats.totalExams}
          icon={BookOpen}
          gradient="from-emerald-500 to-teal-600"
          subtitle={`${stats.upcomingExams} upcoming, ${stats.completedExams} completed`}
        />
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon={Users}
          gradient="from-blue-500 to-cyan-600"
          subtitle="Enrolled in examinations"
        />
        <StatCard
          title="Average Attendance"
          value={`${stats.averageAttendance}%`}
          icon={UserCheck}
          gradient="from-purple-500 to-pink-600"
          subtitle="Across all examinations"
        />
        <StatCard
          title="Pass Percentage"
          value={`${stats.passPercentage}%`}
          icon={Award}
          gradient="from-amber-500 to-orange-600"
          subtitle="Overall performance"
        />
        <StatCard
          title="Upcoming Exams"
          value={stats.upcomingExams}
          icon={Calendar}
          gradient="from-rose-500 to-red-600"
          subtitle="This week"
        />
        <StatCard
          title="Completed Exams"
          value={stats.completedExams}
          icon={CheckCircle}
          gradient="from-indigo-500 to-violet-600"
          subtitle="This semester"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-400" />
            Upcoming Examinations
          </h3>
          <div className="space-y-3">
            {upcomingExams.map(exam => (
              <div key={exam.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-all">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{exam.title}</h4>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      exam.type === 'midterm' ? 'bg-blue-500/20 text-blue-400' :
                      exam.type === 'final' ? 'bg-purple-500/20 text-purple-400' :
                      exam.type === 'quiz' ? 'bg-green-500/20 text-green-400' :
                      exam.type === 'practical' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-slate-500/20 text-slate-400'
                    }`}>
                      {exam.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {new Date(exam.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} • {exam.time} • {exam.venue}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-emerald-400">{exam.studentsEnrolled}</p>
                  <p className="text-xs text-slate-400">Students</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            Recent Results
          </h3>
          <div className="space-y-3">
            {recentResults.map(result => {
              const student = students.find(s => s.id === result.studentId);
              const exam = exams.find(e => e.id === result.examId);
              return (
                <div key={result.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{student?.photo}</div>
                    <div>
                      <p className="font-medium">{student?.name}</p>
                      <p className="text-xs text-slate-400">{exam?.title}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                      result.grade === 'A+' || result.grade === 'A' ? 'bg-emerald-500/20 text-emerald-400' :
                      result.grade === 'B+' || result.grade === 'B' ? 'bg-blue-500/20 text-blue-400' :
                      result.grade === 'C' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {result.grade}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{result.percentage.toFixed(1)}%</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Exam Schedule</h3>
            <Calendar className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-bold mb-2">{stats.upcomingExams}</p>
          <p className="text-sm text-slate-400">Exams scheduled this week</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Active Students</h3>
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-3xl font-bold mb-2">{stats.totalStudents}</p>
          <p className="text-sm text-slate-400">Participating in exams</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Success Rate</h3>
            <TrendingUp className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-bold mb-2">{stats.passPercentage}%</p>
          <p className="text-sm text-slate-400">Students passing exams</p>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  gradient: string;
  subtitle: string;
}

function StatCard({ title, value, icon: IconComponent, gradient, subtitle }: StatCardProps) {
  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg`}>
          <IconComponent className="w-6 h-6 text-white" />
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold mb-1">{value}</p>
        <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}

// Exams Tab
interface ExamsTabProps {
  exams: Exam[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  openModal: (type: 'exam' | 'student' | 'result' | 'attendance', exam?: Exam, student?: Student) => void;
}

function ExamsTab({ exams, searchTerm, setSearchTerm, openModal }: ExamsTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Examination Schedule</h2>
        <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg font-medium hover:shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Schedule Exam
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search exams by title, code, or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-slate-100 placeholder-slate-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {exams.map(exam => (
          <div key={exam.id} className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/50 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold">{exam.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    exam.type === 'midterm' ? 'bg-blue-500/20 text-blue-400' :
                    exam.type === 'final' ? 'bg-purple-500/20 text-purple-400' :
                    exam.type === 'quiz' ? 'bg-green-500/20 text-green-400' :
                    exam.type === 'practical' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-slate-500/20 text-slate-400'
                  }`}>
                    {exam.type}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    exam.status === 'scheduled' ? 'bg-cyan-500/20 text-cyan-400' :
                    exam.status === 'ongoing' ? 'bg-amber-500/20 text-amber-400' :
                    exam.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {exam.status}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mb-3">{exam.code} • {exam.subject} • {exam.department}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-slate-800/50 p-3 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">Date & Time</p>
                <p className="text-sm font-medium">{new Date(exam.date).toLocaleDateString('en-IN')} {exam.time}</p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">Duration</p>
                <p className="text-sm font-medium">{exam.duration} minutes</p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">Total Marks</p>
                <p className="text-sm font-medium">{exam.totalMarks}</p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">Students</p>
                <p className="text-sm font-medium text-emerald-400">{exam.studentsEnrolled}</p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">Venue</p>
                <p className="text-sm font-medium">{exam.venue}</p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">Invigilator</p>
                <p className="text-sm font-medium">{exam.invigilator}</p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">Semester</p>
                <p className="text-sm font-medium">{exam.semester}</p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">Passing Marks</p>
                <p className="text-sm font-medium">{exam.passingMarks}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => openModal('exam', exam)}
                className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-all text-sm font-medium flex items-center gap-1"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>
              <button className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-all text-sm font-medium flex items-center gap-1">
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button className="px-4 py-2 bg-amber-500/10 text-amber-400 rounded-lg hover:bg-amber-500/20 transition-all text-sm font-medium flex items-center gap-1">
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-all text-sm font-medium flex items-center gap-1">
                <Send className="w-4 h-4" />
                Notify
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Students Tab
interface StudentsTabProps {
  students: Student[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  openModal: (type: 'exam' | 'student' | 'result' | 'attendance', exam?: Exam, student?: Student) => void;
}

function StudentsTab({ students, searchTerm, setSearchTerm, openModal }: StudentsTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Student Directory</h2>
        <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg font-medium hover:shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Student
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search students by name or roll number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-slate-100 placeholder-slate-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map(student => (
          <div key={student.id} className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/50 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-4xl">{student.photo}</div>
                <div>
                  <h3 className="font-semibold">{student.name}</h3>
                  <p className="text-sm text-slate-400">{student.rollNumber}</p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                student.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-500/20 text-slate-400'
              }`}>
                {student.status}
              </div>
            </div>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Department</span>
                <span className="font-medium">{student.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Semester</span>
                <span className="font-medium">{student.semester}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Email</span>
                <span className="font-medium text-xs truncate ml-2">{student.email}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => openModal('student', undefined, student)}
                className="flex-1 px-3 py-2 bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-all text-sm font-medium flex items-center justify-center gap-1"
              >
                <Eye className="w-4 h-4" />
                View
              </button>
              <button className="flex-1 px-3 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-all text-sm font-medium flex items-center justify-center gap-1">
                <Award className="w-4 h-4" />
                Results
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Results Tab
interface ResultsTabProps {
  exams: Exam[];
  students: Student[];
  results: Result[];
  setResults: React.Dispatch<React.SetStateAction<Result[]>>;
}

function ResultsTab({ exams, students, results, setResults }: ResultsTabProps) {
  const [selectedExam, setSelectedExam] = useState<string>('all');

  const filteredResults = selectedExam === 'all'
    ? results
    : results.filter(r => r.examId === selectedExam);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Examination Results</h2>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-lg hover:bg-purple-500/20 transition-all flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Import Results
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg font-medium hover:shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Results
          </button>
        </div>
      </div>

      <select
        value={selectedExam}
        onChange={(e) => setSelectedExam(e.target.value)}
        className="px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-slate-100"
      >
        <option value="all">All Examinations</option>
        {exams.map(exam => (
          <option key={exam.id} value={exam.id}>{exam.title}</option>
        ))}
      </select>

      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Student</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Exam</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Marks</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Percentage</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Grade</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.map(result => {
              const student = students.find(s => s.id === result.studentId);
              const exam = exams.find(e => e.id === result.examId);
              return (
                <tr key={result.id} className="border-t border-slate-800 hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{student?.photo}</div>
                      <div>
                        <p className="font-medium">{student?.name}</p>
                        <p className="text-xs text-slate-400">{student?.rollNumber}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium">{exam?.title}</p>
                    <p className="text-xs text-slate-400">{exam?.code}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold">{result.marksObtained}/{result.totalMarks}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-emerald-400">{result.percentage.toFixed(1)}%</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      result.grade === 'A+' || result.grade === 'A' ? 'bg-emerald-500/20 text-emerald-400' :
                      result.grade === 'B+' || result.grade === 'B' ? 'bg-blue-500/20 text-blue-400' :
                      result.grade === 'C' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {result.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      result.status === 'pass' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {result.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      <button className="p-1 hover:bg-blue-500/20 rounded text-blue-400 transition-all" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 hover:bg-purple-500/20 rounded text-purple-400 transition-all" title="Print">
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Attendance Tab
interface AttendanceTabProps {
  exams: Exam[];
  students: Student[];
  attendance: Attendance[];
  setAttendance: React.Dispatch<React.SetStateAction<Attendance[]>>;
}

function AttendanceTab({ exams, students, attendance, setAttendance }: AttendanceTabProps) {
  const [selectedExam, setSelectedExam] = useState<string>(exams[0]?.id || '');

  const examAttendance = attendance.filter(a => a.examId === selectedExam);
  const selectedExamData = exams.find(e => e.id === selectedExam);

  const markAttendance = (studentId: string, status: Attendance['status']) => {
    setAttendance(prev => {
      const existing = prev.find(a => a.examId === selectedExam && a.studentId === studentId);
      if (existing) {
        return prev.map(a =>
          a.examId === selectedExam && a.studentId === studentId
            ? { ...a, status, checkInTime: status !== 'absent' ? selectedExamData?.time : undefined }
            : a
        );
      } else {
        return [...prev, {
          id: `${selectedExam}-${studentId}`,
          examId: selectedExam,
          studentId,
          status,
          checkInTime: status !== 'absent' ? selectedExamData?.time : undefined
        }];
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Attendance Management</h2>
        <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg font-medium hover:shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
        <select
          value={selectedExam}
          onChange={(e) => setSelectedExam(e.target.value)}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-slate-100 font-medium"
        >
          {exams.map(exam => (
            <option key={exam.id} value={exam.id}>
              {exam.title} - {new Date(exam.date).toLocaleDateString('en-IN')} at {exam.time}
            </option>
          ))}
        </select>
      </div>

      {selectedExamData && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <p className="text-sm text-slate-400 mb-1">Total Students</p>
            <p className="text-2xl font-bold">{examAttendance.length}</p>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
            <p className="text-sm text-slate-400 mb-1">Present</p>
            <p className="text-2xl font-bold text-emerald-400">
              {examAttendance.filter(a => a.status === 'present').length}
            </p>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <p className="text-sm text-slate-400 mb-1">Absent</p>
            <p className="text-2xl font-bold text-red-400">
              {examAttendance.filter(a => a.status === 'absent').length}
            </p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
            <p className="text-sm text-slate-400 mb-1">Late</p>
            <p className="text-2xl font-bold text-amber-400">
              {examAttendance.filter(a => a.status === 'late').length}
            </p>
          </div>
        </div>
      )}

      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Student</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Roll Number</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Department</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Check-in Time</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => {
              const att = examAttendance.find(a => a.studentId === student.id);
              return (
                <tr key={student.id} className="border-t border-slate-800 hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{student.photo}</div>
                      <p className="font-medium">{student.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{student.rollNumber}</td>
                  <td className="px-6 py-4 text-sm">{student.department}</td>
                  <td className="px-6 py-4 text-sm">{att?.checkInTime || '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      att?.status === 'present' ? 'bg-emerald-500/20 text-emerald-400' :
                      att?.status === 'absent' ? 'bg-red-500/20 text-red-400' :
                      att?.status === 'late' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-slate-500/20 text-slate-400'
                    }`}>
                      {att?.status || 'Not marked'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      <button
                        onClick={() => markAttendance(student.id, 'present')}
                        className="p-1 hover:bg-emerald-500/20 rounded text-emerald-400 transition-all"
                        title="Mark Present"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => markAttendance(student.id, 'absent')}
                        className="p-1 hover:bg-red-500/20 rounded text-red-400 transition-all"
                        title="Mark Absent"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => markAttendance(student.id, 'late')}
                        className="p-1 hover:bg-amber-500/20 rounded text-amber-400 transition-all"
                        title="Mark Late"
                      >
                        <Clock className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Reports Tab
interface ReportsTabProps {
  exams: Exam[];
  students: Student[];
  results: Result[];
  attendance: Attendance[];
}

function ReportsTab({ exams, students, results, attendance }: ReportsTabProps) {
  const reportTypes = [
    { id: '1', title: 'Examination Schedule Report', icon: Calendar, color: 'emerald', description: 'Complete schedule of all examinations' },
    { id: '2', title: 'Student Performance Report', icon: Award, color: 'blue', description: 'Individual student performance analysis' },
    { id: '3', title: 'Attendance Report', icon: UserCheck, color: 'purple', description: 'Attendance records for all examinations' },
    { id: '4', title: 'Grade Distribution Report', icon: BarChart3, color: 'amber', description: 'Statistical distribution of grades' },
    { id: '5', title: 'Department-wise Analysis', icon: Target, color: 'rose', description: 'Performance analysis by department' },
    { id: '6', title: 'Comprehensive Report', icon: FileText, color: 'indigo', description: 'Complete examination analytics' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Reports & Analytics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map(report => {
          const IconComp = report.icon;
          return (
            <div key={report.id} className={`bg-${report.color}-500/10 border border-${report.color}-500/20 rounded-2xl p-6 hover:border-${report.color}-500/40 transition-all cursor-pointer group`}>
              <div className={`w-12 h-12 bg-gradient-to-br from-${report.color}-500 to-${report.color}-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <IconComp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{report.title}</h3>
              <p className="text-sm text-slate-400 mb-4">{report.description}</p>
              <button className={`w-full px-4 py-2 bg-${report.color}-500/20 text-${report.color}-400 rounded-lg hover:bg-${report.color}-500/30 transition-all font-medium flex items-center justify-center gap-2`}>
                <Download className="w-4 h-4" />
                Generate Report
              </button>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Statistics</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
              <span className="text-slate-400">Total Examinations</span>
              <span className="text-xl font-bold">{exams.length}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
              <span className="text-slate-400">Total Students</span>
              <span className="text-xl font-bold">{students.length}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
              <span className="text-slate-400">Average Pass Rate</span>
              <span className="text-xl font-bold text-emerald-400">
                {Math.round((results.filter(r => r.status === 'pass').length / results.length) * 100)}%
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
              <span className="text-slate-400">Average Attendance</span>
              <span className="text-xl font-bold text-blue-400">
                {Math.round((attendance.filter(a => a.status === 'present').length / attendance.length) * 100)}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Export Options</h3>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 transition-all font-medium flex items-center justify-between">
              <span>Export as PDF</span>
              <Download className="w-4 h-4" />
            </button>
            <button className="w-full px-4 py-3 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-all font-medium flex items-center justify-between">
              <span>Export as Excel</span>
              <Download className="w-4 h-4" />
            </button>
            <button className="w-full px-4 py-3 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-lg hover:bg-purple-500/20 transition-all font-medium flex items-center justify-between">
              <span>Export as CSV</span>
              <Download className="w-4 h-4" />
            </button>
            <button className="w-full px-4 py-3 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-lg hover:bg-amber-500/20 transition-all font-medium flex items-center justify-between">
              <span>Send via Email</span>
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Modal Component
interface ModalProps {
  type: 'exam' | 'student' | 'result' | 'attendance';
  exam: Exam | null;
  student: Student | null;
  onClose: () => void;
  results: Result[];
  attendance: Attendance[];
  students: Student[];
}

function Modal({ type, exam, student, onClose, results, attendance, students }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {type === 'exam' && 'Examination Details'}
            {type === 'student' && 'Student Details'}
            {type === 'result' && 'Result Details'}
            {type === 'attendance' && 'Attendance Details'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg transition-all">
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {type === 'exam' && exam && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{exam.title}</h3>
                  <p className="text-slate-400">{exam.code} • {exam.subject}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">Examination Type</p>
                  <p className="font-semibold capitalize">{exam.type}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">Status</p>
                  <p className="font-semibold capitalize">{exam.status}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">Date & Time</p>
                  <p className="font-semibold">{new Date(exam.date).toLocaleDateString('en-IN')} at {exam.time}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">Duration</p>
                  <p className="font-semibold">{exam.duration} minutes</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">Total Marks</p>
                  <p className="font-semibold text-emerald-400">{exam.totalMarks}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">Passing Marks</p>
                  <p className="font-semibold">{exam.passingMarks}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">Venue</p>
                  <p className="font-semibold">{exam.venue}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">Students Enrolled</p>
                  <p className="font-semibold text-emerald-400">{exam.studentsEnrolled}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">Department</p>
                  <p className="font-semibold">{exam.department}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">Semester</p>
                  <p className="font-semibold">{exam.semester}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">Academic Year</p>
                  <p className="font-semibold">{exam.academicYear}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">Invigilator</p>
                  <p className="font-semibold">{exam.invigilator}</p>
                </div>
              </div>

              {exam.instructions && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                  <p className="text-sm text-slate-400 mb-2">Instructions</p>
                  <p className="text-sm">{exam.instructions}</p>
                </div>
              )}
            </div>
          )}

          {type === 'student' && student && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="text-6xl">{student.photo}</div>
                <div>
                  <h3 className="text-2xl font-bold">{student.name}</h3>
                  <p className="text-slate-400">{student.rollNumber}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">Department</p>
                  <p className="font-semibold">{student.department}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">Semester</p>
                  <p className="font-semibold">{student.semester}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl col-span-2">
                  <p className="text-sm text-slate-400 mb-1">Email</p>
                  <p className="font-semibold">{student.email}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl col-span-2">
                  <p className="text-sm text-slate-400 mb-1">Phone</p>
                  <p className="font-semibold">{student.phone}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">Status</p>
                  <p className="font-semibold capitalize">{student.status}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}