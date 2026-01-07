import React, { useState } from 'react';
import { FileText, Download, BookOpen, Atom } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

 function Homework() {
  const [activeTab, setActiveTab] = useState('active');
  const navigate = useNavigate();

  // Sample homework data
  const homeworkData = {
    active: [
      {
        id: 1,
        subject: 'Mathematics',
        title: 'Chapter 5 - Algebra Problems',
        dueDate: 'Dec 15, 2025',
        status: 'Pending',
        icon: 'math'
      },
      {
        id: 2,
        subject: 'Science',
        title: 'Question on Photosynthesis',
        dueDate: 'Dec 15, 2025',
        status: 'Pending',
        icon: 'science'
      }
    ],
    completed: [
      {
        id: 3,
        subject: 'Mathematics',
        title: 'Chapter 5 - Algebra Problems',
        dueDate: 'Dec 15, 2025',
        status: 'Completed',
        icon: 'math'
      },
      {
        id: 4,
        subject: 'Science',
        title: 'Question on Photosynthesis',
        dueDate: 'Dec 15, 2025',
        status: 'Completed',
        icon: 'science'
      },
      {
        id: 5,
        subject: 'Mathematics',
        title: 'Chapter 5 - Algebra Problems',
        dueDate: 'Dec 15, 2025',
        status: 'Completed',
        icon: 'math'
      },
      {
        id: 6,
        subject: 'Science',
        title: 'Question on Photosynthesis',
        dueDate: 'Dec 15, 2025',
        status: 'Completed',
        icon: 'science'
      }
    ]
  };

  const activeCount = homeworkData.active.length;
  const completedCount = homeworkData.completed.length;
  const currentData = activeTab === 'active' ? homeworkData.active : homeworkData.completed;

  const getIcon = (iconType: string) => {
    if (iconType === 'math') {
      return <BookOpen className="w-6 h-6 text-blue-600" />;
    }
    return <Atom className="w-6 h-6 text-green-600" />;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-blue-600 text-white rounded-lg p-4 mb-6">
        <div className="flex items-center mb-4">
          <button onClick={() => navigate(-1)} className="mr-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">Homework</h1>
        </div>

        {/* Stats Cards */}
        <div className="bg-white rounded-lg p-4 flex justify-around">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-500">{activeCount}</div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500">{completedCount}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white px-4 pt-4 pb-2 flex gap-2">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-colors ${
            activeTab === 'active'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          <FileText className="w-4 h-4 inline mr-2" />
          Active
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-colors ${
            activeTab === 'completed'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Completed
        </button>
      </div>

      {/* Homework List */}
      <div className="p-4 space-y-3">
        {currentData.map((homework) => (
          <div key={homework.id} className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-50 rounded-lg">
                {getIcon(homework.icon)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-gray-900">{homework.subject}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    homework.status === 'Pending' 
                      ? 'bg-yellow-100 text-yellow-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {homework.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{homework.title}</p>
                <p className="text-xs text-gray-500 mb-3">Due: {homework.dueDate}</p>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-blue-700 transition-colors">
                  <Download className="w-4 h-4" />
                  Download Attachment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Homework;