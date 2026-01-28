import React, { useState } from 'react';
import { Users, BookOpen, Calendar, DollarSign, FileText, BarChart3, Settings, LogOut, Menu, X, Search, Plus, Edit2, Trash2, Eye, Download, Filter, Bell, Home, UserPlus, GraduationCap, TrendingUp, ChevronDown } from 'lucide-react';

const SchoolAdminPanel = () => {
  const [currentScreen, setCurrentScreen] = useState('students');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const itemsPerPage = 6;

  const [students, setStudents] = useState([
    { 
      id: 'STU-2024-001', 
      name: 'Michael Johnson', 
      email: 'michael.j@email.com',
      grade: 'Grade 5-A', 
      class: '5-A',
      parent: 'Robert Johnson',
      contact: '+1 234-567-8901',
      status: 'Active',
      avatar: 'MJ',
      color: 'bg-blue-500'
    },
    { 
      id: 'STU-2024-002', 
      name: 'Emily Davis', 
      email: 'emily.d@email.com',
      grade: 'Grade 4-B', 
      class: '4-B',
      parent: 'Sarah Davis',
      contact: '+1 234-567-8902',
      status: 'Active',
      avatar: 'ED',
      color: 'bg-purple-500'
    },
    { 
      id: 'STU-2024-003', 
      name: 'James Wilson', 
      email: 'james.w@email.com',
      grade: 'Grade 5-B', 
      class: '5-B',
      parent: 'Jennifer Wilson',
      contact: '+1 234-567-8903',
      status: 'Active',
      avatar: 'JW',
      color: 'bg-green-500'
    },
    { 
      id: 'STU-2024-004', 
      name: 'Sophia Martinez', 
      email: 'sophia.m@email.com',
      grade: 'Grade 3-A', 
      class: '3-A',
      parent: 'Carlos Martinez',
      contact: '+1 234-567-8904',
      status: 'Active',
      avatar: 'SM',
      color: 'bg-pink-500'
    },
    { 
      id: 'STU-2024-005', 
      name: 'Daniel Brown', 
      email: 'daniel.b@email.com',
      grade: 'Grade 4-A', 
      class: '4-A',
      parent: 'Lisa Brown',
      contact: '+1 234-567-8905',
      status: 'Pending',
      avatar: 'DB',
      color: 'bg-orange-500'
    },
    { 
      id: 'STU-2024-006', 
      name: 'Olivia Taylor', 
      email: 'olivia.t@email.com',
      grade: 'Grade 5-A', 
      class: '5-A',
      parent: 'Patricia Taylor',
      contact: '+1 234-567-8906',
      status: 'Active',
      avatar: 'OT',
      color: 'bg-indigo-500'
    },
    { 
      id: 'STU-2024-001', 
      name: 'Michael Johnson', 
      email: 'michael.j@email.com',
      grade: 'Grade 5-A', 
      class: '5-A',
      parent: 'Robert Johnson',
      contact: '+1 234-567-8901',
      status: 'Active',
      avatar: 'MJ',
      color: 'bg-blue-500'
    },
    { 
      id: 'STU-2024-002', 
      name: 'Emily Davis', 
      email: 'emily.d@email.com',
      grade: 'Grade 4-B', 
      class: '4-B',
      parent: 'Sarah Davis',
      contact: '+1 234-567-8902',
      status: 'Active',
      avatar: 'ED',
      color: 'bg-purple-500'
    },
    { 
      id: 'STU-2024-003', 
      name: 'James Wilson', 
      email: 'james.w@email.com',
      grade: 'Grade 5-B', 
      class: '5-B',
      parent: 'Jennifer Wilson',
      contact: '+1 234-567-8903',
      status: 'Active',
      avatar: 'JW',
      color: 'bg-green-500'
    },
    { 
      id: 'STU-2024-004', 
      name: 'Sophia Martinez', 
      email: 'sophia.m@email.com',
      grade: 'Grade 3-A', 
      class: '3-A',
      parent: 'Carlos Martinez',
      contact: '+1 234-567-8904',
      status: 'Active',
      avatar: 'SM',
      color: 'bg-pink-500'
    },
    { 
      id: 'STU-2024-005', 
      name: 'Daniel Brown', 
      email: 'daniel.b@email.com',
      grade: 'Grade 4-A', 
      class: '4-A',
      parent: 'Lisa Brown',
      contact: '+1 234-567-8905',
      status: 'Pending',
      avatar: 'DB',
      color: 'bg-orange-500'
    },
    { 
      id: 'STU-2024-006', 
      name: 'Olivia Taylor', 
      email: 'olivia.t@email.com',
      grade: 'Grade 5-A', 
      class: '5-A',
      parent: 'Patricia Taylor',
      contact: '+1 234-567-8906',
      status: 'Active',
      avatar: 'OT',
      color: 'bg-indigo-500'
    },
    { 
      id: 'STU-2024-001', 
      name: 'Michael Johnson', 
      email: 'michael.j@email.com',
      grade: 'Grade 5-A', 
      class: '5-A',
      parent: 'Robert Johnson',
      contact: '+1 234-567-8901',
      status: 'Active',
      avatar: 'MJ',
      color: 'bg-blue-500'
    },
    { 
      id: 'STU-2024-002', 
      name: 'Emily Davis', 
      email: 'emily.d@email.com',
      grade: 'Grade 4-B', 
      class: '4-B',
      parent: 'Sarah Davis',
      contact: '+1 234-567-8902',
      status: 'Active',
      avatar: 'ED',
      color: 'bg-purple-500'
    },
    { 
      id: 'STU-2024-003', 
      name: 'James Wilson', 
      email: 'james.w@email.com',
      grade: 'Grade 5-B', 
      class: '5-B',
      parent: 'Jennifer Wilson',
      contact: '+1 234-567-8903',
      status: 'Active',
      avatar: 'JW',
      color: 'bg-green-500'
    },
    { 
      id: 'STU-2024-004', 
      name: 'Sophia Martinez', 
      email: 'sophia.m@email.com',
      grade: 'Grade 3-A', 
      class: '3-A',
      parent: 'Carlos Martinez',
      contact: '+1 234-567-8904',
      status: 'Active',
      avatar: 'SM',
      color: 'bg-pink-500'
    },
    { 
      id: 'STU-2024-005', 
      name: 'Daniel Brown', 
      email: 'daniel.b@email.com',
      grade: 'Grade 4-A', 
      class: '4-A',
      parent: 'Lisa Brown',
      contact: '+1 234-567-8905',
      status: 'Pending',
      avatar: 'DB',
      color: 'bg-orange-500'
    },
    { 
      id: 'STU-2024-006', 
      name: 'Olivia Taylor', 
      email: 'olivia.t@email.com',
      grade: 'Grade 5-A', 
      class: '5-A',
      parent: 'Patricia Taylor',
      contact: '+1 234-567-8906',
      status: 'Active',
      avatar: 'OT',
      color: 'bg-indigo-500'
    },
  ]);

  // Add filter state
  const [filters, setFilters] = useState({ class: 'All Classes', status: 'All Status', year: 'Academic Year: 2024' });

  // Filtered students
  const filteredStudents = students.filter(student => {
    const classMatch = filters.class === 'All Classes' || student.grade === filters.class;
    const statusMatch = filters.status === 'All Status' || student.status === filters.status;
    // Academic year filter is a placeholder, as no year in data
    return classMatch && statusMatch;
  });

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedStudents(paginatedStudents.map(s => s.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (id: string) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter(sid => sid !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  type StatCardProps = {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
    change?: string;
    changeLabel?: string;
    iconBg: string;
    iconColor: string;
  };

  const StatCard = ({ icon: Icon, label, value, change, changeLabel, iconBg, iconColor }: StatCardProps) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600 font-medium mb-1">{label}</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{value}</h3>
          <div className="flex items-center text-sm">
            {change && (
              <>
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600 font-medium">{change}</span>
                <span className="text-gray-500 ml-1">{changeLabel}</span>
              </>
            )}
            {!change && <span className="text-gray-500">{changeLabel}</span>}
          </div>
        </div>
        <div className={`${iconBg} p-3 rounded-lg`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );

  const StudentsScreen = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          label="Total Students"
          value="2,847"
          change="12%"
          changeLabel="from last month"
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          icon={UserPlus}
          label="Active Students"
          value="2,734"
          change="8%"
          changeLabel="from last month"
          iconBg="bg-green-50"
          iconColor="text-green-600"
        />
        <StatCard
          icon={Users}
          label="New Admissions"
          value="156"
          changeLabel="This semester"
          iconBg="bg-indigo-50"
          iconColor="text-indigo-600"
        />
        <StatCard
          icon={GraduationCap}
          label="Graduated"
          value="423"
          changeLabel="Last year"
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white" value={filters.class} onChange={e => setFilters(f => ({ ...f, class: e.target.value }))}>
                <option>All Classes</option>
                <option>Grade 3-A</option>
                <option>Grade 4-A</option>
                <option>Grade 4-B</option>
                <option>Grade 5-A</option>
                <option>Grade 5-B</option>
              </select>
              <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white" value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
                <option>All Status</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Inactive</option>
              </select>
              <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white" value={filters.year} onChange={e => setFilters(f => ({ ...f, year: e.target.value }))}>
                <option>Academic Year: 2024</option>
                <option>Academic Year: 2023</option>
              </select>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                More Filters
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-indigo-700 transition-colors" onClick={() => setModal({ type: 'add', student: null })}>
                <Plus className="w-4 h-4" />
                Add Student
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">All Students</h3>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg ${viewMode === 'table' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:bg-gray-50'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:bg-gray-50'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 text-left">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300"
                      checked={selectedStudents.length === paginatedStudents.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="pb-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Student ID</th>
                  <th className="pb-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="pb-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Class</th>
                  <th className="pb-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Parent/Guardian</th>
                  <th className="pb-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                  <th className="pb-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="pb-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => handleSelectStudent(student.id)}
                      />
                    </td>
                    <td className="py-4 text-sm font-medium text-gray-900">{student.id}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className={`${student.color} w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm`}>
                          {student.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{student.name}</p>
                          <p className="text-xs text-gray-500">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-gray-700">{student.grade}</td>
                    <td className="py-4 text-sm text-gray-700">{student.parent}</td>
                    <td className="py-4 text-sm text-gray-700">{student.contact}</td>
                    <td className="py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-medium ${
                        student.status === 'Active' 
                          ? 'bg-green-50 text-green-700' 
                          : 'bg-yellow-50 text-yellow-700'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="View" onClick={() => setViewStudent(student)}>
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="Edit" onClick={() => setModal({ type: 'edit', student })}>
                          <Edit2 className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="Delete" onClick={() => setStudents(prev => prev.filter(s => s.id !== student.id))}>
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, students.length)} of {students.length} students
            </p>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-indigo-600 text-white'
                          : 'border border-gray-200 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      {page}
                    </button>
                  );
                }
                if (page === currentPage - 2 || page === currentPage + 2) {
                  return <span key={page} className="px-2 text-gray-400">...</span>;
                }
                return null;
              })}
              <button 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Type for a student
  interface Student {
    id: string;
    name: string;
    email: string;
    grade: string;
    class: string;
    parent: string;
    contact: string;
    status: string;
    avatar: string;
    color: string;
  }

  // Modal state type
  const [modal, setModal] = useState<{ type: string; student: Student | null }>({ type: '', student: null });
  const [viewStudent, setViewStudent] = useState<Student | null>(null);

  // Modal component
  const Modal: React.FC<{ open: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ open, onClose, title, children }) => {
    if (!open) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white rounded-lg shadow-lg max-w-lg w-full relative animate-fadeIn">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            {children}
          </div>
        </div>
      </div>
    );
  };

  // Add StudentDetailsModal component
  const StudentDetailsModal: React.FC<{ student: Student | null; onClose: () => void }> = ({ student, onClose }) => {
    if (!student) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full relative animate-fadeIn">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className={`${student.color} w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl`}>{student.avatar}</div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">{student.name}</h2>
                <div className="text-sm text-gray-500">{student.email}</div>
              </div>
            </div>
            <div className="space-y-2">
              <div><span className="font-medium">Student ID:</span> {student.id}</div>
              <div><span className="font-medium">Grade:</span> {student.grade}</div>
              <div><span className="font-medium">Class:</span> {student.class}</div>
              <div><span className="font-medium">Parent/Guardian:</span> {student.parent}</div>
              <div><span className="font-medium">Contact:</span> {student.contact}</div>
              <div><span className="font-medium">Status:</span> <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${student.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{student.status}</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Add Student Form component
  const AddStudentForm: React.FC<{ onSubmit: (student: Omit<Student, 'id' | 'avatar' | 'color'>) => void; onCancel: () => void }> = ({ onSubmit, onCancel }) => {
    const [form, setForm] = useState({
      name: '',
      email: '',
      grade: '',
      class: '',
      parent: '',
      contact: '',
      status: 'Active',
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    };
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(form);
    };
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input name="email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2" required type="email" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Grade</label>
          <input name="grade" value={form.grade} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Class</label>
          <input name="class" value={form.class} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Parent/Guardian</label>
          <input name="parent" value={form.parent} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Contact</label>
          <input name="contact" value={form.contact} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select name="status" value={form.status} onChange={handleChange} className="w-full border rounded px-3 py-2">
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="flex gap-2 justify-end">
          <button type="button" className="bg-gray-200 px-4 py-2 rounded" onClick={onCancel}>Cancel</button>
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Add Student</button>
        </div>
      </form>
    );
  };

  // Edit Student Form component
  const EditStudentForm: React.FC<{ student: Student; onSubmit: (student: Student) => void; onCancel: () => void }> = ({ student, onSubmit, onCancel }) => {
    const [form, setForm] = useState({ ...student });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    };
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(form);
    };
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input name="email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2" required type="email" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Grade</label>
          <input name="grade" value={form.grade} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Class</label>
          <input name="class" value={form.class} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Parent/Guardian</label>
          <input name="parent" value={form.parent} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Contact</label>
          <input name="contact" value={form.contact} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select name="status" value={form.status} onChange={handleChange} className="w-full border rounded px-3 py-2">
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="flex gap-2 justify-end">
          <button type="button" className="bg-gray-200 px-4 py-2 rounded" onClick={onCancel}>Cancel</button>
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Save Changes</button>
        </div>
      </form>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
     

      <main className="flex-1 overflow-auto">
        

        <div className="p-8">
          <StudentsScreen />
        </div>
      </main>

      {/* Modal rendering */}
      <Modal open={modal.type === 'add'} onClose={() => setModal({ type: '', student: null })} title="Add Student">
        <AddStudentForm
          onSubmit={data => {
            // Add student logic (demo only, not persistent)
            setStudents(prev => [
              ...prev,
              {
                ...data,
                id: `STU-2024-${(prev.length + 1).toString().padStart(3, '0')}`,
                avatar: data.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2),
                color: 'bg-blue-500',
              },
            ]);
            setModal({ type: '', student: null });
          }}
          onCancel={() => setModal({ type: '', student: null })}
        />
      </Modal>
      <Modal open={modal.type === 'edit'} onClose={() => setModal({ type: '', student: null })} title="Edit Student">
        {modal.student && (
          <EditStudentForm
            student={modal.student}
            onSubmit={data => {
              setStudents(prev => prev.map(s => s.id === data.id ? { ...s, ...data } : s));
              setModal({ type: '', student: null });
            }}
            onCancel={() => setModal({ type: '', student: null })}
          />
        )}
      </Modal>
      <StudentDetailsModal student={viewStudent} onClose={() => setViewStudent(null)} />
    </div>
  );
};

export default SchoolAdminPanel;