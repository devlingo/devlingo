import dayjs from 'dayjs';

export function wait(timeout: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, timeout);
	});
}

export function formatDate(
	date: Date | string | number,
	format = 'MMMM D, YYYY h:mm A',
): string {
	return dayjs(date).format(format);
}
