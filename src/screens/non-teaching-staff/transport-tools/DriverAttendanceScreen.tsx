import React, { useState } from 'react';
import { 
  Users, UserCheck, UserX, AlertTriangle, Calendar, 
  Filter, Clock, CheckCircle, XCircle, 
  History, Bus, Navigation, X 
} from 'lucide-react';

// Types
interface AttendanceRecord {
  id: string;
  date: string;
  status: 'present' | 'absent';
  busNumber: string;
  routeName: string;
  markedBy: string;
  markedTime: string;
  remarks?: string;
}

interface Driver {
  id: string;
  driverName: string;
  driverId: string;
  assignedBus: string;
  routeName: string;
  shift: 'morning' | 'evening' | 'full-day';
  attendanceStatus: 'present' | 'absent' | 'not-marked';
  lastMarkedTime?: string;
  hasBackupDriver?: boolean;
  attendanceHistory: AttendanceRecord[];
}

// Mock data
const mockDrivers: Driver[] = [
  {
    id: '1',
    driverName: 'Ravi Kumar',
    driverId: 'DRV001',
    assignedBus: 'KA01AB1234',
    routeName: 'Route 1 - North Sector',
    shift: 'morning',
    attendanceStatus: 'present',
    lastMarkedTime: '07:15 AM',
    hasBackupDriver: true,
    attendanceHistory: [
      {
        id: 'h1',
        date: '2026-01-30',
        status: 'present',
        busNumber: 'KA01AB1234',
        routeName: 'Route 1 - North Sector',
        markedBy: 'Admin User',
        markedTime: '07:15 AM',
        remarks: 'On time'
      },
      {
        id: 'h2',
        date: '2026-01-29',
        status: 'present',
        busNumber: 'KA01AB1234',
        routeName: 'Route 1 - North Sector',
        markedBy: 'Admin User',
        markedTime: '07:10 AM'
      },
      {
        id: 'h3',
        date: '2026-01-28',
        status: 'absent',
        busNumber: 'KA01AB1234',
        routeName: 'Route 1 - North Sector',
        markedBy: 'Admin User',
        markedTime: '07:30 AM',
        remarks: 'Medical leave'
      }
    ]
  },
  {
    id: '2',
    driverName: 'Sunil Singh',
    driverId: 'DRV002',
    assignedBus: 'KA01CD5678',
    routeName: 'Route 2 - South Campus',
    shift: 'morning',
    attendanceStatus: 'absent',
    lastMarkedTime: '07:20 AM',
    hasBackupDriver: false,
    attendanceHistory: []
  },
  {
    id: '3',
    driverName: 'Prakash Sharma',
    driverId: 'DRV003',
    assignedBus: 'KA01EF9012',
    routeName: 'Route 3 - East Zone',
    shift: 'full-day',
    attendanceStatus: 'present',
    lastMarkedTime: '07:05 AM',
    hasBackupDriver: true,
    attendanceHistory: []
  },
  {
    id: '4',
    driverName: 'Amit Patel',
    driverId: 'DRV004',
    assignedBus: 'KA01GH3456',
    routeName: 'Route 4 - West Point',
    shift: 'evening',
    attendanceStatus: 'not-marked',
    hasBackupDriver: true,
    attendanceHistory: []
  },
  {
    id: '5',
    driverName: 'Rajesh Reddy',
    driverId: 'DRV005',
    assignedBus: '',
    routeName: 'Not Assigned',
    shift: 'morning',
    attendanceStatus: 'not-marked',
    hasBackupDriver: false,
    attendanceHistory: []
  },
  {
    id: '6',
    driverName: 'Venkat Rao',
    driverId: 'DRV006',
    assignedBus: 'KA01KL2345',
    routeName: 'Route 5 - City Center',
    shift: 'morning',
    attendanceStatus: 'absent',
    lastMarkedTime: '07:25 AM',
    hasBackupDriver: false,
    attendanceHistory: []
  },
  {
    id: '7',
    driverName: 'Ramesh Singh',
    driverId: 'DRV007',
    assignedBus: 'KA01MN6789',
    routeName: 'Route 6 - Industrial Area',
    shift: 'full-day',
    attendanceStatus: 'present',
    lastMarkedTime: '07:00 AM',
    hasBackupDriver: true,
    attendanceHistory: []
  }
];

