import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { auth } from 'firebase-admin';

import { UserUpdateDTO } from '@/dtos/body.dto';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async getOrCreateUserFromRequest({ request }: { request: Request }) {
		const firebaseId = Reflect.get(request, 'firebaseId') as string;

		try {
			return await this.retrieveUser({ firebaseId });
		} catch {
			return this.createUser({ firebaseId });
		}
	}

	async createUser({ firebaseId }: { firebaseId: string }) {
		const {
			displayName: name = 'unknown',
			email = 'unknown',
			photoURL: avatarUrl,
		} = await auth().getUser(firebaseId);

		return await this.prisma.user.create({
			data: {
				firebaseId,
				email,
				name,
				avatarUrl,
			},
		});
	}

	async retrieveUser(
		uniqueIdentifier:
			| { id: string }
			| { firebaseId: string }
			| { email: string },
	) {
		return await this.prisma.user.findUniqueOrThrow({
			where: uniqueIdentifier,
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
