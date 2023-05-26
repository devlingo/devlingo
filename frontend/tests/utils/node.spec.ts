import { expect } from 'vitest';

import { ContainerNodeType, ServiceNodeType } from '@/constants';
import { createNode } from '@/utils/node';

describe('Node Utils Tests', () => {
	describe('createNode Tests', () => {
		it('creates a ServiceNode correctly', () => {
			const node = createNode({
				position: { x: 1000, y: 50 },
				data: {
					nodeType: ServiceNodeType.NextJs,
					formData: { nodeName: 'Frontend' },
				},
			});
			expect(node.id).toBeTypeOf('string');
			expect(node.type).toBe('ServiceNode');
			expect(node.data.nodeType).toEqual(ServiceNodeType.NextJs);
			expect(node.position).toEqual({ x: 1000, y: 50 });
		});
		it('creates default childNodes for a ServiceNode correctly', () => {
			const node = createNode<ServiceNodeType>({
				position: { x: 1000, y: 50 },
				data: {
					nodeType: ServiceNodeType.NestJs,
					formData: { nodeName: 'Frontend' },
				},
			});
			expect(node.data.childNodes).toHaveLength(3);
		});
		it('creates an InternalNode correctly', () => {
			const node = createNode({
				position: { x: 400, y: 250 },
				data: {
					formData: { nodeName: 'App Module' },
					nodeType: ContainerNodeType.Module,
					parentNodeType: ServiceNodeType.NestJs,
					parentNodeId: 'abc',
				},
			});
			expect(node.id).toBeTypeOf('string');
			expect(node.type).toBe('ContainerNode');
			expect(node.data.nodeType).toEqual(ContainerNodeType.Module);
			expect(node.position).toEqual({ x: 400, y: 250 });
		});
	});
});
