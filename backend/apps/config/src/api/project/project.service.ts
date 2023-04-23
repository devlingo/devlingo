import { Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';
import { PrismaService } from 'shared/modules/prisma.service';

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
		});
	}

	async createProject(data: { name: string }): Promise<Project> {
		return await this.prisma.project.create({
			data,
		});
	}

	async retrieveProjects(): Promise<Project[]> {
		return await this.prisma.project.findMany({
			orderBy: {
				name: 'asc',
			},
		});
	}
}
