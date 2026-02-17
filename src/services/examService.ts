import api from '../lib/api';

export interface Exam {
	id: string;
	title: string;
	date: string;
	subject: string;
	// Add more fields as needed
}

export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
}

export async function fetchExams(): Promise<ApiResponse<Exam[]>> {
	try {
		const res = await api.get('/exams');
		return res.data as ApiResponse<Exam[]>;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function createExam(exam: Omit<Exam, 'id'>): Promise<ApiResponse<Exam>> {
	try {
		const res = await api.post('/exams', exam);
		return res.data as ApiResponse<Exam>;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function updateExam(id: string, exam: Partial<Exam>): Promise<ApiResponse<Exam>> {
	try {
		const res = await api.put(`/exams/${id}`, exam);
		return res.data as ApiResponse<Exam>;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function deleteExam(id: string): Promise<ApiResponse<null>> {
	try {
		const res = await api.delete(`/exams/${id}`);
		return res.data as ApiResponse<null>;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}
