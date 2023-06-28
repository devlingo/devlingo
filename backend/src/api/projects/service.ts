import { Injectable } from '@nestjs/common';
import { PermissionType, Prisma } from '@prisma/client';
import type { Request } from 'express';
import { ProjectResponseData } from 'shared/types';

import { UsersService } from '@/api/users/service';
import { ProjectCreateDTO } from '@/dtos/body';
import { PrismaService } from '@/modules/prisma/service';

export const projectSelectArgs = (
	firebaseId: string,
): Prisma.ProjectSelect => ({
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
			user: { is: { firebaseId } },
		},
	},
	designs: {
		select: {
			id: true,
			name: true,
			projectId: true,
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
export class ProjectsService {
	constructor(
		private prisma: PrismaService,
		private userService: UsersService,
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

		return (await this.prisma.project.findUniqueOrThrow({
			where: { id: projectId },
			select: projectSelectArgs(firebaseId),
		})) as unknown as ProjectResponseData;
	}

	async createProject({
		request,
		data,
	}: {
		request: Request;
		data: ProjectCreateDTO;
	}): Promise<ProjectResponseData> {
		const firebaseId = Reflect.get(request, 'firebaseId') as string;

		const { id: userId } = await this.userService.retrieveUser({
			firebaseId,
		});

		return (await this.prisma.project.create({
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
			select: projectSelectArgs(firebaseId),
		})) as unknown as ProjectResponseData;
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
		const firebaseId = Reflect.get(request, 'firebaseId') as string;

		return (await this.prisma.project.update({
			where: { id: projectId },
			data,
			select: projectSelectArgs(firebaseId),
		})) as unknown as ProjectResponseData;
	}

	async retrieveUserProjects({
		request,
	}: {
		request: Request;
	}): Promise<ProjectResponseData[]> {
		const firebaseId = Reflect.get(request, 'firebaseId') as string;

		return (await this.prisma.project.findMany({
			where: {
				userPermissions: {
					some: { user: { is: { firebaseId } } },
				},
			},
			orderBy: {
				createdAt: 'asc',
			},
			select: projectSelectArgs(firebaseId),
		})) as unknown as ProjectResponseData[];
	}
}
