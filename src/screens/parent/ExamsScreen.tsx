// import React, { useState } from 'react';
// import { Calendar, Award, TrendingUp, X, CheckCircle, Clock, BookOpen, Star, Trophy, Target } from 'lucide-react';

// export default function ExamsResultsScreen() {
//   const [selectedStudent, setSelectedStudent] = useState('aarav');
 
//   const [showResultModal, setShowResultModal] = useState(false);
// const [selectedExam, setSelectedExam] = useState<Exam | null>(null);

//   const students = [
//     { id: 'aarav', name: 'Aarav', class: 'Class 8 A' },
//     { id: 'ananya', name: 'Ananya', class: 'Class 5 B' }
//   ];

//   const examSummary = {
//     totalExams: 5,
//     completed: 3,
//     upcoming: 2,
//     academicYear: '2025–26'
//   };

//   const examsList = [
//     {
//       id: 1,
//       examName: 'Mid Term Examination',
//       subjects: 6,
//       status: 'completed',
//       examDate: '15 Jan 2026',
//       results: [
//         { subject: 'Mathematics', marks: 85, totalMarks: 100, grade: 'A', status: 'pass' },
//         { subject: 'English', marks: 78, totalMarks: 100, grade: 'B+', status: 'pass' },
//         { subject: 'Science', marks: 92, totalMarks: 100, grade: 'A+', status: 'pass' },
//         { subject: 'Social Studies', marks: 88, totalMarks: 100, grade: 'A', status: 'pass' },
//         { subject: 'Hindi', marks: 75, totalMarks: 100, grade: 'B', status: 'pass' },
//         { subject: 'Computer Science', marks: 95, totalMarks: 100, grade: 'A+', status: 'pass' }
//       ],
//       totalMarks: 513,
//       obtainedMarks: 513,
//       percentage: 85.5,
//       overallGrade: 'A',
//       classRank: 3
//     },
//     {
//       id: 2,
//       examName: 'Unit Test - 1',
//       subjects: 4,
//       status: 'completed',
//       examDate: '10 Dec 2025',
//       results: [
//         { subject: 'Mathematics', marks: 45, totalMarks: 50, grade: 'A', status: 'pass' },
//         { subject: 'English', marks: 38, totalMarks: 50, grade: 'B+', status: 'pass' },
//         { subject: 'Science', marks: 48, totalMarks: 50, grade: 'A+', status: 'pass' },
//         { subject: 'Social Studies', marks: 42, totalMarks: 50, grade: 'A', status: 'pass' }
//       ],
//       totalMarks: 200,
//       obtainedMarks: 173,
//       percentage: 86.5,
//       overallGrade: 'A',
//       classRank: 2
//     },
//     {
//       id: 3,
//       examName: 'Pre-Board Examination',
//       subjects: 6,
//       status: 'completed',
//       examDate: '5 Feb 2026',
//       results: [
//         { subject: 'Mathematics', marks: 72, totalMarks: 100, grade: 'B', status: 'pass' },
//         { subject: 'English', marks: 68, totalMarks: 100, grade: 'B', status: 'pass' },
//         { subject: 'Science', marks: 82, totalMarks: 100, grade: 'A', status: 'pass' },
//         { subject: 'Social Studies', marks: 78, totalMarks: 100, grade: 'B+', status: 'pass' },
//         { subject: 'Hindi', marks: 70, totalMarks: 100, grade: 'B', status: 'pass' },
//         { subject: 'Computer Science', marks: 88, totalMarks: 100, grade: 'A', status: 'pass' }
//       ],
//       totalMarks: 600,
//       obtainedMarks: 458,
//       percentage: 76.3,
//       overallGrade: 'B+',
//       classRank: 5
//     },
//     {
//       id: 4,
//       examName: 'Unit Test - 2',
//       subjects: 4,
//       status: 'upcoming',
//       examDate: '20 Feb 2026',
//       results: null
//     },
//     {
//       id: 5,
//       examName: 'Annual Examination',
//       subjects: 6,
//       status: 'upcoming',
//       examDate: '15 Mar 2026',
//       results: null
//     }
//   ];

//   const getStatusStyle = (status:string) => {
//     switch (status) {
//       case 'completed':
//         return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-300';
//       case 'upcoming':
//         return 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 border-amber-300';
//       case 'cancelled':
//         return 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border-red-300';
//       default:
//         return 'bg-gray-100 text-gray-600 border-gray-200';
//     }
//   };

