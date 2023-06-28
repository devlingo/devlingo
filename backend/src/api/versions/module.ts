import { Module } from '@nestjs/common';

import { VersionsController } from './controller';
import { VersionsService } from './service';

@Module({
	imports: [],
	controllers: [VersionsController],
	providers: [VersionsService],
})
export class VersionsModule {}
