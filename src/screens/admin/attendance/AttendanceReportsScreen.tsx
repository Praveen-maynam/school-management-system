// import React, { useState, useRef } from 'react';
// import { UserCheck, UserX, Clock, TrendingUp, ChevronDown, Download, Search, MoreVertical, Calendar } from 'lucide-react';

// const AttendanceSystem = () => {
//   const dateInputRef = React.useRef<HTMLInputElement>(null);
//   const [date, setDate] = useState('01/23/2024');
//   const [gradeFilter, setGradeFilter] = useState('All Grades');
//   const [classFilter, setClassFilter] = useState('All Classes');
//   const [statusFilter, setStatusFilter] = useState('All Status');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedStudents, setSelectedStudents] = useState<number[]>([]);

//   const stats = [
//     { label: 'Present Today', value: '847', detail: 'Out of 920 students', icon: UserCheck, bgColor: 'bg-green-50', iconColor: 'text-green-600', change: '+6.2%', changeColor: 'text-green-600' },
//     { label: 'Absent Today', value: '43', detail: '4.7% of total students', icon: UserX, bgColor: 'bg-red-50', iconColor: 'text-red-600', change: '-2.1%', changeColor: 'text-red-600' },
//     { label: 'Late Arrivals', value: '30', detail: '3.3% of present students', icon: Clock, bgColor: 'bg-yellow-50', iconColor: 'text-yellow-600', change: '+1.2%', changeColor: 'text-yellow-600' },
//     { label: 'Attendance Rate', value: '92.1%', detail: 'Monthly average', icon: TrendingUp, bgColor: 'bg-blue-50', iconColor: 'text-blue-600', change: '+0.8%', changeColor: 'text-blue-600' }
//   ];

//   const [students, setStudents] = useState([
//     { id: 1, name: 'James Anderson', email: 'james.anderson@school.edu', studentId: 'STU-2024-001', grade: 'Grade 10', class: 'Class A', status: 'Present', checkIn: '08:15 AM', notes: '-', avatar: '👨‍🎓', date: '01/23/2024' },
//     { id: 2, name: 'Emma Wilson', email: 'emma.wilson@school.edu', studentId: 'STU-2024-002', grade: 'Grade 10', class: 'Class A', status: 'Late', checkIn: '08:45 AM', notes: 'Traffic delay', avatar: '👩‍🎓', date: '01/23/2024' },
//     { id: 3, name: 'Michael Chen', email: 'michael.chen@school.edu', studentId: 'STU-2024-003', grade: 'Grade 10', class: 'Class A', status: 'Absent', checkIn: '-', notes: 'Sick leave', avatar: '👨‍💼', date: '01/23/2024' },
//     { id: 4, name: 'Sophia Martinez', email: 'sophia.martinez@school.edu', studentId: 'STU-2024-004', grade: 'Grade 10', class: 'Class B', status: 'Present', checkIn: '08:10 AM', notes: '-', avatar: '👩‍🦱', date: '01/23/2024' },
//     { id: 5, name: 'Daniel Brown', email: 'daniel.brown@school.edu', studentId: 'STU-2024-005', grade: 'Grade 10', class: 'Class B', status: 'Present', checkIn: '08:20 AM', notes: '-', avatar: '👨‍🦰', date: '01/23/2024' },
//     { id: 6, name: 'Olivia Taylor', email: 'olivia.taylor@school.edu', studentId: 'STU-2024-006', grade: 'Grade 10', class: 'Class B', status: 'Excused', checkIn: '-', notes: 'Doctor appointment', avatar: '👩‍⚕️', date: '01/23/2024' },
//     { id: 7, name: 'Liam Johnson', email: 'liam.johnson@school.edu', studentId: 'STU-2024-007', grade: 'Grade 11', class: 'Class C', status: 'Present', checkIn: '08:12 AM', notes: '-', avatar: '👨‍🔬', date: '01/24/2024' },
//     { id: 8, name: 'Ava Davis', email: 'ava.davis@school.edu', studentId: 'STU-2024-008', grade: 'Grade 11', class: 'Class C', status: 'Late', checkIn: '08:50 AM', notes: 'Bus delay', avatar: '👩‍💻', date: '01/24/2024' }
//   ]);

//   const itemsPerPage = 8;
//   // Filtering logic
//   const filteredStudents = students.filter(student => {
//     const matchesDate = student.date === date;
//     const matchesGrade = gradeFilter === 'All Grades' || student.grade === gradeFilter;
//     const matchesClass = classFilter === 'All Classes' || student.class === classFilter;
//     const matchesStatus = statusFilter === 'All Status' || student.status === statusFilter;
//     const matchesSearch =
//       student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       student.email.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesDate && matchesGrade && matchesClass && matchesStatus && matchesSearch;
//   });
//   const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
//   const displayedStudents = filteredStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.checked) {
//       setSelectedStudents(displayedStudents.map(s => s.id));
//     } else {
//       setSelectedStudents([]);
//     }
//   };

//   const toggleStudent = (id: number) => {
//     setSelectedStudents(prev => 
//       prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
//     );
//   };

//   // Actions menu state
//   const [actionsMenu, setActionsMenu] = useState<{ studentId: number | null; anchor: HTMLElement | null }>({ studentId: null, anchor: null });
//   const [viewStudent, setViewStudent] = useState<any | null>(null);

