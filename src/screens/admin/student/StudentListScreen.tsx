
// // import React, { useState } from 'react';
// // import AddStudentScreen from './AddStudentScreen';

// // interface Student {
// //     id: number;
// //     firstName: string;
// //     lastName: string;
// //     email: string;
// //     class: string;
// // }

// // const sampleStudents: Student[] = [
// //     { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@email.com', class: '3' },
// //     { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@email.com', class: '2' },
// //     { id: 3, firstName: 'Sam', lastName: 'Brown', email: 'sam.brown@email.com', class: '1' },
// // ];



// // const StudentListScreen: React.FC = () => {
// //     const [students, setStudents] = useState<Student[]>(sampleStudents);
// //     const [loading, setLoading] = useState(false);
// //     const [showAddModal, setShowAddModal] = useState(false);

// //     // Simulate delete action
// //     const handleDelete = (id: number) => {
// //         setLoading(true);
// //         setTimeout(() => {
// //             setStudents((prev) => prev.filter((s) => s.id !== id));
// //             setLoading(false);
// //         }, 800);
// //     };

// //     // Modal close handler
// //     const handleCloseModal = () => setShowAddModal(false);

// //     return (
// //         <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
// //             <div className="flex items-center justify-between mb-4">
// //                 <h2 className="text-2xl font-bold">Student List</h2>
// //                 <button
// //                     className="bg-blue-600 text-white px-5 py-2 rounded font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                     onClick={() => setShowAddModal(true)}
// //                     aria-label="Add new student"
// //                 >
// //                     Add New Student
// //                 </button>
// //             </div>
// //             {/* error state removed as setError is unused */}
// //             {loading && <div className="text-blue-600 mb-2">Processing...</div>}
// //             {students.length === 0 ? (
// //                 <div className="text-gray-500 py-8 text-center">No students found.</div>
// //             ) : (
// //                 <div className="overflow-x-auto">
// //                     <table className="min-w-full border">
// //                         <thead>
// //                             <tr className="bg-gray-100">
// //                                 <th className="px-4 py-2 text-left">Name</th>
// //                                 <th className="px-4 py-2 text-left">Email</th>
// //                                 <th className="px-4 py-2 text-left">Class</th>
// //                                 <th className="px-4 py-2 text-left">Actions</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {students.map((student) => (
// //                                 <tr key={student.id} className="border-b">
// //                                     <td className="px-4 py-2">{student.firstName} {student.lastName}</td>
// //                                     <td className="px-4 py-2">{student.email}</td>
// //                                     <td className="px-4 py-2">{student.class}</td>
// //                                     <td className="px-4 py-2 flex gap-2">
// //                                         <button className="text-blue-600 hover:underline text-sm">View</button>
// //                                         <button className="text-green-600 hover:underline text-sm">Edit</button>
// //                                         <button
// //                                             className="text-red-600 hover:underline text-sm"
// //                                             onClick={() => handleDelete(student.id)}
// //                                             disabled={loading}
// //                                         >
// //                                             Delete
// //                                         </button>
// //                                     </td>
// //                                 </tr>
// //                             ))}
// //                         </tbody>
// //                     </table>
// //                 </div>
// //             )}

// //             {/* Modal for Add Student */}
// //             {showAddModal && (
// //                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
// //                     <div className="bg-white rounded-lg shadow-lg max-w-lg w-full relative animate-fadeIn">
// //                         <button
// //                             className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
// //                             onClick={handleCloseModal}
// //                             aria-label="Close add student modal"
// //                         >
// //                             &times;
// //                         </button>
// //                         <AddStudentScreen />
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default StudentListScreen;





// import React, { useState } from 'react';
// import { Users, BookOpen, CheckSquare, ChevronDown, ChevronRight, Home, BarChart3, Settings, LogOut, Bell, Search, Plus, Filter, Download, Edit, Trash2, Eye, Calendar, Clock, TrendingUp, UserCheck, UserX, Award, GraduationCap } from 'lucide-react';

