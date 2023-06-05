import {
	ContainerNodeType,
	InternalNodeType,
	ServiceNodeType,
} from '@/constants';
import { ContainerNode } from '@/types';
import {
	isContainerNode,
	isInternalNode,
	isServiceNode,
} from '@/utils/predicates';

describe('predicate util tests', () => {
	describe('isServiceNode tests', () => {
		it.each(Object.values(ServiceNodeType))(
			'returns true for %s',
			(nodeType: ServiceNodeType) => {
				const serviceNode: any = {
					id: '123',
					type: 'ServiceNode',
					position: { x: 0, y: 0 },
					data: {
						nodeType,
						formData: { nodeName: 'test' },
					},
				};
				expect(isServiceNode(serviceNode)).toBe(true);
			},
		);
		it.each([
			...Object.values(InternalNodeType),
			...Object.values(ContainerNodeType),
		])('returns false for %s', (nodeType: any) => {
			const serviceNode: any = {
				id: '123',
				type: 'ServiceNode',
				position: { x: 0, y: 0 },
				data: {
					nodeType,
					formData: { nodeName: 'test' },
				},
			};
			expect(isServiceNode(serviceNode)).toBe(false);
		});
	});
	describe('isInternalNode tests', () => {
		it.each(Object.values(InternalNodeType))(
			'returns true for %s',
			(nodeType: InternalNodeType) => {
				const internalNode: any = {
					id: '123',
					type: 'InternalNode',
					position: { x: 0, y: 0 },
					data: {
						nodeType,
						formData: { nodeName: 'test' },
						parentNodeId: 'abc',
						parentNodeType: ServiceNodeType.NestJs,
					},
				};
				expect(isInternalNode(internalNode)).toBe(true);
			},
		);
		it.each([
			...Object.values(ServiceNodeType),
			...Object.values(ContainerNodeType),
		])('returns false for %s', (nodeType: any) => {
			const internalNode: any = {
				id: '123',
				type: 'ServiceNode',
				position: { x: 0, y: 0 },
				data: {
					nodeType,
					formData: { nodeName: 'test' },
					parentNodeId: 'abc',
					parentNodeType: ServiceNodeType.NestJs,
				},
			};
			expect(isInternalNode(internalNode)).toBe(false);
		});
	});
	describe('isContainerNode tests', () => {
		it.each(Object.values(ContainerNodeType))(
			'returns true for %s',
			(nodeType: ContainerNodeType) => {
				const containerNode: ContainerNode = {
					id: '123',
					type: 'ContainerNode',
					position: { x: 0, y: 0 },
					data: {
						nodeType,
						formData: { nodeName: 'test' },
						parentNodeId: 'abc',
						parentNodeType: ServiceNodeType.NestJs,
					},
				};
				expect(isContainerNode(containerNode)).toBe(true);
			},
		);
		it.each([
			...Object.values(ServiceNodeType),
			Object.values(InternalNodeType),
		])('returns false for %s', (nodeType: any) => {
			const containerNode: any = {
				id: '123',
				type: 'ServiceNode',
				position: { x: 0, y: 0 },
				data: {
					nodeType,
					formData: { nodeName: 'test' },
				},
			};
			expect(isContainerNode(containerNode)).toBe(false);
		});
	});
});
