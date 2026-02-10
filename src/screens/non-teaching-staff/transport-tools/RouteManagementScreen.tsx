import React, { useState } from 'react';
import { Route, MapPin, User, AlertCircle, Plus, Edit2, Trash2, X, Clock, Navigation, Bus } from 'lucide-react';

// Types
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

interface Driver {
  id: string;
  name: string;
}

interface Vehicle {
  id: string;
  vehicleNumber: string;
}

// Mock data
const mockDrivers: Driver[] = [
  { id: '1', name: 'Ravi Kumar' },
  { id: '2', name: 'Sunil Singh' },
  { id: '3', name: 'Prakash Sharma' },
  { id: '4', name: 'Amit Patel' },
  { id: '5', name: 'Rajesh Reddy' }
];

const mockVehicles: Vehicle[] = [
  { id: '1', vehicleNumber: 'KA01AB1234' },
  { id: '2', vehicleNumber: 'KA01CD5678' },
  { id: '3', vehicleNumber: 'KA01EF9012' },
  { id: '4', vehicleNumber: 'KA01GH3456' }
];

const mockRoutes: RouteData[] = [
  {
    id: '1',
    routeName: 'Route 1 - North Sector',
    numberOfStops: 10,
    assignedDriver: 'Ravi Kumar',
    driverId: '1',
    vehicleNumber: 'KA01AB1234',
    startLocation: 'School Campus',
    endLocation: 'North Area A',
    status: 'active',
    stops: [
      { id: 's1', name: 'School Campus', pickupTime: '07:00 AM', dropTime: '03:30 PM' },
      { id: 's2', name: 'Green Park', pickupTime: '07:15 AM', dropTime: '03:15 PM' },
      { id: 's3', name: 'Central Mall', pickupTime: '07:30 AM', dropTime: '03:00 PM' }
    ],
    hasActiveAssignments: true
  },
  {
    id: '2',
    routeName: 'Route 2 - South Campus',
    numberOfStops: 8,
    assignedDriver: 'Sunil Singh',
    driverId: '2',
    vehicleNumber: 'KA01CD5678',
    startLocation: 'School Campus',
    endLocation: 'South Area B',
    status: 'active',
    stops: [
      { id: 's4', name: 'School Campus', pickupTime: '07:00 AM', dropTime: '03:30 PM' },
      { id: 's5', name: 'Lake View', pickupTime: '07:20 AM', dropTime: '03:10 PM' }
    ],
    hasActiveAssignments: false
  },
  {
    id: '3',
    routeName: 'Route 3 - East Zone',
    numberOfStops: 12,
    assignedDriver: 'Prakash Sharma',
    driverId: '3',
    startLocation: 'School Campus',
    endLocation: 'East Tech Park',
    status: 'active',
    stops: [
      { id: 's6', name: 'School Campus', pickupTime: '07:00 AM', dropTime: '03:30 PM' }
    ],
    hasActiveAssignments: true
  },
  {
    id: '4',
    routeName: 'Route 4 - West Point',
    numberOfStops: 6,
    assignedDriver: '',
    driverId: '',
    startLocation: 'School Campus',
    endLocation: 'West Junction',
    status: 'inactive',
    stops: [],
    hasActiveAssignments: false
  }
];

const RouteManagementScreen: React.FC = () => {
  const [routes, setRoutes] = useState<RouteData[]>(mockRoutes);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingRoute, setEditingRoute] = useState<RouteData | null>(null);
  const [deletingRoute, setDeletingRoute] = useState<RouteData | null>(null);

  // Form state
  const [formData, setFormData] = useState<RouteData>({
    id: '',
    routeName: '',
    numberOfStops: 0,
    assignedDriver: '',
    driverId: '',
    vehicleNumber: '',
    startLocation: '',
    endLocation: '',
    status: 'active',
    stops: [],
    hasActiveAssignments: false
  });

  // Calculate statistics
  const stats = {
    totalRoutes: routes.length,
    totalStops: routes.reduce((sum, route) => sum + route.numberOfStops, 0),
    activeDrivers: new Set(routes.filter(r => r.driverId).map(r => r.driverId)).size,
    unassignedRoutes: routes.filter(r => !r.driverId).length
  };

  // Handle add route
  const handleAddRoute = () => {
    setEditingRoute(null);
    setFormData({
      id: '',
      routeName: '',
      numberOfStops: 0,
      assignedDriver: '',
      driverId: '',
      vehicleNumber: '',
      startLocation: '',
      endLocation: '',
      status: 'active',
      stops: [],
      hasActiveAssignments: false
    });
    setShowAddModal(true);
  };

  // Handle edit route
  const handleEditRoute = (route: RouteData) => {
    setEditingRoute(route);
    setFormData({ ...route });
    setShowAddModal(true);
  };

  // Handle delete route
  const handleDeleteRoute = (route: RouteData) => {
    setDeletingRoute(route);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (deletingRoute) {
      setRoutes(routes.filter(r => r.id !== deletingRoute.id));
      setShowDeleteModal(false);
      setDeletingRoute(null);
    }
  };

  // Save route
  const handleSaveRoute = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.routeName || !formData.startLocation || !formData.endLocation) {
      alert('Please fill in all required fields');
      return;
    }

    const driverName = mockDrivers.find(d => d.id === formData.driverId)?.name || '';
    const updatedFormData = {
      ...formData,
      assignedDriver: driverName,
      numberOfStops: formData.stops.length
    };

    if (editingRoute) {
      // Update existing route
      setRoutes(routes.map(r => r.id === editingRoute.id ? updatedFormData : r));
    } else {
      // Add new route
      const newRoute = {
        ...updatedFormData,
        id: Date.now().toString()
      };
      setRoutes([...routes, newRoute]);
    }

    setShowAddModal(false);
    setEditingRoute(null);
  };

  // Add stop
  const handleAddStop = () => {
    const newStop: Stop = {
      id: Date.now().toString(),
      name: '',
      pickupTime: '',
      dropTime: ''
    };
    setFormData({
      ...formData,
      stops: [...formData.stops, newStop]
    });
  };

  // Remove stop
  const handleRemoveStop = (stopId: string) => {
    setFormData({
      ...formData,
      stops: formData.stops.filter(s => s.id !== stopId)
    });
  };

  // Update stop
  const handleUpdateStop = (stopId: string, field: keyof Stop, value: string) => {
    setFormData({
      ...formData,
      stops: formData.stops.map(s => 
        s.id === stopId ? { ...s, [field]: value } : s
      )
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Route Management</h1>
        <p className="text-gray-600">Manage school transport routes, stops, and driver assignments</p>
      </div>

      {/* Light Color Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Routes */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm p-5 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700 font-medium mb-1">Total Routes</p>
              <p className="text-3xl font-bold text-blue-900">{stats.totalRoutes}</p>
            </div>
            <div className="bg-white bg-opacity-60 p-3 rounded-lg">
              <Route className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Total Stops */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm p-5 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 font-medium mb-1">Total Stops</p>
              <p className="text-3xl font-bold text-green-900">{stats.totalStops}</p>
            </div>
            <div className="bg-white bg-opacity-60 p-3 rounded-lg">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Active Drivers */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-sm p-5 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-700 font-medium mb-1">Active Drivers</p>
              <p className="text-3xl font-bold text-purple-900">{stats.activeDrivers}</p>
            </div>
            <div className="bg-white bg-opacity-60 p-3 rounded-lg">
              <User className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Unassigned Routes */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-sm p-5 border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-700 font-medium mb-1">Unassigned Routes</p>
              <p className="text-3xl font-bold text-orange-900">{stats.unassignedRoutes}</p>
            </div>
            <div className="bg-white bg-opacity-60 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Add Route Button */}
      <div className="mb-6">
        <button
          onClick={handleAddRoute}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Route
        </button>
      </div>

      {/* Route List Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Route Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Number of Stops
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Assigned Driver
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Start Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  End Location
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
              {routes.map((route) => (
                <tr key={route.id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Navigation className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-gray-900">{route.routeName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">{route.numberOfStops}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {route.assignedDriver ? (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-purple-600" />
                        <span className="text-gray-700">{route.assignedDriver}</span>
                      </div>
                    ) : (
                      <span className="text-orange-600 text-sm font-medium">Not Assigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {route.vehicleNumber ? (
                      <div className="flex items-center gap-2">
                        <Bus className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-700 text-sm">{route.vehicleNumber}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-700">{route.startLocation}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-700">{route.endLocation}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`
                      inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                      ${route.status === 'active' 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : 'bg-gray-100 text-gray-700 border border-gray-200'}
                    `}>
                      {route.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditRoute(route)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                        title="Edit Route"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteRoute(route)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        title="Delete Route"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {routes.length === 0 && (
          <div className="text-center py-12">
            <Route className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No routes found. Create your first route!</p>
          </div>
        )}
      </div>

      {/* Add/Edit Route Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-10 rounded-t-xl">
              <div className="flex items-center gap-2">
                <Route className="w-6 h-6" />
                <h3 className="text-xl font-bold">
                  {editingRoute ? 'Edit Route' : 'Add New Route'}
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                title="Close route modal"
                className="p-2 hover:bg-blue-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveRoute} className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-blue-600" />
                  Basic Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Route Name */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Route Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.routeName}
                      onChange={(e) => setFormData({ ...formData, routeName: e.target.value })}
                      required
                      placeholder="e.g., Route 1 - North Sector"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Start Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.startLocation}
                      onChange={(e) => setFormData({ ...formData, startLocation: e.target.value })}
                      required
                      placeholder="e.g., School Campus"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* End Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.endLocation}
                      onChange={(e) => setFormData({ ...formData, endLocation: e.target.value })}
                      required
                      placeholder="e.g., North Area A"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Assignment Information */}
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-600" />
                  Assignment Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Driver Assignment */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assign Driver
                    </label>
                    <select
                      value={formData.driverId}
                      onChange={(e) => setFormData({ ...formData, driverId: e.target.value })}
                      title="Assign Driver"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Driver</option>
                      {mockDrivers.map(driver => (
                        <option key={driver.id} value={driver.id}>{driver.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Vehicle Assignment */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assign Vehicle
                    </label>
                    <select
                      value={formData.vehicleNumber}
                      onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                      title="Assign Vehicle"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Vehicle</option>
                      {mockVehicles.map(vehicle => (
                        <option key={vehicle.id} value={vehicle.vehicleNumber}>{vehicle.vehicleNumber}</option>
                      ))}
                    </select>
                  </div>

                  {/* Route Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Route Status
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="status"
                          value="active"
                          checked={formData.status === 'active'}
                          onChange={(e) => setFormData({ ...formData, status: 'active' })}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Active</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="status"
                          value="inactive"
                          checked={formData.status === 'inactive'}
                          onChange={(e) => setFormData({ ...formData, status: 'inactive' })}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Inactive</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stops List */}
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-green-600" />
                    Route Stops
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddStop}
                    className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Stop
                  </button>
                </div>

                {formData.stops.length === 0 ? (
                  <div className="text-center py-6 text-gray-500 text-sm">
                    No stops added yet. Click "Add Stop" to create route stops.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {formData.stops.map((stop, index) => (
                      <div key={stop.id} className="bg-white rounded-lg p-4 border border-green-200">
                        <div className="flex items-start justify-between mb-3">
                          <span className="text-sm font-semibold text-gray-700">Stop {index + 1}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveStop(stop.id)}
                            title="Delete stop"
                            className="text-red-600 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {/* Stop Name */}
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Stop Name
                            </label>
                            <input
                              type="text"
                              value={stop.name}
                              onChange={(e) => handleUpdateStop(stop.id, 'name', e.target.value)}
                              title="Stop name"
                              placeholder="e.g., Green Park"
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>

                          {/* Pickup Time */}
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Pickup Time
                            </label>
                            <div className="relative">
                              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <input
                                type="time"
                                value={stop.pickupTime}
                                onChange={(e) => handleUpdateStop(stop.id, 'pickupTime', e.target.value)}
                                title="Pickup time"
                                className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              />
                            </div>
                          </div>

                          {/* Drop Time */}
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Drop Time
                            </label>
                            <div className="relative">
                              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <input
                                type="time"
                                value={stop.dropTime}
                                onChange={(e) => handleUpdateStop(stop.id, 'dropTime', e.target.value)}
                                title="Drop time"
                                className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Warning if no driver assigned */}
              {!formData.driverId && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-orange-900 text-sm">No Driver Assigned</p>
                    <p className="text-orange-700 text-sm mt-1">
                      This route doesn't have an assigned driver. Consider assigning a driver before activating the route.
                    </p>
                  </div>
                </div>
              )}

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
                  {editingRoute ? 'Update Route' : 'Save Route'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deletingRoute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            {/* Modal Header */}
            <div className="bg-red-600 text-white px-6 py-4 flex items-center gap-3 rounded-t-xl">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-xl font-bold">Delete Route</h3>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete <strong>{deletingRoute.routeName}</strong>?
              </p>

              {deletingRoute.hasActiveAssignments && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-900 text-sm">Warning: Active Assignments</p>
                      <p className="text-red-700 text-sm mt-1">
                        This route has students currently assigned. Deleting it will affect their transport assignments.
                        Please reassign students before deleting this route.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {!deletingRoute.hasActiveAssignments && (
                <p className="text-gray-600 text-sm">
                  This action cannot be undone.
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deletingRoute.hasActiveAssignments}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                  deletingRoute.hasActiveAssignments
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg'
                }`}
              >
                {deletingRoute.hasActiveAssignments ? 'Cannot Delete' : 'Delete Route'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteManagementScreen;