import { Module } from '@nestjs/common';

import { DesignController } from './design.controller';
import { DesignService } from './design.service';

@Module({
	imports: [],
	controllers: [DesignController],
	providers: [DesignService],
})
export class DesignModule {}
