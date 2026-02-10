import React, { useState } from 'react';
import './InventoryScreen.css';
import { 
  Package, CheckCircle, ArrowUpRight, Wrench, AlertTriangle, 
  XCircle, Trash2, Eye, History, MapPin, Calendar, Search, 
  Filter, TrendingUp, BarChart3, PieChart, Bell, Zap,
  ChevronRight, Download, Settings, RefreshCw, Archive,
  Box, AlertOctagon, Clock, Activity, Target
} from 'lucide-react';

const InventoryStatusDashboard = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Status Summary Data
  const statusSummary = [
    { 
      status: 'Available', 
      count: 820, 
      icon: CheckCircle, 
      color: 'from-emerald-500 to-green-600',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      borderColor: 'border-emerald-200',
      badge: 'bg-emerald-100 text-emerald-700',
      trend: '+15 this week'
    },
    { 
      status: 'Issued', 
      count: 240, 
      icon: ArrowUpRight, 
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      badge: 'bg-blue-100 text-blue-700',
      trend: '18 overdue'
    },
    { 
      status: 'Under Repair', 
      count: 36, 
      icon: Wrench, 
      color: 'from-orange-500 to-amber-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      borderColor: 'border-orange-200',
      badge: 'bg-orange-100 text-orange-700',
      trend: '5 pending >30d'
    },
    { 
      status: 'Damaged', 
      count: 18, 
      icon: AlertTriangle, 
      color: 'from-rose-500 to-red-600',
      bgColor: 'bg-rose-50',
      iconColor: 'text-rose-600',
      borderColor: 'border-rose-200',
      badge: 'bg-rose-100 text-rose-700',
      trend: '3 high-value'
    },
    { 
      status: 'Lost', 
      count: 7, 
      icon: XCircle, 
      color: 'from-red-600 to-red-700',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-700',
      borderColor: 'border-red-300',
      badge: 'bg-red-100 text-red-800',
      trend: 'Under investigation'
    },
    { 
      status: 'Disposed', 
      count: 42, 
      icon: Trash2, 
      color: 'from-gray-500 to-slate-600',
      bgColor: 'bg-gray-50',
      iconColor: 'text-gray-600',
      borderColor: 'border-gray-300',
      badge: 'bg-gray-100 text-gray-700',
      trend: 'This year'
    },
  ];

  // Inventory Items Data
  const inventoryItems = [
    { 
      id: 'INV-012', 
      name: 'Chemistry Microscope', 
      category: 'Lab Equipment', 
      location: 'Lab 2', 
      state: 'Under Repair',
      stateColor: 'bg-orange-100 text-orange-700 border-orange-200',
      lastUpdated: '02 Feb',
      value: '₹25,000',
      assignedTo: null,
      repairDays: 12
    },
    { 
      id: 'INV-101', 
      name: 'Student Desk', 
      category: 'Furniture', 
      location: 'Block A', 
      state: 'Available',
      stateColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      lastUpdated: '28 Jan',
      value: '₹3,500',
      assignedTo: null,
      repairDays: 0
    },
    { 
      id: 'INV-078', 
      name: 'Smart Projector', 
      category: 'Electronics', 
      location: 'Office', 
      state: 'Issued',
      stateColor: 'bg-blue-100 text-blue-700 border-blue-200',
      lastUpdated: '01 Feb',
      value: '₹45,000',
      assignedTo: 'Mr. Sharma',
      repairDays: 0
    },
    { 
      id: 'INV-245', 
      name: 'Basketball', 
      category: 'Sports', 
      location: 'Sports Room', 
      state: 'Available',
      stateColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      lastUpdated: '30 Jan',
      value: '₹1,200',
      assignedTo: null,
      repairDays: 0
    },
    { 
      id: 'INV-189', 
      name: 'Desktop Computer', 
      category: 'IT Equipment', 
      location: 'Computer Lab', 
      state: 'Damaged',
      stateColor: 'bg-rose-100 text-rose-700 border-rose-200',
      lastUpdated: '25 Jan',
      value: '₹38,000',
      assignedTo: null,
      repairDays: 0
    },
    { 
      id: 'INV-156', 
      name: 'Whiteboard', 
      category: 'Furniture', 
      location: 'Block B', 
      state: 'Available',
      stateColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      lastUpdated: '29 Jan',
      value: '₹5,500',
      assignedTo: null,
      repairDays: 0
    },
    { 
      id: 'INV-203', 
      name: 'Lab Burner', 
      category: 'Lab Equipment', 
      location: 'Lab 1', 
      state: 'Under Repair',
      stateColor: 'bg-orange-100 text-orange-700 border-orange-200',
      lastUpdated: '20 Jan',
      value: '₹8,500',
      assignedTo: null,
      repairDays: 33
    },
    { 
      id: 'INV-092', 
      name: 'Cricket Bat', 
      category: 'Sports', 
      location: 'Sports Room', 
      state: 'Lost',
      stateColor: 'bg-red-100 text-red-800 border-red-300',
      lastUpdated: '15 Jan',
      value: '₹2,800',
      assignedTo: 'Sports Dept',
      repairDays: 0
    },
  ];

  // Alerts Data
  const alerts = [
    { 
      type: 'warning', 
      message: '5 items under repair for more than 30 days', 
      priority: 'high',
      icon: Clock,
      action: 'Review Now'
    },
    { 
      type: 'error', 
      message: '3 issued items overdue for return', 
      priority: 'high',
      icon: AlertOctagon,
      action: 'Send Reminder'
    },
    { 
      type: 'error', 
      message: '2 high-value items marked damaged', 
      priority: 'medium',
      icon: AlertTriangle,
      action: 'View Details'
    },
    { 
      type: 'info', 
      message: '12 items approaching end of life', 
      priority: 'low',
      icon: Archive,
      action: 'Plan Replacement'
    },
  ];

  // State Distribution Data
  const stateDistribution = [
    { state: 'Available', count: 820, percentage: 70, color: 'bg-emerald-500' },
    { state: 'Issued', count: 240, percentage: 20.5, color: 'bg-blue-500' },
    { state: 'Under Repair', count: 36, percentage: 3.1, color: 'bg-orange-500' },
    { state: 'Damaged', count: 18, percentage: 1.5, color: 'bg-rose-500' },
    { state: 'Lost', count: 7, percentage: 0.6, color: 'bg-red-600' },
    { state: 'Disposed', count: 42, percentage: 3.6, color: 'bg-gray-500' },
  ];

  // Category Damage Data
  const categoryDamageData = [
    { category: 'Lab Equipment', damaged: 8, total: 156, percentage: 5.1 },
    { category: 'Electronics', damaged: 5, total: 89, percentage: 5.6 },
    { category: 'Furniture', damaged: 3, total: 425, percentage: 0.7 },
    { category: 'Sports', damaged: 2, total: 178, percentage: 1.1 },
    { category: 'IT Equipment', damaged: 6, total: 134, percentage: 4.5 },
  ];

  const getAlertStyle = (type: 'error' | 'warning' | 'info') => {
    switch(type) {
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-amber-50 border-amber-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getAlertIconColor = (type: 'error' | 'warning' | 'info') => {
    switch(type) {
      case 'error':
        return 'text-red-600';
      case 'warning':
        return 'text-amber-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* HEADER SECTION */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-white bg-opacity-20 rounded-2xl backdrop-blur-sm shadow-lg">
                  <Package className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">📦 Inventory State Management</h1>
                  <p className="text-indigo-100 mt-1">Monitor asset conditions, track repairs & manage inventory lifecycle</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-5 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl font-medium transition-all flex items-center gap-2 backdrop-blur-sm">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button className="px-5 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl font-medium transition-all flex items-center gap-2 backdrop-blur-sm">
                <Download className="w-4 h-4" />
                Export Report
              </button>
              <button className="px-5 py-3 bg-white hover:bg-gray-50 text-indigo-700 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg">
                <Settings className="w-4 h-4" />
                Manage States
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* TOP SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          {statusSummary.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => setSelectedStatus(item.status.toLowerCase())}
              className={`${item.bgColor} rounded-2xl p-5 border-2 ${item.borderColor} hover:shadow-xl transition-all cursor-pointer group ${selectedStatus === item.status.toLowerCase() ? 'ring-4 ring-indigo-300 scale-105' : ''}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-3 bg-gradient-to-br ${item.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className={`w-4 h-4 ${item.iconColor} opacity-60`} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{item.count}</h3>
              <p className="text-sm font-semibold text-gray-800 mb-2">{item.status}</p>
              <p className="text-xs text-gray-600">{item.trend}</p>
            </div>
          ))}
        </div>

        {/* FILTER BAR */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Status Filter</label>
              <select title="Filter by status" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all">
                <option>All Status</option>
                <option>Available</option>
                <option>Issued</option>
                <option>Under Repair</option>
                <option>Damaged</option>
                <option>Lost</option>
                <option>Disposed</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Category</label>
              <select title="Filter by category" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all">
                <option>All Categories</option>
                <option>Lab Equipment</option>
                <option>Electronics</option>
                <option>Furniture</option>
                <option>Sports</option>
                <option>IT Equipment</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Location</label>
              <select title="Filter by location" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all">
                <option>All Locations</option>
                <option>Block A</option>
                <option>Block B</option>
                <option>Lab 1</option>
                <option>Lab 2</option>
                <option>Sports Room</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Date Range</label>
              <input 
                type="date"
                title="Select date"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Search</label>
              <div className="relative">
                <input 
                  type="text"
                  title="Search items"
                  placeholder="Item Code / Name" 
                  className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN - INVENTORY TABLE */}
          <div className="lg:col-span-2 space-y-6">
            {/* INVENTORY STATE TABLE */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Activity className="w-6 h-6 text-indigo-600" />
                    Inventory Status Table
                  </h2>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                      <Filter className="w-4 h-4" />
                      Advanced Filter
                    </button>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b-2 border-indigo-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Item Code</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Item Name</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Current State</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Last Updated</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {inventoryItems.map((item) => (
                      <tr key={item.id} className="hover:bg-indigo-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="p-2 bg-indigo-100 rounded-lg">
                              <Box className="w-4 h-4 text-indigo-600" />
                            </div>
                            <span className="font-semibold text-gray-900">{item.id}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.value}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-sm text-gray-700">
                            <MapPin className="w-3.5 h-3.5 text-gray-500" />
                            {item.location}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <span className={`px-3 py-1 text-xs font-bold rounded-full border ${item.stateColor}`}>
                              {item.state === 'Available' && '🟢 '}
                              {item.state === 'Issued' && '🔵 '}
                              {item.state === 'Under Repair' && '🟠 '}
                              {item.state === 'Damaged' && '🔴 '}
                              {item.state === 'Lost' && '🔴 '}
                              {item.state}
                            </span>
                            {item.repairDays > 30 && (
                              <p className="text-xs text-red-600 font-semibold mt-1">{item.repairDays} days!</p>
                            )}
                            {item.assignedTo && (
                              <p className="text-xs text-gray-500 mt-1">To: {item.assignedTo}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            {item.lastUpdated}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1">
                            <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors group" title="View Details">
                              <Eye className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                            </button>
                            <button className="p-2 hover:bg-purple-100 rounded-lg transition-colors group" title="History">
                              <History className="w-4 h-4 text-gray-600 group-hover:text-purple-600" />
                            </button>
                            {item.state === 'Available' && (
                              <button className="px-2 py-1 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg text-xs font-semibold transition-colors">
                                Repair
                              </button>
                            )}
                            {item.state === 'Under Repair' && (
                              <button className="px-2 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg text-xs font-semibold transition-colors">
                                Fixed
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* CATEGORY DAMAGE CHART */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-rose-600" />
                Category-wise Damage Analysis
              </h3>
              <div className="space-y-4">
                {categoryDamageData.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">{item.category}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">{item.damaged} / {item.total}</span>
                        <span className="text-xs font-bold text-rose-600">{item.percentage}%</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div className="flex h-full">
                          <div 
                            className="bg-rose-500 transition-all duration-500 inventory-progress-segment"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                          <div 
                            className="bg-emerald-500 transition-all duration-500 inventory-progress-segment"
                            style={{ width: `${100 - item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - ALERTS & CHARTS */}
          <div className="space-y-6">
            {/* ALERTS & WARNINGS PANEL */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-rose-600" />
                  Alerts & Warnings
                </h3>
                <span className="px-3 py-1 bg-rose-100 text-rose-700 text-xs font-bold rounded-full">
                  {alerts.filter(a => a.priority === 'high').length} Critical
                </span>
              </div>
              <div className="space-y-3">
                {alerts.map((alert, idx) => (
                  <div 
                    key={idx}
                    className={`border-2 rounded-xl p-4 ${getAlertStyle(alert.type as 'warning' | 'error' | 'info')}`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <alert.icon className={`w-5 h-5 ${getAlertIconColor(alert.type as 'warning' | 'error' | 'info')}`} />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900 mb-1">{alert.message}</p>
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${
                          alert.priority === 'high' ? 'bg-red-200 text-red-800' :
                          alert.priority === 'medium' ? 'bg-amber-200 text-amber-800' :
                          'bg-blue-200 text-blue-800'
                        }`}>
                          {alert.priority.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <button className="w-full py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 transition-colors">
                      {alert.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* STATE DISTRIBUTION PIE CHART */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-indigo-600" />
                State Distribution
              </h3>
              <div className="space-y-3">
                {stateDistribution.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 ${item.color} rounded-full`}></div>
                        <span className="text-sm font-semibold text-gray-700">{item.state}</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{item.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`${item.color} h-2.5 rounded-full transition-all duration-500`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 text-right">{item.percentage.toFixed(1)}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl text-sm font-semibold transition-all backdrop-blur-sm flex items-center justify-between px-4">
                  <span className="flex items-center gap-2">
                    <Wrench className="w-4 h-4" />
                    Mark as Under Repair
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button className="w-full py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl text-sm font-semibold transition-all backdrop-blur-sm flex items-center justify-between px-4">
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Mark as Damaged
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button className="w-full py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl text-sm font-semibold transition-all backdrop-blur-sm flex items-center justify-between px-4">
                  <span className="flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Send to Disposal
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button className="w-full py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl text-sm font-semibold transition-all backdrop-blur-sm flex items-center justify-between px-4">
                  <span className="flex items-center gap-2">
                    <History className="w-4 h-4" />
                    View Item History
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button className="w-full py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl text-sm font-semibold transition-all backdrop-blur-sm flex items-center justify-between px-4">
                  <span className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Track Issued Items
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryStatusDashboard;