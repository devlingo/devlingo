import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';

import { UserUpdateDTO } from '@/dtos/body.dto';
import { UserIdParam } from '@/dtos/parameter.dto';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get(':userId')
	async getUser(@Param() userId: UserIdParam) {
		return await this.userService.retrieveUserById(userId);
	}

	@Delete(':userId')
	async deleteUser(@Param() userId: UserIdParam) {
		return await this.userService.deleteUserById(userId);
	}

	@Patch(':userId')
	async updateUser(
		@Param() userId: UserIdParam,
		@Body() body: UserUpdateDTO,
	) {
		return await this.userService.updateUser({ ...userId, ...body });
	}
}
