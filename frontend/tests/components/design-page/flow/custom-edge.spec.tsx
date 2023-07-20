import { Position } from '@reactflow/core';
import { EdgeType } from 'shared/constants';
import { fireEvent, render, renderHook, screen } from 'tests/test-utils';

import { CustomEdge } from '@/components/design-canvas-page/flow/custom-edge';
import { useContextMenuStore } from '@/stores/context-menu-store';

describe('CustomEdge tests', () => {
	it('renders the edge component as expected', () => {
		const edgeType = EdgeType.Bezier;
		const edgeId = 'test-id';
		render(
			<CustomEdge
				data={{ edgeType }}
				id={edgeId}
				source={''}
				target={''}
				sourcePosition={Position.Top}
				sourceX={0}
				sourceY={0}
				targetPosition={Position.Bottom}
				targetX={1}
				targetY={1}
			/>,
		);

		expect(
			screen.getByTestId(`edge-container-${edgeId}`),
		).toBeInTheDocument();
	});

	it('attaches a "contextMenu" event handler to the edge', () => {
		const edgeType = EdgeType.Bezier;
		const edgeId = 'test-id';

		render(
			<CustomEdge
				data={{ edgeType }}
				id={edgeId}
				source={''}
				target={''}
				sourcePosition={Position.Top}
				sourceX={0}
				sourceY={0}
				targetPosition={Position.Bottom}
				targetX={1}
				targetY={1}
			/>,
		);

		const { result: isContextMenuOpenResult } = renderHook(() =>
			useContextMenuStore((s) => s.isContextMenuOpen),
		);
		expect(isContextMenuOpenResult.current).toBeFalsy();

		const container = screen.getByTestId(`edge-container-${edgeId}`);
		expect(container).toBeInTheDocument();
		fireEvent.contextMenu(container);
		expect(isContextMenuOpenResult.current).toBeTruthy();
	});
});
