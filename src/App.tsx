import React from "react";
import AdminDashboardScreen from "./screens/admin/dashboard/AdminDashboardScreen";
import UserManagementScreen from "./screens/admin/user/UserManagementScreen";
import StudentListScreen from "./screens/admin/student/StudentListScreen";

import TransportRoutesScreen from "./screens/admin/transport/TransportRoutesScreen";

import InventoryListScreen from "./screens/admin/inventory/InventoryListScreen";
import StaffListScreen from "./screens/admin/staff/StaffListScreen";
import TeacherListScreen from "./screens/admin/teacher/TeacherListScreen";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AttendanceProvider } from "./context/AttendanceContext";
import Layout from "./components/layout/AppLayout";
import TeacherDashboard from "./screens/teacher/dashboard/TeacherDashboardScreen";
import MarkAttendanceScreen from "./screens/teacher/attendance/MarkAttendanceScreen";
import CreateHomeWorkScreen from "./screens/teacher/homework/CreateHomeWorkScreen";
import AddHomeWorkScreen from "./screens/teacher/homework/AddHomeWorkScreen";
import AnnouncementScreen from "./screens/teacher/announcements/AnnouncementScreen";
import CreateAnnouncement from "./screens/teacher/announcements/CreateAnnouncementScreen";
import TeacherProfileScreen from "./screens/teacher/dashboard/TeacherProfileScreen";
import PaySlipsPage from "./screens/teacher/payroll/PayslipHistoryScreen";
import ApplyLeaveScreen from "./screens/teacher/leave/ApplyLeaveScreen";
import AppliedLeavesPage from "./screens/teacher/leave/LeaveHistoryScreen"; 
import RaiseIssueScreen from "./screens/teacher/messaging/IssuesScreen";
import StudentListByClassScreen from "./screens/teacher/students/StudentListByClassScreen";
import StudentProfileScreen from "./screens/teacher/students/StudentProfileScreen";
import EnterMarkScreen from "./screens/teacher/exams/EnterMarksScreen";
import AttendanceReportsScreen from "./screens/admin/attendance/AttendanceReportsScreen";
import PrivacyPolicyPage from "./screens/teacher/privacy/Privacy&Policy";
import AboutUsPage from "./screens/teacher/privacy/aboutus";
import ClassListScreen from "./screens/admin/class/ClassListScreen";
import HelpPage from "./screens/teacher/privacy/Help";  
import LoginScreen from "./screens/auth/LoginScreen"; 
import ParentDashboardScreen from "./screens/parent/ParentdashBoard";
import AttendanceScreen from "./screens/parent/AttendanceScreen";
import Homework from "./screens/parent/HomeWork";
import FeeDetails from "./screens/parent/FeeDetails";
import ParentProfile from "./screens/parent/Profile";
import Ticketmodel from "./screens/teacher/privacy/Ticketmodel";
import FeeReportsScreen from "./screens/admin/reports/FeeReportsScreen";
import BookListScreen from "./screens/admin/library/BookListScreen";
import SettingsScreen from "./screens/admin/settings/SettingsScreen";
import ExamDashboard from "./screens/admin/exam/ExamDashBoard";
import ExamResultsBoard from "./screens/admin/exam/ExamResultsBoard";
import ExamSchedule from "./screens/admin/exam/ExamSchedule";
import GradeConfiguration from "./screens/admin/exam/GradeConfiguration";
import MarksControl from "./screens/admin/exam/MarksControl";
import ExamCreationForm from "./screens/admin/exam/ExamCreationForm";
import FinanceDashboard from "./screens/admin/finance/FinanceDashBoard";
import CleaningFinance from "./screens/admin/finance/CleaningFinance";
import TransportFinance from "./screens/admin/finance/TransportFinance";
import InventoryManagement from "./screens/admin/finance/InventoryManagement";
import LibraryFinance from "./screens/admin/finance/LibraryFinance";
import SecurityFinance from "./screens/admin/finance/SecurityFinance";
import StudentDuesDetail from "./screens/admin/finance/StudentDuesDetail";
import TeachingStaffDetails from "./screens/admin/finance/TeachingStaffDetails";


function App() {
    return (
        <AttendanceProvider>
            <BrowserRouter>
                <Routes>
                <Route path="/" element={<LoginScreen />} />
                <Route path="/admin" element={<Layout />}>
                    <Route path="dashboard" element={<AdminDashboardScreen />} />
                    <Route path="students" element={<StudentListScreen />} />
                    <Route path="exams" element={<ExamDashboard />} />
                     <Route path="teachers" element={<TeacherListScreen />} />
                    <Route path="transport" element={<TransportRoutesScreen />} />
                    <Route path="inventory" element={<InventoryListScreen />} /> 
                    <Route path="settings" element={<SettingsScreen />} />
                    <Route path="reports" element={<FeeReportsScreen />} />
                    <Route path="finance" element={<FinanceDashboard />} />
                    <Route path="library" element={<BookListScreen />} />
                    <Route path="hostel" element={<div>Admin Hostel Screen</div>} />
                    <Route path="classes" element={<ClassListScreen />} />
                    <Route path="users" element={<UserManagementScreen />} />
                    <Route path="attendance" element={<AttendanceReportsScreen />} />
                    <Route path="non-teaching-staff" element={<StaffListScreen />} />
                      <Route path="exams/schedule" element={<ExamSchedule />} />
                    <Route path="exams/marks" element={<MarksControl />} />
                    <Route path="exams/grade-config" element={<GradeConfiguration />} />
                    <Route path="exams/results" element={<ExamResultsBoard />} />
                    <Route path="exams/exam-creation" element={<ExamCreationForm />} />
                     <Route path="finance" element={<FinanceDashboard />} />
                    <Route path="finance/students" element={<StudentDuesDetail />} />
                    <Route path="finance/teaching-staff" element={<TeachingStaffDetails />} />
                    <Route path="finance/library" element={<LibraryFinance />} />
                    <Route path="finance/transport" element={<TransportFinance />} />
                    <Route path="finance/cleaning" element={<CleaningFinance />} />
                    <Route path="finance/security" element={<SecurityFinance />} />
                    <Route path="finance/inventory" element={<InventoryManagement />} />
                    {/* Add more admin routes here as needed */}
                    <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
                </Route>
                <Route path="/teacher" element={<Layout />}>
                    <Route path="dashboard" element={<TeacherDashboard />} />
                    <Route path="attendance/mark" element={<MarkAttendanceScreen />} />
                    <Route path="homework/create" element={<CreateHomeWorkScreen />} />
                    <Route path="homework/add" element={<AddHomeWorkScreen />} />
                    <Route path="announcements" element={<AnnouncementScreen />} />
                    <Route path ="announcements/create" element={<CreateAnnouncement />} />
                    <Route path="profile" element={<TeacherProfileScreen />} />
                    <Route path="payroll/payslips" element={<PaySlipsPage />} />
                    <Route path="leave/apply" element={<ApplyLeaveScreen />} />
                    <Route path="leave/history" element={<AppliedLeavesPage />} />
                    <Route path="messaging/issues" element={<RaiseIssueScreen />} />
                    <Route path="students/studentlist" element={<StudentListByClassScreen />} />
                    <Route path="students/profile/:id" element={<StudentProfileScreen />} />
                    <Route path="exams/entermarks" element={<EnterMarkScreen />} />
                    <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
                    <Route path="about-us" element={<AboutUsPage />} />
                    <Route path="Help" element={<HelpPage />} />
                    <Route path="ticket-modal" element={<Ticketmodel />} />
                    <Route path="*" element={<Navigate to="/teacher/dashboard" replace />} />
                </Route>
                <Route path="/parent" element={<Layout />}>
                    <Route path="dashboard" element={<ParentDashboardScreen />} />
                    <Route path="attendance" element={<AttendanceScreen />} />
                    <Route path="fee-details" element={<FeeDetails />} />
                    <Route path="homework" element={<Homework />} />
                    <Route path="profile" element={<ParentProfile />} />
                    <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
                    <Route path="about-us" element={<AboutUsPage />} />
                    <Route path="help" element={<HelpPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
        </AttendanceProvider>
    );
};

export default App;