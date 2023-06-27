import { Injectable } from '@nestjs/common';
import { PermissionType, Prisma } from '@prisma/client';
import type { Request } from 'express';
import { ProjectResponseData } from 'shared/types';

import { UserService } from '@/api/user/service';
import { ProjectCreateDTO } from '@/dtos/body';
import { PrismaService } from '@/modules/prisma/service';

export const projectSelectArgs = (userId: string): Prisma.ProjectSelect => ({
	id: true,
	name: true,
	description: true,
	createdAt: true,
	updatedAt: true,
	userPermissions: {
		select: {
			userId: true,
			type: true,
		},
		where: {
			userId,
		},
	},
	designs: {
		select: {
			id: true,
			name: true,
			description: true,
			isDefault: true,
			createdAt: true,
			updatedAt: true,
		},
		where: {
			isDefault: true,
		},
	},
});

@Injectable()
export class ProjectService {
	constructor(
		private prisma: PrismaService,
		private userService: UserService,
	) {}

	async deleteProject({ projectId }: { projectId: string }): Promise<void> {
		await this.prisma.project.delete({
			where: {
				id: projectId,
			},
		});
	}

	async retrieveProject({
		projectId,
		request,
	}: {
		projectId: string;
		request: Request;
	}): Promise<ProjectResponseData> {
		const firebaseId = Reflect.get(request, 'firebaseId') as string;

		const { id: userId } = await this.userService.retrieveUser({
			firebaseId,
		});

		// @ts-expect-error: TS2322
		return await this.prisma.project.findUniqueOrThrow({
			where: { id: projectId },
			select: projectSelectArgs(userId),
		});
	}

	async createProject({
		request,
		data,
	}: {
		request: Request;
		data: ProjectCreateDTO;
	}): Promise<ProjectResponseData> {
		const { id: userId } =
			await this.userService.getOrCreateUserFromRequest({
				request,
			});
		// @ts-expect-error: TS2322
		return await this.prisma.project.create({
			data: {
				...data,
				userPermissions: {
					create: {
						userId: userId,
						type: PermissionType.OWNER,
					},
				},
				designs: {
					create: { name: 'Untitled Design', isDefault: true },
				},
			},
			select: projectSelectArgs(userId),
		});
	}

	async updateProject({
		data,
		request,
		projectId,
	}: {
		data: Partial<ProjectCreateDTO>;
		request: Request;
		projectId: string;
	}): Promise<ProjectResponseData> {
		const { id: userId } =
			await this.userService.getOrCreateUserFromRequest({
				request,
			});

		// @ts-expect-error: TS2322
		return await this.prisma.project.update({
			where: { id: projectId },
			data,
			select: projectSelectArgs(userId),
		});
	}

	async retrieveUserProjects({
		request,
	}: {
		request: Request;
	}): Promise<ProjectResponseData[]> {
		const { id: userId } =
			await this.userService.getOrCreateUserFromRequest({
				request,
			});

		// @ts-expect-error: TS2322
		return await this.prisma.project.findMany({
			where: {
				userPermissions: {
					some: { userId },
				},
			},
			orderBy: {
				createdAt: 'asc',
			},
			select: projectSelectArgs(userId),
		});
	}
}
