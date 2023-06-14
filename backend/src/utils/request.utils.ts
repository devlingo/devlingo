import { UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

export function getTokenFromRequest(request: Request) {
	if (!request.headers.authorization?.startsWith('Bearer ')) {
		throw new UnauthorizedException();
	}

	const token = request.headers.authorization.replace('Bearer ', '');

	if (!token.length) {
		throw new UnauthorizedException();
	}

	return token;
}
