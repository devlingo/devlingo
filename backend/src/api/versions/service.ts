import { Injectable } from '@nestjs/common';
import { Version } from '@prisma/client';

import { VersionDTO } from '@/dtos/body';
import { PrismaService } from '@/modules/prisma/service';

@Injectable()
export class VersionsService {
	constructor(private prisma: PrismaService) {}

	async createVersion({
		data,
		designId,
	}: VersionDTO & { designId: string }): Promise<Version> {
		await this.prisma.design.findUniqueOrThrow({
			where: { id: designId },
		});

		return await this.prisma.version.create({
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
	}): Promise<Version> {
		return await this.prisma.version.findUniqueOrThrow({
			where: { id: versionId },
		});
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
