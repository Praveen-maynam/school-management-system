import React from 'react';
import { Bell, Calendar, Wallet, BookOpen, FileText, School } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


function ParentDashboardScreen() {
  const parentName = 'Parent Name';
  const navigate = useNavigate();


  const student = {
    name: 'Student Name',
    class: 'Class 6-A',
    rollNo: '22',
    attendance: 80,
    avgMarks: 85,
    school: 'School Name',
  };

  const essentials = [
    { label: 'Attendance', icon: Calendar, color: '#2962FF', screen: '/parent/attendance' },
    { label: 'Fee Details', icon: Wallet, color: '#FF7043', screen: '/parent/fee-details' },
    { label: 'Homework', icon: BookOpen, color: '#43A047', screen: '/parent/homework' },
    { label: 'Exam & Progress Reports', icon: FileText, color: '#7C4DFF', screen: '/exam-reports' },
  ];

  const announcements = [
    {
      type: 'Homework',
      subject: 'Mathematics',
      desc: 'Mathematics - Due on 17-12-2025',
      time: '2 Hours ago',
      icon: BookOpen,
      color: '#43A047',
      title: 'New Homework Assigned'
    },
    {
      type: 'Test Results',
      subject: 'Science',
      desc: 'Science - Marks 92/100',
      time: '1 day ago',
      icon: FileText,
      color: '#7C4DFF',
      title: 'Test Results Published'
    },
  ];

  const handleNavigation = (screen: string) => {
    navigate(screen);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-white shadow-sm rounded-lg mb-6">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">
              Welcome, {parentName} <span className="text-2xl">👋</span>
            </h1>
            <p className="text-gray-600 text-sm mt-1">Track your Child's Progress</p>
          </div>
          <button className="bg-blue-50 p-3 rounded-2xl hover:bg-blue-100 transition">
            <Bell size={24} className="text-blue-600" />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Student Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white text-xl font-bold">S</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900">{student.name}</h3>
                <p className="text-gray-600">{student.class}</p>
              </div>
            </div>
            <div className="bg-gray-100 px-3 py-1 rounded-lg">
              <span className="text-gray-900 text-sm font-medium">Roll No: {student.rollNo}</span>
            </div>
          </div>
          
         <div
  className="flex gap-4 mt-4 pt-4 border-t border-gray-100 cursor-pointer hover:bg-gray-50 rounded-lg"
  onClick={() => navigate("/parent/attendance")}
>
  <div className="flex-1 text-center">
    <div className="text-3xl font-bold text-blue-600">
      {student.attendance}%
    </div>
    <div className="text-gray-600 text-sm mt-1">
      Attendance
    </div>
  </div>


            <div className="flex-1 text-center">
              <div className="text-3xl font-bold text-blue-600">{student.avgMarks}%</div>
              <div className="text-gray-600 text-sm mt-1">Avg Marks</div>
            </div>
          </div>
        </div>

        {/* School Banner */}
        <div className="bg-yellow-50 rounded-xl p-4 mb-6 flex items-center gap-3">
          <School size={24} className="text-gray-900" />
          <span className="font-bold text-gray-900">{student.school}</span>
        </div>

        {/* Essentials Grid */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Essentials</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {essentials.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item.screen)}
                  className="rounded-xl p-6 flex flex-col items-center gap-3 hover:shadow-md transition"
                  style={{ backgroundColor: item.color + '15' }}
                >
                  <Icon size={32} style={{ color: item.color }} />
                  <span className="font-medium text-gray-900 text-center text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Announcements */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Announcements</h2>
          <div className="space-y-4">
            {announcements.map((announcement, idx) => {
              const Icon = announcement.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition flex items-center gap-4"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: announcement.color + '25' }}
                  >
                    <Icon size={24} style={{ color: announcement.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-base">{announcement.title}</h3>
                    <p className="text-blue-600 font-medium text-sm mt-1">{announcement.desc}</p>
                    <p className="text-gray-500 text-xs mt-1">{announcement.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ParentDashboardScreen;







// import React, { useState } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const ParentDashboardScreen = () => {
//   const [currentMonth, setCurrentMonth] = useState('December 2025');
//   type AttendanceStatus = "Present" | "Absent" | "Late";
//   const attendanceData: Record<number, AttendanceStatus> = {
//     1: "Present",
//     2: "Absent",
//     3: "Present",
//     4: "Late",
//     5: "Present",
//   };
//  const handleNavigation = (screen: string) => {
//     navigate(screen);
//   };
//   const daysInMonth = 30;
//   const startDay = 1; // Monday

//   const getDayStatus = (day: number): AttendanceStatus | null => {
//     return attendanceData[day] ?? null;
//   };

//   const renderCalendar = () => {
//     const days = [];
//     const blanks = [];
    
//     // Add blank cells for days before month starts
//     for (let i = 0; i < startDay; i++) {
//       blanks.push(<div key={`blank-${i}`} className="h-12"></div>);
//     }

//     // Add day cells
//     for (let day = 1; day <= daysInMonth; day++) {
//       const status = getDayStatus(day);
//       days.push(
//         <div
//           key={day}
//           className={`h-12 flex items-center justify-center rounded-full font-medium text-base
//             ${status === "Present" ? "bg-green-500 text-white" : ""}
//             ${status === "Absent" ? "bg-red-500 text-white" : ""}
//             ${status === "Late" ? "bg-yellow-500 text-white" : ""}
//             ${!status ? "text-gray-700" : ""}
//           `}
//         >
//           {day}
//         </div>
//       );
//     }

//     return [...blanks, ...days];
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="bg-blue-600 text-white px-8 py-6">
//         <h1 className="text-3xl font-bold">Attendance</h1>
//         <p className="text-blue-100 mt-2">Track your attendance record</p>
//       </div>

//       {/* Content */}
//       <div className="max-w-5xl mx-auto p-8 space-y-6">
//         {/* Stats Card */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <div className="flex items-center justify-between mb-4">
//             <span className="text-gray-600 text-sm">This Month</span>
//             <div className="text-right">
//               <div className="font-semibold text-gray-900">5/30 days</div>
//               <div className="text-red-500 text-xs">Missed 1 day</div>
//             </div>
//           </div>
//           <div className="text-5xl font-bold text-blue-600 mb-4">80%</div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
//           </div>
//         </div>

//         {/* Calendar Card */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           {/* Month Selector */}
//           <div className="flex items-center justify-between mb-6">
//             <button className="p-2 hover:bg-gray-100 rounded-lg transition">
//               <ChevronLeft size={20} className="text-gray-600" />
//             </button>
//             <h2 className="text-lg font-semibold text-gray-900">{currentMonth}</h2>
//             <button className="p-2 hover:bg-gray-100 rounded-lg transition">
//               <ChevronRight size={20} className="text-gray-600" />
//             </button>
//           </div>

//           {/* Day Labels */}
//           <div className="grid grid-cols-7 gap-2 mb-2">
//             {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
//               <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
//                 {day}
//               </div>
//             ))}
//           </div>

//           {/* Calendar Grid */}
//           <div className="grid grid-cols-7 gap-2">
//             {renderCalendar()}
//           </div>

//           {/* Legend */}
//           <div className="flex items-center justify-center gap-8 mt-6 pt-6 border-t border-gray-200">
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 rounded-full bg-green-500"></div>
//               <span className="text-sm text-gray-700">Present</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 rounded-full bg-red-500"></div>
//               <span className="text-sm text-gray-700">Absent</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
//               <span className="text-sm text-gray-700">Late</span>
//             </div>
//           </div>
//         </div>

//         {/* Recent Absences */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Absences</h3>
//           <div className="space-y-3">
//             <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
//               <div>
//                 <div className="font-medium text-gray-900">Tuesday, Dec 2</div>
//                 <div className="text-sm text-gray-500">Full day absent</div>
//               </div>
//               <span className="px-3 py-1 bg-red-50 text-red-600 text-xs font-medium rounded-full border border-red-200">
//                 Absent
//               </span>
//             </div>
//             <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
//               <div>
//                 <div className="font-medium text-gray-900">Thursday, Dec 4</div>
//                 <div className="text-sm text-gray-500">Arrived late</div>
//               </div>
//               <span className="px-3 py-1 bg-yellow-50 text-yellow-600 text-xs font-medium rounded-full border border-yellow-200">
//                 Late
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ParentDashboardScreen;