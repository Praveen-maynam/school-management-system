// import React, { useState } from 'react';
// import { Calendar, Upload, ChevronLeft } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useAttendance } from '../../../context/AttendanceContext';

// type AttendanceStatus = 'present' | 'fullday-absent';

// interface Student {
//     id: string;
//     name: string;
//     rollNo: string;
//     status: AttendanceStatus;
// }

// const MarkAttendanceScreen = () => {
//     const navigate = useNavigate();
//     const [selectedClass, setSelectedClass] = useState('Class 6-A');
//     const [selectedDate, setSelectedDate] = useState('24-12-2025');
//     const { markAttendance } = useAttendance();

//     const [students, setStudents] = useState<Student[]>([
//         { id: '1', name: 'Student Name', rollNo: '22', status: 'present' },
//         { id: '2', name: 'Student Name', rollNo: '22', status: 'present' },
//         { id: '3', name: 'Student Name', rollNo: '22', status: 'present' },
//         { id: '4', name: 'Student Name', rollNo: '22', status: 'present' },
//         { id: '5', name: 'Student Name', rollNo: '22', status: 'fullday-absent' },
//     ]);

//     const toggleStudentStatus = (id: string) => {
//         setStudents(students.map(student =>
//             student.id === id
//                 ? { ...student, status: student.status === 'present' ? 'fullday-absent' : 'present' }
//                 : student
//         ));
//     };

//     const submitAttendance = () => {
//         const today = new Date().toISOString().split("T")[0];
//         const classId = selectedClass; // Use selectedClass as classId

//         const records = students.map(s => ({
//             id: crypto.randomUUID(),
//             classId,
//             studentId: s.id,
//             date: today,
//             status: s.status === 'present' ? "Present" : "Absent" as "Present" | "Absent"
//         }));

//         markAttendance(records);
//         alert('Attendance marked successfully!');
//     };

//     const presentCount = students.filter(s => s.status === 'present').length;
//     const absentCount = students.filter(s => s.status === 'fullday-absent').length;

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <div className="space-y-6 p-8">
//                 {/* Header */}
//                 <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 text-white">
//                     <button
//                         onClick={() => navigate('/teacher/dashboard')}
//                         className="mb-4 flex items-center gap-2 text-white hover:text-blue-100"
//                     >
//                         <ChevronLeft size={20} />
//                         <span>Back</span>
//                     </button>
//                     <h1 className="text-2xl font-bold">Attendance</h1>
//                 </div>

//                 {/* Attendance Card */}
//                 <div className="bg-white rounded-2xl border border-gray-200 p-6">
//                     {/* Class and Date Selection */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                         <select
//                             value={selectedClass}
//                             onChange={(e) => setSelectedClass(e.target.value)}
//                             className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         >
//                             <option>Class 6-A</option>
//                             <option>Class 6-B</option>
//                             <option>Class 7-A</option>
//                         </select>

//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 value={selectedDate}
//                                 onChange={(e) => setSelectedDate(e.target.value)}
//                                 className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                             <Calendar className="absolute right-3 top-3.5 text-gray-400" size={20} />
//                         </div>
//                     </div>

//                     {/* Stats */}
//                     <div className="grid grid-cols-3 gap-4 mb-6">
//                         <div className="text-center">
//                             <div className="text-3xl font-bold text-gray-800">{students.length}</div>
//                             <div className="text-sm text-gray-500">Total Students</div>
//                         </div>
//                         <div className="text-center">
//                             <div className="text-3xl font-bold text-green-600">{presentCount}</div>
//                             <div className="text-sm text-gray-500">Present</div>
//                         </div>
//                         <div className="text-center">
//                             <div className="text-3xl font-bold text-red-600">{absentCount}</div>
//                             <div className="text-sm text-gray-500">Absent</div>
//                         </div>
//                     </div>

//                     {/* Upload Button */}
//                     <button className="w-full border-2 border-dashed border-blue-300 rounded-lg py-3 mb-6 text-blue-600 font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
//                         <Upload size={20} />
//                         Upload Attendance
//                     </button>

