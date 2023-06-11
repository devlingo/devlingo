'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.PrismaModule = exports.DEFAULT_MODULES = void 0;
const config_1 = require('@nestjs/config');
const nestjs_pino_1 = require('nestjs-pino');
const prisma_module_1 = require('./prisma/prisma.module');
Object.defineProperty(exports, 'PrismaModule', {
	enumerable: true,
	get: function () {
		return prisma_module_1.PrismaModule;
	},
});
const DEFAULT_MODULES = [
	prisma_module_1.PrismaModule,
	config_1.ConfigModule.forRoot({
		isGlobal: true,
		ignoreEnvFile: true,
		cache: true,
	}),
];
exports.DEFAULT_MODULES = DEFAULT_MODULES;
if (process.env.NODE_ENV !== 'test') {
	const pinoHttp =
		process.env.NODE_ENV === 'production'
			? {
					level: 'info',
			  }
			: {
					level: 'debug',
					transport: {
						target: 'pino-pretty',
						options: { singleLine: true },
					},
			  };
	DEFAULT_MODULES.push(
		nestjs_pino_1.LoggerModule.forRoot({
			pinoHttp,
		}),
	);
}
//# sourceMappingURL=index.js.map
