import { v4 as uuidv4 } from 'uuid';
import { expect } from 'vitest';

import {
	ContainerNodeType,
	InternalNodeType,
	ServiceNodeType,
} from '@/constants';
import { ServiceNodeData } from '@/types';
import { createDefaultInternalNodes, createNode } from '@/utils/node';

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
			const node = createNode<ServiceNodeData>({
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
					nodeType: InternalNodeType.Controller,
					parentNodeType: ServiceNodeType.NestJs,
				},
			});
			expect(node.id).toBeTypeOf('string');
			expect(node.type).toBe('InternalNode');
			expect(node.data.nodeType).toEqual(InternalNodeType.Controller);
			expect(node.position).toEqual({ x: 400, y: 250 });
		});
		it('creates an ContainerNode correctly', () => {
			const node = createNode({
				position: { x: 400, y: 250 },
				data: {
					formData: { nodeName: 'App Module' },
					nodeType: ContainerNodeType.Module,
					parentNodeType: ServiceNodeType.NestJs,
				},
			});
			expect(node.id).toBeTypeOf('string');
			expect(node.type).toBe('ContainerNode');
			expect(node.data.nodeType).toEqual(ContainerNodeType.Module);
			expect(node.position).toEqual({ x: 400, y: 250 });
		});
		it('creates node with with id', () => {
			const id = uuidv4();
			const node = createNode({
				id,
				position: { x: 1000, y: 50 },
				data: {
					nodeType: ServiceNodeType.NextJs,
					formData: { nodeName: 'Frontend' },
				},
			});
			expect(node.id).toBe(id);
		});
	});
	describe('createDefaultInternalNodes tests', () => {
		it('creates the expected default internal nodes', () => {
			const nodes = createDefaultInternalNodes(ServiceNodeType.NestJs);
			expect(nodes.length).toBe(3);
			expect(nodes[0].data.nodeType).toBe(ContainerNodeType.Module);
			expect(nodes[1].data.nodeType).toBe(InternalNodeType.Controller);
			expect(nodes[2].data.nodeType).toBe(InternalNodeType.Service);
		});
		it('returns an empty array when no defaults are defined', () => {
			const nodes = createDefaultInternalNodes(ServiceNodeType.IOS);
			expect(nodes.length).toBe(0);
		});
	});
});
