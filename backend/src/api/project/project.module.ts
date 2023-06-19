import { Module } from '@nestjs/common';

import { UserService } from '@/api/user/user.service';

import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
	imports: [],
	controllers: [ProjectController],
	providers: [ProjectService, UserService],
})
export class ProjectModule {}
