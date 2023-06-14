import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Req,
} from '@nestjs/common';
import { Request } from 'express';

import { UserUpdateDTO } from '@/dtos/body.dto';
import { UserIdParam } from '@/dtos/parameter.dto';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get(':userId')
	async getUserById(@Param() { userId: id }: UserIdParam) {
		return await this.userService.retrieveUser({ id });
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

	@Get('/profile')
	async getUserProfile(@Req() request: Request) {
		return await this.userService.getOrCreateUserFromRequest({ request });
	}
}