//                     {/* Student List */}
//                     <div className="space-y-3">
//                         {students.map((student, index) => (
//                             <div key={student.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
//                                 <div className="flex items-center gap-3">
//                                     <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-semibold">
//                                         S
//                                     </div>
//                                     <div>
//                                         <div className="font-semibold text-gray-800">{student.name}</div>
//                                         <div className="text-sm text-gray-500">Roll No: {student.rollNo}</div>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
//                                         {index + 1}
//                                     </span>
//                                     <button
//                                         onClick={() => toggleStudentStatus(student.id)}
//                                         className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${student.status === 'present'
//                                                 ? 'bg-green-100 text-green-700 border border-green-300'
//                                                 : 'bg-white text-gray-700 border border-gray-300'
//                                             }`}
//                                     >
//                                         Present
//                                     </button>
//                                     <button
//                                         onClick={() => toggleStudentStatus(student.id)}
//                                         className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${student.status === 'fullday-absent'
//                                                 ? 'bg-red-100 text-red-700 border border-red-300'
//                                                 : 'bg-white text-gray-700 border border-gray-300'
//                                             }`}
//                                     >
//                                         Fullday Absent
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Submit Button */}
//                     <div className="mt-6">
//                         <button
//                             onClick={submitAttendance}
//                             className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
//                         >
//                             Submit Attendance
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MarkAttendanceScreen;












// // import React, { useState } from 'react';
// // import { Calendar, Upload, ChevronLeft } from 'lucide-react';
// // import { useNavigate } from 'react-router-dom';
// // import { useAttendance } from '../../../context/AttendanceContext';

// // type AttendanceStatus = 'present' | 'fullday-absent';

// // interface Student {
// //     id: string;
// //     name: string;
// //     rollNo: string;
// //     status: AttendanceStatus;
// // }

// // const MarkAttendanceScreen = () => {
// //     const navigate = useNavigate();
// //     const [selectedClass, setSelectedClass] = useState('Class 6-A');
// //     const [selectedDate, setSelectedDate] = useState('24-12-2025');
// //     const { markAttendance } = useAttendance();

// //     const [students, setStudents] = useState<Student[]>([
// //         { id: '1', name: 'Student Name', rollNo: '22', status: 'present' },
// //         { id: '2', name: 'Student Name', rollNo: '22', status: 'present' },
// //         { id: '3', name: 'Student Name', rollNo: '22', status: 'present' },
// //         { id: '4', name: 'Student Name', rollNo: '22', status: 'present' },
// //         { id: '5', name: 'Student Name', rollNo: '22', status: 'fullday-absent' },
// //     ]);

// //     const toggleStudentStatus = (id: string) => {
// //         setStudents(students.map(student =>
// //             student.id === id
// //                 ? { ...student, status: student.status === 'present' ? 'fullday-absent' : 'present' }
// //                 : student
// //         ));
// //     };

// //     const submitAttendance = () => {
// //         const today = new Date().toISOString().split("T")[0];
// //         const classId = selectedClass; // Use selectedClass as classId

// //         const records = students.map(s => ({
// //             id: crypto.randomUUID(),
// //             classId,
// //             studentId: s.id,
// //             date: today,
// //             status: s.status === 'present' ? "Present" : "Absent" as "Present" | "Absent"
// //         }));

// //         markAttendance(records);
// //         alert('Attendance marked successfully!');
// //     };

// //     const presentCount = students.filter(s => s.status === 'present').length;
// //     const absentCount = students.filter(s => s.status === 'fullday-absent').length;

// //     return (
// //         <div className="min-h-screen bg-gray-50">
// //             <div className="space-y-6 p-8">
// //                 {/* Header */}
// //                 <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 text-white">
// //                     <button
// //                         onClick={() => navigate('/teacher/dashboard')}
// //                         className="mb-4 flex items-center gap-2 text-white hover:text-blue-100"
// //                     >
// //                         <ChevronLeft size={20} />
// //                         <span>Back</span>
// //                     </button>
// //                     <h1 className="text-2xl font-bold">Attendance</h1>
// //                 </div>

// //                 {/* Attendance Card */}
// //                 <div className="bg-white rounded-2xl border border-gray-200 p-6">
// //                     {/* Class and Date Selection */}
// //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
// //                         <select
// //                             value={selectedClass}
// //                             onChange={(e) => setSelectedClass(e.target.value)}
// //                             className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                         >
// //                             <option>Class 6-A</option>
// //                             <option>Class 6-B</option>
// //                             <option>Class 7-A</option>
// //                         </select>

