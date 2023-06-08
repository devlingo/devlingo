import { ONE_SECOND_IN_MILLISECONDS } from '@/constants';

export function downloadFile({
	dataUrl,
	filename,
}: {
	dataUrl: string;
	filename: string;
}) {
	const aTag = document.createElement('a');
	aTag.href = dataUrl;
	aTag.download = filename;
	aTag.style.display = 'none';

	document.body.append(aTag);
	aTag.click();

	setTimeout(() => {
		aTag.remove();
	}, ONE_SECOND_IN_MILLISECONDS * 10);
}