// export default function SchoolAdminPortal() {
//   const [activePage, setActivePage] = useState('dashboard');
//   const [expandedMenu, setExpandedMenu] = useState<string | null>('students');
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   const students = [
//     { id: 1, name: 'Aarav Sharma', class: '10-A', roll: '001', attendance: '95%', status: 'Active' },
//     { id: 2, name: 'Priya Patel', class: '10-A', roll: '002', attendance: '92%', status: 'Active' },
//     { id: 3, name: 'Rohan Kumar', class: '10-B', roll: '003', attendance: '88%', status: 'Active' },
//     { id: 4, name: 'Ananya Singh', class: '9-A', roll: '004', attendance: '97%', status: 'Active' }
//   ];

//   const classes = [
//     { id: 1, name: 'Class 10-A', students: 45, teacher: 'Mrs. Gupta', subjects: 8 },
//     { id: 2, name: 'Class 10-B', students: 42, teacher: 'Mr. Verma', subjects: 8 },
//     { id: 3, name: 'Class 9-A', students: 48, teacher: 'Mrs. Reddy', subjects: 8 },
//     { id: 4, name: 'Class 9-B', students: 44, teacher: 'Mr. Khan', subjects: 8 }
//   ];

//   const attendanceData = [
//     { id: 1, student: 'Aarav Sharma', class: '10-A', status: 'Present', time: '08:45 AM' },
//     { id: 2, student: 'Priya Patel', class: '10-A', status: 'Present', time: '08:50 AM' },
//     { id: 3, student: 'Rohan Kumar', class: '10-B', status: 'Absent', time: '-' },
//     { id: 4, student: 'Ananya Singh', class: '9-A', status: 'Late', time: '09:15 AM' }
//   ];

//   const menuItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: Home, hasSubmenu: false },
//     {
//       id: 'students',
//       label: 'Student Management',
//       icon: Users,
//       hasSubmenu: true,
//       submenu: [
//         { id: 'all-students', label: 'All Students' },
//         { id: 'add-student', label: 'Add New Student' },
//         { id: 'student-reports', label: 'Student Reports' },
//         { id: 'promotions', label: 'Promotions' }
//       ]
//     },
//     {
//       id: 'classes',
//       label: 'Classes',
//       icon: BookOpen,
//       hasSubmenu: true,
//       submenu: [
//         { id: 'all-classes', label: 'All Classes' },
//         { id: 'class-schedule', label: 'Class Schedule' },
//         { id: 'class-subjects', label: 'Subjects' },
//         { id: 'class-sections', label: 'Sections' }
//       ]
//     },
//     {
//       id: 'attendance',
//       label: 'Attendance',
//       icon: CheckSquare,
//       hasSubmenu: true,
//       submenu: [
//         { id: 'mark-attendance', label: 'Mark Attendance' },
//         { id: 'attendance-reports', label: 'Attendance Reports' },
//         { id: 'attendance-summary', label: 'Summary' },
//         { id: 'absentee-list', label: 'Absentee List' }
//       ]
//     },
//     { id: 'analytics', label: 'Analytics', icon: BarChart3, hasSubmenu: false },
//     { id: 'settings', label: 'Settings', icon: Settings, hasSubmenu: false }
//   ];

//   const toggleMenu = (menuId: string) => {
//     setExpandedMenu(expandedMenu === menuId ? null : menuId);
//   };

//   const renderContent = () => {
//     switch(activePage) {
//       case 'dashboard':
//         return <DashboardScreen />;
//       case 'all-students':
//         return <AllStudentsScreen students={students} />;
//       case 'add-student':
//         return <AddStudentScreen />;
//       case 'student-reports':
//         return <StudentReportsScreen />;
//       case 'promotions':
//         return <PromotionsScreen />;
//       case 'all-classes':
//         return <AllClassesScreen classes={classes} />;
//       case 'class-schedule':
//         return <ClassScheduleScreen />;
//       case 'class-subjects':
//         return <SubjectsScreen />;
//       case 'class-sections':
//         return <SectionsScreen />;
//       case 'mark-attendance':
//         return <MarkAttendanceScreen />;
//       case 'attendance-reports':
//         return <AttendanceReportsScreen />;
//       case 'attendance-summary':
//         return <AttendanceSummaryScreen />;
//       case 'absentee-list':
//         return <AbsenteeListScreen attendanceData={attendanceData} />;
//       case 'analytics':
//         return <AnalyticsScreen />;
//       case 'settings':
//         return <SettingsScreen />;
//       default:
//         return <DashboardScreen />;
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-gradient-to-b from-indigo-900 to-indigo-800 text-white transition-all duration-300 flex flex-col shadow-xl`}>
//         <div className="p-4 border-b border-indigo-700">
//           <div className="flex items-center justify-between">
//             {!sidebarCollapsed && (
//               <div>
//                 <h1 className="text-xl font-bold">SchoolAdmin</h1>
//                 <p className="text-xs text-indigo-300">Management Portal</p>
//               </div>
//             )}
//             <button
//               onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
//               className="p-2 hover:bg-indigo-700 rounded-lg transition-colors"
//             >
//               {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronDown size={20} />}
//             </button>
//           </div>
//         </div>

//         <nav className="flex-1 overflow-y-auto py-4 px-2">
//           {menuItems.map((item) => {
//             const Icon = item.icon;
//             const isExpanded = expandedMenu === item.id;
//             const isActive = activePage === item.id || item.submenu?.some(sub => sub.id === activePage);

//             return (
//               <div key={item.id} className="mb-1">
//                 <button
//                   onClick={() => {
//                     if (item.hasSubmenu) {
//                       toggleMenu(item.id);
//                     } else {
//                       setActivePage(item.id);
//                     }
//                   }}
//                   className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${
//                     isActive ? 'bg-indigo-700 text-white shadow-md' : 'text-indigo-100 hover:bg-indigo-700/50'
//                   }`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <Icon size={20} />
//                     {!sidebarCollapsed && <span className="font-medium text-sm">{item.label}</span>}
//                   </div>
//                   {!sidebarCollapsed && item.hasSubmenu && (
//                     <ChevronDown size={16} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
//                   )}
//                 </button>

//                 {!sidebarCollapsed && item.hasSubmenu && isExpanded && (
//                   <div className="mt-1 ml-4 space-y-1">
//                     {item.submenu?.map((subItem) => (
//                       <button
//                         key={subItem.id}
//                         onClick={() => setActivePage(subItem.id)}
//                         className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
//                           activePage === subItem.id ? 'bg-indigo-600 text-white font-medium' : 'text-indigo-200 hover:bg-indigo-700/50 hover:text-white'
//                         }`}
//                       >
//                         {subItem.label}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </nav>

//         <div className="p-4 border-t border-indigo-700">
//           <button className="w-full flex items-center gap-3 px-3 py-2.5 text-indigo-100 hover:bg-indigo-700 rounded-lg transition-colors">
//             <LogOut size={20} />
//             {!sidebarCollapsed && <span className="font-medium text-sm">Logout</span>}
//           </button>
//         </div>
//       </aside>

//       <div className="flex-1 flex flex-col overflow-hidden">
//         <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4 flex-1">
//               <div className="relative flex-1 max-w-md">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                 <input
//                   type="text"
//                   placeholder="Search students, classes..."
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//             </div>
//             <div className="flex items-center gap-4">
//               <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
//                 <Bell size={20} />
//                 <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//               </button>
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
//                   AD
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-gray-800">Admin User</p>
//                   <p className="text-xs text-gray-500">Administrator</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         <main className="flex-1 overflow-y-auto p-6">
//           {renderContent()}
//         </main>
//       </div>
//     </div>
//   );
// }

// function DashboardScreen() {
//   return (
//     <div className="max-w-7xl mx-auto">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//         <StatCard icon={Users} label="Total Students" value="1,248" change="+5.2%" color="blue" />
//         <StatCard icon={BookOpen} label="Total Classes" value="32" change="+2" color="green" />
//         <StatCard icon={UserCheck} label="Present Today" value="1,156" change="92.6%" color="emerald" />
//         <StatCard icon={Award} label="Average Grade" value="85.4%" change="+2.1%" color="purple" />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
//           <div className="space-y-4">
//             <ActivityItem text="New student Aarav Sharma enrolled in Class 10-A" time="2 hours ago" />
//             <ActivityItem text="Attendance marked for Class 9-B" time="3 hours ago" />
//             <ActivityItem text="Exam schedule updated for Grade 10" time="5 hours ago" />
//             <ActivityItem text="Parent meeting scheduled for next week" time="1 day ago" />
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Events</h3>
//           <div className="space-y-4">
//             <EventItem title="Annual Sports Day" date="Jan 28, 2026" color="blue" />
//             <EventItem title="Parent-Teacher Meeting" date="Feb 2, 2026" color="green" />
//             <EventItem title="Mid-Term Examinations" date="Feb 10, 2026" color="red" />
//             <EventItem title="Science Fair" date="Feb 15, 2026" color="purple" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// type Student = {
//   id: number;
//   name: string;
//   class: string;
//   roll: string;
//   attendance: string;
//   status: string;
// };

// function AllStudentsScreen({ students }: { students: Student[] }) {
//   return (
//     <div className="max-w-7xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">All Students</h2>
//         <div className="flex gap-3">
//           <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//             <Filter size={18} />
//             Filter
//           </button>
//           <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//             <Download size={18} />
//             Export
//           </button>
//           <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
//             <Plus size={18} />
//             Add Student
//           </button>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50 border-b border-gray-200">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Roll No</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {students.map((student) => (
//               <tr key={student.id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.name}</td>
//                 <td className="px-6 py-4 text-sm text-gray-600">{student.class}</td>
//                 <td className="px-6 py-4 text-sm text-gray-600">{student.roll}</td>
//                 <td className="px-6 py-4 text-sm text-gray-600">{student.attendance}</td>
//                 <td className="px-6 py-4">
//                   <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
//                     {student.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 text-sm">
//                   <div className="flex gap-2">
//                     <button className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Eye size={16} /></button>
//                     <button className="p-1 text-green-600 hover:bg-green-50 rounded"><Edit size={16} /></button>
//                     <button className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// function AddStudentScreen() {
//   return (
//     <div className="max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Student</h2>
      
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//         <form className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <FormField label="First Name" placeholder="Enter first name" />
//             <FormField label="Last Name" placeholder="Enter last name" />
//             <FormField label="Date of Birth" type="date" />
//             <FormField label="Gender" type="select" options={['Male', 'Female', 'Other']} />
//             <FormField label="Class" type="select" options={['10-A', '10-B', '9-A', '9-B']} />
//             <FormField label="Roll Number" placeholder="Enter roll number" />
//             <FormField label="Email" type="email" placeholder="student@example.com" />
//             <FormField label="Phone" placeholder="+91 1234567890" />
//           </div>

//           <div className="border-t pt-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Parent Information</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <FormField label="Father's Name" placeholder="Enter father's name" />
//               <FormField label="Mother's Name" placeholder="Enter mother's name" />
//               <FormField label="Parent Email" type="email" placeholder="parent@example.com" />
//               <FormField label="Parent Phone" placeholder="+91 1234567890" />
//             </div>
//           </div>

//           <FormField label="Address" type="textarea" placeholder="Enter full address" />

//           <div className="flex justify-end gap-3 pt-4">
//             <button type="button" className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//               Cancel
//             </button>
//             <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
//               Add Student
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// function StudentReportsScreen() {
//   return (
//     <div className="max-w-7xl mx-auto">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Reports</h2>
      
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//         <ReportCard title="Academic Performance" description="View detailed academic reports" icon={GraduationCap} />
//         <ReportCard title="Attendance Report" description="Monthly attendance statistics" icon={Calendar} />
//         <ReportCard title="Behavior Report" description="Student conduct analysis" icon={Award} />
//       </div>

//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//         <div className="flex gap-4 mb-6">
//           <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
//             <option>Select Class</option>
//             <option>Class 10-A</option>
//             <option>Class 10-B</option>
//             <option>Class 9-A</option>
//           </select>
//           <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
//             <option>Select Report Type</option>
//             <option>Academic</option>
//             <option>Attendance</option>
//             <option>Behavior</option>
//           </select>
//           <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
//             Generate Report
//           </button>
//         </div>
//         <p className="text-gray-500 text-center py-8">Select filters and click generate to view reports</p>
//       </div>
//     </div>
//   );
// }

// function PromotionsScreen() {
//   return (
//     <div className="max-w-7xl mx-auto">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Promotions</h2>
      
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
//         <h3 className="text-lg font-semibold text-gray-800 mb-4">Promotion Settings</h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <select className="px-4 py-2 border border-gray-300 rounded-lg">
//             <option>From Class</option>
//             <option>Class 9-A</option>
//             <option>Class 9-B</option>
//           </select>
//           <select className="px-4 py-2 border border-gray-300 rounded-lg">
//             <option>To Class</option>
//             <option>Class 10-A</option>
//             <option>Class 10-B</option>
//           </select>
//           <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
//             Process Promotion
//           </button>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//         <h3 className="text-lg font-semibold text-gray-800 mb-4">Eligible Students</h3>
//         <p className="text-gray-500 text-center py-8">Select classes to view eligible students for promotion</p>
//       </div>
//     </div>
//   );
// }

// type ClassType = {
//   id: number;
//   name: string;
//   students: number;
//   teacher: string;
//   subjects: number;
// };

// function AllClassesScreen({ classes }: { classes: ClassType[] }) {
//   return (
//     <div className="max-w-7xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">All Classes</h2>
//         <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
//           <Plus size={18} />
//           Add Class
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {classes.map((cls: ClassType) => (
//           <div key={cls.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
//             <div className="flex justify-between items-start mb-4">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">{cls.name}</h3>
//                 <p className="text-sm text-gray-600">Class Teacher: {cls.teacher}</p>
//               </div>
//               <BookOpen className="text-indigo-600" size={24} />
//             </div>
//             <div className="space-y-2">
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-600">Students:</span>
//                 <span className="font-medium">{cls.students}</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-600">Subjects:</span>
//                 <span className="font-medium">{cls.subjects}</span>
//               </div>
//             </div>
//             <button className="w-full mt-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50">
//               View Details
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function ClassScheduleScreen() {
//   const schedule = [
//     { time: '08:00 - 09:00', mon: 'Math', tue: 'English', wed: 'Science', thu: 'History', fri: 'PE' },
//     { time: '09:00 - 10:00', mon: 'English', tue: 'Math', wed: 'History', thu: 'Science', fri: 'Art' },
//     { time: '10:00 - 11:00', mon: 'Science', tue: 'History', wed: 'Math', thu: 'English', fri: 'Music' },
//     { time: '11:00 - 12:00', mon: 'History', tue: 'Science', wed: 'English', thu: 'Math', fri: 'Computer' }
//   ];

//   return (
//     <div className="max-w-7xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Class Schedule</h2>
//         <select className="px-4 py-2 border border-gray-300 rounded-lg">
//           <option>Class 10-A</option>
//           <option>Class 10-B</option>
//           <option>Class 9-A</option>
//         </select>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50 border-b border-gray-200">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monday</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tuesday</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Wednesday</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thursday</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Friday</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {schedule.map((slot, idx) => (
//               <tr key={idx}>
//                 <td className="px-6 py-4 text-sm font-medium text-gray-900">{slot.time}</td>
//                 <td className="px-6 py-4"><span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm">{slot.mon}</span></td>
//                 <td className="px-6 py-4"><span className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm">{slot.tue}</span></td>
//                 <td className="px-6 py-4"><span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-lg text-sm">{slot.wed}</span></td>
//                 <td className="px-6 py-4"><span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-lg text-sm">{slot.thu}</span></td>
//                 <td className="px-6 py-4"><span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-lg text-sm">{slot.fri}</span></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// function SubjectsScreen() {
//   const subjects = [
//     { id: 1, name: 'Mathematics', code: 'MATH101', teacher: 'Mrs. Gupta', classes: 5 },
//     { id: 2, name: 'English', code: 'ENG101', teacher: 'Mr. Sharma', classes: 6 },
//     { id: 3, name: 'Science', code: 'SCI101', teacher: 'Mrs. Reddy', classes: 5 },
//     { id: 4, name: 'History', code: 'HIST101', teacher: 'Mr. Khan', classes: 4 }
//   ];

//   return (
//     <div className="max-w-7xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Subjects</h2>
//         <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
//           <Plus size={18} />
//           Add Subject
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50 border-b border-gray-200">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teacher</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Classes</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {subjects.map((subject) => (
//               <tr key={subject.id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 text-sm font-medium text-gray-900">{subject.name}</td>
//                 <td className="px-6 py-4 text-sm text-gray-600">{subject.code}</td>
//                 <td className="px-6 py-4 text-sm text-gray-600">{subject.teacher}</td>
//                 <td className="px-6 py-4 text-sm text-gray-600">{subject.classes}</td>
//                 <td className="px-6 py-4 text-sm">
//                   <div className="flex gap-2">
//                     <button className="p-1 text-green-600 hover:bg-green-50 rounded"><Edit size={16} /></button>
//                     <button className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// function SectionsScreen() {
//   return (
//     <div className="max-w-7xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Class Sections</h2>
//         <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
//           <Plus size={18} />
//           Add Section
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <SectionCard name="Section A" students={45} capacity={50} />
//         <SectionCard name="Section B" students={42} capacity={50} />
//         <SectionCard name="Section C" students={38} capacity={50} />
//         <SectionCard name="Section D" students={47} capacity={50} />
//       </div>
//     </div>
//   );
// }

// function MarkAttendanceScreen() {
//   const [attendance, setAttendance] = useState<Record<number, string>>({});

//   const students = [
//     { id: 1, name: 'Aarav Sharma', roll: '001' },
//     { id: 2, name: 'Priya Patel', roll: '002' },
//     { id: 3, name: 'Rohan Kumar', roll: '003' },
//     { id: 4, name: 'Ananya Singh', roll: '004' }
//   ];

//   const markAttendance = (id: number, status: string) => {
//     setAttendance({...attendance, [id]: status});
//   };

//   return (
//     <div className="max-w-7xl mx-auto">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Mark Attendance</h2>
      
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <select className="px-4 py-2 border border-gray-300 rounded-lg">
//             <option>Select Class</option>
//             <option>Class 10-A</option>
//             <option>Class 10-B</option>
//           </select>
//           <input type="date" className="px-4 py-2 border border-gray-300 rounded-lg" />
//           <select className="px-4 py-2 border border-gray-300 rounded-lg">
//             <option>Select Subject</option>
//             <option>Mathematics</option>
//             <option>English</option>
//           </select>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50 border-b border-gray-200">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Roll No</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance Status</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {students.map((student) => (
//               <tr key={student.id}>
//                 <td className="px-6 py-4 text-sm text-gray-900">{student.roll}</td>
//                 <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.name}</td>
//                 <td className="px-6 py-4">
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => markAttendance(student.id, 'present')}
//                       className={`px-4 py-2 rounded-lg ${attendance[student.id] === 'present' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
//                     >
//                       Present
//                     </button>
//                     <button
//                       onClick={() => markAttendance(student.id, 'absent')}
//                       className={`px-4 py-2 rounded-lg ${attendance[student.id] === 'absent' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
//                     >
//                       Absent
//                     </button>
//                     <button
//                       onClick={() => markAttendance(student.id, 'late')}
//                       className={`px-4 py-2 rounded-lg ${attendance[student.id] === 'late' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
//                     >
//                       Late
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="p-6 border-t flex justify-end">
//           <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
//             Submit Attendance
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function AttendanceReportsScreen() {
//   return (
//     <div className="max-w-7xl mx-auto">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Attendance Reports</h2>
      
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <select className="px-4 py-2 border border-gray-300 rounded-lg">
//             <option>Select Class</option>
//             <option>Class 10-A</option>
//             <option>Class 10-B</option>
//           </select>
//           <input type="date" className="px-4 py-2 border border-gray-300 rounded-lg" placeholder="From Date" />
//           <input type="date" className="px-4 py-2 border border-gray-300 rounded-lg" placeholder="To Date" />
//           <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
//             Generate Report
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <StatCard icon={UserCheck} label="Total Present" value="1,156" color="green" />
//         <StatCard icon={UserX} label="Total Absent" value="92" color="red" />
//         <StatCard icon={Clock} label="Average Rate" value="92.6%" color="blue" />
//       </div>
//     </div>
//   );
// }

// function AttendanceSummaryScreen() {
//   return (
//     <div className="max-w-7xl mx-auto">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Attendance Summary</h2>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">Class-wise Attendance</h3>
//           <div className="space-y-3">
//             <AttendanceBar classValue="10-A" percentage={95} />
//             <AttendanceBar classValue="10-B" percentage={92} />
//             <AttendanceBar classValue="9-A" percentage={88} />
//             <AttendanceBar classValue="9-B" percentage={90} />
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Trends</h3>
//           <div className="h-64 flex items-center justify-center text-gray-500">
//             Chart visualization would go here
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// type AttendanceRecord = {
//   id: number;
//   student: string;
//   class: string;
//   status: string;
//   time: string;
// };

// function AbsenteeListScreen({ attendanceData }: { attendanceData: AttendanceRecord[] }) {
//   const absentees = attendanceData.filter((a) => a.status === 'Absent');
  
//   return (
//     <div className="max-w-7xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Absentee List</h2>
//         <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//           <Download size={18} />
//           Export List
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50 border-b border-gray-200">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {absentees.map((record: AttendanceRecord) => (
//               <tr key={record.id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 text-sm font-medium text-gray-900">{record.student}</td>
//                 <td className="px-6 py-4 text-sm text-gray-600">{record.class}</td>
//                 <td className="px-6 py-4">
//                   <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
//                     {record.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4">
//                   <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
//                     Notify Parent
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// function AnalyticsScreen() {
//   return (
//     <div className="max-w-7xl mx-auto">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Analytics Dashboard</h2>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//         <StatCard icon={TrendingUp} label="Growth Rate" value="+12.5%" color="green" />
//         <StatCard icon={Users} label="Enrollment" value="1,248" color="blue" />
//         <StatCard icon={Award} label="Top Performers" value="156" color="purple" />
//         <StatCard icon={BookOpen} label="Active Classes" value="32" color="orange" />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Overview</h3>
//           <div className="h-64 flex items-center justify-center text-gray-500">
//             Performance chart visualization
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">Attendance Trends</h3>
//           <div className="h-64 flex items-center justify-center text-gray-500">
//             Attendance trend chart
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function SettingsScreen() {
//   return (
//     <div className="max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">System Settings</h2>
      
//       <div className="space-y-6">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">General Settings</h3>
//           <div className="space-y-4">
//             <FormField label="School Name" placeholder="Enter school name" value="ABC International School" />
//             <FormField label="Email" type="email" placeholder="school@example.com" value="admin@abcschool.com" />
//             <FormField label="Phone" placeholder="+91 1234567890" value="+91 9876543210" />
//             <FormField label="Address" type="textarea" placeholder="Enter school address" />
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">Academic Year Settings</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <FormField label="Academic Year" value="2025-2026" />
//             <FormField label="Current Term" type="select" options={['Term 1', 'Term 2', 'Term 3']} />
//           </div>
//         </div>

//         <div className="flex justify-end">
//           <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
//             Save Settings
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// type StatCardColor = 'blue' | 'green' | 'emerald' | 'purple' | 'red' | 'orange';

// function StatCard({
//   icon: Icon,
//   label,
//   value,
//   change,
//   color,
// }: {
//   icon: React.ComponentType<{ size?: number }>;
//   label: string;
//   value: string;
//   change?: string;
//   color: StatCardColor;
// }) {
//   const colors: Record<StatCardColor, string> = {
//     blue: 'bg-blue-100 text-blue-600',
//     green: 'bg-green-100 text-green-600',
//     emerald: 'bg-emerald-100 text-emerald-600',
//     purple: 'bg-purple-100 text-purple-600',
//     red: 'bg-red-100 text-red-600',
//     orange: 'bg-orange-100 text-orange-600',
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm text-gray-600 mb-1">{label}</p>
//           <p className="text-2xl font-bold text-gray-800">{value}</p>
//           {change && <p className="text-sm text-green-600 mt-1">{change}</p>}
//         </div>
//         <div className={`p-3 rounded-lg ${colors[color]}`}>
//           <Icon size={24} />
//         </div>
//       </div>
//     </div>
//   );
// }

// function ActivityItem({ text, time }: { text: string; time: string }) {
//   return (
//     <div className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
//       <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
//       <div className="flex-1">
//         <p className="text-sm text-gray-800">{text}</p>
//         <p className="text-xs text-gray-500 mt-1">{time}</p>
//       </div>
//     </div>
//   );
// }

// type EventItemProps = {
//   title: string;
//   date: string;
//   color: 'blue' | 'green' | 'red' | 'purple';
// };

// function EventItem({ title, date, color }: EventItemProps) {
//   const colors = {
//     blue: 'bg-blue-100 text-blue-800',
//     green: 'bg-green-100 text-green-800',
//     red: 'bg-red-100 text-red-800',
//     purple: 'bg-purple-100 text-purple-800'
//   };

//   return (
//     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//       <Calendar className="text-gray-600" size={20} />
//       <div className="flex-1">
//         <p className="text-sm font-medium text-gray-800">{title}</p>
//         <p className="text-xs text-gray-500">{date}</p>
//       </div>
//       <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[color]}`}>
//         Upcoming
//       </span>
//     </div>
//   );
// }

// type FormFieldProps = {
//   label: string;
//   type?: string;
//   placeholder?: string;
//   options?: string[];
//   value?: string;
// };

// function FormField({ label, type = 'text', placeholder, options, value }: FormFieldProps) {
//   if (type === 'textarea') {
//     return (
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
//         <textarea
//           placeholder={placeholder}
//           defaultValue={value}
//           rows={3}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         />
//       </div>
//     );
//   }

//   if (type === 'select') {
//     return (
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
//         <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
//           <option>Select {label}</option>
//           {options?.map((opt, idx) => (
//             <option key={idx}>{opt}</option>
//           ))}
//         </select>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
//       <input
//         type={type}
//         placeholder={placeholder}
//         defaultValue={value}
//         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//       />
//     </div>
//   );
// }

// type ReportCardProps = {
//   title: string;
//   description: string;
//   icon: React.ComponentType<{ className?: string; size?: number }>;
// };

// function ReportCard({ title, description, icon: Icon }: ReportCardProps) {
//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
//       <Icon className="text-indigo-600 mb-3" size={32} />
//       <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
//       <p className="text-sm text-gray-600">{description}</p>
//     </div>
//   );
// }

// function SectionCard({ name, students, capacity }: { name: string; students: number; capacity: number }) {
//   const percentage = (students / capacity) * 100;
  
//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//       <h3 className="text-lg font-semibold text-gray-800 mb-4">{name}</h3>
//       <div className="space-y-3">
//         <div className="flex justify-between text-sm">
//           <span className="text-gray-600">Students:</span>
//           <span className="font-medium">{students}/{capacity}</span>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-2">
//           <div
//             className="bg-indigo-600 h-2 rounded-full"
//             style={{ width: `${percentage}%` }}
//           ></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function AttendanceBar({ classValue, percentage }: { classValue: string; percentage: number }) {
//   return (
//     <div>
//       <div className="flex justify-between text-sm mb-1">
//         <span className="text-gray-700">Class {classValue}</span>
//         <span className="font-medium text-gray-900">{percentage}%</span>
//       </div>
//       <div className="w-full bg-gray-200 rounded-full h-3">
//         <div
//           className="bg-green-600 h-3 rounded-full transition-all"
//           style={{ width: `${percentage}%` }}
//         ></div>
//       </div>
//     </div>
//   );
// }




import React, { useState } from 'react';
import { Users, BookOpen, Calendar, DollarSign, FileText, BarChart3, Settings, LogOut, Menu, X, Search, Plus, Edit2, Trash2, Eye, Download, Filter, Bell, Home, UserPlus, GraduationCap, TrendingUp, ChevronDown } from 'lucide-react';

const SchoolAdminPanel = () => {
  const [currentScreen, setCurrentScreen] = useState('students');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const itemsPerPage = 6;

  const [students] = useState([
    { 
      id: 'STU-2024-001', 
      name: 'Michael Johnson', 
      email: 'michael.j@email.com',
      grade: 'Grade 5-A', 
      class: '5-A',
      parent: 'Robert Johnson',
      contact: '+1 234-567-8901',
      status: 'Active',
      avatar: 'MJ',
      color: 'bg-blue-500'
    },
    { 
      id: 'STU-2024-002', 
      name: 'Emily Davis', 
      email: 'emily.d@email.com',
      grade: 'Grade 4-B', 
      class: '4-B',
      parent: 'Sarah Davis',
      contact: '+1 234-567-8902',
      status: 'Active',
      avatar: 'ED',
      color: 'bg-purple-500'
    },
    { 
      id: 'STU-2024-003', 
      name: 'James Wilson', 
      email: 'james.w@email.com',
      grade: 'Grade 5-B', 
      class: '5-B',
      parent: 'Jennifer Wilson',
      contact: '+1 234-567-8903',
      status: 'Active',
      avatar: 'JW',
      color: 'bg-green-500'
    },
    { 
      id: 'STU-2024-004', 
      name: 'Sophia Martinez', 
      email: 'sophia.m@email.com',
      grade: 'Grade 3-A', 
      class: '3-A',
      parent: 'Carlos Martinez',
      contact: '+1 234-567-8904',
      status: 'Active',
      avatar: 'SM',
      color: 'bg-pink-500'
    },
    { 
      id: 'STU-2024-005', 
      name: 'Daniel Brown', 
      email: 'daniel.b@email.com',
      grade: 'Grade 4-A', 
      class: '4-A',
      parent: 'Lisa Brown',
      contact: '+1 234-567-8905',
      status: 'Pending',
      avatar: 'DB',
      color: 'bg-orange-500'
    },
    { 
      id: 'STU-2024-006', 
      name: 'Olivia Taylor', 
      email: 'olivia.t@email.com',
      grade: 'Grade 5-A', 
      class: '5-A',
      parent: 'Patricia Taylor',
      contact: '+1 234-567-8906',
      status: 'Active',
      avatar: 'OT',
      color: 'bg-indigo-500'
    },
    { 
      id: 'STU-2024-001', 
      name: 'Michael Johnson', 
      email: 'michael.j@email.com',
      grade: 'Grade 5-A', 
      class: '5-A',
      parent: 'Robert Johnson',
      contact: '+1 234-567-8901',
      status: 'Active',
      avatar: 'MJ',
      color: 'bg-blue-500'
    },
    { 
      id: 'STU-2024-002', 
      name: 'Emily Davis', 
      email: 'emily.d@email.com',
      grade: 'Grade 4-B', 
      class: '4-B',
      parent: 'Sarah Davis',
      contact: '+1 234-567-8902',
      status: 'Active',
      avatar: 'ED',
      color: 'bg-purple-500'
    },
    { 
      id: 'STU-2024-003', 
      name: 'James Wilson', 
      email: 'james.w@email.com',
      grade: 'Grade 5-B', 
      class: '5-B',
      parent: 'Jennifer Wilson',
      contact: '+1 234-567-8903',
      status: 'Active',
      avatar: 'JW',
      color: 'bg-green-500'
    },
    { 
      id: 'STU-2024-004', 
      name: 'Sophia Martinez', 
      email: 'sophia.m@email.com',
      grade: 'Grade 3-A', 
      class: '3-A',
      parent: 'Carlos Martinez',
      contact: '+1 234-567-8904',
      status: 'Active',
      avatar: 'SM',
      color: 'bg-pink-500'
    },
    { 
      id: 'STU-2024-005', 
      name: 'Daniel Brown', 
      email: 'daniel.b@email.com',
      grade: 'Grade 4-A', 
      class: '4-A',
      parent: 'Lisa Brown',
      contact: '+1 234-567-8905',
      status: 'Pending',
      avatar: 'DB',
      color: 'bg-orange-500'
    },
    { 
      id: 'STU-2024-006', 
      name: 'Olivia Taylor', 
      email: 'olivia.t@email.com',
      grade: 'Grade 5-A', 
      class: '5-A',
      parent: 'Patricia Taylor',
      contact: '+1 234-567-8906',
      status: 'Active',
      avatar: 'OT',
      color: 'bg-indigo-500'
    },
    { 
      id: 'STU-2024-001', 
      name: 'Michael Johnson', 
      email: 'michael.j@email.com',
      grade: 'Grade 5-A', 
      class: '5-A',
      parent: 'Robert Johnson',
      contact: '+1 234-567-8901',
      status: 'Active',
      avatar: 'MJ',
      color: 'bg-blue-500'
    },
    { 
      id: 'STU-2024-002', 
      name: 'Emily Davis', 
      email: 'emily.d@email.com',
      grade: 'Grade 4-B', 
      class: '4-B',
      parent: 'Sarah Davis',
      contact: '+1 234-567-8902',
      status: 'Active',
      avatar: 'ED',
      color: 'bg-purple-500'
    },
    { 
      id: 'STU-2024-003', 
      name: 'James Wilson', 
      email: 'james.w@email.com',
      grade: 'Grade 5-B', 
      class: '5-B',
      parent: 'Jennifer Wilson',
      contact: '+1 234-567-8903',
      status: 'Active',
      avatar: 'JW',
      color: 'bg-green-500'
    },
    { 
      id: 'STU-2024-004', 
      name: 'Sophia Martinez', 
      email: 'sophia.m@email.com',
      grade: 'Grade 3-A', 
      class: '3-A',
      parent: 'Carlos Martinez',
      contact: '+1 234-567-8904',
      status: 'Active',
      avatar: 'SM',
      color: 'bg-pink-500'
    },
    { 
      id: 'STU-2024-005', 
      name: 'Daniel Brown', 
      email: 'daniel.b@email.com',
      grade: 'Grade 4-A', 
      class: '4-A',
      parent: 'Lisa Brown',
      contact: '+1 234-567-8905',
      status: 'Pending',
      avatar: 'DB',
      color: 'bg-orange-500'
    },
    { 
      id: 'STU-2024-006', 
      name: 'Olivia Taylor', 
      email: 'olivia.t@email.com',
      grade: 'Grade 5-A', 
      class: '5-A',
      parent: 'Patricia Taylor',
      contact: '+1 234-567-8906',
      status: 'Active',
      avatar: 'OT',
      color: 'bg-indigo-500'
    },
  ]);

  const totalPages = Math.ceil(students.length / itemsPerPage);
  const paginatedStudents = students.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedStudents(paginatedStudents.map(s => s.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (id: string) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter(sid => sid !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  type StatCardProps = {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
    change?: string;
    changeLabel?: string;
    iconBg: string;
    iconColor: string;
  };

  const StatCard = ({ icon: Icon, label, value, change, changeLabel, iconBg, iconColor }: StatCardProps) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600 font-medium mb-1">{label}</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{value}</h3>
          <div className="flex items-center text-sm">
            {change && (
              <>
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600 font-medium">{change}</span>
                <span className="text-gray-500 ml-1">{changeLabel}</span>
              </>
            )}
            {!change && <span className="text-gray-500">{changeLabel}</span>}
          </div>
        </div>
        <div className={`${iconBg} p-3 rounded-lg`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );

  const StudentsScreen = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          label="Total Students"
          value="2,847"
          change="12%"
          changeLabel="from last month"
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          icon={UserPlus}
          label="Active Students"
          value="2,734"
          change="8%"
          changeLabel="from last month"
          iconBg="bg-green-50"
          iconColor="text-green-600"
        />
        <StatCard
          icon={Users}
          label="New Admissions"
          value="156"
          changeLabel="This semester"
          iconBg="bg-indigo-50"
          iconColor="text-indigo-600"
        />
        <StatCard
          icon={GraduationCap}
          label="Graduated"
          value="423"
          changeLabel="Last year"
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white">
                <option>All Classes</option>
                <option>Grade 3-A</option>
                <option>Grade 4-A</option>
                <option>Grade 4-B</option>
                <option>Grade 5-A</option>
                <option>Grade 5-B</option>
              </select>
              <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white">
                <option>All Status</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Inactive</option>
              </select>
              <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white">
                <option>Academic Year: 2024</option>
                <option>Academic Year: 2023</option>
              </select>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                More Filters
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-indigo-700 transition-colors">
                <Plus className="w-4 h-4" />
                Add Student
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">All Students</h3>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg ${viewMode === 'table' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:bg-gray-50'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:bg-gray-50'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 text-left">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300"
                      checked={selectedStudents.length === paginatedStudents.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="pb-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Student ID</th>
                  <th className="pb-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="pb-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Class</th>
                  <th className="pb-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Parent/Guardian</th>
                  <th className="pb-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                  <th className="pb-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="pb-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => handleSelectStudent(student.id)}
                      />
                    </td>
                    <td className="py-4 text-sm font-medium text-gray-900">{student.id}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className={`${student.color} w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm`}>
                          {student.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{student.name}</p>
                          <p className="text-xs text-gray-500">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-gray-700">{student.grade}</td>
                    <td className="py-4 text-sm text-gray-700">{student.parent}</td>
                    <td className="py-4 text-sm text-gray-700">{student.contact}</td>
                    <td className="py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-medium ${
                        student.status === 'Active' 
                          ? 'bg-green-50 text-green-700' 
                          : 'bg-yellow-50 text-yellow-700'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="View">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                          <Edit2 className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, students.length)} of {students.length} students
            </p>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-indigo-600 text-white'
                          : 'border border-gray-200 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      {page}
                    </button>
                  );
                }
                if (page === currentPage - 2 || page === currentPage + 2) {
                  return <span key={page} className="px-2 text-gray-400">...</span>;
                }
                return null;
              })}
              <button 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'teachers', label: 'Teachers', icon: Users },
    { id: 'classes', label: 'Classes', icon: BookOpen },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'exams', label: 'Exams', icon: FileText },
    { id: 'fees', label: 'Fees', icon: DollarSign },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
     

      <main className="flex-1 overflow-auto">
        

        <div className="p-8">
          <StudentsScreen />
        </div>
      </main>
    </div>
  );
};

export default SchoolAdminPanel;