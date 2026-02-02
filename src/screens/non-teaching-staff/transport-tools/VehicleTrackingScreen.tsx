import React, { useState, useEffect } from 'react';
import { MapPin, Truck, AlertTriangle, Clock, Search, RotateCcw, X, Upload, Navigation, Activity } from 'lucide-react';

// Types
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

interface Issue {
  vehicleNumber: string;
  driverName: string;
  issueType: string;
  description: string;
  priority: string;
  photo?: File;
}

// Mock data
const mockVehicles: Vehicle[] = [
  {
    id: '1',
    vehicleNumber: 'KA01AB1234',
    routeName: 'Route A - North Sector',
    driverName: 'Rajesh Kumar',
    status: 'on-route',
    currentLocation: 'Stop 5 - Green Park',
    lastUpdated: '2 mins ago',
    speed: 35,
    coordinates: { lat: 12.9716, lng: 77.5946 },
    nextStop: 'Stop 6 - Central Mall',
    eta: '5 mins'
  },
  {
    id: '2',
    vehicleNumber: 'KA01CD5678',
    routeName: 'Route B - South Campus',
    driverName: 'Suresh Patil',
    status: 'idle',
    currentLocation: 'School Campus',
    lastUpdated: '1 min ago',
    speed: 0,
    coordinates: { lat: 12.9352, lng: 77.6245 }
  },
  {
    id: '3',
    vehicleNumber: 'KA01EF9012',
    routeName: 'Route C - East Zone',
    driverName: 'Amit Sharma',
    status: 'on-route',
    currentLocation: 'Stop 3 - Lake View',
    lastUpdated: '3 mins ago',
    speed: 28,
    coordinates: { lat: 12.9698, lng: 77.7499 },
    nextStop: 'Stop 4 - Tech Park',
    eta: '8 mins'
  },
  {
    id: '4',
    vehicleNumber: 'KA01GH3456',
    routeName: 'Route D - West Point',
    driverName: 'Ramesh Reddy',
    status: 'breakdown',
    currentLocation: 'Highway Junction',
    lastUpdated: '15 mins ago',
    speed: 0,
    coordinates: { lat: 12.9141, lng: 77.5021 }
  },
  {
    id: '5',
    vehicleNumber: 'KA01IJ7890',
    routeName: 'Route E - City Center',
    driverName: 'Prakash Singh',
    status: 'on-route',
    currentLocation: 'Stop 7 - Market Area',
    lastUpdated: '1 min ago',
    speed: 32,
    coordinates: { lat: 12.9591, lng: 77.7172 },
    nextStop: 'Stop 8 - Railway Station',
    eta: '6 mins'
  },
  {
    id: '6',
    vehicleNumber: 'KA01KL2345',
    routeName: 'Route A - North Sector',
    driverName: 'Venkat Rao',
    status: 'maintenance',
    currentLocation: 'Service Center',
    lastUpdated: '45 mins ago',
    speed: 0,
    coordinates: { lat: 12.9279, lng: 77.6271 }
  }
];

