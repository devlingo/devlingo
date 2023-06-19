import { Injectable } from '@nestjs/common';
import { PermissionType, Project } from '@prisma/client';
import { Request } from 'express';

import { UserService } from '@/api/user/user.service';
import { ProjectCreateDTO } from '@/dtos/body.dto';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class ProjectService {
	constructor(
		private prisma: PrismaService,
		private userService: UserService,
	) {}

	async deleteProject({ projectId }: { projectId: string }): Promise<void> {
		await this.prisma.project.delete({
			where: { id: projectId },
		});
	}

	async retrieveProject({
		projectId,
	}: {
		projectId: string;
	}): Promise<Project> {
		return await this.prisma.project.findUniqueOrThrow({
			where: { id: projectId },
			select: {
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
				},
			},
		});
	}

	async createProject({
		request,
		data,
	}: {
		request: Request;
		data: ProjectCreateDTO;
	}): Promise<Project> {
		const { id } = await this.userService.getOrCreateUserFromRequest({
			request,
		});

		const project = await this.prisma.project.create({
			data,
		});

		await this.prisma.userProjectPermission.create({
			data: {
				userId: id,
				projectId: project.id,
				type: PermissionType.OWNER,
			},
		});

		return project;
	}

	async retrieveUserProjects({
		request,
	}: {
		request: Request;
	}): Promise<Project[]> {
		const { id } = await this.userService.getOrCreateUserFromRequest({
			request,
		});

		return await this.prisma.project.findMany({
			where: {
				userPermissions: {
					some: { id },
				},
			},
			orderBy: {
				name: 'asc',
			},
		});
	}
}
