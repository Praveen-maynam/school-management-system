
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentListScreen from '../screens/admin/student/StudentListScreen';

const AdminRoute = () => (
	<Routes>
		<Route path="students" element={<StudentListScreen />} />
	</Routes>
);

export default AdminRoute;
