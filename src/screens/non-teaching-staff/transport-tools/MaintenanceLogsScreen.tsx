// import React, { useState } from 'react';
// import { 
//   Truck, Wrench, CheckCircle, AlertTriangle, Calendar, 
//   Search, RotateCcw, Plus, Edit2, Trash2, Eye, X, 
//   Upload, DollarSign, Clock, User, FileText, TrendingUp,
//   AlertCircle, ChevronRight
// } from 'lucide-react';

// // Types
// interface MaintenanceRecord {
//   id: string;
//   vehicleNumber: string;
//   serviceDate: string;
//   maintenanceType: string;
//   issueType: 'engine' | 'brake' | 'oil' | 'tyre' | 'electrical' | 'other';
//   description: string;
//   mechanic: string;
//   estimatedCost: number;
//   actualCost?: number;
//   nextServiceDue: string;
//   status: 'pending' | 'in-progress' | 'completed';
//   isCritical?: boolean;
//   invoice?: File;
//   remarks?: string;
//   createdDate: string;
//   hasRepeatedIssue?: boolean;
// }

// interface Vehicle {
//   vehicleNumber: string;
//   maintenanceHistory: MaintenanceRecord[];
//   totalMaintenanceCost: number;
//   lastServiceDate: string;
// }

// // Mock data
// const mockMaintenanceRecords: MaintenanceRecord[] = [
//   {
//     id: '1',
//     vehicleNumber: 'KA01AB1234',
//     serviceDate: '2026-01-20',
//     maintenanceType: 'Oil Change',
//     issueType: 'oil',
//     description: 'Regular engine oil change and filter replacement',
//     mechanic: 'ABC Auto Service',
//     estimatedCost: 2500,
//     actualCost: 2400,
//     nextServiceDue: '2026-04-20',
//     status: 'completed',
//     createdDate: '2026-01-15',
//     remarks: 'Service completed on time'
//   },
//   {
//     id: '2',
//     vehicleNumber: 'KA01CD5678',
//     serviceDate: '2026-01-28',
//     maintenanceType: 'Brake Inspection',
//     issueType: 'brake',
//     description: 'Complete brake system check and pad replacement needed',
//     mechanic: 'City Motors',
//     estimatedCost: 5000,
//     nextServiceDue: '2026-07-28',
//     status: 'pending',
//     isCritical: true,
//     createdDate: '2026-01-18',
//     remarks: 'Urgent - safety issue'
//   },
//   {
//     id: '3',
//     vehicleNumber: 'KA01EF9012',
//     serviceDate: '2026-01-25',
//     maintenanceType: 'Tyre Replacement',
//     issueType: 'tyre',
//     description: 'Front tyres showing significant wear, replacement required',
//     mechanic: 'Wheel Masters',
//     estimatedCost: 8000,
//     actualCost: 7500,
//     nextServiceDue: '2026-10-25',
//     status: 'completed',
//     createdDate: '2026-01-20'
//   },
//   {
//     id: '4',
//     vehicleNumber: 'KA01GH3456',
//     serviceDate: '2026-01-22',
//     maintenanceType: 'Engine Repair',
//     issueType: 'engine',
//     description: 'Engine making unusual noise, requires diagnostic and repair',
//     mechanic: 'Premium Auto Care',
//     estimatedCost: 15000,
//     actualCost: 13500,
//     nextServiceDue: '2026-03-22',
//     status: 'in-progress',
//     createdDate: '2026-01-18',
//     hasRepeatedIssue: true
//   },
//   {
//     id: '5',
//     vehicleNumber: 'KA01IJ7890',
//     serviceDate: '2026-01-15',
//     maintenanceType: 'Electrical System Check',
//     issueType: 'electrical',
//     description: 'Dashboard lights flickering, battery check required',
//     mechanic: 'Auto Electric Pro',
//     estimatedCost: 3000,
//     actualCost: 2800,
//     nextServiceDue: '2026-06-15',
//     status: 'completed',
//     createdDate: '2026-01-10'
//   },
//   {
//     id: '6',
//     vehicleNumber: 'KA01CD5678',
//     serviceDate: '2026-01-30',
//     maintenanceType: 'AC Service',
//     issueType: 'other',
//     description: 'Air conditioning not cooling properly, gas refill needed',
//     mechanic: 'Cool Care Services',
//     estimatedCost: 4000,
//     nextServiceDue: '2026-07-30',
//     status: 'pending',
//     createdDate: '2026-01-28'
//   },
//   {
//     id: '7',
//     vehicleNumber: 'KA01GH3456',
//     serviceDate: '2026-01-12',
//     maintenanceType: 'Engine Overhaul',
//     issueType: 'engine',
//     description: 'Previous engine issue - complete overhaul',
//     mechanic: 'Premium Auto Care',
//     estimatedCost: 25000,
//     actualCost: 24000,
//     nextServiceDue: '2026-04-12',
//     status: 'completed',
//     createdDate: '2026-01-05',
//     hasRepeatedIssue: true
//   }
// ];

// const mockVehicles = ['KA01AB1234', 'KA01CD5678', 'KA01EF9012', 'KA01GH3456', 'KA01IJ7890', 'KA01KL2345'];

// const VehicleMaintenanceScreen: React.FC = () => {
//   const [records, setRecords] = useState<MaintenanceRecord[]>(mockMaintenanceRecords);
//   const [filteredRecords, setFilteredRecords] = useState<MaintenanceRecord[]>(mockMaintenanceRecords);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [issueTypeFilter, setIssueTypeFilter] = useState('');
//   const [dateFrom, setDateFrom] = useState('');
//   const [dateTo, setDateTo] = useState('');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showHistoryDrawer, setShowHistoryDrawer] = useState(false);
//   const [editingRecord, setEditingRecord] = useState<MaintenanceRecord | null>(null);
//   const [deletingRecord, setDeletingRecord] = useState<MaintenanceRecord | null>(null);
//   const [selectedVehicle, setSelectedVehicle] = useState<string>('');

//   // Form state
//   const [formData, setFormData] = useState<MaintenanceRecord>({
//     id: '',
//     vehicleNumber: '',
//     serviceDate: '',
//     maintenanceType: '',
//     issueType: 'engine',
//     description: '',
//     mechanic: '',
//     estimatedCost: 0,
//     actualCost: 0,
//     nextServiceDue: '',
//     status: 'pending',
//     createdDate: new Date().toISOString().split('T')[0],
//     isCritical: false,
//     remarks: ''
//   });

//   // Calculate statistics
//   const stats = {
//     totalVehicles: new Set(records.map(r => r.vehicleNumber)).size,
//     maintenanceDue: records.filter(r => 
//       r.status === 'pending' || 
//       (new Date(r.nextServiceDue) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
//     ).length,
//     maintenanceCompleted: records.filter(r => r.status === 'completed').length,
//     criticalIssues: records.filter(r => r.isCritical && r.status !== 'completed').length
//   };

//   // Filter logic
//   const handleSearch = () => {
//     let filtered = records;

//     if (searchTerm) {
//       filtered = filtered.filter(r => 
//         r.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (statusFilter) {
//       filtered = filtered.filter(r => r.status === statusFilter);
//     }

//     if (issueTypeFilter) {
//       filtered = filtered.filter(r => r.issueType === issueTypeFilter);
//     }

//     if (dateFrom) {
//       filtered = filtered.filter(r => new Date(r.serviceDate) >= new Date(dateFrom));
//     }

//     if (dateTo) {
//       filtered = filtered.filter(r => new Date(r.serviceDate) <= new Date(dateTo));
//     }

//     setFilteredRecords(filtered);
//   };

//   // Reset filters
//   const handleReset = () => {
//     setSearchTerm('');
//     setStatusFilter('');
//     setIssueTypeFilter('');
//     setDateFrom('');
//     setDateTo('');
//     setFilteredRecords(records);
//   };

//   // Handle add maintenance
//   const handleAddMaintenance = () => {
//     setEditingRecord(null);
//     setFormData({
//       id: '',
//       vehicleNumber: '',
//       serviceDate: '',
//       maintenanceType: '',
//       issueType: 'engine',
//       description: '',
//       mechanic: '',
//       estimatedCost: 0,
//       actualCost: 0,
//       nextServiceDue: '',
//       status: 'pending',
//       createdDate: new Date().toISOString().split('T')[0],
//       isCritical: false,
//       remarks: ''
//     });
//     setShowAddModal(true);
//   };

//   // Handle edit
//   const handleEdit = (record: MaintenanceRecord) => {
//     setEditingRecord(record);
//     setFormData({ ...record });
//     setShowAddModal(true);
//   };

//   // Handle delete
//   const handleDelete = (record: MaintenanceRecord) => {
//     setDeletingRecord(record);
//     setShowDeleteModal(true);
//   };

//   // Confirm delete
//   const confirmDelete = () => {
//     if (deletingRecord) {
//       setRecords(records.filter(r => r.id !== deletingRecord.id));
//       setFilteredRecords(filteredRecords.filter(r => r.id !== deletingRecord.id));
//       setShowDeleteModal(false);
//       setDeletingRecord(null);
//     }
//   };

//   // View history
//   const handleViewHistory = (vehicleNumber: string) => {
//     setSelectedVehicle(vehicleNumber);
//     setShowHistoryDrawer(true);
//   };

//   // Save maintenance record
//   const handleSave = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.vehicleNumber || !formData.serviceDate || !formData.maintenanceType) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     if (editingRecord) {
//       // Update existing record
//       setRecords(records.map(r => r.id === editingRecord.id ? formData : r));
//       setFilteredRecords(filteredRecords.map(r => r.id === editingRecord.id ? formData : r));
//     } else {
//       // Add new record
//       const newRecord = {
//         ...formData,
//         id: Date.now().toString()
//       };
//       setRecords([newRecord, ...records]);
//       setFilteredRecords([newRecord, ...filteredRecords]);
//     }

//     setShowAddModal(false);
//     setEditingRecord(null);
//   };

//   // Get status style
//   const getStatusStyle = (status: string) => {
//     switch (status) {
//       case 'completed':
//         return 'bg-green-100 text-green-700 border-green-200';
//       case 'in-progress':
//         return 'bg-blue-100 text-blue-700 border-blue-200';
//       case 'pending':
//         return 'bg-orange-100 text-orange-700 border-orange-200';
//       default:
//         return 'bg-gray-100 text-gray-700 border-gray-200';
//     }
//   };

//   const getStatusText = (status: string) => {
//     return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
//   };

//   // Get issue type style
//   const getIssueTypeStyle = (type: string) => {
//     const styles: Record<string, string> = {
//       engine: 'bg-red-100 text-red-700 border-red-200',
//       brake: 'bg-orange-100 text-orange-700 border-orange-200',
//       oil: 'bg-blue-100 text-blue-700 border-blue-200',
//       tyre: 'bg-purple-100 text-purple-700 border-purple-200',
//       electrical: 'bg-yellow-100 text-yellow-700 border-yellow-200',
//       other: 'bg-gray-100 text-gray-700 border-gray-200'
//     };
//     return styles[type] || styles.other;
//   };

//   // Get vehicle maintenance history
//   const getVehicleHistory = (vehicleNumber: string) => {
//     return records.filter(r => r.vehicleNumber === vehicleNumber)
//       .sort((a, b) => new Date(b.serviceDate).getTime() - new Date(a.serviceDate).getTime());
//   };

//   // Calculate total cost for vehicle
//   const getTotalCost = (vehicleNumber: string) => {
//     return records
//       .filter(r => r.vehicleNumber === vehicleNumber && r.actualCost)
//       .reduce((sum, r) => sum + (r.actualCost || 0), 0);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Vehicle Maintenance Logs</h1>
//         <p className="text-gray-600">Track and manage vehicle maintenance activities for safety and compliance</p>
//       </div>

//       {/* Light Pastel Summary Cards */}
//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 w-full">
//         {/* Total Vehicles */}
//         <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm p-5 border border-blue-200 flex-1 w-full min-w-0 min-h-[100px] max-h-[140px] lg:aspect-square">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-blue-700 font-medium mb-1">Total Vehicles</p>
//               <p className="text-3xl font-bold text-blue-900">{stats.totalVehicles}</p>
//             </div>
//             <div className="bg-white bg-opacity-60 p-3 rounded-lg">
//               <Truck className="w-6 h-6 text-blue-600" />
//             </div>
//           </div>
//         </div>

//         {/* Maintenance Due */}
//         <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-sm p-5 border border-orange-200 flex-1 w-full min-w-0 min-h-[100px] max-h-[140px] lg:aspect-square">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-orange-700 font-medium mb-1">Maintenance Due</p>
//               <p className="text-3xl font-bold text-orange-900">{stats.maintenanceDue}</p>
//             </div>
//             <div className="bg-white bg-opacity-60 p-3 rounded-lg">
//               <Clock className="w-6 h-6 text-orange-600" />
//             </div>
//           </div>
//         </div>

//         {/* Maintenance Completed */}
//         <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm p-5 border border-green-200 flex-1 w-full min-w-0 min-h-[100px] max-h-[140px] lg:aspect-square">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-green-700 font-medium mb-1">Completed</p>
//               <p className="text-3xl font-bold text-green-900">{stats.maintenanceCompleted}</p>
//             </div>
//             <div className="bg-white bg-opacity-60 p-3 rounded-lg">
//               <CheckCircle className="w-6 h-6 text-green-600" />
//             </div>
//           </div>
//         </div>

//         {/* Critical Issues */}
//         <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-sm p-5 border border-red-200 flex-1 w-full min-w-0  min-h-[100px] max-h-[140px] lg:aspect-square">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-red-700 font-medium mb-1">Critical Issues</p>
//               <p className="text-3xl font-bold text-red-900">{stats.criticalIssues}</p>
//             </div>
//             <div className="bg-white bg-opacity-60 p-3 rounded-lg">
//               <AlertTriangle className="w-6 h-6 text-red-600" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Critical Alerts */}
//       {stats.criticalIssues > 0 && (
//         <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6">
//           <div className="flex items-start gap-3">
//             <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
//             <div>
//               <p className="font-semibold text-red-900">Critical Maintenance Issues Detected</p>
//               <p className="text-red-700 text-sm mt-1">
//                 {stats.criticalIssues} vehicle(s) have critical maintenance issues pending. 
//                 These vehicles should not be assigned to routes until issues are resolved.
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Filter & Search Panel */}
//       <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
//         <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//           <Search className="w-5 h-5 text-gray-600" />
//           Filters
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
//           {/* Search */}
//           <div className="lg:col-span-1">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Search Vehicle
//             </label>
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Vehicle number..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//           </div>

//           {/* Status Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Status
//             </label>
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               title="Filter by status"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="">All Status</option>
//               <option value="pending">Pending</option>
//               <option value="in-progress">In Progress</option>
//               <option value="completed">Completed</option>
//             </select>
//           </div>

//           {/* Issue Type Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Issue Type
//             </label>
//             <select
//               value={issueTypeFilter}
//               onChange={(e) => setIssueTypeFilter(e.target.value)}
//               title="Filter by issue type"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="">All Types</option>
//               <option value="engine">Engine</option>
//               <option value="brake">Brake</option>
//               <option value="oil">Oil</option>
//               <option value="tyre">Tyre</option>
//               <option value="electrical">Electrical</option>
//               <option value="other">Other</option>
//             </select>
//           </div>

//           {/* Date From */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               From Date
//             </label>
//             <input
//               type="date"
//               value={dateFrom}
//               onChange={(e) => setDateFrom(e.target.value)}
//               title="Select start date"
//               placeholder="From date"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>

