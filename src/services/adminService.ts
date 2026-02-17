import api from '../lib/api';

// Types
export interface Admin {
	id: string;
	name: string;
	email: string;
	role: string;
	// Add more fields as needed
}

export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
}

/**
 * Fetch all admins
 */
export async function fetchAdmins(): Promise<ApiResponse<Admin[]>> {
	try {
		const res = await api.get('/admins');
		return res.data as ApiResponse<Admin[]>;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

/**
 * Create a new admin
 */
export async function createAdmin(admin: Omit<Admin, 'id'>): Promise<ApiResponse<Admin>> {
	try {
		const res = await api.post('/admins', admin);
		return res.data as ApiResponse<Admin>;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

/**
 * Update an admin
 */
export async function updateAdmin(id: string, admin: Partial<Admin>): Promise<ApiResponse<Admin>> {
	try {
		const res = await api.put(`/admins/${id}`, admin);
		return res.data as ApiResponse<Admin>;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

/**
 * Delete an admin
 */
export async function deleteAdmin(id: string): Promise<ApiResponse<null>> {
	try {
		const res = await api.delete(`/admins/${id}`);
		return res.data as ApiResponse<null>;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}
