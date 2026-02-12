import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Calendar, Clock, Users, MapPin, Coffee, ChevronLeft, ChevronRight } from 'lucide-react';

// Type Definitions
interface Student {
  id: string;
  name: string;
  class: string;
}

interface Period {
  id: number;
  periodNumber: number;
  startTime: string;
  endTime: string;
  subject: string;
  subjectIcon: string;
  subjectColor: string;
  teacher: string;
  room: string;
  isFree: boolean;
  isBreak: boolean;
  breakType?: 'short' | 'lunch';
}

interface DaySchedule {
  day: string;
  date: string;
  isToday: boolean;
  isHoliday: boolean;
  holidayName?: string;
  periods: Period[];
}

type ViewMode = 'today' | 'week';

const TimetableScreen: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<string>('aarav');
  const [viewMode, setViewMode] = useState<ViewMode>('today');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const currentPeriodRef = useRef<HTMLDivElement>(null);

  const students: Student[] = [
    { id: 'aarav', name: 'Aarav', class: 'Class 8 A' },
    { id: 'ananya', name: 'Ananya', class: 'Class 5 B' }
  ];

  // Sample week schedule
  const weekSchedule: DaySchedule[] = [
    {
      day: 'Monday',
      date: '2025-02-10',
      isToday: true,
      isHoliday: false,
      periods: [
        {
          id: 1,
          periodNumber: 1,
          startTime: '09:00',
          endTime: '09:40',
          subject: 'English',
          subjectIcon: '📘',
          subjectColor: 'bg-blue-500',
          teacher: 'Ms. Priya Sharma',
          room: 'Room 301',
          isFree: false,
          isBreak: false
        },
        {
          id: 2,
          periodNumber: 2,
          startTime: '09:45',
          endTime: '10:25',
          subject: 'Mathematics',
          subjectIcon: '📐',
          subjectColor: 'bg-emerald-500',
          teacher: 'Mr. Rahul Verma',
          room: 'Room 205',
          isFree: false,
          isBreak: false
        },
        {
          id: 3,
          periodNumber: 0,
          startTime: '10:25',
          endTime: '10:40',
          subject: 'Short Break',
          subjectIcon: '☕',
          subjectColor: 'bg-amber-400',
          teacher: '',
          room: '',
          isFree: false,
          isBreak: true,
          breakType: 'short'
        },
        {
          id: 4,
          periodNumber: 3,
          startTime: '10:40',
          endTime: '11:20',
          subject: 'Science',
          subjectIcon: '🔬',
          subjectColor: 'bg-purple-500',
          teacher: 'Ms. Neha Iyer',
          room: 'Lab 1',
          isFree: false,
          isBreak: false
        },
        {
          id: 5,
          periodNumber: 4,
          startTime: '11:25',
          endTime: '12:05',
          subject: 'Social Science',
          subjectIcon: '🌍',
          subjectColor: 'bg-orange-500',
          teacher: 'Mr. Amit Das',
          room: 'Room 102',
          isFree: false,
          isBreak: false
        },
        {
          id: 6,
          periodNumber: 0,
          startTime: '12:05',
          endTime: '12:45',
          subject: 'Lunch Break',
          subjectIcon: '🍱',
          subjectColor: 'bg-amber-500',
          teacher: '',
          room: '',
          isFree: false,
          isBreak: true,
          breakType: 'lunch'
        },
        {
          id: 7,
          periodNumber: 5,
          startTime: '12:45',
          endTime: '13:25',
          subject: 'Computer Science',
          subjectIcon: '💻',
          subjectColor: 'bg-teal-500',
          teacher: 'Ms. Kavita Rao',
          room: 'Computer Lab',
          isFree: false,
          isBreak: false
        },
        {
          id: 8,
          periodNumber: 6,
          startTime: '13:30',
          endTime: '14:10',
          subject: 'Hindi',
          subjectIcon: '🌐',
          subjectColor: 'bg-pink-500',
          teacher: 'Ms. Anjali Mehta',
          room: 'Room 303',
          isFree: false,
          isBreak: false
        }
      ]
    },
    {
      day: 'Tuesday',
      date: '2025-02-11',
      isToday: false,
      isHoliday: false,
      periods: [
        {
          id: 9,
          periodNumber: 1,
          startTime: '09:00',
          endTime: '09:40',
          subject: 'Mathematics',
          subjectIcon: '📐',
          subjectColor: 'bg-emerald-500',
          teacher: 'Mr. Rahul Verma',
          room: 'Room 205',
          isFree: false,
          isBreak: false
        },
        {
          id: 10,
          periodNumber: 2,
          startTime: '09:45',
          endTime: '10:25',
          subject: 'English',
          subjectIcon: '📘',
          subjectColor: 'bg-blue-500',
          teacher: 'Ms. Priya Sharma',
          room: 'Room 301',
          isFree: false,
          isBreak: false
        },
        {
          id: 11,
          periodNumber: 0,
          startTime: '10:25',
          endTime: '10:40',
          subject: 'Short Break',
          subjectIcon: '☕',
          subjectColor: 'bg-amber-400',
          teacher: '',
          room: '',
          isFree: false,
          isBreak: true,
          breakType: 'short'
        },
        {
          id: 12,
          periodNumber: 3,
          startTime: '10:40',
          endTime: '11:20',
          subject: 'Physical Education',
          subjectIcon: '🏃',
          subjectColor: 'bg-lime-500',
          teacher: 'Coach Rahul Singh',
          room: 'Sports Ground',
          isFree: false,
          isBreak: false
        },
        {
          id: 13,
          periodNumber: 4,
          startTime: '11:25',
          endTime: '12:05',
          subject: 'Science',
          subjectIcon: '🔬',
          subjectColor: 'bg-purple-500',
          teacher: 'Ms. Neha Iyer',
          room: 'Lab 1',
          isFree: false,
          isBreak: false
        },
        {
          id: 14,
          periodNumber: 0,
          startTime: '12:05',
          endTime: '12:45',
          subject: 'Lunch Break',
          subjectIcon: '🍱',
          subjectColor: 'bg-amber-500',
          teacher: '',
          room: '',
          isFree: false,
          isBreak: true,
          breakType: 'lunch'
        },
        {
          id: 15,
          periodNumber: 5,
          startTime: '12:45',
          endTime: '13:25',
          subject: 'Free Period',
          subjectIcon: '📖',
          subjectColor: 'bg-slate-300',
          teacher: '',
          room: '',
          isFree: true,
          isBreak: false
        },
        {
          id: 16,
          periodNumber: 6,
          startTime: '13:30',
          endTime: '14:10',
          subject: 'Art',
          subjectIcon: '🎨',
          subjectColor: 'bg-rose-500',
          teacher: 'Ms. Deepa Kulkarni',
          room: 'Art Room',
          isFree: false,
          isBreak: false
        }
      ]
    },
    {
      day: 'Wednesday',
      date: '2025-02-12',
      isToday: false,
      isHoliday: false,
      periods: [] // Similar structure
    },
    {
      day: 'Thursday',
      date: '2025-02-13',
      isToday: false,
      isHoliday: false,
      periods: [] // Similar structure
    },
    {
      day: 'Friday',
      date: '2025-02-14',
      isToday: false,
      isHoliday: false,
      periods: [] // Similar structure
    }
  ];

  const todaySchedule = weekSchedule.find(day => day.isToday) || weekSchedule[0];

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll to current period on mount
  useEffect(() => {
    if (viewMode === 'today' && currentPeriodRef.current) {
      currentPeriodRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [viewMode]);

  const getCurrentPeriodStatus = (period: Period): 'ongoing' | 'upcoming' | 'completed' => {
    const now = currentTime;
    const currentTimeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    if (currentTimeStr >= period.startTime && currentTimeStr < period.endTime) {
      return 'ongoing';
    } else if (currentTimeStr < period.startTime) {
      return 'upcoming';
    } else {
      return 'completed';
    }
  };

  const findCurrentPeriod = (): Period | null => {
    return todaySchedule.periods.find(p => getCurrentPeriodStatus(p) === 'ongoing') || null;
  };

  const findNextPeriod = (): Period | null => {
    const upcomingPeriods = todaySchedule.periods.filter(p => getCurrentPeriodStatus(p) === 'upcoming');
    return upcomingPeriods[0] || null;
  };

  const currentPeriod = findCurrentPeriod();
  const nextPeriod = findNextPeriod();

  const academicClassesCount = todaySchedule.periods.filter(p => !p.isFree && !p.isBreak).length;
  const freePeriodsCount = todaySchedule.periods.filter(p => p.isFree).length;

  const getPeriodCardStyle = (period: Period): string => {
    const status = getCurrentPeriodStatus(period);
    if (period.isBreak) {
      return 'bg-amber-50 border-amber-200';
    } else if (period.isFree) {
      return 'bg-slate-50 border-slate-200';
    } else if (status === 'ongoing') {
      return 'bg-teal-50 border-teal-300 ring-2 ring-teal-200';
    } else if (status === 'completed') {
      return 'bg-slate-50 border-slate-200 opacity-60';
    }
    return 'bg-white border-slate-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP HEADER */}
        <div className="bg-gradient-to-r from-teal-100 to-white rounded-2xl p-8 mb-8 shadow-sm border border-teal-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-1">Timetable</h1>
              <p className="text-slate-600">Your child's daily class schedule</p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Student Selector */}
              <div className="relative">
                <select 
                  value={selectedStudent}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedStudent(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-3 pr-10 font-medium text-slate-700 cursor-pointer hover:border-teal-300 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {students.map((student: Student) => (
                    <option key={student.id} value={student.id}>
                      {student.name} – {student.class}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>

              {/* View Mode Selector */}
              <div className="bg-white border border-slate-200 rounded-xl p-1 flex gap-1">
                <button
                  onClick={() => setViewMode('today')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    viewMode === 'today' 
                      ? 'bg-teal-600 text-white shadow-sm' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={() => setViewMode('week')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    viewMode === 'week' 
                      ? 'bg-teal-600 text-white shadow-sm' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Week View
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* TODAY AT A GLANCE */}
        {viewMode === 'today' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Today's Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-600" />
                Today's Summary
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Total Periods</p>
                  <p className="text-2xl font-bold text-slate-800">{todaySchedule.periods.filter(p => !p.isBreak).length}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Academic Classes</p>
                  <p className="text-2xl font-bold text-teal-700">{academicClassesCount}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Free Periods</p>
                  <p className="text-2xl font-bold text-slate-600">{freePeriodsCount}</p>
                </div>
              </div>
            </div>

            {/* Current/Next Period */}
            <div className="bg-gradient-to-br from-teal-600 to-teal-500 rounded-2xl p-6 shadow-lg text-white">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Current Status
              </h3>
              
              {currentPeriod ? (
                <div className="space-y-3">
                  <div>
                    <p className="text-teal-100 text-sm mb-1">Now</p>
                    <p className="text-2xl font-bold flex items-center gap-2">
                      <span>{currentPeriod.subjectIcon}</span>
                      {currentPeriod.subject}
                    </p>
                    <p className="text-teal-100 text-sm mt-1">
                      {currentPeriod.startTime} – {currentPeriod.endTime}
                    </p>
                  </div>
                  {nextPeriod && !nextPeriod.isBreak && (
                    <div className="pt-3 border-t border-teal-400/30">
                      <p className="text-teal-100 text-sm mb-1">Next</p>
                      <p className="text-lg font-semibold flex items-center gap-2">
                        <span>{nextPeriod.subjectIcon}</span>
                        {nextPeriod.subject}
                      </p>
                      <p className="text-teal-100 text-sm">
                        {nextPeriod.startTime} – {nextPeriod.endTime}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-teal-100">No ongoing class right now</p>
                  {nextPeriod && (
                    <div className="mt-4">
                      <p className="text-sm text-teal-100 mb-1">Next Up</p>
                      <p className="text-xl font-bold">{nextPeriod.subject}</p>
                      <p className="text-teal-100 text-sm">{nextPeriod.startTime}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* DAILY TIMETABLE VIEW */}
        {viewMode === 'today' && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              {todaySchedule.day}'s Schedule
            </h2>
            
            {todaySchedule.isHoliday ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Today is a Holiday</h3>
                <p className="text-slate-600">{todaySchedule.holidayName || 'Enjoy your day off!'}</p>
              </div>
            ) : todaySchedule.periods.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                  📅
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">No Timetable Assigned</h3>
                <p className="text-slate-600">Timetable will be published soon</p>
              </div>
            ) : (
              todaySchedule.periods.map((period: Period) => {
                const status = getCurrentPeriodStatus(period);
                const isCurrentPeriod = status === 'ongoing';
                
                return (
                  <div
                    key={period.id}
                    ref={isCurrentPeriod ? currentPeriodRef : null}
                    className={`${getPeriodCardStyle(period)} border rounded-2xl p-5 shadow-sm transition-all duration-300 hover:shadow-md`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Left colored strip and icon */}
                      <div className="flex flex-col items-center gap-2">
                        {!period.isBreak && (
                          <div className={`${period.subjectColor} text-white w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm`}>
                            {period.subjectIcon}
                          </div>
                        )}
                        {period.isBreak && (
                          <div className={`${period.subjectColor} text-white w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm`}>
                            {period.subjectIcon}
                          </div>
                        )}
                        {!period.isBreak && period.periodNumber > 0 && (
                          <span className="text-xs font-semibold text-slate-500">Period {period.periodNumber}</span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                              {period.subject}
                              {isCurrentPeriod && (
                                <span className="px-2 py-0.5 bg-teal-600 text-white text-xs rounded-full font-semibold animate-pulse">
                                  Ongoing
                                </span>
                              )}
                              {period.isFree && (
                                <span className="px-2 py-0.5 bg-slate-400 text-white text-xs rounded-full font-semibold">
                                  Free Period
                                </span>
                              )}
                            </h3>
                            {!period.isBreak && !period.isFree && (
                              <p className="text-sm text-slate-600 flex items-center gap-1 mt-1">
                                <Users className="w-3.5 h-3.5" />
                                {period.teacher}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                              <Clock className="w-4 h-4 text-teal-600" />
                              {period.startTime} – {period.endTime}
                            </p>
                          </div>
                        </div>

                        {!period.isBreak && period.room && (
                          <p className="text-sm text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {period.room}
                          </p>
                        )}

                        {period.isBreak && period.breakType === 'lunch' && (
                          <p className="text-sm text-amber-700 font-medium">Time to refuel and relax</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* WEEK VIEW */}
        {viewMode === 'week' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-max">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 sticky left-0 bg-slate-50">
                      Time
                    </th>
                    {weekSchedule.slice(0, 5).map((day: DaySchedule) => (
                      <th key={day.day} className="px-4 py-3 text-center text-sm font-semibold text-slate-700 min-w-[180px]">
                        <div className={`${day.isToday ? 'text-teal-700 font-bold' : ''}`}>
                          {day.day}
                        </div>
                        <div className="text-xs text-slate-500 font-normal">{day.date}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Generate rows for each time slot */}
                  {todaySchedule.periods.map((period: Period, idx: number) => (
                    <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 text-sm font-medium text-slate-600 sticky left-0 bg-white">
                        {period.startTime}
                      </td>
                      {weekSchedule.slice(0, 5).map((day: DaySchedule) => {
                        const dayPeriod = day.periods[idx];
                        if (!dayPeriod) {
                          return <td key={day.day} className="px-2 py-3"></td>;
                        }
                        
                        return (
                          <td key={day.day} className="px-2 py-3">
                            {dayPeriod.isBreak ? (
                              <div className="bg-amber-100 border border-amber-200 rounded-lg p-2 text-center">
                                <p className="text-xs font-semibold text-amber-800">
                                  {dayPeriod.subjectIcon} {dayPeriod.subject}
                                </p>
                              </div>
                            ) : dayPeriod.isFree ? (
                              <div className="bg-slate-100 border border-slate-200 rounded-lg p-2 text-center">
                                <p className="text-xs font-semibold text-slate-600">Free Period</p>
                              </div>
                            ) : (
                              <div className={`border rounded-lg p-2 cursor-pointer hover:shadow-md transition-all ${
                                dayPeriod.subjectColor.replace('bg-', 'bg-opacity-10 bg-')
                              } border-${dayPeriod.subjectColor.split('-')[1]}-200`}>
                                <p className="text-xs font-bold text-slate-800 flex items-center gap-1">
                                  <span>{dayPeriod.subjectIcon}</span>
                                  {dayPeriod.subject}
                                </p>
                                <p className="text-xs text-slate-600 truncate mt-1">{dayPeriod.teacher}</p>
                                <p className="text-xs text-slate-500">{dayPeriod.room}</p>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default TimetableScreen;