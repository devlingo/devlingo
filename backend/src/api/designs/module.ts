import { Module } from '@nestjs/common';

import { DesignController } from './controller';
import { DesignService } from './service';

@Module({
	imports: [],
	controllers: [DesignController],
	providers: [DesignService],
})
export class DesignsModule {}
