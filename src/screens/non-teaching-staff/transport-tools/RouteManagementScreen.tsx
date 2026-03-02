// import React, { useState } from 'react';
// import { Route, MapPin, User, AlertCircle, Plus, Edit2, Trash2, X, Clock, Navigation, Bus } from 'lucide-react';

// // Types
// interface Stop {
//   id: string;
//   name: string;
//   pickupTime: string;
//   dropTime: string;
// }

// interface RouteData {
//   id: string;
//   routeName: string;
//   numberOfStops: number;
//   assignedDriver: string;
//   driverId: string;
//   vehicleNumber?: string;
//   startLocation: string;
//   endLocation: string;
//   status: 'active' | 'inactive';
//   stops: Stop[];
//   hasActiveAssignments?: boolean;
// }

// interface Driver {
//   id: string;
//   name: string;
// }

// interface Vehicle {
//   id: string;
//   vehicleNumber: string;
// }

// // Mock data
// const mockDrivers: Driver[] = [
//   { id: '1', name: 'Ravi Kumar' },
//   { id: '2', name: 'Sunil Singh' },
//   { id: '3', name: 'Prakash Sharma' },
//   { id: '4', name: 'Amit Patel' },
//   { id: '5', name: 'Rajesh Reddy' }
// ];

// const mockVehicles: Vehicle[] = [
//   { id: '1', vehicleNumber: 'KA01AB1234' },
//   { id: '2', vehicleNumber: 'KA01CD5678' },
//   { id: '3', vehicleNumber: 'KA01EF9012' },
//   { id: '4', vehicleNumber: 'KA01GH3456' }
// ];

// const mockRoutes: RouteData[] = [
//   {
//     id: '1',
//     routeName: 'Route 1 - North Sector',
//     numberOfStops: 10,
//     assignedDriver: 'Ravi Kumar',
//     driverId: '1',
//     vehicleNumber: 'KA01AB1234',
//     startLocation: 'School Campus',
//     endLocation: 'North Area A',
//     status: 'active',
//     stops: [
//       { id: 's1', name: 'School Campus', pickupTime: '07:00 AM', dropTime: '03:30 PM' },
//       { id: 's2', name: 'Green Park', pickupTime: '07:15 AM', dropTime: '03:15 PM' },
//       { id: 's3', name: 'Central Mall', pickupTime: '07:30 AM', dropTime: '03:00 PM' }
//     ],
//     hasActiveAssignments: true
//   },
//   {
//     id: '2',
//     routeName: 'Route 2 - South Campus',
//     numberOfStops: 8,
//     assignedDriver: 'Sunil Singh',
//     driverId: '2',
//     vehicleNumber: 'KA01CD5678',
//     startLocation: 'School Campus',
//     endLocation: 'South Area B',
//     status: 'active',
//     stops: [
//       { id: 's4', name: 'School Campus', pickupTime: '07:00 AM', dropTime: '03:30 PM' },
//       { id: 's5', name: 'Lake View', pickupTime: '07:20 AM', dropTime: '03:10 PM' }
//     ],
//     hasActiveAssignments: false
//   },
//   {
//     id: '3',
//     routeName: 'Route 3 - East Zone',
//     numberOfStops: 12,
//     assignedDriver: 'Prakash Sharma',
//     driverId: '3',
//     startLocation: 'School Campus',
//     endLocation: 'East Tech Park',
//     status: 'active',
//     stops: [
//       { id: 's6', name: 'School Campus', pickupTime: '07:00 AM', dropTime: '03:30 PM' }
//     ],
//     hasActiveAssignments: true
//   },
//   {
//     id: '4',
//     routeName: 'Route 4 - West Point',
//     numberOfStops: 6,
//     assignedDriver: '',
//     driverId: '',
//     startLocation: 'School Campus',
//     endLocation: 'West Junction',
//     status: 'inactive',
//     stops: [],
//     hasActiveAssignments: false
//   }
// ];

// const RouteManagementScreen: React.FC = () => {
//   const [routes, setRoutes] = useState<RouteData[]>(mockRoutes);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [editingRoute, setEditingRoute] = useState<RouteData | null>(null);
//   const [deletingRoute, setDeletingRoute] = useState<RouteData | null>(null);

//   // Form state
//   const [formData, setFormData] = useState<RouteData>({
//     id: '',
//     routeName: '',
//     numberOfStops: 0,
//     assignedDriver: '',
//     driverId: '',
//     vehicleNumber: '',
//     startLocation: '',
//     endLocation: '',
//     status: 'active',
//     stops: [],
//     hasActiveAssignments: false
//   });

