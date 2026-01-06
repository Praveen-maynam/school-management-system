import React, { useState } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ApplyLeaveForm = () => {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fromDate: '',
    toDate: '',
    leaveType: 'Sick Leave',
    reason: ''
  });


  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center">
        <button className="mr-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-semibold">Apply Leave</h1>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Select Date Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* From Date */}
            <div>
              <label className="flex items-center text-sm text-gray-600 mb-2">
                <Calendar className="w-4 h-4 mr-1" />
                From Date
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Select"
                  value={formData.fromDate}
                  onChange={(e) => setFormData({...formData, fromDate: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
            </div>

            {/* To Date */}
            <div>
              <label className="flex items-center text-sm text-gray-600 mb-2">
                <Calendar className="w-4 h-4 mr-1" />
                To Date
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Select"
                  value={formData.toDate}
                  onChange={(e) => setFormData({...formData, toDate: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Leave Type Dropdown */}
          <div>
            <label className="block text-sm text-gray-700 font-medium mb-2">
              Leave Type
            </label>
            <div className="relative">
              <select
                value={formData.leaveType}
                onChange={(e) => setFormData({...formData, leaveType: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
              >
                <option>Sick Leave</option>
                <option>Casual Leave</option>
                <option>Annual Leave</option>
                <option>Emergency Leave</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Reason Textarea */}
          <div className="mt-4">
            <label className="block text-sm text-gray-700 font-medium mb-2">
              Reason
            </label>
            <textarea
              placeholder="Reason"
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="bg-white border-t px-6 py-4">
      <button
  onClick={() => navigate('/teacher/leave/history')}
  className="w-full bg-blue-600 text-white rounded-lg py-3.5 font-semibold hover:bg-blue-700 transition-colors"
>
  Submit Request
</button>
      </div>
    </div>
  );
};

export default ApplyLeaveForm;