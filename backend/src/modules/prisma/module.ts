import { Global, Module } from '@nestjs/common';

import { Service } from './service';

@Global()
@Module({
	providers: [Service],
	exports: [Service],
})
export class PrismaModule {}
