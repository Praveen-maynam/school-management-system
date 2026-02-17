import api from '../lib/api';

export interface Parent {
	id: string;
	name: string;
	email: string;
	phone: string;
	// Add more fields as needed
}

export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
}

export async function fetchParents(): Promise<ApiResponse<Parent[]>> {
	try {
		const res = await api.get<ApiResponse<Parent[]>>('/parents');
		return res.data;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function createParent(parent: Omit<Parent, 'id'>): Promise<ApiResponse<Parent>> {
	try {
		const res = await api.post<ApiResponse<Parent>>('/parents', parent);
		return res.data;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function updateParent(id: string, parent: Partial<Parent>): Promise<ApiResponse<Parent>> {
	try {
		const res = await api.put<ApiResponse<Parent>>(`/parents/${id}`, parent);
		return res.data;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function deleteParent(id: string): Promise<ApiResponse<null>> {
	try {
		const res = await api.delete<ApiResponse<null>>(`/parents/${id}`);
		return res.data;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}
