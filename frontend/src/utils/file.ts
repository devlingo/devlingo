import { TimeUnit } from 'shared/constants';

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
	}, TimeUnit.OneSecondInMilliseconds * 10);
}
