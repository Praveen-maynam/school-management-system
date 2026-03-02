// import React, { useState, useEffect } from 'react';
// import { MapPin, Truck, AlertTriangle, Clock, Search, RotateCcw, X, Upload, Navigation, Activity } from 'lucide-react';

// // Types
// interface Vehicle {
//   id: string;
//   vehicleNumber: string;
//   routeName: string;
//   driverName: string;
//   status: 'on-route' | 'idle' | 'breakdown' | 'maintenance';
//   currentLocation: string;
//   lastUpdated: string;
//   speed: number;
//   coordinates: { lat: number; lng: number };
//   nextStop?: string;
//   eta?: string;
// }

// interface Issue {
//   vehicleNumber: string;
//   driverName: string;
//   issueType: string;
//   description: string;
//   priority: string;
//   photo?: File;
// }

// // Mock data
// const mockVehicles: Vehicle[] = [
//   {
//     id: '1',
//     vehicleNumber: 'KA01AB1234',
//     routeName: 'Route A - North Sector',
//     driverName: 'Rajesh Kumar',
//     status: 'on-route',
//     currentLocation: 'Stop 5 - Green Park',
//     lastUpdated: '2 mins ago',
//     speed: 35,
//     coordinates: { lat: 12.9716, lng: 77.5946 },
//     nextStop: 'Stop 6 - Central Mall',
//     eta: '5 mins'
//   },
//   {
//     id: '2',
//     vehicleNumber: 'KA01CD5678',
//     routeName: 'Route B - South Campus',
//     driverName: 'Suresh Patil',
//     status: 'idle',
//     currentLocation: 'School Campus',
//     lastUpdated: '1 min ago',
//     speed: 0,
//     coordinates: { lat: 12.9352, lng: 77.6245 }
//   },
//   {
//     id: '3',
//     vehicleNumber: 'KA01EF9012',
//     routeName: 'Route C - East Zone',
//     driverName: 'Amit Sharma',
//     status: 'on-route',
//     currentLocation: 'Stop 3 - Lake View',
//     lastUpdated: '3 mins ago',
//     speed: 28,
//     coordinates: { lat: 12.9698, lng: 77.7499 },
//     nextStop: 'Stop 4 - Tech Park',
//     eta: '8 mins'
//   },
//   {
//     id: '4',
//     vehicleNumber: 'KA01GH3456',
//     routeName: 'Route D - West Point',
//     driverName: 'Ramesh Reddy',
//     status: 'breakdown',
//     currentLocation: 'Highway Junction',
//     lastUpdated: '15 mins ago',
//     speed: 0,
//     coordinates: { lat: 12.9141, lng: 77.5021 }
//   },
//   {
//     id: '5',
//     vehicleNumber: 'KA01IJ7890',
//     routeName: 'Route E - City Center',
//     driverName: 'Prakash Singh',
//     status: 'on-route',
//     currentLocation: 'Stop 7 - Market Area',
//     lastUpdated: '1 min ago',
//     speed: 32,
//     coordinates: { lat: 12.9591, lng: 77.7172 },
//     nextStop: 'Stop 8 - Railway Station',
//     eta: '6 mins'
//   },
//   {
//     id: '6',
//     vehicleNumber: 'KA01KL2345',
//     routeName: 'Route A - North Sector',
//     driverName: 'Venkat Rao',
//     status: 'maintenance',
//     currentLocation: 'Service Center',
//     lastUpdated: '45 mins ago',
//     speed: 0,
//     coordinates: { lat: 12.9279, lng: 77.6271 }
//   }
// ];

// const VehicleTrackingScreen: React.FC = () => {
//   const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
//   const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(mockVehicles);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [routeFilter, setRouteFilter] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [driverFilter, setDriverFilter] = useState('');
//   const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
//   const [showMap, setShowMap] = useState(false);
//   const [showIssueModal, setShowIssueModal] = useState(false);
//   const [issueFormData, setIssueFormData] = useState<Issue>({
//     vehicleNumber: '',
//     driverName: '',
//     issueType: '',
//     description: '',
//     priority: 'medium'
//   });

//   // Calculate summary stats
//   const stats = {
//     total: vehicles.length,
//     onRoute: vehicles.filter(v => v.status === 'on-route').length,
//     idle: vehicles.filter(v => v.status === 'idle').length,
//     issues: vehicles.filter(v => v.status === 'breakdown' || v.status === 'maintenance').length
//   };

