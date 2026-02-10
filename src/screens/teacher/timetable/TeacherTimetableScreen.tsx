import React, { useState, useEffect } from 'react';
import { 
  Calendar,
  Clock,
  Book,
  Users,
  Coffee,
  CheckCircle,
  Circle,
  PlayCircle,
  MapPin,
  ChevronRight,
  Download,
  Filter,
  ChevronLeft,
  X,
  ClipboardCheck,
  Edit3,
  Briefcase,
  BookOpen
} from 'lucide-react';

// Types
interface Period {
  id: string;
  periodNumber: number;
  startTime: string;
  endTime: string;
  subject: string;
  classSection: string;
  room: string;
  status: 'completed' | 'current' | 'upcoming' | 'free';
  students: number;
}

interface DaySummary {
  totalPeriods: number;
  classesToday: number;
  freePeriods: number;
  nextClass: {
    classSection: string;
    subject: string;
    time: string;
  } | null;
}

interface WeekDay {
  day: string;
  date: string;
  isToday: boolean;
  periods: Period[];
}

// Mock Data
const getCurrentTime = () => {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes(); // minutes since midnight
};

const isCurrentPeriod = (start: string, end: string) => {
  const parseTime = (timeStr: string) => {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };
  
  const currentMinutes = getCurrentTime();
  const startMinutes = parseTime(start);
  const endMinutes = parseTime(end);
  
  return currentMinutes >= startMinutes && currentMinutes < endMinutes;
};

const mockTodayPeriods: Period[] = [
  {
    id: '1',
    periodNumber: 1,
    startTime: '8:00 AM',
    endTime: '8:45 AM',
    subject: 'Mathematics',
    classSection: '8-A',
    room: 'Room 201',
    status: 'completed',
    students: 35
  },
  {
    id: '2',
    periodNumber: 2,
    startTime: '8:45 AM',
    endTime: '9:30 AM',
    subject: 'Mathematics',
    classSection: '8-B',
    room: 'Room 201',
    status: 'completed',
    students: 32
  },
  {
    id: '3',
    periodNumber: 3,
    startTime: '9:45 AM',
    endTime: '10:30 AM',
    subject: 'Free Period',
    classSection: '',
    room: '',
    status: 'free',
    students: 0
  },
  {
    id: '4',
    periodNumber: 4,
    startTime: '10:30 AM',
    endTime: '11:15 AM',
    subject: 'Mathematics',
    classSection: '9-A',
    room: 'Room 201',
    status: 'current',
    students: 38
  },
  {
    id: '5',
    periodNumber: 5,
    startTime: '11:15 AM',
    endTime: '12:00 PM',
    subject: 'Mathematics',
    classSection: '9-B',
    room: 'Room 201',
    status: 'upcoming',
    students: 36
  },
  {
    id: '6',
    periodNumber: 6,
    startTime: '12:45 PM',
    endTime: '1:30 PM',
    subject: 'Mathematics',
    classSection: '10-A',
    room: 'Room 201',
    status: 'upcoming',
    students: 40
  },
  {
    id: '7',
    periodNumber: 7,
    startTime: '1:30 PM',
    endTime: '2:15 PM',
    subject: 'Free Period',
    classSection: '',
    room: '',
    status: 'free',
    students: 0
  },
  {
    id: '8',
    periodNumber: 8,
    startTime: '2:15 PM',
    endTime: '3:00 PM',
    subject: 'Mathematics',
    classSection: '10-B',
    room: 'Room 201',
    status: 'upcoming',
    students: 37
  }
];

const mockWeekData: WeekDay[] = [
  {
    day: 'Monday',
    date: '2024-02-05',
    isToday: true,
    periods: mockTodayPeriods
  },
  {
    day: 'Tuesday',
    date: '2024-02-06',
    isToday: false,
    periods: [
      {
        id: 't1',
        periodNumber: 1,
        startTime: '8:00 AM',
        endTime: '8:45 AM',
        subject: 'Mathematics',
        classSection: '8-A',
        room: 'Room 201',
        status: 'upcoming',
        students: 35
      },
      {
        id: 't2',
        periodNumber: 2,
        startTime: '8:45 AM',
        endTime: '9:30 AM',
        subject: 'Free Period',
        classSection: '',
        room: '',
        status: 'free',
        students: 0
      }
    ]
  },
  {
    day: 'Wednesday',
    date: '2024-02-07',
    isToday: false,
    periods: [
      {
        id: 'w1',
        periodNumber: 1,
        startTime: '8:00 AM',
        endTime: '8:45 AM',
        subject: 'Mathematics',
        classSection: '9-A',
        room: 'Room 201',
        status: 'upcoming',
        students: 38
      }
    ]
  }
];