//   // Calculate statistics
//   const stats = {
//     totalRoutes: routes.length,
//     totalStops: routes.reduce((sum, route) => sum + route.numberOfStops, 0),
//     activeDrivers: new Set(routes.filter(r => r.driverId).map(r => r.driverId)).size,
//     unassignedRoutes: routes.filter(r => !r.driverId).length
//   };

//   // Handle add route
//   const handleAddRoute = () => {
//     setEditingRoute(null);
//     setFormData({
//       id: '',
//       routeName: '',
//       numberOfStops: 0,
//       assignedDriver: '',
//       driverId: '',
//       vehicleNumber: '',
//       startLocation: '',
//       endLocation: '',
//       status: 'active',
//       stops: [],
//       hasActiveAssignments: false
//     });
//     setShowAddModal(true);
//   };

//   // Handle edit route
//   const handleEditRoute = (route: RouteData) => {
//     setEditingRoute(route);
//     setFormData({ ...route });
//     setShowAddModal(true);
//   };

//   // Handle delete route
//   const handleDeleteRoute = (route: RouteData) => {
//     setDeletingRoute(route);
//     setShowDeleteModal(true);
//   };

//   // Confirm delete
//   const confirmDelete = () => {
//     if (deletingRoute) {
//       setRoutes(routes.filter(r => r.id !== deletingRoute.id));
//       setShowDeleteModal(false);
//       setDeletingRoute(null);
//     }
//   };

//   // Save route
//   const handleSaveRoute = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Validation
//     if (!formData.routeName || !formData.startLocation || !formData.endLocation) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     const driverName = mockDrivers.find(d => d.id === formData.driverId)?.name || '';
//     const updatedFormData = {
//       ...formData,
//       assignedDriver: driverName,
//       numberOfStops: formData.stops.length
//     };

//     if (editingRoute) {
//       // Update existing route
//       setRoutes(routes.map(r => r.id === editingRoute.id ? updatedFormData : r));
//     } else {
//       // Add new route
//       const newRoute = {
//         ...updatedFormData,
//         id: Date.now().toString()
//       };
//       setRoutes([...routes, newRoute]);
//     }

//     setShowAddModal(false);
//     setEditingRoute(null);
//   };

//   // Add stop
//   const handleAddStop = () => {
//     const newStop: Stop = {
//       id: Date.now().toString(),
//       name: '',
//       pickupTime: '',
//       dropTime: ''
//     };
//     setFormData({
//       ...formData,
//       stops: [...formData.stops, newStop]
//     });
//   };

//   // Remove stop
//   const handleRemoveStop = (stopId: string) => {
//     setFormData({
//       ...formData,
//       stops: formData.stops.filter(s => s.id !== stopId)
//     });
//   };

//   // Update stop
//   const handleUpdateStop = (stopId: string, field: keyof Stop, value: string) => {
//     setFormData({
//       ...formData,
//       stops: formData.stops.map(s => 
//         s.id === stopId ? { ...s, [field]: value } : s
//       )
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Route Management</h1>
//         <p className="text-gray-600">Manage school transport routes, stops, and driver assignments</p>
//       </div>

//       {/* Light Color Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         {/* Total Routes */}
//         <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm p-5 border border-blue-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-blue-700 font-medium mb-1">Total Routes</p>
//               <p className="text-3xl font-bold text-blue-900">{stats.totalRoutes}</p>
//             </div>
//             <div className="bg-white bg-opacity-60 p-3 rounded-lg">
//               <Route className="w-6 h-6 text-blue-600" />
//             </div>
//           </div>
//         </div>

//         {/* Total Stops */}
//         <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm p-5 border border-green-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-green-700 font-medium mb-1">Total Stops</p>
//               <p className="text-3xl font-bold text-green-900">{stats.totalStops}</p>
//             </div>
//             <div className="bg-white bg-opacity-60 p-3 rounded-lg">
//               <MapPin className="w-6 h-6 text-green-600" />
//             </div>
//           </div>
//         </div>

//         {/* Active Drivers */}
//         <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-sm p-5 border border-purple-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-purple-700 font-medium mb-1">Active Drivers</p>
//               <p className="text-3xl font-bold text-purple-900">{stats.activeDrivers}</p>
//             </div>
//             <div className="bg-white bg-opacity-60 p-3 rounded-lg">
//               <User className="w-6 h-6 text-purple-600" />
//             </div>
//           </div>
//         </div>

//         {/* Unassigned Routes */}
//         <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-sm p-5 border border-orange-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-orange-700 font-medium mb-1">Unassigned Routes</p>
//               <p className="text-3xl font-bold text-orange-900">{stats.unassignedRoutes}</p>
//             </div>
//             <div className="bg-white bg-opacity-60 p-3 rounded-lg">
//               <AlertCircle className="w-6 h-6 text-orange-600" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Add Route Button */}
//       <div className="mb-6">
//         <button
//           onClick={handleAddRoute}
//           className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center gap-2"
//         >
//           <Plus className="w-5 h-5" />
//           Add New Route
//         </button>
//       </div>

