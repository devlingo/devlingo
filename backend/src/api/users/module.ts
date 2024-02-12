import { Module } from '@nestjs/common';

import { UsersController } from './controller';
import { UsersService } from './service';

@Module({
	controllers: [UsersController],
	exports: [UsersService],
	imports: [],
	providers: [UsersService],
})
export class UsersModule {}
