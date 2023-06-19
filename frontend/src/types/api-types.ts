export interface User {
	id: string;
	firebaseId: string;
	email: string;
	name: string;
	avatarUrl: string | null;
	createdAt: Date;
	updatedAt: Date;
}

export type ApiParams<T = any> = { token: string } & T;