//       {/* Route List Table */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0">
//               <tr>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Route Name
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Number of Stops
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Assigned Driver
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Vehicle
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Start Location
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   End Location
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {routes.map((route) => (
//                 <tr key={route.id} className="hover:bg-blue-50 transition-colors">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center gap-2">
//                       <Navigation className="w-4 h-4 text-blue-600" />
//                       <span className="font-semibold text-gray-900">{route.routeName}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center gap-1">
//                       <MapPin className="w-4 h-4 text-green-600" />
//                       <span className="text-gray-700">{route.numberOfStops}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {route.assignedDriver ? (
//                       <div className="flex items-center gap-2">
//                         <User className="w-4 h-4 text-purple-600" />
//                         <span className="text-gray-700">{route.assignedDriver}</span>
//                       </div>
//                     ) : (
//                       <span className="text-orange-600 text-sm font-medium">Not Assigned</span>
//                     )}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {route.vehicleNumber ? (
//                       <div className="flex items-center gap-2">
//                         <Bus className="w-4 h-4 text-gray-600" />
//                         <span className="text-gray-700 text-sm">{route.vehicleNumber}</span>
//                       </div>
//                     ) : (
//                       <span className="text-gray-400 text-sm">-</span>
//                     )}
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="text-gray-700">{route.startLocation}</span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="text-gray-700">{route.endLocation}</span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`
//                       inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
//                       ${route.status === 'active' 
//                         ? 'bg-green-100 text-green-700 border border-green-200' 
//                         : 'bg-gray-100 text-gray-700 border border-gray-200'}
//                     `}>
//                       {route.status === 'active' ? 'Active' : 'Inactive'}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => handleEditRoute(route)}
//                         className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
//                         title="Edit Route"
//                       >
//                         <Edit2 className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => handleDeleteRoute(route)}
//                         className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
//                         title="Delete Route"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {routes.length === 0 && (
//           <div className="text-center py-12">
//             <Route className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//             <p className="text-gray-500">No routes found. Create your first route!</p>
//           </div>
//         )}
//       </div>

//       {/* Add/Edit Route Modal */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
//           <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
//             {/* Modal Header */}
//             <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-10 rounded-t-xl">
//               <div className="flex items-center gap-2">
//                 <Route className="w-6 h-6" />
//                 <h3 className="text-xl font-bold">
//                   {editingRoute ? 'Edit Route' : 'Add New Route'}
//                 </h3>
//               </div>
//               <button
//                 onClick={() => setShowAddModal(false)}
//                 title="Close route modal"
//                 className="p-2 hover:bg-blue-800 rounded-lg transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSaveRoute} className="p-6 space-y-6">
//               {/* Basic Information */}
//               <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
//                 <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                   <Navigation className="w-5 h-5 text-blue-600" />
//                   Basic Information
//                 </h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {/* Route Name */}
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Route Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.routeName}
//                       onChange={(e) => setFormData({ ...formData, routeName: e.target.value })}
//                       required
//                       placeholder="e.g., Route 1 - North Sector"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>

//                   {/* Start Location */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Start Location <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.startLocation}
//                       onChange={(e) => setFormData({ ...formData, startLocation: e.target.value })}
//                       required
//                       placeholder="e.g., School Campus"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>

//                   {/* End Location */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       End Location <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.endLocation}
//                       onChange={(e) => setFormData({ ...formData, endLocation: e.target.value })}
//                       required
//                       placeholder="e.g., North Area A"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Assignment Information */}
//               <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
//                 <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                   <User className="w-5 h-5 text-purple-600" />
//                   Assignment Details
//                 </h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {/* Driver Assignment */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Assign Driver
//                     </label>
//                     <select
//                       value={formData.driverId}
//                       onChange={(e) => setFormData({ ...formData, driverId: e.target.value })}
//                       title="Assign Driver"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option value="">Select Driver</option>
//                       {mockDrivers.map(driver => (
//                         <option key={driver.id} value={driver.id}>{driver.name}</option>
//                       ))}
//                     </select>
//                   </div>

//                   {/* Vehicle Assignment */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Assign Vehicle
//                     </label>
//                     <select
//                       value={formData.vehicleNumber}
//                       onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
//                       title="Assign Vehicle"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option value="">Select Vehicle</option>
//                       {mockVehicles.map(vehicle => (
//                         <option key={vehicle.id} value={vehicle.vehicleNumber}>{vehicle.vehicleNumber}</option>
//                       ))}
//                     </select>
//                   </div>

//                   {/* Route Status */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Route Status
//                     </label>
//                     <div className="flex gap-4">
//                       <label className="flex items-center gap-2 cursor-pointer">
//                         <input
//                           type="radio"
//                           name="status"
//                           value="active"
//                           checked={formData.status === 'active'}
//                           onChange={(e) => setFormData({ ...formData, status: 'active' })}
//                           className="w-4 h-4 text-blue-600"
//                         />
//                         <span className="text-sm text-gray-700">Active</span>
//                       </label>
//                       <label className="flex items-center gap-2 cursor-pointer">
//                         <input
//                           type="radio"
//                           name="status"
//                           value="inactive"
//                           checked={formData.status === 'inactive'}
//                           onChange={(e) => setFormData({ ...formData, status: 'inactive' })}
//                           className="w-4 h-4 text-blue-600"
//                         />
//                         <span className="text-sm text-gray-700">Inactive</span>
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Stops List */}
//               <div className="bg-green-50 rounded-lg p-4 border border-green-200">
//                 <div className="flex items-center justify-between mb-4">
//                   <h4 className="font-semibold text-gray-900 flex items-center gap-2">
//                     <MapPin className="w-5 h-5 text-green-600" />
//                     Route Stops
//                   </h4>
//                   <button
//                     type="button"
//                     onClick={handleAddStop}
//                     className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-1"
//                   >
//                     <Plus className="w-4 h-4" />
//                     Add Stop
//                   </button>
//                 </div>

