import React, { useState } from 'react';
import { Calendar, Clock, CheckSquare, BookOpen, FlaskConical, Bell, User, Mail, Phone, GraduationCap, ChevronRight } from 'lucide-react';

export default function TeacherDashboard() {
  const [teacher] = useState({
    name: "Mr. Rajesh Kumar",
    empId: "TCH045",
    photo: "https://ui-avatars.com/api/?name=Rajesh+Kumar&background=4F46E5&color=fff&size=128",
    subjects: ["Mathematics", "Physics"],
    classes: ["8-A", "9-B", "10-C"],
    role: "Class Teacher",
    classTeacherOf: "8-A",
    email: "rajesh.kumar@school.edu",
    phone: "+91 98765 43210",
    academicYear: "2025-26"
  });

  const todayStats = [
    { 
      id: 1, 
      icon: Calendar, 
      label: "Classes Today", 
      value: "4", 
      color: "bg-blue-50 text-blue-600", 
      iconBg: "bg-blue-100",
      link: "/classes"
    },
    { 
      id: 2, 
      icon: Clock, 
      label: "Periods Today", 
      value: "6", 
      color: "bg-indigo-50 text-indigo-600", 
      iconBg: "bg-indigo-100",
      link: "/timetable"
    },
    { 
      id: 3, 
      icon: CheckSquare, 
      label: "Attendance Pending", 
      value: "1 Class", 
      color: "bg-orange-50 text-orange-600", 
      iconBg: "bg-orange-100",
      link: "/attendance",
      alert: true
    },
    { 
      id: 4, 
      icon: BookOpen, 
      label: "Homework to Review", 
      value: "12", 
      color: "bg-purple-50 text-purple-600", 
      iconBg: "bg-purple-100",
      link: "/homework"
    },
    { 
      id: 5, 
      icon: FlaskConical, 
      label: "Exams This Week", 
      value: "2", 
      color: "bg-red-50 text-red-600", 
      iconBg: "bg-red-100",
      link: "/exams"
    },
    { 
      id: 6, 
      icon: Bell, 
      label: "Messages", 
      value: "3 New", 
      color: "bg-teal-50 text-teal-600", 
      iconBg: "bg-teal-100",
      link: "/messages",
      badge: 3
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GraduationCap className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-semibold text-slate-800">School ERP</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-600">Today: {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </nav>

      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Teacher Profile Section - Cockpit Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl shadow-lg p-6 mb-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center space-x-6">
              {/* Profile Photo */}
              <img 
                src={teacher.photo} 
                alt={teacher.name}
                className="w-20 h-20 rounded-full border-4 border-white/30 shadow-xl flex-shrink-0"
              />
              
              {/* Teacher Info */}
              <div className="space-y-2 flex-1">
                <div>
                  <h1 className="text-2xl font-bold mb-0.5">{teacher.name}</h1>
                  <p className="text-indigo-100 text-xs">Employee ID: {teacher.empId}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1">
                    <p className="text-xs text-indigo-100 mb-0">Subjects</p>
                    <p className="text-xs font-medium">{teacher.subjects.join(", ")}</p>
                  </div>
                  
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1">
                    <p className="text-xs text-indigo-100 mb-0">Classes</p>
                    <p className="text-xs font-medium">{teacher.classes.join(", ")}</p>
                  </div>
                  
                  <div className="bg-green-500/90 rounded-lg px-2 py-1">
                    <p className="text-xs text-green-100 mb-0">Role</p>
                    <p className="text-xs font-semibold">{teacher.role} ({teacher.classTeacherOf})</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact & Academic Year */}
            <div className="text-right space-y-1.5 text-xs">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5 inline-block mb-2">
                <p className="text-xs text-indigo-100">Academic Year</p>
                <p className="text-base font-bold">{teacher.academicYear}</p>
              </div>
              
              <div className="space-y-0.5 text-xs hidden sm:block">
                <div className="flex items-center justify-end space-x-1">
                  <Mail className="w-3 h-3" />
                  <span className="truncate">{teacher.email}</span>
                </div>
                <div className="flex items-center justify-end space-x-1">
                  <Phone className="w-3 h-3" />
                  <span>{teacher.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Overview Section */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Today's Overview</h2>
          <p className="text-slate-600 text-sm mb-4">Your quick daily summary - everything you need to focus on right now</p>
        </div>

        {/* Stats Grid - Pilot Cockpit Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {todayStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <button
                key={stat.id}
                className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 text-left border border-slate-200 hover:border-slate-300 hover:-translate-y-1"
                onClick={() => console.log(`Navigate to ${stat.link}`)}
              >
                {/* Alert Indicator */}
                {stat.alert && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-orange-500 rounded-full animate-pulse"></div>
                )}
                
                {/* Badge for notifications */}
                {stat.badge && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {stat.badge}
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div className={`${stat.iconBg} rounded-lg p-3`}>
                    <Icon className={`w-6 h-6 ${stat.color.split(' ')[1]}`} />
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                </div>

                <div>
                  <p className="text-slate-600 text-xs mb-1">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color.split(' ')[1]}`}>
                    {stat.value}
                  </p>
                </div>

                {/* Hover effect bar */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${stat.color.split(' ')[0].replace('50', '500')} rounded-b-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              </button>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button className="bg-white rounded-xl p-5 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all text-left group">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 rounded-lg p-3">
                  <CheckSquare className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">Take Attendance</h4>
                  <p className="text-sm text-slate-600">Mark attendance for your classes</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
              </div>
            </button>

            <button className="bg-white rounded-xl p-5 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all text-left group">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 rounded-lg p-3">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">Assign Homework</h4>
                  <p className="text-sm text-slate-600">Create and assign homework to students</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
              </div>
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}