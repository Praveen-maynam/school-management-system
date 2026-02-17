import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GradeConfiguration = () => {
  const navigate = useNavigate();
  const [showPrimaryMenu, setShowPrimaryMenu] = useState(false);
  const [showIBMenu, setShowIBMenu] = useState(false);

  const primaryScale = [
    { grade: 'A+', range: '90-100', gpa: '4.0', color: 'bg-green-100', textColor: 'text-green-700' },
    { grade: 'A', range: '80-89', gpa: '3.7', color: 'bg-green-50', textColor: 'text-green-700' },
    { grade: 'B', range: '70-79', gpa: '3.0', color: 'bg-blue-100', textColor: 'text-blue-700' },
    { grade: 'C', range: '60-69', gpa: '2.0', color: 'bg-yellow-100', textColor: 'text-yellow-700' },
    { grade: 'D', range: '50-59', gpa: '1.0', color: 'bg-orange-100', textColor: 'text-orange-700' },
    { grade: 'F', range: '0-49', gpa: '0.0', color: 'bg-red-100', textColor: 'text-red-700' }
  ];

  const ibScale = [
    { grade: '7', range: '95-100', descriptor: 'Excellent', color: 'bg-purple-100', textColor: 'text-purple-700' },
    { grade: '6', range: '85-94', descriptor: 'Very Good', color: 'bg-indigo-100', textColor: 'text-indigo-700' },
    { grade: '5', range: '75-84', descriptor: 'Good', color: 'bg-blue-100', textColor: 'text-blue-700' },
    { grade: '4', range: '65-74', descriptor: 'Satisfactory', color: 'bg-teal-100', textColor: 'text-teal-700' },
    { grade: '3', range: '55-64', descriptor: 'Mediocre', color: 'bg-yellow-100', textColor: 'text-yellow-700' },
    { grade: '2', range: '45-54', descriptor: 'Poor', color: 'bg-orange-100', textColor: 'text-orange-700' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 text-gray-700"
        >
          <span className="text-lg">&#8592;</span>
          <span>Back</span>
        </button>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Grade Configuration</h1>
              <p className="text-gray-600">Define grading scales and rules for assessments</p>
            </div>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 font-medium shadow-sm">
              <span className="text-lg">+</span>
              <span>Add Grade Scale</span>
            </button>
          </div>
        </div>

        {/* Grade Scales */}
        <div className="grid grid-cols-2 gap-8">
          {/* Primary Scale */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Primary Scale</h3>
                <p className="text-sm text-gray-600 mb-3">Default grading for all classes</p>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                  Active
                </span>
              </div>
              <div className="relative">
                <button 
                  onClick={() => setShowPrimaryMenu(!showPrimaryMenu)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
                {showPrimaryMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50">Edit Scale</button>
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50">Duplicate</button>
                    <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50">Delete</button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {primaryScale.map((item, idx) => (
                <div key={idx} className={`flex items-center justify-between p-4 rounded-lg ${item.color}`}>
                  <div className="flex items-center space-x-4">
                    <div className={`font-bold text-xl ${item.textColor}`}>{item.grade}</div>
                    <div className={`text-sm ${item.textColor}`}>{item.range}</div>
                  </div>
                  <div className={`text-lg font-semibold ${item.textColor}`}>{item.gpa}</div>
                </div>
              ))}
            </div>
          </div>

          {/* IB Scale */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">IB Scale</h3>
                <p className="text-sm text-gray-600 mb-3">International Baccalaureate grading</p>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded">
                  Inactive
                </span>
              </div>
              <div className="relative">
                <button 
                  onClick={() => setShowIBMenu(!showIBMenu)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
                {showIBMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50">Activate Scale</button>
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50">Edit Scale</button>
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50">Duplicate</button>
                    <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50">Delete</button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {ibScale.map((item, idx) => (
                <div key={idx} className={`flex items-center justify-between p-4 rounded-lg ${item.color}`}>
                  <div className="flex items-center space-x-4">
                    <div className={`font-bold text-xl ${item.textColor}`}>{item.grade}</div>
                    <div className={`text-sm ${item.textColor}`}>{item.range}</div>
                  </div>
                  <div className={`text-base font-semibold ${item.textColor}`}>{item.descriptor}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-blue-900 mb-1">Grading Scale Information</h4>
              <p className="text-sm text-blue-800">
                Only one grading scale can be active at a time. The active scale will be used for all assessments and report cards. 
                You can create custom scales for specific classes or exam types by clicking "Add Grade Scale".
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeConfiguration;