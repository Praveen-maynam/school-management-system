import React, { useState } from 'react';
import { 
  Truck, Wrench, CheckCircle, AlertTriangle, Calendar, 
  Search, RotateCcw, Plus, Edit2, Trash2, Eye, X, 
  Upload, DollarSign, Clock, User, FileText, TrendingUp,
  AlertCircle, ChevronRight
} from 'lucide-react';

// Types
interface MaintenanceRecord {
  id: string;
  vehicleNumber: string;
  serviceDate: string;
  maintenanceType: string;
  issueType: 'engine' | 'brake' | 'oil' | 'tyre' | 'electrical' | 'other';
  description: string;
  mechanic: string;
  estimatedCost: number;
  actualCost?: number;
  nextServiceDue: string;
  status: 'pending' | 'in-progress' | 'completed';
  isCritical?: boolean;
  invoice?: File;
  remarks?: string;
  createdDate: string;
  hasRepeatedIssue?: boolean;
}

interface Vehicle {
  vehicleNumber: string;
  maintenanceHistory: MaintenanceRecord[];
  totalMaintenanceCost: number;
  lastServiceDate: string;
}

// Mock data
const mockMaintenanceRecords: MaintenanceRecord[] = [
  {
    id: '1',
    vehicleNumber: 'KA01AB1234',
    serviceDate: '2026-01-20',
    maintenanceType: 'Oil Change',
    issueType: 'oil',
    description: 'Regular engine oil change and filter replacement',
    mechanic: 'ABC Auto Service',
    estimatedCost: 2500,
    actualCost: 2400,
    nextServiceDue: '2026-04-20',
    status: 'completed',
    createdDate: '2026-01-15',
    remarks: 'Service completed on time'
  },
  {
    id: '2',
    vehicleNumber: 'KA01CD5678',
    serviceDate: '2026-01-28',
    maintenanceType: 'Brake Inspection',
    issueType: 'brake',
    description: 'Complete brake system check and pad replacement needed',
    mechanic: 'City Motors',
    estimatedCost: 5000,
    nextServiceDue: '2026-07-28',
    status: 'pending',
    isCritical: true,
    createdDate: '2026-01-18',
    remarks: 'Urgent - safety issue'
  },
  {
    id: '3',
    vehicleNumber: 'KA01EF9012',
    serviceDate: '2026-01-25',
    maintenanceType: 'Tyre Replacement',
    issueType: 'tyre',
    description: 'Front tyres showing significant wear, replacement required',
    mechanic: 'Wheel Masters',
    estimatedCost: 8000,
    actualCost: 7500,
    nextServiceDue: '2026-10-25',
    status: 'completed',
    createdDate: '2026-01-20'
  },
  {
    id: '4',
    vehicleNumber: 'KA01GH3456',
    serviceDate: '2026-01-22',
    maintenanceType: 'Engine Repair',
    issueType: 'engine',
    description: 'Engine making unusual noise, requires diagnostic and repair',
    mechanic: 'Premium Auto Care',
    estimatedCost: 15000,
    actualCost: 13500,
    nextServiceDue: '2026-03-22',
    status: 'in-progress',
    createdDate: '2026-01-18',
    hasRepeatedIssue: true
  },
  {
    id: '5',
    vehicleNumber: 'KA01IJ7890',
    serviceDate: '2026-01-15',
    maintenanceType: 'Electrical System Check',
    issueType: 'electrical',
    description: 'Dashboard lights flickering, battery check required',
    mechanic: 'Auto Electric Pro',
    estimatedCost: 3000,
    actualCost: 2800,
    nextServiceDue: '2026-06-15',
    status: 'completed',
    createdDate: '2026-01-10'
  },
  {
    id: '6',
    vehicleNumber: 'KA01CD5678',
    serviceDate: '2026-01-30',
    maintenanceType: 'AC Service',
    issueType: 'other',
    description: 'Air conditioning not cooling properly, gas refill needed',
    mechanic: 'Cool Care Services',
    estimatedCost: 4000,
    nextServiceDue: '2026-07-30',
    status: 'pending',
    createdDate: '2026-01-28'
  },
  {
    id: '7',
    vehicleNumber: 'KA01GH3456',
    serviceDate: '2026-01-12',
    maintenanceType: 'Engine Overhaul',
    issueType: 'engine',
    description: 'Previous engine issue - complete overhaul',
    mechanic: 'Premium Auto Care',
    estimatedCost: 25000,
    actualCost: 24000,
    nextServiceDue: '2026-04-12',
    status: 'completed',
    createdDate: '2026-01-05',
    hasRepeatedIssue: true
  }
];