//   const getStatusIcon = (status:string) => {
//     switch (status) {
//       case 'completed':
//         return <CheckCircle className="w-4 h-4" />;
//       case 'upcoming':
//         return <Clock className="w-4 h-4" />;
//       default:
//         return null;
//     }
//   };

//   const getMarksStyle = (percentage:number) => {
//     if (percentage >= 80) return 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 text-green-700';
//     if (percentage >= 60) return 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-300 text-amber-700';
//     return 'bg-gradient-to-r from-red-50 to-rose-50 border-red-300 text-red-700';
//   };

//   const getGradeColor = (grade:string) => {
//     if (grade.includes('A')) return 'text-green-600';
//     if (grade.includes('B')) return 'text-blue-600';
//     if (grade.includes('C')) return 'text-amber-600';
//     return 'text-red-600';
//   };

//   const openResultModal = (exam:any) => {
//     if (exam.status === 'completed' && exam.results) {
//       setSelectedExam(exam);
//       setShowResultModal(true);
//     }
//   };

//   const closeResultModal = () => {
//     setShowResultModal(false);
//     setSelectedExam(null);
//   };

//   const currentStudent = students.find(s => s.id === selectedStudent);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
//       {/* Top Header - Sticky */}
//       <div className="sticky top-0 z-10 bg-white border-b-2 border-purple-200 shadow-lg">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                 Exams & Results
//               </h1>
//               <p className="text-sm text-gray-600 mt-1">Exam schedule & performance overview</p>
//             </div>
//             <div className="flex items-center gap-4">
//               {/* Student Selector */}
//               <select
//                 value={selectedStudent}
//                 onChange={(e) => setSelectedStudent(e.target.value)}
//                 className="px-4 py-2 border-2 border-purple-300 rounded-xl bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
//               >
//                 {students.map(student => (
//                   <option key={student.id} value={student.id}>
//                     {student.name} – {student.class}
//                   </option>
//                 ))}
//               </select>
//               {/* Academic Year Badge */}
//               <div className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-md">
//                 {examSummary.academicYear}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-8">
//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           {/* Total Exams Card */}
//           <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform duration-300">
//             <div className="flex items-center gap-3 mb-3">
//               <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
//                 <BookOpen className="w-7 h-7" />
//               </div>
//               <div>
//                 <div className="text-sm font-medium opacity-90">Total Exams</div>
//                 <div className="text-xs opacity-75 mt-0.5">This academic year</div>
//               </div>
//             </div>
//             <div className="text-5xl font-bold">{examSummary.totalExams}</div>
//           </div>

//           {/* Completed Card */}
//           <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform duration-300">
//             <div className="flex items-center gap-3 mb-3">
//               <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
//                 <CheckCircle className="w-7 h-7" />
//               </div>
//               <div>
//                 <div className="text-sm font-medium opacity-90">Completed</div>
//                 <div className="text-xs opacity-75 mt-0.5">Results available</div>
//               </div>
//             </div>
//             <div className="text-5xl font-bold">{examSummary.completed}</div>
//           </div>

//           {/* Upcoming Card */}
//           <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform duration-300">
//             <div className="flex items-center gap-3 mb-3">
//               <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
//                 <Clock className="w-7 h-7" />
//               </div>
//               <div>
//                 <div className="text-sm font-medium opacity-90">Upcoming</div>
//                 <div className="text-xs opacity-75 mt-0.5">Prepare well</div>
//               </div>
//             </div>
//             <div className="text-5xl font-bold">{examSummary.upcoming}</div>
//           </div>
//         </div>

//         {/* Exam List Table */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-purple-100">
//           <div className="px-6 py-4 border-b-2 border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50">
//             <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//               Exam Schedule & Results
//             </h2>
//           </div>
          
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gradient-to-r from-purple-100 to-pink-100 border-b-2 border-purple-200 sticky top-0">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Exam</th>
//                   <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Subjects</th>
//                   <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Exam Date</th>
//                   <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Status</th>
//                   <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Result</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-purple-100">
//                 {examsList.map((exam, index) => (
//                   <tr 
//                     key={exam.id} 
//                     className={`${index % 2 === 0 ? 'bg-white' : 'bg-purple-50/30'} hover:bg-purple-100/50 transition-colors`}
//                   >
//                     <td className="px-6 py-4">
//                       <div className="font-bold text-gray-900">{exam.examName}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center gap-2">
//                         <span className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg flex items-center justify-center font-bold text-sm">
//                           {exam.subjects}
//                         </span>
//                         <span className="text-gray-600 text-sm">subjects</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center gap-2 text-gray-700">
//                         <Calendar className="w-4 h-4 text-purple-500" />
//                         {exam.examDate}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border-2 shadow-sm ${getStatusStyle(exam.status)}`}>
//                         {getStatusIcon(exam.status)}
//                         {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {exam.status === 'completed' ? (
//                         <button
//                           onClick={() => openResultModal(exam)}
//                           className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
//                         >
//                           View Results
//                         </button>
//                       ) : exam.status === 'upcoming' ? (
//                         <span className="text-sm text-gray-500 italic">Not available yet</span>
//                       ) : (
//                         <span className="text-sm text-gray-400">—</span>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Empty State - No Exams */}
//         {examsList.length === 0 && (
//           <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl p-12 text-center border-2 border-purple-200">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
//               <Calendar className="w-10 h-10 text-white" />
//             </div>
//             <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
//               📅 No exams planned yet
//             </h3>
//             <p className="text-purple-700">Check back later for exam schedule</p>
//           </div>
//         )}
//       </div>

//       {/* Result Detail Modal */}
//       {showResultModal && selectedExam && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
//           <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
//             {/* Modal Header */}
//             <div className="sticky top-0 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white px-8 py-6 flex items-center justify-between rounded-t-3xl shadow-lg">
//               <div>
//                 <h3 className="text-2xl font-bold">{selectedExam.examName}</h3>
//                 <p className="text-sm text-purple-100 mt-1">Detailed Performance Report</p>
//               </div>
//               <button 
//                 onClick={closeResultModal}
//                 className="p-2 hover:bg-white/20 rounded-xl transition-colors"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>

//             {/* Result Summary Section */}
//             <div className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-b-2 border-purple-200">
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                 {/* Total Marks */}
//                 <div className="bg-white rounded-2xl p-4 shadow-md border-2 border-purple-200">
//                   <div className="text-xs font-medium text-gray-600 mb-1">Total Marks</div>
//                   <div className="text-2xl font-bold text-purple-600">{selectedExam.obtainedMarks}/{selectedExam.totalMarks}</div>
//                 </div>
                
//                 {/* Percentage */}
//                 <div className="bg-white rounded-2xl p-4 shadow-md border-2 border-pink-200">
//                   <div className="text-xs font-medium text-gray-600 mb-1">Percentage</div>
//                   <div className="text-2xl font-bold text-pink-600">{selectedExam.percentage}%</div>
//                 </div>
                
//                 {/* Overall Grade */}
//                 <div className="bg-white rounded-2xl p-4 shadow-md border-2 border-green-200">
//                   <div className="text-xs font-medium text-gray-600 mb-1">Overall Grade</div>
//                   <div className="flex items-center gap-2">
//                     <Award className="w-5 h-5 text-green-600" />
//                     <div className="text-2xl font-bold text-green-600">{selectedExam.overallGrade}</div>
//                   </div>
//                 </div>
                
