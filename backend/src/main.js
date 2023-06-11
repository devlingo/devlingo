'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const common_1 = require('@nestjs/common');
const config_1 = require('@nestjs/config');
const core_1 = require('@nestjs/core');
const nestjs_pino_1 = require('nestjs-pino');
const app_1 = require('./app');
const constants_1 = require('./constants');
const prisma_exceptino_filter_1 = require('./exception-filters/prisma-exceptino.filter');
const prisma_service_1 = require('./modules/prisma/prisma.service');
const configuration_utils_1 = require('./utils/configuration.utils');
(async () => {
	const app = await core_1.NestFactory.create(app_1.AppModule, {
		bufferLogs: true,
	});
	app.useLogger(app.get(nestjs_pino_1.Logger));
	app.enableVersioning({
		type: common_1.VersioningType.URI,
		defaultVersion: constants_1.ApiVersions.V1,
	});
	app.enableCors();
	(0, configuration_utils_1.setupValidationPipe)(app);
	app.useGlobalFilters(new prisma_exceptino_filter_1.PrismaExceptionFilter());
	const prismaService = app.get(prisma_service_1.PrismaService);
	await prismaService.enableShutdownHooks(app);
	const configService = app.get(config_1.ConfigService);
	const port = configService.get('SERVER_PORT');
	await app.listen(port);
})();
//# sourceMappingURL=main.js.map
