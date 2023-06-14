import {
	CanActivate,
	ExecutionContext,
	Injectable,
	Logger,
	UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { auth } from 'firebase-admin';

import { EnvironmentVariables } from '@/utils/env.utils';
import { getFirebaseApp } from '@/utils/firebase.utils';
import { getTokenFromRequest } from '@/utils/request.utils';

@Injectable()
export class AuthGuard implements CanActivate {
	private readonly logger = new Logger(AuthGuard.name);
	private readonly firebaseAuth: auth.Auth;

	constructor(
		private configService: ConfigService<EnvironmentVariables, true>,
	) {
		const firebaseApp = getFirebaseApp({
			clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL')!,
			projectId: configService.get<string>('FIREBASE_PROJECT_ID')!,
			privateKey: configService.get<string>('FIREBASE_PRIVATE_KEY')!,
		});
		this.firebaseAuth = auth(firebaseApp);
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>();

		const token = getTokenFromRequest(request);

		try {
			const { uid } = await this.firebaseAuth.verifyIdToken(token);
			Reflect.set(request, 'firebaseId', uid);
		} catch (e: unknown) {
			this.logger.error('invalid auth token or missing user data %o', e);
			throw new UnauthorizedException();
		}

		return true;
	}
}