//                 {/* Class Rank */}
//                 <div className="bg-white rounded-2xl p-4 shadow-md border-2 border-amber-200">
//                   <div className="text-xs font-medium text-gray-600 mb-1">Class Rank</div>
//                   <div className="flex items-center gap-2">
//                     <Trophy className="w-5 h-5 text-amber-600" />
//                     <div className="text-2xl font-bold text-amber-600">#{selectedExam.classRank}</div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Subject-wise Marks Table */}
//             <div className="p-8">
//               <div className="flex items-center gap-3 mb-6">
//                 <Target className="w-6 h-6 text-purple-600" />
//                 <h4 className="text-xl font-bold text-gray-900">Subject-wise Performance</h4>
//               </div>
              
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gradient-to-r from-purple-100 to-pink-100 border-b-2 border-purple-200">
//                     <tr>
//                       <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Subject</th>
//                       <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Marks Obtained</th>
//                       <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Total Marks</th>
//                       <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Percentage</th>
//                       <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Grade</th>
//                       <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-purple-100">
//                     {selectedExam.results.map((result, index) => {
//                       const percentage = (result.marks / result.totalMarks) * 100;
//                       return (
//                         <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-purple-50/30'} hover:bg-purple-100/50 transition-colors`}>
//                           <td className="px-6 py-4">
//                             <div className="font-semibold text-gray-900 flex items-center gap-2">
//                               <BookOpen className="w-4 h-4 text-purple-500" />
//                               {result.subject}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <div className="font-bold text-purple-600 text-lg">{result.marks}</div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <div className="text-gray-600 font-medium">{result.totalMarks}</div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <div className={`inline-block px-3 py-1.5 rounded-lg border-2 font-bold ${getMarksStyle(percentage)}`}>
//                               {percentage.toFixed(1)}%
//                             </div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <div className="flex items-center gap-2">
//                               <Star className={`w-5 h-5 ${getGradeColor(result.grade)}`} />
//                               <span className={`text-xl font-bold ${getGradeColor(result.grade)}`}>
//                                 {result.grade}
//                               </span>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-xs font-bold border-2 border-green-300">
//                               <CheckCircle className="w-4 h-4" />
//                               Pass
//                             </span>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Modal Footer */}
//             <div className="sticky bottom-0 bg-gray-50 px-8 py-4 flex items-center justify-between rounded-b-3xl border-t-2 border-purple-200">
//               <div className="flex items-center gap-2 text-sm text-gray-600">
//                 <TrendingUp className="w-4 h-4" />
//                 <span>Keep up the good work!</span>
//               </div>
//               <div className="flex gap-3">
//                 <button 
//                   onClick={closeResultModal}
//                   className="px-6 py-2 border-2 border-purple-300 rounded-xl text-gray-700 font-semibold hover:bg-purple-50 transition-colors"
//                 >
//                   Close
//                 </button>
//                 <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg">
//                   Download Report Card
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes slideUp {
//           from { transform: translateY(30px); opacity: 0; }
//           to { transform: translateY(0); opacity: 1; }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
//         .animate-slideUp {
//           animation: slideUp 0.4s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }





import React, { useState } from 'react';
import { Calendar, Award, TrendingUp, X, CheckCircle, Clock, BookOpen, Star, Trophy, Target } from 'lucide-react';

// Define the Result type
interface Result {
  subject: string;
  marks: number;
  totalMarks: number;
  grade: string;
  status: string;
}

// Define the Exam type
interface Exam {
  id: number;
  examName: string;
  subjects: number;
  status: 'completed' | 'upcoming' | 'cancelled';
  examDate: string;
  results: Result[] | null;
  totalMarks?: number;
  obtainedMarks?: number;
  percentage?: number;
  overallGrade?: string;
  classRank?: number;
}

export default function ExamsResultsScreen() {
  const [selectedStudent, setSelectedStudent] = useState('aarav');
  const [showResultModal, setShowResultModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);

  const students = [
    { id: 'aarav', name: 'Aarav', class: 'Class 8 A' },
    { id: 'ananya', name: 'Ananya', class: 'Class 5 B' }
  ];

  const examSummary = {
    totalExams: 5,
    completed: 3,
    upcoming: 2,
    academicYear: '2025–26'
  };

  const examsList: Exam[] = [
    {
      id: 1,
      examName: 'Mid Term Examination',
      subjects: 6,
      status: 'completed',
      examDate: '15 Jan 2026',
      results: [
        { subject: 'Mathematics', marks: 85, totalMarks: 100, grade: 'A', status: 'pass' },
        { subject: 'English', marks: 78, totalMarks: 100, grade: 'B+', status: 'pass' },
        { subject: 'Science', marks: 92, totalMarks: 100, grade: 'A+', status: 'pass' },
        { subject: 'Social Studies', marks: 88, totalMarks: 100, grade: 'A', status: 'pass' },
        { subject: 'Hindi', marks: 75, totalMarks: 100, grade: 'B', status: 'pass' },
        { subject: 'Computer Science', marks: 95, totalMarks: 100, grade: 'A+', status: 'pass' }
      ],
      totalMarks: 513,
      obtainedMarks: 513,
      percentage: 85.5,
      overallGrade: 'A',
      classRank: 3
    },
    {
      id: 2,
      examName: 'Unit Test - 1',
      subjects: 4,
      status: 'completed',
      examDate: '10 Dec 2025',
      results: [
        { subject: 'Mathematics', marks: 45, totalMarks: 50, grade: 'A', status: 'pass' },
        { subject: 'English', marks: 38, totalMarks: 50, grade: 'B+', status: 'pass' },
        { subject: 'Science', marks: 48, totalMarks: 50, grade: 'A+', status: 'pass' },
        { subject: 'Social Studies', marks: 42, totalMarks: 50, grade: 'A', status: 'pass' }
      ],
      totalMarks: 200,
      obtainedMarks: 173,
      percentage: 86.5,
      overallGrade: 'A',
      classRank: 2
    },
    {
      id: 3,
      examName: 'Pre-Board Examination',
      subjects: 6,
      status: 'completed',
      examDate: '5 Feb 2026',
      results: [
        { subject: 'Mathematics', marks: 72, totalMarks: 100, grade: 'B', status: 'pass' },
        { subject: 'English', marks: 68, totalMarks: 100, grade: 'B', status: 'pass' },
        { subject: 'Science', marks: 82, totalMarks: 100, grade: 'A', status: 'pass' },
        { subject: 'Social Studies', marks: 78, totalMarks: 100, grade: 'B+', status: 'pass' },
        { subject: 'Hindi', marks: 70, totalMarks: 100, grade: 'B', status: 'pass' },
        { subject: 'Computer Science', marks: 88, totalMarks: 100, grade: 'A', status: 'pass' }
      ],
      totalMarks: 600,
      obtainedMarks: 458,
      percentage: 76.3,
      overallGrade: 'B+',
      classRank: 5
    },
    {
      id: 4,
      examName: 'Unit Test - 2',
      subjects: 4,
      status: 'upcoming',
      examDate: '20 Feb 2026',
      results: null
    },
    {
      id: 5,
      examName: 'Annual Examination',
      subjects: 6,
      status: 'upcoming',
      examDate: '15 Mar 2026',
      results: null
    }
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-300';
      case 'upcoming':
        return 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 border-amber-300';
      case 'cancelled':
        return 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'upcoming':
        return <Clock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getMarksStyle = (percentage: number) => {
    if (percentage >= 80) return 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 text-green-700';
    if (percentage >= 60) return 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-300 text-amber-700';
    return 'bg-gradient-to-r from-red-50 to-rose-50 border-red-300 text-red-700';
  };

  const getGradeColor = (grade: string) => {
    if (grade.includes('A')) return 'text-green-600';
    if (grade.includes('B')) return 'text-blue-600';
    if (grade.includes('C')) return 'text-amber-600';
    return 'text-red-600';
  };

  const openResultModal = (exam: Exam) => {
    if (exam.status === 'completed' && exam.results) {
      setSelectedExam(exam);
      setShowResultModal(true);
    }
  };

  const closeResultModal = () => {
    setShowResultModal(false);
    setSelectedExam(null);
  };

  const currentStudent = students.find(s => s.id === selectedStudent);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Top Header - Sticky */}
      <div className="sticky top-0 z-10 bg-white border-b-2 border-purple-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Exams & Results
              </h1>
              <p className="text-sm text-gray-600 mt-1">Exam schedule & performance overview</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Student Selector */}
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="px-4 py-2 border-2 border-purple-300 rounded-xl bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
              >
                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name} – {student.class}
                  </option>
                ))}
              </select>
              {/* Academic Year Badge */}
              <div className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-md">
                {examSummary.academicYear}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Exams Card */}
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <BookOpen className="w-7 h-7" />
              </div>
              <div>
                <div className="text-sm font-medium opacity-90">Total Exams</div>
                <div className="text-xs opacity-75 mt-0.5">This academic year</div>
              </div>
            </div>
            <div className="text-5xl font-bold">{examSummary.totalExams}</div>
          </div>

          {/* Completed Card */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div>
                <div className="text-sm font-medium opacity-90">Completed</div>
                <div className="text-xs opacity-75 mt-0.5">Results available</div>
              </div>
            </div>
            <div className="text-5xl font-bold">{examSummary.completed}</div>
          </div>

          {/* Upcoming Card */}
          <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Clock className="w-7 h-7" />
              </div>
              <div>
                <div className="text-sm font-medium opacity-90">Upcoming</div>
                <div className="text-xs opacity-75 mt-0.5">Prepare well</div>
              </div>
            </div>
            <div className="text-5xl font-bold">{examSummary.upcoming}</div>
          </div>
        </div>

        {/* Exam List Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-purple-100">
          <div className="px-6 py-4 border-b-2 border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Exam Schedule & Results
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-100 to-pink-100 border-b-2 border-purple-200 sticky top-0">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Exam</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Subjects</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Exam Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100">
                {examsList.map((exam, index) => (
                  <tr 
                    key={exam.id} 
                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-purple-50/30'} hover:bg-purple-100/50 transition-colors`}
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{exam.examName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                          {exam.subjects}
                        </span>
                        <span className="text-gray-600 text-sm">subjects</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar className="w-4 h-4 text-purple-500" />
                        {exam.examDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border-2 shadow-sm ${getStatusStyle(exam.status)}`}>
                        {getStatusIcon(exam.status)}
                        {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {exam.status === 'completed' ? (
                        <button
                          onClick={() => openResultModal(exam)}
                          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                          View Results
                        </button>
                      ) : exam.status === 'upcoming' ? (
                        <span className="text-sm text-gray-500 italic">Not available yet</span>
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State - No Exams */}
        {examsList.length === 0 && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl p-12 text-center border-2 border-purple-200">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
              <Calendar className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              📅 No exams planned yet
            </h3>
            <p className="text-purple-700">Check back later for exam schedule</p>
          </div>
        )}
      </div>

      {/* Result Detail Modal */}
      {showResultModal && selectedExam && selectedExam.results && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white px-8 py-6 flex items-center justify-between rounded-t-3xl shadow-lg">
              <div>
                <h3 className="text-2xl font-bold">{selectedExam.examName}</h3>
                <p className="text-sm text-purple-100 mt-1">Detailed Performance Report</p>
              </div>
              <button 
                onClick={closeResultModal}
                className="p-2 hover:bg-white/20 rounded-xl transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Result Summary Section */}
            <div className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-b-2 border-purple-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {/* Total Marks */}
                <div className="bg-white rounded-2xl p-4 shadow-md border-2 border-purple-200">
                  <div className="text-xs font-medium text-gray-600 mb-1">Total Marks</div>
                  <div className="text-2xl font-bold text-purple-600">{selectedExam.obtainedMarks}/{selectedExam.totalMarks}</div>
                </div>
                
                {/* Percentage */}
                <div className="bg-white rounded-2xl p-4 shadow-md border-2 border-pink-200">
                  <div className="text-xs font-medium text-gray-600 mb-1">Percentage</div>
                  <div className="text-2xl font-bold text-pink-600">{selectedExam.percentage}%</div>
                </div>
                
                {/* Overall Grade */}
                <div className="bg-white rounded-2xl p-4 shadow-md border-2 border-green-200">
                  <div className="text-xs font-medium text-gray-600 mb-1">Overall Grade</div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-green-600" />
                    <div className="text-2xl font-bold text-green-600">{selectedExam.overallGrade}</div>
                  </div>
                </div>
                
                {/* Class Rank */}
                <div className="bg-white rounded-2xl p-4 shadow-md border-2 border-amber-200">
                  <div className="text-xs font-medium text-gray-600 mb-1">Class Rank</div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-600" />
                    <div className="text-2xl font-bold text-amber-600">#{selectedExam.classRank}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subject-wise Marks Table */}
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6 text-purple-600" />
                <h4 className="text-xl font-bold text-gray-900">Subject-wise Performance</h4>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-purple-100 to-pink-100 border-b-2 border-purple-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Subject</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Marks Obtained</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Total Marks</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Percentage</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Grade</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-100">
                    {selectedExam.results.map((result, index) => {
                      const percentage = (result.marks / result.totalMarks) * 100;
                      return (
                        <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-purple-50/30'} hover:bg-purple-100/50 transition-colors`}>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-900 flex items-center gap-2">
                              <BookOpen className="w-4 h-4 text-purple-500" />
                              {result.subject}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-purple-600 text-lg">{result.marks}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-gray-600 font-medium">{result.totalMarks}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className={`inline-block px-3 py-1.5 rounded-lg border-2 font-bold ${getMarksStyle(percentage)}`}>
                              {percentage.toFixed(1)}%
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Star className={`w-5 h-5 ${getGradeColor(result.grade)}`} />
                              <span className={`text-xl font-bold ${getGradeColor(result.grade)}`}>
                                {result.grade}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-xs font-bold border-2 border-green-300">
                              <CheckCircle className="w-4 h-4" />
                              Pass
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 px-8 py-4 flex items-center justify-between rounded-b-3xl border-t-2 border-purple-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TrendingUp className="w-4 h-4" />
                <span>Keep up the good work!</span>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={closeResultModal}
                  className="px-6 py-2 border-2 border-purple-300 rounded-xl text-gray-700 font-semibold hover:bg-purple-50 transition-colors"
                >
                  Close
                </button>
                <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg">
                  Download Report Card
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
