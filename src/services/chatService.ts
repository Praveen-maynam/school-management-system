import api from '../lib/api';

export interface ChatMessage {
	id: string;
	senderId: string;
	receiverId: string;
	content: string;
	timestamp: string;
}

export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
}

export async function fetchMessages(conversationId: string): Promise<ApiResponse<ChatMessage[]>> {
	try {
		const res = await api.get(`/chats/${conversationId}/messages`);
		return res.data as ApiResponse<ChatMessage[]>;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function sendMessage(conversationId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>): Promise<ApiResponse<ChatMessage>> {
	try {
		const res = await api.post(`/chats/${conversationId}/messages`, message);
		return res.data as ApiResponse<ChatMessage>;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}
