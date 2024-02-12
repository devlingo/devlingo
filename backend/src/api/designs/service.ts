import { Injectable } from '@nestjs/common';
import { Design, Version } from '@prisma/client';
import { DesignResponseData } from 'shared/types';

import { DesignDTO } from '@/dtos/body';
import { PrismaService } from '@/modules/prisma/service';

export type RetrieveDesignResponse = Design & {
	versions: Pick<Version, 'id' | 'createdAt'>[];
};

@Injectable()
export class DesignService {
	constructor(private prisma: PrismaService) {}

	async createDesign(
		data: DesignDTO & { projectId: string },
	): Promise<Design> {
		return await this.prisma.design.create({
			data,
		});
	}

	async retrieveDesignsByProjectId({
		projectId,
	}: {
		projectId: string;
	}): Promise<Design[]> {
		return await this.prisma.design.findMany({
			orderBy: {
				name: 'asc',
			},
			where: { projectId },
		});
	}

	async retrieveDesignById({
		designId,
	}: {
		designId: string;
	}): Promise<DesignResponseData> {
		return await this.prisma.design.findUniqueOrThrow({
			select: {
				createdAt: true,
				description: true,
				id: true,
				isDefault: true,
				name: true,
				projectId: true,
				updatedAt: true,
				versions: {
					select: {
						createdAt: true,
						id: true,
					},
				},
			},
			where: { id: designId },
		});
	}

	async deleteDesignById({ designId }: { designId: string }): Promise<void> {
		await this.prisma.design.delete({
			where: { id: designId },
		});
	}
}
