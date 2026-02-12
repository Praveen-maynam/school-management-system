import React, { useState } from 'react';
import { GraduationCap, Search, MoreVertical, Bell, Building2, Users, User, Star, Archive, CheckCheck, Reply, Phone, Download, Paperclip, Send, X, Filter, AlertCircle } from 'lucide-react';

function NotificationsMessagesScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Messages', icon: Bell, count: 12, color: 'emerald' },
    { id: 'admin', label: 'Admin Notices', icon: Building2, count: 3, color: 'blue' },
    { id: 'parent', label: 'Parent Messages', icon: Users, count: 7, color: 'green' },
    { id: 'student', label: 'Student Messages', icon: User, count: 2, color: 'purple' },
    { id: 'important', label: 'Important', icon: Star, count: 4, color: 'amber' },
    { id: 'archived', label: 'Archived', icon: Archive, count: 0, color: 'slate' }
  ];

  const messages = [
    {
      id: 1,
      type: 'admin',
      sender: 'Admin Office',
      subject: 'Exam Schedule Updated',
      preview: 'Final exam schedule for classes 8-10 has been revised. Please check the new dates...',
      content: 'Dear Faculty,\n\nThis is to inform you that the final exam schedule for classes 8-10 has been revised due to the upcoming festival. Please review the new schedule attached below and inform your students accordingly.\n\nNew exam dates:\n- Mathematics: December 20, 2025\n- Science: December 22, 2025\n- English: December 24, 2025\n\nPlease acknowledge receipt of this notice.\n\nBest regards,\nAdmin Office',
      time: 'Today 9:30 AM',
      isRead: false,
      priority: 'urgent',
      classRef: 'Class 8-10',
      hasAttachment: true,
      icon: Building2,
      color: 'blue'
    },
    {
      id: 2,
      type: 'parent',
      sender: 'Mrs. Priya Sharma',
      subject: 'Regarding Aarav\'s Performance',
      preview: 'I would like to discuss my son Aarav\'s recent test scores and attendance...',
      content: 'Dear Mr. Kumar,\n\nI hope this message finds you well. I wanted to reach out regarding my son Aarav\'s recent performance in Mathematics. I noticed his test scores have dropped in the last unit test.\n\nCould we schedule a brief meeting to discuss how we can support him better at home? I am available this week after 4 PM.\n\nThank you for your time and dedication.\n\nBest regards,\nMrs. Priya Sharma\nParent of Aarav Sharma, Class 8-A',
      time: 'Today 11:15 AM',
      isRead: false,
      priority: 'important',
      classRef: 'Class 8-A',
      studentRef: 'Aarav Sharma',
      hasAttachment: false,
      icon: Users,
      color: 'green',
      canCall: true,
      phone: '+91 98765 43210'
    },
    {
      id: 3,
      type: 'student',
      sender: 'Diya Patel',
      subject: 'Doubt in Chapter 5',
      preview: 'Sir, I have some doubts regarding quadratic equations from yesterday\'s class...',
      content: 'Dear Sir,\n\nI hope you are doing well. I have some doubts regarding the quadratic equations topic we covered in yesterday\'s class. Specifically, I\'m having trouble understanding the discriminant method.\n\nCould you please explain it again or suggest some practice problems?\n\nThank you,\nDiya Patel\nClass 8-A, Roll No. 22',
      time: 'Yesterday 5:20 PM',
      isRead: true,
      priority: 'normal',
      classRef: 'Class 8-A',
      studentRef: 'Diya Patel',
      hasAttachment: false,
      icon: User,
      color: 'purple'
    },
    {
      id: 4,
      type: 'admin',
      sender: 'Principal Office',
      subject: 'Staff Meeting - Tomorrow',
      preview: 'Mandatory staff meeting scheduled for tomorrow at 10:00 AM in the conference room...',
      content: 'Dear Teachers,\n\nThis is a reminder about the mandatory staff meeting scheduled for tomorrow, December 5th, 2025 at 10:00 AM in the main conference room.\n\nAgenda:\n1. Review of mid-term results\n2. Parent-teacher meeting schedule\n3. Annual day preparations\n4. Policy updates\n\nPlease ensure your attendance.\n\nRegards,\nPrincipal',
      time: 'Yesterday 3:45 PM',
      isRead: true,
      priority: 'urgent',
      classRef: null,
      hasAttachment: false,
      icon: Building2,
      color: 'blue'
    },
    {
      id: 5,
      type: 'parent',
      sender: 'Mr. Rajesh Reddy',
      subject: 'Thank You Note',
      preview: 'Thank you for the extra attention you gave to Arjun during the remedial classes...',
      content: 'Dear Mr. Kumar,\n\nI wanted to take a moment to thank you for the extra attention and support you have been giving to Arjun during the remedial classes. His confidence in Mathematics has improved significantly.\n\nWe really appreciate your dedication and effort.\n\nWarm regards,\nMr. Rajesh Reddy\nParent of Arjun Reddy, Class 8-A',
      time: '2 days ago',
      isRead: true,
      priority: 'normal',
      classRef: 'Class 8-A',
      studentRef: 'Arjun Reddy',
      hasAttachment: false,
      icon: Users,
      color: 'green'
    }
  ];

  const filteredMessages = messages.filter(msg => {
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'important') {
        return msg.priority === 'important' || msg.priority === 'urgent';
      }
      return msg.type === selectedCategory;
    }
    return true;
  }).filter(msg => {
    if (searchQuery) {
      return msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
             msg.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
             msg.preview.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  }).sort((a, b) => {
    // Sort by priority and read status
    const priorityOrder: { [key: string]: number } = { urgent: 0, important: 1, normal: 2 };
    if (a.priority !== b.priority) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    if (a.isRead !== b.isRead) {
      return a.isRead ? 1 : -1;
    }
    return 0;
  });

  const unreadCount = messages.filter(m => !m.isRead).length;

  const handleMarkAsRead = (msgId: number) => {
    // Mark message as read
    console.log('Mark as read:', msgId);
  };

  const handleMarkAllAsRead = () => {
    console.log('Mark all as read');
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    console.log('Sending reply:', replyText);
    setReplyText('');
    setShowReplyBox(false);
    alert('✅ Reply sent successfully!');
  };

  const getPriorityStyle = (priority: string) => {
    switch(priority) {
      case 'urgent':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'important':
        return 'bg-amber-100 text-amber-700 border-amber-300';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch(priority) {
      case 'urgent':
        return '🔴 Urgent';
      case 'important':
        return '🟠 Important';
      default:
        return '🟢 General';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-emerald-100 px-6 py-3 shadow-sm">
        <div className="flex items-center justify-between max-w-[1800px] mx-auto">
          <div className="flex items-center space-x-3">
            <GraduationCap className="w-8 h-8 text-emerald-600" />
            <span className="text-xl font-semibold text-slate-800">School ERP</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-600">Academic Year: 2025-26</span>
          </div>
        </div>
      </nav>

      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 shadow-xl">
        <div className="max-w-[1800px] mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Notifications & Messages</h1>
              <p className="text-emerald-100">Messages from Admin, Parents & Students</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/20 border-2 border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:bg-white/30 w-64"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
              </div>

              {/* Mark All as Read */}
              <button
                onClick={handleMarkAllAsRead}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-all flex items-center space-x-2 border-2 border-white/30"
              >
                <CheckCheck className="w-5 h-5 text-white" />
                <span className="text-white font-medium">Mark all read</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT SIDEBAR - Categories */}
          <div className="col-span-3">
            <div className="bg-white rounded-3xl shadow-lg border-2 border-emerald-100 overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-800">Categories</h3>
                <p className="text-xs text-slate-600 mt-1">{unreadCount} unread messages</p>
              </div>
              <div className="p-4 space-y-2">
                {categories.map(category => {
                  const Icon = category.icon;
                  const isActive = selectedCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? `bg-${category.color}-100 border-2 border-${category.color}-300`
                          : 'bg-slate-50 hover:bg-slate-100 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${isActive ? `bg-${category.color}-200` : 'bg-slate-200'}`}>
                          <Icon className={`w-5 h-5 ${isActive ? `text-${category.color}-700` : 'text-slate-600'}`} />
                        </div>
                        <span className={`font-semibold text-sm ${isActive ? `text-${category.color}-800` : 'text-slate-700'}`}>
                          {category.label}
                        </span>
                      </div>
                      {category.count > 0 && (
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          isActive ? `bg-${category.color}-200 text-${category.color}-800` : 'bg-slate-200 text-slate-700'
                        }`}>
                          {category.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CENTER - Message List */}
          <div className="col-span-4">
            <div className="bg-white rounded-3xl shadow-lg border-2 border-emerald-100 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-800">
                  {categories.find(c => c.id === selectedCategory)?.label}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  {filteredMessages.length} message{filteredMessages.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                {filteredMessages.length > 0 ? (
                  filteredMessages.map(message => {
                    const Icon = message.icon;
                    const isSelected = selectedMessage?.id === message.id;
                    return (
                      <button
                        key={message.id}
                        onClick={() => setSelectedMessage(message)}
                        className={`w-full px-6 py-4 border-b border-slate-100 hover:bg-emerald-50 transition-all text-left ${
                          isSelected ? 'bg-emerald-50 border-l-4 border-l-emerald-500' : 'border-l-4 border-l-transparent'
                        } ${!message.isRead ? 'bg-blue-50/50' : ''}`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-br from-${message.color}-500 to-${message.color}-600 flex-shrink-0`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className={`font-bold text-sm ${!message.isRead ? 'text-slate-900' : 'text-slate-700'}`}>
                                {message.sender}
                              </span>
                              {!message.isRead && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              )}
                            </div>
                            <h4 className={`text-sm mb-1 truncate ${!message.isRead ? 'font-bold text-slate-800' : 'font-semibold text-slate-700'}`}>
                              {message.subject}
                            </h4>
                            <p className="text-xs text-slate-500 line-clamp-2 mb-2">
                              {message.preview}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                {message.classRef && (
                                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                                    {message.classRef}
                                  </span>
                                )}
                                {message.hasAttachment && (
                                  <Paperclip className="w-3 h-3 text-slate-400" />
                                )}
                              </div>
                              <span className="text-xs text-slate-500">{message.time}</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                    <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                      <Bell className="w-12 h-12 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">All caught up!</h3>
                    <p className="text-slate-600">No messages in this category</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT - Message Detail */}
          <div className="col-span-5">
            <div className="bg-white rounded-3xl shadow-lg border-2 border-emerald-100 overflow-hidden sticky top-6">
              {selectedMessage ? (
                <>
                  {/* Message Header */}
                  <div className={`bg-gradient-to-r from-${selectedMessage.color}-500 to-${selectedMessage.color}-600 px-6 py-6`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                          <selectedMessage.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-white">
                          <h3 className="text-2xl font-bold">{selectedMessage.sender}</h3>
                          <p className="text-sm opacity-90 capitalize">{selectedMessage.type}</p>
                        </div>
                      </div>
                      <button className="bg-white/20 hover:bg-white/30 rounded-lg p-2 transition-all">
                        <MoreVertical className="w-5 h-5 text-white" />
                      </button>
                    </div>
                    <div className="flex items-center space-x-3 text-white text-sm">
                      {selectedMessage.classRef && (
                        <span className="bg-white/20 px-3 py-1 rounded-full">
                          {selectedMessage.classRef}
                        </span>
                      )}
                      {selectedMessage.studentRef && (
                        <span className="bg-white/20 px-3 py-1 rounded-full flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{selectedMessage.studentRef}</span>
                        </span>
                      )}
                      <span className="bg-white/20 px-3 py-1 rounded-full">
                        {selectedMessage.time}
                      </span>
                    </div>
                  </div>

                  {/* Message Subject & Priority */}
                  <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                    <div className="flex items-start justify-between">
                      <h4 className="text-xl font-bold text-slate-800">{selectedMessage.subject}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getPriorityStyle(selectedMessage.priority)}`}>
                        {getPriorityLabel(selectedMessage.priority)}
                      </span>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className="px-6 py-6 max-h-[400px] overflow-y-auto">
                    <div className="prose prose-slate max-w-none">
                      <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                        {selectedMessage.content}
                      </p>
                    </div>

                    {selectedMessage.hasAttachment && (
                      <div className="mt-6">
                        <h5 className="text-sm font-bold text-slate-700 mb-3">Attachment</h5>
                        <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200 flex items-center space-x-3 hover:border-emerald-300 transition-all cursor-pointer">
                          <div className="bg-blue-100 rounded-lg p-3">
                            <Paperclip className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-slate-800 text-sm">Exam_Schedule_Updated.pdf</p>
                            <p className="text-xs text-slate-500">245 KB</p>
                          </div>
                          <Download className="w-5 h-5 text-slate-400" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
                    <div className="flex items-center space-x-3">
                      {selectedMessage.type === 'admin' && (
                        <>
                          <button
                            onClick={() => handleMarkAsRead(selectedMessage.id)}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-bold hover:from-blue-600 hover:to-indigo-600 transition-all flex items-center justify-center space-x-2"
                          >
                            <CheckCheck className="w-5 h-5" />
                            <span>Acknowledge</span>
                          </button>
                          {selectedMessage.hasAttachment && (
                            <button className="px-4 py-3 bg-emerald-100 text-emerald-700 rounded-xl font-bold hover:bg-emerald-200 transition-all flex items-center space-x-2">
                              <Download className="w-5 h-5" />
                              <span>Download</span>
                            </button>
                          )}
                        </>
                      )}

                      {(selectedMessage.type === 'parent' || selectedMessage.type === 'student') && (
                        <>
                          <button
                            onClick={() => setShowReplyBox(!showReplyBox)}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-teal-600 transition-all flex items-center justify-center space-x-2"
                          >
                            <Reply className="w-5 h-5" />
                            <span>Reply</span>
                          </button>
                          {selectedMessage.canCall && (
                            <button className="px-4 py-3 bg-blue-100 text-blue-700 rounded-xl font-bold hover:bg-blue-200 transition-all flex items-center space-x-2">
                              <Phone className="w-5 h-5" />
                              <span>Call</span>
                            </button>
                          )}
                        </>
                      )}
                    </div>

                    {/* Reply Box */}
                    {showReplyBox && (
                      <div className="mt-4 p-4 bg-white rounded-2xl border-2 border-emerald-200">
                        <div className="flex items-center space-x-2 mb-3">
                          <Reply className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm font-bold text-slate-700">Reply to {selectedMessage.sender}</span>
                        </div>
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Type your reply..."
                          className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                          rows={4}
                        />
                        <div className="flex items-center justify-between mt-3">
                          <button className="text-emerald-600 hover:text-emerald-700 flex items-center space-x-2">
                            <Paperclip className="w-4 h-4" />
                            <span className="text-sm font-medium">Attach file</span>
                          </button>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setShowReplyBox(false)}
                              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-all"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleSendReply}
                              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-bold hover:from-emerald-600 hover:to-teal-600 transition-all flex items-center space-x-2"
                            >
                              <Send className="w-4 h-4" />
                              <span>Send</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                  <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                    <Bell className="w-16 h-16 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Select a message</h3>
                  <p className="text-slate-600 max-w-md">
                    Choose a message from the list to view its details and take action
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationsMessagesScreen;