import React, { useState } from 'react';
import { Calendar, Upload, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAttendance } from '../../../context/AttendanceContext';

type AttendanceStatus = 'present' | 'fullday-absent';

interface Student {
    id: string;
    name: string;
    rollNo: string;
    status: AttendanceStatus;
}

const MarkAttendanceScreen = () => {
    const navigate = useNavigate();
    const [selectedClass, setSelectedClass] = useState('Class 6-A');
    const [selectedDate, setSelectedDate] = useState('24-12-2025');
    const { markAttendance } = useAttendance();

    const [students, setStudents] = useState<Student[]>([
        { id: '1', name: 'Student Name', rollNo: '22', status: 'present' },
        { id: '2', name: 'Student Name', rollNo: '22', status: 'present' },
        { id: '3', name: 'Student Name', rollNo: '22', status: 'present' },
        { id: '4', name: 'Student Name', rollNo: '22', status: 'present' },
        { id: '5', name: 'Student Name', rollNo: '22', status: 'fullday-absent' },
    ]);

    const toggleStudentStatus = (id: string) => {
        setStudents(students.map(student =>
            student.id === id
                ? { ...student, status: student.status === 'present' ? 'fullday-absent' : 'present' }
                : student
        ));
    };

    const submitAttendance = () => {
        const today = new Date().toISOString().split("T")[0];
        const classId = selectedClass; // Use selectedClass as classId

        const records = students.map(s => ({
            id: crypto.randomUUID(),
            classId,
            studentId: s.id,
            date: today,
            status: s.status === 'present' ? "Present" : "Absent" as "Present" | "Absent"
        }));

        markAttendance(records);
        alert('Attendance marked successfully!');
    };

    const presentCount = students.filter(s => s.status === 'present').length;
    const absentCount = students.filter(s => s.status === 'fullday-absent').length;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="space-y-6 p-8">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 text-white">
                    <button
                        onClick={() => navigate('/teacher/dashboard')}
                        className="mb-4 flex items-center gap-2 text-white hover:text-blue-100"
                    >
                        <ChevronLeft size={20} />
                        <span>Back</span>
                    </button>
                    <h1 className="text-2xl font-bold">Attendance</h1>
                </div>

                {/* Attendance Card */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    {/* Class and Date Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <select
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option>Class 6-A</option>
                            <option>Class 6-B</option>
                            <option>Class 7-A</option>
                        </select>

                        <div className="relative">
                            <input
                                type="text"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Calendar className="absolute right-3 top-3.5 text-gray-400" size={20} />
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-800">{students.length}</div>
                            <div className="text-sm text-gray-500">Total Students</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600">{presentCount}</div>
                            <div className="text-sm text-gray-500">Present</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-red-600">{absentCount}</div>
                            <div className="text-sm text-gray-500">Absent</div>
                        </div>
                    </div>

                    {/* Upload Button */}
                    <button className="w-full border-2 border-dashed border-blue-300 rounded-lg py-3 mb-6 text-blue-600 font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
                        <Upload size={20} />
                        Upload Attendance
                    </button>

                    {/* Student List */}
                    <div className="space-y-3">
                        {students.map((student, index) => (
                            <div key={student.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-semibold">
                                        S
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-800">{student.name}</div>
                                        <div className="text-sm text-gray-500">Roll No: {student.rollNo}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                                        {index + 1}
                                    </span>
                                    <button
                                        onClick={() => toggleStudentStatus(student.id)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${student.status === 'present'
                                                ? 'bg-green-100 text-green-700 border border-green-300'
                                                : 'bg-white text-gray-700 border border-gray-300'
                                            }`}
                                    >
                                        Present
                                    </button>
                                    <button
                                        onClick={() => toggleStudentStatus(student.id)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${student.status === 'fullday-absent'
                                                ? 'bg-red-100 text-red-700 border border-red-300'
                                                : 'bg-white text-gray-700 border border-gray-300'
                                            }`}
                                    >
                                        Fullday Absent
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                        <button
                            onClick={submitAttendance}
                            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Submit Attendance
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarkAttendanceScreen;












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
