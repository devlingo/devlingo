import { Global, Module } from '@nestjs/common';

import { FirebaseService } from './service';

@Global()
@Module({
	providers: [FirebaseService],
	exports: [FirebaseService],
})
export class FirebaseModule {}
