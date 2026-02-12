import React, { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, Users, X, AlertCircle } from 'lucide-react';

// Type Definitions
interface Student {
  id: string;
  name: string;
  class: string;
}

interface CalendarEvent {
  id: number;
  date: string;
  title: string;
  type: 'holiday' | 'exam' | 'event' | 'activity' | 'deadline';
  description: string;
  applicableClass?: string;
  startDate?: string;
  endDate?: string;
  time?: string;
  location?: string;
}

interface DayCell {
  date: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

const AcademicCalendarScreen: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<string>('aarav');
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 1, 1)); // February 2026
  const [selectedDay, setSelectedDay] = useState<DayCell | null>(null);
  const [showDayPanel, setShowDayPanel] = useState<boolean>(false);

  const students: Student[] = [
    { id: 'aarav', name: 'Aarav', class: 'Class 8 A' },
    { id: 'ananya', name: 'Ananya', class: 'Class 5 B' }
  ];

  const events: CalendarEvent[] = [
    {
      id: 1,
      date: '2026-02-10',
      title: 'Mid-Term Exam Begins',
      type: 'exam',
      description: 'Mid-term examinations start for all classes',
      applicableClass: 'All Classes',
      startDate: '2026-02-10',
      endDate: '2026-02-15',
      time: '09:00 AM'
    },
    {
      id: 2,
      date: '2026-02-11',
      title: 'Mid-Term Exam - Day 2',
      type: 'exam',
      description: 'Mathematics and Science exams',
      applicableClass: 'Class 8 A',
      time: '09:00 AM'
    },
    {
      id: 3,
      date: '2026-02-12',
      title: 'Mid-Term Exam - Day 3',
      type: 'exam',
      description: 'Social Science and Computer exam',
      applicableClass: 'Class 8 A',
      time: '09:00 AM'
    },
    {
      id: 4,
      date: '2026-02-14',
      title: 'Valentine\'s Day Celebration',
      type: 'event',
      description: 'Special assembly and activities',
      applicableClass: 'All Classes',
      time: '10:00 AM',
      location: 'School Auditorium'
    },
    {
      id: 5,
      date: '2026-02-15',
      title: 'Fee Payment Deadline',
      type: 'deadline',
      description: 'Last date for term fee payment without late fee',
      applicableClass: 'All Classes'
    },
    {
      id: 6,
      date: '2026-02-20',
      title: 'Parent-Teacher Meeting',
      type: 'event',
      description: 'Quarterly PTM for discussing student progress',
      applicableClass: 'All Classes',
      time: '02:00 PM - 05:00 PM',
      location: 'Respective Classrooms'
    },
    {
      id: 7,
      date: '2026-02-26',
      title: 'Republic Day',
      type: 'holiday',
      description: 'School holiday',
      applicableClass: 'All Classes'
    },
    {
      id: 8,
      date: '2026-02-28',
      title: 'Science Exhibition',
      type: 'activity',
      description: 'Annual science project exhibition',
      applicableClass: 'Class 6-10',
      time: '10:00 AM - 03:00 PM',
      location: 'Science Labs'
    },
    {
      id: 9,
      date: '2026-03-08',
      title: 'International Women\'s Day',
      type: 'event',
      description: 'Special assembly celebrating women achievers',
      applicableClass: 'All Classes',
      time: '09:30 AM',
      location: 'School Ground'
    }
  ];

  const eventTypeConfig = {
    holiday: {
      color: 'bg-green-100 text-green-700 border-green-300',
      dotColor: 'bg-green-500',
      bgColor: 'bg-green-50',
      label: '🟢 Holiday',
      icon: '🎉'
    },
    exam: {
      color: 'bg-amber-100 text-amber-700 border-amber-300',
      dotColor: 'bg-amber-500',
      bgColor: 'bg-amber-50',
      label: '🟨 Exam / Assessment',
      icon: '📝'
    },
    event: {
      color: 'bg-blue-100 text-blue-700 border-blue-300',
      dotColor: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      label: '🟦 School Event',
      icon: '🎪'
    },
    activity: {
      color: 'bg-purple-100 text-purple-700 border-purple-300',
      dotColor: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      label: '🟪 Activity / Competition',
      icon: '🏆'
    },
    deadline: {
      color: 'bg-red-100 text-red-700 border-red-300',
      dotColor: 'bg-red-500',
      bgColor: 'bg-red-50',
      label: '🟥 Important Deadline',
      icon: '⏰'
    }
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number): number => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Convert to Mon=0, Sun=6
  };

  const generateCalendarDays = (): DayCell[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const today = new Date();
    
    const days: DayCell[] = [];

    // Previous month days
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);
    
    for (let i = firstDay - 1; i >= 0; i--) {
      const date = daysInPrevMonth - i;
      days.push({
        date,
        month: prevMonth,
        year: prevYear,
        isCurrentMonth: false,
        isToday: false,
        events: []
      });
    }

    // Current month days
    for (let date = 1; date <= daysInMonth; date++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
      const dayEvents = events.filter(e => e.date === dateStr);
      
      days.push({
        date,
        month,
        year,
        isCurrentMonth: true,
        isToday: today.getDate() === date && today.getMonth() === month && today.getFullYear() === year,
        events: dayEvents
      });
    }

    // Next month days
    const remainingDays = 42 - days.length; // 6 weeks grid
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    
    for (let date = 1; date <= remainingDays; date++) {
      days.push({
        date,
        month: nextMonth,
        year: nextYear,
        isCurrentMonth: false,
        isToday: false,
        events: []
      });
    }

    return days;
  };

  const goToPreviousMonth = (): void => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = (): void => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = (): void => {
    setCurrentDate(new Date());
  };

  const handleDayClick = (day: DayCell): void => {
    if (day.isCurrentMonth) {
      setSelectedDay(day);
      setShowDayPanel(true);
    }
  };

  const closeDayPanel = (): void => {
    setShowDayPanel(false);
    setSelectedDay(null);
  };

  const getUpcomingEvents = (): CalendarEvent[] => {
    const today = new Date();
    return events
      .filter(e => new Date(e.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);
  };

  const formatRelativeDate = (dateStr: string): string => {
    const eventDate = new Date(dateStr);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `In ${diffDays} days`;
    return eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const calendarDays = generateCalendarDays();
  const upcomingEvents = getUpcomingEvents();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP HEADER */}
        <div className="bg-gradient-to-r from-teal-100 to-white rounded-2xl p-8 mb-8 shadow-sm border border-teal-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-1">Academic Calendar</h1>
              <p className="text-slate-600">School holidays, exams & activities</p>
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

              {/* Academic Year */}
              <div className="bg-amber-400 text-amber-900 px-4 py-3 rounded-xl font-bold flex items-center gap-2 shadow-sm">
                <CalendarIcon className="w-4 h-4" />
                2025-26
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* LEFT COLUMN - Calendar Legend & Upcoming Events */}
          <div className="lg:col-span-1 space-y-6">
            {/* CALENDAR LEGEND */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Legend</h3>
              <div className="space-y-3">
                {Object.entries(eventTypeConfig).map(([type, config]) => (
                  <div key={type} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${config.dotColor}`}></div>
                    <span className="text-sm text-slate-700">{config.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* UPCOMING EVENTS */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Upcoming Events</h3>
              <div className="space-y-3">
                {upcomingEvents.map((event: CalendarEvent) => (
                  <div 
                    key={event.id}
                    className={`${eventTypeConfig[event.type].bgColor} border ${eventTypeConfig[event.type].color.split(' ')[2]} rounded-xl p-3`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-xl">{eventTypeConfig[event.type].icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-slate-800 truncate">{event.title}</p>
                        <p className="text-xs text-slate-600 mt-1">{formatRelativeDate(event.date)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Calendar */}
          <div className="lg:col-span-3">
            {/* Calendar Navigation */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={goToToday}
                    className="px-4 py-2 bg-teal-100 text-teal-700 rounded-lg font-semibold text-sm hover:bg-teal-200 transition-colors"
                  >
                    Today
                  </button>
                  <button
                    onClick={goToPreviousMonth}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-slate-700" />
                  </button>
                  <button
                    onClick={goToNextMonth}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-slate-700" />
                  </button>
                </div>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              {/* Day Names */}
              <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200">
                {dayNames.map((day: string) => (
                  <div key={day} className="p-4 text-center">
                    <span className="text-sm font-semibold text-slate-600">{day}</span>
                  </div>
                ))}
              </div>

              {/* Date Cells */}
              <div className="grid grid-cols-7">
                {calendarDays.map((day: DayCell, index: number) => {
                  const hasHoliday = day.events.some(e => e.type === 'holiday');
                  const hasExam = day.events.some(e => e.type === 'exam');
                  const hasEvent = day.events.some(e => e.type === 'event');
                  const hasActivity = day.events.some(e => e.type === 'activity');
                  const hasDeadline = day.events.some(e => e.type === 'deadline');

                  return (
                    <div
                      key={index}
                      onClick={() => handleDayClick(day)}
                      className={`min-h-[100px] p-3 border-b border-r border-slate-100 cursor-pointer transition-all hover:bg-slate-50 ${
                        !day.isCurrentMonth ? 'bg-slate-50/50' : ''
                      } ${day.isToday ? 'bg-teal-50 ring-2 ring-teal-300' : ''} ${
                        hasHoliday ? 'bg-green-50' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-semibold ${
                          day.isCurrentMonth ? 'text-slate-800' : 'text-slate-400'
                        } ${day.isToday ? 'text-teal-700' : ''}`}>
                          {day.date}
                        </span>
                        {day.isToday && (
                          <span className="text-xs bg-teal-600 text-white px-2 py-0.5 rounded-full font-semibold">
                            Today
                          </span>
                        )}
                      </div>

                      {/* Event Indicators */}
                      {day.events.length > 0 && (
                        <div className="space-y-1">
                          {day.events.slice(0, 2).map((event: CalendarEvent) => (
                            <div
                              key={event.id}
                              className={`text-xs px-2 py-1 rounded ${eventTypeConfig[event.type].color} truncate font-medium`}
                            >
                              {event.title}
                            </div>
                          ))}
                          {day.events.length > 2 && (
                            <div className="text-xs text-slate-600 font-medium px-2">
                              +{day.events.length - 2} more
                            </div>
                          )}
                        </div>
                      )}

                      {/* Event Dots (alternative to labels for mobile) */}
                      {day.events.length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {hasHoliday && <div className={`w-2 h-2 rounded-full ${eventTypeConfig.holiday.dotColor}`}></div>}
                          {hasExam && <div className={`w-2 h-2 rounded-full ${eventTypeConfig.exam.dotColor}`}></div>}
                          {hasEvent && <div className={`w-2 h-2 rounded-full ${eventTypeConfig.event.dotColor}`}></div>}
                          {hasActivity && <div className={`w-2 h-2 rounded-full ${eventTypeConfig.activity.dotColor}`}></div>}
                          {hasDeadline && <div className={`w-2 h-2 rounded-full ${eventTypeConfig.deadline.dotColor}`}></div>}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* DAY DETAIL PANEL */}
        {showDayPanel && selectedDay && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={closeDayPanel}
          >
            <div 
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {/* Panel Header */}
              <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-6 rounded-t-3xl">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold">
                    {monthNames[selectedDay.month]} {selectedDay.date}, {selectedDay.year}
                  </h2>
                  <button
                    onClick={closeDayPanel}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-teal-100">
                  {selectedDay.events.length} {selectedDay.events.length === 1 ? 'event' : 'events'} scheduled
                </p>
              </div>

              {/* Panel Body */}
              <div className="p-6">
                {selectedDay.events.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                      📅
                    </div>
                    <p className="text-slate-600">No activities scheduled for this day</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedDay.events.map((event: CalendarEvent) => (
                      <div
                        key={event.id}
                        className={`${eventTypeConfig[event.type].bgColor} border-2 ${eventTypeConfig[event.type].color.split(' ')[2]} rounded-2xl p-5`}
                      >
                        <div className="flex items-start gap-4 mb-3">
                          <div className="text-3xl">{eventTypeConfig[event.type].icon}</div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <h3 className="text-lg font-bold text-slate-800">{event.title}</h3>
                              <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${eventTypeConfig[event.type].color}`}>
                                {event.type.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-sm text-slate-700 mb-3">{event.description}</p>
                            
                            <div className="space-y-2">
                              {event.time && (
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                  <Clock className="w-4 h-4" />
                                  <span>{event.time}</span>
                                </div>
                              )}
                              {event.location && (
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                  <MapPin className="w-4 h-4" />
                                  <span>{event.location}</span>
                                </div>
                              )}
                              {event.applicableClass && (
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                  <Users className="w-4 h-4" />
                                  <span>{event.applicableClass}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AcademicCalendarScreen;