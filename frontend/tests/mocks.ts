import { v4 as uuidv4 } from 'uuid';
import { beforeEach } from 'vitest';

vi.mock('uuid', () => ({
	v4: vi.fn().mockReturnValue('uuidv4_value'),
}));

export const mockFetch = vi.fn().mockResolvedValue({
	ok: true,
	status: 200,
	json: () => Promise.resolve({}),
});

const env = {
	NEXT_PUBLIC_BACKEND_BASE_URL: 'http://www.example.com',
	NEXT_PUBLIC_FIREBASE_API_KEY: uuidv4(),
	NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: 'devlingo-demo.firebaseapp.com',
	NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'devlingo-demo',
	NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: 'devlingo-demo.appspot.com',
	NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID: 12_345_678_910,
	NEXT_PUBLIC_FIREBASE_APP_ID: uuidv4(),
	NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: uuidv4(),
	NEXT_PUBLIC_FIREBASE_MICROSOFT_TENANT_ID: uuidv4(),
};

export const setEnv = (key: keyof typeof env, value: string) => {
	Reflect.set(process.env, key, value);
};

const { initializeAppMock, getAuthMock } = vi.hoisted(() => {
	return {
		initializeAppMock: vi.fn().mockReturnValue({}),
		getAuthMock: vi.fn().mockImplementation(() => ({
			setPersistence: vi.fn(),
			currentUser: {
				getIdToken: vi.fn().mockResolvedValue('test_token'),
			},
		})),
	};
});

vi.mock(
	'firebase/app',
	async (importOriginal: () => Promise<Record<string, any>>) => {
		const original = await importOriginal();
		return { ...original, initializeApp: initializeAppMock };
	},
);

vi.mock(
	'firebase/auth',
	async (importOriginal: () => Promise<Record<string, any>>) => {
		const original = await importOriginal();

		return {
			...original,
			getAuth: getAuthMock,
			browserLocalPersistence: vi.fn(),
		};
	},
);

beforeEach(() => {
	global.fetch = mockFetch;
	Object.assign(process.env, env);
});

export { getAuthMock, initializeAppMock };

// react flow mocking

class ResizeObserver {
	callback: globalThis.ResizeObserverCallback;

	constructor(callback: globalThis.ResizeObserverCallback) {
		this.callback = callback;
	}

	observe(target: Element) {
		this.callback([{ target } as globalThis.ResizeObserverEntry], this);
	}

	unobserve = vi.fn();

	disconnect = vi.fn();
}

global.ResizeObserver = ResizeObserver;

class DOMMatrixReadOnly {
	m22: number;
	constructor(transform: string) {
		const scale = transform.match(/scale\(([.1-9])\)/)?.[1];
		this.m22 = scale === undefined ? 1 : +scale;
	}
}

//@ts-expect-error: TS2739
global.DOMMatrixReadOnly = DOMMatrixReadOnly;

Object.defineProperties(global.HTMLElement.prototype, {
	offsetHeight: {
		get() {
			return Number.parseFloat(this.style.height) || 1;
		},
	},
	offsetWidth: {
		get() {
			return Number.parseFloat(this.style.width) || 1;
		},
	},
});

(global.SVGElement as any).prototype.getBBox = () => ({
	x: 0,
	y: 0,
	width: 0,
	height: 0,
});
