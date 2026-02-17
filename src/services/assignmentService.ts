import api from '../lib/api';

export interface Assignment {
	id: string;
	title: string;
	description: string;
	dueDate: string;
	// Add more fields as needed
}

export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
}

export async function fetchAssignments(): Promise<ApiResponse<Assignment[]>> {
	try {
		const res = await api.get<ApiResponse<Assignment[]>>('/assignments');
		return res.data;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function createAssignment(assignment: Omit<Assignment, 'id'>): Promise<ApiResponse<Assignment>> {
	try {
		const res = await api.post<ApiResponse<Assignment>>('/assignments', assignment);
		return res.data;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function updateAssignment(id: string, assignment: Partial<Assignment>): Promise<ApiResponse<Assignment>> {
	try {
		const res = await api.put<ApiResponse<Assignment>>(`/assignments/${id}`, assignment);
		return res.data;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function deleteAssignment(id: string): Promise<ApiResponse<null>> {
	try {
		const res = await api.delete<ApiResponse<null>>(`/assignments/${id}`);
		return res.data;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}
