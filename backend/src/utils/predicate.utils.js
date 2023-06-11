'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.isProduction = void 0;
function isProduction() {
	return (
		process.env.NODE_ENV === 'production' &&
		!['development', 'staging'].includes(process.env.ENVIRONMENT ?? '')
	);
}
exports.isProduction = isProduction;
//# sourceMappingURL=predicate.utils.js.map
