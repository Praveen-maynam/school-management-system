import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardOverviewScreen from '../screens/super-admin/dashboard/DashboardOverviewScreen';
import RevenueTrendsScreen from '../screens/super-admin/dashboard/RevenueTrendsScreen';
import UserStatisticsScreen from '../screens/super-admin/dashboard/UserStatisticsScreen';
import StorageUsageScreen from '../screens/super-admin/dashboard/StorageUsageScreen';
import LoginAnalyticsScreen from '../screens/super-admin/dashboard/LoginAnalyticsScreen';
import SystemHealthScreen from '../screens/super-admin/dashboard/SystemHealthScreen';
import SupportTicketScreen from '../screens/super-admin/dashboard/SupportTicketScreen';
import SchoolListScreen from '../screens/super-admin/school-management/SchoolListScreen';
import SchoolProfileScreen from '../screens/super-admin/school-management/SchoolProfileScreen';
import PlanAssignmentScreen from '../screens/super-admin/school-management/PlanAssignmentScreen';
import BillingPlansScreen from '../screens/super-admin/billing/BillingPlansScreen';
import InvoiceScreen from '../screens/super-admin/billing/InvoiceScreen';
import SuperAdminListScreen from '../screens/super-admin/admin-management/SuperAdminListScreen';
import AuditLogsScreen from '../screens/super-admin/admin-management/AuditLogsScreen';
import SupportTicketsScreen from '../screens/super-admin/support-center/SupportTicketsScreen';
import DataExportScreen from '../screens/super-admin/data-management/DataExportScreen';
import PlatformSettingsScreen from '../screens/super-admin/platform-settings/PlatformSettingsScreen';
import EmailSchool from '../screens/super-admin/EmailSchool';
import PersonalManagement from '../screens/super-admin/PersonalManagement';

const SuperAdminRoute = () => (
  <Routes>
    {/* Dashboard & Analytics */}
    <Route path="dashboard" element={<DashboardOverviewScreen />} />
    <Route path="dashboard/revenue" element={<RevenueTrendsScreen />} />
    <Route path="dashboard/users" element={<UserStatisticsScreen />} />
    <Route path="dashboard/storage" element={<StorageUsageScreen />} />
    <Route path="dashboard/login-analytics" element={<LoginAnalyticsScreen />} />
    <Route path="dashboard/system-health" element={<SystemHealthScreen />} />
    <Route path="dashboard/support-tickets" element={<SupportTicketScreen />} />

    {/* School Management */}
    <Route path="schools" element={<SchoolListScreen />} />
    <Route path="schools/profile/:id" element={<SchoolProfileScreen />} />
    <Route path="schools/plan-assignment/:id" element={<PlanAssignmentScreen />} />

    {/* Billing & Plans */}
    <Route path="billing/plans" element={<BillingPlansScreen />} />
    <Route path="billing/invoices" element={<InvoiceScreen />} />

    {/* Admin Management */}
    <Route path="admins" element={<SuperAdminListScreen />} />
    <Route path="admins/audit-logs" element={<AuditLogsScreen />} />

    {/* Support Center */}
    <Route path="support-center" element={<SupportTicketsScreen />} />

    {/* Data Management */}
    <Route path="data-management" element={<DataExportScreen />} />

    {/* Platform Settings */}
    <Route path="settings" element={<PlatformSettingsScreen />} />

    {/* Personal Management */}
    <Route path="personal-management" element={<PersonalManagement />} />

    {/* Email School */}
    <Route path="emailschool" element={<EmailSchool />} />
  </Routes>
);

export default SuperAdminRoute;
