import { Injectable } from '@nestjs/common';
import { Design, DesignVersion } from '@prisma/client';

import { DesignVersionDTO } from '@/dtos/body.dto';
import { PrismaService } from '@/modules/prisma/prisma.service';

export type RetrieveDesignResponse = Design & {
	versions: Pick<DesignVersion, 'id' | 'createdAt'>[];
};

export interface CreateDesignResponse {
	designId: string;
	versionId: string;
}

@Injectable()
export class DesignService {
	constructor(private prisma: PrismaService) {}

	async createDesignVersion({
		data,
		designId,
		projectId,
		name,
		description,
	}: DesignVersionDTO): Promise<CreateDesignResponse> {
		const { id } = designId
			? await this.prisma.design.findUniqueOrThrow({
					where: { id: designId },
					select: { id: true },
			  })
			: await this.prisma.design.create({
					data: {
						name: name,
						description: description ?? null,
						projectId: projectId,
					},
					select: { id: true },
			  });

		const { id: versionId } = await this.prisma.designVersion.create({
			data: {
				data,
				designId: id,
			},
			select: { id: true },
		});

		return { designId: id, versionId };
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
	}): Promise<RetrieveDesignResponse> {
		return await this.prisma.design.findUniqueOrThrow({
			where: { id: designId },
			select: {
				id: true,
				name: true,
				description: true,
				projectId: true,
				createdAt: true,
				updatedAt: true,
				versions: {
					select: {
						id: true,
						createdAt: true,
					},
				},
			},
		});
	}

	async deleteDesignById({ designId }: { designId: string }): Promise<void> {
		await this.prisma.design.delete({
			where: { id: designId },
		});
	}

	async retrieveDesignVersionById({
		versionId,
	}: {
		versionId: string;
	}): Promise<DesignVersion> {
		return await this.prisma.designVersion.findUniqueOrThrow({
			where: { id: versionId },
		});
	}

	async deleteDesignVersionById({
		versionId,
	}: {
		versionId: string;
	}): Promise<void> {
		await this.prisma.designVersion.delete({
			where: { id: versionId },
		});
	}
}
