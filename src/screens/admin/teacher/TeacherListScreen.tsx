

import React, { useState } from 'react';
import { Users, BookOpen, Calendar, DollarSign, FileText, BarChart3, Settings, LogOut, Menu, X, Search, Plus, Edit2, Trash2, Eye, Download, Filter, Bell, Home, UserPlus, GraduationCap, TrendingUp, ChevronDown, Award, Clock, Mail, Phone, MapPin, Briefcase, Upload, File, CheckCircle, XCircle } from 'lucide-react';

type Payslip = {
  id: string;
  file: string;
  month: string;
  year: number;
  amount: string;
  uploadedDate: string;
  status: 'Paid' | 'Pending' | 'Processing';
};

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
  payslips?: Payslip[];
};

const SchoolAdminPanel = () => {
    // Big Avatar Modal State (top-level)
    const [showBigAvatarModal, setShowBigAvatarModal] = useState(false);

    // Big Avatar Modal (top-level)
    const BigAvatarModal = () => (
      <Modal isOpen={showBigAvatarModal} onClose={() => setShowBigAvatarModal(false)} title={selectedTeacher ? selectedTeacher.name : ''} size="max-w-md">
        {selectedTeacher && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className={`${selectedTeacher.color} w-48 h-48 rounded-3xl flex items-center justify-center text-white font-extrabold text-7xl shadow-2xl mb-6`}>
              {selectedTeacher.avatar}
            </div>
            <div className="text-center">
              <h4 className="text-2xl font-bold text-gray-900 mb-2">{selectedTeacher.name}</h4>
              <p className="text-lg text-gray-600">{selectedTeacher.subject} • {selectedTeacher.department}</p>
            </div>
          </div>
        )}
      </Modal>
    );
  const [currentScreen, setCurrentScreen] = useState('teachers');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPayslipModal, setShowPayslipModal] = useState(false);
  const [showAddPayslipModal, setShowAddPayslipModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  
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
      payslips: [
        { 
          id: 'PS-001-01',
          file: 'SarahJohnson_Jan2026.pdf', 
          month: 'January', 
          year: 2026,
          amount: '$6,250',
          uploadedDate: '2026-01-31',
          status: 'Paid'
        },
        { 
          id: 'PS-001-02',
          file: 'SarahJohnson_Dec2025.pdf', 
          month: 'December', 
          year: 2025,
          amount: '$6,250',
          uploadedDate: '2025-12-31',
          status: 'Paid'
        },
        { 
          id: 'PS-001-03',
          file: 'SarahJohnson_Nov2025.pdf', 
          month: 'November', 
          year: 2025,
          amount: '$6,250',
          uploadedDate: '2025-11-30',
          status: 'Paid'
        }
      ],
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
      payslips: [
        { 
          id: 'PS-002-01',
          file: 'MichaelChen_Jan2026.pdf', 
          month: 'January', 
          year: 2026,
          amount: '$6,000',
          uploadedDate: '2026-01-31',
          status: 'Paid'
        },
        { 
          id: 'PS-002-02',
          file: 'MichaelChen_Dec2025.pdf', 
          month: 'December', 
          year: 2025,
          amount: '$6,000',
          uploadedDate: '2025-12-31',
          status: 'Paid'
        }
      ],
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
      payslips: [
        { 
          id: 'PS-003-01',
          file: 'EmilyRodriguez_Jan2026.pdf', 
          month: 'January', 
          year: 2026,
          amount: '$5,666',
          uploadedDate: '2026-02-05',
          status: 'Processing'
        }
      ],
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
      payslips: [],
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
      payslips: [],
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
      payslips: [
        { 
          id: 'PS-006-01',
          file: 'DavidWilson_Jan2026.pdf', 
          month: 'January', 
          year: 2026,
          amount: '$6,500',
          uploadedDate: '2026-01-31',
          status: 'Paid'
        }
      ],
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

  const [payslipFormData, setPayslipFormData] = useState({
    month: '',
    year: new Date().getFullYear(),
    amount: '',
    status: 'Paid' as 'Paid' | 'Pending' | 'Processing',
    file: null as File | null
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

  const handleView = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setShowViewModal(true);
  };

  const handleEdit = (teacher: Teacher) => {
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

  const handleViewPayslips = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setShowPayslipModal(true);
  };

  const handleAddPayslip = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setPayslipFormData({
      month: '',
      year: new Date().getFullYear(),
      amount: '',
      status: 'Paid',
      file: null
    });
    setShowAddPayslipModal(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should not exceed 5MB');
        return;
      }
      setPayslipFormData({ ...payslipFormData, file });
    }
  };

  const handleSubmitPayslip = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedTeacher || !payslipFormData.file) return;

    setUploadingFile(true);
    
    // Simulate file upload
    setTimeout(() => {
      const newPayslip: Payslip = {
        id: `PS-${selectedTeacher.id.split('-')[2]}-${String((selectedTeacher.payslips?.length || 0) + 1).padStart(2, '0')}`,
        file: payslipFormData.file ? payslipFormData.file.name : "",
        month: payslipFormData.month,
        year: payslipFormData.year,
        amount: payslipFormData.amount,
        uploadedDate: new Date().toISOString().split('T')[0],
        status: payslipFormData.status
      };

      setTeachers(teachers.map(t => 
        t.id === selectedTeacher.id 
          ? { ...t, payslips: [newPayslip, ...(t.payslips || [])] }
          : t
      ));

      setUploadingFile(false);
      setShowAddPayslipModal(false);
      alert('Payslip uploaded successfully!');
    }, 1500);
  };

  const handleDeletePayslip = (teacherId: string, payslipId: string) => {
    if (window.confirm('Are you sure you want to delete this payslip?')) {
      setTeachers(teachers.map(t => 
        t.id === teacherId 
          ? { ...t, payslips: t.payslips?.filter(p => p.id !== payslipId) }
          : t
      ));
    }
  };

  const handleDownloadPayslip = (payslip: Payslip) => {
    // Simulate download
    alert(`Downloading ${payslip.file}...`);
    // In production, this would trigger actual file download
    // window.open(`/api/payslips/download/${payslip.id}`, '_blank');
  };

  const handleAddTeacher = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTeacher: Teacher = {
      id: `TCH-2024-${String(teachers.length + 1).padStart(3, '0')}`,
      ...formData,
      avatar: formData.name.split(' ').map(n => n[0]).join(''),
      color: ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500', 'bg-indigo-500'][Math.floor(Math.random() * 6)],
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      classes: [],
      achievements: [],
      payslips: []
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

  const PayslipManagementModal = () => (
    <Modal isOpen={showPayslipModal} onClose={() => setShowPayslipModal(false)} title="Payslip Management" size="max-w-4xl">
      {selectedTeacher && (
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
            <div className="flex items-center gap-4">
              <div className={`${selectedTeacher.color} w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-2xl`}>
                {selectedTeacher.avatar}
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900">{selectedTeacher.name}</h4>
                <p className="text-sm text-gray-600">{selectedTeacher.email}</p>
                <p className="text-sm text-indigo-600 font-semibold mt-1">
                  Monthly Salary: {selectedTeacher.salary}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowPayslipModal(false);
                handleAddPayslip(selectedTeacher);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Upload className="w-4 h-4" /> Upload Payslip
            </button>
          </div>

          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 text-lg">Payslip History</h5>
            
            {(!selectedTeacher.payslips || selectedTeacher.payslips.length === 0) ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No payslips uploaded yet</p>
                <button
                  onClick={() => {
                    setShowPayslipModal(false);
                    handleAddPayslip(selectedTeacher);
                  }}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Upload First Payslip
                </button>
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {selectedTeacher.payslips.map((payslip) => (
                  <div key={payslip.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="bg-red-100 p-3 rounded-lg">
                        <FileText className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{payslip.month} {payslip.year}</p>
                        <p className="text-sm text-gray-500">{payslip.file}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm font-medium text-green-600">{payslip.amount}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">Uploaded: {payslip.uploadedDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        payslip.status === 'Paid' ? 'bg-green-100 text-green-700' :
                        payslip.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {payslip.status}
                      </span>
                      <button
                        onClick={() => handleDownloadPayslip(payslip)}
                        className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePayslip(selectedTeacher.id, payslip.id)}
                        className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end pt-4 border-t">
            <button
              onClick={() => setShowPayslipModal(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Modal>
  );

  const AddPayslipModal = () => (
    <Modal isOpen={showAddPayslipModal} onClose={() => setShowAddPayslipModal(false)} title="Upload Payslip" size="max-w-2xl">
      {selectedTeacher && (
        <form onSubmit={handleSubmitPayslip} className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`${selectedTeacher.color} w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold`}>
                {selectedTeacher.avatar}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{selectedTeacher.name}</p>
                <p className="text-sm text-gray-600">{selectedTeacher.subject} • {selectedTeacher.department}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Month *</label>
              <select
                required
                value={payslipFormData.month}
                onChange={(e) => setPayslipFormData({ ...payslipFormData, month: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Select Month</option>
                {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year *</label>
              <select
                required
                value={payslipFormData.year}
                onChange={(e) => setPayslipFormData({ ...payslipFormData, year: parseInt(e.target.value) })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount Paid *</label>
              <input
                type="text"
                required
                value={payslipFormData.amount}
                onChange={(e) => setPayslipFormData({ ...payslipFormData, amount: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="$6,250"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status *</label>
              <select
                required
                value={payslipFormData.status}
                onChange={(e) => setPayslipFormData({ ...payslipFormData, status: e.target.value as 'Paid' | 'Pending' | 'Processing' })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="Paid">Paid</option>
                <option value="Processing">Processing</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Payslip PDF *</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-400 transition-colors">
              <div className="space-y-1 text-center">
                {payslipFormData.file ? (
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">{payslipFormData.file ? payslipFormData.file.name : ""}</p>
                      <p className="text-xs text-gray-500">{(payslipFormData.file.size / 1024).toFixed(2)} KB</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPayslipFormData({ ...payslipFormData, file: null })}
                      className="ml-auto p-1 hover:bg-red-100 text-red-600 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          required
                          accept=".pdf"
                          onChange={handleFileUpload}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF up to 5MB</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => setShowAddPayslipModal(false)}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              disabled={uploadingFile}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center gap-2"
              disabled={uploadingFile}
            >
              {uploadingFile ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Upload Payslip
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );

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
            <div className="flex items-center justify-between">
              <h5 className="font-semibold text-gray-900 text-lg">Payslip Records</h5>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  handleViewPayslips(selectedTeacher);
                }}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                View All →
              </button>
            </div>
            {selectedTeacher.payslips && selectedTeacher.payslips.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {selectedTeacher.payslips.slice(0, 4).map((payslip) => (
                  <div key={payslip.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    <FileText className="w-8 h-8 text-red-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{payslip.month} {payslip.year}</p>
                      <p className="text-xs text-gray-500">{payslip.amount}</p>
                    </div>
                    <Download 
                      className="w-4 h-4 text-gray-400 hover:text-indigo-600 cursor-pointer flex-shrink-0" 
                      onClick={() => handleDownloadPayslip(payslip)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 py-4 text-center bg-gray-50 rounded-lg">No payslips uploaded</p>
            )}
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


          {/* Timetable Section */}
          <div className="space-y-4">
            <h5 className="font-semibold text-gray-900 text-lg border-b pb-2">Weekly Timetable</h5>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg bg-white">
                <thead>
                  <tr className="bg-indigo-50">
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Day</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Period 1</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Period 2</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Period 3</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Period 4</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Period 5</th>
                  </tr>
                </thead>
                <tbody>
                  {['Monday','Tuesday','Wednesday','Thursday','Friday'].map((day, i) => (
                    <tr key={day} className={i%2===0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-2 font-medium text-gray-700">{day}</td>
                      <td className="px-4 py-2">Math</td>
                      <td className="px-4 py-2">Science</td>
                      <td className="px-4 py-2">English</td>
                      <td className="px-4 py-2">History</td>
                      <td className="px-4 py-2">PE</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

  const TeachersScreen = () => {
    const [selectedDate, setSelectedDate] = useState(() => {
      const today = new Date();
      return today.toISOString().split('T')[0];
    });
    
    const getAttendanceStatus = (id: string) => {
      const hash = id.charCodeAt(0) + selectedDate.charCodeAt(selectedDate.length - 1);
      return hash % 2 === 0 ? 'Present' : 'Absent';
    };

    return (
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
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Date</span>
              <input
                type="date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg "
          >
            <UserPlus className="w-4 h-4" /> Add Teacher
          </button>
        </div>

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
                <th className="p-4">Attendance</th>
                <th className="p-4">Payslips</th>
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
                    <button
                      type="button"
                      className={`${teacher.color} w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:scale-105 transition-transform`}
                      title={`View ${teacher.name} Avatar`}
                      onClick={() => {
                        setSelectedTeacher(teacher);
                        setShowBigAvatarModal(true);
                      }}
                    >
                      {teacher.avatar}
                    </button>
                    <div>
                      <p className="font-semibold">{teacher.name}</p>
                      <p className="text-xs text-gray-500">{teacher.subject}</p>
                    </div>
                  </td>
                  <td className="p-4">{teacher.department}</td>
                  <td className="p-4">{teacher.experience}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getAttendanceStatus(teacher.id) === 'Present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {getAttendanceStatus(teacher.id)}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleViewPayslips(teacher)}
                      className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      <FileText className="w-4 h-4" />
                      {teacher.payslips?.length || 0}
                    </button>
                  </td>
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
                    <button onClick={() => handleView(teacher)} className="p-2 hover:bg-gray-100 rounded" title="View">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleEdit(teacher)} className="p-2 hover:bg-gray-100 rounded" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleAddPayslip(teacher)} className="p-2 hover:bg-indigo-100 text-indigo-600 rounded" title="Add Payslip">
                      <Upload className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(teacher.id)} className="p-2 hover:bg-red-100 text-red-600 rounded" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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

        <ViewTeacherModal />
        <TeacherFormModal />
        <TeacherFormModal isEdit />
        <PayslipManagementModal />
        <AddPayslipModal />
        {/* Only render BigAvatarModal at the top level, not here */}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-6">
        {currentScreen === 'teachers' && <TeachersScreen />}
        <BigAvatarModal />
      </main>
    </div>
  );
};

export default SchoolAdminPanel;