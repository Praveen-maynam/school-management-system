import React from "react";
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

import PrivacyPolicyPage from "./screens/teacher/privacy/Privacy&Policy";
import AboutUsPage from "./screens/teacher/privacy/aboutus";
import HelpPage from "./screens/teacher/privacy/Help";  
import LoginScreen from "./screens/auth/LoginScreen"; 
import ParentDashboardScreen from "./screens/parent/ParentdashBoard";
import AttendanceScreen from "./screens/parent/AttendanceScreen";
import Homework from "./screens/parent/HomeWork";
import FeeDetails from "./screens/parent/FeeDetails";
import ParentProfile from "./screens/parent/Profile";
import Ticketmodel from "./screens/teacher/privacy/Ticketmodel";
function App() {
    return (
        <AttendanceProvider>
            <BrowserRouter>
                <Routes>
                <Route path="/" element={<LoginScreen />} />
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