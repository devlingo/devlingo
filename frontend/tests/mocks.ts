import { v4 as uuidv4 } from 'uuid';
import { beforeEach } from 'vitest';

export const mockFetch = vi.fn().mockResolvedValue({
	ok: true,
	json: () => Promise.resolve({}),
});

const env = {
	NEXT_PUBLIC_BACKEND_BASE_URL: 'http://www.example.com',
	NEXT_PUBLIC_FIREBASE_API_KEY: uuidv4(),
	NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: 'devlingo-demo.firebaseapp.com',
	NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'devlingo-demo',
	NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: 'devlingo-demo.appspot.com',
	NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID: 12345678910,
	NEXT_PUBLIC_FIREBASE_APP_ID: uuidv4(),
	NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: uuidv4(),
	NEXT_PUBLIC_FIREBASE_MICROSOFT_TENANT_ID: uuidv4(),
};

export const setEnv = (key: keyof typeof env, value: string) => {
	Reflect.set(process.env, key, value);
};

beforeEach(() => {
	global.fetch = mockFetch;
	Object.assign(process.env, env);
});
