import React, { useState } from 'react';
import { Mail, Phone, Bell, MessageSquare, Shield, Info, HelpCircle, LogOut, ChevronRight, Camera, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TicketModal from '../teacher/privacy/Ticketmodel';

 function ParentProfile() {
  const [showRaiseIssue, setShowRaiseIssue] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [selectedIssueType, setSelectedIssueType] = useState('Fee related');
const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [issueDescription, setIssueDescription] = useState('');
  const [showTicketModal, setShowTicketModal] = useState(false);
  

  const students = [
    { id: 1, name: 'Student Name', class: 'Class 6-A', rollNo: 'Roll No' },
    { id: 2, name: 'Student Name', class: 'Class 6-A', rollNo: 'Roll No' }
  ];
const navigate = useNavigate();
  const issueTypes = [
    'Fee related',
    'Academic related',
    'Transport related',
    'General inquiry',
    'Technical issue'
  ];

 
const toggleStudentSelection = (studentId: number) => {
  setSelectedStudents(prev =>
    prev.includes(studentId)
      ? prev.filter(id => id !== studentId)
      : [...prev, studentId]
  );
};

  const handleSubmit = () => {
    console.log({
      issueType: selectedIssueType,
      students: selectedStudents,
      description: issueDescription
    });
    // Show ticket modal
    setShowTicketModal(true);
    // Reset form
    setShowRaiseIssue(false);
    setSelectedStudents([]);
    setIssueDescription('');
  };

  if (showRaiseIssue) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6">
          <div className="flex items-center">
            <button 
              onClick={() => setShowRaiseIssue(false)}
              className="mr-4 hover:bg-blue-700 p-2 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl font-semibold">Rise a issue</h1>
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          {/* Issue Type Selection */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <label className="block text-gray-700 font-medium mb-3">Select Issue Type</label>
            <select 
              value={selectedIssueType}
              onChange={(e) => setSelectedIssueType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {issueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Select Student */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Student</h2>
            <div className="space-y-3">
              {students.map(student => (
                <div 
                  key={student.id}
                  onClick={() => toggleStudentSelection(student.id)}
                  className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedStudents.includes(student.id)
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      S
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{student.name}</h3>
                      <p className="text-sm text-gray-600">{student.class} • {student.rollNo}</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedStudents.includes(student.id)
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-300'
                  }`}>
                    {selectedStudents.includes(student.id) && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Describe Issue */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <textarea
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              placeholder="Describe Your Issue"
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Add Photo */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <button className="w-full flex flex-col items-center justify-center py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <Camera className="w-12 h-12 text-gray-400 mb-2" />
              <span className="text-gray-600 font-medium">Add photo</span>
            </button>
          </div>

          {/* Submit Button */}
          <button 
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            Submit Issue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-blue-600 text-white rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-semibold">Profile</h1>
      </div>

      <div className="space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-2xl">
              S
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Parent Name</h2>
              <p className="text-gray-600">Parent</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-900">Example@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium text-gray-900">+91 1234567890</p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Options */}
        <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-100">
          {/* Notification */}
          <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-medium text-gray-900">Notification</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationEnabled}
                onChange={() => setNotificationEnabled(!notificationEnabled)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </button>

          {/* Rise a Issue */}
          <button 
            onClick={() => setShowRaiseIssue(true)}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-medium text-gray-900">Rise a Issue</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          {/* Privacy Policy */}
          <button onClick={() => navigate('/parent/privacy-policy')} className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">    
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-medium text-gray-900">Privacy Policy</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          {/* About Us */}
          <button onClick={() => navigate('/parent/about-us')} className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Info className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-medium text-gray-900">About Us</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          {/* Help */}
          <button onClick={() => navigate('/parent/help')} className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-medium text-gray-900">Help</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Logout Button */}
        <button onClick={() => navigate('/')} className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      {/* Ticket Modal */}
      <TicketModal 
        isOpen={showTicketModal} 
        onClose={() => {
          setShowTicketModal(false);
          navigate('/parent/dashboard');
        }} 
      />
    </div>
  );
};
export default ParentProfile;