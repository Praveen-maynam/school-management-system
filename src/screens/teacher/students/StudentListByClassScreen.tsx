import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, Users, UserCircle, Phone, Mail, Calendar, TrendingUp, X, Filter, ChevronRight, GraduationCap } from 'lucide-react';

interface Student {
  id: number;
  name: string;
  rollNo: string;
  gender: string;
  status: string;
  attendance: number;
  parentName: string;
  phone: string;
  email: string;
  dob: string;
}

export default function MyStudents() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("6-A");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const classes = ["6-A", "7-B", "9-C"];
  const isClassTeacher = selectedClass === "6-A";
  
  const classStats = {
    total: 40,
    boys: 22,
    girls: 18
  };

  const students = [
    { id: 1, name: "Aarav Sharma", rollNo: "#0021", gender: "Male", status: "Active", attendance: 92, parentName: "Mr. Rajesh Sharma", phone: "+91 98765 43210", email: "rajesh.sharma@email.com", dob: "15 Jan 2012" },
    { id: 2, name: "Diya Patel", rollNo: "#0022", gender: "Female", status: "Active", attendance: 88, parentName: "Mrs. Priya Patel", phone: "+91 98765 43211", email: "priya.patel@email.com", dob: "22 Mar 2012" },
    { id: 3, name: "Arjun Reddy", rollNo: "#0023", gender: "Male", status: "Active", attendance: 95, parentName: "Mr. Venkat Reddy", phone: "+91 98765 43212", email: "venkat.reddy@email.com", dob: "08 Jul 2012" },
    { id: 4, name: "Ananya Singh", rollNo: "#0024", gender: "Female", status: "Active", attendance: 90, parentName: "Mrs. Kavita Singh", phone: "+91 98765 43213", email: "kavita.singh@email.com", dob: "30 Sep 2012" },
    { id: 5, name: "Rohan Kumar", rollNo: "#0025", gender: "Male", status: "Active", attendance: 85, parentName: "Mr. Suresh Kumar", phone: "+91 98765 43214", email: "suresh.kumar@email.com", dob: "12 Dec 2012" },
    { id: 6, name: "Ishita Gupta", rollNo: "#0026", gender: "Female", status: "Active", attendance: 93, parentName: "Mrs. Meena Gupta", phone: "+91 98765 43215", email: "meena.gupta@email.com", dob: "05 Feb 2012" },
    { id: 7, name: "Kabir Joshi", rollNo: "#0027", gender: "Male", status: "Active", attendance: 87, parentName: "Mr. Anil Joshi", phone: "+91 98765 43216", email: "anil.joshi@email.com", dob: "18 Apr 2012" },
    { id: 8, name: "Myra Kapoor", rollNo: "#0028", gender: "Female", status: "Active", attendance: 91, parentName: "Mrs. Pooja Kapoor", phone: "+91 98765 43217", email: "pooja.kapoor@email.com", dob: "27 Jun 2012" },
  ];

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNo.includes(searchQuery)
  );

  const getInitials = (name:string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-slate-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-emerald-100 px-6 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GraduationCap className="w-8 h-8 text-emerald-600" />
            <span className="text-xl font-semibold text-slate-800">School ERP</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-600">Academic Year: 2025-26</span>
          </div>
        </div>
      </nav>

      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-emerald-100 to-teal-100 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">My Students</h1>
              <p className="text-slate-600">View students of your assigned classes</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md">
                {selectedClass}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Panel - Student List */}
          <div className="col-span-5 space-y-4">
            {/* Class Select + Stats Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6">
              {/* Class Selector */}
              <div className="mb-4">
                <label className="text-sm font-medium text-slate-700 mb-2 block">Select Class</label>
                <div className="relative">
                  <select 
                    title="Select Class"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-lg appearance-none font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    {classes.map(cls => (
                      <option key={cls} value={cls}>Class {cls}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600 pointer-events-none" />
                </div>
                {isClassTeacher && (
                  <p className="text-xs text-emerald-600 mt-2 flex items-center">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    You are class teacher of this class
                  </p>
                )}
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Users className="w-4 h-4 text-emerald-600 mr-1" />
                  </div>
                  <p className="text-2xl font-bold text-slate-800">{classStats.total}</p>
                  <p className="text-xs text-slate-500">Total Students</p>
                </div>
                <div className="text-center border-x border-slate-100">
                  <div className="flex items-center justify-center mb-1">
                    <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-[10px] text-blue-600 font-bold">M</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-slate-800">{classStats.boys}</p>
                  <p className="text-xs text-slate-500">Boys</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <div className="w-4 h-4 bg-pink-100 rounded-full flex items-center justify-center">
                      <span className="text-[10px] text-pink-600 font-bold">F</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-slate-800">{classStats.girls}</p>
                  <p className="text-xs text-slate-500">Girls</p>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="🔍 Search by name or roll number"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                />
                {searchQuery && (
                  <button 
                    title="Clear search"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-500">
                  {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''} found
                </p>
                <button className="flex items-center space-x-1 text-xs text-emerald-600 hover:text-emerald-700 font-medium">
                  <Filter className="w-3 h-3" />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            {/* Student List */}
            <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                <h3 className="font-semibold text-slate-800 text-sm">Students – Class {selectedClass}</h3>
              </div>
              <div className="max-h-[600px] overflow-y-auto">
                {filteredStudents.map((student) => (
                  <button
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className={`w-full px-4 py-4 flex items-center space-x-4 hover:bg-emerald-50 transition-all border-l-4 ${
                      selectedStudent?.id === student.id 
                        ? 'bg-emerald-50 border-emerald-500' 
                        : 'border-transparent'
                    }`}
                  >
                    {/* Avatar */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-white ${
                      student.gender === 'Male' ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-pink-500 to-pink-600'
                    }`}>
                      {getInitials(student.name)}
                    </div>

                    {/* Student Info */}
                    <div className="flex-1 text-left">
                      <h4 className="font-semibold text-slate-800">{student.name}</h4>
                      <p className="text-sm text-slate-500">{student.rollNo}</p>
                    </div>

                    {/* Status & Arrow */}
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Student Details */}
          <div className="col-span-7">
            <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden sticky top-6">
              {!selectedStudent ? (
                // Empty State
                <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                  <div className="w-32 h-32 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                    <UserCircle className="w-16 h-16 text-emerald-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Select a student to view details</h3>
                  <p className="text-slate-500 max-w-md">
                    Click on any student from the list to see their complete profile,
                  </p>
                </div>
              ) : (
                <>
                  {/* Tabs */}
                  <div className="border-b border-slate-200 px-6 pt-6">
                    <div className="flex space-x-6">
                      {['overview',].map(tab => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`pb-3 px-2 font-medium text-sm capitalize transition-all relative ${
                            activeTab === tab 
                              ? 'text-emerald-600' 
                              : 'text-slate-500 hover:text-slate-700'
                          }`}
                        >
                          {tab}
                          {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tab Content */}
                  <div className="p-6">
                    {activeTab === 'overview' && (
                      <div className="space-y-6">
                        {/* Student Header */}
                        <div className="flex items-start space-x-6 pb-6 border-b border-slate-100">
                          <button
                            onClick={() => navigate('/teacher/students/profile', { state: { student: selectedStudent } })}
                            className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white hover:shadow-lg transition-all cursor-pointer ${
                              selectedStudent.gender === 'Male' 
                                ? 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' 
                                : 'bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700'
                            }`}
                            title="View full profile"
                          >
                            {getInitials(selectedStudent.name)}
                          </button>
                          <div className="flex-1">
                            <h2 className="text-2xl font-bold text-slate-800 mb-1">{selectedStudent.name}</h2>
                            <div className="flex items-center space-x-4 text-sm text-slate-600">
                              <span className="font-medium">{selectedStudent.rollNo}</span>
                              <span>•</span>
                              <span>{selectedStudent.gender}</span>
                              <span>•</span>
                              <span className="flex items-center">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                                {selectedStudent.status}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Attendance Card */}
                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-slate-600 mb-1">Overall Attendance</p>
                              <div className="flex items-baseline space-x-2">
                                <span className="text-4xl font-bold text-emerald-600">{selectedStudent.attendance}%</span>
                                <span className="text-sm text-slate-500">this term</span>
                              </div>
                            </div>
                            <div className="relative w-24 h-24">
                              <svg className="transform -rotate-90 w-24 h-24">
                                <circle
                                  cx="48"
                                  cy="48"
                                  r="40"
                                  stroke="#D1FAE5"
                                  strokeWidth="8"
                                  fill="transparent"
                                />
                                <circle
                                  cx="48"
                                  cy="48"
                                  r="40"
                                  stroke="#10B981"
                                  strokeWidth="8"
                                  fill="transparent"
                                  strokeDasharray={`${2 * Math.PI * 40}`}
                                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - selectedStudent.attendance / 100)}`}
                                  strokeLinecap="round"
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-emerald-600" />
                              </div>
                            </div>
                          </div>
                        </div>
 
                        {/* Parent Contact Information */}
                        <div>
                          <h3 className="font-semibold text-slate-800 mb-4">Parent / Guardian Information</h3>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-lg">
                              <UserCircle className="w-5 h-5 text-slate-500" />
                              <div>
                                <p className="text-xs text-slate-500">Parent Name</p>
                                <p className="font-medium text-slate-800">{selectedStudent.parentName}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-lg">
                              <Phone className="w-5 h-5 text-slate-500" />
                              <div>
                                <p className="text-xs text-slate-500">Phone Number</p>
                                <p className="font-medium text-slate-800">{selectedStudent.phone}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-lg">
                              <Mail className="w-5 h-5 text-slate-500" />
                              <div>
                                <p className="text-xs text-slate-500">Email Address</p>
                                <p className="font-medium text-slate-800">{selectedStudent.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-lg">
                              <Calendar className="w-5 h-5 text-slate-500" />
                              <div>
                                <p className="text-xs text-slate-500">Date of Birth</p>
                                <p className="font-medium text-slate-800">{selectedStudent.dob}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}