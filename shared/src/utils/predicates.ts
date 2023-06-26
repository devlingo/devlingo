import { Environment } from 'shared/constants';

export function isDevelopment(): boolean {
	return process.env.NODE_ENV === Environment.Development;
}

export function isProduction(): boolean {
	return process.env.NODE_ENV === Environment.Production;
}

export function isTest(): boolean {
	return process.env.NODE_ENV === Environment.Test;
}
