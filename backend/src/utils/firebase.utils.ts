import { App, cert, initializeApp, ServiceAccount } from 'firebase-admin/app';

const appRef: { app: App | null } = { app: null };

export function initializeFirebaseApp(config: ServiceAccount): App {
	if (!appRef.app) {
		appRef.app = initializeApp({
			credential: cert(config),
		});
	}
	return appRef.app;
}
