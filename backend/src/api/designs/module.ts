import { Module } from '@nestjs/common';

import { DesignController } from './controller';
import { DesignService } from './service';

@Module({
	controllers: [DesignController],
	imports: [],
	providers: [DesignService],
})
export class DesignsModule {}
