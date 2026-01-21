

// import React, { useState } from 'react';

// interface Route {
// 	id: number;
// 	name: string;
// 	stops: string[];
// 	driver: string;
// }

// const sampleRoutes: Route[] = [
// 	{ id: 1, name: 'Route 1', stops: ['Stop A', 'Stop B', 'Stop C'], driver: 'John Doe' },
// 	{ id: 2, name: 'Route 2', stops: ['Stop D', 'Stop E'], driver: 'Jane Smith' },
// ];

// export const TransportRoutesScreen: React.FC = () => {
// 	const [routes, setRoutes] = useState<Route[]>(sampleRoutes);
// 	const [loading, setLoading] = useState(false);
// 	const [error, setError] = useState<string | null>(null);

// 	// Simulate delete action
// 	const handleDelete = (id: number) => {
// 		setLoading(true);
// 		setTimeout(() => {
// 			setRoutes((prev) => prev.filter((r) => r.id !== id));
// 			setLoading(false);
// 		}, 800);
// 	};

// 	return (
// 		<div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
// 			<h2 className="text-2xl font-bold mb-4">Transport Routes</h2>
// 			{error && <div className="text-red-500 mb-2">{error}</div>}
// 			{loading && <div className="text-blue-600 mb-2">Processing...</div>}
// 			{routes.length === 0 ? (
// 				<div className="text-gray-500 py-8 text-center">No routes found.</div>
// 			) : (
// 				<div className="overflow-x-auto">
// 					<table className="min-w-full border">
// 						<thead>
// 							<tr className="bg-gray-100">
// 								<th className="px-4 py-2 text-left">Route Name</th>
// 								<th className="px-4 py-2 text-left">Stops</th>
// 								<th className="px-4 py-2 text-left">Driver</th>
// 								<th className="px-4 py-2 text-left">Actions</th>
// 							</tr>
// 						</thead>
// 						<tbody>
// 							{routes.map((route) => (
// 								<tr key={route.id} className="border-b">
// 									<td className="px-4 py-2">{route.name}</td>
// 									<td className="px-4 py-2">{route.stops.join(', ')}</td>
// 									<td className="px-4 py-2">{route.driver}</td>
// 									<td className="px-4 py-2 flex gap-2">
// 										<button className="text-blue-600 hover:underline text-sm">View</button>
// 										<button className="text-green-600 hover:underline text-sm">Edit</button>
// 										<button
// 											className="text-red-600 hover:underline text-sm"
// 											onClick={() => handleDelete(route.id)}
// 											disabled={loading}
// 										>
// 											Delete
// 										</button>
// 									</td>
// 								</tr>
// 							))}
// 						</tbody>
// 					</table>
// 				</div>
// 			)}
// 		</div>
// 	);
// };




import React, { useState, useEffect } from 'react';
import { Bus, MapPin, Users, Clock, AlertCircle, CheckCircle, Settings, Plus, Edit2, Trash2, Eye, Download, Upload, Filter, Search, Phone, Mail, Navigation, Calendar, FileText, TrendingUp, Activity, User, Route, Map, Fuel, Wrench, X, Save } from 'lucide-react';

