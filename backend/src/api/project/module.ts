import { Module } from '@nestjs/common';

import { UserService } from '@/api/user/service';

import { ProjectController } from './controller';
import { ProjectService } from './service';

@Module({
	imports: [],
	controllers: [ProjectController],
	providers: [ProjectService, UserService],
})
export class ProjectModule {}
