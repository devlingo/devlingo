import { Injectable } from '@nestjs/common';
import { DesignVersion } from '@prisma/client';

import { VersionDTO } from '@/dtos/body';
import { PrismaService } from '@/modules/prisma/service';

@Injectable()
export class VersionsService {
	constructor(private prisma: PrismaService) {}

	async createVersion({
		data,
		designId,
	}: VersionDTO & { designId: string }): Promise<DesignVersion> {
		await this.prisma.design.findUniqueOrThrow({
			where: { id: designId },
		});

		return await this.prisma.designVersion.create({
			data: {
				data,
				designId,
			},
		});
	}

	async retrieveVersionById({
		versionId,
	}: {
		versionId: string;
	}): Promise<DesignVersion> {
		return await this.prisma.designVersion.findUniqueOrThrow({
			where: { id: versionId },
		});
	}

	async deleteVersionById({
		versionId,
	}: {
		versionId: string;
	}): Promise<void> {
		await this.prisma.designVersion.delete({
			where: { id: versionId },
		});
	}
}
