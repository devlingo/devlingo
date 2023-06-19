import { Auth } from 'firebase/auth';
import { create, GetState, SetState } from 'zustand';

import { User } from '@/types/api-types';

export interface UserStore {
	token: string | null;
	user: User | null;
	setToken: (auth: Auth) => Promise<void>;
	setUser: (user: User | null) => void;
}

export function setToken(
	set: SetState<UserStore>,
	_: GetState<UserStore>,
): (auth: Auth) => Promise<void> {
	return async (auth: Auth) => {
		if (auth.currentUser) {
			const token = await auth.currentUser.getIdToken();
			set({ token });
		}
	};
}

export function setUser(set: SetState<UserStore>, _: GetState<UserStore>) {
	return (user: User | null) => {
		set({ user });
	};
}

export const useUserStore = create<UserStore>((set, get) => ({
	token: null,
	user: null,
	setToken: setToken(set, get),
	setUser: setUser(set, get),
}));

export const useSetToken = () => useUserStore((s) => s.setToken);
export const useToken = () => useUserStore((s) => s.token);

export const useSetUser = () => useUserStore((s) => s.setUser);
export const useUser = () => useUserStore((s) => s.user);