//                 {formData.stops.length === 0 ? (
//                   <div className="text-center py-6 text-gray-500 text-sm">
//                     No stops added yet. Click "Add Stop" to create route stops.
//                   </div>
//                 ) : (
//                   <div className="space-y-3">
//                     {formData.stops.map((stop, index) => (
//                       <div key={stop.id} className="bg-white rounded-lg p-4 border border-green-200">
//                         <div className="flex items-start justify-between mb-3">
//                           <span className="text-sm font-semibold text-gray-700">Stop {index + 1}</span>
//                           <button
//                             type="button"
//                             onClick={() => handleRemoveStop(stop.id)}
//                             title="Delete stop"
//                             className="text-red-600 hover:text-red-700 p-1"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                           {/* Stop Name */}
//                           <div>
//                             <label className="block text-xs font-medium text-gray-600 mb-1">
//                               Stop Name
//                             </label>
//                             <input
//                               type="text"
//                               value={stop.name}
//                               onChange={(e) => handleUpdateStop(stop.id, 'name', e.target.value)}
//                               title="Stop name"
//                               placeholder="e.g., Green Park"
//                               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                             />
//                           </div>

//                           {/* Pickup Time */}
//                           <div>
//                             <label className="block text-xs font-medium text-gray-600 mb-1">
//                               Pickup Time
//                             </label>
//                             <div className="relative">
//                               <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                               <input
//                                 type="time"
//                                 value={stop.pickupTime}
//                                 onChange={(e) => handleUpdateStop(stop.id, 'pickupTime', e.target.value)}
//                                 title="Pickup time"
//                                 className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                               />
//                             </div>
//                           </div>

//                           {/* Drop Time */}
//                           <div>
//                             <label className="block text-xs font-medium text-gray-600 mb-1">
//                               Drop Time
//                             </label>
//                             <div className="relative">
//                               <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                               <input
//                                 type="time"
//                                 value={stop.dropTime}
//                                 onChange={(e) => handleUpdateStop(stop.id, 'dropTime', e.target.value)}
//                                 title="Drop time"
//                                 className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Warning if no driver assigned */}
//               {!formData.driverId && (
//                 <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start gap-3">
//                   <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
//                   <div>
//                     <p className="font-medium text-orange-900 text-sm">No Driver Assigned</p>
//                     <p className="text-orange-700 text-sm mt-1">
//                       This route doesn't have an assigned driver. Consider assigning a driver before activating the route.
//                     </p>
//                   </div>
//                 </div>
//               )}

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
//                   {editingRoute ? 'Update Route' : 'Save Route'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && deletingRoute && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
//             {/* Modal Header */}
//             <div className="bg-red-600 text-white px-6 py-4 flex items-center gap-3 rounded-t-xl">
//               <AlertCircle className="w-6 h-6" />
//               <h3 className="text-xl font-bold">Delete Route</h3>
//             </div>

//             {/* Modal Content */}
//             <div className="p-6">
//               <p className="text-gray-700 mb-4">
//                 Are you sure you want to delete <strong>{deletingRoute.routeName}</strong>?
//               </p>

//               {deletingRoute.hasActiveAssignments && (
//                 <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
//                   <div className="flex items-start gap-3">
//                     <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
//                     <div>
//                       <p className="font-semibold text-red-900 text-sm">Warning: Active Assignments</p>
//                       <p className="text-red-700 text-sm mt-1">
//                         This route has students currently assigned. Deleting it will affect their transport assignments.
//                         Please reassign students before deleting this route.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {!deletingRoute.hasActiveAssignments && (
//                 <p className="text-gray-600 text-sm">
//                   This action cannot be undone.
//                 </p>
//               )}
//             </div>

