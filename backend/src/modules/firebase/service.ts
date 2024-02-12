import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { auth } from 'firebase-admin';
import { App, cert, initializeApp, ServiceAccount } from 'firebase-admin/app';

import { EnvironmentVariables } from '@/utils/env';

@Injectable()
export class FirebaseService implements OnModuleInit {
	private readonly logger = new Logger(FirebaseService.name);
	private _app: App | null = null;
	private _firebaseAuth: auth.Auth | null = null;

	public set app(app: App) {
		this._app = app;
	}

	public get app(): App {
		if (!this._app) {
			throw new Error('firebase app not initialized');
		}

		return this._app;
	}

	public set auth(auth: auth.Auth) {
		this._firebaseAuth = auth;
	}

	public get auth(): auth.Auth {
		if (!this._firebaseAuth) {
			throw new Error('firebase auth not initialized');
		}

		return this._firebaseAuth;
	}

	constructor(
		private configService: ConfigService<EnvironmentVariables, true>,
	) {}

	// noinspection JSUnusedGlobalSymbols
	onModuleInit() {
		this.logger.log('initializing firebase app');
		const config = {
			clientEmail: this.configService.get<string>(
				'FIREBASE_CLIENT_EMAIL',
			),
			privateKey: this.configService.get<string>('FIREBASE_PRIVATE_KEY'),
			projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
		} satisfies ServiceAccount;

		this.app = initializeApp({
			credential: cert(config),
		});
		this.auth = auth();
	}

	async decodeBearerToken(authHeader?: string) {
		if (!authHeader?.startsWith('Bearer ')) {
			throw new Error('missing token');
		}

		const token = authHeader.replace('Bearer ', '');

		if (token.length === 0) {
			throw new Error('missing token');
		}

		try {
			return await this.auth.verifyIdToken(token);
		} catch (error) {
			this.logger.error('invalid auth token %o', error);
			throw new Error('invalid token');
		}
	}
}
