import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError, Prisma.NotFoundError)
export class PrismaExceptionFilter implements ExceptionFilter {
	// noinspection JSUnusedGlobalSymbols
	catch(exception: Error, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		response.status(HttpStatus.BAD_REQUEST).json({
			statusCode: HttpStatus.BAD_REQUEST,
			timestamp: new Date().toISOString(),
			path: request.url,
			message: exception.message,
		});
	}
}
