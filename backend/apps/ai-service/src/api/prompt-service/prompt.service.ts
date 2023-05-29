import { Injectable } from '@nestjs/common';
import { PromptRequestDTO } from 'shared/dtos/body.dto';
import { PromptProviderParam } from 'shared/dtos/parameter.dto';
import { PrismaService } from 'shared/modules/prisma.service';

@Injectable()
export class PromptService {
	constructor(private prisma: PrismaService) {}

	async requestPrompt({
		name,
		version,
		projectId,
		promptProvider,
		promptContent,
	}: PromptRequestDTO & PromptProviderParam): Promise<Record<string, any>> {
		const design = await this.prisma.design.findUniqueOrThrow({
			where: { name_version_projectId: { name, projectId, version } },
		});

		return { ...design, promptContent, promptProvider };
	}
}
