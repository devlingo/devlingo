'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.setupValidationPipe = void 0;
const common_1 = require('@nestjs/common');
const predicate_utils_1 = require('./predicate.utils');
function setupValidationPipe(app) {
	app.useGlobalPipes(
		new common_1.ValidationPipe({
			enableDebugMessages: !predicate_utils_1.isProduction,
			transform: true,
			transformOptions: { enableImplicitConversion: true },
			forbidNonWhitelisted: true,
		}),
	);
}
exports.setupValidationPipe = setupValidationPipe;
//# sourceMappingURL=configuration.utils.js.map