//           {/* Date To */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               To Date
//             </label>
//             <input
//               type="date"
//               value={dateTo}
//               onChange={(e) => setDateTo(e.target.value)}
//               title="Select end date"
//               placeholder="To date"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex items-end gap-2">
//             <button
//               onClick={handleSearch}
//               className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
//             >
//               <Search className="w-4 h-4" />
//               Search
//             </button>
//             <button
//               onClick={handleReset}
//               className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//               title="Reset Filters"
//             >
//               <RotateCcw className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Add Maintenance Button */}
//       <div className="mb-6">
//         <button
//           onClick={handleAddMaintenance}
//           className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center gap-2"
//         >
//           <Plus className="w-5 h-5" />
//           Add Maintenance Record
//         </button>
//       </div>

//       {/* Maintenance Logs Table */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         <div className="overflow-x-hidden">
//           <table className="w64-full text-xs md:text-sm">
//             <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0">
//               <tr>
//                 <th className="px-3 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider">
//                   Vehicle Number
//                 </th>
//                 <th className="px-3 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider">
//                   Service Date
//                 </th>
//                 <th className="px-3 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider">
//                   Maintenance Type
//                 </th>
//                 <th className="px-3 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider">
//                   Description
//                 </th>
//                 <th className="px-3 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider">
//                   Mechanic/Vendor
//                 </th>
//                 <th className="px-3 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider">
//                   Cost
//                 </th>
//                 <th className="px-3 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider">
//                   Next Service Due
//                 </th>
//                 <th className="px-3 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200 text-xs md:text-sm">
//               {filteredRecords.map((record) => {
//                 const isOverdue = new Date(record.nextServiceDue) < new Date() && record.status !== 'completed';
//                 const isDueSoon = new Date(record.nextServiceDue) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && !isOverdue;

//                 return (
//                   <tr 
//                     key={record.id} 
//                     className={`transition-colors ${
//                       record.isCritical && record.status !== 'completed'
//                         ? 'bg-red-50 hover:bg-red-100'
//                         : record.hasRepeatedIssue
//                         ? 'bg-yellow-50 hover:bg-yellow-100'
//                         : 'hover:bg-blue-50'
//                     }`}
//                   >
//                     {/* Vehicle Number */}
//                     <td className="px-3 py-2 whitespace-nowrap">
//                       <div className="flex items-center gap-1">
//                         <Truck className="w-3 h-3 text-blue-600" />
//                         <div>
//                           <span className="font-semibold text-gray-900 text-xs md:text-sm">{record.vehicleNumber}</span>
//                           {record.hasRepeatedIssue && (
//                             <div className="flex items-center gap-1 mt-0.5">
//                               <TrendingUp className="w-2.5 h-2.5 text-yellow-600" />
//                               <span className="text-[10px] text-yellow-700">Repeated Issue</span>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </td>

//                     {/* Service Date */}
//                     <td className="px-3 py-2 whitespace-nowrap">
//                       <div className="flex items-center gap-1">
//                         <Calendar className="w-3 h-3 text-gray-400" />
//                         <span className="text-xs text-gray-700">
//                           {new Date(record.serviceDate).toLocaleDateString('en-US', { 
//                             month: 'short', 
//                             day: 'numeric', 
//                             year: 'numeric' 
//                           })}
//                         </span>
//                       </div>
//                     </td>

//                     {/* Maintenance Type */}
//                     <td className="px-3 py-2">
//                       <div className="flex flex-col gap-0.5">
//                         <span className="font-medium text-gray-900 text-xs md:text-sm">{record.maintenanceType}</span>
//                         <span className={`inline-flex items-center w-fit px-1.5 py-0.5 rounded-full text-[10px] font-medium border ${getIssueTypeStyle(record.issueType)}`}>
//                           {record.issueType.charAt(0).toUpperCase() + record.issueType.slice(1)}
//                         </span>
//                       </div>
//                     </td>

//                     {/* Description */}
//                     <td className="px-3 py-2 max-w-xs">
//                       <p className="text-xs text-gray-700 line-clamp-2">{record.description}</p>
//                       {record.isCritical && (
//                         <div className="flex items-center gap-1 mt-0.5">
//                           <AlertCircle className="w-2.5 h-2.5 text-red-600" />
//                           <span className="text-[10px] text-red-700 font-medium">Critical</span>
//                         </div>
//                       )}
//                     </td>

//                     {/* Mechanic */}
//                     <td className="px-3 py-2">
//                       <div className="flex items-center gap-1">
//                         <User className="w-3 h-3 text-gray-400" />
//                         <span className="text-xs text-gray-700">{record.mechanic}</span>
//                       </div>
//                     </td>

//                     {/* Cost */}
//                     <td className="px-3 py-2 whitespace-nowrap">
//                       <div className="flex flex-col gap-0.5">
//                         {record.actualCost ? (
//                           <>
//                             <div className="flex items-center gap-1">
//                               <DollarSign className="w-3 h-3 text-green-600" />
//                               <span className="font-semibold text-gray-900 text-xs md:text-sm">₹{record.actualCost.toLocaleString()}</span>
//                             </div>
//                             <span className="text-[10px] text-gray-500">Est: ₹{record.estimatedCost.toLocaleString()}</span>
//                           </>
//                         ) : (
//                           <div className="flex items-center gap-1">
//                             <DollarSign className="w-3 h-3 text-gray-400" />
//                             <span className="text-xs text-gray-700">₹{record.estimatedCost.toLocaleString()}</span>
//                           </div>
//                         )}
//                       </div>
//                     </td>

//                     {/* Next Service Due */}
//                     <td className="px-3 py-2 whitespace-nowrap">
//                       <div className={`flex items-center gap-1 ${isOverdue ? 'text-red-700' : isDueSoon ? 'text-orange-700' : 'text-gray-700'}`}> 
//                         <Clock className={`w-3 h-3 ${isOverdue ? 'text-red-600' : isDueSoon ? 'text-orange-600' : 'text-gray-400'}`} />
//                         <span className="text-xs">
//                           {new Date(record.nextServiceDue).toLocaleDateString('en-US', { 
//                             month: 'short', 
//                             day: 'numeric' 
//                           })}
//                         </span>
//                         {isOverdue && <AlertTriangle className="w-2.5 h-2.5 text-red-600" />}
//                       </div>
//                     </td>

//                     {/* Status */}
//                     <td className="px-3 py-2 whitespace-nowrap">
//                       <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${getStatusStyle(record.status)}`}>
//                         {record.status === 'completed' && <CheckCircle className="w-2.5 h-2.5 mr-1" />}
//                         {record.status === 'in-progress' && <Wrench className="w-2.5 h-2.5 mr-1" />}
//                         {getStatusText(record.status)}
//                       </span>
//                     </td>

//                     {/* Actions */}
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleEdit(record)}
//                           className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
//                           title="Update"
//                         >
//                           <Edit2 className="w-4 h-4" />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(record)}
//                           className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
//                           title="Delete"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                         <button
//                           onClick={() => handleViewHistory(record.vehicleNumber)}
//                           className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
//                           title="View History"
//                         >
//                           <Eye className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>

//         {filteredRecords.length === 0 && (
//           <div className="text-center py-12">
//             <Wrench className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//             <p className="text-gray-500">No maintenance records found</p>
//           </div>
//         )}
//       </div>

//       {/* Add/Update Maintenance Modal */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
//           <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
//             {/* Modal Header */}
//             <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-10 rounded-t-xl">
//               <div className="flex items-center gap-2">
//                 <Wrench className="w-6 h-6" />
//                 <h3 className="text-xl font-bold">
//                   {editingRecord ? 'Update Maintenance Record' : 'Add Maintenance Record'}
//                 </h3>
//               </div>
//               <button
//                 onClick={() => setShowAddModal(false)}
//                 title="Close maintenance modal"
//                 className="p-2 hover:bg-blue-800 rounded-lg transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSave} className="p-6 space-y-6">
//               {/* Vehicle & Date Section */}
//               <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
//                 <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                   <Truck className="w-5 h-5 text-blue-600" />
//                   Vehicle & Service Details
//                 </h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {/* Vehicle Number */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Vehicle Number <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       value={formData.vehicleNumber}
//                       onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
//                       required
//                       title="Select vehicle"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option value="">Select Vehicle</option>
//                       {mockVehicles.map(vehicle => (
//                         <option key={vehicle} value={vehicle}>{vehicle}</option>
//                       ))}
//                     </select>
//                   </div>

