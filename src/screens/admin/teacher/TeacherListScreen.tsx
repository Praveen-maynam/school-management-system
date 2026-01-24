
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Download, Filter, Plus, Upload, Archive } from 'lucide-react';
// // import AddTeacherScreen from './AddTeacherScreen'; // Uncomment if you have this


// interface Teacher {
//     id: number;
//     employeeId: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     department: string;
//     phone: string;
//     status: 'Active' | 'Inactive';
// }

// const sampleTeachers: Teacher[] = [
//     { id: 1, employeeId: 'EMP-001', firstName: 'Alice', lastName: 'Johnson', email: 'alice.j@email.com', department: 'Math', phone: '9876543210', status: 'Active' },
//     { id: 2, employeeId: 'EMP-002', firstName: 'Bob', lastName: 'Smith', email: 'bob.s@email.com', department: 'Science', phone: '9123456789', status: 'Inactive' },
//     { id: 3, employeeId: 'EMP-003', firstName: 'Carol', lastName: 'Brown', email: 'carol.b@email.com', department: 'English', phone: '9988776655', status: 'Active' },
// ];


// const TeacherListScreen: React.FC = () => {
//     const [teachers, setTeachers] = useState<Teacher[]>(sampleTeachers);
//     const [loading, setLoading] = useState(false);
//     const [search, setSearch] = useState('');
//     const [department, setDepartment] = useState('');
//     const [status, setStatus] = useState('');
//     const navigate = useNavigate();

//     // Dummy filter logic
//     const filtered = teachers.filter(t =>
//         (t.firstName + ' ' + t.lastName).toLowerCase().includes(search.toLowerCase()) ||
//         t.employeeId.toLowerCase().includes(search.toLowerCase())
//     ).filter(t =>
//         (department ? t.department === department : true) &&
//         (status ? t.status === status : true)
//     );

//     // Simulate delete action
//     const handleDelete = (id: number) => {
//         setLoading(true);
//         setTimeout(() => {
//             setTeachers((prev) => prev.filter((t) => t.id !== id));
//             setLoading(false);
//         }, 800);
//     };

//     // Dummy export
//     const handleExport = () => {
//         alert('Exported (dummy)');
//     };

//     return (
//         <div className="max-w-7xl mx-auto bg-white rounded-xl shadow p-4 sm:p-6 mt-6">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
//                 <h2 className="text-xl sm:text-2xl font-bold">Teachers</h2>
//                 <div className="flex flex-wrap gap-2">
//                     <button
//                         className="btn-primary flex items-center gap-1"
//                         onClick={() => navigate('/admin/teachers/add')}
//                     >
//                         <Plus size={16} /> Add Teacher
//                     </button>
//                     <button
//                         className="btn-secondary flex items-center gap-1"
//                         onClick={() => navigate('/admin/teachers/bulk-upload')}
//                     >
//                         <Upload size={16} /> Bulk Upload
//                     </button>
//                     <button
//                         className="btn-secondary flex items-center gap-1"
//                         onClick={handleExport}
//                     >
//                         <Download size={16} /> Export
//                     </button>
//                     <button
//                         className="btn-secondary flex items-center gap-1"
//                         onClick={() => navigate('/admin/teachers/archived')}
//                     >
//                         <Archive size={16} /> Archived
//                     </button>
//                 </div>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-2 mb-4">
//                 <input
//                     className="input w-full sm:w-64"
//                     placeholder="Search Name or Employee ID"
//                     value={search}
//                     onChange={e => setSearch(e.target.value)}
//                 />
//                 <select
//                     className="input w-full sm:w-48"
//                     value={department}
//                     onChange={e => setDepartment(e.target.value)}
//                 >
//                     <option value="">All Departments</option>
//                     <option value="Math">Math</option>
//                     <option value="Science">Science</option>
//                     <option value="English">English</option>
//                 </select>
//                 <select
//                     className="input w-full sm:w-40"
//                     value={status}
//                     onChange={e => setStatus(e.target.value)}
//                 >
//                     <option value="">All Status</option>
//                     <option value="Active">Active</option>
//                     <option value="Inactive">Inactive</option>
//                 </select>
//             </div>
//             {loading && <div className="text-blue-600 mb-2">Processing...</div>}
//             {filtered.length === 0 ? (
//                 <div className="text-gray-500 py-8 text-center">No teachers found.</div>
//             ) : (
//                 <div className="overflow-x-auto">
//                     <table className="min-w-[800px] w-full border text-sm sm:text-base">
//                         <thead>
//                             <tr className="bg-gray-100">
//                                 <th className="px-4 py-2 text-left">Employee ID</th>
//                                 <th className="px-4 py-2 text-left">Name</th>
//                                 <th className="px-4 py-2 text-left">Department</th>
//                                 <th className="px-4 py-2 text-left">Phone</th>
//                                 <th className="px-4 py-2 text-left">Status</th>
//                                 <th className="px-4 py-2 text-left">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {filtered.map((teacher) => (
//                                 <tr key={teacher.id} className="border-b">
//                                     <td className="px-4 py-2">{teacher.employeeId}</td>
//                                     <td className="px-4 py-2">{teacher.firstName} {teacher.lastName}</td>
//                                     <td className="px-4 py-2">{teacher.department}</td>
//                                     <td className="px-4 py-2">{teacher.phone}</td>
//                                     <td className="px-4 py-2">
//                                         <span className={`px-2 py-1 rounded text-xs font-semibold ${teacher.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
//                                             {teacher.status}
//                                         </span>
//                                     </td>
//                                     <td className="px-4 py-2 flex gap-2">
//                                         <button className="text-blue-600 hover:underline text-sm" onClick={() => navigate(`/admin/teachers/${teacher.id}`)}>View</button>
//                                         <button className="text-yellow-600 hover:underline text-sm" onClick={() => navigate(`/admin/teachers/${teacher.id}/edit`)}>Edit</button>
//                                         <button
//                                             className="text-red-600 hover:underline text-sm"
//                                             onClick={() => handleDelete(teacher.id)}
//                                             disabled={loading}
//                                         >
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default TeacherListScreen;

