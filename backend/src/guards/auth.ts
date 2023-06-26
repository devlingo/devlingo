import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

import { FirebaseService } from '@/modules/firebase/service';

@Injectable()
export class Auth implements CanActivate {
	constructor(private firebaseService: FirebaseService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>();

		try {
			const { uid } = await this.firebaseService.decodeBearerToken(
				request.headers.authorization,
			);
			Reflect.set(request, 'firebaseId', uid);
			return true;
		} catch (e: unknown) {
			throw new UnauthorizedException((e as Error).message);
		}
	}
}