//                   {/* Service Date */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Service Date <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="date"
//                       value={formData.serviceDate}
//                       onChange={(e) => setFormData({ ...formData, serviceDate: e.target.value })}
//                       required
//                       title="Service date"
//                       placeholder="Service date"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>

//                   {/* Next Service Due */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Next Service Due Date <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="date"
//                       value={formData.nextServiceDue}
//                       onChange={(e) => setFormData({ ...formData, nextServiceDue: e.target.value })}
//                       required
//                       title="Next service due date"
//                       placeholder="Next service due"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>

//                   {/* Status */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Status <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       value={formData.status}
//                       onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
//                       required
//                       title="Select status"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option value="pending">Pending</option>
//                       <option value="in-progress">In Progress</option>
//                       <option value="completed">Completed</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               {/* Maintenance Details */}
//               <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
//                 <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                   <Wrench className="w-5 h-5 text-purple-600" />
//                   Maintenance Information
//                 </h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {/* Maintenance Type */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Maintenance Type <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.maintenanceType}
//                       onChange={(e) => setFormData({ ...formData, maintenanceType: e.target.value })}
//                       required
//                       title="Maintenance type"
//                       placeholder="e.g., Oil Change, Brake Repair"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>

//                   {/* Issue Type */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Issue Type <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       value={formData.issueType}
//                       onChange={(e) => setFormData({ ...formData, issueType: e.target.value as any })}
//                       required
//                       title="Select issue type"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option value="engine">Engine</option>
//                       <option value="brake">Brake</option>
//                       <option value="oil">Oil</option>
//                       <option value="tyre">Tyre</option>
//                       <option value="electrical">Electrical</option>
//                       <option value="other">Other</option>
//                     </select>
//                   </div>

//                   {/* Mechanic */}
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Mechanic / Service Center <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.mechanic}
//                       onChange={(e) => setFormData({ ...formData, mechanic: e.target.value })}
//                       required
//                       placeholder="e.g., ABC Auto Service"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>

//                   {/* Description */}
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Issue Description <span className="text-red-500">*</span>
//                     </label>
//                     <textarea
//                       value={formData.description}
//                       onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                       required
//                       rows={3}
//                       placeholder="Describe the maintenance issue in detail..."
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Cost & Flags */}
//               <div className="bg-green-50 rounded-lg p-4 border border-green-200">
//                 <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                   <DollarSign className="w-5 h-5 text-green-600" />
//                   Cost & Priority
//                 </h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {/* Estimated Cost */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Estimated Cost (₹) <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="number"
//                       value={formData.estimatedCost}
//                       onChange={(e) => setFormData({ ...formData, estimatedCost: Number(e.target.value) })}
//                       required
//                       min="0"
//                       placeholder="0"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>

//                   {/* Actual Cost */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Actual Cost (₹)
//                     </label>
//                     <input
//                       type="number"
//                       value={formData.actualCost || ''}
//                       onChange={(e) => setFormData({ ...formData, actualCost: e.target.value ? Number(e.target.value) : undefined })}
//                       min="0"
//                       placeholder="Leave empty if not completed"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>

//                   {/* Critical Flag */}
//                   <div className="md:col-span-2">
//                     <label className="flex items-center gap-2 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={formData.isCritical}
//                         onChange={(e) => setFormData({ ...formData, isCritical: e.target.checked })}
//                         className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
//                       />
//                       <span className="text-sm font-medium text-gray-700">
//                         Mark as Critical Issue (Vehicle should not operate)
//                       </span>
//                     </label>
//                   </div>

//                   {/* Remarks */}
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Remarks / Notes
//                     </label>
//                     <textarea
//                       value={formData.remarks}
//                       onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
//                       rows={2}
//                       placeholder="Additional notes or comments..."
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//                     />
//                   </div>

//                   {/* Upload Invoice */}
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Upload Invoice / Bill (Optional)
//                     </label>
//                     <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
//                       <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
//                       <input
//                         type="file"
//                         accept=".pdf,.jpg,.jpeg,.png"
//                         onChange={(e) => setFormData({ ...formData, invoice: e.target.files?.[0] })}
//                         className="hidden"
//                         id="invoice-upload"
//                       />
//                       <label
//                         htmlFor="invoice-upload"
//                         className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer"
//                       >
//                         Click to upload invoice
//                       </label>
//                       <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 5MB</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-3 pt-4 border-t border-gray-200">
//                 <button
//                   type="button"
//                   onClick={() => setShowAddModal(false)}
//                   className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
//                 >
//                   {editingRecord ? 'Update Record' : 'Save Record'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && deletingRecord && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
//             <div className="bg-red-600 text-white px-6 py-4 flex items-center gap-3 rounded-t-xl">
//               <AlertTriangle className="w-6 h-6" />
//               <h3 className="text-xl font-bold">Delete Maintenance Record</h3>
//             </div>

//             <div className="p-6">
//               <p className="text-gray-700 mb-4">
//                 Are you sure you want to delete this maintenance record for <strong>{deletingRecord.vehicleNumber}</strong>?
//               </p>
//               <p className="text-sm text-gray-600">
//                 Maintenance Type: <strong>{deletingRecord.maintenanceType}</strong>
//               </p>
//               <p className="text-sm text-gray-600 mt-2">
//                 This action cannot be undone.
//               </p>
//             </div>

//             <div className="px-6 pb-6 flex gap-3">
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all shadow-md hover:shadow-lg"
//               >
//                 Delete Record
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Maintenance History Drawer */}
//       {showHistoryDrawer && selectedVehicle && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-end z-50">
//           <div className="bg-white w-full md:w-1/2 lg:w-1/3 h-full md:h-auto md:max-h-[90vh] rounded-t-2xl md:rounded-l-2xl md:rounded-r-none shadow-2xl overflow-hidden flex flex-col">
//             {/* Header */}
//             <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <FileText className="w-6 h-6" />
//                 <div>
//                   <h3 className="text-xl font-bold">Maintenance History</h3>
//                   <p className="text-blue-100 text-sm">{selectedVehicle}</p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setShowHistoryDrawer(false)}
//                 title="Close maintenance history"
//                 className="p-2 hover:bg-blue-800 rounded-lg transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Summary */}
//             <div className="bg-blue-50 px-6 py-4 border-b border-blue-200">
//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 <div>
//                   <span className="text-gray-600">Total Services:</span>
//                   <span className="ml-2 font-semibold text-gray-900">
//                     {getVehicleHistory(selectedVehicle).length}
//                   </span>
//                 </div>
//                 <div>
//                   <span className="text-gray-600">Total Cost:</span>
//                   <span className="ml-2 font-semibold text-gray-900">
//                     ₹{getTotalCost(selectedVehicle).toLocaleString()}
//                   </span>
//                 </div>
//                 <div className="col-span-2">
//                   <span className="text-gray-600">Last Service:</span>
//                   <span className="ml-2 font-semibold text-gray-900">
//                     {getVehicleHistory(selectedVehicle)[0]?.serviceDate 
//                       ? new Date(getVehicleHistory(selectedVehicle)[0].serviceDate).toLocaleDateString('en-US', { 
//                           month: 'short', 
//                           day: 'numeric', 
//                           year: 'numeric' 
//                         })
//                       : 'N/A'}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* History List */}
//             <div className="flex-1 overflow-y-auto p-6">
//               {getVehicleHistory(selectedVehicle).length === 0 ? (
//                 <div className="text-center py-12">
//                   <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//                   <p className="text-gray-500">No maintenance history available</p>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {getVehicleHistory(selectedVehicle).map((record) => (
//                     <div 
//                       key={record.id} 
//                       className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-4 border border-gray-200"
//                     >
//                       {/* Date and Status */}
//                       <div className="flex items-center justify-between mb-3">
//                         <div className="flex items-center gap-2">
//                           <Calendar className="w-4 h-4 text-blue-600" />
//                           <span className="font-semibold text-gray-900">
//                             {new Date(record.serviceDate).toLocaleDateString('en-US', { 
//                               month: 'short', 
//                               day: 'numeric', 
//                               year: 'numeric' 
//                             })}
//                           </span>
//                         </div>
//                         <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(record.status)}`}>
//                           {getStatusText(record.status)}
//                         </span>
//                       </div>

