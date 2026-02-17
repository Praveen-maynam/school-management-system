import api from '../lib/api';

export interface Book {
	id: string;
	title: string;
	author: string;
	isbn: string;
	available: boolean;
	// Add more fields as needed
}

export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
}

export async function fetchBooks(): Promise<ApiResponse<Book[]>> {
	try {
		const res = await api.get<ApiResponse<Book[]>>('/library/books');
		return res.data;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function addBook(book: Omit<Book, 'id'>): Promise<ApiResponse<Book>> {
	try {
		const res = await api.post<ApiResponse<Book>>('/library/books', book);
		return res.data;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function updateBook(id: string, book: Partial<Book>): Promise<ApiResponse<Book>> {
	try {
		const res = await api.put<ApiResponse<Book>>(`/library/books/${id}`, book);
		return res.data;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function deleteBook(id: string): Promise<ApiResponse<null>> {
	try {
		const res = await api.delete<ApiResponse<null>>(`/library/books/${id}`);
		return res.data;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}
