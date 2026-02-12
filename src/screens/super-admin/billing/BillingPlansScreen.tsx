

import React, { useState } from 'react';
import { Bar } from '../../../lib/chartjs';

// Production-level RevenueBarChart component
const RevenueBarChart: React.FC = () => {
  const data = {
    labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 15000, 18000, 14000, 21000, 25000],
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderRadius: 8,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Revenue Trends (Last 6 Months)',
        font: { size: 18 },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `Revenue: $${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        title: { display: true, text: 'Month' },
      },
      y: {
        grid: { color: '#e0e7ff' },
        title: { display: true, text: 'Revenue ($)' },
        beginAtZero: true,
      },
    },
  };
  return <Bar data={data} options={options} className="w-full h-full" />;
};
import { 
  CreditCard, DollarSign, TrendingUp, Users, Calendar, 
  MoreVertical, Download, Search, Filter, Plus, Edit, 
  Trash2, CheckCircle, XCircle, AlertCircle, ArrowUpRight,
  ArrowDownRight, Eye, RefreshCw, FileText, Bell
} from 'lucide-react';

// TypeScript Interfaces
interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  maxStudents: number;
  maxTeachers: number;
  storage: string;
  support: string;
  isPopular: boolean;
  isActive: boolean;
  subscribersCount: number;
  revenue: number;
}

interface Subscription {
  id: string;
  schoolName: string;
  schoolId: string;
  plan: string;
  status: 'active' | 'expired' | 'cancelled' | 'pending' | 'trial';
  startDate: string;
  renewalDate: string;
  amount: number;
  paymentMethod: string;
  lastPayment: string;
  autoRenew: boolean;
  students: number;
  teachers: number;
}

interface Transaction {
  id: string;
  schoolName: string;
  type: 'subscription' | 'upgrade' | 'refund' | 'addon';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  invoice: string;
  paymentMethod: string;
}

interface BillingStats {
  totalRevenue: number;
  monthlyRevenue: number;
  activeSubscriptions: number;
  pendingPayments: number;
  revenueGrowth: number;
  subscriptionGrowth: number;
  averageRevenuePerSchool: number;
  churnRate: number;
}

// Move mock data above component
const plans: Plan[] = [
  {
    id: 'p1',
    name: 'Basic',
    description: 'Perfect for small schools starting out',
    price: 49,
    billingCycle: 'monthly',
    features: ['Up to 500 students', '25 teachers', 'Basic attendance', 'Grade management', 'Email support', '5GB storage'],
    maxStudents: 500,
    maxTeachers: 25,
    storage: '5GB',
    support: 'Email',
    isPopular: false,
    isActive: true,
    subscribersCount: 45,
    revenue: 2205
  },
  {
    id: 'p2',
    name: 'Premium',
    description: 'Most popular plan for growing schools',
    price: 149,
    billingCycle: 'monthly',
    features: ['Up to 2000 students', '100 teachers', 'Advanced analytics', 'Parent portal', 'SMS notifications', '24/7 support', '50GB storage', 'Custom reports'],
    maxStudents: 2000,
    maxTeachers: 100,
    storage: '50GB',
    support: '24/7 Phone & Chat',
    isPopular: true,
    isActive: true,
    subscribersCount: 78,
    revenue: 11622
  },
  {
    id: 'p3',
    name: 'Enterprise',
    description: 'Unlimited power for large institutions',
    price: 399,
    billingCycle: 'monthly',
    features: ['Unlimited students', 'Unlimited teachers', 'White-label option', 'API access', 'Dedicated support', 'Custom integrations', 'Unlimited storage', 'SLA guarantee', 'Training sessions'],
    maxStudents: 999999,
    maxTeachers: 999999,
    storage: 'Unlimited',
    support: 'Dedicated Account Manager',
    isPopular: false,
    isActive: true,
    subscribersCount: 24,
    revenue: 9576
  }
];

// Component
const SuperAdminBillingPlans: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'plans' | 'subscriptions' | 'transactions'>('overview');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreatePlanModal, setShowCreatePlanModal] = useState(false);
  const [createPlanForm, setCreatePlanForm] = useState({
    name: '',
    description: '',
    price: 0,
    billingCycle: 'monthly' as Plan['billingCycle'],
    features: '',
    maxStudents: 0,
    maxTeachers: 0,
    storage: '',
    support: '',
    isPopular: false,
    isActive: true,
  });
  const [plansList, setPlansList] = useState<Plan[]>(plans);

  // Mock Data
  const stats: BillingStats = {
    totalRevenue: 1247800,
    monthlyRevenue: 89400,
    activeSubscriptions: 147,
    pendingPayments: 12,
    revenueGrowth: 18.5,
    subscriptionGrowth: 12.3,
    averageRevenuePerSchool: 608,
    churnRate: 3.2
  };

  const subscriptions: Subscription[] = [
    {
      id: 's1',
      schoolName: 'Greenwood Academy',
      schoolId: 'sch001',
      plan: 'Premium',
      status: 'active',
      startDate: '2024-01-15',
      renewalDate: '2026-02-15',
      amount: 149,
      paymentMethod: 'Credit Card',
      lastPayment: '2026-01-15',
      autoRenew: true,
      students: 1245,
      teachers: 87
    },
    {
      id: 's2',
      schoolName: 'Oakridge High School',
      schoolId: 'sch002',
      plan: 'Basic',
      status: 'active',
      startDate: '2024-03-22',
      renewalDate: '2026-02-22',
      amount: 49,
      paymentMethod: 'Bank Transfer',
      lastPayment: '2026-01-22',
      autoRenew: true,
      students: 456,
      teachers: 32
    },
    {
      id: 's3',
      schoolName: 'Riverside International',
      schoolId: 'sch003',
      plan: 'Premium',
      status: 'pending',
      startDate: '2024-02-10',
      renewalDate: '2026-01-31',
      amount: 149,
      paymentMethod: 'Credit Card',
      lastPayment: '2025-12-10',
      autoRenew: false,
      students: 2100,
      teachers: 145
    },
    {
      id: 's4',
      schoolName: 'Summit Learning Center',
      schoolId: 'sch004',
      plan: 'Enterprise',
      status: 'active',
      startDate: '2023-11-05',
      renewalDate: '2026-02-05',
      amount: 399,
      paymentMethod: 'Credit Card',
      lastPayment: '2026-01-05',
      autoRenew: true,
      students: 3200,
      teachers: 225
    },
    {
      id: 's5',
      schoolName: 'Maple Grove School',
      schoolId: 'sch005',
      plan: 'Basic',
      status: 'trial',
      startDate: '2026-01-20',
      renewalDate: '2026-02-03',
      amount: 0,
      paymentMethod: 'N/A',
      lastPayment: 'N/A',
      autoRenew: false,
      students: 234,
      teachers: 18
    }
  ];

  const transactions: Transaction[] = [
    {
      id: 't1',
      schoolName: 'Greenwood Academy',
      type: 'subscription',
      amount: 149,
      status: 'completed',
      date: '2026-01-15',
      invoice: 'INV-2026-001',
      paymentMethod: 'Credit Card ****4242'
    },
    {
      id: 't2',
      schoolName: 'Summit Learning Center',
      type: 'subscription',
      amount: 399,
      status: 'completed',
      date: '2026-01-05',
      invoice: 'INV-2026-002',
      paymentMethod: 'Credit Card ****8888'
    },
    {
      id: 't3',
      schoolName: 'Oakridge High School',
      type: 'subscription',
      amount: 49,
      status: 'completed',
      date: '2026-01-22',
      invoice: 'INV-2026-003',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 't4',
      schoolName: 'Valley View Academy',
      type: 'upgrade',
      amount: 100,
      status: 'completed',
      date: '2026-01-28',
      invoice: 'INV-2026-004',
      paymentMethod: 'Credit Card ****1234'
    },
    {
      id: 't5',
      schoolName: 'Lincoln Prep',
      type: 'subscription',
      amount: 149,
      status: 'pending',
      date: '2026-01-29',
      invoice: 'INV-2026-005',
      paymentMethod: 'Credit Card ****5678'
    },
    {
      id: 't6',
      schoolName: 'Heritage School',
      type: 'refund',
      amount: -49,
      status: 'completed',
      date: '2026-01-27',
      invoice: 'REF-2026-001',
      paymentMethod: 'Credit Card ****9999'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'expired': case 'failed': return 'bg-red-100 text-red-700';
      case 'cancelled': return 'bg-gray-100 text-gray-700';
      case 'trial': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'expired': case 'failed': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const StatCard: React.FC<{
    title: string;
    value: string;
    change: number;
    icon: React.ReactNode;
    iconBg: string;
  }> = ({ title, value, change, icon, iconBg }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center text-white`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-sm font-semibold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          {Math.abs(change)}%
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-sm text-gray-600 font-medium">{title}</p>
    </div>
  );

  const PlanCard: React.FC<{ plan: Plan }> = ({ plan }) => (
    <div className={`bg-white rounded-xl border-2 ${plan.isPopular ? 'border-indigo-500 shadow-xl' : 'border-gray-200'} p-6 relative hover:shadow-lg transition-all duration-300`}>
      {plan.isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full">
            MOST POPULAR
          </span>
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
        <p className="text-sm text-gray-600">{plan.description}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
          <span className="text-gray-600 font-medium">/{plan.billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {plan.features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-700">{feature}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-600">Subscribers</p>
            <p className="font-bold text-gray-900">{plan.subscribersCount}</p>
          </div>
          <div>
            <p className="text-gray-600">Revenue</p>
            <p className="font-bold text-gray-900">{formatCurrency(plan.revenue)}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => { setSelectedPlan(plan); setShowPlanModal(true); }}
          className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const handleCreatePlan = () => {
    setShowCreatePlanModal(true);
  };

  const handleCreatePlanSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPlan: Plan = {
      id: (plansList.length + 1).toString(),
      name: createPlanForm.name,
      description: createPlanForm.description,
      price: createPlanForm.price,
      billingCycle: createPlanForm.billingCycle,
      features: createPlanForm.features.split(',').map(f => f.trim()),
      maxStudents: createPlanForm.maxStudents,
      maxTeachers: createPlanForm.maxTeachers,
      storage: createPlanForm.storage, 
      support: createPlanForm.support,
      isPopular: createPlanForm.isPopular,
      isActive: createPlanForm.isActive,
      subscribersCount: 0,
      revenue: 0
    };
    setPlansList([...plansList, newPlan]);
    setShowCreatePlanModal(false);
    setCreatePlanForm({
      name: '',
      description: '',
      price: 0,
      billingCycle: 'monthly',
      features: '',
      maxStudents: 0,
      maxTeachers: 0,
      storage: '',
      support: '',
      isPopular: false,
      isActive: true,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Billing & Plans Management</h1>
              <p className="text-gray-600 mt-1">Manage pricing plans, subscriptions, and revenue</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2"
                onClick={handleCreatePlan}
              >
                <Plus className="w-4 h-4" />
                Create Plan
              </button>
            </div>
          </div>

          {/* Create Plan Modal */}
          {showCreatePlanModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
              <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
                <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={() => setShowCreatePlanModal(false)}>
                  <span className="text-2xl">×</span>
                </button>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Create New Plan</h2>
                <form onSubmit={handleCreatePlanSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Plan Name *</label>
                    <input
                      type="text"
                      required
                      value={createPlanForm.name}
                      onChange={e => setCreatePlanForm({ ...createPlanForm, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g., Premium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <input
                      type="text"
                      required
                      value={createPlanForm.description}
                      onChange={e => setCreatePlanForm({ ...createPlanForm, description: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g., Best for growing schools"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price (USD) *</label>
                      <input
                        type="number"
                        min={0}
                        required
                        value={createPlanForm.price}
                        onChange={e => setCreatePlanForm({ ...createPlanForm, price: Number(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Billing Cycle *</label>
                      <select
                        value={createPlanForm.billingCycle}
                        onChange={e => setCreatePlanForm({ ...createPlanForm, billingCycle: e.target.value as Plan['billingCycle'] })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Features (comma separated) *</label>
                    <input
                      type="text"
                      required
                      value={createPlanForm.features}
                      onChange={e => setCreatePlanForm({ ...createPlanForm, features: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g., Unlimited students, 24/7 support"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Max Students *</label>
                      <input
                        type="number"
                        min={0}
                        required
                        value={createPlanForm.maxStudents}
                        onChange={e => setCreatePlanForm({ ...createPlanForm, maxStudents: Number(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Max Teachers *</label>
                      <input
                        type="number"
                        min={0}
                        required
                        value={createPlanForm.maxTeachers}
                        onChange={e => setCreatePlanForm({ ...createPlanForm, maxTeachers: Number(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Storage *</label>
                    <input
                      type="text"
                      required
                      value={createPlanForm.storage}
                      onChange={e => setCreatePlanForm({ ...createPlanForm, storage: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g., 50GB"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Support *</label>
                    <input
                      type="text"
                      required
                      value={createPlanForm.support}
                      onChange={e => setCreatePlanForm({ ...createPlanForm, support: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g., 24/7 Phone & Chat"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={createPlanForm.isPopular}
                        onChange={e => setCreatePlanForm({ ...createPlanForm, isPopular: e.target.checked })}
                        className="accent-indigo-600"
                      />
                      <span className="text-sm text-gray-700">Mark as Popular</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={createPlanForm.isActive}
                        onChange={e => setCreatePlanForm({ ...createPlanForm, isActive: e.target.checked })}
                        className="accent-green-600"
                      />
                      <span className="text-sm text-gray-700">Active</span>
                    </label>
                  </div>
                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <button
                      type="button"
                      onClick={() => setShowCreatePlanModal(false)}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
                    >
                      Create Plan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-6 border-b border-gray-200">
            {[
              { id: 'overview', label: 'Overview', icon: <DollarSign className="w-4 h-4" /> },
              { id: 'plans', label: 'Pricing Plans', icon: <CreditCard className="w-4 h-4" /> },
              { id: 'subscriptions', label: 'Subscriptions', icon: <Users className="w-4 h-4" /> },
              { id: 'transactions', label: 'Transactions', icon: <FileText className="w-4 h-4" /> }
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
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Revenue"
                value={formatCurrency(stats.totalRevenue)}
                change={stats.revenueGrowth}
                icon={<DollarSign className="w-6 h-6" />}
                iconBg="bg-gradient-to-br from-green-500 to-emerald-600"
              />
              <StatCard
                title="Monthly Revenue"
                value={formatCurrency(stats.monthlyRevenue)}
                change={stats.revenueGrowth}
                icon={<TrendingUp className="w-6 h-6" />}
                iconBg="bg-gradient-to-br from-indigo-500 to-purple-600"
              />
              <StatCard
                title="Active Subscriptions"
                value={stats.activeSubscriptions.toString()}
                change={stats.subscriptionGrowth}
                icon={<Users className="w-6 h-6" />}
                iconBg="bg-gradient-to-br from-blue-500 to-cyan-600"
              />
              <StatCard
                title="Pending Payments"
                value={stats.pendingPayments.toString()}
                change={-stats.churnRate}
                icon={<AlertCircle className="w-6 h-6" />}
                iconBg="bg-gradient-to-br from-orange-500 to-red-600"
              />
            </div>

            {/* Revenue Chart & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Revenue Chart */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Revenue Trends</h2>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>Last 6 Months</option>
                    <option>Last Year</option>
                    <option>All Time</option>
                  </select>
                </div>
                <div className="h-80 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg flex items-center justify-center">
                  <div className="w-full h-full">
                    <RevenueBarChart />
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Quick Stats</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Avg Revenue/School</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.averageRevenuePerSchool)}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Churn Rate</p>
                    <p className="text-2xl font-bold text-red-600">{stats.churnRate}%</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Growth Rate</p>
                    <p className="text-2xl font-bold text-green-600">+{stats.subscriptionGrowth}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Plan Distribution */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Plan Distribution</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map(plan => (
                  <div key={plan.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-gray-900">{plan.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        plan.isPopular ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {plan.subscribersCount} schools
                      </span>
                    </div>
                    <div className="mb-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full"
                          style={{ width: `${(plan.subscribersCount / 147) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Monthly Revenue</span>
                      <span className="font-bold text-gray-900">{formatCurrency(plan.revenue)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Plans Tab */}
        {activeTab === 'plans' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">All Pricing Plans</h2>
                <p className="text-gray-600 mt-1">Manage and configure subscription plans</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map(plan => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </div>

            {/* Plan Comparison Table */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Plan Comparison</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Feature</th>
                      {plans.map(plan => (
                        <th key={plan.id} className="text-left py-3 px-4 text-sm font-bold text-gray-700">
                          {plan.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-900 font-medium">Max Students</td>
                      {plans.map(plan => (
                        <td key={plan.id} className="py-3 px-4 text-sm text-gray-700">
                          {plan.maxStudents === 999999 ? 'Unlimited' : plan.maxStudents.toLocaleString()}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-900 font-medium">Max Teachers</td>
                      {plans.map(plan => (
                        <td key={plan.id} className="py-3 px-4 text-sm text-gray-700">
                          {plan.maxTeachers === 999999 ? 'Unlimited' : plan.maxTeachers}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-900 font-medium">Storage</td>
                      {plans.map(plan => (
                        <td key={plan.id} className="py-3 px-4 text-sm text-gray-700">{plan.storage}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-900 font-medium">Support</td>
                      {plans.map(plan => (
                        <td key={plan.id} className="py-3 px-4 text-sm text-gray-700">{plan.support}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-900 font-medium">Monthly Price</td>
                      {plans.map(plan => (
                        <td key={plan.id} className="py-3 px-4 text-sm font-bold text-indigo-600">
                          {formatCurrency(plan.price)}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Subscriptions Tab */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[300px]">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search schools..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="trial">Trial</option>
                  <option value="expired">Expired</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>All Plans</option>
                  <option>Basic</option>
                  <option>Premium</option>
                  <option>Enterprise</option>
                </select>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  More Filters
                </button>
              </div>
            </div>

            {/* Subscriptions Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">School</th>
                      <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">Plan</th>
                      <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">Amount</th>
                      <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                      <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">Renewal</th>
                      <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">Users</th>
                      <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">Auto-Renew</th>
                      <th className="text-right py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {subscriptions
                      .filter(sub => filterStatus === 'all' || sub.status === filterStatus)
                      .filter(sub => sub.schoolName.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map(sub => (
                      <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-semibold text-gray-900">{sub.schoolName}</p>
                            <p className="text-sm text-gray-600">{sub.schoolId}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            sub.plan === 'Premium' ? 'bg-indigo-100 text-indigo-700' :
                            sub.plan === 'Enterprise' ? 'bg-purple-100 text-purple-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {sub.plan}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <p className="font-bold text-gray-900">{formatCurrency(sub.amount)}</p>
                          <p className="text-xs text-gray-600">per month</p>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(sub.status)}`}>
                            {getStatusIcon(sub.status)}
                            {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-sm text-gray-900 font-medium">{formatDate(sub.renewalDate)}</p>
                          <p className="text-xs text-gray-600">
                            {Math.ceil((new Date(sub.renewalDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                          </p>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3 text-sm">
                            <div>
                              <p className="text-gray-900 font-medium">{sub.students}</p>
                              <p className="text-gray-600 text-xs">students</p>
                            </div>
                            <div className="w-px h-8 bg-gray-300"></div>
                            <div>
                              <p className="text-gray-900 font-medium">{sub.teachers}</p>
                              <p className="text-gray-600 text-xs">teachers</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          {sub.autoRenew ? (
                            <span className="inline-flex items-center gap-1 text-green-700 text-sm font-medium">
                              <CheckCircle className="w-4 h-4" />
                              Yes
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-gray-500 text-sm font-medium">
                              <XCircle className="w-4 h-4" />
                              No
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-600">Showing <span className="font-semibold">1-5</span> of <span className="font-semibold">{subscriptions.length}</span> subscriptions</p>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  Previous
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="space-y-6">
            {/* Transaction Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Completed</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {transactions.filter(t => t.status === 'completed').length}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Pending</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {transactions.filter(t => t.status === 'pending').length}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Failed</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {transactions.filter(t => t.status === 'failed').length}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-indigo-600" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Total Volume</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(transactions.reduce((sum, t) => sum + t.amount, 0))}
                </p>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
                <div className="flex items-center gap-3">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>All Types</option>
                    <option>Subscription</option>
                    <option>Upgrade</option>
                    <option>Refund</option>
                  </select>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">Transaction ID</th>
                      <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">School</th>
                      <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">Type</th>
                      <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">Amount</th>
                      <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                      <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                      <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">Payment Method</th>
                      <th className="text-right py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {transactions.map(txn => (
                      <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <p className="font-mono text-sm font-semibold text-gray-900">{txn.invoice}</p>
                        </td>
                        <td className="py-4 px-6">
                          <p className="font-semibold text-gray-900">{txn.schoolName}</p>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            txn.type === 'subscription' ? 'bg-blue-100 text-blue-700' :
                            txn.type === 'upgrade' ? 'bg-purple-100 text-purple-700' :
                            txn.type === 'refund' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <p className={`font-bold ${txn.amount < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                            {formatCurrency(Math.abs(txn.amount))}
                          </p>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(txn.status)}`}>
                            {getStatusIcon(txn.status)}
                            {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-sm text-gray-900">{formatDate(txn.date)}</p>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-gray-400" />
                            <p className="text-sm text-gray-700">{txn.paymentMethod}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View Invoice">
                              <FileText className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Download">
                              <Download className="w-4 h-4" />
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
      </div>

      {/* Edit Plan Modal */}
      {showPlanModal && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Edit Plan: {selectedPlan.name}</h3>
              <button onClick={() => setShowPlanModal(false)} className="text-gray-400 hover:text-gray-600">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Plan Name</label>
                <input type="text" defaultValue={selectedPlan.name} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea defaultValue={selectedPlan.description} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
                  <input type="number" defaultValue={selectedPlan.price} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Billing Cycle</label>
                  <select defaultValue={selectedPlan.billingCycle} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setShowPlanModal(false)} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminBillingPlans;