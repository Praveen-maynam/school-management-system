
import React, { useState } from 'react';
import Modal from '../../../components/ui/Modal';
import { 
  MessageSquare, AlertCircle, CheckCircle, Clock, User, Calendar,
  Search, Filter, MoreVertical, Send, Paperclip, Phone, Mail,
  Tag, TrendingUp, TrendingDown, Users, FileText, Settings,
  ArrowUpRight, ArrowDownRight, Eye, Edit, Trash2, Star,
  MessageCircle, Headphones, X, ChevronDown, ChevronRight,
  Download, Upload, RefreshCw, Bell, Zap, BarChart3
} from 'lucide-react';

// TypeScript Interfaces
interface Ticket {
  id: string;
  ticketNumber: string;
  schoolName: string;
  schoolId: string;
  contactPerson: string;
  email: string;
  phone: string;
  subject: string;
  description: string;
  category: 'technical' | 'billing' | 'general' | 'feature' | 'bug';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'pending' | 'resolved' | 'closed';
  assignedTo: string | null;
  createdAt: string;
  updatedAt: string;
  responseTime: number; // in hours
  resolutionTime: number | null; // in hours
  tags: string[];
  attachments: number;
  replies: number;
  satisfaction: number | null; // 1-5 rating
}

interface TicketReply {
  id: string;
  ticketId: string;
  author: string;
  authorType: 'admin' | 'school';
  message: string;
  timestamp: string;
  attachments: string[];
}

interface SupportStats {
  totalTickets: number;
  openTickets: number;
  resolvedToday: number;
  averageResponseTime: number;
  satisfactionRate: number;
  ticketGrowth: number;
  responseTimeChange: number;
  resolutionRate: number;
}

interface Agent {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'online' | 'away' | 'offline';
  activeTickets: number;
  resolvedToday: number;
  avgResponseTime: number;
  satisfaction: number;
}

