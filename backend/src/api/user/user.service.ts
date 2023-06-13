import { Injectable } from '@nestjs/common';

import { UserUpdateDTO } from '@/dtos/body.dto';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}
	async retrieveUserById({ userId }: { userId: string }) {
		return await this.prisma.user.findUniqueOrThrow({
			where: {
				id: userId,
			},
		});
	}

	async deleteUserById({ userId }: { userId: string }) {
		await this.prisma.user.delete({
			where: {
				id: userId,
			},
		});
	}

	async updateUser({ userId, ...data }: UserUpdateDTO & { userId: string }) {
		return await this.prisma.user.update({
			where: {
				id: userId,
			},
			data,
		});
	}
}
