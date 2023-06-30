import { ConnectionMode } from '@reactflow/core';
import { DesignFactory } from 'shared/testing';
import { DesignResponseData } from 'shared/types';
import { act, renderWithFlowProvider, screen, waitFor } from 'tests/test-utils';

import {
	calculateFlowHeight,
	calculateFlowWidth,
	FlowContainer,
} from '@/components/design-canvas-page/flow/flow-container';
import {
	DEFAULT_FLOW_HEIGHT,
	DEFAULT_FLOW_WIDTH,
	Dimensions,
} from '@/constants';
import * as useSaveDesignModule from '@/hooks/use-save-design';

const {
	mockUseReactFlow,
	mockBackground,
	mockControls,
	mockPanel,
	mockUseOnViewportChange,
} = vi.hoisted(() => {
	return {
		mockUseReactFlow: vi.fn(() => ({
			getViewport: vi.fn(() => ({ x: 0, y: 0, zoom: 1 })),
			zoomTo: vi.fn(),
			setViewport: vi.fn(),
		})),
		mockBackground: vi.fn(() => <div data-test-id="mock-background" />),
		mockControls: vi.fn(() => <div data-test-id="mock-controls" />),
		mockPanel: vi.fn(({ children }: any) => (
			<div data-test-id="mock-panel">{children}</div>
		)),
		mockUseOnViewportChange: vi.fn(),
	};
});
vi.mock(
	'reactflow',
	async (importOriginal: () => Promise<Record<string, any>>) => {
		return {
			...(await importOriginal()),
			useReactFlow: mockUseReactFlow,
			Background: mockBackground,
			Controls: mockControls,
			Panel: mockPanel,
			useOnViewportChange: mockUseOnViewportChange,
		};
	},
);

