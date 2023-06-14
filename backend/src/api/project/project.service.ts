import { Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';

import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class ProjectService {
	constructor(private prisma: PrismaService) {}

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

	async createProject(data: { name: string }): Promise<Project> {
		return await this.prisma.project.create({
			data,
		});
	}

	async retrieveUserProjects(): Promise<Project[]> {
		return await this.prisma.project.findMany({
			// where: {
			// 	userPermissions: {
			// 		some: { id: userId },
			// 	},
			// },
			orderBy: {
				name: 'asc',
			},
		});
	}
}