//   // Get unique routes and drivers for filters
//   const routes = Array.from(new Set(vehicles.map(v => v.routeName)));
//   const drivers = Array.from(new Set(vehicles.map(v => v.driverName)));

//   // Filter logic
//   useEffect(() => {
//     let filtered = vehicles;

//     if (searchTerm) {
//       filtered = filtered.filter(v => 
//         v.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (routeFilter) {
//       filtered = filtered.filter(v => v.routeName === routeFilter);
//     }

//     if (statusFilter) {
//       filtered = filtered.filter(v => v.status === statusFilter);
//     }

//     if (driverFilter) {
//       filtered = filtered.filter(v => v.driverName === driverFilter);
//     }

//     setFilteredVehicles(filtered);
//   }, [searchTerm, routeFilter, statusFilter, driverFilter, vehicles]);

//   // Reset filters
//   const handleReset = () => {
//     setSearchTerm('');
//     setRouteFilter('');
//     setStatusFilter('');
//     setDriverFilter('');
//   };

//   // Handle track button
//   const handleTrack = (vehicle: Vehicle) => {
//     setSelectedVehicle(vehicle);
//     setShowMap(true);
//   };

//   // Handle report issue
//   const handleReportIssue = (vehicle: Vehicle) => {
//     setIssueFormData({
//       vehicleNumber: vehicle.vehicleNumber,
//       driverName: vehicle.driverName,
//       issueType: '',
//       description: '',
//       priority: 'medium'
//     });
//     setShowIssueModal(true);
//   };

//   // Submit issue
//   const handleSubmitIssue = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Issue submitted:', issueFormData);
//     // In production: send to API
//     alert('Issue reported successfully!');
//     setShowIssueModal(false);
//   };

//   // Status badge styling
//   const getStatusStyle = (status: string) => {
//     switch (status) {
//       case 'on-route':
//         return 'bg-green-100 text-green-700 border-green-200';
//       case 'idle':
//         return 'bg-gray-100 text-gray-700 border-gray-200';
//       case 'breakdown':
//         return 'bg-red-100 text-red-700 border-red-200';
//       case 'maintenance':
//         return 'bg-yellow-100 text-yellow-700 border-yellow-200';
//       default:
//         return 'bg-gray-100 text-gray-700 border-gray-200';
//     }
//   };

//   const getStatusText = (status: string) => {
//     return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Vehicle Tracking</h1>
//         <p className="text-gray-600">Real-time monitoring of school transport fleet</p>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Total Vehicles</p>
//               <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
//             </div>
//             <div className="bg-blue-100 p-3 rounded-lg">
//               <Truck className="w-6 h-6 text-blue-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Vehicles On Route</p>
//               <p className="text-3xl font-bold text-green-600">{stats.onRoute}</p>
//             </div>
//             <div className="bg-green-100 p-3 rounded-lg">
//               <Navigation className="w-6 h-6 text-green-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Idle Vehicles</p>
//               <p className="text-3xl font-bold text-gray-600">{stats.idle}</p>
//             </div>
//             <div className="bg-gray-100 p-3 rounded-lg">
//               <Clock className="w-6 h-6 text-gray-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Vehicles with Issues</p>
//               <p className="text-3xl font-bold text-red-600">{stats.issues}</p>
//             </div>
//             <div className="bg-red-100 p-3 rounded-lg">
//               <AlertTriangle className="w-6 h-6 text-red-600" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filter & Search Panel */}
//       <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
//         <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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

//           {/* Route Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Route Name
//             </label>
//             <select
//               value={routeFilter}
//               onChange={(e) => setRouteFilter(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="">All Routes</option>
//               {routes.map(route => (
//                 <option key={route} value={route}>{route}</option>
//               ))}
//             </select>
//           </div>

//           {/* Status Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Status
//             </label>
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="">All Status</option>
//               <option value="on-route">On Route</option>
//               <option value="idle">Idle</option>
//               <option value="breakdown">Breakdown</option>
//               <option value="maintenance">Maintenance</option>
//             </select>
//           </div>

//           {/* Driver Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Driver Name
//             </label>
//             <select
//               value={driverFilter}
//               onChange={(e) => setDriverFilter(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="">All Drivers</option>
//               {drivers.map(driver => (
//                 <option key={driver} value={driver}>{driver}</option>
//               ))}
//             </select>
//           </div>