// //                         <div className="relative">
// //                             <input
// //                                 type="text"
// //                                 value={selectedDate}
// //                                 onChange={(e) => setSelectedDate(e.target.value)}
// //                                 className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                             />
// //                             <Calendar className="absolute right-3 top-3.5 text-gray-400" size={20} />
// //                         </div>
// //                     </div>

// //                     {/* Stats */}
// //                     <div className="grid grid-cols-3 gap-4 mb-6">
// //                         <div className="text-center">
// //                             <div className="text-3xl font-bold text-gray-800">{students.length}</div>
// //                             <div className="text-sm text-gray-500">Total Students</div>
// //                         </div>
// //                         <div className="text-center">
// //                             <div className="text-3xl font-bold text-green-600">{presentCount}</div>
// //                             <div className="text-sm text-gray-500">Present</div>
// //                         </div>
// //                         <div className="text-center">
// //                             <div className="text-3xl font-bold text-red-600">{absentCount}</div>
// //                             <div className="text-sm text-gray-500">Absent</div>
// //                         </div>
// //                     </div>

// //                     {/* Upload Button */}
// //                     <button className="w-full border-2 border-dashed border-blue-300 rounded-lg py-3 mb-6 text-blue-600 font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
// //                         <Upload size={20} />
// //                         Upload Attendance
// //                     </button>

// //                     {/* Student List */}
// //                     <div className="space-y-3">
// //                         {students.map((student, index) => (
// //                             <div key={student.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
// //                                 <div className="flex items-center gap-3">
// //                                     <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-semibold">
// //                                         S
// //                                     </div>
// //                                     <div>
// //                                         <div className="font-semibold text-gray-800">{student.name}</div>
// //                                         <div className="text-sm text-gray-500">Roll No: {student.rollNo}</div>
// //                                     </div>
// //                                 </div>
// //                                 <div className="flex items-center gap-2">
// //                                     <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
// //                                         {index + 1}
// //                                     </span>
// //                                     <button
// //                                         onClick={() => toggleStudentStatus(student.id)}
// //                                         className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${student.status === 'present'
// //                                                 ? 'bg-green-100 text-green-700 border border-green-300'
// //                                                 : 'bg-white text-gray-700 border border-gray-300'
// //                                             }`}
// //                                     >
// //                                         Present
// //                                     </button>
// //                                     <button
// //                                         onClick={() => toggleStudentStatus(student.id)}
// //                                         className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${student.status === 'fullday-absent'
// //                                                 ? 'bg-red-100 text-red-700 border border-red-300'
// //                                                 : 'bg-white text-gray-700 border border-gray-300'
// //                                             }`}
// //                                     >
// //                                         Fullday Absent
// //                                     </button>
// //                                 </div>
// //                             </div>
// //                         ))}
// //                     </div>

// //                     {/* Submit Button */}
// //                     <div className="mt-6">
// //                         <button
// //                             onClick={submitAttendance}
// //                             className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
// //                         >
// //                             Submit Attendance
// //                         </button>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default MarkAttendanceScreen;






import React, { useState } from 'react';
import { Calendar, Upload, ChevronLeft, Users, CheckCircle, XCircle, Search, Filter, Download, Clock, TrendingUp, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAttendance } from '../../../context/AttendanceContext';

type AttendanceStatus = 'present' | 'fullday-absent' | 'late' | 'half-day';

interface Student {
    id: string;
    name: string;
    rollNo: string;
    status: AttendanceStatus;
    avatar?: string;
}

