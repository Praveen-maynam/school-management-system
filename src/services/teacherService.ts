import api from '../lib/api';

export interface Teacher {
	id: string;
	name: string;
	email: string;
	subject: string;
	// Add more fields as needed
}

export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
}

export async function fetchTeachers(): Promise<ApiResponse<Teacher[]>> {
	try {
		const res = await api.get<ApiResponse<Teacher[]>>('/teachers');
		return res.data;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function createTeacher(teacher: Omit<Teacher, 'id'>): Promise<ApiResponse<Teacher>> {
	try {
		const res = await api.post<ApiResponse<Teacher>>('/teachers', teacher);
		return res.data;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function updateTeacher(id: string, teacher: Partial<Teacher>): Promise<ApiResponse<Teacher>> {
	try {
		const res = await api.put<ApiResponse<Teacher>>(`/teachers/${id}`, teacher);
		return res.data;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function deleteTeacher(id: string): Promise<ApiResponse<null>> {
	try {
		const res = await api.delete<ApiResponse<null>>(`/teachers/${id}`);
		return res.data;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}
