import React, { useState } from 'react';
import { Bell, X, Plus, ChevronDown } from 'lucide-react';

function CreateAnnouncement() {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      type: 'Test Results Published',
      title: 'Science - Marks 92/100',
      date: '1 day ago',
      class: 'All Classes'
    },
    {
      id: 2,
      type: 'Test Results Published',
      title: 'Science - Marks 92/100',
      date: '1 day ago',
      class: 'All Classes'
    }
  ]);

  const [announcementForm, setAnnouncementForm] = useState({
    class: 'All Classes',
    totalClass: '',
    student: '',
    type: 'Parents Meeting',
    description: ''
  });

  const classes = ['Class 6-A', 'Class 6-B', 'Class 7-A', 'Class 7-B', 'Class 8-A'];
  const announcementTypes = ['Parents Meeting', 'Test Results Published', 'Holiday Notice', 'Event Announcement'];

  const handleAnnouncementSubmit = () => {
    if (announcementForm.description) {
      const newAnnouncement = {
        id: announcements.length + 1,
        type: announcementForm.type,
        title: announcementForm.description.substring(0, 50) + '...',
        date: 'Just now',
        class: announcementForm.class
      };
      setAnnouncements([newAnnouncement, ...announcements]);
      setAnnouncementForm({
        class: 'All Classes',
        totalClass: '',
        student: '',
        type: 'Parents Meeting',
        description: ''
      });
      alert('Announcement created successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white p-4 shadow-lg">
        <h1 className="text-2xl font-bold">Announcement Management</h1>
        <p className="text-blue-100 text-sm mt-1">Create and manage announcements</p>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Create Announcement</h2>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                <div className="relative">
                  <select
                    value={announcementForm.class}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, class: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="All Classes">All Classes</option>
                    {classes.map(cls => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Class</label>
                <input
                  type="text"
                  value={announcementForm.totalClass}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, totalClass: e.target.value })}
                  placeholder="Enter total class count"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Student</label>
                <input
                  type="text"
                  value={announcementForm.student}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, student: e.target.value })}
                  placeholder="Enter student name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Announcement Type</label>
                <div className="relative">
                  <select
                    value={announcementForm.type}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, type: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {announcementTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={announcementForm.description}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, description: e.target.value })}
                  placeholder="Enter announcement details"
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                ></textarea>
              </div>

              <button
                onClick={handleAnnouncementSubmit}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Publish
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Announcements</h2>
            <div className="space-y-4">
              {announcements.map(announcement => (
                <div key={announcement.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-3 rounded-lg mr-4">
                      <Bell className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">{announcement.type}</p>
                      <h3 className="font-semibold text-gray-800 mb-1">{announcement.title}</h3>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">{announcement.date}</p>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          {announcement.class}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateAnnouncement;