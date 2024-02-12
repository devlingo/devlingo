import { Module } from '@nestjs/common';

import { VersionsController } from './controller';
import { VersionsService } from './service';

@Module({
	controllers: [VersionsController],
	exports: [VersionsService],
	imports: [],
	providers: [VersionsService],
})
export class VersionsModule {}
