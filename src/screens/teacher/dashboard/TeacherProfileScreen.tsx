import React, { useState } from 'react';
import { Bell, Calendar, DollarSign, FileText, AlertCircle, Shield, Info, ChevronRight, LogOut, HelpCircle, Mail, Phone, User, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function TeacherProfile() {
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const navigate = useNavigate();

  const profileOptions = [
    { 
      icon: Bell, 
      label: 'Notifications', 
      hasToggle: true,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600'
    },
    { 
      icon: Calendar, 
      label: 'My Timetable',
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      route: '/teacher/timetable'
    },
    { 
      icon: DollarSign, 
      label: 'Pay Slips',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      route: '/teacher/payroll/payslips'
    },
    { 
      icon: FileText, 
      label: 'Apply Leave',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      route: '/teacher/leave/apply'
    },
    { 
      icon: AlertCircle, 
      label: 'Raise an Issue',
      color: 'from-rose-500 to-red-500',
      bgColor: 'bg-rose-50',
      iconColor: 'text-rose-600',
      route: '/teacher/messaging/issues'
    },
    { 
      icon: Shield, 
      label: 'Privacy Policy',
      color: 'from-slate-500 to-gray-500',
      bgColor: 'bg-slate-50',
      iconColor: 'text-slate-600',
      route: '/teacher/privacy-policy'
    },
    { 
      icon: Info, 
      label: 'About Us',
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'bg-cyan-50',
      iconColor: 'text-cyan-600',
      route: '/teacher/about-us'
    },
    { 
      icon: HelpCircle, 
      label: 'Help & Support',
      color: 'from-violet-500 to-purple-500',
      bgColor: 'bg-violet-50',
      iconColor: 'text-violet-600',
      route: '/teacher/help'
    },
    { 
      icon: LogOut, 
      label: 'Logout',
      color: 'from-red-500 to-rose-500',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      route: '/',
      isDanger: true
    }
  ];

  const handleOptionClick = (option: any) => {
    if (option.route) {
      navigate(option.route);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-emerald-100 px-6 py-3 shadow-sm">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <GraduationCap className="w-8 h-8 text-emerald-600" />
            <span className="text-xl font-semibold text-slate-800">School ERP</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-600">Academic Year: 2025-26</span>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 border border-emerald-100">
          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 px-8 py-6">
            <h2 className="text-3xl font-bold text-white">My Profile</h2>
            <p className="text-emerald-100 text-sm mt-1">View and manage your account</p>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            <div className="flex flex-col items-center">
              {/* Avatar with Gradient Border */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full blur-md opacity-75"></div>
                <div className="relative w-32 h-32 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-xl border-4 border-white">
                  R
                </div>
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full p-2 shadow-lg border-2 border-white">
                  <User className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Name and Role */}
              <h3 className="text-3xl font-bold text-slate-800 mb-1">
                Mr. Rajesh Kumar
              </h3>
              <div className="flex items-center space-x-3 mb-8">
                <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                  Mathematics Teacher
                </span>
                <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  Emp ID: TCH045
                </span>
              </div>

              {/* Contact Info Cards */}
              <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email Card */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border-2 border-purple-100 hover:shadow-lg transition-all">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Mail className="w-7 h-7 text-white" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-medium text-slate-500 mb-1">Email Address</p>
                      <p className="text-base font-semibold text-slate-800 truncate">
                        rajesh.kumar@school.edu
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border-2 border-green-100 hover:shadow-lg transition-all">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Phone className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 mb-1">Phone Number</p>
                      <p className="text-base font-semibold text-slate-800">
                        +91 98765 43210
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Options List */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-emerald-100">
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-8 py-4 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-800">Quick Actions</h3>
            <p className="text-sm text-slate-600">Manage your account and preferences</p>
          </div>

          <div className="p-4">
            {profileOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`flex items-center justify-between p-5 rounded-2xl mb-3 transition-all cursor-pointer border-2 hover:shadow-lg hover:-translate-y-0.5 ${
                  option.isDanger 
                    ? 'bg-gradient-to-br from-red-50 to-rose-50 border-red-100 hover:border-red-300' 
                    : 'bg-gradient-to-br from-slate-50 to-gray-50 border-slate-100 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${option.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <option.icon className="text-white" size={22} />
                  </div>
                  <span className={`font-semibold text-base ${option.isDanger ? 'text-red-700' : 'text-slate-700'}`}>
                    {option.label}
                  </span>
                </div>

                {option.hasToggle ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setNotificationEnabled(!notificationEnabled);
                    }}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all flex-shrink-0 shadow-inner ${
                      notificationEnabled 
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500' 
                        : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform ${
                        notificationEnabled ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                ) : (
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${option.isDanger ? 'bg-red-100' : 'bg-slate-100'}`}>
                    <ChevronRight className={option.isDanger ? 'text-red-600' : 'text-slate-400'} size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Version 1.0.0 • Made with ❤️ for Teachers
          </p>
        </div>
      </div>
    </div>
  );
}

export default TeacherProfile;