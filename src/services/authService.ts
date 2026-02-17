import api from '../lib/api';

export interface AuthCredentials {
	email: string;
	password: string;
}

export interface AuthResponse {
	success: boolean;
	token?: string;
	user?: any;
	message?: string;
}

export async function login(credentials: AuthCredentials): Promise<AuthResponse> {
	try {
		const res = await api.post('/auth/login', credentials);
		return res.data as AuthResponse;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function logout(): Promise<AuthResponse> {
	try {
		const res = await api.post('/auth/logout');
		return res.data as AuthResponse;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function register(data: any): Promise<AuthResponse> {
	try {
		const res = await api.post('/auth/register', data);
		return res.data as AuthResponse;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}
