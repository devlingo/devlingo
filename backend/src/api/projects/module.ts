import { Module } from '@nestjs/common';

import { UsersService } from '@/api/users/service';

import { ProjectsController } from './controller';
import { ProjectsService } from './service';

@Module({
	controllers: [ProjectsController],
	imports: [],
	providers: [ProjectsService, UsersService],
})
export class ProjectsModule {}
