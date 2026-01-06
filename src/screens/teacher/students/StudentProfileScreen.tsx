import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Calendar } from 'lucide-react';


const StudentProfileScreen = () => {
type SectionKey =
  | "attendance"
  | "termProgress"
  | "testResults"
  | "subjectPerformance";


const [expandedSections, setExpandedSections] = useState<
  Record<SectionKey, boolean>
>({
  attendance: false,
  termProgress: false,
  testResults: false,
  subjectPerformance: false,
});


 const toggleSection = (section: SectionKey) => {
  setExpandedSections((prev) => ({
    ...prev,
    [section]: !prev[section],
  }));
};

  const termProgressData = [
    { subject: 'Maths', term1: 75, term2: 85, term3: 80 },
    { subject: 'Science', term1: 70, term2: 82, term3: 78 },
    { subject: 'English', term1: 68, term2: 80, term3: 75 },
    { subject: 'Hindi', term1: 72, term2: 85, term3: 82 },
    { subject: 'Social', term1: 70, term2: 82, term3: 78 }
  ];

  const subjectPerformance = [
    { subject: 'Maths', percentage: 82 },
    { subject: 'Science', percentage: 82 },
    { subject: 'English', percentage: 82 },
    { subject: 'Hindi', percentage: 82 },
    { subject: 'Social', percentage: 82 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="max-w-6xl mx-auto flex items-center">
          <button className="mr-4 hover:bg-blue-700 p-2 rounded">←</button>
          <h1 className="text-xl font-semibold">Student Details</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Student Info Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
              S
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">Student Name</h2>
              <p className="text-gray-600">Class 6-A</p>
              <p className="text-sm text-gray-500">Roll No: 22</p>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">80%</div>
                <div className="text-sm text-gray-600">Attendance</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">85%</div>
                <div className="text-sm text-gray-600">Avg Marks</div>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Section */}
        <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
          <button
            onClick={() => toggleSection('attendance')}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-semibold">Attendance</h3>
            {expandedSections.attendance ? <ChevronUp /> : <ChevronDown />}
          </button>
          {expandedSections.attendance && (
            <div className="p-6 pt-0">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-semibold">5/30 days</span>
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="text-4xl font-bold text-blue-600">80%</div>
                  <div className="text-red-500 text-sm">Missed 1 days</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-blue-600 h-3 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Term-wise Progress Section */}
        <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
          <button
            onClick={() => toggleSection('termProgress')}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-semibold">Term-wise Progress</h3>
            {expandedSections.termProgress ? <ChevronUp /> : <ChevronDown />}
          </button>
          {expandedSections.termProgress && (
            <div className="p-6 pt-0">
              <div className="flex gap-8 items-end h-64">
                {termProgressData.map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex gap-1 items-end h-48 mb-2">
                      <div className="flex-1 bg-blue-400 rounded-t" style={{ height: `${(item.term1 / 100) * 100}%` }}></div>
                      <div className="flex-1 bg-blue-500 rounded-t" style={{ height: `${(item.term2 / 100) * 100}%` }}></div>
                      <div className="flex-1 bg-blue-700 rounded-t" style={{ height: `${(item.term3 / 100) * 100}%` }}></div>
                    </div>
                    <div className="text-xs text-gray-600 text-center">{item.subject}</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-6 mt-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 bg-blue-400"></div>
                  <span>Term 1</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 bg-blue-500"></div>
                  <span>Term 2</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 bg-blue-700"></div>
                  <span>Term 3</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recent Test Results Section */}
        <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
          <button
            onClick={() => toggleSection('testResults')}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-semibold">Recent Test Results</h3>
            {expandedSections.testResults ? <ChevronUp /> : <ChevronDown />}
          </button>
          {expandedSections.testResults && (
            <div className="p-6 pt-0">
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">Science</h4>
                      <p className="text-sm text-gray-600">Unit test 3</p>
                    </div>
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">92%</span>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Marks: </span>
                    <span className="text-blue-600 text-xl font-bold">92/100</span>
                    <span className="text-gray-500 text-sm ml-2">Dec 16</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">Maths</h4>
                      <p className="text-sm text-gray-600">Unit test 3</p>
                    </div>
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">92%</span>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Marks: </span>
                    <span className="text-blue-600 text-xl font-bold">92/100</span>
                    <span className="text-gray-500 text-sm ml-2">Dec 16</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Subject Performance Section */}
        <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
          <button
            onClick={() => toggleSection('subjectPerformance')}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-semibold">Subject Performance</h3>
            {expandedSections.subjectPerformance ? <ChevronUp /> : <ChevronDown />}
          </button>
          {expandedSections.subjectPerformance && (
            <div className="p-6 pt-0">
              <div className="space-y-4">
                {subjectPerformance.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{item.subject}</span>
                      <span className="text-blue-600 font-semibold">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all" 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Post Marks Button */}
        <button className="w-full bg-white border-2 border-blue-600 text-blue-600 rounded-lg p-4 font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
          <span className="text-xl">+</span>
          Post Marks Or Results
        </button>
      </div>
    </div>
  );
};

export default StudentProfileScreen;