import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { PermissionType } from '@prisma/client';

export function UserPermissions(
	...permissions: PermissionType[]
): CustomDecorator {
	return SetMetadata('userPermissions', permissions);
}
