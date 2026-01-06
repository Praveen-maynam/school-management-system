import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/AdminLayout";
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
function App() {
    return (
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
                    <Route path="*" element={<Navigate to="/teacher/dashboard" replace />} />
                </Route>
                <Route path="/parent/dashboard" element={<ParentDashboardScreen />} />
                <Route path="/parent/attendance" element={<AttendanceScreen />} />
                 <Route path="*" element={<Navigate to="/" replace />} />
                 <Route path="/attendance" element={<AttendanceScreen />} />
                
            </Routes>
        </BrowserRouter>
    );
};

export default App;