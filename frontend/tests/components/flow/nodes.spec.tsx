import { Position, ReactFlowProvider, useNodeId } from 'reactflow';
import { render, screen } from 'tests/test-utils';

import {
	InternalNode,
	NodeHandles,
	ServiceNode,
} from '@/components/flow/nodes';
import { InternalNodeType, ServiceNodeType } from '@/constants';
import { NodeContext } from '@/utils/context';

vi.mock('reactflow', async () => {
	const {
		Handle,
		HandleProps,
		NodeProps,
		Position,
		useNodeId,
		ReactFlowProvider,
	} = (await vi.importActual('reactflow')) as any;

	return {
		useNodeId: vi.fn().mockImplementation(useNodeId),
		ReactFlowProvider,
		Position,
		NodeProps,
		HandleProps,
		Handle,
	};
});

describe('Node components tests', () => {
	const nodeId = 'abc';
	const nodeName = 'Test Node Name';

	beforeAll(() => {
		vi.mocked(useNodeId).mockImplementation(() => nodeId);
	});

	describe('NodeHandles tests', () => {
		it.each(Object.values(Position))(
			'sets %s position handle',
			(position: Position) => {
				render(
					<ReactFlowProvider>
						<NodeHandles positions={[position]} nodeId={nodeId} />
					</ReactFlowProvider>,
				);
				expect(
					screen.getByTestId(`handle-${nodeId}-source-${position}`),
				).toBeInTheDocument();
			},
		);
		it('defaults to all positions', () => {
			render(
				<ReactFlowProvider>
					<NodeHandles nodeId={nodeId} />
				</ReactFlowProvider>,
			);
			expect(
				screen.getByTestId(`handle-${nodeId}-source-${Position.Top}`),
			).toBeInTheDocument();
			expect(
				screen.getByTestId(`handle-${nodeId}-source-${Position.Right}`),
			).toBeInTheDocument();
			expect(
				screen.getByTestId(`handle-${nodeId}-source-${Position.Left}`),
			).toBeInTheDocument();
			expect(
				screen.getByTestId(
					`handle-${nodeId}-source-${Position.Bottom}`,
				),
			).toBeInTheDocument();
		});
	});
	describe('ServiceNode tests', () => {
		it('renders the node name', () => {
			render(
				<ReactFlowProvider>
					<ServiceNode
						id={nodeId}
						type="ServiceNode"
						data={{
							formData: { nodeName },
							nodeType: ServiceNodeType.NextJs,
						}}
					/>
				</ReactFlowProvider>,
			);
			expect(screen.getByTestId(`node-${nodeId}`)).toBeInTheDocument();
			expect(screen.getByText(nodeName)).toBeInTheDocument();
		});
		it.each(Object.values(ServiceNodeType))(
			'renders an SVG for %s node type',
			(nodeType: ServiceNodeType) => {
				render(
					<ReactFlowProvider>
						<ServiceNode
							id={nodeId}
							type="ServiceNode"
							data={{
								formData: { nodeName },
								nodeType,
							}}
						/>
					</ReactFlowProvider>,
				);
				expect(screen.getByTestId(`svg-${nodeId}`)).toBeInTheDocument();
			},
		);
		it.each(Object.values(ServiceNodeType))(
			'renders a type tag for %s node type',
			(nodeType: ServiceNodeType) => {
				render(
					<ReactFlowProvider>
						<ServiceNode
							id={nodeId}
							type="ServiceNode"
							data={{
								formData: { nodeName },
								nodeType,
							}}
						/>
					</ReactFlowProvider>,
				);
				expect(
					screen.getByTestId(`type-tag-${nodeId}`).textContent,
				).toBeTruthy();
			},
		);
		it.each(['todo', 'config'])(
			'renders the %s button',
			(btnType: string) => {
				render(
					<ReactFlowProvider>
						<ServiceNode
							id={nodeId}
							type="ServiceNode"
							data={{
								formData: { nodeName },
								nodeType: ServiceNodeType.NextJs,
							}}
						/>
					</ReactFlowProvider>,
				);
				expect(
					screen.getByTestId(`${btnType}-btn-${nodeId}`),
				).toBeInTheDocument();
			},
		);
		it('renders the expand button only when there are internal nodes', () => {
			render(
				<ReactFlowProvider>
					<ServiceNode
						id={nodeId}
						type="ServiceNode"
						data={{
							formData: { nodeName },
							nodeType: ServiceNodeType.Cassandra,
						}}
					/>
				</ReactFlowProvider>,
			);
			expect(() => screen.getByTestId(`expand-btn-${nodeId}`)).toThrow();

			render(
				<ReactFlowProvider>
					<ServiceNode
						id={nodeId}
						type="ServiceNode"
						data={{
							formData: { nodeName },
							nodeType: ServiceNodeType.NestJs,
						}}
					/>
				</ReactFlowProvider>,
			);
			expect(
				screen.getByTestId(`expand-btn-${nodeId}`),
			).toBeInTheDocument();
		});
		it('calls nodeContext.handleNodeConfig when clicking the config button', () => {
			const handleNodeConfig = vi.fn();
			render(
				<NodeContext.Provider
					value={{
						handleNodeConfig,
						handleNodeExpand: vi.fn(),
						expandedNode: null,
						displayNodes: [],
					}}
				>
					<ReactFlowProvider>
						<ServiceNode
							id={nodeId}
							type="ServiceNode"
							data={{
								formData: { nodeName },
								nodeType: ServiceNodeType.NestJs,
							}}
						/>
					</ReactFlowProvider>
				</NodeContext.Provider>,
			);
			screen.getByTestId(`config-btn-${nodeId}`).click();
			expect(handleNodeConfig).toHaveBeenCalled();
		});
		it("calls nodeContext.handleNodeExpand when clicking the expand button and the node isn't expanded", () => {
			const handleNodeExpand = vi.fn();
			render(
				<NodeContext.Provider
					value={{
						handleNodeConfig: vi.fn(),
						handleNodeExpand,
						expandedNode: null,
						displayNodes: [],
					}}
				>
					<ReactFlowProvider>
						<ServiceNode
							id={nodeId}
							type="ServiceNode"
							data={{
								formData: { nodeName },
								nodeType: ServiceNodeType.NestJs,
							}}
						/>
					</ReactFlowProvider>
				</NodeContext.Provider>,
			);
			screen.getByTestId(`expand-btn-${nodeId}`).click();
			expect(handleNodeExpand).toHaveBeenCalled();
		});
	});
	describe('InternalNode tests', () => {
		it('renders the node name', () => {
			render(
				<ReactFlowProvider>
					<InternalNode
						id={nodeId}
						type="InternalNode"
						data={{
							parentNodeId: nodeId,
							parentNodeType: ServiceNodeType.NextJs,
							formData: { nodeName },
							nodeType: InternalNodeType.Controller,
						}}
					/>
				</ReactFlowProvider>,
			);
			expect(screen.getByTestId(`node-${nodeId}`)).toBeInTheDocument();
			expect(screen.getByText(nodeName)).toBeInTheDocument();
		});
		it.each(Object.values(InternalNodeType))(
			'renders an SVG for %s node type',
			(nodeType: InternalNodeType) => {
				render(
					<ReactFlowProvider>
						<InternalNode
							id={nodeId}
							type="InternalNode"
							data={{
								parentNodeId: nodeId,
								parentNodeType: ServiceNodeType.NextJs,
								formData: { nodeName },
								nodeType,
							}}
						/>
					</ReactFlowProvider>,
				);
				expect(screen.getByTestId(`svg-${nodeId}`)).toBeInTheDocument();
			},
		);
		it.each(Object.values(InternalNodeType))(
			'renders a type tag for %s node type',
			(nodeType: InternalNodeType) => {
				render(
					<ReactFlowProvider>
						<InternalNode
							id={nodeId}
							type="InternalNode"
							data={{
								parentNodeId: nodeId,
								parentNodeType: ServiceNodeType.NextJs,
								formData: { nodeName },
								nodeType,
							}}
						/>
					</ReactFlowProvider>,
				);
				expect(
					screen.getByTestId(`type-tag-${nodeId}`).textContent,
				).toBeTruthy();
			},
		);
		it('renders the config button', () => {
			render(
				<ReactFlowProvider>
					<InternalNode
						id={nodeId}
						type="InternalNode"
						data={{
							parentNodeId: nodeId,
							parentNodeType: ServiceNodeType.NextJs,
							formData: { nodeName },
							nodeType: InternalNodeType.Controller,
						}}
					/>
				</ReactFlowProvider>,
			);
			expect(
				screen.getByTestId(`config-btn-${nodeId}`),
			).toBeInTheDocument();
		});
		it('calls nodeContext.handleNodeConfig when clicking the config button', () => {
			const handleNodeConfig = vi.fn();
			render(
				<NodeContext.Provider
					value={{
						handleNodeConfig,
						handleNodeExpand: vi.fn(),
						expandedNode: null,
						displayNodes: [],
					}}
				>
					<ReactFlowProvider>
						<InternalNode
							id={nodeId}
							type="InternalNode"
							data={{
								parentNodeId: nodeId,
								parentNodeType: ServiceNodeType.NextJs,
								formData: { nodeName },
								nodeType: InternalNodeType.Controller,
							}}
						/>
					</ReactFlowProvider>
				</NodeContext.Provider>,
			);
			screen.getByTestId(`config-btn-${nodeId}`).click();
			expect(handleNodeConfig).toHaveBeenCalled();
		});
	});
});
