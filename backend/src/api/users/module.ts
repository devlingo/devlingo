import { Module } from '@nestjs/common';

import { UsersController } from './controller';
import { UsersService } from './service';

@Module({
	imports: [],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
