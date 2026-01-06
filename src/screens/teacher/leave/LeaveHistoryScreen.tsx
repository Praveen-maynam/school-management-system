import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';


const AppliedLeavesPage = () => {
 
  const [leaves] = useState([
    {
      id: 1,
      type: 'Sick Leave',
      from: '30-10-2025',
      to: '30-10-2025',
      description: 'lipsum.com (the "Site"), and the services offered through the Site. If you have any questions about our',
      status: 'Approved',
      timeAgo: '2 Hours ago'
    },
    {
      id: 2,
      type: 'Sick Leave',
      from: '30-10-2025',
      to: '30-10-2025',
      description: 'lipsum.com (the "Site"), and the services offered through the Site. If you have any questions about our',
      status: 'Not Approved',
      timeAgo: '2 Hours ago'
    },
    {
      id: 3,
      type: 'Sick Leave',
      from: '30-10-2025',
      to: '30-10-2025',
      description: 'lipsum.com (the "Site"), and the services offered through the Site. If you have any questions about our',
      status: 'Approved',
      timeAgo: '2 Hours ago'
    }
  ]);

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

      {/* Applied Leaves Title */}
      <div className="bg-white px-6 py-4 border-b">
        <h2 className="text-2xl font-bold text-gray-900">Applied Leaves</h2>
      </div>

      {/* Leaves List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {leaves.map((leave) => (
          <div key={leave.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            {/* Header with icon and menu */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                {/* Leave Icon */}
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                
                {/* Leave Type and Dates */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{leave.type}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <span className="inline-block w-3 h-3 bg-blue-600 rounded-sm"></span>
                      <span>From:</span>
                      <span className="font-medium">{leave.from}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="inline-block w-3 h-3 bg-gray-400 rounded-sm"></span>
                      <span>To:</span>
                      <span className="font-medium">{leave.to}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* More menu button */}
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-700 mb-3 leading-relaxed">
              {leave.description}
            </p>

            {/* Status and Time */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Status:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  leave.status === 'Approved' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {leave.status}
                </span>
              </div>
              <span className="text-xs text-gray-500">{leave.timeAgo}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Apply for Leave Button */}
      <div className="bg-white border-t px-4 py-4">
        <button className="w-full bg-white text-blue-600 border-2 border-blue-600 rounded-lg py-3 font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
          <span className="text-2xl">+</span>
          <span>Apply for Leave</span>
        </button>
      </div>
    </div>
  );
};

export default AppliedLeavesPage;