export interface Class {
	id: string;
	name: string;
	description?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface Section {
	id: string;
	name: string;
	classId: string;
	description?: string;
	createdAt?: string;
	updatedAt?: string;
}