const TeacherTimetable: React.FC = () => {
  const [activeView, setActiveView] = useState<'today' | 'week' | 'full'>('today');
  const [selectedPeriod, setSelectedPeriod] = useState<Period | null>(null);
  const [showQuickActions, setShowQuickActions] = useState(false);

  const todaySummary: DaySummary = {
    totalPeriods: mockTodayPeriods.length,
    classesToday: mockTodayPeriods.filter(p => p.status !== 'free').length,
    freePeriods: mockTodayPeriods.filter(p => p.status === 'free').length,
    nextClass: {
      classSection: '9-A',
      subject: 'Mathematics',
      time: '10:30 AM'
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current':
        return 'border-emerald-500 bg-emerald-50';
      case 'upcoming':
        return 'border-gray-200 bg-white';
      case 'completed':
        return 'border-gray-200 bg-gray-50 opacity-60';
      case 'free':
        return 'border-gray-200 bg-gray-50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'current':
        return <PlayCircle className="text-emerald-600" size={20} />;
      case 'upcoming':
        return <Circle className="text-gray-400" size={20} />;
      case 'completed':
        return <CheckCircle className="text-gray-400" size={20} />;
      case 'free':
        return <Coffee className="text-gray-400" size={20} />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'current':
        return (
          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold animate-pulse">
            Current
          </span>
        );
      case 'upcoming':
        return (
          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold">
            Upcoming
          </span>
        );
      case 'completed':
        return (
          <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-semibold">
            Completed
          </span>
        );
      case 'free':
        return (
          <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-semibold">
            Free Period
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                My Timetable
              </h1>
              <p className="text-gray-600">Your daily and weekly teaching schedule</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700">
                Academic Year 2024-25
              </div>
              <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-semibold flex items-center gap-2">
                <Calendar size={16} />
                Today: Feb 05, 2024
              </div>
            </div>
          </div>

          {/* View Selector */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveView('today')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeView === 'today'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setActiveView('week')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeView === 'week'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setActiveView('full')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeView === 'full'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Full Timetable
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Today View */}
        {activeView === 'today' && (
          <>
            {/* Today Summary Strip */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Book className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{todaySummary.totalPeriods}</div>
                    <div className="text-sm text-gray-500">Total Periods Today</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Users className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{todaySummary.classesToday}</div>
                    <div className="text-sm text-gray-500">Classes Today</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Coffee className="text-gray-600" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{todaySummary.freePeriods}</div>
                    <div className="text-sm text-gray-500">Free Periods</div>
                  </div>
                </div>

                {todaySummary.nextClass && (
                  <div className="flex items-center gap-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4">
                    <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                      <ChevronRight className="text-white" size={24} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Next Class</div>
                      <div className="font-bold text-gray-900">{todaySummary.nextClass.classSection} | {todaySummary.nextClass.subject}</div>
                      <div className="text-sm text-emerald-600 font-semibold">{todaySummary.nextClass.time}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Periods List */}
            <div className="space-y-3">
              {mockTodayPeriods.map((period) => (
                <div
                  key={period.id}
                  onClick={() => {
                    if (period.status !== 'free') {
                      setSelectedPeriod(period);
                      setShowQuickActions(true);
                    }
                  }}
                  className={`border-2 rounded-2xl p-5 transition-all duration-200 ${getStatusColor(
                    period.status
                  )} ${
                    period.status !== 'free' ? 'cursor-pointer hover:shadow-md' : ''
                  } ${period.status === 'current' ? 'shadow-lg scale-[1.02]' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    {/* Left: Time & Period */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(period.status)}
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Period {period.periodNumber}</div>
                          <div className="flex items-center gap-2 text-gray-700 font-semibold">
                            <Clock size={16} />
                            {period.startTime} – {period.endTime}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Center: Class Details */}
                    {period.status !== 'free' ? (
                      <div className="flex-1 mx-8">
                        <div className="flex items-center gap-4">
                          <div>
                            <div className="text-xl font-bold text-gray-900 mb-1">
                              {period.classSection}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <BookOpen size={14} />
                                {period.subject}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin size={14} />
                                {period.room}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users size={14} />
                                {period.students} students
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 mx-8">
                        <div className="text-xl font-semibold text-gray-400">Free Period</div>
                        <div className="text-sm text-gray-400">Time to relax or prepare</div>
                      </div>
                    )}

                    {/* Right: Status Badge */}
                    <div className="flex items-center gap-3">
                      {getStatusBadge(period.status)}
                      {period.status !== 'free' && period.status !== 'completed' && (
                        <ChevronRight className="text-gray-400" size={20} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Week View */}
        {activeView === 'week' && (
          <div className="space-y-6">
            {mockWeekData.map((day) => (
              <div key={day.date} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${day.isToday ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                    <h3 className="text-xl font-bold text-gray-900">{day.day}</h3>
                    <span className="text-sm text-gray-500">{day.date}</span>
                    {day.isToday && (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                        Today
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {day.periods.filter(p => p.status !== 'free').length} classes
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {day.periods.map((period) => (
                    <div
                      key={period.id}
                      className={`border-2 rounded-xl p-4 transition-all ${
                        period.status === 'free'
                          ? 'border-gray-200 bg-gray-50'
                          : 'border-emerald-200 bg-emerald-50 hover:shadow-md cursor-pointer'
                      }`}
                      onClick={() => {
                        if (period.status !== 'free') {
                          setSelectedPeriod(period);
                          setShowQuickActions(true);
                        }
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-gray-500">Period {period.periodNumber}</span>
                        {period.status === 'free' ? (
                          <Coffee className="text-gray-400" size={16} />
                        ) : (
                          <Book className="text-emerald-600" size={16} />
                        )}
                      </div>
                      
                      {period.status !== 'free' ? (
                        <>
                          <div className="font-bold text-gray-900 mb-1">{period.classSection}</div>
                          <div className="text-sm text-gray-600 mb-2">{period.subject}</div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock size={12} />
                            {period.startTime}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="font-semibold text-gray-400 mb-1">Free Period</div>
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Clock size={12} />
                            {period.startTime}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Full Timetable View */}
        {activeView === 'full' && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="px-4 py-4 text-left text-sm font-semibold text-gray-600 bg-gray-50 rounded-tl-xl">
                      Period / Day
                    </th>
                    {mockWeekData.slice(0, 5).map((day) => (
                      <th
                        key={day.date}
                        className={`px-4 py-4 text-center text-sm font-semibold ${
                          day.isToday
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-gray-50 text-gray-600'
                        }`}
                      >
                        <div>{day.day}</div>
                        <div className="text-xs font-normal text-gray-500">{day.date}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((periodNum) => (
                    <tr key={periodNum} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-4 font-semibold text-gray-700 bg-gray-50">
                        Period {periodNum}
                      </td>
                      {mockWeekData.slice(0, 5).map((day) => {
                        const period = day.periods.find(p => p.periodNumber === periodNum);
                        return (
                          <td
                            key={`${day.date}-${periodNum}`}
                            className={`px-4 py-4 text-center ${
                              period?.status === 'current' ? 'bg-emerald-50' : ''
                            }`}
                          >
                            {period ? (
                              period.status === 'free' ? (
                                <div className="text-gray-400 text-sm">Free</div>
                              ) : (
                                <div
                                  className="cursor-pointer hover:bg-emerald-100 rounded-lg p-2 transition-colors"
                                  onClick={() => {
                                    setSelectedPeriod(period);
                                    setShowQuickActions(true);
                                  }}
                                >
                                  <div className="font-semibold text-gray-900 text-sm">
                                    {period.classSection}
                                  </div>
                                  <div className="text-xs text-gray-600">{period.subject}</div>
                                  <div className="text-xs text-gray-500">{period.room}</div>
                                </div>
                              )
                            ) : (
                              <div className="text-gray-300">—</div>
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

      {/* Quick Actions Modal */}
      {showQuickActions && selectedPeriod && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold">{selectedPeriod.classSection}</h3>
                <button
                  onClick={() => setShowQuickActions(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex items-center gap-4 text-emerald-100">
                <div className="flex items-center gap-1">
                  <Book size={16} />
                  {selectedPeriod.subject}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  {selectedPeriod.startTime}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  {selectedPeriod.room}
                </div>
              </div>
            </div>

            <div className="p-6 space-y-3">
              <button className="w-full px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <Users size={20} />
                  <span>View Students</span>
                </div>
                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>

              <button className="w-full px-6 py-4 bg-blue-50 text-blue-700 rounded-xl font-semibold hover:bg-blue-100 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <ClipboardCheck size={20} />
                  <span>Mark Attendance</span>
                </div>
                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>

              <button className="w-full px-6 py-4 bg-purple-50 text-purple-700 rounded-xl font-semibold hover:bg-purple-100 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <Edit3 size={20} />
                  <span>Enter Marks</span>
                </div>
                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>

              <button className="w-full px-6 py-4 bg-orange-50 text-orange-700 rounded-xl font-semibold hover:bg-orange-100 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <Briefcase size={20} />
                  <span>Open Class Workspace</span>
                </div>
                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>{selectedPeriod.students} Students</span>
                  </div>
                  <div className="text-gray-400">Period {selectedPeriod.periodNumber}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherTimetable;