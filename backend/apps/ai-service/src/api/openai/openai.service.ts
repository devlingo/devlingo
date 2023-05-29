import { Injectable } from '@nestjs/common';
import { PrismaService } from 'shared/modules/prisma.service';

@Injectable()
export class OpenAIService {
	constructor(private prisma: PrismaService) {}
}
