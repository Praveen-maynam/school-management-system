
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentListScreen from '../screens/admin/student/StudentListScreen';
import StaffListScreen from '../screens/admin/staff/StaffListScreen';

const AdminRoute = () => (
	<Routes>
		<Route path="students" element={<StudentListScreen />} />
		<Route path="non-teaching-staff" element={<StaffListScreen />} />
	</Routes>
);

export default AdminRoute;
