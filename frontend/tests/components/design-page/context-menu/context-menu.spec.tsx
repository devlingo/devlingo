import React from 'react';
import { EdgeType, NodeShape } from 'shared/constants';
import { EdgeFactory, NodeFactory } from 'shared/testing';
import { act, fireEvent, render, renderHook, screen } from 'tests/test-utils';
import { beforeEach, expect } from 'vitest';
import { mockReset } from 'vitest-mock-extended';

import { ContextMenu } from '@/components/design-canvas-page/context-menu/context-menu';
import {
	EdgeContextMenu,
	EdgeTypeDropdown,
} from '@/components/design-canvas-page/context-menu/edge-context-menu';
import { NodeShapeDropdown } from '@/components/design-canvas-page/context-menu/node-context-menu';
import { ContextMenuType } from '@/constants/context-menu.constants';
import { useContextMenu } from '@/hooks/use-context-menu';
import {
	useEdges,
	useNodes,
	useSetEdges,
	useSetNodes,
} from '@/stores/design-store';

describe('ContextMenu tests', () => {
	const preventDefaultMock = vi.fn();
	const mouseEvent = {
		preventDefault: preventDefaultMock,
		pageX: 100,
		pageY: 200,
	};
	beforeEach(() => {
		mockReset(preventDefaultMock);
	});

	it('renders base context menu', () => {
		const { result } = renderHook(() =>
			useContextMenu(ContextMenuType.CustomNode, 'test'),
		);
		act(() => {
			result.current(mouseEvent);
		});

		render(<ContextMenu />);

		const container = screen.getByTestId('context-menu-container');
		expect(container).toBeInTheDocument();
	});

	describe('NodeContextMenu Tests', () => {
		it('renders the node context menu', async () => {
			const node = await NodeFactory.build();
			const { result } = renderHook(() =>
				useContextMenu(ContextMenuType.CustomNode, node.id),
			);
			act(() => {
				result.current(mouseEvent);
			});
			render(<ContextMenu />);

			const container = screen.getByTestId('context-menu-container');
			expect(container.style.left).includes(mouseEvent.pageX);
			expect(container.style.top).includes(mouseEvent.pageY);

			const serviceNodeMenu = screen.getByTestId(
				'custom-node-context-menu',
			);
			expect(serviceNodeMenu).toBeInTheDocument();
		});

		describe('delete node button tests', () => {
			it('deletes the node and closes the context menu', async () => {
				const node = await NodeFactory.build();

				const { result } = renderHook(() =>
					useContextMenu(ContextMenuType.CustomNode, node.id),
				);
				const { result: setNodesResult } = renderHook(() =>
					useSetNodes(),
				);
				const { result: useNodesResult } = renderHook(() => useNodes());

				act(() => {
					setNodesResult.current([node]);
					result.current(mouseEvent);
				});

				expect(preventDefaultMock).toHaveBeenCalled();

				render(<ContextMenu />);
				expect(useNodesResult.current).toHaveLength(1);

				const deleteButton = screen.getByTestId(
					'custom-node-context-menu::delete-node-btn',
				);
				fireEvent.click(deleteButton);

				expect(useNodesResult.current).toHaveLength(0);
				expect(
					screen.queryByTestId('delete-node-context-item'),
				).toBeNull();
			});
		});
		describe('change shape button tests', () => {
			it('opens a dropdown menu', async () => {
				const node = await NodeFactory.build();

				const { result } = renderHook(() =>
					useContextMenu(ContextMenuType.CustomNode, node.id),
				);
				const { result: setNodesResult } = renderHook(() =>
					useSetNodes(),
				);
				const { result: useNodesResult } = renderHook(() => useNodes());

				act(() => {
					setNodesResult.current([node]);
					result.current(mouseEvent);
				});

				expect(preventDefaultMock).toHaveBeenCalled();

				render(<ContextMenu />);
				expect(useNodesResult.current).toHaveLength(1);

				const changeShapeButton = screen.getByTestId(
					'custom-node-context-menu::shape-menu-btn',
				);
				fireEvent.click(changeShapeButton);

				expect(
					screen.getByTestId(
						'custom-node-context-menu::shape-dropdown',
					),
				).toBeInTheDocument();
			});
			it('changes the node shape when a new shape is selected', async () => {
				const node = await NodeFactory.build({
					data: { shape: NodeShape.Triangle },
				});

				const { result } = renderHook(() =>
					useContextMenu(ContextMenuType.CustomNode, node.id),
				);
				const { result: setNodesResult } = renderHook(() =>
					useSetNodes(),
				);
				const { result: useNodesResult } = renderHook(() => useNodes());

				act(() => {
					setNodesResult.current([node]);
					result.current(mouseEvent);
				});

				expect(preventDefaultMock).toHaveBeenCalled();

				render(<ContextMenu />);
				expect(useNodesResult.current).toHaveLength(1);
				expect(useNodesResult.current[0].data.shape).toEqual(
					NodeShape.Triangle,
				);

				const changeShapeButton = screen.getByTestId(
					'custom-node-context-menu::shape-menu-btn',
				);
				fireEvent.click(changeShapeButton);

				const shapeComponent = screen.getByTestId(
					'circle-dropdown-component',
				);

				fireEvent.click(shapeComponent);

				expect(useNodesResult.current[0].data.shape).toEqual(
					NodeShape.Circle,
				);
			});
			it('closes the context and dropdown menus when a new shape is selected', async () => {
				const node = await NodeFactory.build();

				const { result } = renderHook(() =>
					useContextMenu(ContextMenuType.CustomNode, node.id),
				);
				const { result: setNodesResult } = renderHook(() =>
					useSetNodes(),
				);
				const { result: useNodesResult } = renderHook(() => useNodes());

				act(() => {
					setNodesResult.current([node]);
					result.current(mouseEvent);
				});

				expect(preventDefaultMock).toHaveBeenCalled();

				render(<ContextMenu />);
				expect(useNodesResult.current).toHaveLength(1);

				const changeShapeButton = screen.getByTestId(
					'custom-node-context-menu::shape-menu-btn',
				);
				fireEvent.click(changeShapeButton);

				expect(
					screen.getByTestId(
						'custom-node-context-menu::shape-dropdown',
					),
				).toBeInTheDocument();

				const shapeComponent = screen.getByTestId(
					'circle-dropdown-component',
				);
				fireEvent.click(shapeComponent);

				expect(
					screen.queryByTestId(
						'custom-node-context-menu::shape-dropdown',
					),
				).toBeNull();
				expect(
					screen.queryByTestId('custom-node-context-menu'),
				).toBeNull();
			});
			it('closes the context and dropdown menus on a click outside the dropdown menu', async () => {
				const node = await NodeFactory.build({
					data: { shape: NodeShape.Triangle },
				});

				const { result } = renderHook(() =>
					useContextMenu(ContextMenuType.CustomNode, node.id),
				);
				const { result: setNodesResult } = renderHook(() =>
					useSetNodes(),
				);
				const { result: useNodesResult } = renderHook(() => useNodes());

				act(() => {
					setNodesResult.current([node]);
					result.current(mouseEvent);
				});

				expect(preventDefaultMock).toHaveBeenCalled();

				render(<ContextMenu />);
				expect(useNodesResult.current).toHaveLength(1);
				expect(useNodesResult.current[0].data.shape).toEqual(
					NodeShape.Triangle,
				);

				const changeShapeButton = screen.getByTestId(
					'custom-node-context-menu::shape-menu-btn',
				);
				fireEvent.click(changeShapeButton);

				expect(
					screen.getByTestId(
						'custom-node-context-menu::shape-dropdown',
					),
				).toBeInTheDocument();

				const container = screen.getByTestId('context-menu-container');
				fireEvent.click(container);

				expect(
					screen.queryByTestId(
						'custom-node-context-menu::shape-dropdown',
					),
				).toBeNull();
				expect(
					screen.queryByTestId('custom-node-context-menu'),
				).toBeNull();
				expect(useNodesResult.current[0].data.shape).toEqual(
					NodeShape.Triangle,
				);
			});
		});
		describe('NodeShapeDropdown Tests', () => {
			it('renders all shapes', () => {
				const onClickHandler = vi.fn();
				render(<NodeShapeDropdown onClickHandler={onClickHandler} />);
				const dropdown = screen.getByRole('list');
				expect(dropdown).toBeInTheDocument();
				expect(dropdown.children).toHaveLength(
					Object.keys(NodeShape).length,
				);
			});

			it('propagates the shape to the handler on click', () => {
				const onClickHandler = vi.fn();
				render(<NodeShapeDropdown onClickHandler={onClickHandler} />);
				const shapeComponent = screen.getByTestId(
					'circle-dropdown-component',
				);
				fireEvent.click(shapeComponent);
				expect(onClickHandler).toHaveBeenCalledWith(NodeShape.Circle);
			});
		});
	});
	describe('EdgeContextMenu Tests', () => {
		describe('EdgeTypeDropdown tests', () => {
			it('renders dropdown', () => {
				render(
					<EdgeTypeDropdown
						onClickHandler={vi.fn()}
						currentEdgeType={EdgeType.Bezier}
					/>,
				);
				const dropdown = screen.getByTestId(
					'custom-edge-context-menu::shape-dropdown',
				);
				expect(dropdown).toBeInTheDocument();
				expect(dropdown).toHaveClass('dropdown-right dropdown-open');
			});

			it('renders the correct options', () => {
				render(
					<EdgeTypeDropdown
						onClickHandler={vi.fn()}
						currentEdgeType={EdgeType.Bezier}
					/>,
				);
				const options = screen.getAllByTestId(/-dropdown-component/);
				expect(options.length).toBe(Object.values(EdgeType).length);
			});

			it('sets an onClick handler', () => {
				const onClickHandler = vi.fn();
				render(
					<EdgeTypeDropdown
						onClickHandler={onClickHandler}
						currentEdgeType={EdgeType.Bezier}
					/>,
				);
				const option = screen.getByTestId(
					`${Object.values(EdgeType)[0]}-dropdown-component`,
				);
				fireEvent.click(option);
				expect(onClickHandler).toHaveBeenCalledTimes(1);
				expect(onClickHandler).toHaveBeenCalledWith(
					Object.values(EdgeType)[0],
				);
			});
		});
		describe('EdgeContextMenu tests', () => {
			describe('change edge type button tests', () => {
				it('renders the context menu items', async () => {
					const edge = await EdgeFactory.build();

					const { result: setEdgesResult } = renderHook(() =>
						useSetEdges(),
					);

					act(() => {
						setEdgesResult.current([edge]);
					});

					const { result } = renderHook(() =>
						useContextMenu(ContextMenuType.CustomEdge, edge.id),
					);

					act(() => {
						result.current(mouseEvent);
					});

					render(<EdgeContextMenu />);

					fireEvent.click(
						screen.getByTestId(
							'custom-edge-context-menu::edge-type-menu-btn',
						),
					);

					for (const edgeType of Object.values(EdgeType)) {
						expect(
							screen.getByTestId(
								`${edgeType}-dropdown-component`,
							),
						).toBeInTheDocument();
					}
				});
			});

			describe('delete edge button tests', () => {
				it('deletes the node and closes the context menu', async () => {
					const edge = await EdgeFactory.build();

					const { result } = renderHook(() =>
						useContextMenu(ContextMenuType.CustomEdge, edge.id),
					);
					const { result: setEdgesResult } = renderHook(() =>
						useSetEdges(),
					);
					const { result: useEdgesResult } = renderHook(() =>
						useEdges(),
					);

					act(() => {
						setEdgesResult.current([edge]);
						result.current(mouseEvent);
					});

					expect(preventDefaultMock).toHaveBeenCalled();

					render(<ContextMenu />);
					expect(useEdgesResult.current).toHaveLength(1);

					const deleteButton = screen.getByTestId(
						'custom-edge-context-menu::delete-edge-btn',
					);
					fireEvent.click(deleteButton);

					expect(useEdgesResult.current).toHaveLength(0);
					expect(
						screen.queryByTestId('delete-node-context-item'),
					).toBeNull();
				});
			});
		});
	});
});
