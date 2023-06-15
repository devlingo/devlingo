import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { Auth, connectAuthEmulator, getAuth } from 'firebase/auth';
import * as process from 'process';

const instanceRef: { app: FirebaseApp | null; auth: Auth | null } = {
	app: null,
	auth: null,
};

export function getFirebaseConfig(): FirebaseOptions {
	const firebaseConfig = {
		apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
		authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
		projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
		messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
		appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
		measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
	} satisfies FirebaseOptions;

	for (const [key, value] of Object.entries(firebaseConfig)) {
		if (!value) {
			throw new Error(`Missing Firebase config value for ${key}`);
		}
	}

	return firebaseConfig;
}

export function getFirebaseApp(): FirebaseApp {
	if (!instanceRef.app) {
		const firebaseConfig = getFirebaseConfig();
		instanceRef.app = initializeApp(firebaseConfig);
	}

	return instanceRef.app;
}

export function getFirebaseAuth(): Auth {
	if (!instanceRef.auth) {
		const auth = getAuth(getFirebaseApp());

		if (
			process.env.NODE_ENV === 'development' &&
			process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR
		) {
			connectAuthEmulator(auth, 'http://127.0.0.1:9099');
		}
		instanceRef.auth = auth;
	}

	return instanceRef.auth;
}
