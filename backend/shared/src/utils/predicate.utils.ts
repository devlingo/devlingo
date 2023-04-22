export function isProduction(): boolean {
	return (
		process.env.NODE_ENV === 'production' &&
		!['development', 'staging'].includes(process.env.ENVIRONMENT ?? '')
	);
}
