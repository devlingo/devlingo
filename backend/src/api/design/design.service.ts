import { Injectable } from '@nestjs/common';
import { Design } from '@prisma/client';

import { PrismaService } from '../../modules/prisma/prisma.service';

@Injectable()
export class DesignService {
	constructor(private prisma: PrismaService) {}

	async deleteDesignVersion({
		projectId,
		name,
		version,
	}: {
		projectId: string;
		name: string;
		version: number;
	}): Promise<void> {
		await this.prisma.design.delete({
			where: { name_version_projectId: { name, projectId, version } },
		});
	}

	async retrieveDesignVersion({
		projectId,
		name,
		version,
	}: {
		projectId: string;
		name: string;
		version: number;
	}): Promise<Design> {
		return await this.prisma.design.findUniqueOrThrow({
			where: { name_version_projectId: { name, projectId, version } },
		});
	}

	async retrieveProjectDesignVersions({
		projectId,
	}: {
		projectId: string;
	}): Promise<{ name: string; version: number }[]> {
		return await this.prisma.design.findMany({
			select: { name: true, version: true },
			orderBy: {
				name: 'asc',
			},
			where: { projectId },
		});
	}

	async createDesignVersion(data: {
		projectId: string;
		data: Record<string, any>;
		name: string;
	}) {
		return await this.prisma.design.create({ data });
	}
}
