import 'reflect-metadata';

import { plainToInstance } from 'class-transformer';
import {
	IsEnum,
	IsNotEmpty,
	IsPositive,
	IsString,
	validateSync,
} from 'class-validator';

import { Environment } from '@/constants';

export class EnvironmentVariables {
	@IsEnum(Environment)
	NODE_ENV!: Environment;

	@IsNotEmpty()
	@IsString()
	REDIS_CONNECTION_STRING!: string;

	@IsNotEmpty()
	@IsString()
	OPENAI_KEY!: string;

	@IsPositive()
	SERVER_PORT!: number;

	@IsNotEmpty()
	@IsString()
	FIREBASE_PROJECT_ID!: string;

	@IsNotEmpty()
	@IsString()
	FIREBASE_CLIENT_EMAIL!: string;

	@IsNotEmpty()
	@IsString()
	FIREBASE_PRIVATE_KEY!: string;
}

export function validateEnv(config: Record<string, unknown>) {
	const validatedConfig = plainToInstance(EnvironmentVariables, config, {
		enableImplicitConversion: true,
	});
	const errors = validateSync(validatedConfig, {
		skipMissingProperties: false,
	});

	if (errors.length > 0) {
		throw new Error(errors.toString());
	}
	return validatedConfig;
}

export function isDevelopment(): boolean {
	return process.env.NODE_ENV === Environment.Development;
}

export function isProduction(): boolean {
	return process.env.NODE_ENV === Environment.Production;
}

export function isTest(): boolean {
	return process.env.NODE_ENV === Environment.Test;
}
