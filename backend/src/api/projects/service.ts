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
	createdAt: true,
	description: true,
	designs: {
		select: {
			createdAt: true,
			description: true,
			id: true,
			isDefault: true,
			name: true,
			projectId: true,
			updatedAt: true,
		},
		where: {
			isDefault: true,
		},
	},
	id: true,
	name: true,
	updatedAt: true,
	userPermissions: {
		select: {
			type: true,
			userId: true,
		},
		where: {
			user: { is: { firebaseId } },
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
			select: projectSelectArgs(firebaseId),
			where: { id: projectId },
		})) as unknown as ProjectResponseData;
	}

	async createProject({
		request,
		data,
	}: {
		data: ProjectCreateDTO;
		request: Request;
	}): Promise<ProjectResponseData> {
		const firebaseId = Reflect.get(request, 'firebaseId') as string;

		const { id: userId } = await this.userService.retrieveUser({
			firebaseId,
		});

		return (await this.prisma.project.create({
			data: {
				...data,
				designs: {
					create: { isDefault: true, name: 'Untitled Design' },
				},
				userPermissions: {
					create: {
						type: PermissionType.OWNER,
						userId,
					},
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
		projectId: string;
		request: Request;
	}): Promise<ProjectResponseData> {
		const firebaseId = Reflect.get(request, 'firebaseId') as string;

		return (await this.prisma.project.update({
			data,
			select: projectSelectArgs(firebaseId),
			where: { id: projectId },
		})) as unknown as ProjectResponseData;
	}

	async retrieveUserProjects({
		request,
	}: {
		request: Request;
	}): Promise<ProjectResponseData[]> {
		const firebaseId = Reflect.get(request, 'firebaseId') as string;

		return (await this.prisma.project.findMany({
			orderBy: {
				createdAt: 'asc',
			},
			select: projectSelectArgs(firebaseId),
			where: {
				userPermissions: {
					some: { user: { is: { firebaseId } } },
				},
			},
		})) as unknown as ProjectResponseData[];
	}
}
