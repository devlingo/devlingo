import { Injectable, OnModuleInit } from '@nestjs/common';

import { initializeFirebaseApp } from '@/utils/firebase.utils';

@Injectable()
export class FirebaseService implements OnModuleInit {
	onModuleInit() {
		initializeFirebaseApp();
	}
}
