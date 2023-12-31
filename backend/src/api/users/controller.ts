import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Req,
} from '@nestjs/common';
import type { Request } from 'express';

import { UserUpdateDTO } from '@/dtos/body';
import { UserIdParam } from '@/dtos/parameter';

import { UsersService } from './service';

@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@Get('/profile')
	async getUserProfile(@Req() request: Request) {
		return await this.userService.getOrCreateUserFromRequest({ request });
	}

	@Get(':userId')
	async getUserById(@Param() { userId: id }: UserIdParam) {
		return await this.userService.retrieveUser({ id });
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':userId')
	async deleteUser(@Param() userId: UserIdParam) {
		await this.userService.deleteUserById(userId);
	}

	@Patch(':userId')
	async updateUser(
		@Param() userId: UserIdParam,
		@Body() body: UserUpdateDTO,
	) {
		return await this.userService.updateUser({ ...userId, ...body });
	}
}
