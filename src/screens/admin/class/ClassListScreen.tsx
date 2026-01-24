// // import React, { useState } from 'react';

// // interface SchoolClass {
// //     id: number;
// //     name: string;
// //     sectionCount: number;
// //     classTeacher: string;
// // }

// // const mockClasses: SchoolClass[] = [
// //     { id: 1, name: 'Class 1', sectionCount: 2, classTeacher: 'Mr. Smith' },
// //     { id: 2, name: 'Class 2', sectionCount: 3, classTeacher: 'Ms. Johnson' },
// //     { id: 3, name: 'Class 3', sectionCount: 1, classTeacher: 'Mrs. Lee' },
// // ];

// // const ClassListScreen: React.FC = () => {
// //     const [classes, setClasses] = useState<SchoolClass[]>(mockClasses);
// //     const [loading, setLoading] = useState(false);
// //     const [error, setError] = useState<string | null>(null);
// //     const [selectedClass, setSelectedClass] = useState<SchoolClass | null>(null);

// //     const handleDelete = (id: number) => {
// //         setLoading(true);
// //         setError(null);
// //         setTimeout(() => {
// //             setClasses((prev) => prev.filter((cls) => cls.id !== id));
// //             setLoading(false);
// //         }, 1000);
// //     };

// //     const handleView = (cls: SchoolClass) => {
// //         setSelectedClass(cls);
// //     };

// //     const handleCloseModal = () => {
// //         setSelectedClass(null);
// //     };

// //     return (
// //         <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
// //             <h2 className="text-2xl font-bold mb-4 text-gray-800">Class List</h2>
// //             {loading && <div className="mb-4 text-blue-600">Processing...</div>}
// //             {error && <div className="mb-4 text-red-600">{error}</div>}
// //             <table className="min-w-full bg-gray-50 rounded-md overflow-hidden">
// //                 <thead>
// //                     <tr>
// //                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Class Name</th>
// //                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Sections</th>
// //                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Class Teacher</th>
// //                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Actions</th>
// //                     </tr>
// //                 </thead>
// //                 <tbody>
// //                     {classes.length === 0 ? (
// //                         <tr>
// //                             <td colSpan={4} className="px-4 py-2 text-center text-gray-400">No classes found.</td>
// //                         </tr>
// //                     ) : (
// //                         classes.map((cls) => (
// //                             <tr key={cls.id}>
// //                                 <td className="px-4 py-2 text-gray-700">{cls.name}</td>
// //                                 <td className="px-4 py-2 text-gray-700">{cls.sectionCount}</td>
// //                                 <td className="px-4 py-2 text-gray-700">{cls.classTeacher}</td>
// //                                 <td className="px-4 py-2">
// //                                     <button
// //                                         className="mr-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
// //                                         onClick={() => handleView(cls)}
// //                                     >
// //                                         View
// //                                     </button>
// //                                     <button
// //                                         className="mr-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
// //                                         // onClick={() => handleEdit(cls.id)}
// //                                         disabled
// //                                     >
// //                                         Edit
// //                                     </button>
// //                                     <button
// //                                         className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
// //                                         onClick={() => handleDelete(cls.id)}
// //                                         disabled={loading}
// //                                     >
// //                                         Delete
// //                                     </button>
// //                                 </td>
// //                             </tr>
// //                         ))
// //                     )}
// //                 </tbody>
// //             </table>
// //             {/* Modal for viewing class details */}
// //             {selectedClass && (
// //                 <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
// //                     <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
// //                         <h3 className="text-xl font-bold mb-2">Class Details</h3>
// //                         <p><span className="font-semibold">Name:</span> {selectedClass.name}</p>
// //                         <p><span className="font-semibold">Sections:</span> {selectedClass.sectionCount}</p>
// //                         <p><span className="font-semibold">Class Teacher:</span> {selectedClass.classTeacher}</p>
// //                         <button
// //                             className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
// //                             onClick={handleCloseModal}
// //                         >
// //                             Close
// //                         </button>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default ClassListScreen;