//                       {/* Details */}
//                       <div className="space-y-2 text-sm">
//                         <div>
//                           <p className="font-semibold text-gray-900">{record.maintenanceType}</p>
//                           <span className={`inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getIssueTypeStyle(record.issueType)}`}>
//                             {record.issueType.charAt(0).toUpperCase() + record.issueType.slice(1)}
//                           </span>
//                         </div>
//                         <p className="text-gray-600">{record.description}</p>
//                         <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
//                           <User className="w-4 h-4 text-gray-500" />
//                           <span className="text-gray-600">{record.mechanic}</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <DollarSign className="w-4 h-4 text-green-600" />
//                           <span className="font-medium text-gray-900">
//                             ₹{(record.actualCost || record.estimatedCost).toLocaleString()}
//                           </span>
//                         </div>
//                         {record.remarks && (
//                           <div className="mt-2 pt-2 border-t border-gray-200">
//                             <p className="text-xs text-gray-600 mb-1">Remarks:</p>
//                             <p className="text-gray-700">{record.remarks}</p>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VehicleMaintenanceScreen;

import React, { useState } from 'react';
import {
  Truck, Wrench, CheckCircle, AlertTriangle, Calendar,
  Search, RotateCcw, Plus, Edit2, Trash2, Eye, X,
  Upload, DollarSign, Clock, User, FileText, TrendingUp,
  AlertCircle
} from 'lucide-react';

const mockMaintenanceRecords = [
  {
    id: '1', vehicleNumber: 'KA01AB1234', serviceDate: '2026-01-20',
    maintenanceType: 'Oil Change', issueType: 'oil',
    description: 'Regular engine oil change and filter replacement',
    mechanic: 'ABC Auto Service', estimatedCost: 2500, actualCost: 2400,
    nextServiceDue: '2026-04-20', status: 'completed', createdDate: '2026-01-15',
    remarks: 'Service completed on time'
  },
  {
    id: '2', vehicleNumber: 'KA01CD5678', serviceDate: '2026-01-28',
    maintenanceType: 'Brake Inspection', issueType: 'brake',
    description: 'Complete brake system check and pad replacement needed',
    mechanic: 'City Motors', estimatedCost: 5000,
    nextServiceDue: '2026-07-28', status: 'pending', isCritical: true,
    createdDate: '2026-01-18', remarks: 'Urgent - safety issue'
  },
  {
    id: '3', vehicleNumber: 'KA01EF9012', serviceDate: '2026-01-25',
    maintenanceType: 'Tyre Replacement', issueType: 'tyre',
    description: 'Front tyres showing significant wear, replacement required',
    mechanic: 'Wheel Masters', estimatedCost: 8000, actualCost: 7500,
    nextServiceDue: '2026-10-25', status: 'completed', createdDate: '2026-01-20'
  },
  {
    id: '4', vehicleNumber: 'KA01GH3456', serviceDate: '2026-01-22',
    maintenanceType: 'Engine Repair', issueType: 'engine',
    description: 'Engine making unusual noise, requires diagnostic and repair',
    mechanic: 'Premium Auto Care', estimatedCost: 15000, actualCost: 13500,
    nextServiceDue: '2026-03-22', status: 'in-progress', createdDate: '2026-01-18',
    hasRepeatedIssue: true
  },
  {
    id: '5', vehicleNumber: 'KA01IJ7890', serviceDate: '2026-01-15',
    maintenanceType: 'Electrical System Check', issueType: 'electrical',
    description: 'Dashboard lights flickering, battery check required',
    mechanic: 'Auto Electric Pro', estimatedCost: 3000, actualCost: 2800,
    nextServiceDue: '2026-06-15', status: 'completed', createdDate: '2026-01-10'
  },
  {
    id: '6', vehicleNumber: 'KA01CD5678', serviceDate: '2026-01-30',
    maintenanceType: 'AC Service', issueType: 'other',
    description: 'Air conditioning not cooling properly, gas refill needed',
    mechanic: 'Cool Care Services', estimatedCost: 4000,
    nextServiceDue: '2026-07-30', status: 'pending', createdDate: '2026-01-28'
  },
  {
    id: '7', vehicleNumber: 'KA01GH3456', serviceDate: '2026-01-12',
    maintenanceType: 'Engine Overhaul', issueType: 'engine',
    description: 'Previous engine issue - complete overhaul',
    mechanic: 'Premium Auto Care', estimatedCost: 25000, actualCost: 24000,
    nextServiceDue: '2026-04-12', status: 'completed', createdDate: '2026-01-05',
    hasRepeatedIssue: true
  }
];

const mockVehicles = ['KA01AB1234', 'KA01CD5678', 'KA01EF9012', 'KA01GH3456', 'KA01IJ7890', 'KA01KL2345'];

interface MaintenanceRecord {
  id: string;
  vehicleNumber: string;
  serviceDate: string;
  maintenanceType: string;
  issueType: 'engine' | 'brake' | 'oil' | 'tyre' | 'electrical' | 'other';
  description: string;
  mechanic: string;
  estimatedCost: number;
  actualCost?: number | string;
  nextServiceDue: string;
  status: 'pending' | 'in-progress' | 'completed';
  isCritical?: boolean;
  remarks?: string;
  createdDate: string;
  hasRepeatedIssue?: boolean;
  invoice?: File;
}

const emptyForm: MaintenanceRecord = {
  id: '', vehicleNumber: '', serviceDate: '', maintenanceType: '',
  issueType: 'engine', description: '', mechanic: '',
  estimatedCost: 0, actualCost: '', nextServiceDue: '',
  status: 'pending', createdDate: new Date().toISOString().split('T')[0],
  isCritical: false, remarks: '', invoice: undefined
};

const getStatusStyle = (status: string): string => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-700 border-green-200';
    case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'pending': return 'bg-orange-100 text-orange-700 border-orange-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getStatusText = (status: string): string =>
  status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

const issueStyles = {
  engine: 'bg-red-100 text-red-700 border-red-200',
  brake: 'bg-orange-100 text-orange-700 border-orange-200',
  oil: 'bg-blue-100 text-blue-700 border-blue-200',
  tyre: 'bg-purple-100 text-purple-700 border-purple-200',
  electrical: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  other: 'bg-gray-100 text-gray-700 border-gray-200'
};

const fmt = (dateStr: string, opts?: Intl.DateTimeFormatOptions) =>
  new Date(dateStr).toLocaleDateString('en-US', opts ?? { month: 'short', day: 'numeric', year: 'numeric' });

