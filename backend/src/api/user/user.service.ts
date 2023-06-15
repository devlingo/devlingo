import { Injectable } from '@nestjs/common';
import { Request } from 'express';

import { UserUpdateDTO } from '@/dtos/body.dto';
import { FirebaseService } from '@/modules/firebase/firebase.service';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class UserService {
	constructor(
		private prisma: PrismaService,
		private firebaseService: FirebaseService,
	) {}

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
		} = await this.firebaseService.auth.getUser(firebaseId);

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
		const user = await this.prisma.user.delete({
			where: {
				id: userId,
			},
		});

		await this.firebaseService.auth.deleteUser(user.firebaseId);
	}

	async updateUser({ userId, ...data }: UserUpdateDTO & { userId: string }) {
		const updatedUser = await this.prisma.user.update({
			where: {
				id: userId,
			},
			data,
		});

		await this.firebaseService.auth.updateUser(updatedUser.firebaseId, {
			displayName: data.name,
			photoURL: data.avatarUrl,
		});

		return updatedUser;
	}
}
