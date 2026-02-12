import React, { useState } from 'react';
import { ChevronDown, Calendar, Upload, X, CheckCircle, Clock, XCircle, AlertCircle, FileText, User, Send, Eye, MessageSquare } from 'lucide-react';

// Type Definitions
interface Student {
  id: string;
  name: string;
  class: string;
}

interface LeaveApplication {
  id: number;
  studentName: string;
  class: string;
  leaveType: string;
  fromDate: string;
  toDate: string;
  reason: string;
  appliedOn: string;
  status: 'approved' | 'pending' | 'rejected';
  remarks?: string;
  approvalDate?: string;
  approvedBy?: string;
  attachment?: string;
}

type LeaveType = 'sick' | 'personal' | 'family' | 'medical' | 'other';

const LeaveApplicationScreen: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<string>('aarav');
  const [leaveType, setLeaveType] = useState<string>('');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [selectedLeave, setSelectedLeave] = useState<LeaveApplication | null>(null);
  const [showDetailPanel, setShowDetailPanel] = useState<boolean>(false);

  const students: Student[] = [
    { id: 'aarav', name: 'Aarav Kumar', class: 'Class 8 A' },
    { id: 'ananya', name: 'Ananya Sharma', class: 'Class 5 B' }
  ];

  const leaveHistory: LeaveApplication[] = [
    {
      id: 1,
      studentName: 'Aarav Kumar',
      class: 'Class 8 A',
      leaveType: 'Sick Leave',
      fromDate: '2026-02-05',
      toDate: '2026-02-07',
      reason: 'Suffering from viral fever. Doctor advised 3 days rest.',
      appliedOn: '2026-02-04',
      status: 'approved',
      remarks: 'Approved. Get well soon!',
      approvalDate: '2026-02-04',
      approvedBy: 'Ms. Priya Sharma',
      attachment: 'medical_certificate.pdf'
    },
    {
      id: 2,
      studentName: 'Aarav Kumar',
      class: 'Class 8 A',
      leaveType: 'Family Function',
      fromDate: '2026-01-20',
      toDate: '2026-01-22',
      reason: 'Attending cousin\'s wedding in Jaipur',
      appliedOn: '2026-01-15',
      status: 'approved',
      approvalDate: '2026-01-16',
      approvedBy: 'Ms. Priya Sharma'
    },
    {
      id: 3,
      studentName: 'Aarav Kumar',
      class: 'Class 8 A',
      leaveType: 'Personal',
      fromDate: '2026-02-15',
      toDate: '2026-02-16',
      reason: 'Family trip to Goa',
      appliedOn: '2026-02-08',
      status: 'pending'
    },
    {
      id: 4,
      studentName: 'Aarav Kumar',
      class: 'Class 8 A',
      leaveType: 'Medical',
      fromDate: '2025-12-10',
      toDate: '2025-12-11',
      reason: 'Dental appointment',
      appliedOn: '2025-12-08',
      status: 'rejected',
      remarks: 'Please schedule medical appointments during holidays when possible.',
      approvalDate: '2025-12-09',
      approvedBy: 'Principal'
    }
  ];

  const currentStudent = students.find(s => s.id === selectedStudent);
  
  const approvedCount = leaveHistory.filter(l => l.status === 'approved').length;
  const pendingCount = leaveHistory.filter(l => l.status === 'pending').length;
  const rejectedCount = leaveHistory.filter(l => l.status === 'rejected').length;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const removeAttachment = (): void => {
    setAttachment(null);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log('Submitting leave application:', {
      studentName: currentStudent?.name,
      class: currentStudent?.class,
      leaveType,
      fromDate,
      toDate,
      reason,
      attachment
    });
    // Reset form
    setLeaveType('');
    setFromDate('');
    setToDate('');
    setReason('');
    setAttachment(null);
  };

  const isFormValid = (): boolean => {
    return !!(leaveType && fromDate && toDate && reason.trim());
  };

  const viewLeaveDetail = (leave: LeaveApplication): void => {
    setSelectedLeave(leave);
    setShowDetailPanel(true);
  };

  const closeDetailPanel = (): void => {
    setShowDetailPanel(false);
    setSelectedLeave(null);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'approved':
        return {
          color: 'bg-green-100 text-green-700 border-green-300',
          icon: <CheckCircle className="w-4 h-4" />,
          label: 'Approved',
          bgGradient: 'from-green-500 to-emerald-500'
        };
      case 'pending':
        return {
          color: 'bg-amber-100 text-amber-700 border-amber-300',
          icon: <Clock className="w-4 h-4" />,
          label: 'Pending',
          bgGradient: 'from-amber-500 to-orange-500'
        };
      case 'rejected':
        return {
          color: 'bg-red-100 text-red-700 border-red-300',
          icon: <XCircle className="w-4 h-4" />,
          label: 'Rejected',
          bgGradient: 'from-red-500 to-pink-500'
        };
      default:
        return {
          color: 'bg-slate-100 text-slate-700 border-slate-300',
          icon: <AlertCircle className="w-4 h-4" />,
          label: 'Unknown',
          bgGradient: 'from-slate-500 to-gray-500'
        };
    }
  };

  const calculateLeaveDays = (from: string, to: string): number => {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const diffTime = Math.abs(toDate.getTime() - fromDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP HEADER */}
        <div className="bg-gradient-to-r from-teal-100 via-cyan-100 to-blue-100 rounded-3xl p-8 mb-8 shadow-lg border-2 border-teal-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-700 to-blue-700 bg-clip-text text-transparent mb-2">
                Leave Application
              </h1>
              <p className="text-slate-700 font-medium">Apply and track student leave</p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Student Selector */}
              <div className="relative">
                <select 
                  value={selectedStudent}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedStudent(e.target.value)}
                  className="appearance-none bg-white/90 backdrop-blur border-2 border-teal-300 rounded-2xl px-5 py-3.5 pr-12 font-semibold text-slate-700 cursor-pointer hover:border-teal-400 hover:bg-white transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-md"
                >
                  {students.map((student: Student) => (
                    <option key={student.id} value={student.id}>
                      {student.name} – {student.class}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-600 pointer-events-none" />
              </div>

              {/* Academic Year Badge */}
              <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-5 py-3.5 rounded-2xl font-bold flex items-center gap-2 shadow-lg">
                <Calendar className="w-5 h-5" />
                2024-25
              </div>
            </div>
          </div>
        </div>

        {/* LEAVE STATUS SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Approved */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl p-6 shadow-xl text-white transform hover:scale-105 transition-transform">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div>
                <p className="text-green-100 text-sm font-medium">Approved</p>
                <p className="text-5xl font-bold">{approvedCount}</p>
              </div>
            </div>
            <p className="text-green-100 text-sm">Leave applications approved</p>
          </div>

          {/* Pending */}
          <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl p-6 shadow-xl text-white transform hover:scale-105 transition-transform">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                <Clock className="w-8 h-8 animate-pulse" />
              </div>
              <div>
                <p className="text-amber-100 text-sm font-medium">Pending</p>
                <p className="text-5xl font-bold">{pendingCount}</p>
              </div>
            </div>
            <p className="text-amber-100 text-sm">Awaiting approval</p>
          </div>

          {/* Rejected */}
          <div className="bg-gradient-to-br from-red-500 to-pink-500 rounded-3xl p-6 shadow-xl text-white transform hover:scale-105 transition-transform">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                <XCircle className="w-8 h-8" />
              </div>
              <div>
                <p className="text-red-100 text-sm font-medium">Rejected</p>
                <p className="text-5xl font-bold">{rejectedCount}</p>
              </div>
            </div>
            <p className="text-red-100 text-sm">Applications declined</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* APPLY LEAVE FORM */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-100 sticky top-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent">
                  Apply Leave
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Student Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Student Name
                  </label>
                  <input
                    type="text"
                    value={currentStudent?.name || ''}
                    readOnly
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl font-medium text-slate-600 cursor-not-allowed"
                  />
                </div>

                {/* Class */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Class & Section
                  </label>
                  <input
                    type="text"
                    value={currentStudent?.class || ''}
                    readOnly
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl font-medium text-slate-600 cursor-not-allowed"
                  />
                </div>

                {/* Leave Type */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Leave Type <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={leaveType}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLeaveType(e.target.value)}
                      className="w-full appearance-none px-4 py-3 border-2 border-slate-300 rounded-xl font-medium text-slate-700 cursor-pointer hover:border-purple-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-colors"
                      required
                    >
                      <option value="">Select leave type</option>
                      <option value="sick">🤒 Sick Leave</option>
                      <option value="personal">👤 Personal</option>
                      <option value="family">👨‍👩‍👧 Family Function</option>
                      <option value="medical">🏥 Medical</option>
                      <option value="other">📝 Other</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      From Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={fromDate}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFromDate(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl font-medium text-slate-700 hover:border-purple-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      To Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={toDate}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setToDate(e.target.value)}
                      min={fromDate}
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl font-medium text-slate-700 hover:border-purple-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Reason */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Reason for Leave <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReason(e.target.value)}
                    placeholder="Briefly explain the reason for leave..."
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl font-medium text-slate-700 hover:border-purple-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-colors resize-none"
                    required
                  />
                </div>

                {/* Attachment */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Attach Document (Optional)
                  </label>
                  {!attachment ? (
                    <label className="block w-full px-4 py-3 border-2 border-dashed border-purple-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all cursor-pointer">
                      <div className="flex items-center justify-center gap-2 text-purple-600">
                        <Upload className="w-5 h-5" />
                        <span className="font-medium">Upload medical certificate or letter</span>
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between px-4 py-3 bg-purple-50 border-2 border-purple-300 rounded-xl">
                      <span className="text-sm font-medium text-purple-700 truncate">{attachment.name}</span>
                      <button
                        type="button"
                        onClick={removeAttachment}
                        className="p-1 hover:bg-purple-200 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4 text-purple-600" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isFormValid()}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-white shadow-xl transition-all transform ${
                    isFormValid()
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-105'
                      : 'bg-slate-300 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-5 h-5" />
                  Submit Leave Request
                </button>
              </form>
            </div>
          </div>

          {/* LEAVE HISTORY */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-blue-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                  Leave History
                </h2>
              </div>

              {leaveHistory.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4 text-5xl">
                    📝
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">No Leave Applied Yet</h3>
                  <p className="text-slate-600">Submit your first leave request using the form</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {leaveHistory.map((leave: LeaveApplication) => {
                    const statusConfig = getStatusConfig(leave.status);
                    const leaveDays = calculateLeaveDays(leave.fromDate, leave.toDate);
                    
                    return (
                      <div
                        key={leave.id}
                        onClick={() => viewLeaveDetail(leave)}
                        className="bg-gradient-to-r from-slate-50 to-white border-2 border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all cursor-pointer transform hover:scale-[1.02]"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-lg font-bold text-slate-800">{leave.leaveType}</h3>
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border-2 ${statusConfig.color} shadow-sm`}>
                                {statusConfig.icon}
                                {statusConfig.label}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3 mb-3">
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Calendar className="w-4 h-4 text-purple-600" />
                                <span>
                                  <strong>From:</strong> {new Date(leave.fromDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Calendar className="w-4 h-4 text-pink-600" />
                                <span>
                                  <strong>To:</strong> {new Date(leave.toDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                              </div>
                            </div>

                            <p className="text-sm text-slate-700 line-clamp-2 mb-3">
                              <strong>Reason:</strong> {leave.reason}
                            </p>

                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span>Applied on: {new Date(leave.appliedOn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                              <span>•</span>
                              <span>{leaveDays} {leaveDays === 1 ? 'day' : 'days'}</span>
                            </div>
                          </div>

                          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-semibold text-slate-700 transition-colors">
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* LEAVE DETAIL PANEL */}
        {showDetailPanel && selectedLeave && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50"
            onClick={closeDetailPanel}
          >
            <div 
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {/* Panel Header */}
              <div className={`bg-gradient-to-r ${getStatusConfig(selectedLeave.status).bgGradient} text-white p-8 rounded-t-3xl`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{selectedLeave.leaveType}</h2>
                    <p className="text-white/90 text-lg">Leave Application Details</p>
                  </div>
                  <button
                    onClick={closeDetailPanel}
                    className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="flex items-center gap-3">
                  {getStatusConfig(selectedLeave.status).icon}
                  <span className="text-xl font-bold">{getStatusConfig(selectedLeave.status).label}</span>
                </div>
              </div>

              {/* Panel Body */}
              <div className="p-8 space-y-6">
                {/* Duration Card */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
                  <h3 className="text-sm font-bold text-purple-900 mb-4 uppercase tracking-wide">Leave Duration</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-purple-600 mb-1">From Date</p>
                      <p className="text-lg font-bold text-purple-900">
                        {new Date(selectedLeave.fromDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-pink-600 mb-1">To Date</p>
                      <p className="text-lg font-bold text-pink-900">
                        {new Date(selectedLeave.toDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t-2 border-purple-200">
                    <p className="text-sm text-purple-900">
                      <strong>Total:</strong> {calculateLeaveDays(selectedLeave.fromDate, selectedLeave.toDate)} {calculateLeaveDays(selectedLeave.fromDate, selectedLeave.toDate) === 1 ? 'day' : 'days'}
                    </p>
                  </div>
                </div>

                {/* Reason */}
                <div>
                  <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    Reason for Leave
                  </h3>
                  <p className="text-slate-700 bg-blue-50 border-2 border-blue-200 rounded-xl p-4 leading-relaxed">
                    {selectedLeave.reason}
                  </p>
                </div>

                {/* Approval Details */}
                {selectedLeave.status !== 'pending' && (
                  <div className={`${getStatusConfig(selectedLeave.status).color} border-2 rounded-2xl p-6`}>
                    <h3 className="text-sm font-bold mb-4 uppercase tracking-wide">
                      {selectedLeave.status === 'approved' ? '✅ Approval Details' : '❌ Rejection Details'}
                    </h3>
                    <div className="space-y-3">
                      {selectedLeave.approvedBy && (
                        <div className="flex items-center gap-2 text-sm">
                          <User className="w-4 h-4" />
                          <span><strong>By:</strong> {selectedLeave.approvedBy}</span>
                        </div>
                      )}
                      {selectedLeave.approvalDate && (
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span><strong>Date:</strong> {new Date(selectedLeave.approvalDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      )}
                      {selectedLeave.remarks && (
                        <div>
                          <p className="text-sm font-semibold mb-2">Remarks:</p>
                          <p className="text-sm italic">"{selectedLeave.remarks}"</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Pending Notice */}
                {selectedLeave.status === 'pending' && (
                  <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6">
                    <div className="flex items-start gap-3">
                      <Clock className="w-6 h-6 text-amber-600 animate-pulse flex-shrink-0" />
                      <div>
                        <h3 className="text-sm font-bold text-amber-900 mb-2">⏳ Awaiting Approval</h3>
                        <p className="text-sm text-amber-800">
                          Your leave application has been submitted and is currently under review by the class teacher.
                          You will be notified once a decision is made.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Application Info */}
                <div className="bg-slate-50 rounded-2xl p-4 text-xs text-slate-600 space-y-1">
                  <p><strong>Application ID:</strong> #{selectedLeave.id}</p>
                  <p><strong>Applied on:</strong> {new Date(selectedLeave.appliedOn).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  {selectedLeave.attachment && (
                    <p><strong>Attachment:</strong> {selectedLeave.attachment}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default LeaveApplicationScreen;