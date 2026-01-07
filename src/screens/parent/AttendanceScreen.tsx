
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAttendance } from '../../context/AttendanceContext';
import { Attendance } from '../../types';

const AttendanceScreen = () => {
  const [currentMonth] = useState('December 2025');
  const navigate = useNavigate();
  const { attendance } = useAttendance();
  type AttendanceStatus = "Present" | "Absent" | "Late";

  // Assume childId is '1' for demo - in real app this comes from auth
  const childId = '1';

  // Filter attendance for this child
  const myChildAttendance = attendance.filter(a => a.studentId === childId);

  // Convert to day-based format for calendar display
  const attendanceData: Record<number, AttendanceStatus> = {};
  myChildAttendance.forEach(record => {
    const day = new Date(record.date).getDate();
    attendanceData[day] = record.status;
  });

  const daysInMonth = 30;
  const startDay = 1; // Monday

  const getDayStatus = (day: number): AttendanceStatus | null => {
    return attendanceData[day] ?? null;
  };

  const renderCalendar = () => {
    const days = [];
    const blanks = [];

    // Blank days before month start
    for (let i = 0; i < startDay; i++) {
      blanks.push(<div key={`blank-${i}`} className="h-12"></div>);
    }

    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const status = getDayStatus(day);

      days.push(
        <div
          key={day}
          className={`h-12 flex items-center justify-center rounded-full font-medium text-base
            ${status === "Present" ? "bg-green-500 text-white" : ""}
            ${status === "Absent" ? "bg-red-500 text-white" : ""}
            ${status === "Late" ? "bg-yellow-400 text-white" : ""}
            ${!status ? "text-gray-700" : ""}
          `}
        >
          {day}
        </div>
      );
    }

    return [...blanks, ...days];
  };

  // 👉 Recent Absent + Late records
  const recentRecords = Object.entries(attendanceData)
    .filter(([_, status]) => status === "Absent" || status === "Late")
    .slice(-5)
    .reverse();

  const totalMarkedDays = Object.keys(attendanceData).length;

  const presentDays = Object.values(attendanceData).filter(
    (s) => s === "Present"
  ).length;

  const absentDays = Object.values(attendanceData).filter(
    (s) => s === "Absent"
  ).length;

  const lateDays = Object.values(attendanceData).filter(
    (s) => s === "Late"
  ).length;

  // If late = half day, count it as 0.5 present (you can change this logic)
  const effectivePresentDays = presentDays + lateDays * 0.5;

  const attendancePercentage = Math.round(
    (effectivePresentDays / totalMarkedDays) * 100
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-blue-600 text-white rounded-lg px-6 py-4 flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="hover:bg-blue-700 rounded-full p-2 transition"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-semibold">Attendance</h1>
      </div>

      {/* Content */}
      <div className="space-y-6">

        {/* Stats Card */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600 text-sm">This Month</span>
            <div className="text-right">
              <div className="font-semibold text-gray-900">
                {totalMarkedDays}/{daysInMonth} days
              </div>

              <div className="text-red-500 text-xs">
                Absent {absentDays} day{absentDays !== 1 && "s"} • Late {lateDays}
              </div>
            </div>
          </div>

          <div className="text-5xl font-bold text-blue-600 mb-4">
            {attendancePercentage}%
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${attendancePercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Calendar Card */}
        <div className="bg-white rounded-xl shadow-md p-6">

          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900">
              {currentMonth}
            </h2>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Month Selector */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <span className="font-medium text-gray-900">December 2025</span>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Day Labels */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-gray-500 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {renderCalendar()}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-8 mt-6 pt-6 border-t border-gray-200">

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-700">Present</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
              <span className="text-sm text-gray-700">Late / Half Day</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-700">Absent</span>
            </div>

          </div>
        </div>

        {/* Recent Absent & Late */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Attendance Issues
          </h3>

          {recentRecords.length === 0 ? (
            <p className="text-sm text-gray-500 text-center">
              No absences or late days 🎉
            </p>
          ) : (
            <div className="space-y-3">
              {recentRecords.map(([day, status]) => (
                <div
                  key={day}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  <div>
                    <div className="font-medium text-gray-900">
                      December {day}, 2025
                    </div>
                    <div className="text-sm text-gray-500">
                      {status === "Late" ? "Late / Half day" : "Full day absent"}
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full border
                      ${
                        status === "Late"
                          ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                          : "bg-red-50 text-red-600 border-red-200"
                      }`}
                  >
                    {status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AttendanceScreen;













// import React, { useState } from 'react';
// import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useAttendance } from '../../context/AttendanceContext';
// import { Attendance } from '../../types';

// const AttendanceScreen = () => {
//   const [currentMonth] = useState('December 2025');
//   const navigate = useNavigate();
//   const { attendance } = useAttendance();
//   type AttendanceStatus = "Present" | "Absent" | "Late";

//   // Assume childId is '1' for demo - in real app this comes from auth
//   const childId = '1';

//   // Filter attendance for this child
//   const myChildAttendance = attendance.filter(a => a.studentId === childId);

//   // Convert to day-based format for calendar display
//   const attendanceData: Record<number, AttendanceStatus> = {};
//   myChildAttendance.forEach(record => {
//     const day = new Date(record.date).getDate();
//     attendanceData[day] = record.status;
//   });

//   const daysInMonth = 30;
//   const startDay = 1; // Monday

//   const getDayStatus = (day: number): AttendanceStatus | null => {
//     return attendanceData[day] ?? null;
//   };

//   const renderCalendar = () => {
//     const days = [];
//     const blanks = [];

//     // Blank days before month start
//     for (let i = 0; i < startDay; i++) {
//       blanks.push(<div key={`blank-${i}`} className="h-12"></div>);
//     }

//     // Actual days
//     for (let day = 1; day <= daysInMonth; day++) {
//       const status = getDayStatus(day);

//       days.push(
//         <div
//           key={day}
//           className={`h-12 flex items-center justify-center rounded-full font-medium text-base
//             ${status === "Present" ? "bg-green-500 text-white" : ""}
//             ${status === "Absent" ? "bg-red-500 text-white" : ""}
//             ${status === "Late" ? "bg-yellow-400 text-white" : ""}
//             ${!status ? "text-gray-700" : ""}
//           `}
//         >
//           {day}
//         </div>
//       );
//     }

//     return [...blanks, ...days];
//   };

//   // 👉 Recent Absent + Late records
//   const recentRecords = Object.entries(attendanceData)
//     .filter(([_, status]) => status === "Absent" || status === "Late")
//     .slice(-5)
//     .reverse();

//   const totalMarkedDays = Object.keys(attendanceData).length;

//   const presentDays = Object.values(attendanceData).filter(
//     (s) => s === "Present"
//   ).length;

//   const absentDays = Object.values(attendanceData).filter(
//     (s) => s === "Absent"
//   ).length;

//   const lateDays = Object.values(attendanceData).filter(
//     (s) => s === "Late"
//   ).length;

//   // If late = half day, count it as 0.5 present (you can change this logic)
//   const effectivePresentDays = presentDays + lateDays * 0.5;

//   const attendancePercentage = Math.round(
//     (effectivePresentDays / totalMarkedDays) * 100
//   );

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="bg-blue-600 text-white rounded-lg px-6 py-4 flex items-center gap-4 mb-6">
//         <button
//           onClick={() => navigate(-1)}
//           className="hover:bg-blue-700 rounded-full p-2 transition"
//         >
//           <ArrowLeft size={24} />
//         </button>
//         <h1 className="text-2xl font-semibold">Attendance</h1>
//       </div>

//       {/* Content */}
//       <div className="space-y-6">

//         {/* Stats Card */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <div className="flex items-center justify-between mb-4">
//             <span className="text-gray-600 text-sm">This Month</span>
//             <div className="text-right">
//               <div className="font-semibold text-gray-900">
//                 {totalMarkedDays}/{daysInMonth} days
//               </div>

//               <div className="text-red-500 text-xs">
//                 Absent {absentDays} day{absentDays !== 1 && "s"} • Late {lateDays}
//               </div>
//             </div>
//           </div>

//           <div className="text-5xl font-bold text-blue-600 mb-4">
//             {attendancePercentage}%
//           </div>

//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div
//               className="bg-blue-600 h-2 rounded-full"
//               style={{ width: `${attendancePercentage}%` }}
//             ></div>
//           </div>
//         </div>

//         {/* Calendar Card */}
//         <div className="bg-white rounded-xl shadow-md p-6">

//           {/* Calendar Header */}
//           <div className="flex items-center justify-between mb-6">
//             <button className="p-2 hover:bg-gray-100 rounded-lg transition">
//               <ChevronLeft size={20} className="text-gray-600" />
//             </button>
//             <h2 className="text-lg font-semibold text-gray-900">
//               {currentMonth}
//             </h2>
//             <button className="p-2 hover:bg-gray-100 rounded-lg transition">
//               <ChevronRight size={20} className="text-gray-600" />
//             </button>
//           </div>

//           {/* Month Selector */}
//           <div className="flex items-center justify-center gap-4 mb-6">
//             <button className="p-2 hover:bg-gray-100 rounded-lg transition">
//               <ChevronLeft size={20} className="text-gray-600" />
//             </button>
//             <span className="font-medium text-gray-900">December 2025</span>
//             <button className="p-2 hover:bg-gray-100 rounded-lg transition">
//               <ChevronRight size={20} className="text-gray-600" />
//             </button>
//           </div>

//           {/* Day Labels */}
//           <div className="grid grid-cols-7 gap-2 mb-2">
//             {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
//               <div
//                 key={day}
//                 className="text-center text-xs font-medium text-gray-500 py-2"
//               >
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
//               <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
//               <span className="text-sm text-gray-700">Late / Half Day</span>
//             </div>

//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 rounded-full bg-red-500"></div>
//               <span className="text-sm text-gray-700">Absent</span>
//             </div>

//           </div>
//         </div>

//         {/* Recent Absent & Late */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">
//             Recent Attendance Issues
//           </h3>

//           {recentRecords.length === 0 ? (
//             <p className="text-sm text-gray-500 text-center">
//               No absences or late days 🎉
//             </p>
//           ) : (
//             <div className="space-y-3">
//               {recentRecords.map(([day, status]) => (
//                 <div
//                   key={day}
//                   className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
//                 >
//                   <div>
//                     <div className="font-medium text-gray-900">
//                       December {day}, 2025
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       {status === "Late" ? "Late / Half day" : "Full day absent"}
//                     </div>
//                   </div>

//                   <span
//                     className={`px-3 py-1 text-xs font-medium rounded-full border
//                       ${
//                         status === "Late"
//                           ? "bg-yellow-50 text-yellow-700 border-yellow-200"
//                           : "bg-red-50 text-red-600 border-red-200"
//                       }`}
//                   >
//                     {status}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default AttendanceScreen;
