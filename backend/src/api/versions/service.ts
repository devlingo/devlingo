import { Injectable } from '@nestjs/common';
import { Version } from '@prisma/client';

import { VersionDTO } from '@/dtos/body';
import { PrismaService } from '@/modules/prisma/service';

@Injectable()
export class VersionsService {
	constructor(private prisma: PrismaService) {}

	async createVersion({
		designId,
		nodes,
		edges,
		viewport,
	}: VersionDTO & { designId: string }): Promise<Omit<Version, 'data'>> {
		await this.prisma.design.findUniqueOrThrow({
			where: { id: designId },
		});

		return await this.prisma.version.create({
			data: {
				data: JSON.stringify({ nodes, edges, viewport }),
				designId,
			},
			select: {
				id: true,
				designId: true,
				createdAt: true,
			},
		});
	}

	async retrieveVersionById({ versionId }: { versionId: string }) {
		const { data, ...rest } = await this.prisma.version.findUniqueOrThrow({
			where: { id: versionId },
		});
		return {
			data: data
				? (JSON.parse(data as string) as Record<string, any>)
				: null,
			...rest,
		};
	}

	async deleteVersionById({
		versionId,
	}: {
		versionId: string;
	}): Promise<void> {
		await this.prisma.version.delete({
			where: { id: versionId },
		});
	}
}
