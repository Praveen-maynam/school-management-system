import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AttendanceScreen = () => {
  const [currentMonth, setCurrentMonth] = useState('December 2025');
  type AttendanceStatus = "Present" | "Absent" | "Late";


 const attendanceData: Record<number, AttendanceStatus> = {
  1: "Present",  
  2: "Absent",
  3: "Present",
  4: "Late",
  5: "Present",
};

const navigate = useNavigate();

  const daysInMonth = 30;
  const startDay = 1; // Monday

  const getDayStatus = (day: number): AttendanceStatus | null => {
  return attendanceData[day] ?? null;
};


  const renderCalendar = () => {
    const days = [];
    const blanks = [];
    
    // Add blank cells for days before month starts
    for (let i = 0; i < startDay; i++) {
      blanks.push(<div key={`blank-${i}`} className="h-12"></div>);
    }

    // Add day cells
    for (let day = 1; day <= daysInMonth; day++) {
      const status = getDayStatus(day);
      days.push(
        <div
          key={day}
          className={`h-12 flex items-center justify-center rounded-full font-medium text-base
           ${status === "Present" ? "bg-green-500 text-white" : ""}
${status === "Absent" ? "bg-red-500 text-white" : ""}
${!status ? "text-gray-700" : ""}

          `}
        >
          {day}
        </div>
      );
    }

    return [...blanks, ...days];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white px-8 py-5 flex items-center gap-4">
        <button className="hover:bg-blue-700 rounded-full p-2 transition">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-semibold">Attendance</h1>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-8 space-y-6">
        {/* Stats Card */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600 text-sm">This Month</span>
            <div className="text-right">
              <div className="font-semibold text-gray-900">5/30 days</div>
              <div className="text-red-500 text-xs">Missed 1 days</div>
            </div>
          </div>
          <div className="text-5xl font-bold text-blue-600 mb-4">80%</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
          </div>
        </div>

        {/* Calendar Card */}
        <div className="bg-white rounded-xl shadow-md p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900">{currentMonth}</h2>
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
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
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
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-700">Absent</span>
            </div>
          </div>
        </div>

        {/* Recent Absences */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Absences</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <div>
                <div className="font-medium text-gray-900">Friday, Dec 3</div>
                <div className="text-sm text-gray-500">Full day absent</div>
              </div>
              <span className="px-3 py-1 bg-red-50 text-red-600 text-xs font-medium rounded-full border border-red-200">
                Absent
              </span>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <div>
                <div className="font-medium text-gray-900">Friday, Dec 3</div>
                <div className="text-sm text-gray-500">Full day absent</div>
              </div>
              <span className="px-3 py-1 bg-red-50 text-red-600 text-xs font-medium rounded-full border border-red-200">
                Absent
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AttendanceScreen;