const mockVehicles = ['KA01AB1234', 'KA01CD5678', 'KA01EF9012', 'KA01GH3456', 'KA01IJ7890', 'KA01KL2345'];

const VehicleMaintenanceScreen: React.FC = () => {
  const [records, setRecords] = useState<MaintenanceRecord[]>(mockMaintenanceRecords);
  const [filteredRecords, setFilteredRecords] = useState<MaintenanceRecord[]>(mockMaintenanceRecords);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [issueTypeFilter, setIssueTypeFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showHistoryDrawer, setShowHistoryDrawer] = useState(false);
  const [editingRecord, setEditingRecord] = useState<MaintenanceRecord | null>(null);
  const [deletingRecord, setDeletingRecord] = useState<MaintenanceRecord | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string>('');

  // Form state
  const [formData, setFormData] = useState<MaintenanceRecord>({
    id: '',
    vehicleNumber: '',
    serviceDate: '',
    maintenanceType: '',
    issueType: 'engine',
    description: '',
    mechanic: '',
    estimatedCost: 0,
    actualCost: 0,
    nextServiceDue: '',
    status: 'pending',
    createdDate: new Date().toISOString().split('T')[0],
    isCritical: false,
    remarks: ''
  });

  // Calculate statistics
  const stats = {
    totalVehicles: new Set(records.map(r => r.vehicleNumber)).size,
    maintenanceDue: records.filter(r => 
      r.status === 'pending' || 
      (new Date(r.nextServiceDue) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
    ).length,
    maintenanceCompleted: records.filter(r => r.status === 'completed').length,
    criticalIssues: records.filter(r => r.isCritical && r.status !== 'completed').length
  };

  // Filter logic
  const handleSearch = () => {
    let filtered = records;

    if (searchTerm) {
      filtered = filtered.filter(r => 
        r.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(r => r.status === statusFilter);
    }

    if (issueTypeFilter) {
      filtered = filtered.filter(r => r.issueType === issueTypeFilter);
    }

    if (dateFrom) {
      filtered = filtered.filter(r => new Date(r.serviceDate) >= new Date(dateFrom));
    }

    if (dateTo) {
      filtered = filtered.filter(r => new Date(r.serviceDate) <= new Date(dateTo));
    }

    setFilteredRecords(filtered);
  };

  // Reset filters
  const handleReset = () => {
    setSearchTerm('');
    setStatusFilter('');
    setIssueTypeFilter('');
    setDateFrom('');
    setDateTo('');
    setFilteredRecords(records);
  };

  // Handle add maintenance
  const handleAddMaintenance = () => {
    setEditingRecord(null);
    setFormData({
      id: '',
      vehicleNumber: '',
      serviceDate: '',
      maintenanceType: '',
      issueType: 'engine',
      description: '',
      mechanic: '',
      estimatedCost: 0,
      actualCost: 0,
      nextServiceDue: '',
      status: 'pending',
      createdDate: new Date().toISOString().split('T')[0],
      isCritical: false,
      remarks: ''
    });
    setShowAddModal(true);
  };

  // Handle edit
  const handleEdit = (record: MaintenanceRecord) => {
    setEditingRecord(record);
    setFormData({ ...record });
    setShowAddModal(true);
  };

  // Handle delete
  const handleDelete = (record: MaintenanceRecord) => {
    setDeletingRecord(record);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (deletingRecord) {
      setRecords(records.filter(r => r.id !== deletingRecord.id));
      setFilteredRecords(filteredRecords.filter(r => r.id !== deletingRecord.id));
      setShowDeleteModal(false);
      setDeletingRecord(null);
    }
  };

  // View history
  const handleViewHistory = (vehicleNumber: string) => {
    setSelectedVehicle(vehicleNumber);
    setShowHistoryDrawer(true);
  };

  // Save maintenance record
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.vehicleNumber || !formData.serviceDate || !formData.maintenanceType) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingRecord) {
      // Update existing record
      setRecords(records.map(r => r.id === editingRecord.id ? formData : r));
      setFilteredRecords(filteredRecords.map(r => r.id === editingRecord.id ? formData : r));
    } else {
      // Add new record
      const newRecord = {
        ...formData,
        id: Date.now().toString()
      };
      setRecords([newRecord, ...records]);
      setFilteredRecords([newRecord, ...filteredRecords]);
    }

    setShowAddModal(false);
    setEditingRecord(null);
  };

  // Get status style
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  // Get issue type style
  const getIssueTypeStyle = (type: string) => {
    const styles: Record<string, string> = {
      engine: 'bg-red-100 text-red-700 border-red-200',
      brake: 'bg-orange-100 text-orange-700 border-orange-200',
      oil: 'bg-blue-100 text-blue-700 border-blue-200',
      tyre: 'bg-purple-100 text-purple-700 border-purple-200',
      electrical: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      other: 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return styles[type] || styles.other;
  };

  // Get vehicle maintenance history
  const getVehicleHistory = (vehicleNumber: string) => {
    return records.filter(r => r.vehicleNumber === vehicleNumber)
      .sort((a, b) => new Date(b.serviceDate).getTime() - new Date(a.serviceDate).getTime());
  };

  // Calculate total cost for vehicle
  const getTotalCost = (vehicleNumber: string) => {
    return records
      .filter(r => r.vehicleNumber === vehicleNumber && r.actualCost)
      .reduce((sum, r) => sum + (r.actualCost || 0), 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Vehicle Maintenance Logs</h1>
        <p className="text-gray-600">Track and manage vehicle maintenance activities for safety and compliance</p>
      </div>

      {/* Light Pastel Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Vehicles */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm p-5 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700 font-medium mb-1">Total Vehicles</p>
              <p className="text-3xl font-bold text-blue-900">{stats.totalVehicles}</p>
            </div>
            <div className="bg-white bg-opacity-60 p-3 rounded-lg">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Maintenance Due */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-sm p-5 border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-700 font-medium mb-1">Maintenance Due</p>
              <p className="text-3xl font-bold text-orange-900">{stats.maintenanceDue}</p>
            </div>
            <div className="bg-white bg-opacity-60 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Maintenance Completed */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm p-5 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 font-medium mb-1">Completed</p>
              <p className="text-3xl font-bold text-green-900">{stats.maintenanceCompleted}</p>
            </div>
            <div className="bg-white bg-opacity-60 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Critical Issues */}
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-sm p-5 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-700 font-medium mb-1">Critical Issues</p>
              <p className="text-3xl font-bold text-red-900">{stats.criticalIssues}</p>
            </div>
            <div className="bg-white bg-opacity-60 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      {stats.criticalIssues > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-900">Critical Maintenance Issues Detected</p>
              <p className="text-red-700 text-sm mt-1">
                {stats.criticalIssues} vehicle(s) have critical maintenance issues pending. 
                These vehicles should not be assigned to routes until issues are resolved.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filter & Search Panel */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Search className="w-5 h-5 text-gray-600" />
          Filters
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Search */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Vehicle
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Vehicle number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Issue Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Issue Type
            </label>
            <select
              value={issueTypeFilter}
              onChange={(e) => setIssueTypeFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="engine">Engine</option>
              <option value="brake">Brake</option>
              <option value="oil">Oil</option>
              <option value="tyre">Tyre</option>
              <option value="electrical">Electrical</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Date From */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Date
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Date To */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Date
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-end gap-2">
            <button
              onClick={handleSearch}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              title="Reset Filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add Maintenance Button */}
      <div className="mb-6">
        <button
          onClick={handleAddMaintenance}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Maintenance Record
        </button>
      </div>

      {/* Maintenance Logs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Vehicle Number
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Service Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Maintenance Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Mechanic/Vendor
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Cost
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Next Service Due
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRecords.map((record) => {
                const isOverdue = new Date(record.nextServiceDue) < new Date() && record.status !== 'completed';
                const isDueSoon = new Date(record.nextServiceDue) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && !isOverdue;

                return (
                  <tr 
                    key={record.id} 
                    className={`transition-colors ${
                      record.isCritical && record.status !== 'completed'
                        ? 'bg-red-50 hover:bg-red-100'
                        : record.hasRepeatedIssue
                        ? 'bg-yellow-50 hover:bg-yellow-100'
                        : 'hover:bg-blue-50'
                    }`}
                  >
                    {/* Vehicle Number */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-blue-600" />
                        <div>
                          <span className="font-semibold text-gray-900">{record.vehicleNumber}</span>
                          {record.hasRepeatedIssue && (
                            <div className="flex items-center gap-1 mt-1">
                              <TrendingUp className="w-3 h-3 text-yellow-600" />
                              <span className="text-xs text-yellow-700">Repeated Issue</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Service Date */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">
                          {new Date(record.serviceDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                      </div>
                    </td>

                    {/* Maintenance Type */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-gray-900">{record.maintenanceType}</span>
                        <span className={`inline-flex items-center w-fit px-2 py-0.5 rounded-full text-xs font-medium border ${getIssueTypeStyle(record.issueType)}`}>
                          {record.issueType.charAt(0).toUpperCase() + record.issueType.slice(1)}
                        </span>
                      </div>
                    </td>

                    {/* Description */}
                    <td className="px-6 py-4 max-w-xs">
                      <p className="text-sm text-gray-700 line-clamp-2">{record.description}</p>
                      {record.isCritical && (
                        <div className="flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3 text-red-600" />
                          <span className="text-xs text-red-700 font-medium">Critical</span>
                        </div>
                      )}
                    </td>

                    {/* Mechanic */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{record.mechanic}</span>
                      </div>
                    </td>

                    {/* Cost */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        {record.actualCost ? (
                          <>
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4 text-green-600" />
                              <span className="font-semibold text-gray-900">₹{record.actualCost.toLocaleString()}</span>
                            </div>
                            <span className="text-xs text-gray-500">Est: ₹{record.estimatedCost.toLocaleString()}</span>
                          </>
                        ) : (
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-700">₹{record.estimatedCost.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Next Service Due */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center gap-1 ${isOverdue ? 'text-red-700' : isDueSoon ? 'text-orange-700' : 'text-gray-700'}`}>
                        <Clock className={`w-4 h-4 ${isOverdue ? 'text-red-600' : isDueSoon ? 'text-orange-600' : 'text-gray-400'}`} />
                        <span className="text-sm">
                          {new Date(record.nextServiceDue).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                        {isOverdue && <AlertTriangle className="w-3 h-3 text-red-600" />}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(record.status)}`}>
                        {record.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {record.status === 'in-progress' && <Wrench className="w-3 h-3 mr-1" />}
                        {getStatusText(record.status)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(record)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                          title="Update"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(record)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleViewHistory(record.vehicleNumber)}
                          className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                          title="View History"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredRecords.length === 0 && (
          <div className="text-center py-12">
            <Wrench className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No maintenance records found</p>
          </div>
        )}
      </div>

      {/* Add/Update Maintenance Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-10 rounded-t-xl">
              <div className="flex items-center gap-2">
                <Wrench className="w-6 h-6" />
                <h3 className="text-xl font-bold">
                  {editingRecord ? 'Update Maintenance Record' : 'Add Maintenance Record'}
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-blue-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="p-6 space-y-6">
              {/* Vehicle & Date Section */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  Vehicle & Service Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Vehicle Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vehicle Number <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.vehicleNumber}
                      onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Vehicle</option>
                      {mockVehicles.map(vehicle => (
                        <option key={vehicle} value={vehicle}>{vehicle}</option>
                      ))}
                    </select>
                  </div>

                  {/* Service Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.serviceDate}
                      onChange={(e) => setFormData({ ...formData, serviceDate: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Next Service Due */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Next Service Due Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.nextServiceDue}
                      onChange={(e) => setFormData({ ...formData, nextServiceDue: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Maintenance Details */}
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-purple-600" />
                  Maintenance Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Maintenance Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maintenance Type <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.maintenanceType}
                      onChange={(e) => setFormData({ ...formData, maintenanceType: e.target.value })}
                      required
                      placeholder="e.g., Oil Change, Brake Repair"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Issue Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Issue Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.issueType}
                      onChange={(e) => setFormData({ ...formData, issueType: e.target.value as any })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="engine">Engine</option>
                      <option value="brake">Brake</option>
                      <option value="oil">Oil</option>
                      <option value="tyre">Tyre</option>
                      <option value="electrical">Electrical</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Mechanic */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mechanic / Service Center <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.mechanic}
                      onChange={(e) => setFormData({ ...formData, mechanic: e.target.value })}
                      required
                      placeholder="e.g., ABC Auto Service"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Issue Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows={3}
                      placeholder="Describe the maintenance issue in detail..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Cost & Flags */}
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Cost & Priority
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Estimated Cost */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Cost (₹) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.estimatedCost}
                      onChange={(e) => setFormData({ ...formData, estimatedCost: Number(e.target.value) })}
                      required
                      min="0"
                      placeholder="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Actual Cost */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Actual Cost (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.actualCost || ''}
                      onChange={(e) => setFormData({ ...formData, actualCost: e.target.value ? Number(e.target.value) : undefined })}
                      min="0"
                      placeholder="Leave empty if not completed"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Critical Flag */}
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isCritical}
                        onChange={(e) => setFormData({ ...formData, isCritical: e.target.checked })}
                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Mark as Critical Issue (Vehicle should not operate)
                      </span>
                    </label>
                  </div>

                  {/* Remarks */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Remarks / Notes
                    </label>
                    <textarea
                      value={formData.remarks}
                      onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                      rows={2}
                      placeholder="Additional notes or comments..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Upload Invoice */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Invoice / Bill (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setFormData({ ...formData, invoice: e.target.files?.[0] })}
                        className="hidden"
                        id="invoice-upload"
                      />
                      <label
                        htmlFor="invoice-upload"
                        className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer"
                      >
                        Click to upload invoice
                      </label>
                      <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 5MB</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
                >
                  {editingRecord ? 'Update Record' : 'Save Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deletingRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="bg-red-600 text-white px-6 py-4 flex items-center gap-3 rounded-t-xl">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-xl font-bold">Delete Maintenance Record</h3>
            </div>

            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete this maintenance record for <strong>{deletingRecord.vehicleNumber}</strong>?
              </p>
              <p className="text-sm text-gray-600">
                Maintenance Type: <strong>{deletingRecord.maintenanceType}</strong>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                This action cannot be undone.
              </p>
            </div>

            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all shadow-md hover:shadow-lg"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Maintenance History Drawer */}
      {showHistoryDrawer && selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-end z-50">
          <div className="bg-white w-full md:w-1/2 lg:w-1/3 h-full md:h-auto md:max-h-[90vh] rounded-t-2xl md:rounded-l-2xl md:rounded-r-none shadow-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6" />
                <div>
                  <h3 className="text-xl font-bold">Maintenance History</h3>
                  <p className="text-blue-100 text-sm">{selectedVehicle}</p>
                </div>
              </div>
              <button
                onClick={() => setShowHistoryDrawer(false)}
                className="p-2 hover:bg-blue-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Summary */}
            <div className="bg-blue-50 px-6 py-4 border-b border-blue-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Total Services:</span>
                  <span className="ml-2 font-semibold text-gray-900">
                    {getVehicleHistory(selectedVehicle).length}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Total Cost:</span>
                  <span className="ml-2 font-semibold text-gray-900">
                    ₹{getTotalCost(selectedVehicle).toLocaleString()}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-600">Last Service:</span>
                  <span className="ml-2 font-semibold text-gray-900">
                    {getVehicleHistory(selectedVehicle)[0]?.serviceDate 
                      ? new Date(getVehicleHistory(selectedVehicle)[0].serviceDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })
                      : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* History List */}
            <div className="flex-1 overflow-y-auto p-6">
              {getVehicleHistory(selectedVehicle).length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No maintenance history available</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {getVehicleHistory(selectedVehicle).map((record) => (
                    <div 
                      key={record.id} 
                      className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-4 border border-gray-200"
                    >
                      {/* Date and Status */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold text-gray-900">
                            {new Date(record.serviceDate).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </span>
                        </div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(record.status)}`}>
                          {getStatusText(record.status)}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="font-semibold text-gray-900">{record.maintenanceType}</p>
                          <span className={`inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getIssueTypeStyle(record.issueType)}`}>
                            {record.issueType.charAt(0).toUpperCase() + record.issueType.slice(1)}
                          </span>
                        </div>
                        <p className="text-gray-600">{record.description}</p>
                        <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">{record.mechanic}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span className="font-medium text-gray-900">
                            ₹{(record.actualCost || record.estimatedCost).toLocaleString()}
                          </span>
                        </div>
                        {record.remarks && (
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            <p className="text-xs text-gray-600 mb-1">Remarks:</p>
                            <p className="text-gray-700">{record.remarks}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleMaintenanceScreen;