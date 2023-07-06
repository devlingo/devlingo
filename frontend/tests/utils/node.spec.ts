import { toJpeg, toPng, toSvg } from 'html-to-image';
import { ServiceType } from 'shared/constants';
import { createNode } from 'shared/utils/node';
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
	describe('createNode Tests', () => {
		it('creates a CanvasNodeComponent correctly', () => {
			const node = createNode({
				position: { x: 1000, y: 50 },
				data: {
					nodeType: ServiceType.NextJs,
					formData: { nodeName: 'Frontend' },
				},
			});
			expect(node.id).toBeTypeOf('string');
			expect(node.type).toBe('CustomNode');
			expect(node.data.nodeType).toEqual(ServiceType.NextJs);
			expect(node.position).toEqual({ x: 1000, y: 50 });
		});
	});
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
