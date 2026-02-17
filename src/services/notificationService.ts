import api from '../lib/api';

export interface Notification {
	id: string;
	userId: string;
	message: string;
	read: boolean;
	createdAt: string;
}

export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
}

export async function fetchNotifications(userId: string): Promise<ApiResponse<Notification[]>> {
	try {
		const res = await api.get<ApiResponse<Notification[]>>(`/notifications?userId=${userId}`);
		return res.data;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function markAsRead(id: string): Promise<ApiResponse<Notification>> {
	try {
		const res = await api.patch<ApiResponse<Notification>>(`/notifications/${id}/read`);
		return res.data;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function deleteNotification(id: string): Promise<ApiResponse<null>> {
	try {
		const res = await api.delete<ApiResponse<null>>(`/notifications/${id}`);
		return res.data;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}
