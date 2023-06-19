import { Auth } from 'firebase/auth';
import { create, GetState, SetState } from 'zustand';

export interface UserStore {
	token: string | null;
	setToken: (auth: Auth) => Promise<void>;
}

export function setToken(
	set: SetState<UserStore>,
	_: GetState<UserStore>,
): (auth: Auth) => Promise<void> {
	return async (auth: Auth) => {
		if (auth.currentUser) {
			const token = await auth.currentUser.getIdToken(true);
			set({ token });
		}
	};
}

export const useApiStore = create<UserStore>((set, get) => ({
	token: null,
	setToken: setToken(set, get),
}));

export const useSetToken = () => useApiStore((s) => s.setToken);
export const useToken = () => useApiStore((s) => s.token);