const VehicleTrackingScreen: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(mockVehicles);
  const [searchTerm, setSearchTerm] = useState('');
  const [routeFilter, setRouteFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [driverFilter, setDriverFilter] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [issueFormData, setIssueFormData] = useState<Issue>({
    vehicleNumber: '',
    driverName: '',
    issueType: '',
    description: '',
    priority: 'medium'
  });

  // Calculate summary stats
  const stats = {
    total: vehicles.length,
    onRoute: vehicles.filter(v => v.status === 'on-route').length,
    idle: vehicles.filter(v => v.status === 'idle').length,
    issues: vehicles.filter(v => v.status === 'breakdown' || v.status === 'maintenance').length
  };

  // Get unique routes and drivers for filters
  const routes = Array.from(new Set(vehicles.map(v => v.routeName)));
  const drivers = Array.from(new Set(vehicles.map(v => v.driverName)));

  // Filter logic
  useEffect(() => {
    let filtered = vehicles;

    if (searchTerm) {
      filtered = filtered.filter(v => 
        v.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (routeFilter) {
      filtered = filtered.filter(v => v.routeName === routeFilter);
    }

    if (statusFilter) {
      filtered = filtered.filter(v => v.status === statusFilter);
    }

    if (driverFilter) {
      filtered = filtered.filter(v => v.driverName === driverFilter);
    }

    setFilteredVehicles(filtered);
  }, [searchTerm, routeFilter, statusFilter, driverFilter, vehicles]);

  // Reset filters
  const handleReset = () => {
    setSearchTerm('');
    setRouteFilter('');
    setStatusFilter('');
    setDriverFilter('');
  };

  // Handle track button
  const handleTrack = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setShowMap(true);
  };

  // Handle report issue
  const handleReportIssue = (vehicle: Vehicle) => {
    setIssueFormData({
      vehicleNumber: vehicle.vehicleNumber,
      driverName: vehicle.driverName,
      issueType: '',
      description: '',
      priority: 'medium'
    });
    setShowIssueModal(true);
  };

  // Submit issue
  const handleSubmitIssue = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Issue submitted:', issueFormData);
    // In production: send to API
    alert('Issue reported successfully!');
    setShowIssueModal(false);
  };

  // Status badge styling
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'on-route':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'idle':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'breakdown':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Vehicle Tracking</h1>
        <p className="text-gray-600">Real-time monitoring of school transport fleet</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Vehicles</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Vehicles On Route</p>
              <p className="text-3xl font-bold text-green-600">{stats.onRoute}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Navigation className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Idle Vehicles</p>
              <p className="text-3xl font-bold text-gray-600">{stats.idle}</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Vehicles with Issues</p>
              <p className="text-3xl font-bold text-red-600">{stats.issues}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Panel */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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

          {/* Route Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Route Name
            </label>
            <select
              value={routeFilter}
              onChange={(e) => setRouteFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Routes</option>
              {routes.map(route => (
                <option key={route} value={route}>{route}</option>
              ))}
            </select>
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
              <option value="on-route">On Route</option>
              <option value="idle">Idle</option>
              <option value="breakdown">Breakdown</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          {/* Driver Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Driver Name
            </label>
            <select
              value={driverFilter}
              onChange={(e) => setDriverFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Drivers</option>
              {drivers.map(driver => (
                <option key={driver} value={driver}>{driver}</option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex items-end gap-2">
            <button
              onClick={handleReset}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Vehicle Tracking Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Vehicle Number
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Route Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Driver Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Current Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Speed
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-gray-400" />
                      <span className="font-semibold text-gray-900">{vehicle.vehicleNumber}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">{vehicle.routeName}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700">{vehicle.driverName}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(vehicle.status)}`}>
                      {vehicle.status === 'on-route' && <Activity className="w-3 h-3 mr-1" />}
                      {getStatusText(vehicle.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-1">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{vehicle.currentLocation}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{vehicle.lastUpdated}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-700">{vehicle.speed} km/h</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleTrack(vehicle)}
                        className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Track
                      </button>
                      <button
                        onClick={() => handleReportIssue(vehicle)}
                        className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Report Issue
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-12">
            <Truck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No vehicles found matching your filters</p>
          </div>
        )}
      </div>

      {/* Live Tracking Map Modal */}
      {showMap && selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Live Vehicle Tracking</h3>
                <p className="text-blue-100 text-sm">{selectedVehicle.vehicleNumber} - {selectedVehicle.routeName}</p>
              </div>
              <button
                onClick={() => setShowMap(false)}
                className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Vehicle Info Bar */}
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Driver:</span>
                  <span className="ml-2 font-semibold text-gray-900">{selectedVehicle.driverName}</span>
                </div>
                <div>
                  <span className="text-gray-600">Speed:</span>
                  <span className="ml-2 font-semibold text-gray-900">{selectedVehicle.speed} km/h</span>
                </div>
                <div>
                  <span className="text-gray-600">Status:</span>
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(selectedVehicle.status)}`}>
                    {getStatusText(selectedVehicle.status)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Last Update:</span>
                  <span className="ml-2 font-semibold text-gray-900">{selectedVehicle.lastUpdated}</span>
                </div>
              </div>
            </div>

            {/* Map Container */}
            <div className="relative bg-gray-100 h-96">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-3" />
                  <p className="text-gray-700 font-semibold mb-1">Map Integration</p>
                  <p className="text-sm text-gray-500">GPS: {selectedVehicle.coordinates.lat}, {selectedVehicle.coordinates.lng}</p>
                  <p className="text-sm text-gray-500 mt-2">Current: {selectedVehicle.currentLocation}</p>
                  {selectedVehicle.nextStop && (
                    <div className="mt-4 bg-white rounded-lg shadow-sm p-4 inline-block">
                      <p className="text-sm text-gray-600 mb-1">Next Stop</p>
                      <p className="font-semibold text-gray-900">{selectedVehicle.nextStop}</p>
                      <p className="text-sm text-blue-600 mt-1">ETA: {selectedVehicle.eta}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Auto-refresh</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-900">Active</span>
                </div>
              </div>
            </div>

            {/* Route Info */}
            <div className="px-6 py-4 bg-white">
              <h4 className="font-semibold text-gray-900 mb-3">Route Information</h4>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">In production, this map would display:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
                  <li>Real-time vehicle location with live marker</li>
                  <li>Complete route path with all stops</li>
                  <li>Estimated time of arrival for next stops</li>
                  <li>Traffic conditions and delays</li>
                  <li>Auto-refresh every 10-30 seconds</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Issue Modal */}
      {showIssueModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            {/* Modal Header */}
            <div className="bg-red-600 text-white px-6 py-4 flex items-center justify-between rounded-t-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="text-xl font-bold">Report Issue</h3>
              </div>
              <button
                onClick={() => setShowIssueModal(false)}
                className="p-2 hover:bg-red-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitIssue} className="p-6 space-y-4">
              {/* Vehicle Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Number
                </label>
                <input
                  type="text"
                  value={issueFormData.vehicleNumber}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
              </div>

              {/* Driver Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Driver Name
                </label>
                <input
                  type="text"
                  value={issueFormData.driverName}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
              </div>

              {/* Issue Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issue Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={issueFormData.issueType}
                  onChange={(e) => setIssueFormData({ ...issueFormData, issueType: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Select issue type</option>
                  <option value="breakdown">Breakdown</option>
                  <option value="delay">Delay</option>
                  <option value="accident">Accident</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issue Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={issueFormData.description}
                  onChange={(e) => setIssueFormData({ ...issueFormData, description: e.target.value })}
                  required
                  rows={4}
                  placeholder="Describe the issue in detail..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Photo (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-red-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setIssueFormData({ ...issueFormData, photo: e.target.files?.[0] })}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer"
                  >
                    Click to upload image
                  </label>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  {['low', 'medium', 'high'].map((priority) => (
                    <label key={priority} className="flex-1">
                      <input
                        type="radio"
                        name="priority"
                        value={priority}
                        checked={issueFormData.priority === priority}
                        onChange={(e) => setIssueFormData({ ...issueFormData, priority: e.target.value })}
                        className="sr-only peer"
                      />
                      <div className={`
                        px-4 py-2 text-center rounded-lg border-2 cursor-pointer transition-all
                        ${issueFormData.priority === priority
                          ? priority === 'low' ? 'bg-yellow-100 border-yellow-500 text-yellow-700'
                          : priority === 'medium' ? 'bg-orange-100 border-orange-500 text-orange-700'
                          : 'bg-red-100 border-red-500 text-red-700'
                          : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                        }
                      `}>
                        <span className="text-sm font-medium capitalize">{priority}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Submit Issue Report
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleTrackingScreen;