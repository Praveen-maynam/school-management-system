import TransportManagerRoute from "./routes/TransportManagerRoute";
import LibraryManagerRoute from "./routes/LibraryManagerRoute";
import SuperAdminRoute from "./routes/SuperAdminRoute";
import FinanceManagerRoute from "./routes/FinanceManagerRoute";
import React from "react";
import AdminDashboardScreen from "./screens/admin/dashboard/AdminDashboardScreen";
import UserManagementScreen from "./screens/admin/user/UserManagementScreen";
import StudentListScreen from "./screens/admin/student/StudentListScreen";

import TransportRoutesScreen from "./screens/admin/transport/TransportRoutesScreen";

import InventoryListScreen from "./screens/admin/inventory/InventoryListScreen";
import StaffListScreen from "./screens/admin/staff/StaffListScreen";
import ExaminationScreen from "./screens/non-teaching-staff/examination/ExaminationScreen";
import InventoryScreen from "./screens/non-teaching-staff/inventory/InventoryScreen";
import SportsScreen from "./screens/non-teaching-staff/sports/SportsScreen";
import SecurityScreen from "./screens/non-teaching-staff/security/SecurityScreen";
import TeacherListScreen from "./screens/admin/teacher/TeacherListScreen";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AttendanceProvider } from "./context/AttendanceContext";
import Layout from "./components/layout/AppLayout";
import TeacherDashboard from "./screens/teacher/dashboard/TeacherDashboardScreen";
import CreateHomeWorkScreen from "./screens/teacher/homework/CreateHomeWorkScreen";
import ClassScreen from "./screens/teacher/class/ClassScreen";
import AddHomeWorkScreen from "./screens/teacher/homework/AddHomeWorkScreen";
import AnnouncementScreen from "./screens/teacher/announcements/AnnouncementScreen";
import CreateAnnouncement from "./screens/teacher/announcements/CreateAnnouncementScreen";

import HolidayListScreen from "./screens/teacher/holiday/HolidayListScreen";
import ViewAttendenceScreen from "./screens/teacher/attendance/ViewAttendanceScreen";
import MarkAttendanceScreen from "./screens/teacher/attendance/MarkAttendanceScreen";
import TeacherTimetable from "./screens/teacher/timetable/TeacherTimetableScreen";
import TeacherProfileScreen from "./screens/teacher/dashboard/TeacherProfileScreen";
import PaySlipsPage from "./screens/teacher/payroll/PayslipHistoryScreen";
import ApplyLeaveScreen from "./screens/teacher/leave/ApplyLeaveScreen";
import NotificationsScreen from "./screens/teacher/messaging/NotificationsScreen";
import AppliedLeavesPage from "./screens/teacher/leave/LeaveHistoryScreen"; 
import RaiseIssueScreen from "./screens/teacher/messaging/IssuesScreen";
import StudentListByClassScreen from "./screens/teacher/students/StudentListByClassScreen";
import StudentProfileScreen from "./screens/teacher/students/StudentProfileScreen";
import EnterMarkScreen from "./screens/teacher/exams/EnterMarksScreen";
import AttendanceReportsScreen from "./screens/admin/attendance/AttendanceReportsScreen";
import PrivacyPolicyPage from "./screens/teacher/privacy/Privacy&Policy";
import AboutUsPage from "./screens/teacher/privacy/aboutus";
import ExamReportsScreen from "./screens/admin/reports/ExamReportsScreen";
import ClassListScreen from "./screens/admin/class/ClassListScreen";
import HelpPage from "./screens/teacher/privacy/Help";  
import LoginScreen from "./screens/auth/LoginScreen"; 
import ParentDashboardScreen from "./screens/parent/ParentdashBoard";
import AttendanceScreen from "./screens/parent/AttendanceScreen";
import Homework from "./screens/parent/HomeWork";
import ExamsScreen from "./screens/parent/ExamsScreen";
import FeeDetails from "./screens/parent/FeeDetails";
import ParentProfile from "./screens/parent/Profile";
import Subjects from "./screens/parent/subject";

import Reports from "./screens/parent/Reports";
import Leaves from "./screens/parent/ManageLeaves"
import AcademicCalendar from "./screens/parent/AcademicCalendar";
import Result from "./screens/parent/Result";
import TimeTable from "./screens/parent/TimeTable";
import TeacherScreen from "./screens/parent/TeacherScreen"
import Ticketmodel from "./screens/teacher/privacy/Ticketmodel";
import FeeReportsScreen from "./screens/admin/reports/FeeReportsScreen";
import BookListScreen from "./screens/admin/library/BookListScreen";
import SettingsScreen from "./screens/admin/settings/SettingsScreen";
import ExamDashboard from "./screens/admin/exam/ExamDashBoard";
import ExamResultsBoard from "./screens/admin/exam/ExamResultsBoard";
import ExamSchedule from "./screens/admin/exam/ExamSchedule";
import GradeConfiguration from "./screens/admin/exam/GradeConfiguration";
import MarksControl from "./screens/admin/exam/MarksControl";
import FinanceDashboard from "./screens/admin/finance/FinanceDashBoard";
import CleaningFinance from "./screens/admin/finance/CleaningFinance";
import TransportFinance from "./screens/admin/finance/TransportFinance";
import InventoryManagement from "./screens/admin/finance/InventoryManagement";
import LibraryFinance from "./screens/admin/finance/LibraryFinance";
import SecurityFinance from "./screens/admin/finance/SecurityFinance";
import StudentDuesDetail from "./screens/admin/finance/StudentDuesDetail";
import TeachingStaffDetails from "./screens/admin/finance/TeachingStaffDetails";
import AnnouncementListScreen from "./screens/admin/announcements/AnnouncementListScreen";
import SportsManagement from "./screens/non-teaching-staff/sports/SportsManagement";
import AthleteScreen from "./screens/non-teaching-staff/sports/Athelet";
import Events from "./screens/non-teaching-staff/sports/Events";
import Achievement from "./screens/non-teaching-staff/sports/Achievement";
import Equipment from "./screens/non-teaching-staff/sports/Equipment";
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
                                        <Route path="announcements" element={<AnnouncementListScreen />} />
                                        <Route path="non-teaching-staf" element={<StaffListScreen />} />
                                        <Route path="non-teaching-staff/examination" element={<ExaminationScreen />} />
                                        <Route path="non-teaching-staff/inventory" element={<InventoryScreen />} />
                                        <Route path="non-teaching-staff/sports" element={<SportsScreen />} />
                                        <Route path="non-teaching-staff/security" element={<SecurityScreen />} />
                                        <Route path="non-teaching-staff/sports/sportsmanagement" element={<SportsManagement />} />
                                        <Route path="non-teaching-staff/sports/Athlete" element={<AthleteScreen />} />
                                        <Route path="non-teaching-staff/sports/events" element={<Events />} />
                                        <Route path="non-teaching-staff/sports/achievements" element={<Achievement />} />
                                        <Route path="non-teaching-staff/sports/equipment" element={<Equipment />} />
                                        <Route path="exams/schedule" element={<ExamSchedule />} />
                                        <Route path="exams/marks" element={<MarksControl />} />
                                        <Route path="exams/grade-config" element={<GradeConfiguration />} />
                                        <Route path="exams/results" element={<ExamResultsBoard />} />
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
                    <Route path="homework" element={<CreateHomeWorkScreen />} />
                    <Route path="class" element={<ClassScreen />} />
                    <Route path="homework/create" element={<CreateHomeWorkScreen />} />
                    <Route path="attendance/view" element={<ViewAttendenceScreen />} />
                    <Route path="attendance/holiday" element={<HolidayListScreen />} />
                    <Route path="homework/add" element={<AddHomeWorkScreen />} />
                    <Route path="announcements" element={<AnnouncementScreen />} />
                    <Route path ="announcements/create" element={<CreateAnnouncement />} />
                    <Route path="profile" element={<TeacherProfileScreen />} />
                    <Route path="payroll/payslips" element={<PaySlipsPage />} />
                    <Route path="leave" element={<ApplyLeaveScreen />} />
                    <Route path="leave/apply" element={<ApplyLeaveScreen />} />
                    <Route path="leave/history" element={<AppliedLeavesPage />} />
                    <Route path="reports" element={<ExamReportsScreen />} />
                    <Route path="messaging/issues" element={<RaiseIssueScreen />} />
                    <Route path="notifications" element={<NotificationsScreen />} />
                    <Route path="students/studentlist" element={<StudentListByClassScreen />} />
                    <Route path="students/profile/:id" element={<StudentProfileScreen />} />
                    <Route path="exams" element={<EnterMarkScreen />} />
                    <Route path="timetable" element={<TeacherTimetable />} />
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
                    <Route path="subjects" element={<Subjects />} />
                    <Route path="teacher" element={<TeacherScreen />} />
                    <Route path="homework" element={<Homework />} />
                    <Route path="timetable" element={<TimeTable />} />
                    <Route path="academic-calendar" element={<AcademicCalendar />} />
                    <Route path="exams" element={<ExamsScreen />} />
                        <Route path="leave" element={<Leaves />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="result" element={<Result />} />
                    <Route path="profile" element={<ParentProfile />} />
                    <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
                    <Route path="about-us" element={<AboutUsPage />} />
                    <Route path="help" element={<HelpPage />} />
                </Route>
                <Route path="/finance-manager" element={<Layout />}>
                    <Route path="*" element={<FinanceManagerRoute />} />
                </Route>
                <Route path="/super-admin" element={<Layout />}>
                    <Route path="*" element={<SuperAdminRoute />} />
                </Route>
                <Route path="/library-manager" element={<Layout />}>
                    <Route path="*" element={<LibraryManagerRoute />} />
                </Route>
                <Route path="/transport-manager" element={<Layout />}>
                    <Route path="*" element={<TransportManagerRoute />} />
                </Route>
            </Routes>
        </BrowserRouter>
        </AttendanceProvider>
    );
};

export default App;