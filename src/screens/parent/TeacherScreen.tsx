import React, { useState } from 'react';
import { MessageCircle, ChevronDown, Calendar, Award, Clock, Mail } from 'lucide-react';

// Type Definitions
interface Student {
  id: string;
  name: string;
  class: string;
}

interface Teacher {
  name: string;
  photo: string | null;
  initials: string;
  initialsColor: string;
  qualification: string;
  experience: string;
  weeklyClasses: number;
  availableForMessaging: boolean;
  isOnline: boolean;
  email: string;
  officeHours: string;
  subjects: string[];
}

interface SubjectTeacher {
  id: number;
  subject: string;
  subjectIcon: string;
  subjectColor: string;
  cardColor: string;
  teacher: Teacher;
}

const SubjectTeachersScreen: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<string>('aarav');
  const [selectedTeacher, setSelectedTeacher] = useState<SubjectTeacher | null>(null);
  
  const students: Student[] = [
    { id: 'aarav', name: 'Aarav', class: 'Class 8 A' },
    { id: 'ananya', name: 'Ananya', class: 'Class 5 B' }
  ];

  const subjectTeachers: SubjectTeacher[] = [
    {
      id: 1,
      subject: 'English',
      subjectIcon: '📘',
      subjectColor: 'bg-blue-500',
      cardColor: 'bg-blue-50 border-blue-200',
      teacher: {
        name: 'Ms. Priya Sharma',
        photo: null,
        initials: 'PS',
        initialsColor: 'bg-blue-600',
        qualification: 'M.A. English, B.Ed.',
        experience: '8+ Years',
        weeklyClasses: 6,
        availableForMessaging: true,
        isOnline: true,
        email: 'priya.sharma@school.edu',
        officeHours: 'Mon-Fri: 2:00 PM - 4:00 PM',
        subjects: ['English', 'Literature']
      }
    },
    {
      id: 2,
      subject: 'Mathematics',
      subjectIcon: '📐',
      subjectColor: 'bg-emerald-500',
      cardColor: 'bg-emerald-50 border-emerald-200',
      teacher: {
        name: 'Mr. Rahul Verma',
        photo: null,
        initials: 'RV',
        initialsColor: 'bg-emerald-600',
        qualification: 'M.Sc. Mathematics',
        experience: '10+ Years',
        weeklyClasses: 7,
        availableForMessaging: true,
        isOnline: true,
        email: 'rahul.verma@school.edu',
        officeHours: 'Mon-Fri: 3:00 PM - 5:00 PM',
        subjects: ['Mathematics', 'Statistics']
      }
    },
    {
      id: 3,
      subject: 'Science',
      subjectIcon: '🔬',
      subjectColor: 'bg-purple-500',
      cardColor: 'bg-purple-50 border-purple-200',
      teacher: {
        name: 'Ms. Neha Iyer',
        photo: null,
        initials: 'NI',
        initialsColor: 'bg-purple-600',
        qualification: 'M.Sc. Physics, B.Ed.',
        experience: '6+ Years',
        weeklyClasses: 6,
        availableForMessaging: true,
        isOnline: false,
        email: 'neha.iyer@school.edu',
        officeHours: 'Tue-Thu: 2:30 PM - 4:30 PM',
        subjects: ['Science', 'Physics']
      }
    },
    {
      id: 4,
      subject: 'Social Science',
      subjectIcon: '🌍',
      subjectColor: 'bg-orange-500',
      cardColor: 'bg-orange-50 border-orange-200',
      teacher: {
        name: 'Mr. Amit Das',
        photo: null,
        initials: 'AD',
        initialsColor: 'bg-orange-600',
        qualification: 'M.A. History & Geography',
        experience: '12+ Years',
        weeklyClasses: 5,
        availableForMessaging: true,
        isOnline: true,
        email: 'amit.das@school.edu',
        officeHours: 'Mon-Wed-Fri: 3:00 PM - 5:00 PM',
        subjects: ['Social Science', 'History', 'Geography']
      }
    },
    {
      id: 5,
      subject: 'Computer Science',
      subjectIcon: '💻',
      subjectColor: 'bg-teal-500',
      cardColor: 'bg-teal-50 border-teal-200',
      teacher: {
        name: 'Ms. Kavita Rao',
        photo: null,
        initials: 'KR',
        initialsColor: 'bg-teal-600',
        qualification: 'B.Tech CS, M.Ed.',
        experience: '5+ Years',
        weeklyClasses: 4,
        availableForMessaging: true,
        isOnline: true,
        email: 'kavita.rao@school.edu',
        officeHours: 'Mon-Fri: 4:00 PM - 5:30 PM',
        subjects: ['Computer Science', 'Coding']
      }
    },
    {
      id: 6,
      subject: 'Hindi',
      subjectIcon: '🌐',
      subjectColor: 'bg-pink-500',
      cardColor: 'bg-pink-50 border-pink-200',
      teacher: {
        name: 'Ms. Anjali Mehta',
        photo: null,
        initials: 'AM',
        initialsColor: 'bg-pink-600',
        qualification: 'M.A. Hindi Literature',
        experience: '9+ Years',
        weeklyClasses: 5,
        availableForMessaging: true,
        isOnline: false,
        email: 'anjali.mehta@school.edu',
        officeHours: 'Tue-Thu: 2:00 PM - 4:00 PM',
        subjects: ['Hindi']
      }
    },
    {
      id: 7,
      subject: 'Physical Education',
      subjectIcon: '🏃',
      subjectColor: 'bg-lime-500',
      cardColor: 'bg-lime-50 border-lime-200',
      teacher: {
        name: 'Coach Rahul Singh',
        photo: null,
        initials: 'RS',
        initialsColor: 'bg-lime-600',
        qualification: 'B.P.Ed, M.P.Ed',
        experience: '7+ Years',
        weeklyClasses: 3,
        availableForMessaging: false,
        isOnline: false,
        email: 'rahul.singh@school.edu',
        officeHours: 'By Appointment',
        subjects: ['Physical Education', 'Sports']
      }
    },
    {
      id: 8,
      subject: 'Art',
      subjectIcon: '🎨',
      subjectColor: 'bg-rose-500',
      cardColor: 'bg-rose-50 border-rose-200',
      teacher: {
        name: 'Ms. Deepa Kulkarni',
        photo: null,
        initials: 'DK',
        initialsColor: 'bg-rose-600',
        qualification: 'B.F.A, M.F.A',
        experience: '5+ Years',
        weeklyClasses: 2,
        availableForMessaging: true,
        isOnline: true,
        email: 'deepa.kulkarni@school.edu',
        officeHours: 'Mon-Wed: 3:30 PM - 5:00 PM',
        subjects: ['Art', 'Craft']
      }
    }
  ];

  const currentStudent = students.find(s => s.id === selectedStudent);
  const availableForMessagingCount = subjectTeachers.filter(st => st.teacher.availableForMessaging).length;

  const openTeacherDetail = (teacherData: SubjectTeacher): void => {
    setSelectedTeacher(teacherData);
  };

  const closeTeacherDetail = (): void => {
    setSelectedTeacher(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP HEADER */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-500 rounded-2xl p-8 mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Subject Teachers</h1>
              <p className="text-teal-50">Meet the teachers guiding your child</p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Student Selector */}
              <div className="relative">
                <select 
                  value={selectedStudent}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedStudent(e.target.value)}
                  className="appearance-none bg-white/95 backdrop-blur border-0 rounded-xl px-4 py-3 pr-10 font-medium text-slate-700 cursor-pointer hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  {students.map((student: Student) => (
                    <option key={student.id} value={student.id}>
                      {student.name} – {student.class}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>

              {/* Academic Year Badge */}
              <div className="bg-amber-400 text-amber-900 px-4 py-3 rounded-xl font-bold flex items-center gap-2 shadow-sm">
                <Calendar className="w-4 h-4" />
                2024-25
              </div>
            </div>
          </div>
        </div>

        {/* OVERVIEW SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center text-2xl">
                👩‍🏫
              </div>
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Teachers</p>
                <p className="text-3xl font-bold text-slate-800">{subjectTeachers.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
                📘
              </div>
              <div>
                <p className="text-slate-600 text-sm font-medium">Subjects Covered</p>
                <p className="text-3xl font-bold text-slate-800">{subjectTeachers.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-2xl">
                💬
              </div>
              <div>
                <p className="text-slate-600 text-sm font-medium">Available for Messaging</p>
                <p className="text-3xl font-bold text-slate-800">{availableForMessagingCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* SUBJECT-TEACHER CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjectTeachers.map((item: SubjectTeacher) => (
            <div 
              key={item.id}
              onClick={() => openTeacherDetail(item)}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-200 cursor-pointer group hover:-translate-y-1"
            >
              {/* Colored Top Strip */}
              <div className={`h-3 ${item.subjectColor}`}></div>
              
              <div className="p-6">
                {/* Teacher Profile Section */}
                <div className="flex items-start gap-4 mb-5">
                  {/* Profile Photo / Avatar */}
                  <div className="relative">
                    <div className={`w-16 h-16 ${item.teacher.initialsColor} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                      {item.teacher.initials}
                    </div>
                    {/* Online Indicator */}
                    {item.teacher.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Subject Name with Icon */}
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{item.subjectIcon}</span>
                      <h3 className="text-lg font-bold text-slate-800 truncate">{item.subject}</h3>
                    </div>
                    {/* Teacher Name */}
                    <p className="text-base font-semibold text-teal-700 mb-1">{item.teacher.name}</p>
                    {/* Qualification */}
                    <p className="text-xs text-slate-500">{item.teacher.qualification}</p>
                  </div>
                </div>

                {/* Experience & Weekly Classes */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Award className="w-4 h-4 text-teal-600" />
                    <div>
                      <p className="text-xs text-slate-500">Experience</p>
                      <p className="text-sm font-semibold text-slate-700">{item.teacher.experience}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-4 h-4 text-teal-600" />
                    <div>
                      <p className="text-xs text-slate-500">Weekly Classes</p>
                      <p className="text-sm font-semibold text-slate-700">{item.teacher.weeklyClasses}/week</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    disabled={!item.teacher.availableForMessaging}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                      item.teacher.availableForMessaging 
                        ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-md' 
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    {item.teacher.availableForMessaging ? 'Message' : 'Unavailable'}
                  </button>
                  <button className="px-4 py-2.5 rounded-xl font-semibold text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {subjectTeachers.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100">
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
              👩‍🏫
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No Teachers Assigned Yet</h3>
            <p className="text-slate-600">Teacher details will be updated soon</p>
          </div>
        )}

      </div>

      {/* TEACHER DETAIL MODAL/PANEL */}
      {selectedTeacher && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={closeTeacherDetail}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`${selectedTeacher.subjectColor} text-white p-8 rounded-t-3xl`}>
              <div className="flex items-start gap-6">
                <div className="relative">
                  <div className={`w-24 h-24 ${selectedTeacher.teacher.initialsColor} rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-lg border-4 border-white/30`}>
                    {selectedTeacher.teacher.initials}
                  </div>
                  {selectedTeacher.teacher.isOnline && (
                    <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-400 rounded-full border-4 border-white"></div>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">{selectedTeacher.teacher.name}</h2>
                  <p className="text-white/90 text-lg mb-3">{selectedTeacher.teacher.qualification}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedTeacher.teacher.subjects.map((sub: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-white/20 backdrop-blur rounded-lg text-sm font-medium">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-5 h-5 text-teal-600" />
                    <p className="text-sm font-medium text-slate-600">Experience</p>
                  </div>
                  <p className="text-xl font-bold text-slate-800">{selectedTeacher.teacher.experience}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-teal-600" />
                    <p className="text-sm font-medium text-slate-600">Weekly Classes</p>
                  </div>
                  <p className="text-xl font-bold text-slate-800">{selectedTeacher.teacher.weeklyClasses} per week</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Contact & Availability</h3>
                
                <div className="flex items-center gap-3 text-slate-700">
                  <Mail className="w-5 h-5 text-teal-600" />
                  <div>
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="font-medium">{selectedTeacher.teacher.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-700">
                  <Clock className="w-5 h-5 text-teal-600" />
                  <div>
                    <p className="text-xs text-slate-500">Office Hours</p>
                    <p className="font-medium">{selectedTeacher.teacher.officeHours}</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Communication Guidelines:</strong> Please message during office hours for fastest response. For urgent matters, contact the school office.
                </p>
              </div>

              <div className="flex gap-3">
                <button 
                  disabled={!selectedTeacher.teacher.availableForMessaging}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    selectedTeacher.teacher.availableForMessaging 
                      ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-md hover:shadow-lg' 
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <MessageCircle className="w-5 h-5" />
                  Send Message
                </button>
                <button 
                  onClick={closeTeacherDetail}
                  className="px-6 py-3 rounded-xl font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectTeachersScreen;