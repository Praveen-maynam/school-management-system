import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TransportFinance from '../screens/admin/finance/TransportFinance';
import VehicleTrackingScreen from '../screens/non-teaching-staff/transport-tools/VehicleTrackingScreen';
import RouteManagementScreen from '../screens/non-teaching-staff/transport-tools/RouteManagementScreen';
import DriverAttendanceScreen from '../screens/non-teaching-staff/transport-tools/DriverAttendanceScreen';
import MaintenanceLogsScreen from '../screens/non-teaching-staff/transport-tools/MaintenanceLogsScreen';

const TransportManagerRoute = () => (
  <Routes>
    <Route path="dashboard" element={<TransportFinance />} />
    <Route path="vehicle-tracking" element={<VehicleTrackingScreen />} />
    <Route path="route-management" element={<RouteManagementScreen />} />
    <Route path="driver-attendance" element={<DriverAttendanceScreen />} />
    <Route path="maintenance-logs" element={<MaintenanceLogsScreen />} />
  </Routes>
);

export default TransportManagerRoute;
