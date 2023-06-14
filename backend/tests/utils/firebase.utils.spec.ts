import { testPrivateKey } from 'tests/testing.utils';

import { initializeFirebaseApp } from '@/utils/firebase.utils';

describe('Firebase utils tests', () => {
	describe('initializeFirebaseApp tests', () => {
		const config = {
			projectId: 'test-project',
			clientEmail: 'test-email',
			privateKey: testPrivateKey,
		};
		it('initializes an app', () => {
			const app = initializeFirebaseApp(config);
			expect(app).toBeDefined();
		});

		it('memoizes the app', () => {
			const app1 = initializeFirebaseApp(config);
			const app2 = initializeFirebaseApp(config);
			expect(app1).toBe(app2);
		});
	});
});
