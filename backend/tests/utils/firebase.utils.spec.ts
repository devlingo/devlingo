import { testPrivateKey } from 'tests/testing.utils';

import { getFirebaseApp } from '@/utils/firebase.utils';

describe('Firebase utils tests', () => {
	describe('getFirebaseApp tests', () => {
		const config = {
			projectId: 'test-project',
			clientEmail: 'test-email',
			privateKey: testPrivateKey,
		};
		it('initializes an app', () => {
			const app = getFirebaseApp(config);
			expect(app).toBeDefined();
		});

		it('memoizes the app', () => {
			const app1 = getFirebaseApp(config);
			const app2 = getFirebaseApp(config);
			expect(app1).toBe(app2);
		});
	});
});