const AdminTransportSystem = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedBus, setSelectedBus] = useState<any | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<any | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Data - In production, this would come from API
  const buses = [
    { 
      id: 1, 
      busNo: 'BUS-001', 
      registrationNo: 'DL-01-AA-1234',
      capacity: 45, 
      currentOccupancy: 38,
      driver: 'John Smith',
      driverId: 1,
      route: 'Route A - North Zone',
      routeId: 1,
      status: 'active',
      location: { lat: 28.6139, lng: 77.2090 },
      speed: 35,
      lastUpdate: '2 mins ago',
      fuelLevel: 75,
      nextMaintenance: '2026-02-15',
      gpsStatus: 'online',
      model: 'Tata Starbus',
      year: 2022
    },
    { 
      id: 2, 
      busNo: 'BUS-002', 
      registrationNo: 'DL-01-BB-5678',
      capacity: 50, 
      currentOccupancy: 42,
      driver: 'Michael Brown',
      driverId: 2,
      route: 'Route B - South Zone',
      routeId: 2,
      status: 'active',
      location: { lat: 28.5355, lng: 77.3910 },
      speed: 28,
      lastUpdate: '1 min ago',
      fuelLevel: 60,
      nextMaintenance: '2026-02-10',
      gpsStatus: 'online',
      model: 'Ashok Leyland',
      year: 2023
    },
    { 
      id: 3, 
      busNo: 'BUS-003', 
      registrationNo: 'DL-01-CC-9012',
      capacity: 40, 
      currentOccupancy: 0,
      driver: 'Robert Wilson',
      driverId: 3,
      route: 'Route C - East Zone',
      routeId: 3,
      status: 'maintenance',
      location: { lat: 28.6692, lng: 77.4538 },
      speed: 0,
      lastUpdate: '2 hours ago',
      fuelLevel: 45,
      nextMaintenance: '2026-01-25',
      gpsStatus: 'offline',
      model: 'Force Traveller',
      year: 2021
    },
    { 
      id: 4, 
      busNo: 'BUS-004', 
      registrationNo: 'DL-01-DD-3456',
      capacity: 45, 
      currentOccupancy: 35,
      driver: 'David Miller',
      driverId: 4,
      route: 'Route D - West Zone',
      routeId: 4,
      status: 'active',
      location: { lat: 28.7041, lng: 77.1025 },
      speed: 32,
      lastUpdate: '3 mins ago',
      fuelLevel: 80,
      nextMaintenance: '2026-03-01',
      gpsStatus: 'online',
      model: 'Tata Starbus',
      year: 2022
    }
  ];

  const routes = [
    {
      id: 1,
      name: 'Route A - North Zone',
      code: 'RT-A',
      totalStops: 12,
      distance: 25.5,
      duration: 65,
      students: 38,
      buses: ['BUS-001'],
      stops: [
        { id: 1, name: 'Green Park', time: '7:00 AM', students: 5, coordinates: { lat: 28.6139, lng: 77.2090 } },
        { id: 2, name: 'Hauz Khas', time: '7:15 AM', students: 8, coordinates: { lat: 28.5494, lng: 77.2001 } },
        { id: 3, name: 'IIT Delhi Gate', time: '7:30 AM', students: 6, coordinates: { lat: 28.5458, lng: 77.1927 } },
        { id: 4, name: 'AIIMS', time: '7:45 AM', students: 7, coordinates: { lat: 28.5672, lng: 77.2100 } },
        { id: 5, name: 'School', time: '8:00 AM', students: 0, coordinates: { lat: 28.6139, lng: 77.2090 } }
      ],
      morningStart: '6:45 AM',
      afternoonStart: '3:00 PM',
      status: 'active'
    },
    {
      id: 2,
      name: 'Route B - South Zone',
      code: 'RT-B',
      totalStops: 10,
      distance: 18.3,
      duration: 50,
      students: 42,
      buses: ['BUS-002'],
      stops: [
        { id: 1, name: 'Nehru Place', time: '7:10 AM', students: 9, coordinates: { lat: 28.5494, lng: 77.2501 } },
        { id: 2, name: 'Kalkaji', time: '7:25 AM', students: 12, coordinates: { lat: 28.5485, lng: 77.2580 } },
        { id: 3, name: 'Govindpuri', time: '7:40 AM', students: 10, coordinates: { lat: 28.5358, lng: 77.2804 } },
        { id: 4, name: 'School', time: '8:00 AM', students: 0, coordinates: { lat: 28.6139, lng: 77.2090 } }
      ],
      morningStart: '7:00 AM',
      afternoonStart: '3:00 PM',
      status: 'active'
    },
    {
      id: 3,
      name: 'Route C - East Zone',
      code: 'RT-C',
      totalStops: 15,
      distance: 32.0,
      duration: 75,
      students: 35,
      buses: ['BUS-003'],
      stops: [
        { id: 1, name: 'Laxmi Nagar', time: '6:30 AM', students: 8, coordinates: { lat: 28.6358, lng: 77.2769 } },
        { id: 2, name: 'Preet Vihar', time: '6:50 AM', students: 10, coordinates: { lat: 28.6429, lng: 77.2940 } },
        { id: 3, name: 'Mayur Vihar', time: '7:10 AM', students: 9, coordinates: { lat: 28.6082, lng: 77.2971 } },
        { id: 4, name: 'School', time: '8:00 AM', students: 0, coordinates: { lat: 28.6139, lng: 77.2090 } }
      ],
      morningStart: '6:15 AM',
      afternoonStart: '3:00 PM',
      status: 'maintenance'
    },
    {
      id: 4,
      name: 'Route D - West Zone',
      code: 'RT-D',
      totalStops: 11,
      distance: 22.8,
      duration: 60,
      students: 35,
      buses: ['BUS-004'],
      stops: [
        { id: 1, name: 'Rajouri Garden', time: '7:00 AM', students: 7, coordinates: { lat: 28.6409, lng: 77.1210 } },
        { id: 2, name: 'Punjabi Bagh', time: '7:20 AM', students: 9, coordinates: { lat: 28.6692, lng: 77.1313 } },
        { id: 3, name: 'Paschim Vihar', time: '7:35 AM', students: 8, coordinates: { lat: 28.6698, lng: 77.1025 } },
        { id: 4, name: 'School', time: '8:00 AM', students: 0, coordinates: { lat: 28.6139, lng: 77.2090 } }
      ],
      morningStart: '6:45 AM',
      afternoonStart: '3:00 PM',
      status: 'active'
    }
  ];

  const drivers = [
    {
      id: 1,
      name: 'John Smith',
      phone: '+91 98765 43210',
      email: 'john.smith@school.com',
      licenseNo: 'DL-1234567890',
      licenseExpiry: '2027-06-15',
      experience: 12,
      rating: 4.8,
      assignedBus: 'BUS-001',
      status: 'active',
      address: '123 Green Park, New Delhi',
      emergencyContact: '+91 98765 43211',
      joiningDate: '2020-03-15',
      totalTrips: 1250
    },
    {
      id: 2,
      name: 'Michael Brown',
      phone: '+91 98765 43220',
      email: 'michael.brown@school.com',
      licenseNo: 'DL-2345678901',
      licenseExpiry: '2026-08-20',
      experience: 8,
      rating: 4.6,
      assignedBus: 'BUS-002',
      status: 'active',
      address: '456 Nehru Place, New Delhi',
      emergencyContact: '+91 98765 43221',
      joiningDate: '2021-05-10',
      totalTrips: 890
    },
    {
      id: 3,
      name: 'Robert Wilson',
      phone: '+91 98765 43230',
      email: 'robert.wilson@school.com',
      licenseNo: 'DL-3456789012',
      licenseExpiry: '2025-12-10',
      experience: 15,
      rating: 4.9,
      assignedBus: 'BUS-003',
      status: 'on-leave',
      address: '789 Laxmi Nagar, New Delhi',
      emergencyContact: '+91 98765 43231',
      joiningDate: '2019-01-20',
      totalTrips: 1680
    },
    {
      id: 4,
      name: 'David Miller',
      phone: '+91 98765 43240',
      email: 'david.miller@school.com',
      licenseNo: 'DL-4567890123',
      licenseExpiry: '2028-03-25',
      experience: 10,
      rating: 4.7,
      assignedBus: 'BUS-004',
      status: 'active',
      address: '321 Rajouri Garden, New Delhi',
      emergencyContact: '+91 98765 43241',
      joiningDate: '2020-09-05',
      totalTrips: 1100
    }
  ];

  const students = [
    { id: 1, name: 'Emma Johnson', class: '5-A', rollNo: '501', bus: 'BUS-001', route: 'Route A', stop: 'Green Park', parentPhone: '+91 98111 11111' },
    { id: 2, name: 'Liam Smith', class: '8-B', rollNo: '802', bus: 'BUS-001', route: 'Route A', stop: 'Hauz Khas', parentPhone: '+91 98111 11112' },
    { id: 3, name: 'Olivia Brown', class: '6-C', rollNo: '603', bus: 'BUS-002', route: 'Route B', stop: 'Nehru Place', parentPhone: '+91 98111 11113' },
    { id: 4, name: 'Noah Davis', class: '7-A', rollNo: '701', bus: 'BUS-002', route: 'Route B', stop: 'Kalkaji', parentPhone: '+91 98111 11114' },
    { id: 5, name: 'Ava Wilson', class: '9-B', rollNo: '902', bus: 'BUS-003', route: 'Route C', stop: 'Laxmi Nagar', parentPhone: '+91 98111 11115' }
  ];

  const maintenanceRecords = [
    { id: 1, busNo: 'BUS-001', type: 'Routine Service', date: '2026-01-15', cost: 5000, status: 'completed', nextDue: '2026-02-15', description: 'Oil change, filter replacement' },
    { id: 2, busNo: 'BUS-002', type: 'Tire Replacement', date: '2026-01-18', cost: 12000, status: 'completed', nextDue: '2026-02-10', description: 'All 4 tires replaced' },
    { id: 3, busNo: 'BUS-003', type: 'Engine Repair', date: '2026-01-21', cost: 25000, status: 'in-progress', nextDue: '2026-01-25', description: 'Engine overheating issue' },
    { id: 4, busNo: 'BUS-004', type: 'AC Service', date: '2026-01-10', cost: 3500, status: 'completed', nextDue: '2026-03-01', description: 'AC gas refill and cleaning' }
  ];

  const alerts = [
    { id: 1, type: 'critical', message: 'BUS-003 GPS offline for 2 hours', time: '2 hours ago', bus: 'BUS-003' },
    { id: 2, type: 'warning', message: 'BUS-002 fuel level below 20%', time: '30 mins ago', bus: 'BUS-002' },
    { id: 3, type: 'info', message: 'Driver license expiring soon - Robert Wilson', time: '1 day ago', driver: 'Robert Wilson' },
    { id: 4, type: 'warning', message: 'BUS-001 maintenance due in 3 days', time: '5 hours ago', bus: 'BUS-001' }
  ];

  // Overview Dashboard
  const OverviewTab = () => {
    const activeBuses = buses.filter(b => b.status === 'active').length;
    const totalStudents = routes.reduce((sum, r) => sum + r.students, 0);
    const activeDrivers = drivers.filter(d => d.status === 'active').length;
    const avgOccupancy = Math.round(buses.reduce((sum, b) => sum + (b.currentOccupancy / b.capacity * 100), 0) / buses.length);

    return (
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Buses</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{activeBuses}/{buses.length}</h3>
                <p className="text-sm text-green-600 mt-1">All operational</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bus className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{totalStudents}</h3>
                <p className="text-sm text-purple-600 mt-1">Using transport</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Drivers</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{activeDrivers}/{drivers.length}</h3>
                <p className="text-sm text-green-600 mt-1">On duty</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Occupancy</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{avgOccupancy}%</h3>
                <p className="text-sm text-orange-600 mt-1">Capacity usage</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {alerts.map(alert => (
                <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                  alert.type === 'critical' ? 'bg-red-50 border-red-500' :
                  alert.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                  'bg-blue-50 border-blue-500'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {alert.type === 'critical' ? <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" /> :
                       alert.type === 'warning' ? <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" /> :
                       <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />}
                      <div>
                        <p className={`font-medium ${
                          alert.type === 'critical' ? 'text-red-900' :
                          alert.type === 'warning' ? 'text-yellow-900' :
                          'text-blue-900'
                        }`}>{alert.message}</p>
                        <p className="text-sm text-gray-600 mt-1">{alert.time}</p>
                      </div>
                    </div>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Resolve</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Bus Tracking */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Live Bus Tracking</h3>
            </div>
            <div className="p-6">
              <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Map integration placeholder</p>
                  <p className="text-sm text-gray-500 mt-2">In production: Google Maps / Mapbox integration</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Active Buses</h3>
            </div>
            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
              {buses.filter(b => b.status === 'active').map(bus => (
                <div key={bus.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{bus.busNo}</h4>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Active
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Speed:</span>
                      <span className="font-medium text-gray-900">{bus.speed} km/h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Occupancy:</span>
                      <span className="font-medium text-gray-900">{bus.currentOccupancy}/{bus.capacity}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Fuel:</span>
                      <span className={`font-medium ${bus.fuelLevel < 30 ? 'text-red-600' : 'text-gray-900'}`}>
                        {bus.fuelLevel}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-500">Updated: {bus.lastUpdate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Buses Management Tab
  const BusesTab = () => {
    const filteredBuses = buses.filter(bus => {
      if (filterStatus !== 'all' && bus.status !== filterStatus) return false;
      if (searchQuery && !bus.busNo.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !bus.registrationNo.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search buses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-64"
              />
            </div>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="maintenance">Maintenance</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <button 
            onClick={() => { setModalType('addBus'); setShowModal(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Bus
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBuses.map(bus => (
            <div key={bus.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className={`p-4 ${
                bus.status === 'active' ? 'bg-green-50 border-b border-green-200' :
                bus.status === 'maintenance' ? 'bg-yellow-50 border-b border-yellow-200' :
                'bg-gray-50 border-b border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Bus className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{bus.busNo}</h3>
                      <p className="text-sm text-gray-600">{bus.registrationNo}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    bus.status === 'active' ? 'bg-green-100 text-green-700' :
                    bus.status === 'maintenance' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {bus.status}
                  </span>
                </div>
              </div>
              
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-600">Model</p>
                    <p className="font-medium text-gray-900">{bus.model}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Year</p>
                    <p className="font-medium text-gray-900">{bus.year}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Capacity</p>
                    <p className="font-medium text-gray-900">{bus.capacity} seats</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Occupancy</p>
                    <p className="font-medium text-gray-900">{bus.currentOccupancy}/{bus.capacity}</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Fuel Level</span>
                    <span className={`font-medium ${bus.fuelLevel < 30 ? 'text-red-600' : 'text-gray-900'}`}>
                      {bus.fuelLevel}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${bus.fuelLevel < 30 ? 'bg-red-600' : 'bg-green-600'}`}
                      style={{ width: `${bus.fuelLevel}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Driver:</span>
                    <span className="font-medium text-gray-900">{bus.driver}</span>
                  </div>
                 <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Route:</span>
                    <span className="font-medium text-gray-900">{bus.route}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Next Maintenance:</span>
                    <span className="font-medium text-gray-900">{bus.nextMaintenance}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">GPS Status:</span>
                    <span className={`font-medium ${bus.gpsStatus === 'online' ? 'text-green-600' : 'text-red-600'}`}>
                      {bus.gpsStatus}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={() => { setSelectedBus(bus); setModalType('viewBus'); setShowModal(true); }}
                    className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium"
                  >
                    <Eye className="w-4 h-4 inline mr-1" />
                    View
                  </button>
                  <button 
                    onClick={() => { setSelectedBus(bus); setModalType('editBus'); setShowModal(true); }}
                    className="flex-1 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 text-sm font-medium"
                  >
                    <Edit2 className="w-4 h-4 inline mr-1" />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Routes Management Tab
  const RoutesTab = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Routes Management</h2>
          <button 
            onClick={() => { setModalType('addRoute'); setShowModal(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Route
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {routes.map(route => (
            <div key={route.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{route.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">Code: {route.code}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    route.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {route.status}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Stops</p>
                    <p className="text-2xl font-bold text-blue-600">{route.totalStops}</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600">Students</p>
                    <p className="text-2xl font-bold text-purple-600">{route.students}</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Distance</p>
                    <p className="text-2xl font-bold text-green-600">{route.distance}km</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium text-gray-900">{route.duration} mins</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Morning Start:</span>
                    <span className="font-medium text-gray-900">{route.morningStart}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Afternoon Start:</span>
                    <span className="font-medium text-gray-900">{route.afternoonStart}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Assigned Buses:</span>
                    <span className="font-medium text-gray-900">{route.buses.join(', ')}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-900 mb-2">Stops:</p>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {route.stops.slice(0, 5).map((stop, idx) => (
                      <div key={stop.id} className="flex items-center justify-between text-sm py-1">
                        <span className="text-gray-600">{idx + 1}. {stop.name}</span>
                        <span className="text-gray-900 font-medium">{stop.time}</span>
                      </div>
                    ))}
                    {route.stops.length > 5 && (
                      <p className="text-xs text-gray-500 italic">+{route.stops.length - 5} more stops</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={() => { setSelectedRoute(route); setModalType('viewRoute'); setShowModal(true); }}
                    className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium"
                  >
                    <Eye className="w-4 h-4 inline mr-1" />
                    View Details
                  </button>
                  <button 
                    onClick={() => { setSelectedRoute(route); setModalType('editRoute'); setShowModal(true); }}
                    className="flex-1 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 text-sm font-medium"
                  >
                    <Edit2 className="w-4 h-4 inline mr-1" />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Drivers Management Tab
  const DriversTab = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Drivers Management</h2>
          <button 
            onClick={() => { setModalType('addDriver'); setShowModal(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Driver
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Driver</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">License</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned Bus</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Experience</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {drivers.map(driver => (
                <tr key={driver.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{driver.name}</p>
                        <p className="text-sm text-gray-500">ID: {driver.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-900">{driver.phone}</p>
                      <p className="text-xs text-gray-500">{driver.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-900">{driver.licenseNo}</p>
                      <p className="text-xs text-gray-500">Exp: {driver.licenseExpiry}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded">
                      {driver.assignedBus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{driver.experience} years</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-medium text-gray-900">{driver.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      driver.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {driver.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Students Tab
  const StudentsTab = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Students Transport Details</h2>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="w-4 h-4" />
              Add Student
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bus</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stop</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parent Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map(student => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-500">Roll: {student.rollNo}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded">
                      {student.class}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded">
                      {student.bus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{student.route}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{student.stop}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{student.parentPhone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Maintenance Tab
  const MaintenanceTab = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Maintenance Records</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            Add Record
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <h3 className="text-2xl font-bold text-gray-900">3</h3>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <h3 className="text-2xl font-bold text-gray-900">1</h3>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Wrench className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Cost</p>
                <h3 className="text-2xl font-bold text-gray-900">₹45,500</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bus No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Next Due</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {maintenanceRecords.map(record => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded">
                      {record.busNo}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{record.type}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{record.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">₹{record.cost.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      record.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{record.nextDue}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Main Render
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Bus className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Transport Admin</h1>
                <p className="text-sm text-gray-600">School Transport Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Settings className="w-5 h-5" />
              </button> */}
              {/* <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-8">
            {[
              { id: 'overview', label: 'Overview', icon: Activity },
              { id: 'buses', label: 'Buses', icon: Bus },
              { id: 'routes', label: 'Routes', icon: Route },
              { id: 'drivers', label: 'Drivers', icon: User },
              { id: 'students', label: 'Students', icon: Users },
              { id: 'maintenance', label: 'Maintenance', icon: Wrench }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'buses' && <BusesTab />}
        {activeTab === 'routes' && <RoutesTab />}
        {activeTab === 'drivers' && <DriversTab />}
        {activeTab === 'students' && <StudentsTab />}
        {activeTab === 'maintenance' && <MaintenanceTab />}
      </div>

      {/* Modal Placeholder */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {modalType === 'addBus' && 'Add New Bus'}
                {modalType === 'editBus' && 'Edit Bus Details'}
                {modalType === 'viewBus' && 'Bus Details'}
                {modalType === 'addRoute' && 'Add New Route'}
                {modalType === 'viewRoute' && 'Route Details'}
                {modalType === 'addDriver' && 'Add New Driver'}
              </h2>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-600">Form content would go here...</p>
              <div className="mt-6 flex gap-3 justify-end">
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTransportSystem;