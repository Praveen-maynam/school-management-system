import api from '../lib/api';

export interface Fee {
	id: string;
	studentId: string;
	amount: number;
	dueDate: string;
	status: 'paid' | 'unpaid' | 'overdue';
	// Add more fields as needed
}

export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
}

export async function fetchFees(): Promise<ApiResponse<Fee[]>> {
	try {
		const res = await api.get<ApiResponse<Fee[]>>('/fees');
		return res.data;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function createFee(fee: Omit<Fee, 'id'>): Promise<ApiResponse<Fee>> {
	try {
		const res = await api.post<ApiResponse<Fee>>('/fees', fee);
		return res.data;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function updateFee(id: string, fee: Partial<Fee>): Promise<ApiResponse<Fee>> {
	try {
		const res = await api.put<ApiResponse<Fee>>(`/fees/${id}`, fee);
		return res.data;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function deleteFee(id: string): Promise<ApiResponse<null>> {
	try {
		const res = await api.delete<ApiResponse<null>>(`/fees/${id}`);
		return res.data;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}
