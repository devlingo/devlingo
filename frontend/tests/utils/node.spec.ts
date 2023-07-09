import { toJpeg, toPng, toSvg } from 'html-to-image';
import { testData } from 'tests/test-data';
import { expect } from 'vitest';

import { ImageType } from '@/types';
import { convertNodesToImageString } from '@/utils/node';

vi.mock('html-to-image', () => ({
	toPng: vi.fn(),
	toJpeg: vi.fn(),
	toSvg: vi.fn(),
}));

describe('Node Utils Tests', () => {
	describe('convertNodesToImageString', () => {
		it.each(['png', 'jpeg', 'svg'] as ImageType[])(
			'converts to %s',
			async (imageType: ImageType) => {
				const mock =
					imageType === 'jpeg'
						? toJpeg
						: imageType === 'png'
						? toPng
						: toSvg;
				const { nodes } = testData;
				const expected = {
					backgroundColor: '#FFFFF',
					height: 768,
					style: {
						height: '768',
						transform:
							'translate(-1039.5151515151513px, -42.66666666666663px) scale(1.5515151515151513)',
						width: '1024',
					},
					width: 1024,
				};
				await convertNodesToImageString({
					nodes,
					imageType,
					backgroundColor: '#FFFFF',
				});
				expect(mock).toHaveBeenCalledWith(null, expected);
			},
		);
	});
});