describe('FlowContainer tests', () => {
	describe('calculateFlowHeight tests', () => {
		it('returns the expected value when "isExpandedNode" is false', () => {
			const windowHeight = 500;
			const isExpandedNode = false;
			const result = calculateFlowHeight(windowHeight, isExpandedNode);
			expect(result).toEqual(windowHeight - Dimensions.Sixteen);
		});

		it('returns the expected value when "isExpandedNode" is false and value is smaller than 0', () => {
			const windowHeight = 0;
			const isExpandedNode = false;
			const result = calculateFlowHeight(windowHeight, isExpandedNode);
			expect(result).toEqual(DEFAULT_FLOW_HEIGHT);
		});

		it('returns the expected value when "isExpandedNode" is true', () => {
			const windowHeight = 500;
			const isExpandedNode = true;
			const result = calculateFlowHeight(windowHeight, isExpandedNode);
			expect(result).toEqual(windowHeight - Dimensions.ThirtySix);
		});

		it('returns the expected value when "isExpandedNode" is true and value is smaller than 0', () => {
			const windowHeight = 0;
			const isExpandedNode = true;
			const result = calculateFlowHeight(windowHeight, isExpandedNode);
			expect(result).toEqual(DEFAULT_FLOW_HEIGHT);
		});
	});

	describe('calculateFlowWidth tests', () => {
		it('returns the expected value when "isFullWidth" is true', () => {
			const windowWidth = 1000;
			const isFullWidth = true;
			const result = calculateFlowWidth(windowWidth, isFullWidth);
			expect(result).toEqual(windowWidth - Dimensions.Twenty);
		});

		it('returns the expected value when "isFullWidth" is false', () => {
			const windowWidth = 1000;
			const isFullWidth = false;
			const result = calculateFlowWidth(windowWidth, isFullWidth);
			expect(result).toEqual(windowWidth - Dimensions.Eighty);
		});

		it('returns the expected value when "isFullWidth" is true and width is smaller than 0', () => {
			const windowWidth = 10;
			const isFullWidth = true;
			const result = calculateFlowWidth(windowWidth, isFullWidth);
			expect(result).toEqual(DEFAULT_FLOW_WIDTH);
		});

		it('returns the expected value when "isFullWidth" is false and width is smaller than 0', () => {
			const windowWidth = -10;
			const isFullWidth = false;
			const result = calculateFlowWidth(windowWidth, isFullWidth);
			expect(result).toEqual(DEFAULT_FLOW_WIDTH);
		});
	});

	describe('FlowContainer tests', () => {
		const currentDesign = {
			...DesignFactory.buildSync(),
			versions: [],
		} satisfies DesignResponseData;

		it('sets the reactflow instance on init', async () => {
			const mockSetReactFlowInstance = vi.fn();
			renderWithFlowProvider(
				<FlowContainer
					connectionMode={ConnectionMode.Strict}
					isFullWidth={false}
					isExpandedNode={false}
					dndRef={vi.fn(() => ({}))}
					setReactFlowInstance={mockSetReactFlowInstance}
					showBackground={true}
					currentDesign={currentDesign}
				/>,
			);
			expect(
				screen.getByTestId('react-flow-container'),
			).toBeInTheDocument();
			await waitFor(() => {
				expect(mockSetReactFlowInstance).toHaveBeenCalled();
			});
		});

		it('renders a loader when saving', async () => {
			const mockSetLastChangeTimestamp = vi.fn();
			const spy = vi
				.spyOn(useSaveDesignModule, 'useSaveDesign')
				.mockReturnValue({
					setLastChangeTimestamp: mockSetLastChangeTimestamp,
					isSaving: false,
				} as any);

			const component = (
				<FlowContainer
					connectionMode={ConnectionMode.Strict}
					isFullWidth={false}
					isExpandedNode={false}
					dndRef={vi.fn(() => ({}))}
					setReactFlowInstance={vi.fn()}
					showBackground={true}
					currentDesign={currentDesign}
				/>
			);

			const { rerender } = renderWithFlowProvider(component);
			const loader = screen.getByTestId('save-design-loader');
			expect(loader).toHaveClass('opacity-0');

			act(() => {
				spy.mockReturnValueOnce({
					setLastChangeTimestamp: mockSetLastChangeTimestamp,
					isSaving: true,
				} as any);
			});

			rerender(component);

			await waitFor(() => {
				expect(loader).toHaveClass('opacity-75');
			});
		});

		it('resizes the container when "isExpandedNode"', async () => {
			const component = (
				<FlowContainer
					connectionMode={ConnectionMode.Strict}
					isFullWidth={false}
					isExpandedNode={false}
					dndRef={vi.fn(() => ({}))}
					setReactFlowInstance={vi.fn()}
					showBackground={true}
					currentDesign={currentDesign}
				/>
			);

			const { rerender } = renderWithFlowProvider(component);

			expect(screen.getByTestId('react-flow-container')).toHaveStyle({
				height: `${calculateFlowHeight(window.innerHeight, false)}px`,
				width: `${calculateFlowWidth(window.innerWidth, false)}px`,
			});

			rerender(
				<FlowContainer
					connectionMode={ConnectionMode.Strict}
					isFullWidth={false}
					isExpandedNode={true}
					dndRef={vi.fn(() => ({}))}
					setReactFlowInstance={vi.fn()}
					showBackground={true}
					currentDesign={currentDesign}
				/>,
			);

			await waitFor(() => {
				expect(screen.getByTestId('react-flow-container')).toHaveStyle({
					height: `${calculateFlowHeight(
						window.innerHeight,
						true,
					)}px`,
					width: `${calculateFlowWidth(window.innerWidth, false)}px`,
				});
			});
		});

		it('resizes the container when "isFullWidth"', async () => {
			const component = (
				<FlowContainer
					connectionMode={ConnectionMode.Strict}
					isFullWidth={false}
					isExpandedNode={false}
					dndRef={vi.fn(() => ({}))}
					setReactFlowInstance={vi.fn()}
					showBackground={true}
					currentDesign={currentDesign}
				/>
			);

			const { rerender } = renderWithFlowProvider(component);

			expect(screen.getByTestId('react-flow-container')).toHaveStyle({
				height: `${calculateFlowHeight(window.innerHeight, false)}px`,
				width: `${calculateFlowWidth(window.innerWidth, false)}px`,
			});

			rerender(
				<FlowContainer
					connectionMode={ConnectionMode.Strict}
					isFullWidth={true}
					isExpandedNode={false}
					dndRef={vi.fn(() => ({}))}
					setReactFlowInstance={vi.fn()}
					showBackground={true}
					currentDesign={currentDesign}
				/>,
			);

			await waitFor(() => {
				expect(screen.getByTestId('react-flow-container')).toHaveStyle({
					height: `${calculateFlowHeight(
						window.innerHeight,
						false,
					)}px`,
					width: `${calculateFlowWidth(window.innerWidth, true)}px`,
				});
			});
		});
	});
});
