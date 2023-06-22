import { ForbiddenException, Injectable } from '@nestjs/common';
import { PermissionType, Project } from '@prisma/client';
import type { Request } from 'express';

import { UserService } from '@/api/user/user.service';
import { ProjectCreateDTO } from '@/dtos/body.dto';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class ProjectService {
	constructor(
		private prisma: PrismaService,
		private userService: UserService,
	) {}

	async deleteProject({
		projectId,
		request,
	}: {
		projectId: string;
		request: Request;
	}): Promise<void> {
		const { id: userId } =
			await this.userService.getOrCreateUserFromRequest({
				request,
			});

		await this.validateUserPermission({
			permissionType: PermissionType.OWNER,
			userId,
			projectId,
		});

		await this.prisma.project.delete({
			where: { id: projectId },
		});
	}

	async retrieveProject({
		projectId,
		request,
	}: {
		projectId: string;
		request: Request;
	}): Promise<Project> {
		const { id: userId } =
			await this.userService.getOrCreateUserFromRequest({
				request,
			});

		await this.validateUserPermission({
			permissionType: PermissionType.VIEWER,
			userId,
			projectId,
		});

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
		const { id: userId } =
			await this.userService.getOrCreateUserFromRequest({
				request,
			});

		const project = await this.prisma.project.create({
			data,
		});

		await this.prisma.userProjectPermission.create({
			data: {
				userId,
				projectId: project.id,
				type: PermissionType.OWNER,
			},
		});

		return project;
	}

	async updateProject({
		data,
		request,
		projectId,
	}: {
		data: Partial<ProjectCreateDTO>;
		request: Request;
		projectId: string;
	}) {
		const { id: userId } =
			await this.userService.getOrCreateUserFromRequest({
				request,
			});

		await this.validateUserPermission({
			permissionType: PermissionType.EDITOR,
			userId,
			projectId,
		});

		return await this.prisma.project.update({
			where: { id: projectId },
			data,
		});
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
					some: { userId: id },
				},
			},
			orderBy: {
				createdAt: 'asc',
			},
		});
	}

	private async validateUserPermission({
		permissionType,
		userId,
		projectId,
	}: {
		permissionType: PermissionType;
		userId: string;
		projectId: string;
	}): Promise<void> {
		try {
			const permission =
				await this.prisma.userProjectPermission.findUniqueOrThrow({
					where: { projectId_userId: { userId, projectId } },
				});
			if (
				permission.type === PermissionType.OWNER ||
				permission.type === permissionType
			) {
				return;
			}
		} catch {
			throw new ForbiddenException('no permissions');
		}

		throw new ForbiddenException('insufficient permissions');
	}
}
