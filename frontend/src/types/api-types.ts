import { HttpMethod } from '@/constants';

export interface User {
	id: string;
	firebaseId: string;
	email: string;
	name: string;
	avatarUrl: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface Project {
	id: string;
	name: string;
	description: string | null;
	createdAt: string;
	updatedAt: string;
}

export type ApiParams = {
	token: string;
	url: string;
	method: HttpMethod;
	version?: number;
} & Omit<RequestInit, 'method'>;
