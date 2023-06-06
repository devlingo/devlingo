export function log(message: string, context?: Record<string, any>): void {
	if (process.env.NODE_ENV !== 'production') {
		// eslint-disable-next-line no-console
		console.log(
			message +
				(context ? ` -- ${JSON.stringify(context, undefined, 2)}` : ''),
		);
	}
}