const MarkAttendanceScreen = () => {
    const navigate = useNavigate();
    const [selectedClass, setSelectedClass] = useState('Class 6-A');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | AttendanceStatus>('all');
    const { markAttendance } = useAttendance();

    const [students, setStudents] = useState<Student[]>([
        { id: '1', name: 'Aarav Sharma', rollNo: '101', status: 'present' },
        { id: '2', name: 'Diya Patel', rollNo: '102', status: 'present' },
        { id: '3', name: 'Arjun Kumar', rollNo: '103', status: 'late' },
        { id: '4', name: 'Ananya Singh', rollNo: '104', status: 'present' },
        { id: '5', name: 'Rohan Gupta', rollNo: '105', status: 'fullday-absent' },
        { id: '6', name: 'Priya Reddy', rollNo: '106', status: 'present' },
        { id: '7', name: 'Vivaan Joshi', rollNo: '107', status: 'half-day' },
        { id: '8', name: 'Isha Verma', rollNo: '108', status: 'present' },
    ]);

    const classes = ['Class 6-A', 'Class 6-B', 'Class 7-A', 'Class 7-B', 'Class 8-A'];

    const toggleStudentStatus = (id: string, newStatus: AttendanceStatus) => {
        setStudents(students.map(student =>
            student.id === id ? { ...student, status: newStatus } : student
        ));
    };

    const markAllPresent = () => {
        setStudents(students.map(student => ({ ...student, status: 'present' })));
    };

    const markAllAbsent = () => {
        setStudents(students.map(student => ({ ...student, status: 'fullday-absent' })));
    };

    const submitAttendance = () => {
        const classId = selectedClass;
        const records = students.map(s => ({
            id: crypto.randomUUID(),
            classId,
            studentId: s.id,
            date: selectedDate,
            status: s.status === 'present' || s.status === 'late' || s.status === 'half-day' ? "Present" : "Absent" as "Present" | "Absent"
        }));

        markAttendance(records);
        alert('Attendance marked successfully!');
    };

    const presentCount = students.filter(s => s.status === 'present').length;
    const absentCount = students.filter(s => s.status === 'fullday-absent').length;
    const lateCount = students.filter(s => s.status === 'late').length;
    const halfDayCount = students.filter(s => s.status === 'half-day').length;
    const attendancePercentage = Math.round(((presentCount + lateCount + halfDayCount) / students.length) * 100);

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.rollNo.includes(searchQuery);
        const matchesFilter = filterStatus === 'all' || student.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const getStatusColor = (status: AttendanceStatus) => {
        switch (status) {
            case 'present': return 'bg-green-100 text-green-700 border-green-300';
            case 'fullday-absent': return 'bg-red-100 text-red-700 border-red-300';
            case 'late': return 'bg-orange-100 text-orange-700 border-orange-300';
            case 'half-day': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            default: return 'bg-gray-100 text-gray-700 border-gray-300';
        }
    };

    const getStatusIcon = (status: AttendanceStatus) => {
        switch (status) {
            case 'present': return <CheckCircle size={16} />;
            case 'fullday-absent': return <XCircle size={16} />;
            case 'late': return <Clock size={16} />;
            case 'half-day': return <Clock size={16} />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <div className="max-w-7xl mx-auto p-6 space-y-6">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-xl">
                    <button
                        onClick={() => navigate('/teacher/dashboard')}
                        className="mb-4 flex items-center gap-2 text-white hover:text-blue-100 transition-colors bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30"
                    >
                        <ChevronLeft size={20} />
                        <span className="font-medium">Back to Dashboard</span>
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                            <UserCheck size={32} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-1">Mark Attendance</h1>
                            <p className="text-blue-100">Track student attendance efficiently and accurately</p>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Users className="text-blue-600" size={24} />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">{students.length}</div>
                        <div className="text-sm text-gray-600">Total Students</div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-lg border border-green-200 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <CheckCircle className="text-green-600" size={24} />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-green-600">{presentCount}</div>
                        <div className="text-sm text-gray-600">Present</div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-lg border border-red-200 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                <XCircle className="text-red-600" size={24} />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-red-600">{absentCount}</div>
                        <div className="text-sm text-gray-600">Absent</div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-lg border border-orange-200 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                <Clock className="text-orange-600" size={24} />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-orange-600">{lateCount}</div>
                        <div className="text-sm text-gray-600">Late</div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-lg border border-purple-200 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <TrendingUp className="text-purple-600" size={24} />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-purple-600">{attendancePercentage}%</div>
                        <div className="text-sm text-gray-600">Attendance</div>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                    {/* Class and Date Selection */}
                    <div className="bg-gradient-to-r from-blue-50 to-white p-6 border-b border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Class</label>
                                <select
                                    value={selectedClass}
                                    onChange={(e) => setSelectedClass(e.target.value)}
                                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                                >
                                    {classes.map(cls => (
                                        <option key={cls} value={cls}>{cls}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Date</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                                    />
                                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filter Section */}
                    <div className="p-6 border-b border-gray-200 space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by name or roll number..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className="flex gap-2">
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value as any)}
                                    className="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                                >
                                    <option value="all">All Status</option>
                                    <option value="present">Present</option>
                                    <option value="fullday-absent">Absent</option>
                                    <option value="late">Late</option>
                                    <option value="half-day">Half Day</option>
                                </select>

                                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
                                    <Download size={20} />
                                    Export
                                </button>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={markAllPresent}
                                className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-green-200 transition-colors flex items-center gap-2 border border-green-300"
                            >
                                <CheckCircle size={18} />
                                Mark All Present
                            </button>
                            <button
                                onClick={markAllAbsent}
                                className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-semibold hover:bg-red-200 transition-colors flex items-center gap-2 border border-red-300"
                            >
                                <XCircle size={18} />
                                Mark All Absent
                            </button>
                            <button className="border-2 border-dashed border-blue-300 text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2">
                                <Upload size={18} />
                                Upload Attendance
                            </button>
                        </div>
                    </div>

                    {/* Student List */}
                    <div className="p-6">
                        <div className="mb-4 text-sm text-gray-600">
                            Showing {filteredStudents.length} of {students.length} students
                        </div>
                        <div className="space-y-3">
                            {filteredStudents.map((student, index) => (
                                <div key={student.id} className="group border-2 border-gray-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-md transition-all">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg shadow-md">
                                                    {student.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
                                                    <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-0.5 rounded-full">
                                                        #{student.rollNo}
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900 text-lg">{student.name}</div>
                                                <div className="text-sm text-gray-500">Roll No: {student.rollNo}</div>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                onClick={() => toggleStudentStatus(student.id, 'present')}
                                                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 border-2 ${
                                                    student.status === 'present'
                                                        ? 'bg-green-100 text-green-700 border-green-300 shadow-md scale-105'
                                                        : 'bg-white text-gray-600 border-gray-300 hover:border-green-300'
                                                }`}
                                            >
                                                <CheckCircle size={16} />
                                                Present
                                            </button>
                                            <button
                                                onClick={() => toggleStudentStatus(student.id, 'late')}
                                                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 border-2 ${
                                                    student.status === 'late'
                                                        ? 'bg-orange-100 text-orange-700 border-orange-300 shadow-md scale-105'
                                                        : 'bg-white text-gray-600 border-gray-300 hover:border-orange-300'
                                                }`}
                                            >
                                                <Clock size={16} />
                                                Late
                                            </button>
                                            <button
                                                onClick={() => toggleStudentStatus(student.id, 'half-day')}
                                                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 border-2 ${
                                                    student.status === 'half-day'
                                                        ? 'bg-yellow-100 text-yellow-700 border-yellow-300 shadow-md scale-105'
                                                        : 'bg-white text-gray-600 border-gray-300 hover:border-yellow-300'
                                                }`}
                                            >
                                                <Clock size={16} />
                                                Half Day
                                            </button>
                                            <button
                                                onClick={() => toggleStudentStatus(student.id, 'fullday-absent')}
                                                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 border-2 ${
                                                    student.status === 'fullday-absent'
                                                        ? 'bg-red-100 text-red-700 border-red-300 shadow-md scale-105'
                                                        : 'bg-white text-gray-600 border-gray-300 hover:border-red-300'
                                                }`}
                                            >
                                                <XCircle size={16} />
                                                Absent
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Section */}
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-white border-t border-gray-200">
                        <div className="flex flex-col md:flex-row gap-4">
                            <button
                                onClick={submitAttendance}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                <CheckCircle size={20} />
                                Submit Attendance
                            </button>
                            <button
                                onClick={() => navigate('/teacher/dashboard')}
                                className="md:w-48 bg-gray-200 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-300 transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>

                {/* Info Card */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <UserCheck size={20} className="text-blue-600" />
                        Attendance Tips
                    </h3>
                    <ul className="text-sm text-gray-700 space-y-2">
                        <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold mt-0.5">•</span>
                            <span>Use "Mark All Present" to quickly mark everyone present, then adjust individually</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold mt-0.5">•</span>
                            <span>Use search to quickly find students by name or roll number</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold mt-0.5">•</span>
                            <span>Mark students as "Late" or "Half Day" for accurate attendance records</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MarkAttendanceScreen;  