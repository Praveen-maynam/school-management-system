import api from '../lib/api';

export interface AttendanceRecord {
	id: string;
	studentId: string;
	date: string;
	status: 'present' | 'absent' | 'late';
	// Add more fields as needed
}

export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
}

export async function fetchAttendance(): Promise<ApiResponse<AttendanceRecord[]>> {
	try {
		const res = await api.get('/attendance');
		return res.data as ApiResponse<AttendanceRecord[]>;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function markAttendance(record: Omit<AttendanceRecord, 'id'>): Promise<ApiResponse<AttendanceRecord>> {
	try {
		const res = await api.post('/attendance', record);
		return res.data as ApiResponse<AttendanceRecord>;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function updateAttendance(id: string, record: Partial<AttendanceRecord>): Promise<ApiResponse<AttendanceRecord>> {
	try {
		const res = await api.put(`/attendance/${id}`, record);
		return res.data as ApiResponse<AttendanceRecord>;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function deleteAttendance(id: string): Promise<ApiResponse<null>> {
	try {
		const res = await api.delete(`/attendance/${id}`);
		return res.data as ApiResponse<null>;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}