//             {/* Action Buttons */}
//             <div className="px-6 pb-6 flex gap-3">
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 disabled={deletingRoute.hasActiveAssignments}
//                 className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
//                   deletingRoute.hasActiveAssignments
//                     ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                     : 'bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg'
//                 }`}
//               >
//                 {deletingRoute.hasActiveAssignments ? 'Cannot Delete' : 'Delete Route'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RouteManagementScreen;



import React, { useState } from 'react';
import { Route, MapPin, User, AlertCircle, Plus, Edit2, Trash2, X, Clock, Navigation, Bus } from 'lucide-react';

interface Stop {
  id: string;
  name: string;
  pickupTime: string;
  dropTime: string;
}

interface RouteData {
  id: string;
  routeName: string;
  numberOfStops: number;
  assignedDriver: string;
  driverId: string;
  vehicleNumber?: string;
  startLocation: string;
  endLocation: string;
  status: 'active' | 'inactive';
  stops: Stop[];
  hasActiveAssignments?: boolean;
}

const mockDrivers = [
  { id: '1', name: 'Ravi Kumar' },
  { id: '2', name: 'Sunil Singh' },
  { id: '3', name: 'Prakash Sharma' },
  { id: '4', name: 'Amit Patel' },
  { id: '5', name: 'Rajesh Reddy' }
];

const mockVehicles = [
  { id: '1', vehicleNumber: 'KA01AB1234' },
  { id: '2', vehicleNumber: 'KA01CD5678' },
  { id: '3', vehicleNumber: 'KA01EF9012' },
  { id: '4', vehicleNumber: 'KA01GH3456' }
];

const mockRoutes = [
  {
    id: '1', routeName: 'Route 1 - North Sector', numberOfStops: 10,
    assignedDriver: 'Ravi Kumar', driverId: '1', vehicleNumber: 'KA01AB1234',
    startLocation: 'School Campus', endLocation: 'North Area A', status: 'active',
    stops: [
      { id: 's1', name: 'School Campus', pickupTime: '07:00', dropTime: '15:30' },
      { id: 's2', name: 'Green Park', pickupTime: '07:15', dropTime: '15:15' },
      { id: 's3', name: 'Central Mall', pickupTime: '07:30', dropTime: '15:00' }
    ],
    hasActiveAssignments: true
  },
  {
    id: '2', routeName: 'Route 2 - South Campus', numberOfStops: 8,
    assignedDriver: 'Sunil Singh', driverId: '2', vehicleNumber: 'KA01CD5678',
    startLocation: 'School Campus', endLocation: 'South Area B', status: 'active',
    stops: [
      { id: 's4', name: 'School Campus', pickupTime: '07:00', dropTime: '15:30' },
      { id: 's5', name: 'Lake View', pickupTime: '07:20', dropTime: '15:10' }
    ],
    hasActiveAssignments: false
  },
  {
    id: '3', routeName: 'Route 3 - East Zone', numberOfStops: 12,
    assignedDriver: 'Prakash Sharma', driverId: '3', vehicleNumber: '',
    startLocation: 'School Campus', endLocation: 'East Tech Park', status: 'active',
    stops: [{ id: 's6', name: 'School Campus', pickupTime: '07:00', dropTime: '15:30' }],
    hasActiveAssignments: true
  },
  {
    id: '4', routeName: 'Route 4 - West Point', numberOfStops: 6,
    assignedDriver: '', driverId: '', vehicleNumber: '',
    startLocation: 'School Campus', endLocation: 'West Junction', status: 'inactive',
    stops: [], hasActiveAssignments: false
  }
];

const emptyForm: RouteData = {
  id: '', routeName: '', numberOfStops: 0,
  assignedDriver: '', driverId: '', vehicleNumber: '',
  startLocation: '', endLocation: '', status: 'active',
  stops: [], hasActiveAssignments: false
};

const inputCls = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none";
const labelCls = "block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide";

export default function RouteManagementScreen() {
  const [routes, setRoutes] = useState(mockRoutes);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingRoute, setEditingRoute] = useState<RouteData | null>(null);
  const [deletingRoute, setDeletingRoute] = useState<RouteData | null>(null);
  const [formData, setFormData] = useState<RouteData>(emptyForm);

  const stats = {
    totalRoutes: routes.length,
    totalStops: routes.reduce((sum, r) => sum + r.numberOfStops, 0),
    activeDrivers: new Set(routes.filter(r => r.driverId).map(r => r.driverId)).size,
    unassignedRoutes: routes.filter(r => !r.driverId).length
  };

  const openAdd = () => { setEditingRoute(null); setFormData(emptyForm); setShowAddModal(true); };
  const openEdit = (r: RouteData) => { setEditingRoute(r); setFormData({ ...r }); setShowAddModal(true); };
  const openDelete = (r: RouteData) => { setDeletingRoute(r); setShowDeleteModal(true); };

  const confirmDelete = () => {
    if (!deletingRoute) return;
    setRoutes(routes.filter(r => r.id !== deletingRoute.id));
    setShowDeleteModal(false); setDeletingRoute(null);
  };

  const handleSaveRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.routeName || !formData.startLocation || !formData.endLocation) {
      alert('Please fill in all required fields'); return;
    }
    const driverName = mockDrivers.find(d => d.id === formData.driverId)?.name || '';
    const record = { ...formData, assignedDriver: driverName, numberOfStops: formData.stops.length, vehicleNumber: formData.vehicleNumber || '', hasActiveAssignments: formData.hasActiveAssignments || false };
    if (editingRoute) {
      setRoutes(routes.map(r => r.id === editingRoute.id ? record : r));
    } else {
      setRoutes([...routes, { ...record, id: Date.now().toString() }]);
    }
    setShowAddModal(false); setEditingRoute(null);
  };

  const handleAddStop = () => {
    setFormData({ ...formData, stops: [...formData.stops, { id: Date.now().toString(), name: '', pickupTime: '', dropTime: '' }] });
  };

  const handleRemoveStop = (id: string) => setFormData({ ...formData, stops: formData.stops.filter((s: Stop) => s.id !== id) });

  const handleUpdateStop = (id: string, field: keyof Stop, value: string) =>
    setFormData({ ...formData, stops: formData.stops.map((s: Stop) => s.id === id ? { ...s, [field]: value } : s) });

  return (
    /* ROOT: full viewport, no overflow-x */
    <div style={{ minHeight: '100vh', width: '100%', overflowX: 'hidden', backgroundColor: '#f8fafc', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '100%', padding: '16px', boxSizing: 'border-box' }}>

        {/* HEADER */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Route className="w-7 h-7 text-blue-600" /> Route Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage school transport routes, stops, and driver assignments</p>
        </div>

        {/* STAT CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '20px' }}>
          {[
            { label: 'Total Routes', value: stats.totalRoutes, icon: <Route className="w-5 h-5 text-blue-600" />, bg: 'from-blue-50 to-blue-100', border: 'border-blue-200', text: 'text-blue-900', sub: 'text-blue-700' },
            { label: 'Total Stops', value: stats.totalStops, icon: <MapPin className="w-5 h-5 text-green-600" />, bg: 'from-green-50 to-green-100', border: 'border-green-200', text: 'text-green-900', sub: 'text-green-700' },
            { label: 'Active Drivers', value: stats.activeDrivers, icon: <User className="w-5 h-5 text-purple-600" />, bg: 'from-purple-50 to-purple-100', border: 'border-purple-200', text: 'text-purple-900', sub: 'text-purple-700' },
            { label: 'Unassigned', value: stats.unassignedRoutes, icon: <AlertCircle className="w-5 h-5 text-orange-600" />, bg: 'from-orange-50 to-orange-100', border: 'border-orange-200', text: 'text-orange-900', sub: 'text-orange-700' },
          ].map(s => (
            <div key={s.label} className={`bg-gradient-to-br ${s.bg} border ${s.border} rounded-xl p-4 flex items-center justify-between`}>
              <div>
                <p className={`text-xs font-semibold ${s.sub}`}>{s.label}</p>
                <p className={`text-3xl font-bold ${s.text} mt-1`}>{s.value}</p>
              </div>
              <div className="bg-white bg-opacity-60 p-2 rounded-lg">{s.icon}</div>
            </div>
          ))}
        </div>

        {/* ADD BUTTON */}
        <div className="mb-4">
          <button onClick={openAdd} className="bg-blue-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">
            <Plus className="w-4 h-4" /> Add New Route
          </button>
        </div>

        {/* TABLE CARD */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm" style={{ overflow: 'hidden' }}>
          {/* Only this div scrolls horizontally */}
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ minWidth: '780px', width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
                  {['Route Name', 'Stops', 'Assigned Driver', 'Vehicle', 'Start', 'End', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {routes.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', padding: '48px 16px', color: '#94a3b8' }}>
                      <Route style={{ width: 36, height: 36, margin: '0 auto 8px', opacity: 0.4 }} />
                      <p>No routes found. Create your first route!</p>
                    </td>
                  </tr>
                ) : routes.map((route, idx) => {
                  const rowBg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
                  return (
                    <tr key={route.id} style={{ backgroundColor: rowBg, borderBottom: '1px solid #e2e8f0' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eff6ff'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = rowBg}>

                      {/* Route Name */}
                      <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                        <div className="flex items-center gap-1.5">
                          <Navigation className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                          <span style={{ fontWeight: 600, color: '#1e293b' }}>{route.routeName}</span>
                        </div>
                      </td>

                      {/* Stops */}
                      <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-green-500" />
                          <span style={{ color: '#475569' }}>{route.numberOfStops}</span>
                        </div>
                      </td>

                      {/* Driver */}
                      <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                        {route.assignedDriver ? (
                          <div className="flex items-center gap-1.5">
                            <User className="w-3 h-3 text-purple-500" />
                            <span style={{ color: '#475569', fontSize: 13 }}>{route.assignedDriver}</span>
                          </div>
                        ) : (
                          <span style={{ color: '#ea580c', fontSize: 12, fontWeight: 600 }}>Not Assigned</span>
                        )}
                      </td>

                      {/* Vehicle */}
                      <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                        {route.vehicleNumber ? (
                          <div className="flex items-center gap-1.5">
                            <Bus className="w-3 h-3 text-gray-400" />
                            <span style={{ color: '#475569', fontSize: 12 }}>{route.vehicleNumber}</span>
                          </div>
                        ) : (
                          <span style={{ color: '#94a3b8', fontSize: 12 }}>—</span>
                        )}
                      </td>

                      {/* Start */}
                      <td style={{ padding: '10px 14px', color: '#475569', fontSize: 13 }}>{route.startLocation}</td>

                      {/* End */}
                      <td style={{ padding: '10px 14px', color: '#475569', fontSize: 13 }}>{route.endLocation}</td>

                      {/* Status */}
                      <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', padding: '3px 10px',
                          borderRadius: 999, fontSize: 11, fontWeight: 600, border: '1px solid',
                          backgroundColor: route.status === 'active' ? '#dcfce7' : '#f1f5f9',
                          color: route.status === 'active' ? '#15803d' : '#64748b',
                          borderColor: route.status === 'active' ? '#bbf7d0' : '#e2e8f0'
                        }}>
                          {route.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                        <div className="flex gap-1.5">
                          <button onClick={() => openEdit({ ...route, status: route.status as 'active' | 'inactive' })} title="Edit" className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => openDelete({ ...route, status: route.status as 'active' | 'inactive' })} title="Delete" className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div style={{ padding: '8px 16px', borderTop: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
            <span style={{ fontSize: 12, color: '#94a3b8' }}>Showing {routes.length} route{routes.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* ADD / EDIT MODAL */}
        {showAddModal && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, zIndex: 50, overflowY: 'auto' }}>
            <div style={{ backgroundColor: '#fff', borderRadius: 16, width: '100%', maxWidth: 700, maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
              {/* Header */}
              <div style={{ background: 'linear-gradient(135deg,#2563eb,#1d4ed8)', color: '#fff', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '16px 16px 0 0', position: 'sticky', top: 0, zIndex: 10 }}>
                <div className="flex items-center gap-2">
                  <Route className="w-5 h-5" />
                  <span style={{ fontWeight: 700, fontSize: 16 }}>{editingRoute ? 'Edit Route' : 'Add New Route'}</span>
                </div>
                <button onClick={() => setShowAddModal(false)} className="p-1.5 hover:bg-blue-800 rounded-lg transition-colors"><X className="w-4 h-4" /></button>
              </div>

              <form onSubmit={handleSaveRoute} style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>

                {/* Basic Info */}
                <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, padding: 16 }}>
                  <p className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-1.5"><Navigation className="w-4 h-4 text-blue-600" /> Basic Information</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label className={labelCls}>Route Name *</label>
                      <input className={inputCls} placeholder="e.g., Route 1 - North Sector" value={formData.routeName} onChange={e => setFormData({ ...formData, routeName: e.target.value })} required />
                    </div>
                    <div>
                      <label className={labelCls}>Start Location *</label>
                      <input className={inputCls} placeholder="e.g., School Campus" value={formData.startLocation} onChange={e => setFormData({ ...formData, startLocation: e.target.value })} required />
                    </div>
                    <div>
                      <label className={labelCls}>End Location *</label>
                      <input className={inputCls} placeholder="e.g., North Area A" value={formData.endLocation} onChange={e => setFormData({ ...formData, endLocation: e.target.value })} required />
                    </div>
                  </div>
                </div>

                {/* Assignment */}
                <div style={{ backgroundColor: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: 10, padding: 16 }}>
                  <p className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-1.5"><User className="w-4 h-4 text-purple-600" /> Assignment Details</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
                    <div>
                      <label className={labelCls}>Assign Driver</label>
                      <select className={inputCls} value={formData.driverId} onChange={e => setFormData({ ...formData, driverId: e.target.value })}>
                        <option value="">Select Driver</option>
                        {mockDrivers.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Assign Vehicle</label>
                      <select className={inputCls} value={formData.vehicleNumber} onChange={e => setFormData({ ...formData, vehicleNumber: e.target.value })}>
                        <option value="">Select Vehicle</option>
                        {mockVehicles.map(v => <option key={v.id} value={v.vehicleNumber}>{v.vehicleNumber}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Route Status</label>
                      <div className="flex gap-4 mt-1">
                        {['active', 'inactive'].map(s => (
                          <label key={s} className="flex items-center gap-1.5 cursor-pointer">
                            <input type="radio" name="status" value={s} checked={formData.status === s} onChange={() => setFormData({ ...formData, status: s as 'active' | 'inactive' })} className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-gray-700 capitalize">{s}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stops */}
                <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: 16 }}>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-gray-800 flex items-center gap-1.5"><MapPin className="w-4 h-4 text-green-600" /> Route Stops ({formData.stops.length})</p>
                    <button type="button" onClick={handleAddStop} className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-lg hover:bg-green-700 transition-colors">
                      <Plus className="w-3.5 h-3.5" /> Add Stop
                    </button>
                  </div>

                  {formData.stops.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '20px 0', color: '#94a3b8', fontSize: 13 }}>No stops added yet. Click "Add Stop" to begin.</div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {formData.stops.map((stop, idx) => (
                        <div key={stop.id} style={{ backgroundColor: '#fff', border: '1px solid #bbf7d0', borderRadius: 8, padding: 12 }}>
                          <div className="flex items-center justify-between mb-2">
                            <span style={{ fontSize: 12, fontWeight: 700, color: '#166534' }}>Stop {idx + 1}</span>
                            <button type="button" onClick={() => handleRemoveStop(stop.id)} className="p-1 text-red-500 hover:text-red-700 transition-colors">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
                            <div>
                              <label className={labelCls}>Stop Name</label>
                              <input className={inputCls} placeholder="e.g., Green Park" value={stop.name} onChange={e => handleUpdateStop(stop.id, 'name', e.target.value)} />
                            </div>
                            <div>
                              <label className={labelCls}>Pickup Time</label>
                              <div className="relative">
                                <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                <input type="time" className={inputCls + ' pl-8'} value={stop.pickupTime} onChange={e => handleUpdateStop(stop.id, 'pickupTime', e.target.value)} />
                              </div>
                            </div>
                            <div>
                              <label className={labelCls}>Drop Time</label>
                              <div className="relative">
                                <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                <input type="time" className={inputCls + ' pl-8'} value={stop.dropTime} onChange={e => handleUpdateStop(stop.id, 'dropTime', e.target.value)} />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* No driver warning */}
                {!formData.driverId && (
                  <div style={{ backgroundColor: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 8, padding: 12 }} className="flex gap-3">
                    <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#9a3412' }}>No Driver Assigned</p>
                      <p style={{ fontSize: 12, color: '#c2410c', marginTop: 2 }}>Consider assigning a driver before activating this route.</p>
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 pt-2 border-t border-gray-100">
                  <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors shadow-sm">
                    {editingRoute ? 'Update Route' : 'Save Route'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* DELETE MODAL */}
        {showDeleteModal && deletingRoute && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, zIndex: 50 }}>
            <div style={{ backgroundColor: '#fff', borderRadius: 16, width: '100%', maxWidth: 420, boxShadow: '0 25px 50px rgba(0,0,0,0.25)', overflow: 'hidden' }}>
              <div style={{ background: '#dc2626', color: '#fff', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <AlertCircle className="w-5 h-5" />
                <span style={{ fontWeight: 700, fontSize: 15 }}>Delete Route</span>
              </div>
              <div style={{ padding: '20px 18px' }}>
                <p className="text-gray-700 text-sm mb-3">Are you sure you want to delete <strong>{deletingRoute.routeName}</strong>?</p>
                {deletingRoute.hasActiveAssignments ? (
                  <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: 12 }} className="flex gap-3">
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#991b1b' }}>Warning: Active Assignments</p>
                      <p style={{ fontSize: 12, color: '#b91c1c', marginTop: 2 }}>This route has students currently assigned. Please reassign them before deleting.</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-red-500 font-medium">⚠ This action cannot be undone.</p>
                )}
              </div>
              <div className="flex gap-3 px-4 pb-4">
                <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors">Cancel</button>
                <button
                  onClick={confirmDelete}
                  disabled={deletingRoute.hasActiveAssignments}
                  style={{ flex: 1 }}
                  className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors ${deletingRoute.hasActiveAssignments ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700'}`}
                >
                  {deletingRoute.hasActiveAssignments ? 'Cannot Delete' : 'Delete Route'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}