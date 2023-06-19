import { HttpMethod } from '@/constants';

export interface User {
	id: string;
	firebaseId: string;
	email: string;
	name: string;
	avatarUrl: string | null;
	createdAt: Date;
	updatedAt: Date;
}

export interface Project {
	id: string;
	name: string;
	description: string | null;
	createdAt: Date;
	updatedAt: Date;
}

export type ApiParams = {
	token: string;
	url: string;
	method: HttpMethod;
} & Omit<RequestInit, 'method'>;
