import React, { useState, useEffect } from 'react';
import { 
  Building2,
  Plus,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Pause,
  Play,
  Crown,
  Search,
  Users,
  Eye,
  TrendingUp,
  DollarSign,
  Zap,
  Clock,
  MapPin,
  Mail,
  Phone,
  AlertCircle
} from 'lucide-react';
import CreateSchool from './CreateSchool';

// Types
interface School {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  adminName: string;
  adminEmail: string;
  adminPhone: string;
  status: 'active' | 'pending' | 'suspended' | 'rejected';
  plan: 'free' | 'basic' | 'premium' | 'custom';
  studentCount: number;
  staffCount: number;
  storageUsed: number;
  storageLimit: number;
  smsUsed: number;
  smsLimit: number;
  joinedDate: Date;
  lastActive: Date;
  revenue: number;
}

interface PlanConfig {
  name: string;
  price: number;
  storage: number;
  sms: number;
  features: string[];
  color: string;
}

const SuperAdminSchoolManagement = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'active' | 'suspended'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'basic' | 'premium' | 'custom'>('free');

  const plans: Record<string, PlanConfig> = {
    free: {
      name: 'Free',
      price: 0,
      storage: 5,
      sms: 100,
      features: ['Basic features', 'Up to 100 students', '5GB storage', '100 SMS/month'],
      color: 'from-gray-500 to-gray-600'
    },
    basic: {
      name: 'Basic',
      price: 49,
      storage: 50,
      sms: 1000,
      features: ['All Free features', 'Up to 500 students', '50GB storage', '1000 SMS/month', 'Email support'],
      color: 'from-blue-500 to-blue-600'
    },
    premium: {
      name: 'Premium',
      price: 149,
      storage: 200,
      sms: 5000,
      features: ['All Basic features', 'Unlimited students', '200GB storage', '5000 SMS/month', 'Priority support', 'Advanced analytics'],
      color: 'from-purple-500 to-purple-600'
    },
    custom: {
      name: 'Custom',
      price: 0,
      storage: 1000,
      sms: 50000,
      features: ['Tailored solutions', 'Custom storage', 'Custom SMS limits', '24/7 dedicated support', 'Custom integrations'],
      color: 'from-orange-500 to-red-600'
    }
  };

  // Mock data initialization
  useEffect(() => {
    const mockSchools: School[] = [
      {
        id: 'SCH-001',
        name: 'Springfield High School',
        address: '742 Evergreen Terrace',
        city: 'Springfield',
        country: 'USA',
        adminName: 'John Smith',
        adminEmail: 'john.smith@springfield.edu',
        adminPhone: '+1-555-0123',
        status: 'active',
        plan: 'premium',
        studentCount: 1250,
        staffCount: 85,
        storageUsed: 145,
        storageLimit: 200,
        smsUsed: 3420,
        smsLimit: 5000,
        joinedDate: new Date('2024-09-15'),
        lastActive: new Date('2026-01-30T09:30:00'),
        revenue: 1788
      },
      {
        id: 'SCH-002',
        name: 'Riverside Academy',
        address: '123 River Road',
        city: 'Portland',
        country: 'USA',
        adminName: 'Sarah Johnson',
        adminEmail: 'sarah.j@riverside.edu',
        adminPhone: '+1-555-0456',
        status: 'active',
        plan: 'basic',
        studentCount: 450,
        staffCount: 32,
        storageUsed: 28,
        storageLimit: 50,
        smsUsed: 720,
        smsLimit: 1000,
        joinedDate: new Date('2025-03-20'),
        lastActive: new Date('2026-01-30T11:15:00'),
        revenue: 588
      },
      {
        id: 'SCH-003',
        name: 'Greenwood Elementary',
        address: '456 Oak Street',
        city: 'Boston',
        country: 'USA',
        adminName: 'Michael Chen',
        adminEmail: 'm.chen@greenwood.edu',
        adminPhone: '+1-555-0789',
        status: 'pending',
        plan: 'free',
        studentCount: 0,
        staffCount: 0,
        storageUsed: 0,
        storageLimit: 5,
        smsUsed: 0,
        smsLimit: 100,
        joinedDate: new Date('2026-01-28'),
        lastActive: new Date('2026-01-28T16:45:00'),
        revenue: 0
      },
      {
        id: 'SCH-004',
        name: 'Sunset International School',
        address: '789 Sunset Boulevard',
        city: 'Los Angeles',
        country: 'USA',
        adminName: 'Emily Rodriguez',
        adminEmail: 'e.rodriguez@sunset.edu',
        adminPhone: '+1-555-0321',
        status: 'suspended',
        plan: 'premium',
        studentCount: 890,
        staffCount: 58,
        storageUsed: 180,
        storageLimit: 200,
        smsUsed: 4850,
        smsLimit: 5000,
        joinedDate: new Date('2024-11-10'),
        lastActive: new Date('2026-01-25T14:20:00'),
        revenue: 1490
      },
      {
        id: 'SCH-005',
        name: 'Maplewood Primary School',
        address: '321 Maple Avenue',
        city: 'Seattle',
        country: 'USA',
        adminName: 'David Park',
        adminEmail: 'd.park@maplewood.edu',
        adminPhone: '+1-555-0654',
        status: 'pending',
        plan: 'basic',
        studentCount: 0,
        staffCount: 0,
        storageUsed: 0,
        storageLimit: 50,
        smsUsed: 0,
        smsLimit: 1000,
        joinedDate: new Date('2026-01-29'),
        lastActive: new Date('2026-01-29T10:00:00'),
        revenue: 0
      }
    ];

    setSchools(mockSchools);
    setFilteredSchools(mockSchools);
  }, []);

  // Filter schools based on active tab and search
  useEffect(() => {
    let filtered = schools;

    if (activeTab !== 'all') {
      filtered = filtered.filter(school => school.status === activeTab);
    }

    if (searchTerm) {
      filtered = filtered.filter(school => 
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.adminEmail.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSchools(filtered);
  }, [activeTab, searchTerm, schools]);

  // Handle school approval
  const handleApprove = (schoolId: string) => {
    setSchools(schools.map(school => 
      school.id === schoolId 
        ? { ...school, status: 'active' as const }
        : school
    ));
  };

  // Handle school rejection
  const handleReject = (schoolId: string) => {
    setSchools(schools.map(school => 
      school.id === schoolId 
        ? { ...school, status: 'rejected' as const }
        : school
    ));
  };

  // Handle school suspension
  const handleSuspend = (schoolId: string) => {
    setSchools(schools.map(school => 
      school.id === schoolId 
        ? { ...school, status: 'suspended' as const }
        : school
    ));
  };

  // Handle school reactivation
  const handleReactivate = (schoolId: string) => {
    setSchools(schools.map(school => 
      school.id === schoolId 
        ? { ...school, status: 'active' as const }
        : school
    ));
  };

  // Handle plan update
  const handleUpdatePlan = (schoolId: string, newPlan: 'free' | 'basic' | 'premium' | 'custom') => {
    setSchools(schools.map(school => 
      school.id === schoolId 
        ? { 
            ...school, 
            plan: newPlan,
            storageLimit: plans[newPlan].storage,
            smsLimit: plans[newPlan].sms
          }
        : school
    ));
    setShowPlanModal(false);
  };

  // Handle school deletion
  const handleDelete = (schoolId: string) => {
    setSchools(schools.filter(school => school.id !== schoolId));
    setShowDeleteModal(false);
    setSelectedSchool(null);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      pending: 'bg-amber-50 text-amber-700 border-amber-200',
      suspended: 'bg-rose-50 text-rose-700 border-rose-200',
      rejected: 'bg-gray-50 text-gray-700 border-gray-200'
    };
    return styles[status as keyof typeof styles] || styles.active;
  };

  const getPlanBadge = (plan: string) => {
    const styles = {
      free: 'bg-gray-100 text-gray-700',
      basic: 'bg-blue-100 text-blue-700',
      premium: 'bg-purple-100 text-purple-700',
      custom: 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-700'
    };
    return styles[plan as keyof typeof styles] || styles.free;
  };

  // Calculate statistics
  const stats = {
    total: schools.length,
    active: schools.filter(s => s.status === 'active').length,
    pending: schools.filter(s => s.status === 'pending').length,
    suspended: schools.filter(s => s.status === 'suspended').length,
    totalRevenue: schools.reduce((acc, s) => acc + s.revenue, 0),
    totalStudents: schools.reduce((acc, s) => acc + s.studentCount, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-lg opacity-30"></div>
                <div className="relative p-3 bg-blue-600 rounded-2xl shadow-lg">
                  <Building2 className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  School Management
                </h1>
                <p className="text-gray-600 text-sm mt-1 font-medium">
                  Super Admin Control Panel
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Add New School
            </button>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="max-w-[1600px] mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-emerald-300 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Building2 className="w-5 h-5 text-gray-600" />
              </div>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Schools</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-emerald-300 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-xs text-emerald-600 font-semibold">+12%</div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.active}</div>
            <div className="text-sm text-gray-600">Active Schools</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-amber-300 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-amber-50 rounded-lg">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <AlertCircle className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending Approval</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-rose-300 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-rose-50 rounded-lg">
                <Pause className="w-5 h-5 text-rose-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.suspended}</div>
            <div className="text-sm text-gray-600">Suspended</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalStudents.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Students</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-emerald-300 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <DollarSign className="w-5 h-5 text-emerald-600" />
              </div>
              <Zap className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">${stats.totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Monthly Revenue</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex-1 relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search schools, ID, city, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="flex gap-3">
              {[
                { id: 'all', label: 'All', count: stats.total },
                { id: 'pending', label: 'Pending', count: stats.pending },
                { id: 'active', label: 'Active', count: stats.active },
                { id: 'suspended', label: 'Suspended', count: stats.suspended }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.label} <span className="ml-2 opacity-75">({tab.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Schools Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredSchools.map(school => (
            <div
              key={school.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-emerald-300 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-md">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{school.name}</h3>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-mono text-gray-600">{school.id}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(school.status)}`}>
                            {school.status.toUpperCase()}
                          </span>
                          <span className={`px-3 py-1 rounded-lg text-xs font-bold ${getPlanBadge(school.plan)}`}>
                            {plans[school.plan].name}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{school.address}, {school.city}, {school.country}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{school.adminEmail}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{school.adminPhone}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Students</span>
                          <span className="text-sm font-bold text-gray-900">{school.studentCount.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Staff</span>
                          <span className="text-sm font-bold text-gray-900">{school.staffCount.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Revenue</span>
                          <span className="text-sm font-bold text-emerald-600">${school.revenue}/mo</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-600">Storage</span>
                            <span className="text-xs text-gray-700">{school.storageUsed}GB / {school.storageLimit}GB</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all"
                              style={{ width: `${(school.storageUsed / school.storageLimit) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-600">SMS Usage</span>
                            <span className="text-xs text-gray-700">{school.smsUsed.toLocaleString()} / {school.smsLimit.toLocaleString()}</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                              style={{ width: `${(school.smsUsed / school.smsLimit) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">Last Active</span>
                          <span className="text-xs text-gray-700">{school.lastActive.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
                  {school.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(school.id)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-all shadow-sm hover:shadow-md"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(school.id)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-lg transition-all shadow-sm hover:shadow-md"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                    </>
                  )}

                  {school.status === 'active' && (
                    <>
                      <button
                        onClick={() => {
                          setSelectedSchool(school);
                          setSelectedPlan(school.plan);
                          setShowPlanModal(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all shadow-sm hover:shadow-md"
                      >
                        <Crown className="w-4 h-4" />
                        Change Plan
                      </button>
                      <button
                        onClick={() => handleSuspend(school.id)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg transition-all shadow-sm hover:shadow-md"
                      >
                        <Pause className="w-4 h-4" />
                        Suspend
                      </button>
                    </>
                  )}

                  {school.status === 'suspended' && (
                    <button
                      onClick={() => handleReactivate(school.id)}
                      className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-all shadow-sm hover:shadow-md"
                    >
                      <Play className="w-4 h-4" />
                      Reactivate
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedSchool(school)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-all shadow-sm hover:shadow-md"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </button>

                  <button
                    onClick={() => {
                      setSelectedSchool(school);
                      setShowDeleteModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-lg transition-all shadow-sm hover:shadow-md ml-auto"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>

                  <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-all shadow-sm hover:shadow-md">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSchools.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Schools Found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Plan Selection Modal */}
      {showPlanModal && selectedSchool && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Select Plan</h2>
                  <p className="text-gray-600 text-sm mt-1">{selectedSchool.name}</p>
                </div>
                <button
                  onClick={() => setShowPlanModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircle className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(plans).map(([key, plan]) => (
                <div
                  key={key}
                  onClick={() => setSelectedPlan(key as any)}
                  className={`cursor-pointer p-6 rounded-2xl border-2 transition-all ${
                    selectedPlan === key
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className={`inline-block px-4 py-1.5 rounded-lg font-bold text-sm bg-gradient-to-r ${plan.color} text-white mb-4`}>
                    {plan.name}
                  </div>
                  
                  {plan.price > 0 ? (
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                      <span className="text-gray-600 ml-2">/month</span>
                    </div>
                  ) : (
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">{plan.name === 'Free' ? 'Free' : 'Custom Pricing'}</span>
                    </div>
                  )}

                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Storage</div>
                      <div className="font-bold text-gray-900">{plan.storage}GB</div>
                    </div>
                    <div>
                      <div className="text-gray-500">SMS</div>
                      <div className="font-bold text-gray-900">{plan.sms.toLocaleString()}/mo</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
              <button
                onClick={() => handleUpdatePlan(selectedSchool.id, selectedPlan)}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-emerald-500/20 transition-all"
              >
                Update Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedSchool && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-gray-200 shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-rose-100 rounded-xl">
                  <AlertCircle className="w-8 h-8 text-rose-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Delete School</h2>
                  <p className="text-gray-600 text-sm mt-1">This action cannot be undone</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl">
                <p className="text-gray-700 text-sm">
                  You are about to permanently delete <strong className="text-gray-900">{selectedSchool.name}</strong>. 
                  All associated data will be backed up before deletion.
                </p>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-rose-600" />
                  <span className="text-sm text-gray-700">Create backup before deletion</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-rose-600" />
                  <span className="text-sm text-gray-700">Notify school administrators</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-rose-600" defaultChecked />
                  <span className="text-sm text-gray-700">I understand this action is permanent</span>
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedSchool(null);
                }}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedSchool.id)}
                className="flex-1 py-3 bg-gradient-to-r from-rose-600 to-red-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-rose-500/20 transition-all"
              >
                Delete School
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add School Modal */}
      {showAddModal && (
        <CreateSchool onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
};

export default SuperAdminSchoolManagement;