// import React, { useState } from 'react';
// import { BookOpen, Users, UserCheck, TrendingUp, ChevronDown, Plus, MoreVertical, ExternalLink } from 'lucide-react';

// const Dashboard = () => {
//   const [gradeFilter, setGradeFilter] = useState('All Grades');
//   const [subjectFilter, setSubjectFilter] = useState('All Subjects');
//   const [statusFilter, setStatusFilter] = useState('All Status');

//   const stats = [
//     { label: 'Total Classes', value: '24', change: '+2%', period: 'from last term', icon: BookOpen, color: 'bg-blue-500' },
//     { label: 'Total Students', value: '486', change: '+8%', period: 'from last term', icon: Users, color: 'bg-green-500' },
//     { label: 'Total Teachers', value: '42', change: '+5%', period: 'from last term', icon: UserCheck, color: 'bg-purple-500' },
//     { label: 'Avg Attendance', value: '94.2%', change: '-2%', period: 'from last week', icon: TrendingUp, color: 'bg-orange-500', isNegative: true }
//   ];

//   const classes = [
//     {
//       subject: 'Mathematics',
//       grade: 'Grade 10-A',
//       students: 32,
//       teacher: { name: 'Mr. Robert Chen', role: 'Lead Teacher', avatar: '👨‍🏫' },
//       attendance: '96%',
//       avgScore: '85.4',
//       schedule: 'Mon, Wed, Fri',
//       color: 'bg-blue-500'
//     },
//     {
//       subject: 'Chemistry',
//       grade: 'Grade 11-B',
//       students: 28,
//       teacher: { name: 'Dr. Emily Watson', role: 'Lead Teacher', avatar: '👩‍🔬' },
//       attendance: '94%',
//       avgScore: '82.1',
//       schedule: 'Tue, Thu',
//       color: 'bg-green-500'
//     },
//     {
//       subject: 'English Literature',
//       grade: 'Grade 9-C',
//       students: 30,
//       teacher: { name: 'Ms. Sarah Mitchell', role: 'Lead Teacher', avatar: '👩‍🏫' },
//       attendance: '97%',
//       avgScore: '88.7',
//       schedule: 'Mon, Thu, Fri',
//       color: 'bg-purple-500'
//     },
//     {
//       subject: 'World History',
//       grade: 'Grade 10-B',
//       students: 26,
//       teacher: { name: 'Mr. David Thompson', role: 'Lead Teacher', avatar: '👨‍💼' },
//       attendance: '93%',
//       avgScore: '86.3',
//       schedule: 'Tue, Wed, Fri',
//       color: 'bg-orange-500'
//     },
//     {
//       subject: 'Physics',
//       grade: 'Grade 12-A',
//       students: 24,
//       teacher: { name: 'Dr. James Anderson', role: 'Lead Teacher', avatar: '👨‍🔬' },
//       attendance: '95%',
//       avgScore: '91.2',
//       schedule: 'Mon, Tue, Thu',
//       color: 'bg-teal-500'
//     },
//     {
//       subject: 'Visual Arts',
//       grade: 'Grade 9-A',
//       students: 22,
//       teacher: { name: 'Ms. Lisa Martinez', role: 'Lead Teacher', avatar: '👩‍🎨' },
//       attendance: '98%',
//       avgScore: '90.5',
//       schedule: 'Wed, Fri',
//       color: 'bg-pink-500'
//     },
//     {
//       subject: 'Computer Science',
//       grade: 'Grade 11-A',
//       students: 29,
//       teacher: { name: 'Mr. Alex Kumar', role: 'Lead Teacher', avatar: '👨‍💻' },
//       attendance: '96%',
//       avgScore: '89.3',
//       schedule: 'Mon, Wed, Thu',
//       color: 'bg-indigo-500'
//     },
//     {
//       subject: 'Spanish',
//       grade: 'Grade 10-C',
//       students: 27,
//       teacher: { name: 'Ms. Maria Rodriguez', role: 'Lead Teacher', avatar: '👩‍🏫' },
//       attendance: '92%',
//       avgScore: '84.9',
//       schedule: 'Tue, Thu, Fri',
//       color: 'bg-red-500'
//     },
//     {
//       subject: 'Music Theory',
//       grade: 'Grade 9-B',
//       students: 20,
//       teacher: { name: 'Mr. Michael Brown', role: 'Lead Teacher', avatar: '👨‍🎤' },
//       attendance: '97%',
//       avgScore: '87.3',
//       schedule: 'Mon, Wed',
//       color: 'bg-yellow-600'
//     }
//   ];

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;
//   const totalPages = Math.ceil(classes.length / itemsPerPage);
//   const displayedClasses = classes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {stats.map((stat, index) => (
//             <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//               <div className="flex items-start justify-between mb-4">
//                 <div>
//                   <p className="text-gray-500 text-sm mb-2">{stat.label}</p>
//                   <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
//                 </div>
//                 <div className={`${stat.color} p-3 rounded-lg`}>
//                   <stat.icon className="w-6 h-6 text-white" />
//                 </div>
//               </div>
//               <p className={`text-sm flex items-center gap-1 ${stat.isNegative ? 'text-red-500' : 'text-green-500'}`}>
//                 <span>{stat.change}</span>
//                 <span className="text-gray-400">{stat.period}</span>
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Filters and Actions */}
//         <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
//           <div className="flex flex-wrap items-center gap-3">
//             <div className="relative">
//               <select 
//                 value={gradeFilter}
//                 onChange={(e) => setGradeFilter(e.target.value)}
//                 className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option>All Grades</option>
//                 <option>Grade 9</option>
//                 <option>Grade 10</option>
//                 <option>Grade 11</option>
//                 <option>Grade 12</option>
//               </select>
//               <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//             </div>

//             <div className="relative">
//               <select 
//                 value={subjectFilter}
//                 onChange={(e) => setSubjectFilter(e.target.value)}
//                 className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option>All Subjects</option>
//                 <option>Mathematics</option>
//                 <option>Science</option>
//                 <option>Languages</option>
//                 <option>Arts</option>
//               </select>
//               <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//             </div>

//             <div className="relative">
//               <select 
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option>All Status</option>
//                 <option>Active</option>
//                 <option>Completed</option>
//               </select>
//               <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//             </div>

//             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
//               <span>More Filters</span>
//             </button>
//           </div>

//           <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">
//             <Plus className="w-4 h-4" />
//             <span>Add New Class</span>
//           </button>
//         </div>

//         {/* Classes Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           {displayedClasses.map((cls, index) => (
//             <div key={index} className={`${cls.color} rounded-xl p-6 text-white shadow-lg`}>
//               <div className="flex items-start justify-between mb-4">
//                 <div>
//                   <h3 className="text-xl font-bold mb-1">{cls.subject}</h3>
//                   <p className="text-white/80 text-sm">{cls.grade}</p>
//                 </div>
//                 <button className="p-1 hover:bg-white/10 rounded">
//                   <MoreVertical className="w-5 h-5" />
//                 </button>
//               </div>

//               <div className="flex items-center gap-2 mb-6">
//                 <Users className="w-4 h-4" />
//                 <span className="text-sm">{cls.students} Students</span>
//               </div>

//               <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/20">
//                 <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">
//                   {cls.teacher.avatar}
//                 </div>
//                 <div>
//                   <p className="font-semibold text-sm">{cls.teacher.name}</p>
//                   <p className="text-white/70 text-xs">{cls.teacher.role}</p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-3 gap-4 mb-4">
//                 <div>
//                   <p className="text-white/70 text-xs mb-1">Attendance</p>
//                   <p className="font-bold">{cls.attendance}</p>
//                 </div>
//                 <div>
//                   <p className="text-white/70 text-xs mb-1">Avg Score</p>
//                   <p className="font-bold">{cls.avgScore}</p>
//                 </div>
//                 <div>
//                   <p className="text-white/70 text-xs mb-1">Schedule</p>
//                   <p className="font-bold text-xs">{cls.schedule}</p>
//                 </div>
//               </div>

//               <button className="w-full flex items-center justify-center gap-2 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm">
//                 <span>View Details</span>
//                 <ExternalLink className="w-4 h-4" />
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-center items-center gap-2">
//           <button 
//             onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//             className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
//             disabled={currentPage === 1}
//           >
//             <ChevronDown className="w-5 h-5 rotate-90" />
//           </button>
          
//           {[...Array(totalPages)].map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`w-10 h-10 rounded-lg font-medium ${
//                 currentPage === i + 1 
//                   ? 'bg-blue-500 text-white' 
//                   : 'bg-white text-gray-700 hover:bg-gray-100'
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
          
//           <button 
//             onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
//             className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
//             disabled={currentPage === totalPages}
//           >
//             <ChevronDown className="w-5 h-5 -rotate-90" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useState } from 'react';
import { LayoutDashboard, FileText, Users, GraduationCap, Calendar, BarChart3, Settings, BookOpen, Search, Plus, Filter, Download, Edit, Trash2, Eye, ChevronRight, BookMarked, UserCheck, RefreshCw, AlertCircle, School, ClipboardList, UserCircle, Phone, Mail, MapPin, Award, TrendingUp } from 'lucide-react';

const SchoolAdminDashboard = () => {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [activeLibrarySection, setActiveLibrarySection] = useState('overview');
  const [selectedClass, setSelectedClass] = useState<{
    id: number;
    name: string;
    totalStudents: number;
    sections: number;
    teachers: number;
    subjects: string[];
    classTeacher: string;
  } | null>(null);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  type Student = {
    id: number;
    name: string;
    roll: string;
    dob: string;
    father: string;
    mother: string;
    phone: string;
    email: string;
    address: string;
    attendance: number;
    avgScore: number;
  };

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Classes Data
  const classesData = [
    { 
      id: 1, 
      name: 'Class 9', 
      totalStudents: 150, 
      sections: 4, 
      teachers: 8,
      subjects: ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi'],
      classTeacher: 'Mrs. Anjali Sharma'
    },
    { 
      id: 2, 
      name: 'Class 10', 
      totalStudents: 160, 
      sections: 4, 
      teachers: 9,
      subjects: ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi'],
      classTeacher: 'Mr. Rajesh Kumar'
    },
    { 
      id: 3, 
      name: 'Class 11 (Science)', 
      totalStudents: 90, 
      sections: 3, 
      teachers: 7,
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Computer Science'],
      classTeacher: 'Dr. Priya Patel'
    },
    { 
      id: 4, 
      name: 'Class 11 (Commerce)', 
      totalStudents: 80, 
      sections: 2, 
      teachers: 6,
      subjects: ['Accountancy', 'Business Studies', 'Economics', 'English', 'Mathematics'],
      classTeacher: 'Mr. Amit Verma'
    },
    { 
      id: 5, 
      name: 'Class 12 (Science)', 
      totalStudents: 85, 
      sections: 3, 
      teachers: 7,
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Computer Science'],
      classTeacher: 'Dr. Sunita Reddy'
    },
    { 
      id: 6, 
      name: 'Class 12 (Commerce)', 
      totalStudents: 75, 
      sections: 2, 
      teachers: 6,
      subjects: ['Accountancy', 'Business Studies', 'Economics', 'English', 'Mathematics'],
      classTeacher: 'Mrs. Kavita Singh'
    },
  ];

  // Sections Data
  type Section = { id: string; name: string; students: number; teacher: string; room: string; avgAttendance: number };
  const sectionsData: Record<number, Section[]> = {
    1: [
      { id: 'A', name: 'Section A', students: 38, teacher: 'Mrs. Meera Joshi', room: '201', avgAttendance: 94 },
      { id: 'B', name: 'Section B', students: 37, teacher: 'Mr. Suresh Nair', room: '202', avgAttendance: 92 },
      { id: 'C', name: 'Section C', students: 38, teacher: 'Mrs. Priya Menon', room: '203', avgAttendance: 95 },
      { id: 'D', name: 'Section D', students: 37, teacher: 'Mr. Vivek Gupta', room: '204', avgAttendance: 93 },
    ],
    2: [
      { id: 'A', name: 'Section A', students: 40, teacher: 'Mrs. Deepa Singh', room: '301', avgAttendance: 95 },
      { id: 'B', name: 'Section B', students: 40, teacher: 'Mr. Anil Kumar', room: '302', avgAttendance: 94 },
      { id: 'C', name: 'Section C', students: 40, teacher: 'Mrs. Neha Sharma', room: '303', avgAttendance: 96 },
      { id: 'D', name: 'Section D', students: 40, teacher: 'Mr. Kiran Rao', room: '304', avgAttendance: 93 },
    ],
    3: [
      { id: 'A', name: 'Section A', students: 30, teacher: 'Dr. Raghav Desai', room: '401', avgAttendance: 97 },
      { id: 'B', name: 'Section B', students: 30, teacher: 'Mrs. Lakshmi Iyer', room: '402', avgAttendance: 96 },
      { id: 'C', name: 'Section C', students: 30, teacher: 'Mr. Harish Pillai', room: '403', avgAttendance: 95 },
    ],
    4: [
      { id: 'A', name: 'Section A', students: 40, teacher: 'Mrs. Ritu Kapoor', room: '501', avgAttendance: 94 },
      { id: 'B', name: 'Section B', students: 40, teacher: 'Mr. Manoj Tiwari', room: '502', avgAttendance: 95 },
    ],
    5: [
      { id: 'A', name: 'Section A', students: 28, teacher: 'Dr. Arjun Mehta', room: '601', avgAttendance: 98 },
      { id: 'B', name: 'Section B', students: 29, teacher: 'Mrs. Swati Bansal', room: '602', avgAttendance: 97 },
      { id: 'C', name: 'Section C', students: 28, teacher: 'Mr. Rohit Saxena', room: '603', avgAttendance: 96 },
    ],
    6: [
      { id: 'A', name: 'Section A', students: 38, teacher: 'Mrs. Geeta Malhotra', room: '701', avgAttendance: 97 },
      { id: 'B', name: 'Section B', students: 37, teacher: 'Mr. Ashok Tripathi', room: '702', avgAttendance: 96 },
    ],
  };

  // Students Data
  const studentsData: { [key: string]: Student[] } = {
    '1-A': [
      { id: 1, name: 'Aarav Sharma', roll: '001', dob: '2010-05-15', father: 'Rajesh Sharma', mother: 'Priya Sharma', phone: '+91-9876543210', email: 'sharma.r@email.com', address: 'MG Road, Hyderabad', attendance: 95, avgScore: 88 },
      { id: 2, name: 'Ananya Patel', roll: '002', dob: '2010-08-22', father: 'Amit Patel', mother: 'Neha Patel', phone: '+91-9876543211', email: 'patel.a@email.com', address: 'Banjara Hills, Hyderabad', attendance: 97, avgScore: 92 },
      { id: 3, name: 'Arjun Kumar', roll: '003', dob: '2010-03-10', father: 'Suresh Kumar', mother: 'Meera Kumar', phone: '+91-9876543212', email: 'kumar.s@email.com', address: 'Jubilee Hills, Hyderabad', attendance: 92, avgScore: 85 },
      { id: 4, name: 'Diya Reddy', roll: '004', dob: '2010-11-30', father: 'Ravi Reddy', mother: 'Lakshmi Reddy', phone: '+91-9876543213', email: 'reddy.r@email.com', address: 'Gachibowli, Hyderabad', attendance: 94, avgScore: 90 },
      { id: 5, name: 'Ishaan Singh', roll: '005', dob: '2010-07-18', father: 'Vikram Singh', mother: 'Pooja Singh', phone: '+91-9876543214', email: 'singh.v@email.com', address: 'Madhapur, Hyderabad', attendance: 96, avgScore: 87 },
    ],
    '2-A': [
      { id: 1, name: 'Kavya Menon', roll: '001', dob: '2009-04-12', father: 'Arun Menon', mother: 'Divya Menon', phone: '+91-9876543220', email: 'menon.a@email.com', address: 'Kondapur, Hyderabad', attendance: 98, avgScore: 94 },
      { id: 2, name: 'Rohan Desai', roll: '002', dob: '2009-09-25', father: 'Karan Desai', mother: 'Anjali Desai', phone: '+91-9876543221', email: 'desai.k@email.com', address: 'Hitech City, Hyderabad', attendance: 95, avgScore: 91 },
      { id: 3, name: 'Saanvi Iyer', roll: '003', dob: '2009-06-08', father: 'Raman Iyer', mother: 'Priya Iyer', phone: '+91-9876543222', email: 'iyer.r@email.com', address: 'Kukatpally, Hyderabad', attendance: 97, avgScore: 93 },
      { id: 4, name: 'Vihaan Chopra', roll: '004', dob: '2009-12-15', father: 'Sandeep Chopra', mother: 'Ritu Chopra', phone: '+91-9876543223', email: 'chopra.s@email.com', address: 'Secunderabad, Hyderabad', attendance: 93, avgScore: 88 },
      { id: 5, name: 'Aadhya Nair', roll: '005', dob: '2009-02-20', father: 'Manoj Nair', mother: 'Sneha Nair', phone: '+91-9876543224', email: 'nair.m@email.com', address: 'Begumpet, Hyderabad', attendance: 96, avgScore: 92 },
    ],
  };

  // Classes Overview Screen
  const ClassesOverview = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Classes Management</h2>
          <p className="text-gray-500 mt-1">Manage all classes, sections, and students</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Add New Class
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classesData.map((classItem) => (
          <div
            key={classItem.id}
            onClick={() => setSelectedClass(classItem)}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                <School className="w-6 h-6 text-blue-600" />
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">{classItem.name}</h3>
            <p className="text-sm text-gray-500 mb-4">Class Teacher: {classItem.classTeacher}</p>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-2xl font-bold text-blue-600">{classItem.totalStudents}</p>
                <p className="text-xs text-gray-500">Students</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{classItem.sections}</p>
                <p className="text-xs text-gray-500">Sections</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">{classItem.teachers}</p>
                <p className="text-xs text-gray-500">Teachers</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Subjects</p>
              <div className="flex flex-wrap gap-1">
                {classItem.subjects.slice(0, 3).map((subject, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    {subject}
                  </span>
                ))}
                {classItem.subjects.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    +{classItem.subjects.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Sections View Screen
  const SectionsView = () => {
    const sections =
      selectedClass && sectionsData[selectedClass.id]
        ? sectionsData[selectedClass.id]
        : [];
    
    return (
      <div>
        <div className="mb-6">
          <button
            onClick={() => setSelectedClass(null)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-3 flex items-center gap-1"
          >
            ← Back to Classes
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedClass ? `${selectedClass.name} - Sections` : 'Sections'}</h2>
              <p className="text-gray-500 mt-1">Class Teacher: {selectedClass ? selectedClass.classTeacher : ''}</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="w-4 h-4" />
              Add Section
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <div
              key={section.id}
              onClick={() => setSelectedSection(section)}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">{section.name}</h3>
              <p className="text-sm text-gray-500 mb-1">Teacher: {section.teacher}</p>
              <p className="text-sm text-gray-500 mb-4">Room: {section.room}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{section.students}</p>
                  <p className="text-xs text-gray-500">Students</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{section.avgAttendance}%</p>
                  <p className="text-xs text-gray-500">Attendance</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">View Students</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Students List Screen
  const StudentsList = () => {
    const sectionKey =
      selectedClass && selectedSection
        ? `${selectedClass.id}-${selectedSection.id}`
        : '';
    const students = sectionKey ? studentsData[sectionKey] || [] : [];
    
    return (
      <div>
        <div className="mb-6">
          <button
            onClick={() => setSelectedSection(null)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-3 flex items-center gap-1"
          >
            ← Back to Sections
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedClass ? selectedClass.name : ''}{selectedSection ? ` - ${selectedSection.name}` : ''}
              </h2>
              <p className="text-gray-500 mt-1">
                {selectedSection
                  ? <>Section Teacher: {selectedSection.teacher} &bull; Room: {selectedSection.room}</>
                  : 'Section details unavailable'}
              </p>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus className="w-4 h-4" />
                Add Student
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.filter(student => 
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.roll.includes(searchTerm)
          ).map((student) => (
            <div
              key={student.id}
              onClick={() => setSelectedStudent(student)}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{student.name}</h3>
                    <p className="text-sm text-gray-500">Roll: {student.roll}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Attendance</p>
                  <p className="text-lg font-bold text-blue-600">{student.attendance}%</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Avg Score</p>
                  <p className="text-lg font-bold text-green-600">{student.avgScore}%</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{student.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{student.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Student Details Modal
  const StudentDetailsModal = () => {
    if (!selectedStudent) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedStudent.name}</h3>
                  <p className="text-gray-500">
                    Roll No: {selectedStudent.roll}
                    {selectedClass && selectedSection
                      ? ` • ${selectedClass.name} - ${selectedSection.name}`
                      : ''}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedStudent(null)} 
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  <h4 className="font-semibold text-gray-900">Academic Performance</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Score</span>
                    <span className="font-bold text-blue-600">{selectedStudent.avgScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Attendance</span>
                    <span className="font-bold text-green-600">{selectedStudent.attendance}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-6 h-6 text-green-600" />
                  <h4 className="font-semibold text-gray-900">Quick Stats</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date of Birth</span>
                    <span className="font-medium text-gray-900">{selectedStudent.dob}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Age</span>
                    <span className="font-medium text-gray-900">15 years</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <UserCircle className="w-5 h-5 text-blue-600" />
                Personal Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Father's Name</p>
                  <p className="font-medium text-gray-900">{selectedStudent.father}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mother's Name</p>
                  <p className="font-medium text-gray-900">{selectedStudent.mother}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium text-gray-900 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    {selectedStudent.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium text-gray-900 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {selectedStudent.email}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium text-gray-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {selectedStudent.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                <Edit className="w-4 h-4" />
                Edit Details
              </button>
              <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download Report
              </button>
              <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderClassesContent = () => {
    if (selectedSection) {
      return <StudentsList />;
    }
    if (selectedClass) {
      return <SectionsView />;
    }
    return <ClassesOverview />;
  };

  const renderContent = () => {
    if (activeScreen === 'classes') {
      return renderClassesContent();
    }

    return (
      <div className="text-center py-12">
       {renderClassesContent()}
      </div>
    );
  };

  // const menuItems = [
  
  //   { id: 'classes', label: 'Classes', icon: <School className="w-5 h-5" /> },
  
  // ];

  return (
    <div className="flex h-screen bg-gray-100">
      {selectedStudent && <StudentDetailsModal />}
      
     

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SchoolAdminDashboard;