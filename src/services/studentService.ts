import api from '../lib/api';

import { Class, Section } from '../types/student.types';

export interface Student {
	id: string;
	name: string;
	email: string;
	grade: string;
	// Add more fields as needed
}

export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
}

export async function fetchStudents(): Promise<ApiResponse<Student[]>> {
	try {
		const res = await api.get('/students');
		return res.data as ApiResponse<Student[]>;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function createStudent(student: Omit<Student, 'id'>): Promise<ApiResponse<Student>> {
	try {
		const res = await api.post('/students', student);
		return res.data as ApiResponse<Student>;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function updateStudent(id: string, student: Partial<Student>): Promise<ApiResponse<Student>> {
	try {
		const res = await api.put(`/students/${id}`, student);
		return res.data as ApiResponse<Student>;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function deleteStudent(id: string): Promise<ApiResponse<null>> {
	try {
		const res = await api.delete(`/students/${id}`);
		return res.data as ApiResponse<null>;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

// --- Class APIs ---
export async function fetchClasses(): Promise<ApiResponse<Class[]>> {
	try {
		const res = await api.get<ApiResponse<Class[]>>('/classes');
		return res.data;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function createClass(newClass: Omit<Class, 'id'>): Promise<ApiResponse<Class>> {
	try {
		const res = await api.post<ApiResponse<Class>>('/classes', newClass);
		return res.data;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function updateClass(id: string, updatedClass: Partial<Class>): Promise<ApiResponse<Class>> {
	try {
		const res = await api.put<ApiResponse<Class>>(`/classes/${id}`, updatedClass);
		return res.data;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function deleteClass(id: string): Promise<ApiResponse<null>> {
	try {
		const res = await api.delete<ApiResponse<null>>(`/classes/${id}`);
		return res.data;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

// --- Section APIs ---
export async function fetchSections(classId?: string): Promise<ApiResponse<Section[]>> {
	try {
		const url = classId ? `/sections?classId=${classId}` : '/sections';
		const res = await api.get<ApiResponse<Section[]>>(url);
		return res.data;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function createSection(newSection: Omit<Section, 'id'>): Promise<ApiResponse<Section>> {
	try {
		const res = await api.post<ApiResponse<Section>>('/sections', newSection);
		return res.data;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function updateSection(id: string, updatedSection: Partial<Section>): Promise<ApiResponse<Section>> {
	try {
		const res = await api.put<ApiResponse<Section>>(`/sections/${id}`, updatedSection);
		return res.data;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}

export async function deleteSection(id: string): Promise<ApiResponse<null>> {
	try {
		const res = await api.delete<ApiResponse<null>>(`/sections/${id}`);
		return res.data;
	} catch (error: any) {
		return { success: false, message: error.response?.data?.message || error.message };
	}
}