const DriverAttendanceScreen: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [routeFilter, setRouteFilter] = useState('');
  const [busFilter, setBusFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showHistory, setShowHistory] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  // Calculate statistics
  const stats = {
    total: drivers.length,
    present: drivers.filter(d => d.attendanceStatus === 'present').length,
    absent: drivers.filter(d => d.attendanceStatus === 'absent').length,
    busesWithoutDrivers: drivers.filter(d => 
      d.attendanceStatus === 'absent' && d.assignedBus && !d.hasBackupDriver
    ).length
  };

  // Get unique routes and buses for filters
  const routes = Array.from(new Set(drivers.map(d => d.routeName).filter(r => r !== 'Not Assigned')));
  const buses = Array.from(new Set(drivers.map(d => d.assignedBus).filter(b => b)));

  // Filter drivers
  const filteredDrivers = drivers.filter(driver => {
    if (routeFilter && driver.routeName !== routeFilter) return false;
    if (busFilter && driver.assignedBus !== busFilter) return false;
    if (statusFilter !== 'all' && driver.attendanceStatus !== statusFilter) return false;
    return true;
  });

  // Mark attendance
  const handleMarkAttendance = (driverId: string, status: 'present' | 'absent') => {
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });

    setDrivers(drivers.map(driver => {
      if (driver.id === driverId) {
        // Check if driver has no bus assignment
        if (!driver.assignedBus && status === 'present') {
          alert('Warning: This driver has no assigned bus!');
        }

        return {
          ...driver,
          attendanceStatus: status,
          lastMarkedTime: currentTime
        };
      }
      return driver;
    }));
  };

  // View history
  const handleViewHistory = (driver: Driver) => {
    setSelectedDriver(driver);
    setShowHistory(true);
  };

  // Get status badge style
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'absent':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'not-marked':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    if (status === 'not-marked') return 'Not Marked';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Get shift badge style
  const getShiftStyle = (shift: string) => {
    switch (shift) {
      case 'morning':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'evening':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'full-day':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getShiftText = (shift: string) => {
    return shift.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Driver Attendance</h1>
        <p className="text-gray-600">Mark and monitor daily driver attendance for transport operations</p>
      </div>

      {/* Light Pastel Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Drivers */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm p-5 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700 font-medium mb-1">Total Drivers</p>
              <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
            </div>
            <div className="bg-white bg-opacity-60 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Present Drivers */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm p-5 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 font-medium mb-1">Present Drivers</p>
              <p className="text-3xl font-bold text-green-900">{stats.present}</p>
            </div>
            <div className="bg-white bg-opacity-60 p-3 rounded-lg">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Absent Drivers */}
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-sm p-5 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-700 font-medium mb-1">Absent Drivers</p>
              <p className="text-3xl font-bold text-red-900">{stats.absent}</p>
            </div>
            <div className="bg-white bg-opacity-60 p-3 rounded-lg">
              <UserX className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        {/* Buses Without Drivers */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-sm p-5 border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-700 font-medium mb-1">Buses Without Drivers</p>
              <p className="text-3xl font-bold text-orange-900">{stats.busesWithoutDrivers}</p>
            </div>
            <div className="bg-white bg-opacity-60 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      {stats.busesWithoutDrivers > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-900">Critical Alert: Buses Without Drivers</p>
              <p className="text-red-700 text-sm mt-1">
                {stats.busesWithoutDrivers} bus(es) have absent drivers with no backup assigned. 
                Please assign backup drivers immediately to ensure safe transport operations.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filter & Date Selection */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          Filters
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                title="Select date"
                placeholder="Select date"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Route Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Route
            </label>
            <select
              value={routeFilter}
              onChange={(e) => setRouteFilter(e.target.value)}
              title="Filter by Route"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Routes</option>
              {routes.map(route => (
                <option key={route} value={route}>{route}</option>
              ))}
            </select>
          </div>

          {/* Bus Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Bus
            </label>
            <select
              value={busFilter}
              onChange={(e) => setBusFilter(e.target.value)}
              title="Filter by Bus"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Buses</option>
              {buses.map(bus => (
                <option key={bus} value={bus}>{bus}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attendance Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              title="Filter by Attendance Status"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="not-marked">Not Marked</option>
            </select>
          </div>
        </div>
      </div>

      {/* Driver Attendance Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Driver Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Assigned Bus
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Route Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Shift
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Attendance Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Last Marked
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDrivers.map((driver) => {
                const isAbsentWithoutBackup = driver.attendanceStatus === 'absent' && 
                                               driver.assignedBus && 
                                               !driver.hasBackupDriver;
                const hasNoBus = !driver.assignedBus;

                return (
                  <tr 
                    key={driver.id} 
                    className={`transition-colors ${
                      isAbsentWithoutBackup 
                        ? 'bg-red-50 hover:bg-red-100' 
                        : hasNoBus
                        ? 'bg-yellow-50 hover:bg-yellow-100'
                        : 'hover:bg-blue-50'
                    }`}
                  >
                    {/* Driver Details */}
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{driver.driverName}</p>
                          <p className="text-sm text-gray-600">ID: {driver.driverId}</p>
                        </div>
                      </div>
                    </td>

                    {/* Assigned Bus */}
                    <td className="px-6 py-4">
                      {driver.assignedBus ? (
                        <div className={`flex items-center gap-2 ${isAbsentWithoutBackup ? 'text-red-700' : ''}`}>
                          <Bus className={`w-4 h-4 ${isAbsentWithoutBackup ? 'text-red-600' : 'text-gray-600'}`} />
                          <span className={`font-medium ${isAbsentWithoutBackup ? 'text-red-900' : 'text-gray-900'}`}>
                            {driver.assignedBus}
                          </span>
                          {isAbsentWithoutBackup && (
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-600" />
                          <span className="text-yellow-700 text-sm font-medium">Not Assigned</span>
                        </div>
                      )}
                    </td>

                    {/* Route Name */}
                    <td className="px-6 py-4">
                      {driver.routeName !== 'Not Assigned' ? (
                        <div className="flex items-center gap-2">
                          <Navigation className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-700">{driver.routeName}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">Not Assigned</span>
                      )}
                    </td>

                    {/* Shift */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getShiftStyle(driver.shift)}`}>
                        {getShiftText(driver.shift)}
                      </span>
                    </td>

                    {/* Attendance Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(driver.attendanceStatus)}`}>
                        {driver.attendanceStatus === 'present' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {driver.attendanceStatus === 'absent' && <XCircle className="w-3 h-3 mr-1" />}
                        {getStatusText(driver.attendanceStatus)}
                      </span>
                    </td>

                    {/* Last Marked Time */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {driver.lastMarkedTime ? (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{driver.lastMarkedTime}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        {driver.attendanceStatus !== 'present' && (
                          <button
                            onClick={() => handleMarkAttendance(driver.id, 'present')}
                            className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Present
                          </button>
                        )}
                        {driver.attendanceStatus !== 'absent' && (
                          <button
                            onClick={() => handleMarkAttendance(driver.id, 'absent')}
                            className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors flex items-center gap-1"
                          >
                            <XCircle className="w-4 h-4" />
                            Absent
                          </button>
                        )}
                        <button
                          onClick={() => handleViewHistory(driver)}
                          className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
                          title="View Attendance History"
                        >
                          <History className="w-4 h-4" />
                          History
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredDrivers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No drivers found matching your filters</p>
          </div>
        )}
      </div>

      {/* Attendance History Drawer */}
      {showHistory && selectedDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-end z-50">
          <div className="bg-white w-full md:w-1/2 lg:w-1/3 h-full md:h-auto md:max-h-[90vh] rounded-t-2xl md:rounded-l-2xl md:rounded-r-none shadow-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <History className="w-6 h-6" />
                <div>
                  <h3 className="text-xl font-bold">Attendance History</h3>
                  <p className="text-blue-100 text-sm">{selectedDriver.driverName}</p>
                </div>
              </div>
              <button
                onClick={() => setShowHistory(false)}
                title="Close attendance history"
                className="p-2 hover:bg-blue-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Driver Info */}
            <div className="bg-blue-50 px-6 py-4 border-b border-blue-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Driver ID:</span>
                  <span className="ml-2 font-semibold text-gray-900">{selectedDriver.driverId}</span>
                </div>
                <div>
                  <span className="text-gray-600">Current Bus:</span>
                  <span className="ml-2 font-semibold text-gray-900">
                    {selectedDriver.assignedBus || 'Not Assigned'}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-600">Route:</span>
                  <span className="ml-2 font-semibold text-gray-900">{selectedDriver.routeName}</span>
                </div>
              </div>
            </div>

            {/* History List */}
            <div className="flex-1 overflow-y-auto p-6">
              {selectedDriver.attendanceHistory.length === 0 ? (
                <div className="text-center py-12">
                  <History className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No attendance history available</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedDriver.attendanceHistory.map((record) => (
                    <div 
                      key={record.id} 
                      className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-4 border border-gray-200"
                    >
                      {/* Date and Status */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold text-gray-900">
                            {new Date(record.date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(record.status)}`}>
                          {record.status === 'present' ? <CheckCircle className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
                          {getStatusText(record.status)}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Bus className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">Bus:</span>
                          <span className="font-medium text-gray-900">{record.busNumber}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Navigation className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">Route:</span>
                          <span className="font-medium text-gray-900">{record.routeName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">Marked at:</span>
                          <span className="font-medium text-gray-900">{record.markedTime}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Users className="w-4 h-4 text-gray-500 mt-0.5" />
                          <span className="text-gray-600">Marked by:</span>
                          <span className="font-medium text-gray-900">{record.markedBy}</span>
                        </div>
                        {record.remarks && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-gray-600 text-xs mb-1">Remarks:</p>
                            <p className="text-gray-900">{record.remarks}</p>
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

export default DriverAttendanceScreen;