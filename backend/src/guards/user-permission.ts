import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionType } from '@prisma/client';
import type { Request } from 'express';

import { PrismaService } from '@/modules/prisma/service';

@Injectable()
export class UserPermissionsGuard implements CanActivate {
	constructor(private reflector: Reflector, private prisma: PrismaService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const permissions = this.reflector.get<PermissionType[] | undefined>(
			'userPermissions',
			context.getHandler(),
		);

		if (!permissions?.length) {
			return true;
		}

		const request = context.switchToHttp().getRequest<Request>();

		const projectId = Reflect.get(request.params, 'projectId') as
			| string
			| undefined;
		const firebaseId = Reflect.get(request, 'firebaseId') as
			| string
			| undefined;

		if (!projectId || !firebaseId) {
			throw new UnauthorizedException();
		}

		try {
			await this.prisma.userProjectPermission.findFirstOrThrow({
				where: {
					projectId,
					user: { is: { firebaseId } },
					type: { in: permissions },
				},
			});
		} catch {
			throw new ForbiddenException();
		}

		return true;
	}
}