//   const getStatusBadge = (status: string) => {
//     const styles = {
//       'Present': 'bg-green-100 text-green-700',
//       'Late': 'bg-yellow-100 text-yellow-700',
//       'Absent': 'bg-red-100 text-red-700',
//       'Excused': 'bg-purple-100 text-purple-700'
//     };
//     return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-700';
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {stats.map((stat, index) => (
//             <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
//               <div className="flex items-start justify-between mb-4">
//                 <div className={`${stat.bgColor} p-3 rounded-lg`}>
//                   <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
//                 </div>
//                 <span className={`text-sm font-medium ${stat.changeColor}`}>{stat.change}</span>
//               </div>
//               <h3 className="text-sm text-gray-600 mb-1">{stat.label}</h3>
//               <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
//               <p className="text-xs text-gray-500">{stat.detail}</p>
//             </div>
//           ))}
//         </div>

//         {/* Filters Bar */}
//         <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-6">
//           <div className="flex flex-wrap items-center gap-4 mb-6">
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-gray-600">Date</span>
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                   className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <input
//                   type="date"
//                   ref={dateInputRef}
//                   style={{ position: 'absolute', right: 0, top: 0, opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
//                   onChange={e => {
//                     // Convert YYYY-MM-DD to MM/DD/YYYY
//                     const [yyyy, mm, dd] = e.target.value.split('-');
//                     setDate(`${mm}/${dd}/${yyyy}`);
//                   }}
//                   tabIndex={-1}
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 bg-transparent border-none p-0"
//                   style={{ background: 'none', border: 'none' }}
//                   onClick={() => dateInputRef.current && dateInputRef.current.showPicker && dateInputRef.current.showPicker()}
//                   aria-label="Open calendar"
//                 >
//                   <Calendar />
//                 </button>
//               </div>
//             </div>

//             <div className="flex items-center gap-2">
//               <span className="text-sm text-gray-600">Grade</span>
//               <div className="relative">
//                 <select 
//                   value={gradeFilter}
//                   onChange={(e) => setGradeFilter(e.target.value)}
//                   className="appearance-none border border-gray-200 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option>All Grades</option>
//                   <option>Grade 9</option>
//                   <option>Grade 10</option>
//                   <option>Grade 11</option>
//                   <option>Grade 12</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//               </div>
//             </div>

//             <div className="flex items-center gap-2">
//               <span className="text-sm text-gray-600">Class</span>
//               <div className="relative">
//                 <select 
//                   value={classFilter}
//                   onChange={(e) => setClassFilter(e.target.value)}
//                   className="appearance-none border border-gray-200 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option>All Classes</option>
//                   <option>Class A</option>
//                   <option>Class B</option>
//                   <option>Class C</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//               </div>
//             </div>

//             <div className="flex items-center gap-2">
//               <span className="text-sm text-gray-600">Status</span>
//               <div className="relative">
//                 <select 
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                   className="appearance-none border border-gray-200 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option>All Status</option>
//                   <option>Present</option>
//                   <option>Absent</option>
//                   <option>Late</option>
//                   <option>Excused</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//               </div>
//             </div>

//             {/* Filters are now live, so no Apply Filters button needed */}

//             <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
//               <Download className="w-4 h-4" />
//               <span>Export</span>
//             </button>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <label className="flex items-center gap-2 text-sm cursor-pointer">
//                 <input 
//                   type="checkbox" 
//                   className="w-4 h-4 rounded border-gray-300"
//                   checked={selectedStudents.length === displayedStudents.length}
//                   onChange={toggleSelectAll}
//                 />
//                 <span>Select All</span>
//               </label>
//               <button className="text-sm text-green-600 hover:text-green-700 font-medium">✓ Mark Present</button>
//               <button className="text-sm text-red-600 hover:text-red-700 font-medium">✗ Mark Absent</button>
//               <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">● Mark Late</button>
//             </div>

//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input 
//                 type="text"
//                 placeholder="Search students..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 pr-10 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
//               />
//               <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded">
//                 <MoreVertical className="w-4 h-4 text-gray-400" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Students Table */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="px-6 py-3 text-left">
//                     <input 
//                       type="checkbox" 
//                       className="w-4 h-4 rounded border-gray-300"
//                       checked={selectedStudents.length === displayedStudents.length}
//                       onChange={toggleSelectAll}
//                     />
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in Time</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {displayedStudents.map((student) => (
//                   <tr key={student.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4">
//                       <input 
//                         type="checkbox" 
//                         className="w-4 h-4 rounded border-gray-300"
//                         checked={selectedStudents.includes(student.id)}
//                         onChange={() => toggleStudent(student.id)}
//                       />
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl">
//                           {student.avatar}
//                         </div>
//                         <div>
//                           <p className="text-sm font-medium text-gray-900">{student.name}</p>
//                           <p className="text-xs text-gray-500">{student.email}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900">{student.studentId}</td>
//                     <td className="px-6 py-4 text-sm text-gray-900">{student.grade}</td>
//                     <td className="px-6 py-4 text-sm text-gray-900">{student.class}</td>
//                     <td className="px-6 py-4">
//                       <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(student.status)}`}>
//                         {student.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900">{student.checkIn}</td>
//                     <td className="px-6 py-4 text-sm text-gray-500">{student.notes}</td>
//                     <td className="px-6 py-4 relative">
//                       <button
//                         className="p-1 hover:bg-gray-100 rounded"
//                         onClick={e => {
//                           setActionsMenu({ studentId: student.id, anchor: e.currentTarget });
//                         }}
//                       >
//                         <MoreVertical className="w-4 h-4 text-gray-400" />
//                       </button>
//                       {/* Actions Dropdown */}
//                       {actionsMenu.studentId === student.id && (
//                         <div className="absolute right-0 z-20 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg animate-fade-in">
//                           <button
//                             className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
//                             onClick={() => {
//                               setViewStudent(student);
//                               setActionsMenu({ studentId: null, anchor: null });
//                             }}
//                           >
//                             View Details
//                           </button>
//                           <button
//                             className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
//                             onClick={() => {
//                               setStudents(prev => prev.filter(s => s.id !== student.id));
//                               setActionsMenu({ studentId: null, anchor: null });
//                             }}
//                           >
//                             Delete
//                           </button>
//                           {/* <button
//                             className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
//                             onClick={() => setActionsMenu({ studentId: null, anchor: null })}
//                           >
//                             Cancel
//                           </button> */}
//                         </div>
//                       )}
//                     </td>
//                         {/* View Student Modal */}
//                         {viewStudent && (
//                           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//                             <div className="bg-white rounded-lg max-w-md w-full p-8 relative">
//                               <button
//                                 className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
//                                 onClick={() => setViewStudent(null)}
//                               >
//                                 ✕
//                               </button>
//                               <h2 className="text-xl font-bold mb-4 text-gray-900">Student Details</h2>
//                               <div className="flex items-center gap-4 mb-4">
//                                 <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-3xl">{viewStudent.avatar}</div>
//                                 <div>
//                                   <p className="font-bold text-lg text-gray-900">{viewStudent.name}</p>
//                                   <p className="text-sm text-gray-500">{viewStudent.email}</p>
//                                   <p className="text-xs text-gray-400">{viewStudent.studentId}</p>
//                                 </div>
//                               </div>
//                               <div className="grid grid-cols-2 gap-4 mb-4">
//                                 <div>
//                                   <span className="block text-xs text-gray-500">Grade</span>
//                                   <span className="font-medium text-gray-900">{viewStudent.grade}</span>
//                                 </div>
//                                 <div>
//                                   <span className="block text-xs text-gray-500">Class</span>
//                                   <span className="font-medium text-gray-900">{viewStudent.class}</span>
//                                 </div>
//                                 <div>
//                                   <span className="block text-xs text-gray-500">Status</span>
//                                   <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(viewStudent.status)}`}>{viewStudent.status}</span>
//                                 </div>
//                                 <div>
//                                   <span className="block text-xs text-gray-500">Check-in</span>
//                                   <span className="font-medium text-gray-900">{viewStudent.checkIn}</span>
//                                 </div>
//                               </div>
//                               <div>
//                                 <span className="block text-xs text-gray-500 mb-1">Notes</span>
//                                 <span className="text-gray-700 text-sm">{viewStudent.notes}</span>
//                               </div>
//                             </div>
//                           </div>
//                         )}

//                         {/* Close actions menu on outside click */}
//                         {actionsMenu.studentId && (
//                           <div
//                             className="fixed inset-0 z-10"
//                             onClick={() => setActionsMenu({ studentId: null, anchor: null })}
//                           />
//                         )}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
//             <p className="text-sm text-gray-500">
//               {filteredStudents.length === 0
//                 ? 'No students found'
//                 : `Showing ${(currentPage - 1) * itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredStudents.length)} of ${filteredStudents.length} students`}
//             </p>
//             <div className="flex items-center gap-2">
//               <button 
//                 onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//                 className="p-2 hover:bg-gray-100 rounded disabled:opacity-50"
//                 disabled={currentPage === 1}
//               >
//                 <ChevronDown className="w-4 h-4 rotate-90" />
//               </button>
              
//               <button className="w-8 h-8 bg-blue-500 text-white rounded font-medium text-sm">1</button>
//               <button className="w-8 h-8 hover:bg-gray-100 rounded font-medium text-sm">2</button>
//               <button className="w-8 h-8 hover:bg-gray-100 rounded font-medium text-sm">3</button>
//               <span className="text-gray-400">...</span>
//               <button className="w-8 h-8 hover:bg-gray-100 rounded font-medium text-sm">115</button>
              
//               <button 
//                 onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
//                 className="p-2 hover:bg-gray-100 rounded disabled:opacity-50"
//                 disabled={currentPage === totalPages}
//               >
//                 <ChevronDown className="w-4 h-4 -rotate-90" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AttendanceSystem;
import React, { useState, useRef, useEffect } from 'react';
import { UserCheck, UserX, Clock, TrendingUp, ChevronDown, Download, Search, MoreVertical, Calendar, X } from 'lucide-react';

/* ─────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────── */
const T = {
  // Colors
  bg: '#f0f4f8',
  surface: '#ffffff',
  border: '#e2e8f0',
  borderLight: '#f1f5f9',

  textPrimary: '#0f172a',
  textSecondary: '#475569',
  textMuted: '#94a3b8',

  accent: '#3b82f6',
  accentHover: '#2563eb',
  accentLight: '#eff6ff',

  green: '#16a34a', greenBg: '#f0fdf4', greenLight: '#dcfce7', greenText: '#15803d',
  red: '#dc2626',   redBg: '#fef2f2',   redLight: '#fee2e2',   redText: '#b91c1c',
  yellow: '#d97706', yellowBg: '#fffbeb', yellowLight: '#fef3c7', yellowText: '#92400e',
  purple: '#7c3aed', purpleBg: '#faf5ff', purpleLight: '#ede9fe', purpleText: '#6d28d9',
  blue: '#2563eb',  blueBg: '#eff6ff',  blueLight: '#dbeafe',  blueText: '#1d4ed8',

  // Typography
  fontSans: "'Plus Jakarta Sans', 'Segoe UI', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', 'Fira Code', monospace",

  // Radii
  r4: '4px', r6: '6px', r8: '8px', r10: '10px', r12: '12px', r16: '16px', r999: '9999px',

  // Shadows
  shadowSm: '0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)',
  shadowMd: '0 4px 16px rgba(0,0,0,0.08)',
  shadowLg: '0 10px 40px rgba(0,0,0,0.12)',
};

/* ─────────────────────────────────────────────
   SHARED STYLES
───────────────────────────────────────────── */
const s = {
  card: {
    background: T.surface,
    borderRadius: T.r12,
    border: `1px solid ${T.border}`,
    boxShadow: T.shadowSm,
  },
  label: {
    fontSize: '0.72rem',
    fontWeight: 600,
    color: T.textMuted,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
  },
  inputBase: {
    border: `1px solid ${T.border}`,
    borderRadius: T.r8,
    padding: '0.45rem 0.85rem',
    fontSize: '0.875rem',
    color: T.textPrimary,
    fontFamily: T.fontSans,
    outline: 'none',
    background: T.surface,
    transition: 'border-color 0.15s, box-shadow 0.15s',
  },
  selectBase: {
    border: `1px solid ${T.border}`,
    borderRadius: T.r8,
    padding: '0.45rem 2rem 0.45rem 0.85rem',
    fontSize: '0.875rem',
    color: T.textPrimary,
    fontFamily: T.fontSans,
    outline: 'none',
    background: T.surface,
    appearance: 'none' as React.CSSProperties['appearance'],
    WebkitAppearance: 'none' as any,
    cursor: 'pointer',
    transition: 'border-color 0.15s',
  },
  badge: (color: string, bgColor: string) => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.2rem 0.65rem',
    borderRadius: T.r999,
    fontSize: '0.72rem',
    fontWeight: 600,
    letterSpacing: '0.04em',
    color,
    background: bgColor,
  }),
  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.45rem 1rem',
    borderRadius: T.r8,
    border: `1px solid ${T.border}`,
    background: T.surface,
    fontSize: '0.875rem',
    fontWeight: 500,
    color: T.textSecondary,
    cursor: 'pointer',
    fontFamily: T.fontSans,
    transition: 'all 0.15s',
  },
};

/* ─────────────────────────────────────────────
   STATUS CONFIG
───────────────────────────────────────────── */
type StatusConfig = {
  [key: string]: { color: string; bg: string };
};
const STATUS_CONFIG: StatusConfig = {
  Present: { color: T.greenText, bg: T.greenLight },
  Late:    { color: T.yellowText, bg: T.yellowLight },
  Absent:  { color: T.redText,   bg: T.redLight },
  Excused: { color: T.purpleText, bg: T.purpleLight },
};

/* ─────────────────────────────────────────────
   HOOK: RESPONSIVE BREAKPOINTS
───────────────────────────────────────────── */
function useBreakpoint() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return { isMobile: width < 640, isTablet: width < 1024, width };
}

/* ─────────────────────────────────────────────
   STAT CARD
───────────────────────────────────────────── */
interface StatCardProps {
  stat: {
    icon: React.ComponentType<{ size: number; color: string }>;
    iconBg: string;
    iconColor: string;
    change: string;
    positive: boolean;
    label: string;
    value: string;
    detail: string;
  };
  index: number;
}
function StatCard({ stat, index }: StatCardProps) {
  const Icon = stat.icon;
  return (
    <div style={{
      ...s.card,
      padding: '1.25rem',
      animation: `fadeUp 0.4s ease ${index * 0.07}s both`,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
        <div style={{
          width: 40, height: 40, borderRadius: T.r10,
          background: stat.iconBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon size={18} color={stat.iconColor} />
        </div>
        <span style={{
          fontSize: '0.75rem', fontWeight: 600,
          color: stat.positive ? T.greenText : T.redText,
          background: stat.positive ? T.greenLight : T.redLight,
          padding: '0.15rem 0.5rem', borderRadius: T.r999,
        }}>{stat.change}</span>
      </div>
      <div style={{ ...s.label, marginBottom: '0.25rem' }}>{stat.label}</div>
      <div style={{ fontSize: '1.75rem', fontWeight: 800, color: T.textPrimary, lineHeight: 1.1, marginBottom: '0.2rem' }}>{stat.value}</div>
      <div style={{ fontSize: '0.75rem', color: T.textMuted }}>{stat.detail}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SELECT WRAPPER
───────────────────────────────────────────── */
interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}
function Select({ value, onChange, children, style = {} }: SelectProps) {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <select value={value} onChange={e => onChange(e.target.value)}
        style={{ ...s.selectBase, ...style }}>
        {children}
      </select>
      <ChevronDown size={14} color={T.textMuted} style={{
        position: 'absolute', right: 8, top: '50%',
        transform: 'translateY(-50%)', pointerEvents: 'none',
      }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   STUDENT DETAIL MODAL
───────────────────────────────────────────── */
interface Student {
  id: number;
  name: string;
  email: string;
  studentId: string;
  grade: string;
  class: string;
  status: string;
  checkIn: string;
  notes: string;
  avatar: string;
  date: string;
}
interface StudentModalProps {
  student: Student | null;
  onClose: () => void;
}
function StudentModal({ student, onClose }: StudentModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!student) return null;
  const cfg = STATUS_CONFIG[student.status] || {};

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(15,23,42,0.55)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.18s ease',
      }}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          ...s.card,
          width: '100%', maxWidth: 440,
          padding: '2rem',
          position: 'relative',
          animation: 'scaleIn 0.2s ease',
          boxShadow: T.shadowLg,
        }}>
        {/* Close */}
        <button onClick={onClose} style={{
          position: 'absolute', top: 16, right: 16,
          width: 30, height: 30, borderRadius: T.r8,
          border: `1px solid ${T.border}`, background: T.surface,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: T.textMuted,
        }}>
          <X size={15} />
        </button>

        <h2 style={{ fontSize: '1rem', fontWeight: 700, color: T.textPrimary, marginBottom: '1.25rem' }}>
          Student Details
        </h2>

        {/* Avatar + name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{
            width: 56, height: 56, borderRadius: T.r12,
            background: T.bg, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '1.75rem', flexShrink: 0,
          }}>{student.avatar}</div>
          <div>
            <div style={{ fontWeight: 700, color: T.textPrimary, fontSize: '1rem' }}>{student.name}</div>
            <div style={{ fontSize: '0.8rem', color: T.textMuted, marginTop: 2 }}>{student.email}</div>
            <div style={{ fontSize: '0.72rem', color: T.textMuted, marginTop: 2, fontFamily: T.fontMono }}>{student.studentId}</div>
          </div>
        </div>

        {/* Grid details */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
          {[
            { label: 'Grade', value: student.grade },
            { label: 'Class', value: student.class },
            { label: 'Check-in', value: student.checkIn },
            { label: 'Date', value: student.date },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: T.bg, borderRadius: T.r8, padding: '0.75rem' }}>
              <div style={{ ...s.label, marginBottom: '0.3rem' }}>{label}</div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: T.textPrimary }}>{value}</div>
            </div>
          ))}
        </div>

        {/* Status */}
        <div style={{ background: T.bg, borderRadius: T.r8, padding: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ ...s.label, marginBottom: '0.4rem' }}>Status</div>
          <span style={s.badge(cfg.color, cfg.bg)}>{student.status}</span>
        </div>

        {/* Notes */}
        <div style={{ background: T.bg, borderRadius: T.r8, padding: '0.75rem' }}>
          <div style={{ ...s.label, marginBottom: '0.3rem' }}>Notes</div>
          <div style={{ fontSize: '0.875rem', color: student.notes === '-' ? T.textMuted : T.textSecondary }}>
            {student.notes === '-' ? 'No notes' : student.notes}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MOBILE STUDENT CARD
───────────────────────────────────────────── */
interface MobileStudentCardProps {
  student: Student;
  selected: boolean;
  onToggle: () => void;
  onView: () => void;
  onDelete: () => void;
}
function MobileStudentCard({ student, selected, onToggle, onView, onDelete }: MobileStudentCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const cfg = STATUS_CONFIG[student.status] || {};

  return (
    <div style={{
      ...s.card,
      padding: '1rem',
      marginBottom: '0.75rem',
      position: 'relative',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        <input type="checkbox" checked={selected} onChange={onToggle}
          style={{ marginTop: 4, width: 15, height: 15, accentColor: T.accent, cursor: 'pointer', flexShrink: 0 }} />

        <div style={{ width: 40, height: 40, borderRadius: T.r8, background: T.bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.25rem', flexShrink: 0 }}>
          {student.avatar}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.15rem' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: T.textPrimary,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {student.name}
            </div>
            <button onClick={() => setMenuOpen(v => !v)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: T.textMuted, padding: '0 0 0 8px', flexShrink: 0,
            }}>
              <MoreVertical size={16} />
            </button>
          </div>
          <div style={{ fontSize: '0.72rem', color: T.textMuted, marginBottom: '0.5rem',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {student.email}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={s.badge(cfg.color, cfg.bg)}>{student.status}</span>
            <span style={{ fontSize: '0.72rem', color: T.textMuted }}>{student.grade} · {student.class}</span>
            {student.checkIn !== '-' && (
              <span style={{ fontSize: '0.72rem', color: T.textMuted }}>🕐 {student.checkIn}</span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 10 }} onClick={() => setMenuOpen(false)} />
          <div style={{
            position: 'absolute', right: 12, top: 40, zIndex: 20,
            background: T.surface, border: `1px solid ${T.border}`,
            borderRadius: T.r8, boxShadow: T.shadowMd, minWidth: 140,
            overflow: 'hidden',
          }}>
            <button style={{ display: 'block', width: '100%', textAlign: 'left',
              padding: '0.6rem 1rem', fontSize: '0.85rem', color: T.textPrimary,
              border: 'none', background: 'none', cursor: 'pointer', fontFamily: T.fontSans }}
              onClick={() => { onView(); setMenuOpen(false); }}>
              View Details
            </button>
            <button style={{ display: 'block', width: '100%', textAlign: 'left',
              padding: '0.6rem 1rem', fontSize: '0.85rem', color: T.red,
              border: 'none', background: 'none', cursor: 'pointer', fontFamily: T.fontSans }}
              onClick={() => { onDelete(); setMenuOpen(false); }}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const AttendanceSystem = () => {
  const dateInputRef = useRef<HTMLInputElement | null>(null);
  const { isMobile, isTablet } = useBreakpoint();

  const [date, setDate] = useState('01/23/2024');
  const [gradeFilter, setGradeFilter] = useState('All Grades');
  const [classFilter, setClassFilter] = useState('All Classes');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [actionsMenu, setActionsMenu] = useState<{ studentId: number | null }>({ studentId: null });
  const [viewStudent, setViewStudent] = useState<Student | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);

  const STATS = [
    { label: 'Present Today', value: '847', detail: 'Out of 920 students', icon: UserCheck,
      iconBg: T.greenBg, iconColor: T.green, change: '+6.2%', positive: true },
    { label: 'Absent Today', value: '43', detail: '4.7% of total students', icon: UserX,
      iconBg: T.redBg, iconColor: T.red, change: '-2.1%', positive: false },
    { label: 'Late Arrivals', value: '30', detail: '3.3% of present students', icon: Clock,
      iconBg: T.yellowBg, iconColor: T.yellow, change: '+1.2%', positive: true },
    { label: 'Attendance Rate', value: '92.1%', detail: 'Monthly average', icon: TrendingUp,
      iconBg: T.blueBg, iconColor: T.blue, change: '+0.8%', positive: true },
  ];

  const [students, setStudents] = useState([
    { id: 1, name: 'James Anderson', email: 'james.anderson@school.edu', studentId: 'STU-2024-001', grade: 'Grade 10', class: 'Class A', status: 'Present', checkIn: '08:15 AM', notes: '-', avatar: '👨‍🎓', date: '01/23/2024' },
    { id: 2, name: 'Emma Wilson', email: 'emma.wilson@school.edu', studentId: 'STU-2024-002', grade: 'Grade 10', class: 'Class A', status: 'Late', checkIn: '08:45 AM', notes: 'Traffic delay', avatar: '👩‍🎓', date: '01/23/2024' },
    { id: 3, name: 'Michael Chen', email: 'michael.chen@school.edu', studentId: 'STU-2024-003', grade: 'Grade 10', class: 'Class A', status: 'Absent', checkIn: '-', notes: 'Sick leave', avatar: '👨‍💼', date: '01/23/2024' },
    { id: 4, name: 'Sophia Martinez', email: 'sophia.martinez@school.edu', studentId: 'STU-2024-004', grade: 'Grade 10', class: 'Class B', status: 'Present', checkIn: '08:10 AM', notes: '-', avatar: '👩‍🦱', date: '01/23/2024' },
    { id: 5, name: 'Daniel Brown', email: 'daniel.brown@school.edu', studentId: 'STU-2024-005', grade: 'Grade 10', class: 'Class B', status: 'Present', checkIn: '08:20 AM', notes: '-', avatar: '👨‍🦰', date: '01/23/2024' },
    { id: 6, name: 'Olivia Taylor', email: 'olivia.taylor@school.edu', studentId: 'STU-2024-006', grade: 'Grade 10', class: 'Class B', status: 'Excused', checkIn: '-', notes: 'Doctor appointment', avatar: '👩‍⚕️', date: '01/23/2024' },
    { id: 7, name: 'Liam Johnson', email: 'liam.johnson@school.edu', studentId: 'STU-2024-007', grade: 'Grade 11', class: 'Class C', status: 'Present', checkIn: '08:12 AM', notes: '-', avatar: '👨‍🔬', date: '01/24/2024' },
    { id: 8, name: 'Ava Davis', email: 'ava.davis@school.edu', studentId: 'STU-2024-008', grade: 'Grade 11', class: 'Class C', status: 'Late', checkIn: '08:50 AM', notes: 'Bus delay', avatar: '👩‍💻', date: '01/24/2024' },
  ]);

  const ITEMS_PER_PAGE = isMobile ? 5 : 8;

  const filtered = students.filter(s => {
    const matchDate = s.date === date;
    const matchGrade = gradeFilter === 'All Grades' || s.grade === gradeFilter;
    const matchClass = classFilter === 'All Classes' || s.class === classFilter;
    const matchStatus = statusFilter === 'All Status' || s.status === statusFilter;
    const q = searchTerm.toLowerCase();
    const matchSearch = s.name.toLowerCase().includes(q) || s.studentId.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
    return matchDate && matchGrade && matchClass && matchStatus && matchSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const toggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStudents(e.target.checked ? paginated.map(s => s.id) : []);
  };
  const toggleOne = (id: number) => {
    setSelectedStudents(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const markSelected = (status: string) => {
    setStudents(prev => prev.map(s =>
      selectedStudents.includes(s.id) ? { ...s, status } : s
    ));
  };

  const deleteStudent = (id: number) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    setSelectedStudents(prev => prev.filter(x => x !== id));
    setActionsMenu({ studentId: null });
  };

  // Page range
  const getPageNumbers = () => {
    const pages = [];
    const delta = isMobile ? 1 : 2;
    for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }

        .att-input:focus { border-color: ${T.accent} !important; box-shadow: 0 0 0 3px rgba(59,130,246,0.12) !important; }
        .att-select:focus { border-color: ${T.accent} !important; }
        .att-tr:hover { background: ${T.bg} !important; }
        .att-btn-icon:hover { background: ${T.bg} !important; }
        .att-pg-btn:hover:not(:disabled):not(.active) { background: ${T.bg} !important; }
        .att-action-btn:hover { background: ${T.bg} !important; }
        .att-export-btn:hover { background: ${T.bg} !important; }
        .att-action-del:hover { background: ${T.redBg} !important; }
        .att-menu-item:hover { background: ${T.bg}; }

        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: T.bg,
        fontFamily: T.fontSans,
        padding: isMobile ? '1rem' : isTablet ? '1.25rem' : '1.5rem',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* ── Page Header ── */}
          <div style={{
            display: 'flex', alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '0.75rem',
            marginBottom: '1.5rem',
          }}>
            <div>
              <h1 style={{ fontSize: isMobile ? '1.25rem' : '1.5rem', fontWeight: 800, color: T.textPrimary }}>
                Attendance Management
              </h1>
              <p style={{ fontSize: '0.85rem', color: T.textMuted, marginTop: '0.2rem' }}>
                Track and manage student attendance records
              </p>
            </div>
            <button style={{
              ...s.btn,
              background: T.accent,
              border: 'none',
              color: '#fff',
              fontWeight: 600,
              padding: '0.55rem 1.1rem',
              alignSelf: isMobile ? 'flex-start' : 'auto',
            }} className="att-export-btn">
              <Download size={15} />
              Export Report
            </button>
          </div>

          {/* ── Stats Grid ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr 1fr' : isTablet ? '1fr 1fr' : 'repeat(4, 1fr)',
            gap: isMobile ? '0.75rem' : '1rem',
            marginBottom: '1.25rem',
          }}>
            {STATS.map((stat, i) => <StatCard key={i} stat={stat} index={i} />)}
          </div>

          {/* ── Filter Bar ── */}
          <div style={{ ...s.card, padding: isMobile ? '1rem' : '1.25rem', marginBottom: '1rem', animation: 'fadeUp 0.4s ease 0.2s both' }}>

            {/* Filters row */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '0.75rem',
              alignItems: 'center', marginBottom: '1rem',
            }}>
              {/* Date */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={s.label}>Date</span>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    style={{ ...s.inputBase, width: 130, paddingRight: '2rem' }}
                    className="att-input"
                  />
                  <input
                    type="date"
                    ref={dateInputRef}
                    style={{ position: 'absolute', right: 0, top: 0, opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                    onChange={e => {
                      const [y, m, d] = e.target.value.split('-');
                      setDate(`${m}/${d}/${y}`);
                    }}
                    tabIndex={-1}
                  />
                  <button type="button" style={{
                    position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: T.textMuted,
                    display: 'flex', alignItems: 'center',
                  }} onClick={() => dateInputRef.current?.showPicker?.()}>
                    <Calendar size={14} />
                  </button>
                </div>
              </div>

              {/* Grade */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={s.label}>Grade</span>
                <Select value={gradeFilter} onChange={v => { setGradeFilter(v); setCurrentPage(1); }} >
                  {['All Grades','Grade 9','Grade 10','Grade 11','Grade 12'].map(g => <option key={g}>{g}</option>)}
                </Select>
              </div>

              {/* Class */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={s.label}>Class</span>
                <Select value={classFilter} onChange={v => { setClassFilter(v); setCurrentPage(1); }}>
                  {['All Classes','Class A','Class B','Class C'].map(c => <option key={c}>{c}</option>)}
                </Select>
              </div>

              {/* Status */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={s.label}>Status</span>
                <Select value={statusFilter} onChange={v => { setStatusFilter(v); setCurrentPage(1); }}>
                  {['All Status','Present','Absent','Late','Excused'].map(st => <option key={st}>{st}</option>)}
                </Select>
              </div>
            </div>

            {/* Actions row */}
            <div style={{
              display: 'flex',
              alignItems: isMobile ? 'flex-start' : 'center',
              justifyContent: 'space-between',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '0.75rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.85rem', color: T.textSecondary }}>
                  <input type="checkbox"
                    checked={paginated.length > 0 && selectedStudents.length === paginated.length}
                    onChange={toggleAll}
                    style={{ width: 15, height: 15, accentColor: T.accent, cursor: 'pointer' }}
                  />
                  Select All
                </label>

                {[
                  { label: '✓ Present', color: T.green, bg: T.greenLight, status: 'Present' },
                  { label: '✗ Absent',  color: T.red,   bg: T.redLight,   status: 'Absent' },
                  { label: '● Late',    color: T.yellow, bg: T.yellowLight, status: 'Late' },
                ].map(({ label, color, bg, status }) => (
                  <button key={status}
                    onClick={() => markSelected(status)}
                    disabled={selectedStudents.length === 0}
                    style={{
                      background: 'none', border: 'none', cursor: selectedStudents.length > 0 ? 'pointer' : 'not-allowed',
                      fontSize: '0.82rem', fontWeight: 600, color: selectedStudents.length > 0 ? color : T.textMuted,
                      fontFamily: T.fontSans, padding: '0.3rem 0.6rem', borderRadius: T.r6,
                      transition: 'all 0.15s',
                    }}
                    className="att-action-btn"
                  >{label}</button>
                ))}

                {selectedStudents.length > 0 && (
                  <span style={{ fontSize: '0.78rem', color: T.textMuted }}>
                    {selectedStudents.length} selected
                  </span>
                )}
              </div>

              {/* Search */}
              <div style={{ position: 'relative', width: isMobile ? '100%' : 240 }}>
                <Search size={14} color={searchFocused ? T.accent : T.textMuted}
                  style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', transition: 'color 0.15s' }} />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  style={{ ...s.inputBase, paddingLeft: '2rem', width: '100%' }}
                  className="att-input"
                />
              </div>
            </div>
          </div>

          {/* ── Table / Card View ── */}
          {isMobile ? (
            /* MOBILE: card list */
            <div style={{ animation: 'fadeUp 0.4s ease 0.25s both' }}>
              {paginated.length === 0 ? (
                <div style={{ ...s.card, padding: '2.5rem', textAlign: 'center', color: T.textMuted }}>
                  No students found
                </div>
              ) : paginated.map(student => (
                <MobileStudentCard
                  key={student.id}
                  student={student}
                  selected={selectedStudents.includes(student.id)}
                  onToggle={() => toggleOne(student.id)}
                  onView={() => setViewStudent(student)}
                  onDelete={() => deleteStudent(student.id)}
                />
              ))}
            </div>
          ) : (
            /* TABLET / DESKTOP: table */
            <div style={{ ...s.card, overflow: 'hidden', animation: 'fadeUp 0.4s ease 0.25s both' }}>
              <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
                  <thead>
                    <tr style={{ background: T.bg, borderBottom: `1px solid ${T.border}` }}>
                      <th style={{ padding: '0.75rem 1rem', textAlign: 'left', width: 40 }}>
                        <input type="checkbox"
                          checked={paginated.length > 0 && selectedStudents.length === paginated.length}
                          onChange={toggleAll}
                          style={{ width: 15, height: 15, accentColor: T.accent, cursor: 'pointer' }}
                        />
                      </th>
                      {['Student','Student ID','Grade','Class','Status','Check-in','Notes','Actions'].map(col => (
                        <th key={col} style={{ ...s.label, padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 700 }}>
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.length === 0 ? (
                      <tr>
                        <td colSpan={9} style={{ textAlign: 'center', padding: '2.5rem', color: T.textMuted, fontSize: '0.875rem' }}>
                          No students match the current filters
                        </td>
                      </tr>
                    ) : paginated.map((student) => {
                      const cfg = STATUS_CONFIG[student.status] || {};
                      return (
                        <tr key={student.id} className="att-tr" style={{ borderBottom: `1px solid ${T.borderLight}`, transition: 'background 0.12s' }}>
                          <td style={{ padding: '0.85rem 1rem' }}>
                            <input type="checkbox"
                              checked={selectedStudents.includes(student.id)}
                              onChange={() => toggleOne(student.id)}
                              style={{ width: 15, height: 15, accentColor: T.accent, cursor: 'pointer' }}
                            />
                          </td>
                          <td style={{ padding: '0.85rem 1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                              <div style={{ width: 36, height: 36, borderRadius: T.r8, background: T.bg,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.2rem', flexShrink: 0 }}>
                                {student.avatar}
                              </div>
                              <div>
                                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: T.textPrimary }}>
                                  {student.name}
                                </div>
                                <div style={{ fontSize: '0.72rem', color: T.textMuted }}>{student.email}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '0.85rem 1rem', fontSize: '0.8rem', fontFamily: T.fontMono, color: T.textSecondary }}>
                            {student.studentId}
                          </td>
                          <td style={{ padding: '0.85rem 1rem', fontSize: '0.85rem', color: T.textSecondary }}>{student.grade}</td>
                          <td style={{ padding: '0.85rem 1rem', fontSize: '0.85rem', color: T.textSecondary }}>{student.class}</td>
                          <td style={{ padding: '0.85rem 1rem' }}>
                            <span style={s.badge(cfg.color, cfg.bg)}>{student.status}</span>
                          </td>
                          <td style={{ padding: '0.85rem 1rem', fontSize: '0.85rem', color: T.textSecondary, fontFamily: T.fontMono }}>
                            {student.checkIn}
                          </td>
                          <td style={{ padding: '0.85rem 1rem', fontSize: '0.82rem', color: student.notes === '-' ? T.textMuted : T.textSecondary }}>
                            {student.notes}
                          </td>
                          <td style={{ padding: '0.85rem 1rem', position: 'relative' }}>
                            <button
                              className="att-btn-icon"
                              onClick={e => {
                                e.stopPropagation();
                                setActionsMenu(prev => prev.studentId === student.id ? { studentId: null } : { studentId: student.id });
                              }}
                              style={{ width: 30, height: 30, borderRadius: T.r6, border: `1px solid ${T.border}`,
                                background: T.surface, cursor: 'pointer', display: 'flex', alignItems: 'center',
                                justifyContent: 'center', transition: 'background 0.12s' }}>
                              <MoreVertical size={14} color={T.textMuted} />
                            </button>

                            {actionsMenu.studentId === student.id && (
                              <>
                                <div style={{ position: 'fixed', inset: 0, zIndex: 10 }}
                                  onClick={() => setActionsMenu({ studentId: null })} />
                                <div style={{
                                  position: 'absolute', right: 40, top: '50%', transform: 'translateY(-50%)',
                                  zIndex: 20, background: T.surface, border: `1px solid ${T.border}`,
                                  borderRadius: T.r8, boxShadow: T.shadowMd, minWidth: 140, overflow: 'hidden',
                                  animation: 'scaleIn 0.15s ease',
                                }}>
                                  <button className="att-menu-item" style={{
                                    display: 'block', width: '100%', textAlign: 'left',
                                    padding: '0.6rem 1rem', fontSize: '0.85rem', color: T.textPrimary,
                                    border: 'none', background: 'none', cursor: 'pointer', fontFamily: T.fontSans,
                                  }}
                                    onClick={() => { setViewStudent(student); setActionsMenu({ studentId: null }); }}>
                                    View Details
                                  </button>
                                  <button className="att-action-del att-menu-item" style={{
                                    display: 'block', width: '100%', textAlign: 'left',
                                    padding: '0.6rem 1rem', fontSize: '0.85rem', color: T.red,
                                    border: 'none', background: 'none', cursor: 'pointer', fontFamily: T.fontSans,
                                  }}
                                    onClick={() => deleteStudent(student.id)}>
                                    Delete
                                  </button>
                                </div>
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div style={{
                padding: '0.85rem 1.25rem',
                borderTop: `1px solid ${T.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '0.5rem',
              }}>
                <span style={{ fontSize: '0.82rem', color: T.textMuted }}>
                  {filtered.length === 0
                    ? 'No students found'
                    : `Showing ${(currentPage - 1) * ITEMS_PER_PAGE + 1}–${Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of ${filtered.length} students`}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  {/* Prev */}
                  <button
                    className="att-pg-btn"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    style={{ width: 32, height: 32, borderRadius: T.r6, border: `1px solid ${T.border}`,
                      background: T.surface, cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      opacity: currentPage === 1 ? 0.4 : 1, transition: 'all 0.12s' }}>
                    <ChevronDown size={14} color={T.textSecondary} style={{ transform: 'rotate(90deg)' }} />
                  </button>

                  {getPageNumbers().map(n => (
                    <button key={n}
                      className={`att-pg-btn${n === currentPage ? ' active' : ''}`}
                      onClick={() => setCurrentPage(n)}
                      style={{
                        width: 32, height: 32, borderRadius: T.r6,
                        border: n === currentPage ? 'none' : `1px solid ${T.border}`,
                        background: n === currentPage ? T.accent : T.surface,
                        color: n === currentPage ? '#fff' : T.textSecondary,
                        fontSize: '0.82rem', fontWeight: n === currentPage ? 700 : 500,
                        cursor: 'pointer', fontFamily: T.fontSans, transition: 'all 0.12s',
                      }}>
                      {n}
                    </button>
                  ))}

                  {/* Next */}
                  <button
                    className="att-pg-btn"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    style={{ width: 32, height: 32, borderRadius: T.r6, border: `1px solid ${T.border}`,
                      background: T.surface, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      opacity: currentPage === totalPages ? 0.4 : 1, transition: 'all 0.12s' }}>
                    <ChevronDown size={14} color={T.textSecondary} style={{ transform: 'rotate(-90deg)' }} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Pagination for mobile */}
          {isMobile && filtered.length > ITEMS_PER_PAGE && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '1rem' }}>
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                style={{ ...s.btn, padding: '0.4rem 0.75rem', opacity: currentPage === 1 ? 0.4 : 1 }}>
                ← Prev
              </button>
              <span style={{ fontSize: '0.82rem', color: T.textMuted }}>
                {currentPage} / {totalPages}
              </span>
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                style={{ ...s.btn, padding: '0.4rem 0.75rem', opacity: currentPage === totalPages ? 0.4 : 1 }}>
                Next →
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Modal */}
      <StudentModal student={viewStudent} onClose={() => setViewStudent(null)} />
    </>
  );
};

export default AttendanceSystem;