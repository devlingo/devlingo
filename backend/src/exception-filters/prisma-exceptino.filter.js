'use strict';
var __decorate =
	(this && this.__decorate) ||
	function (decorators, target, key, desc) {
		var c = arguments.length,
			r =
				c < 3
					? target
					: desc === null
					? (desc = Object.getOwnPropertyDescriptor(target, key))
					: desc,
			d;
		if (
			typeof Reflect === 'object' &&
			typeof Reflect.decorate === 'function'
		)
			r = Reflect.decorate(decorators, target, key, desc);
		else
			for (var i = decorators.length - 1; i >= 0; i--)
				if ((d = decorators[i]))
					r =
						(c < 3
							? d(r)
							: c > 3
							? d(target, key, r)
							: d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
Object.defineProperty(exports, '__esModule', { value: true });
exports.PrismaExceptionFilter = void 0;
const common_1 = require('@nestjs/common');
const client_1 = require('@prisma/client');
let PrismaExceptionFilter =
	(exports.PrismaExceptionFilter = class PrismaExceptionFilter {
		// noinspection JSUnusedGlobalSymbols
		catch(exception, host) {
			const ctx = host.switchToHttp();
			const response = ctx.getResponse();
			const request = ctx.getRequest();
			response.status(common_1.HttpStatus.BAD_REQUEST).json({
				statusCode: common_1.HttpStatus.BAD_REQUEST,
				timestamp: new Date().toISOString(),
				path: request.url,
				message: exception.message,
			});
		}
	});
exports.PrismaExceptionFilter = PrismaExceptionFilter = __decorate(
	[
		(0, common_1.Catch)(
			client_1.Prisma.PrismaClientKnownRequestError,
			client_1.Prisma.NotFoundError,
		),
	],
	PrismaExceptionFilter,
);
//# sourceMappingURL=prisma-exceptino.filter.js.map
