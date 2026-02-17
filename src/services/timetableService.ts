import api from '../lib/api';

export interface TimetableEntry {
	id: string;
	classId: string;
	subject: string;
	teacherId: string;
	day: string;
	startTime: string;
	endTime: string;
	// Add more fields as needed
}

export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
}

export async function fetchTimetable(classId: string): Promise<ApiResponse<TimetableEntry[]>> {
	try {
		const res = await api.get(`/timetable?classId=${classId}`);
		return res.data as ApiResponse<TimetableEntry[]>;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function createTimetableEntry(entry: Omit<TimetableEntry, 'id'>): Promise<ApiResponse<TimetableEntry>> {
	try {
		const res = await api.post('/timetable', entry);
		return res.data as ApiResponse<TimetableEntry>;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function updateTimetableEntry(id: string, entry: Partial<TimetableEntry>): Promise<ApiResponse<TimetableEntry>> {
	try {
		const res = await api.put(`/timetable/${id}`, entry);
		return res.data as ApiResponse<TimetableEntry>;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function deleteTimetableEntry(id: string): Promise<ApiResponse<null>> {
	try {
		const res = await api.delete(`/timetable/${id}`);
		return res.data as ApiResponse<null>;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}