export default function VehicleMaintenanceScreen() {
  const [records, setRecords] = useState<MaintenanceRecord[]>(mockMaintenanceRecords as MaintenanceRecord[]);
  const [filteredRecords, setFilteredRecords] = useState<MaintenanceRecord[]>(mockMaintenanceRecords as MaintenanceRecord[]);
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
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [formData, setFormData] = useState<MaintenanceRecord>(emptyForm);

  const stats = {
    totalVehicles: new Set(records.map(r => r.vehicleNumber)).size,
    maintenanceDue: records.filter(r =>
      r.status === 'pending' ||
      new Date(r.nextServiceDue) <= new Date(Date.now() + 7 * 86400000)
    ).length,
    maintenanceCompleted: records.filter(r => r.status === 'completed').length,
    criticalIssues: records.filter(r => r.isCritical && r.status !== 'completed').length
  };

  const runFilter = (
    recs: MaintenanceRecord[],
    term: string,
    status: string,
    issue: string,
    from: string,
    to: string
  ): MaintenanceRecord[] => {
    return recs.filter(r => {
      if (term && !r.vehicleNumber.toLowerCase().includes(term.toLowerCase())) return false;
      if (status && r.status !== status) return false;
      if (issue && r.issueType !== issue) return false;
      if (from && new Date(r.serviceDate) < new Date(from)) return false;
      if (to && new Date(r.serviceDate) > new Date(to)) return false;
      // Ensure actualCost is number or undefined
      if (typeof r.actualCost === 'string') return false;
      return true;
    });
  };

  const handleSearch = (): void => {
    setFilteredRecords(runFilter(records, searchTerm, statusFilter, issueTypeFilter, dateFrom, dateTo));
  };

  const handleReset = (): void => {
    setSearchTerm(''); setStatusFilter(''); setIssueTypeFilter('');
    setDateFrom(''); setDateTo('');
    setFilteredRecords(records);
  };

  const openAdd = (): void => { setEditingRecord(null); setFormData(emptyForm); setShowAddModal(true); };
  const openEdit = (r: MaintenanceRecord): void => {
    setEditingRecord({ ...r });
    setFormData({ ...r, actualCost: r.actualCost ?? '' });
    setShowAddModal(true);
  };
  const openDelete = (r: MaintenanceRecord): void => {
    setDeletingRecord({ ...r });
    setShowDeleteModal(true);
  };
  const openHistory = (vn: string): void => { setSelectedVehicle(vn); setShowHistoryDrawer(true); };

  const confirmDelete = (): void => {
    if (!deletingRecord) return;
    const next = records.filter(r => r.id !== deletingRecord.id);
    setRecords(next);
    setFilteredRecords(filteredRecords.filter(r => r.id !== deletingRecord.id));
    setShowDeleteModal(false); setDeletingRecord(null);
  };

  const handleSave = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!formData.vehicleNumber || !formData.serviceDate || !formData.maintenanceType) {
      alert('Please fill in all required fields'); return;
    }
    const typedRecord: MaintenanceRecord = {
      ...formData,
      actualCost: formData.actualCost !== '' ? Number(formData.actualCost) : undefined,
      status: formData.status as 'pending' | 'in-progress' | 'completed',
    };
    let next;
    if (editingRecord) {
      next = records.map(r => r.id === editingRecord.id ? typedRecord : r);
      setFilteredRecords(filteredRecords.map(r => r.id === editingRecord.id ? typedRecord : r));
    } else {
      const newR = { ...typedRecord, id: Date.now().toString() };
      next = [newR, ...records];
      setFilteredRecords([newR, ...filteredRecords]);
    }
    setRecords(next);
    setShowAddModal(false); setEditingRecord(null);
  };

  const getVehicleHistory = (vn: string): MaintenanceRecord[] =>
    records.filter(r => r.vehicleNumber === vn)
      .sort((a, b) => new Date(b.serviceDate).getTime() - new Date(a.serviceDate).getTime());

  const getTotalCost = (vn: string): number =>
    records.filter(r => r.vehicleNumber === vn && r.actualCost)
      .reduce((s, r) => s + (Number(r.actualCost) || 0), 0);

  const inputCls = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none";
  const labelCls = "block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide";

  return (
    /* ── ROOT: full viewport, no overflow-x ── */
    <div style={{ minHeight: '100vh', width: '100%', overflowX: 'hidden', backgroundColor: '#f8fafc', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '100%', padding: '16px', boxSizing: 'border-box' }}>

        {/* ── HEADER ── */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Truck className="w-7 h-7 text-blue-600" /> Vehicle Maintenance Logs
          </h1>
          <p className="text-sm text-gray-500 mt-1">Track and manage vehicle maintenance activities for safety and compliance</p>
        </div>

        {/* ── STAT CARDS ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '20px' }}>
          {[
            { label: 'Total Vehicles', value: stats.totalVehicles, icon: <Truck className="w-5 h-5 text-blue-600" />, bg: 'from-blue-50 to-blue-100', border: 'border-blue-200', text: 'text-blue-900', sub: 'text-blue-700' },
            { label: 'Maintenance Due', value: stats.maintenanceDue, icon: <Clock className="w-5 h-5 text-orange-600" />, bg: 'from-orange-50 to-orange-100', border: 'border-orange-200', text: 'text-orange-900', sub: 'text-orange-700' },
            { label: 'Completed', value: stats.maintenanceCompleted, icon: <CheckCircle className="w-5 h-5 text-green-600" />, bg: 'from-green-50 to-green-100', border: 'border-green-200', text: 'text-green-900', sub: 'text-green-700' },
            { label: 'Critical Issues', value: stats.criticalIssues, icon: <AlertTriangle className="w-5 h-5 text-red-600" />, bg: 'from-red-50 to-red-100', border: 'border-red-200', text: 'text-red-900', sub: 'text-red-700' },
          ].map((s) => (
            <div key={s.label} className={`bg-gradient-to-br ${s.bg} border ${s.border} rounded-xl p-4 flex items-center justify-between`}>
              <div>
                <p className={`text-xs font-semibold ${s.sub}`}>{s.label}</p>
                <p className={`text-3xl font-bold ${s.text} mt-1`}>{s.value}</p>
              </div>
              <div className="bg-white bg-opacity-60 p-2 rounded-lg">{s.icon}</div>
            </div>
          ))}
        </div>

        {/* ── CRITICAL ALERT ── */}
        {stats.criticalIssues > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-3 mb-5 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-900 text-sm">Critical Maintenance Issues Detected</p>
              <p className="text-red-700 text-xs mt-0.5">{stats.criticalIssues} vehicle(s) have critical maintenance issues pending. These vehicles should not be assigned to routes until resolved.</p>
            </div>
          </div>
        )}

        {/* ── FILTER PANEL ── */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2"><Search className="w-4 h-4" /> Filters</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px', alignItems: 'end' }}>
            <div>
              <label className={labelCls}>Vehicle</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input className={inputCls + ' pl-8'} placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Status</label>
              <select className={inputCls} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Issue Type</label>
              <select className={inputCls} value={issueTypeFilter} onChange={e => setIssueTypeFilter(e.target.value)}>
                <option value="">All</option>
                <option value="engine">Engine</option>
                <option value="brake">Brake</option>
                <option value="oil">Oil</option>
                <option value="tyre">Tyre</option>
                <option value="electrical">Electrical</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>From Date</label>
              <input type="date" className={inputCls} value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>To Date</label>
              <input type="date" className={inputCls} value={dateTo} onChange={e => setDateTo(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <button onClick={handleSearch} className="flex-1 bg-blue-600 text-white text-sm font-semibold px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-1">
                <Search className="w-4 h-4" /> Search
              </button>
              <button onClick={handleReset} title="Reset" className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── ADD BUTTON ── */}
        <div className="mb-4">
          <button onClick={openAdd} className="bg-blue-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">
            <Plus className="w-4 h-4" /> Add Maintenance Record
          </button>
        </div>

        {/* ── TABLE CARD ── */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm" style={{ overflow: 'hidden' }}>
          <div style={{ overflowX: 'hidden', overflowY: 'visible', width: '100%' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px', tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: '11%' }} />
                <col style={{ width: '9%' }} />
                <col style={{ width: '14%' }} />
                <col style={{ width: '17%' }} />
                <col style={{ width: '11%' }} />
                <col style={{ width: '11%' }} />
                <col style={{ width: '11%' }} />
                <col style={{ width: '9%' }} />
                <col style={{ width: '7%' }} />
              </colgroup>
              <thead>
                <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
                  {['Vehicle', 'Service Date', 'Type / Issue', 'Description', 'Mechanic', 'Cost', 'Next Due', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '5px 6px', textAlign: 'left', fontSize: '8px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={9} style={{ textAlign: 'center', padding: '48px 16px', color: '#94a3b8' }}>
                      <Wrench style={{ width: 36, height: 36, margin: '0 auto 8px', opacity: 0.4 }} />
                      <p>No maintenance records found</p>
                    </td>
                  </tr>
                ) : filteredRecords.map((record, idx) => {
                  const isOverdue = new Date(record.nextServiceDue) < new Date() && record.status !== 'completed';
                  const rowBg = record.isCritical && record.status !== 'completed'
                    ? '#fff5f5'
                    : record.hasRepeatedIssue
                    ? '#fefce8'
                    : idx % 2 === 0 ? '#ffffff' : '#f8fafc';

                  return (
                    <tr key={record.id} style={{ backgroundColor: rowBg, borderBottom: '1px solid #e2e8f0' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eff6ff'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = rowBg}>

                      {/* Vehicle */}
                      <td style={{ padding: '5px 6px', whiteSpace: 'nowrap' }}>
                        <div className="flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                          <div className="min-w-0">
                            <div style={{ fontWeight: 600, color: '#1e293b', fontSize: 10, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={record.vehicleNumber}>{record.vehicleNumber}</div>
                            {record.hasRepeatedIssue && (
                              <div className="flex items-center gap-1 mt-0.5">
                                <TrendingUp className="w-3 h-3 text-amber-500" />
                                <span style={{ fontSize: 10, color: '#b45309' }}>Repeated</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Service Date */}
                      <td style={{ padding: '5px 6px', whiteSpace: 'nowrap', color: '#475569', fontSize: 9 }}>
                        {fmt(record.serviceDate)}
                      </td>

                      {/* Type / Issue */}
                      <td style={{ padding: '5px 6px' }}>
                        <div style={{ fontWeight: 600, color: '#1e293b', marginBottom: 2, fontSize: 9, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={record.maintenanceType}>{record.maintenanceType}</div>
                        <span className={`inline-flex items-center px-1 py-0.5 rounded-full text-[9px] font-medium border whitespace-nowrap ${issueStyles[record.issueType] || issueStyles.other}`}>
                          {record.issueType.charAt(0).toUpperCase() + record.issueType.slice(1)}
                        </span>
                      </td>

                      {/* Description */}
                      <td style={{ padding: '5px 6px', maxWidth: 0 }}>
                        <p style={{ fontSize: 9, color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={record.description}>{record.description}</p>
                        {record.isCritical && (
                          <div className="flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3 h-3 text-red-500" />
                            <span style={{ fontSize: 10, color: '#dc2626', fontWeight: 600 }}>CRITICAL</span>
                          </div>
                        )}
                      </td>

                      {/* Mechanic */}
                      <td style={{ padding: '5px 6px', whiteSpace: 'nowrap' }}>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3 text-gray-400" />
                          <span style={{ fontSize: 9, color: '#475569', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={record.mechanic}>{record.mechanic}</span>
                        </div>
                      </td>

                      {/* Cost */}
                      <td style={{ padding: '5px 6px', whiteSpace: 'nowrap' }}>
                        {record.actualCost ? (
                          <>
                            <div style={{ fontWeight: 600, color: '#166534', fontSize: 10 }}>₹{record.actualCost.toLocaleString()}</div>
                            <div style={{ fontSize: 10, color: '#94a3b8' }}>Est: ₹{record.estimatedCost.toLocaleString()}</div>
                          </>
                        ) : (
                          <div style={{ color: '#64748b', fontSize: 10 }}>₹{record.estimatedCost.toLocaleString()}</div>
                        )}
                      </td>

                      {/* Next Due */}
                      <td style={{ padding: '5px 6px', whiteSpace: 'nowrap' }}>
                        <div className="flex items-center gap-1" style={{ color: isOverdue ? '#dc2626' : '#475569' }}>
                          {isOverdue ? <AlertTriangle className="w-3 h-3 text-red-500" /> : <Clock className="w-3 h-3 text-gray-400" />}
                          <span style={{ fontSize: 9 }}>{fmt(record.nextServiceDue, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td style={{ padding: '5px 6px', whiteSpace: 'nowrap' }}>
                        <span className={`inline-flex items-center gap-1 px-1 py-0.5 rounded-full text-[9px] font-semibold border ${getStatusStyle(record.status)}`}>
                          {record.status === 'completed' && <CheckCircle className="w-3 h-3" />}
                          {record.status === 'in-progress' && <Wrench className="w-3 h-3" />}
                          {record.status === 'pending' && <Clock className="w-3 h-3" />}
                          {getStatusText(record.status)}
                        </span>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '5px 6px', whiteSpace: 'nowrap' }}>
                        <div className="flex gap-1">
                          <button onClick={() => {
                            const convertedRecord = {
                              ...record,
                              issueType: record.issueType as 'engine' | 'brake' | 'oil' | 'tyre' | 'electrical' | 'other',
                              status: record.status as 'pending' | 'in-progress' | 'completed',
                              actualCost: record.actualCost ? Number(record.actualCost) : undefined
                            };
                            openEdit({
                              ...convertedRecord,
                              issueType: convertedRecord.issueType as 'engine' | 'brake' | 'oil' | 'tyre' | 'electrical' | 'other',
                            });
                          }} title="Edit" className="p-0.5 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors">
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button onClick={() => openDelete(record)} title="Delete" className="p-0.5 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors">
                            <Trash2 className="w-3 h-3" />
                          </button>
                          <button onClick={() => openHistory(record.vehicleNumber)} title="History" className="p-0.5 bg-green-100 text-green-600 rounded-md hover:bg-green-200 transition-colors">
                            <Eye className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Row count footer */}
          <div style={{ padding: '8px 16px', borderTop: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
            <span style={{ fontSize: 12, color: '#94a3b8' }}>Showing {filteredRecords.length} of {records.length} records</span>
          </div>
        </div>

        {/* ── ADD / EDIT MODAL ── */}
        {showAddModal && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, zIndex: 50, overflowY: 'auto' }}>
            <div style={{ backgroundColor: '#fff', borderRadius: 16, width: '100%', maxWidth: 720, maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
              {/* Header */}
              <div style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: '#fff', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '16px 16px 0 0', position: 'sticky', top: 0, zIndex: 10 }}>
                <div className="flex items-center gap-2">
                  <Wrench className="w-5 h-5" />
                  <span style={{ fontWeight: 700, fontSize: 16 }}>{editingRecord ? 'Update Maintenance Record' : 'Add Maintenance Record'}</span>
                </div>
                <button onClick={() => setShowAddModal(false)} className="p-1.5 hover:bg-blue-800 rounded-lg transition-colors"><X className="w-4 h-4" /></button>
              </div>

              <form onSubmit={handleSave} style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Section: Vehicle & Dates */}
                <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, padding: 16 }}>
                  <p className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-1.5"><Truck className="w-4 h-4 text-blue-600" /> Vehicle & Service Details</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
                    <div>
                      <label className={labelCls}>Vehicle Number *</label>
                      <select className={inputCls} value={formData.vehicleNumber} onChange={e => setFormData({ ...formData, vehicleNumber: e.target.value })} required>
                        <option value="">Select Vehicle</option>
                        {mockVehicles.map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Service Date *</label>
                      <input type="date" className={inputCls} value={formData.serviceDate} onChange={e => setFormData({ ...formData, serviceDate: e.target.value })} required />
                    </div>
                    <div>
                      <label className={labelCls}>Next Service Due *</label>
                      <input type="date" className={inputCls} value={formData.nextServiceDue} onChange={e => setFormData({ ...formData, nextServiceDue: e.target.value })} required />
                    </div>
                    <div>
                      <label className={labelCls}>Status *</label>
                      <select className={inputCls} value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value as 'pending' | 'in-progress' | 'completed' })} required>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section: Maintenance Info */}
                <div style={{ backgroundColor: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: 10, padding: 16 }}>
                  <p className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-1.5"><Wrench className="w-4 h-4 text-purple-600" /> Maintenance Information</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
                    <div>
                      <label className={labelCls}>Maintenance Type *</label>
                      <input className={inputCls} placeholder="e.g., Oil Change" value={formData.maintenanceType} onChange={e => setFormData({ ...formData, maintenanceType: e.target.value })} required />
                    </div>
                    <div>
                      <label className={labelCls}>Issue Type *</label>
                      <select className={inputCls} value={formData.issueType} onChange={e => setFormData({ ...formData, issueType: e.target.value as 'engine' | 'brake' | 'oil' | 'tyre' | 'electrical' | 'other' })} required>
                        <option value="engine">Engine</option>
                        <option value="brake">Brake</option>
                        <option value="oil">Oil</option>
                        <option value="tyre">Tyre</option>
                        <option value="electrical">Electrical</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label className={labelCls}>Mechanic / Service Center *</label>
                      <input className={inputCls} placeholder="e.g., ABC Auto Service" value={formData.mechanic} onChange={e => setFormData({ ...formData, mechanic: e.target.value })} required />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label className={labelCls}>Issue Description *</label>
                      <textarea className={inputCls} rows={3} placeholder="Describe the maintenance issue..." value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required style={{ resize: 'vertical' }} />
                    </div>
                  </div>
                </div>

                {/* Section: Cost & Priority */}
                <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: 16 }}>
                  <p className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-green-600" /> Cost & Priority</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
                    <div>
                      <label className={labelCls}>Estimated Cost (₹) *</label>
                      <input type="number" className={inputCls} min="0" placeholder="0" value={formData.estimatedCost} onChange={e => setFormData({ ...formData, estimatedCost: Number(e.target.value) })} required />
                    </div>
                    <div>
                      <label className={labelCls}>Actual Cost (₹)</label>
                      <input type="number" className={inputCls} min="0" placeholder="Leave empty if pending" value={formData.actualCost} onChange={e => setFormData({ ...formData, actualCost: e.target.value })} />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={formData.isCritical} onChange={e => setFormData({ ...formData, isCritical: e.target.checked })} className="w-4 h-4 text-red-600 border-gray-300 rounded" />
                        <span className="text-sm text-gray-700 font-medium">Mark as Critical Issue (Vehicle should not operate)</span>
                      </label>
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label className={labelCls}>Remarks / Notes</label>
                      <textarea className={inputCls} rows={2} placeholder="Additional notes..." value={formData.remarks} onChange={e => setFormData({ ...formData, remarks: e.target.value })} style={{ resize: 'vertical' }} />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label className={labelCls}>Upload Invoice (Optional)</label>
                      <div style={{ border: '2px dashed #d1d5db', borderRadius: 8, padding: '16px', textAlign: 'center' }}>
                        <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                        <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setFormData({ ...formData, invoice: e.target.files?.[0] })} className="hidden" id="invoice-upload" />
                        <label htmlFor="invoice-upload" className="text-sm text-blue-600 cursor-pointer hover:text-blue-700">Click to upload invoice</label>
                        <p className="text-xs text-gray-400 mt-0.5">PDF, JPG, PNG up to 5MB</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2 border-t border-gray-100">
                  <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors shadow-sm">
                    {editingRecord ? 'Update Record' : 'Save Record'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── DELETE MODAL ── */}
        {showDeleteModal && deletingRecord && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, zIndex: 50 }}>
            <div style={{ backgroundColor: '#fff', borderRadius: 16, width: '100%', maxWidth: 420, boxShadow: '0 25px 50px rgba(0,0,0,0.25)', overflow: 'hidden' }}>
              <div style={{ background: '#dc2626', color: '#fff', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <AlertTriangle className="w-5 h-5" />
                <span style={{ fontWeight: 700, fontSize: 15 }}>Delete Maintenance Record</span>
              </div>
              <div style={{ padding: '20px 18px' }}>
                <p className="text-gray-700 text-sm mb-3">Are you sure you want to delete this maintenance record for <strong>{deletingRecord.vehicleNumber}</strong>?</p>
                <p className="text-xs text-gray-500">Type: <strong>{deletingRecord.maintenanceType}</strong></p>
                <p className="text-xs text-red-500 mt-2 font-medium">⚠ This action cannot be undone.</p>
              </div>
              <div className="flex gap-3 px-4 pb-4">
                <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors">Cancel</button>
                <button onClick={confirmDelete} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-semibold text-sm hover:bg-red-700 transition-colors">Delete</button>
              </div>
            </div>
          </div>
        )}

        {/* ── HISTORY DRAWER ── */}
        {showHistoryDrawer && selectedVehicle && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)', display: 'flex', justifyContent: 'flex-end', zIndex: 50 }}>
            <div style={{ backgroundColor: '#fff', width: '100%', maxWidth: 400, height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 24px rgba(0,0,0,0.15)' }}>
              {/* Header */}
              <div style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: '#fff', padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>Maintenance History</div>
                    <div style={{ fontSize: 12, opacity: 0.8 }}>{selectedVehicle}</div>
                  </div>
                </div>
                <button onClick={() => setShowHistoryDrawer(false)} className="p-1.5 hover:bg-blue-800 rounded-lg transition-colors"><X className="w-4 h-4" /></button>
              </div>

              {/* Summary */}
              <div style={{ backgroundColor: '#eff6ff', padding: '12px 18px', borderBottom: '1px solid #bfdbfe', flexShrink: 0 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 13 }}>
                  <div><span className="text-gray-500">Total Services:</span> <strong>{getVehicleHistory(selectedVehicle).length}</strong></div>
                  <div><span className="text-gray-500">Total Cost:</span> <strong>₹{getTotalCost(selectedVehicle).toLocaleString()}</strong></div>
                  <div className="col-span-2"><span className="text-gray-500">Last Service:</span> <strong>{getVehicleHistory(selectedVehicle)[0]?.serviceDate ? fmt(getVehicleHistory(selectedVehicle)[0].serviceDate) : 'N/A'}</strong></div>
                </div>
              </div>

              {/* List */}
              <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
                {getVehicleHistory(selectedVehicle).length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <FileText className="w-10 h-10 mx-auto mb-2 opacity-40" />
                    <p className="text-sm">No maintenance history available</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {getVehicleHistory(selectedVehicle).map(record => (
                      <div key={record.id} style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: 14 }}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-blue-500" />
                            <span style={{ fontWeight: 600, fontSize: 13 }}>{fmt(record.serviceDate)}</span>
                          </div>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${getStatusStyle(record.status)}`}>{getStatusText(record.status)}</span>
                        </div>
                        <div style={{ fontSize: 13 }}>
                          <p style={{ fontWeight: 600, color: '#1e293b' }}>{record.maintenanceType}</p>
                          <span className={`inline-flex mt-1 px-1.5 py-0.5 rounded-full text-xs font-medium border ${issueStyles[record.issueType] || issueStyles.other}`}>
                            {record.issueType.charAt(0).toUpperCase() + record.issueType.slice(1)}
                          </span>
                          <p style={{ color: '#64748b', fontSize: 12, marginTop: 6 }}>{record.description}</p>
                          <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-gray-200">
                            <User className="w-3 h-3 text-gray-400" />
                            <span style={{ fontSize: 12, color: '#475569' }}>{record.mechanic}</span>
                          </div>
                          <div className="flex items-center gap-1.5 mt-1">
                            <DollarSign className="w-3 h-3 text-green-500" />
                            <span style={{ fontWeight: 600, color: '#166534', fontSize: 13 }}>₹{(record.actualCost || record.estimatedCost).toLocaleString()}</span>
                          </div>
                          {record.remarks && (
                            <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid #e2e8f0' }}>
                              <p style={{ fontSize: 11, color: '#94a3b8', marginBottom: 2 }}>Remarks</p>
                              <p style={{ fontSize: 12, color: '#475569' }}>{record.remarks}</p>
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
    </div>
  );
}