//           {/* Buttons */}
//           <div className="flex items-end gap-2">
//             <button
//               onClick={handleReset}
//               className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
//             >
//               <RotateCcw className="w-4 h-4" />
//               Reset
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Vehicle Tracking Table */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full min-w-0">
//         <div className="w-full min-w-0">
//           <table className="w-full min-w-0 text-xs sm:text-sm md:text-base">
//             <thead className="bg-gray-50 sticky top-0">
//               <tr>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Vehicle Number
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Route Name
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Driver Name
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Current Location
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Last Updated
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Speed
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredVehicles.map((vehicle) => (
//                 <tr key={vehicle.id} className="hover:bg-gray-50 transition-colors">
//                   <td className="px-4 py-2 break-words">
//                     <div className="flex items-center gap-2">
//                       <Truck className="w-4 h-4 text-gray-400" />
//                       <span className="font-semibold text-gray-900">{vehicle.vehicleNumber}</span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-2 break-words">
//                     <span className="text-sm text-gray-700">{vehicle.routeName}</span>
//                   </td>
//                   <td className="px-4 py-2 break-words">
//                     <span className="text-sm text-gray-700">{vehicle.driverName}</span>
//                   </td>
//                   <td className="px-4 py-2 break-words">
//                     <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(vehicle.status)}`}>
//                       {vehicle.status === 'on-route' && <Activity className="w-3 h-3 mr-1" />}
//                       {getStatusText(vehicle.status)}
//                     </span>
//                   </td>
//                   <td className="px-4 py-2 break-words">
//                     <div className="flex items-start gap-1">
//                       <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
//                       <span className="text-sm text-gray-700">{vehicle.currentLocation}</span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-2 break-words">
//                     <div className="flex items-center gap-1">
//                       <Clock className="w-4 h-4 text-gray-400" />
//                       <span className="text-sm text-gray-600">{vehicle.lastUpdated}</span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-2 break-words max-w-[80px]">
//                     <span className="text-sm font-medium text-gray-700">{vehicle.speed} km/h</span>
//                   </td>
//                   <td className="px-4 py-2 break-words max-w-[120px]">
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => handleTrack(vehicle)}
//                         className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
//                       >
//                         Track
//                       </button>
//                       <button
//                         onClick={() => handleReportIssue(vehicle)}
//                         className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
//                       >
//                         Report Issue
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {filteredVehicles.length === 0 && (
//           <div className="text-center py-12">
//             <Truck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//             <p className="text-gray-500">No vehicles found matching your filters</p>
//           </div>
//         )}
//       </div>

//       {/* Live Tracking Map Modal */}
//       {showMap && selectedVehicle && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
//             {/* Modal Header */}
//             <div className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
//               <div>
//                 <h3 className="text-xl font-bold">Live Vehicle Tracking</h3>
//                 <p className="text-blue-100 text-sm">{selectedVehicle.vehicleNumber} - {selectedVehicle.routeName}</p>
//               </div>
//               <button
//                 onClick={() => setShowMap(false)}
//                 className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Vehicle Info Bar */}
//             <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//                 <div>
//                   <span className="text-gray-600">Driver:</span>
//                   <span className="ml-2 font-semibold text-gray-900">{selectedVehicle.driverName}</span>
//                 </div>
//                 <div>
//                   <span className="text-gray-600">Speed:</span>
//                   <span className="ml-2 font-semibold text-gray-900">{selectedVehicle.speed} km/h</span>
//                 </div>
//                 <div>
//                   <span className="text-gray-600">Status:</span>
//                   <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(selectedVehicle.status)}`}>
//                     {getStatusText(selectedVehicle.status)}
//                   </span>
//                 </div>
//                 <div>
//                   <span className="text-gray-600">Last Update:</span>
//                   <span className="ml-2 font-semibold text-gray-900">{selectedVehicle.lastUpdated}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Map Container */}
//             <div className="relative bg-gray-100 h-96">
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="text-center">
//                   <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-3" />
//                   <p className="text-gray-700 font-semibold mb-1">Map Integration</p>
//                   <p className="text-sm text-gray-500">GPS: {selectedVehicle.coordinates.lat}, {selectedVehicle.coordinates.lng}</p>
//                   <p className="text-sm text-gray-500 mt-2">Current: {selectedVehicle.currentLocation}</p>
//                   {selectedVehicle.nextStop && (
//                     <div className="mt-4 bg-white rounded-lg shadow-sm p-4 inline-block">
//                       <p className="text-sm text-gray-600 mb-1">Next Stop</p>
//                       <p className="font-semibold text-gray-900">{selectedVehicle.nextStop}</p>
//                       <p className="text-sm text-blue-600 mt-1">ETA: {selectedVehicle.eta}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3">
//                 <p className="text-xs text-gray-600 mb-1">Auto-refresh</p>
//                 <div className="flex items-center gap-2">
//                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                   <span className="text-sm font-medium text-gray-900">Active</span>
//                 </div>
//               </div>
//             </div>

//             {/* Route Info */}
//             <div className="px-6 py-4 bg-white">
//               <h4 className="font-semibold text-gray-900 mb-3">Route Information</h4>
//               <div className="space-y-2 text-sm">
//                 <p className="text-gray-600">In production, this map would display:</p>
//                 <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
//                   <li>Real-time vehicle location with live marker</li>
//                   <li>Complete route path with all stops</li>
//                   <li>Estimated time of arrival for next stops</li>
//                   <li>Traffic conditions and delays</li>
//                   <li>Auto-refresh every 10-30 seconds</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Report Issue Modal */}
//       {showIssueModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
//             {/* Modal Header */}
//             <div className="bg-red-600 text-white px-6 py-4 flex items-center justify-between rounded-t-lg">
//               <div className="flex items-center gap-2">
//                 <AlertTriangle className="w-5 h-5" />
//                 <h3 className="text-xl font-bold">Report Issue</h3>
//               </div>
//               <button
//                 onClick={() => setShowIssueModal(false)}
//                 className="p-2 hover:bg-red-700 rounded-lg transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSubmitIssue} className="p-6 space-y-4">
//               {/* Vehicle Number */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Vehicle Number
//                 </label>
//                 <input
//                   type="text"
//                   value={issueFormData.vehicleNumber}
//                   readOnly
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
//                 />
//               </div>

//               {/* Driver Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Driver Name
//                 </label>
//                 <input
//                   type="text"
//                   value={issueFormData.driverName}
//                   readOnly
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
//                 />
//               </div>

//               {/* Issue Type */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Issue Type <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   value={issueFormData.issueType}
//                   onChange={(e) => setIssueFormData({ ...issueFormData, issueType: e.target.value })}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                 >
//                   <option value="">Select issue type</option>
//                   <option value="breakdown">Breakdown</option>
//                   <option value="delay">Delay</option>
//                   <option value="accident">Accident</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Issue Description <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                   value={issueFormData.description}
//                   onChange={(e) => setIssueFormData({ ...issueFormData, description: e.target.value })}
//                   required
//                   rows={4}
//                   placeholder="Describe the issue in detail..."
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
//                 />
//               </div>

//               {/* Photo Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Upload Photo (Optional)
//                 </label>
//                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-red-400 transition-colors">
//                   <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => setIssueFormData({ ...issueFormData, photo: e.target.files?.[0] })}
//                     className="hidden"
//                     id="photo-upload"
//                   />
//                   <label
//                     htmlFor="photo-upload"
//                     className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer"
//                   >
//                     Click to upload image
//                   </label>
//                   <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
//                 </div>
//               </div>

//               {/* Priority */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Priority <span className="text-red-500">*</span>
//                 </label>
//                 <div className="flex gap-3">
//                   {['low', 'medium', 'high'].map((priority) => (
//                     <label key={priority} className="flex-1">
//                       <input
//                         type="radio"
//                         name="priority"
//                         value={priority}
//                         checked={issueFormData.priority === priority}
//                         onChange={(e) => setIssueFormData({ ...issueFormData, priority: e.target.value })}
//                         className="sr-only peer"
//                       />
//                       <div className={`
//                         px-4 py-2 text-center rounded-lg border-2 cursor-pointer transition-all
//                         ${issueFormData.priority === priority
//                           ? priority === 'low' ? 'bg-yellow-100 border-yellow-500 text-yellow-700'
//                           : priority === 'medium' ? 'bg-orange-100 border-orange-500 text-orange-700'
//                           : 'bg-red-100 border-red-500 text-red-700'
//                           : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
//                         }
//                       `}>
//                         <span className="text-sm font-medium capitalize">{priority}</span>
//                       </div>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
//               >
//                 Submit Issue Report
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VehicleTrackingScreen;

import React, { useState, useEffect } from 'react';
import { MapPin, Truck, AlertTriangle, Clock, Search, RotateCcw, X, Upload, Navigation, Activity } from 'lucide-react';

interface Vehicle {
  id: string;
  vehicleNumber: string;
  routeName: string;
  driverName: string;
  status: 'on-route' | 'idle' | 'breakdown' | 'maintenance';
  currentLocation: string;
  lastUpdated: string;
  speed: number;
  coordinates: { lat: number; lng: number };
  nextStop?: string;
  eta?: string;
}

const mockVehicles = [
  {
    id: '1', vehicleNumber: 'KA01AB1234', routeName: 'Route A - North Sector',
    driverName: 'Rajesh Kumar', status: 'on-route', currentLocation: 'Stop 5 - Green Park',
    lastUpdated: '2 mins ago', speed: 35, coordinates: { lat: 12.9716, lng: 77.5946 },
    nextStop: 'Stop 6 - Central Mall', eta: '5 mins'
  },
  {
    id: '2', vehicleNumber: 'KA01CD5678', routeName: 'Route B - South Campus',
    driverName: 'Suresh Patil', status: 'idle', currentLocation: 'School Campus',
    lastUpdated: '1 min ago', speed: 0, coordinates: { lat: 12.9352, lng: 77.6245 }
  },
  {
    id: '3', vehicleNumber: 'KA01EF9012', routeName: 'Route C - East Zone',
    driverName: 'Amit Sharma', status: 'on-route', currentLocation: 'Stop 3 - Lake View',
    lastUpdated: '3 mins ago', speed: 28, coordinates: { lat: 12.9698, lng: 77.7499 },
    nextStop: 'Stop 4 - Tech Park', eta: '8 mins'
  },
  {
    id: '4', vehicleNumber: 'KA01GH3456', routeName: 'Route D - West Point',
    driverName: 'Ramesh Reddy', status: 'breakdown', currentLocation: 'Highway Junction',
    lastUpdated: '15 mins ago', speed: 0, coordinates: { lat: 12.9141, lng: 77.5021 }
  },
  {
    id: '5', vehicleNumber: 'KA01IJ7890', routeName: 'Route E - City Center',
    driverName: 'Prakash Singh', status: 'on-route', currentLocation: 'Stop 7 - Market Area',
    lastUpdated: '1 min ago', speed: 32, coordinates: { lat: 12.9591, lng: 77.7172 },
    nextStop: 'Stop 8 - Railway Station', eta: '6 mins'
  },
  {
    id: '6', vehicleNumber: 'KA01KL2345', routeName: 'Route A - North Sector',
    driverName: 'Venkat Rao', status: 'maintenance', currentLocation: 'Service Center',
    lastUpdated: '45 mins ago', speed: 0, coordinates: { lat: 12.9279, lng: 77.6271 }
  }
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'on-route':    return 'bg-green-100 text-green-700 border-green-200';
    case 'idle':        return 'bg-gray-100 text-gray-700 border-gray-200';
    case 'breakdown':   return 'bg-red-100 text-red-700 border-red-200';
    case 'maintenance': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    default:            return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getStatusText = (status: string) =>
  status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

const inputCls = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none";
const labelCls = "block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide";

export default function VehicleTrackingScreen() {
  const [vehicles] = useState(mockVehicles);
  const [filteredVehicles, setFilteredVehicles] = useState(mockVehicles);
  const [searchTerm, setSearchTerm] = useState('');
  const [routeFilter, setRouteFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [driverFilter, setDriverFilter] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [issueFormData, setIssueFormData] = useState({
    vehicleNumber: '', driverName: '', issueType: '', description: '', priority: 'medium', photo: undefined as File | undefined
  });

  const stats = {
    total: vehicles.length,
    onRoute: vehicles.filter(v => v.status === 'on-route').length,
    idle: vehicles.filter(v => v.status === 'idle').length,
    issues: vehicles.filter(v => v.status === 'breakdown' || v.status === 'maintenance').length
  };

  const routes = Array.from(new Set(vehicles.map(v => v.routeName)));
  const drivers = Array.from(new Set(vehicles.map(v => v.driverName)));

  useEffect(() => {
    let f = vehicles;
    if (searchTerm) f = f.filter(v => v.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    if (routeFilter) f = f.filter(v => v.routeName === routeFilter);
    if (statusFilter) f = f.filter(v => v.status === statusFilter);
    if (driverFilter) f = f.filter(v => v.driverName === driverFilter);
    setFilteredVehicles(f);
  }, [searchTerm, routeFilter, statusFilter, driverFilter, vehicles]);

  const handleReset = () => { setSearchTerm(''); setRouteFilter(''); setStatusFilter(''); setDriverFilter(''); };

  const handleTrack = (v: any) => { setSelectedVehicle(v); setShowMap(true); };

  const handleReportIssue = (v: any) => {
    setIssueFormData({ vehicleNumber: v.vehicleNumber, driverName: v.driverName, issueType: '', description: '', priority: 'medium', photo: undefined });
    setShowIssueModal(true);
  };

  const handleSubmitIssue = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Issue reported successfully!');
    setShowIssueModal(false);
  };

  return (
    /* ROOT: full viewport, zero horizontal overflow */
    <div style={{ minHeight: '100vh', width: '100%', overflowX: 'hidden', backgroundColor: '#f8fafc', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '100%', padding: '16px', boxSizing: 'border-box' }}>

        {/* HEADER */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Truck className="w-7 h-7 text-blue-600" /> Vehicle Tracking
          </h1>
          <p className="text-sm text-gray-500 mt-1">Real-time monitoring of school transport fleet</p>
        </div>

        {/* STAT CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '20px' }}>
          {[
            { label: 'Total Vehicles', value: stats.total, icon: <Truck className="w-5 h-5 text-blue-600" />, bg: 'from-blue-50 to-blue-100', border: 'border-blue-200', text: 'text-blue-900', sub: 'text-blue-700' },
            { label: 'On Route', value: stats.onRoute, icon: <Navigation className="w-5 h-5 text-green-600" />, bg: 'from-green-50 to-green-100', border: 'border-green-200', text: 'text-green-900', sub: 'text-green-700' },
            { label: 'Idle', value: stats.idle, icon: <Clock className="w-5 h-5 text-gray-500" />, bg: 'from-gray-50 to-gray-100', border: 'border-gray-200', text: 'text-gray-900', sub: 'text-gray-600' },
            { label: 'With Issues', value: stats.issues, icon: <AlertTriangle className="w-5 h-5 text-red-600" />, bg: 'from-red-50 to-red-100', border: 'border-red-200', text: 'text-red-900', sub: 'text-red-700' },
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

        {/* FILTER PANEL */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2"><Search className="w-4 h-4" /> Filters</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px', alignItems: 'end' }}>
            <div>
              <label className={labelCls}>Search Vehicle</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input className={inputCls + ' pl-8'} placeholder="Vehicle number..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Route</label>
              <select className={inputCls} value={routeFilter} onChange={e => setRouteFilter(e.target.value)}>
                <option value="">All Routes</option>
                {routes.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Status</label>
              <select className={inputCls} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option value="">All Status</option>
                <option value="on-route">On Route</option>
                <option value="idle">Idle</option>
                <option value="breakdown">Breakdown</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Driver</label>
              <select className={inputCls} value={driverFilter} onChange={e => setDriverFilter(e.target.value)}>
                <option value="">All Drivers</option>
                {drivers.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <button onClick={handleReset} className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            </div>
          </div>
        </div>

        {/* TABLE CARD */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm" style={{ overflow: 'hidden' }}>
          {/* Only this scrolls horizontally */}
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ minWidth: '820px', width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
                  {['Vehicle', 'Route', 'Driver', 'Status', 'Current Location', 'Last Updated', 'Speed', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredVehicles.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', padding: '48px 16px', color: '#94a3b8' }}>
                      <Truck style={{ width: 36, height: 36, margin: '0 auto 8px', opacity: 0.4 }} />
                      <p>No vehicles found matching your filters</p>
                    </td>
                  </tr>
                ) : filteredVehicles.map((v, idx) => {
                  const rowBg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
                  return (
                    <tr key={v.id} style={{ backgroundColor: rowBg, borderBottom: '1px solid #e2e8f0' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eff6ff'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = rowBg}>

                      {/* Vehicle */}
                      <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                        <div className="flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                          <span style={{ fontWeight: 600, color: '#1e293b' }}>{v.vehicleNumber}</span>
                        </div>
                      </td>

                      {/* Route */}
                      <td style={{ padding: '10px 14px' }}>
                        <span style={{ color: '#475569', fontSize: 12 }}>{v.routeName}</span>
                      </td>

                      {/* Driver */}
                      <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                        <span style={{ color: '#475569', fontSize: 13 }}>{v.driverName}</span>
                      </td>

                      {/* Status */}
                      <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(v.status)}`}>
                          {v.status === 'on-route' && <Activity className="w-3 h-3" />}
                          {v.status === 'breakdown' && <AlertTriangle className="w-3 h-3" />}
                          {getStatusText(v.status)}
                        </span>
                      </td>

                      {/* Location */}
                      <td style={{ padding: '10px 14px' }}>
                        <div className="flex items-start gap-1">
                          <MapPin className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                          <span style={{ color: '#475569', fontSize: 12 }}>{v.currentLocation}</span>
                        </div>
                      </td>

                      {/* Last Updated */}
                      <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span style={{ color: '#64748b', fontSize: 12 }}>{v.lastUpdated}</span>
                        </div>
                      </td>

                      {/* Speed */}
                      <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                        <span style={{ fontWeight: 600, color: v.speed > 0 ? '#166534' : '#64748b', fontSize: 13 }}>{v.speed} km/h</span>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                        <div className="flex gap-1.5">
                          <button onClick={() => handleTrack(v)} className="px-2.5 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                            Track
                          </button>
                          <button onClick={() => handleReportIssue(v)} className="px-2.5 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors">
                            Report
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
            <span style={{ fontSize: 12, color: '#94a3b8' }}>Showing {filteredVehicles.length} of {vehicles.length} vehicles</span>
          </div>
        </div>

        {/* LIVE TRACKING MAP MODAL */}
        {showMap && selectedVehicle && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, zIndex: 50 }}>
            <div style={{ backgroundColor: '#fff', borderRadius: 16, width: '100%', maxWidth: 680, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
              {/* Header */}
              <div style={{ background: 'linear-gradient(135deg,#2563eb,#1d4ed8)', color: '#fff', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 15 }}>Live Vehicle Tracking</p>
                  <p style={{ fontSize: 12, opacity: 0.8 }}>{selectedVehicle.vehicleNumber} — {selectedVehicle.routeName}</p>
                </div>
                <button onClick={() => setShowMap(false)} className="p-1.5 hover:bg-blue-800 rounded-lg transition-colors"><X className="w-4 h-4" /></button>
              </div>

              {/* Info bar */}
              <div style={{ backgroundColor: '#f8fafc', padding: '10px 18px', borderBottom: '1px solid #e2e8f0', flexShrink: 0 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 8, fontSize: 12 }}>
                  <div><span className="text-gray-500">Driver: </span><strong>{selectedVehicle.driverName}</strong></div>
                  <div><span className="text-gray-500">Speed: </span><strong>{selectedVehicle.speed} km/h</strong></div>
                  <div>
                    <span className="text-gray-500">Status: </span>
                    <span className={`inline px-1.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusStyle(selectedVehicle.status)}`}>{getStatusText(selectedVehicle.status)}</span>
                  </div>
                  <div><span className="text-gray-500">Updated: </span><strong>{selectedVehicle.lastUpdated}</strong></div>
                </div>
              </div>

              {/* Map area */}
              <div style={{ flex: 1, backgroundColor: '#e8f0fe', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: 260 }}>
                <div style={{ textAlign: 'center' }}>
                  <MapPin style={{ width: 48, height: 48, color: '#2563eb', margin: '0 auto 8px' }} />
                  <p style={{ fontWeight: 600, color: '#1e293b' }}>Map Integration</p>
                  <p style={{ fontSize: 12, color: '#64748b' }}>GPS: {selectedVehicle.coordinates.lat}, {selectedVehicle.coordinates.lng}</p>
                  <p style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>Current: {selectedVehicle.currentLocation}</p>
                  {selectedVehicle.nextStop && (
                    <div style={{ marginTop: 12, backgroundColor: '#fff', borderRadius: 10, padding: '10px 16px', display: 'inline-block', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                      <p style={{ fontSize: 11, color: '#94a3b8' }}>Next Stop</p>
                      <p style={{ fontWeight: 700, color: '#1e293b', fontSize: 13 }}>{selectedVehicle.nextStop}</p>
                      <p style={{ fontSize: 12, color: '#2563eb', marginTop: 2 }}>ETA: {selectedVehicle.eta}</p>
                    </div>
                  )}
                </div>
                <div style={{ position: 'absolute', top: 12, right: 12, backgroundColor: '#fff', borderRadius: 8, padding: '8px 12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  <p style={{ fontSize: 10, color: '#94a3b8', marginBottom: 4 }}>Auto-refresh</p>
                  <div className="flex items-center gap-1.5">
                    <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#22c55e' }} className="animate-pulse" />
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>Active</span>
                  </div>
                </div>
              </div>

              {/* Route info */}
              <div style={{ padding: '12px 18px', backgroundColor: '#fff', borderTop: '1px solid #e2e8f0', flexShrink: 0 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#1e293b', marginBottom: 6 }}>In production this map will show:</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 4 }}>
                  {['Real-time vehicle location with live marker', 'Complete route path with all stops', 'ETA for next stops', 'Traffic conditions and delays'].map(item => (
                    <p key={item} style={{ fontSize: 11, color: '#64748b' }}>• {item}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* REPORT ISSUE MODAL */}
        {showIssueModal && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, zIndex: 50, overflowY: 'auto' }}>
            <div style={{ backgroundColor: '#fff', borderRadius: 16, width: '100%', maxWidth: 440, maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
              {/* Header */}
              <div style={{ background: '#dc2626', color: '#fff', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '16px 16px 0 0', position: 'sticky', top: 0, zIndex: 10 }}>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span style={{ fontWeight: 700, fontSize: 15 }}>Report Issue</span>
                </div>
                <button onClick={() => setShowIssueModal(false)} className="p-1.5 hover:bg-red-800 rounded-lg transition-colors"><X className="w-4 h-4" /></button>
              </div>

              <form onSubmit={handleSubmitIssue} style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Read-only fields */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label className={labelCls}>Vehicle</label>
                    <input readOnly value={issueFormData.vehicleNumber} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-600 outline-none" />
                  </div>
                  <div>
                    <label className={labelCls}>Driver</label>
                    <input readOnly value={issueFormData.driverName} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-600 outline-none" />
                  </div>
                </div>

                {/* Issue Type */}
                <div>
                  <label className={labelCls}>Issue Type *</label>
                  <select className={inputCls} value={issueFormData.issueType} onChange={e => setIssueFormData({ ...issueFormData, issueType: e.target.value })} required style={{ borderColor: '#fca5a5' }}>
                    <option value="">Select issue type</option>
                    <option value="breakdown">Breakdown</option>
                    <option value="delay">Delay</option>
                    <option value="accident">Accident</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className={labelCls}>Description *</label>
                  <textarea className={inputCls} rows={3} placeholder="Describe the issue in detail..." value={issueFormData.description} onChange={e => setIssueFormData({ ...issueFormData, description: e.target.value })} required style={{ resize: 'vertical' }} />
                </div>

                {/* Priority */}
                <div>
                  <label className={labelCls}>Priority *</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                    {[
                      { value: 'low', active: 'bg-yellow-100 border-yellow-500 text-yellow-700', label: 'Low' },
                      { value: 'medium', active: 'bg-orange-100 border-orange-500 text-orange-700', label: 'Medium' },
                      { value: 'high', active: 'bg-red-100 border-red-500 text-red-700', label: 'High' },
                    ].map(p => (
                      <button key={p.value} type="button" onClick={() => setIssueFormData({ ...issueFormData, priority: p.value })}
                        className={`py-2 rounded-lg border-2 text-sm font-semibold transition-all ${issueFormData.priority === p.value ? p.active : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Photo Upload */}
                <div>
                  <label className={labelCls}>Upload Photo (Optional)</label>
                  <div style={{ border: '2px dashed #d1d5db', borderRadius: 8, padding: '14px', textAlign: 'center' }}>
                    <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                    <input type="file" accept="image/*" onChange={e => setIssueFormData({ ...issueFormData, photo: e.target.files?.[0] })} className="hidden" id="photo-upload" />
                    <label htmlFor="photo-upload" className="text-sm text-blue-600 cursor-pointer hover:text-blue-700">Click to upload image</label>
                    <p className="text-xs text-gray-400 mt-0.5">PNG, JPG up to 5MB</p>
                  </div>
                </div>

                {/* Submit */}
                <button type="submit" className="w-full py-2.5 bg-red-600 text-white rounded-lg font-semibold text-sm hover:bg-red-700 transition-colors shadow-sm">
                  Submit Issue Report
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}