// Component
const SuperAdminSupportCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tickets' | 'analytics' | 'agents' | 'settings'>('tickets');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showTicketDetail, setShowTicketDetail] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'priority'>('newest');
    const [showAddAgentModal, setShowAddAgentModal] = useState(false);
    const [addAgentForm, setAddAgentForm] = useState({ name: '', email: '', status: 'online', avatar: '', activeTickets: 0, resolvedToday: 0, avgResponseTime: 0, satisfaction: 5 });

  // Mock Data
  const stats: SupportStats = {
    totalTickets: 342,
    openTickets: 28,
    resolvedToday: 15,
    averageResponseTime: 2.3,
    satisfactionRate: 4.6,
    ticketGrowth: -5.3,
    responseTimeChange: -12.5,
    resolutionRate: 94.2
  };

  const tickets: Ticket[] = [
    {
      id: 't1',
      ticketNumber: 'TKT-2847',
      schoolName: 'Greenwood Academy',
      schoolId: 'sch001',
      contactPerson: 'John Smith',
      email: 'john.smith@greenwood.edu',
      phone: '+1 (555) 123-4567',
      subject: 'Unable to access student attendance module',
      description: 'Teachers are reporting they cannot mark attendance. The system shows a 500 error when trying to access the attendance module. This is affecting all teachers across multiple grades.',
      category: 'technical',
      priority: 'high',
      status: 'in-progress',
      assignedTo: 'Sarah Johnson',
      createdAt: '2026-01-29T07:30:00Z',
      updatedAt: '2026-01-29T09:15:00Z',
      responseTime: 0.5,
      resolutionTime: null,
      tags: ['attendance', 'error', 'urgent'],
      attachments: 2,
      replies: 4,
      satisfaction: null
    },
    {
      id: 't2',
      ticketNumber: 'TKT-2846',
      schoolName: 'Oakridge High School',
      schoolId: 'sch002',
      contactPerson: 'Sarah Johnson',
      email: 'sarah.j@oakridge.edu',
      phone: '+1 (555) 234-5678',
      subject: 'Billing discrepancy in monthly invoice',
      description: 'We noticed a discrepancy between the quoted price of $49/month and the actual invoice amount of $59. Please review and adjust.',
      category: 'billing',
      priority: 'medium',
      status: 'pending',
      assignedTo: 'Michael Chen',
      createdAt: '2026-01-29T05:20:00Z',
      updatedAt: '2026-01-29T08:45:00Z',
      responseTime: 1.2,
      resolutionTime: null,
      tags: ['billing', 'invoice'],
      attachments: 1,
      replies: 2,
      satisfaction: null
    },
    {
      id: 't3',
      ticketNumber: 'TKT-2845',
      schoolName: 'Riverside International',
      schoolId: 'sch003',
      contactPerson: 'Michael Chen',
      email: 'm.chen@riverside.edu',
      phone: '+1 (555) 345-6789',
      subject: 'Request for additional user licenses',
      description: 'We need to add 15 more teacher accounts to accommodate new hires. Please advise on pricing and timeline.',
      category: 'general',
      priority: 'low',
      status: 'open',
      assignedTo: null,
      createdAt: '2026-01-28T14:30:00Z',
      updatedAt: '2026-01-28T14:30:00Z',
      responseTime: 0,
      resolutionTime: null,
      tags: ['license', 'upgrade'],
      attachments: 0,
      replies: 0,
      satisfaction: null
    },
    {
      id: 't4',
      ticketNumber: 'TKT-2844',
      schoolName: 'Summit Learning Center',
      schoolId: 'sch004',
      contactPerson: 'Emily Davis',
      email: 'emily.d@summit.edu',
      phone: '+1 (555) 456-7890',
      subject: 'Feature request: Grade curve calculation',
      description: 'It would be helpful to have an automatic grade curve calculation feature in the grading module. Many teachers have requested this.',
      category: 'feature',
      priority: 'low',
      status: 'open',
      assignedTo: 'David Park',
      createdAt: '2026-01-28T11:15:00Z',
      updatedAt: '2026-01-29T08:00:00Z',
      responseTime: 8.5,
      resolutionTime: null,
      tags: ['feature', 'grading'],
      attachments: 0,
      replies: 1,
      satisfaction: null
    },
    {
      id: 't5',
      ticketNumber: 'TKT-2843',
      schoolName: 'Lincoln Preparatory',
      schoolId: 'sch005',
      contactPerson: 'Robert Wilson',
      email: 'r.wilson@lincoln.edu',
      phone: '+1 (555) 567-8901',
      subject: 'Data export not working properly',
      description: 'When trying to export student data to CSV, the file is corrupted and cannot be opened in Excel. Tried multiple times with same result.',
      category: 'bug',
      priority: 'high',
      status: 'in-progress',
      assignedTo: 'Sarah Johnson',
      createdAt: '2026-01-28T09:00:00Z',
      updatedAt: '2026-01-29T07:30:00Z',
      responseTime: 2.0,
      resolutionTime: null,
      tags: ['export', 'bug', 'data'],
      attachments: 3,
      replies: 5,
      satisfaction: null
    },
    {
      id: 't6',
      ticketNumber: 'TKT-2842',
      schoolName: 'Valley View Academy',
      schoolId: 'sch006',
      contactPerson: 'Lisa Anderson',
      email: 'lisa.a@valleyview.edu',
      phone: '+1 (555) 678-9012',
      subject: 'Parent portal login issues',
      description: 'Several parents are unable to log into the parent portal. They receive "invalid credentials" error even with correct passwords.',
      category: 'technical',
      priority: 'urgent',
      status: 'open',
      assignedTo: 'Michael Chen',
      createdAt: '2026-01-29T06:45:00Z',
      updatedAt: '2026-01-29T07:00:00Z',
      responseTime: 0.25,
      resolutionTime: null,
      tags: ['login', 'parent-portal', 'urgent'],
      attachments: 1,
      replies: 2,
      satisfaction: null
    },
    {
      id: 't7',
      ticketNumber: 'TKT-2841',
      schoolName: 'Heritage School',
      schoolId: 'sch007',
      contactPerson: 'James Taylor',
      email: 'james.t@heritage.edu',
      phone: '+1 (555) 789-0123',
      subject: 'Thank you for quick resolution',
      description: 'Just wanted to say thank you for the quick fix on the grading issue yesterday. Everything is working perfectly now!',
      category: 'general',
      priority: 'low',
      status: 'resolved',
      assignedTo: 'David Park',
      createdAt: '2026-01-28T16:30:00Z',
      updatedAt: '2026-01-29T08:00:00Z',
      responseTime: 0.5,
      resolutionTime: 15.5,
      tags: ['feedback', 'positive'],
      attachments: 0,
      replies: 3,
      satisfaction: 5
    },
    {
      id: 't8',
      ticketNumber: 'TKT-2840',
      schoolName: 'Maple Grove School',
      schoolId: 'sch008',
      contactPerson: 'Patricia Martinez',
      email: 'patricia.m@maplegrove.edu',
      phone: '+1 (555) 890-1234',
      subject: 'SMS notifications not being sent',
      description: 'Parents are not receiving SMS notifications about their children\'s attendance. Email notifications are working fine.',
      category: 'technical',
      priority: 'medium',
      status: 'pending',
      assignedTo: 'Sarah Johnson',
      createdAt: '2026-01-28T13:20:00Z',
      updatedAt: '2026-01-29T09:00:00Z',
      responseTime: 3.5,
      resolutionTime: null,
      tags: ['sms', 'notifications'],
      attachments: 0,
      replies: 3,
      satisfaction: null
    }
  ];

  const agents: Agent[] = [
    {
      id: 'a1',
      name: 'Sarah Johnson',
      email: 'sarah.j@edumanage.com',
      avatar: 'SJ',
      status: 'online',
      activeTickets: 5,
      resolvedToday: 8,
      avgResponseTime: 1.8,
      satisfaction: 4.7
    },
    {
      id: 'a2',
      name: 'Michael Chen',
      email: 'michael.c@edumanage.com',
      avatar: 'MC',
      status: 'online',
      activeTickets: 3,
      resolvedToday: 5,
      avgResponseTime: 2.1,
      satisfaction: 4.5
    },
    {
      id: 'a3',
      name: 'David Park',
      email: 'david.p@edumanage.com',
      avatar: 'DP',
      status: 'away',
      activeTickets: 2,
      resolvedToday: 4,
      avgResponseTime: 2.5,
      satisfaction: 4.6
    },
    {
      id: 'a4',
      name: 'Emma Wilson',
      email: 'emma.w@edumanage.com',
      avatar: 'EW',
      status: 'offline',
      activeTickets: 0,
      resolvedToday: 0,
      avgResponseTime: 2.0,
      satisfaction: 4.8
    }
  ];

  const ticketReplies: TicketReply[] = [
    {
      id: 'r1',
      ticketId: 't1',
      author: 'John Smith',
      authorType: 'school',
      message: 'This is affecting over 50 teachers. We need this resolved ASAP as attendance tracking is critical for today.',
      timestamp: '2026-01-29T07:45:00Z',
      attachments: ['error-screenshot.png']
    },
    {
      id: 'r2',
      ticketId: 't1',
      author: 'Sarah Johnson',
      authorType: 'admin',
      message: 'Hi John, thanks for reporting this. I\'ve escalated this to our engineering team and they\'re investigating the issue now. Will update you within the hour.',
      timestamp: '2026-01-29T08:00:00Z',
      attachments: []
    },
    {
      id: 'r3',
      ticketId: 't1',
      author: 'Sarah Johnson',
      authorType: 'admin',
      message: 'Update: We\'ve identified the issue - there was a server configuration problem that occurred during last night\'s maintenance. Our team is deploying a fix now. ETA: 30 minutes.',
      timestamp: '2026-01-29T08:45:00Z',
      attachments: []
    },
    {
      id: 'r4',
      ticketId: 't1',
      author: 'John Smith',
      authorType: 'school',
      message: 'Thank you for the quick response! We\'ll inform our teachers.',
      timestamp: '2026-01-29T09:00:00Z',
      attachments: []
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-700';
      case 'in-progress': return 'bg-purple-100 text-purple-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'closed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return <Settings className="w-4 h-4" />;
      case 'billing': return <FileText className="w-4 h-4" />;
      case 'general': return <MessageSquare className="w-4 h-4" />;
      case 'feature': return <Zap className="w-4 h-4" />;
      case 'bug': return <AlertCircle className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'closed': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredTickets = tickets
    .filter(ticket => {
      const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ticket.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
      const matchesCategory = filterCategory === 'all' || ticket.category === filterCategory;
      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

  const StatCard: React.FC<{
    title: string;
    value: string;
    change?: number;
    icon: React.ReactNode;
    iconBg: string;
  }> = ({ title, value, change, icon, iconBg }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center text-white`}>
          {icon}
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-sm text-gray-600 font-medium">{title}</p>
    </div>
  );

  const TicketCard: React.FC<{ ticket: Ticket }> = ({ ticket }) => (
    <div 
      onClick={() => { setSelectedTicket(ticket); setShowTicketDetail(true); }}
      className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold text-gray-500">{ticket.ticketNumber}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${getPriorityColor(ticket.priority)}`}>
              {ticket.priority.toUpperCase()}
            </span>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${getStatusColor(ticket.status)}`}>
              {getStatusIcon(ticket.status)}
              {ticket.status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </span>
          </div>
          <h3 className="font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">
            {ticket.subject}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{ticket.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
              {ticket.schoolName.charAt(0)}
            </div>
            <span className="font-medium">{ticket.schoolName}</span>
          </div>
          <div className="flex items-center gap-1">
            {getCategoryIcon(ticket.category)}
            <span className="capitalize">{ticket.category}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          {ticket.attachments > 0 && (
            <div className="flex items-center gap-1">
              <Paperclip className="w-3.5 h-3.5" />
              {ticket.attachments}
            </div>
          )}
          {ticket.replies > 0 && (
            <div className="flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5" />
              {ticket.replies}
            </div>
          )}
          <span>{formatDate(ticket.createdAt)}</span>
        </div>
      </div>

      {ticket.assignedTo && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <User className="w-3.5 h-3.5" />
            <span>Assigned to <span className="font-semibold text-gray-900">{ticket.assignedTo}</span></span>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Support Center</h1>
              <p className="text-gray-600 mt-1">Manage tickets, track responses, and support schools</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-gray-200">
            {[
              { id: 'tickets', label: 'All Tickets', icon: <MessageSquare className="w-4 h-4" />, count: tickets.length },
              { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'agents', label: 'Support Agents', icon: <Headphones className="w-4 h-4" />, count: agents.length },
              { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 pb-3 border-b-2 transition-colors font-semibold ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.icon}
                {tab.label}
                {tab.count !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    activeTab === tab.id ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Tickets Tab */}
        {activeTab === 'tickets' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Tickets"
                value={stats.totalTickets.toString()}
                change={stats.ticketGrowth}
                icon={<MessageSquare className="w-6 h-6" />}
                iconBg="bg-gradient-to-br from-indigo-500 to-purple-600"
              />
              <StatCard
                title="Open Tickets"
                value={stats.openTickets.toString()}
                icon={<AlertCircle className="w-6 h-6" />}
                iconBg="bg-gradient-to-br from-orange-500 to-red-600"
              />
              <StatCard
                title="Resolved Today"
                value={stats.resolvedToday.toString()}
                icon={<CheckCircle className="w-6 h-6" />}
                iconBg="bg-gradient-to-br from-green-500 to-emerald-600"
              />
              <StatCard
                title="Avg Response Time"
                value={`${stats.averageResponseTime}h`}
                change={stats.responseTimeChange}
                icon={<Clock className="w-6 h-6" />}
                iconBg="bg-gradient-to-br from-blue-500 to-cyan-600"
              />
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[300px]">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search tickets, schools, or ticket numbers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                  </div>
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Status</option>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Priority</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Categories</option>
                  <option value="technical">Technical</option>
                  <option value="billing">Billing</option>
                  <option value="general">General</option>
                  <option value="feature">Feature Request</option>
                  <option value="bug">Bug Report</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="priority">By Priority</option>
                </select>
              </div>
            </div>

            {/* Tickets Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-semibold">{filteredTickets.length}</span> of <span className="font-semibold">{tickets.length}</span> tickets
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredTickets.map(ticket => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Resolution Rate</p>
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.resolutionRate}%</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-yellow-600" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Satisfaction</p>
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.satisfactionRate}/5.0</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Avg Response</p>
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.averageResponseTime}h</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Active Agents</p>
                </div>
                <p className="text-3xl font-bold text-gray-900">{agents.filter(a => a.status !== 'offline').length}</p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Ticket Volume by Category</h3>
                <div className="h-80 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <BarChart3 className="w-16 h-16 mx-auto mb-4 text-indigo-300" />
                    <p className="font-medium">Chart visualization here</p>
                    <p className="text-sm mt-1">Integrate with Chart.js or Recharts</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Response Time Trends</h3>
                <div className="h-80 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <TrendingUp className="w-16 h-16 mx-auto mb-4 text-green-300" />
                    <p className="font-medium">Chart visualization here</p>
                    <p className="text-sm mt-1">Integrate with Chart.js or Recharts</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Category Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {['technical', 'billing', 'general', 'feature', 'bug'].map(category => {
                  const count = tickets.filter(t => t.category === category).length;
                  const percentage = ((count / tickets.length) * 100).toFixed(1);
                  return (
                    <div key={category} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        {getCategoryIcon(category)}
                        <span className="font-semibold text-gray-900 capitalize">{category}</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 mb-1">{count}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600">{percentage}% of total</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Agents Tab */}
        {activeTab === 'agents' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Support Team</h3>
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2"
                  onClick={() => setShowAddAgentModal(true)}
                >
                  <User className="w-4 h-4" />
                  Add Agent
                </button>
                <Modal
                  isOpen={showAddAgentModal}
                  onClose={() => setShowAddAgentModal(false)}
                  title="Add New Agent"
                  widthClass="max-w-lg"
                >
                  <form
                    className="space-y-6 max-h-[70vh] overflow-y-auto"
                    onSubmit={e => {
                      e.preventDefault();
                      // Add agent logic here (e.g., push to agents array or API call)
                      setShowAddAgentModal(false);
                    }}
                  >
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        value={addAgentForm.name}
                        onChange={e => setAddAgentForm({ ...addAgentForm, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={addAgentForm.email}
                        onChange={e => setAddAgentForm({ ...addAgentForm, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                      <select
                        value={addAgentForm.status}
                        onChange={e => setAddAgentForm({ ...addAgentForm, status: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="online">Online</option>
                        <option value="away">Away</option>
                        <option value="offline">Offline</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Avatar (Initials)</label>
                      <input
                        type="text"
                        value={addAgentForm.avatar}
                        onChange={e => setAddAgentForm({ ...addAgentForm, avatar: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        maxLength={2}
                        required
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button type="button" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors" onClick={() => setShowAddAgentModal(false)}>Cancel</button>
                      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors">Add Agent</button>
                    </div>
                  </form>
                </Modal>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {agents.map(agent => (
                  <div key={agent.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                        {agent.avatar}
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                        agent.status === 'online' ? 'bg-green-100 text-green-700' :
                        agent.status === 'away' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {agent.status}
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">{agent.name}</h4>
                    <p className="text-sm text-gray-600 mb-4">{agent.email}</p>
                    
                    <div className="space-y-3 pt-4 border-t border-gray-200">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Active Tickets</span>
                        <span className="font-bold text-gray-900">{agent.activeTickets}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Resolved Today</span>
                        <span className="font-bold text-green-600">{agent.resolvedToday}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Avg Response</span>
                        <span className="font-bold text-gray-900">{agent.avgResponseTime}h</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Satisfaction</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-gray-900">{agent.satisfaction}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Agent Performance */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Agent Performance</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 text-xs font-bold text-gray-700 uppercase">Agent</th>
                      <th className="text-left py-3 px-4 text-xs font-bold text-gray-700 uppercase">Status</th>
                      <th className="text-left py-3 px-4 text-xs font-bold text-gray-700 uppercase">Active</th>
                      <th className="text-left py-3 px-4 text-xs font-bold text-gray-700 uppercase">Resolved</th>
                      <th className="text-left py-3 px-4 text-xs font-bold text-gray-700 uppercase">Response Time</th>
                      <th className="text-left py-3 px-4 text-xs font-bold text-gray-700 uppercase">Satisfaction</th>
                      <th className="text-right py-3 px-4 text-xs font-bold text-gray-700 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {agents.map(agent => (
                      <tr key={agent.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                              {agent.avatar}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{agent.name}</p>
                              <p className="text-sm text-gray-600">{agent.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            agent.status === 'online' ? 'bg-green-100 text-green-700' :
                            agent.status === 'away' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {agent.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-gray-900">{agent.activeTickets}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-green-600">{agent.resolvedToday}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-gray-900">{agent.avgResponseTime}h</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-bold text-gray-900">{agent.satisfaction}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Email Notifications</h3>
                <div className="space-y-4">
                  {[
                    { label: 'New ticket created', desc: 'Notify when new support tickets are created' },
                    { label: 'Ticket assigned', desc: 'Notify agents when tickets are assigned to them' },
                    { label: 'Ticket resolved', desc: 'Notify when tickets are marked as resolved' },
                    { label: 'Customer replies', desc: 'Notify when customers reply to tickets' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                      <div>
                        <p className="font-semibold text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Support Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Auto-assign tickets</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <option>Round Robin</option>
                      <option>By Workload</option>
                      <option>Manual</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">SLA Response Time</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <option>2 hours</option>
                      <option>4 hours</option>
                      <option>8 hours</option>
                      <option>24 hours</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Default Priority</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <option>Medium</option>
                      <option>Low</option>
                      <option>High</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Canned Responses</h3>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-sm">
                  Add Response
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { title: 'Billing Issue Acknowledgment', preview: 'Thank you for contacting us regarding your billing concern...' },
                  { title: 'Technical Issue Initial Response', preview: 'We\'ve received your technical support request and our team...' },
                  { title: 'Feature Request Response', preview: 'Thank you for your feature suggestion. We appreciate your feedback...' }
                ].map((response, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{response.title}</h4>
                        <p className="text-sm text-gray-600 line-clamp-1">{response.preview}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Ticket Detail Modal */}
      {showTicketDetail && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex items-center justify-between z-10">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-mono font-bold text-gray-500">{selectedTicket.ticketNumber}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${getPriorityColor(selectedTicket.priority)}`}>
                    {selectedTicket.priority.toUpperCase()}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${getStatusColor(selectedTicket.status)}`}>
                    {getStatusIcon(selectedTicket.status)}
                    {selectedTicket.status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedTicket.subject}</h2>
              </div>
              <button 
                onClick={() => setShowTicketDetail(false)}
                className="ml-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Ticket Info */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900 font-medium">{selectedTicket.contactPerson}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <a href={`mailto:${selectedTicket.email}`} className="text-indigo-600 hover:underline">{selectedTicket.email}</a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <a href={`tel:${selectedTicket.phone}`} className="text-indigo-600 hover:underline">{selectedTicket.phone}</a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900 font-medium">{selectedTicket.schoolName}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Ticket Details</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Created:</span>
                      <span className="text-gray-900 font-medium">{formatDate(selectedTicket.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Updated:</span>
                      <span className="text-gray-900 font-medium">{formatDate(selectedTicket.updatedAt)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {getCategoryIcon(selectedTicket.category)}
                      <span className="text-gray-600">Category:</span>
                      <span className="text-gray-900 font-medium capitalize">{selectedTicket.category}</span>
                    </div>
                    {selectedTicket.assignedTo && (
                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Assigned to:</span>
                        <span className="text-gray-900 font-medium">{selectedTicket.assignedTo}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Description</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-800 leading-relaxed">{selectedTicket.description}</p>
                </div>
              </div>

              {/* Tags */}
              {selectedTicket.tags.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTicket.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Conversation */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-4">Conversation</h4>
                <div className="space-y-4">
                  {ticketReplies.filter(r => r.ticketId === selectedTicket.id).map(reply => (
                    <div key={reply.id} className={`flex gap-4 ${reply.authorType === 'admin' ? 'flex-row-reverse' : ''}`}>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {reply.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className={`flex-1 ${reply.authorType === 'admin' ? 'text-right' : ''}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900">{reply.author}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            reply.authorType === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {reply.authorType === 'admin' ? 'Support' : 'School'}
                          </span>
                          <span className="text-xs text-gray-500">{formatDate(reply.timestamp)}</span>
                        </div>
                        <div className={`inline-block px-4 py-3 rounded-lg ${
                          reply.authorType === 'admin' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm leading-relaxed">{reply.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reply Box */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Reply to Ticket</h4>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <textarea
                    rows={4}
                    placeholder="Type your response..."
                    className="w-full px-4 py-3 focus:outline-none resize-none"
                  />
                  <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200">
                    <button className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">
                      <Paperclip className="w-4 h-4" />
                      <span className="text-sm font-medium">Attach File</span>
                    </button>
                    <div className="flex items-center gap-2">
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition-colors">
                        Close Ticket
                      </button>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminSupportCenter;