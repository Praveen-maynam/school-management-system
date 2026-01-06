import React, { useState } from 'react';
import { ChevronLeft, Plus, Bell, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AnnouncementScreen = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      type: 'Test Results Published',
      title: 'Science - Marks 82/100',
      date: '2 hrs ago',
      class: 'Class 6-A'
    },
    {
      id: 2,
      type: 'Parents Meeting',
      title: 'Annual Parent-Teacher Meeting scheduled',
      date: '5 hrs ago',
      class: 'All Classes'
    },
    {
      id: 3,
      type: 'Holiday Notice',
      title: 'School will remain closed on Monday',
      date: '1 day ago',
      class: 'All Classes'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-6 p-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 text-white">
          <button
            onClick={() => navigate('/teacher/dashboard')}
            className="mb-4 flex items-center gap-2 text-white hover:text-blue-100"
          >
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold">Announcements</h1>
        </div>

        {/* Announcements Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-gray-800">{announcements.length}</div>
              <div className="text-sm text-gray-500">Total Announcements</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-gray-800">2</div>
              <div className="text-sm text-gray-500">Recent Today</div>
            </div>
          </div>

          {/* Announcements List */}
          <div className="space-y-3 mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Announcements</h2>
            {announcements.map((announcement) => (
              <div key={announcement.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <Bell className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-1">{announcement.type}</p>
                    <h3 className="font-semibold text-gray-800 mb-1">{announcement.title}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar size={14} />
                        <span>{announcement.date}</span>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {announcement.class}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Create Announcement Button */}
          <button 
            onClick={() => navigate('/teacher/announcements/create')}
          className="w-full border-2 border-dashed border-blue-300 rounded-lg py-3 text-blue-600 font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
            
            <Plus size={20} />
            Create Announcement
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementScreen;