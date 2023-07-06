import { createNode } from 'shared/utils';
import { NodeShape, ServiceType } from 'shared/constants';
import { expect } from 'vitest';

describe('node utils tests', () => {
	describe('createNode Tests', () => {
		it('creates a CanvasNodeComponent correctly', () => {
			const node = createNode({
				position: { x: 1000, y: 50 },
				data: {
					nodeType: ServiceType.NextJs,
					formData: { nodeName: 'Frontend' },
					shape: NodeShape.Rectangle,
					height: 250,
					width: 250,
				},
			});
			expect(node.id).toBeTypeOf('string');
			expect(node.type).toBe('CustomNode');
			expect(node.data.nodeType).toEqual(ServiceType.NextJs);
			expect(node.position).toEqual({ x: 1000, y: 50 });
		});
	});
});