import React, { useState } from 'react';
import { Users, BookOpen, Calendar, DollarSign, FileText, BarChart3, Settings, LogOut, Menu, X, Search, Plus, Edit2, Trash2, Eye, Download, Filter, Bell, Home, UserPlus, GraduationCap, TrendingUp, ChevronDown, Award, Clock, Mail, Phone, MapPin, Briefcase } from 'lucide-react';

type Teacher = {
  id: string;
  name: string;
  email: string;
  subject: string;
  department: string;
  qualification: string;
  experience: string;
  contact: string;
  address: string;
  joinDate: string;
  dateOfBirth: string;
  gender: string;
  employeeType: string;
  salary: string;
  status: string;
  avatar: string;
  color: string;
  classes: string[];
  achievements: string[];
};

const SchoolAdminPanel = () => {
  const [currentScreen, setCurrentScreen] = useState('teachers');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState('table');
  const [currentPage, setCurrentPage] = useState(1);
  // ...existing code...
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);
  // ...existing code...
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  
  const itemsPerPage = 6;

  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: 'TCH-2024-001',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.j@school.com',
      subject: 'Mathematics',
      department: 'Science',
      qualification: 'PhD in Mathematics',
      experience: '15 years',
      contact: '+1 234-567-9001',
      address: '123 Oak Street, City, State 12345',
      joinDate: 'Jan 15, 2015',
      dateOfBirth: 'May 20, 1978',
      gender: 'Female',
      employeeType: 'Full-time',
      salary: '$75,000',
      status: 'Active',
      avatar: 'SJ',
      color: 'bg-blue-500',
      classes: ['Grade 10-A', 'Grade 11-B'],
      achievements: ['Best Teacher Award 2023', 'Published 5 research papers']
    },
    {
      id: 'TCH-2024-002',
      name: 'Prof. Michael Chen',
      email: 'michael.c@school.com',
      subject: 'Physics',
      department: 'Science',
      qualification: 'MSc in Physics',
      experience: '12 years',
      contact: '+1 234-567-9002',
      address: '456 Maple Avenue, City, State 12345',
      joinDate: 'Mar 22, 2016',
      dateOfBirth: 'Aug 12, 1982',
      gender: 'Male',
      employeeType: 'Full-time',
      salary: '$72,000',
      status: 'Active',
      avatar: 'MC',
      color: 'bg-green-500',
      classes: ['Grade 9-A', 'Grade 10-B'],
      achievements: ['Excellence in Teaching 2022']
    },
    {
      id: 'TCH-2024-003',
      name: 'Ms. Emily Rodriguez',
      email: 'emily.r@school.com',
      subject: 'English Literature',
      department: 'Languages',
      qualification: 'MA in English',
      experience: '8 years',
      contact: '+1 234-567-9003',
      address: '789 Pine Road, City, State 12345',
      joinDate: 'Aug 10, 2018',
      dateOfBirth: 'Nov 05, 1988',
      gender: 'Female',
      employeeType: 'Full-time',
      salary: '$68,000',
      status: 'Active',
      avatar: 'ER',
      color: 'bg-purple-500',
      classes: ['Grade 8-A', 'Grade 9-B'],
      achievements: ['Drama Club Coordinator']
    },
    {
      id: 'TCH-2024-004',
      name: 'Dr. James Anderson',
      email: 'james.a@school.com',
      subject: 'Chemistry',
      department: 'Science',
      qualification: 'PhD in Chemistry',
      experience: '20 years',
      contact: '+1 234-567-9004',
      address: '321 Elm Street, City, State 12345',
      joinDate: 'Sep 05, 2012',
      dateOfBirth: 'Feb 14, 1975',
      gender: 'Male',
      employeeType: 'Full-time',
      salary: '$80,000',
      status: 'Active',
      avatar: 'JA',
      color: 'bg-orange-500',
      classes: ['Grade 11-A', 'Grade 12-A'],
      achievements: ['Science Fair Coordinator', 'Department Head']
    },
    {
      id: 'TCH-2024-005',
      name: 'Ms. Lisa Martinez',
      email: 'lisa.m@school.com',
      subject: 'History',
      department: 'Social Studies',
      qualification: 'MA in History',
      experience: '10 years',
      contact: '+1 234-567-9005',
      address: '654 Cedar Lane, City, State 12345',
      joinDate: 'Jun 18, 2017',
      dateOfBirth: 'Jul 30, 1985',
      gender: 'Female',
      employeeType: 'Full-time',
      salary: '$65,000',
      status: 'On Leave',
      avatar: 'LM',
      color: 'bg-pink-500',
      classes: ['Grade 7-A', 'Grade 8-B'],
      achievements: ['Model UN Advisor']
    },
    {
      id: 'TCH-2024-006',
      name: 'Prof. David Wilson',
      email: 'david.w@school.com',
      subject: 'Computer Science',
      department: 'Technology',
      qualification: 'MTech in CS',
      experience: '14 years',
      contact: '+1 234-567-9006',
      address: '987 Birch Boulevard, City, State 12345',
      joinDate: 'Apr 12, 2014',
      dateOfBirth: 'Mar 25, 1980',
      gender: 'Male',
      employeeType: 'Full-time',
      salary: '$78,000',
      status: 'Active',
      avatar: 'DW',
      color: 'bg-indigo-500',
      classes: ['Grade 10-A', 'Grade 11-A', 'Grade 12-B'],
      achievements: ['Coding Club Founder', 'Tech Innovation Award 2023']
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    department: '',
    qualification: '',
    experience: '',
    contact: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    employeeType: 'Full-time',
    salary: '',
    status: 'Active'
  });

  const totalPages = Math.ceil(teachers.length / itemsPerPage);
  const paginatedTeachers = teachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedTeachers(paginatedTeachers.map(t => t.id));
    } else {
      setSelectedTeachers([]);
    }
  };

  const handleSelectTeacher = (id: string) => {
    if (selectedTeachers.includes(id)) {
      setSelectedTeachers(selectedTeachers.filter(tid => tid !== id));
    } else {
      setSelectedTeachers([...selectedTeachers, id]);
    }
  };

  const handleView = (teacher: any) => {
    setSelectedTeacher(teacher);
    setShowViewModal(true);
  };

  const handleEdit = (teacher:any) => {
    setSelectedTeacher(teacher);
    setFormData({
      name: teacher.name,
      email: teacher.email,
      subject: teacher.subject,
      department: teacher.department,
      qualification: teacher.qualification,
      experience: teacher.experience,
      contact: teacher.contact,
      address: teacher.address,
      dateOfBirth: teacher.dateOfBirth,
      gender: teacher.gender,
      employeeType: teacher.employeeType,
      salary: teacher.salary,
      status: teacher.status
    });
    setShowEditModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      setTeachers(teachers.filter(t => t.id !== id));
    }
  };

  const handleAddTeacher = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTeacher = {
      id: `TCH-2024-${String(teachers.length + 1).padStart(3, '0')}`,
      ...formData,
      avatar: formData.name.split(' ').map(n => n[0]).join(''),
      color: ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500', 'bg-indigo-500'][Math.floor(Math.random() * 6)],
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      classes: [],
      achievements: []
    };
    setTeachers([...teachers, newTeacher]);
    setShowAddModal(false);
    setFormData({
      name: '',
      email: '',
      subject: '',
      department: '',
      qualification: '',
      experience: '',
      contact: '',
      address: '',
      dateOfBirth: '',
      gender: '',
      employeeType: 'Full-time',
      salary: '',
      status: 'Active'
    });
  };

  const handleUpdateTeacher = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedTeacher) return;
    setTeachers(teachers.map(t => 
      t.id === selectedTeacher.id 
        ? { ...t, ...formData }
        : t
    ));
    setShowEditModal(false);
    setSelectedTeacher(null);
  };

  type StatCardProps = {
    icon: React.ElementType;
    label: string;
    value: string | number;
    change?: string;
    changeLabel?: string;
    iconBg?: string;
    iconColor?: string;
  };

  const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, change, changeLabel, iconBg, iconColor }) => (
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

  type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    size?: string;
  };

  const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'max-w-2xl' }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>
          <div className={`inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ${size} w-full`}>
            <div className="bg-white px-6 pt-6 pb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ViewTeacherModal = () => (
    <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title="Teacher Details" size="max-w-4xl">
      {selectedTeacher && (
        <div className="space-y-6">
          <div className="flex items-start gap-6 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
            <div className={`${selectedTeacher.color} w-24 h-24 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg`}>
              {selectedTeacher.avatar}
            </div>
            <div className="flex-1">
              <h4 className="text-2xl font-bold text-gray-900 mb-2">{selectedTeacher.name}</h4>
              <p className="text-lg text-indigo-600 font-semibold mb-3">{selectedTeacher.subject} Teacher</p>
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedTeacher.status === 'Active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {selectedTeacher.status}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                  {selectedTeacher.employeeType}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                  {selectedTeacher.department}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h5 className="font-semibold text-gray-900 text-lg border-b pb-2">Personal Information</h5>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-900">{selectedTeacher.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Contact</p>
                    <p className="text-sm font-medium text-gray-900">{selectedTeacher.contact}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Date of Birth</p>
                    <p className="text-sm font-medium text-gray-900">{selectedTeacher.dateOfBirth}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Gender</p>
                    <p className="text-sm font-medium text-gray-900">{selectedTeacher.gender}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="text-sm font-medium text-gray-900">{selectedTeacher.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-semibold text-gray-900 text-lg border-b pb-2">Professional Information</h5>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Qualification</p>
                    <p className="text-sm font-medium text-gray-900">{selectedTeacher.qualification}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Experience</p>
                    <p className="text-sm font-medium text-gray-900">{selectedTeacher.experience}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Join Date</p>
                    <p className="text-sm font-medium text-gray-900">{selectedTeacher.joinDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Salary</p>
                    <p className="text-sm font-medium text-gray-900">{selectedTeacher.salary}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Employee Type</p>
                    <p className="text-sm font-medium text-gray-900">{selectedTeacher.employeeType}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h5 className="font-semibold text-gray-900 text-lg border-b pb-2">Classes Teaching</h5>
            <div className="flex flex-wrap gap-2">
              {selectedTeacher.classes.map((cls, idx) => (
                <span key={idx} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium">
                  {cls}
                </span>
              ))}
            </div>
          </div>

          {selectedTeacher.achievements.length > 0 && (
            <div className="space-y-4">
              <h5 className="font-semibold text-gray-900 text-lg border-b pb-2">Achievements</h5>
              <ul className="space-y-2">
                {selectedTeacher.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                    <Award className="w-4 h-4 text-yellow-500" />
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button 
              onClick={() => {
                setShowViewModal(false);
                handleEdit(selectedTeacher);
              }}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Edit Details
            </button>
            <button 
              onClick={() => setShowViewModal(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Modal>
  );

  const TeacherFormModal = ({ isEdit = false }) => {
    const isOpen = isEdit ? showEditModal : showAddModal;
    const setIsOpen = isEdit ? setShowEditModal : setShowAddModal;
    const handleSubmit = isEdit ? handleUpdateTeacher : handleAddTeacher;

    return (
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={isEdit ? 'Edit Teacher' : 'Add New Teacher'} size="max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="teacher@school.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., Mathematics"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
              <select
                required
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Select Department</option>
                <option value="Science">Science</option>
                <option value="Languages">Languages</option>
                <option value="Social Studies">Social Studies</option>
                <option value="Technology">Technology</option>
                <option value="Arts">Arts</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Qualification *</label>
              <input
                type="text"
                required
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., PhD in Mathematics"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience *</label>
              <input
                type="text"
                required
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., 10 years"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number *</label>
              <input
                type="tel"
                required
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="+1 234-567-8900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
              <input
                type="text"
                required
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Jan 15, 1980"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
              <select
                required
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employee Type *</label>
              <select
                required
                value={formData.employeeType}
                onChange={(e) => setFormData({ ...formData, employeeType: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Salary *</label>
              <input
                type="text"
                required
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="$60,000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
              <select
                required
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
            <textarea
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter complete address"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              {isEdit ? 'Update Teacher' : 'Add Teacher'}
            </button>
          </div>
        </form>
      </Modal>
    );
  };

  const TeachersScreen = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          label="Total Teachers"
          value={teachers.length.toString()}
          change="5%"
          changeLabel="from last month"
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          icon={GraduationCap}
          label="Departments"
          value="5"
          change={undefined}
          changeLabel="Active departments"
          iconBg="bg-green-50"
          iconColor="text-green-600"
        />
        <StatCard
          icon={Award}
          label="Avg Experience"
          value="13 yrs"
          change={undefined}
          changeLabel="Across faculty"
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          icon={TrendingUp}
          label="Active Ratio"
          value="83%"
          change={undefined}
          changeLabel="Staff availability"
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
        />
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search teachers..."
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <UserPlus className="w-4 h-4" /> Add Teacher
        </button>
      </div>

      {/* Teachers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="p-4">
                <input type="checkbox" onChange={handleSelectAll} />
              </th>
              <th className="p-4">Teacher</th>
              <th className="p-4">Department</th>
              <th className="p-4">Experience</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTeachers.map((teacher) => (
              <tr key={teacher.id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedTeachers.includes(teacher.id)}
                    onChange={() => handleSelectTeacher(teacher.id)}
                  />
                </td>
                <td className="p-4 flex items-center gap-3">
                  <div className={`${teacher.color} w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold`}>
                    {teacher.avatar}
                  </div>
                  <div>
                    <p className="font-semibold">{teacher.name}</p>
                    <p className="text-xs text-gray-500">{teacher.subject}</p>
                  </div>
                </td>
                <td className="p-4">{teacher.department}</td>
                <td className="p-4">{teacher.experience}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    teacher.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {teacher.status}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => handleView(teacher)} className="p-2 hover:bg-gray-100 rounded">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleEdit(teacher)} className="p-2 hover:bg-gray-100 rounded">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(teacher.id)} className="p-2 hover:bg-red-100 text-red-600 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </p>
        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modals */}
      <ViewTeacherModal />
      <TeacherFormModal />
      <TeacherFormModal isEdit />
    </div>
  );
  
// ...existing code above...

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar and Topbar can be added here if needed */}
      <main className="p-6">
        {/* Render the TeachersScreen if currentScreen is 'teachers' */}
        {currentScreen === 'teachers' && <TeachersScreen />}
        {/* You can add more screens here, e.g.:
            {currentScreen === 'students' && <StudentsScreen />}
        */}
      </main>
    </div>
  );
};

export default SchoolAdminPanel;