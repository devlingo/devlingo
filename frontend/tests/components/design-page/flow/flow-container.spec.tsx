import { ConnectionMode } from '@reactflow/core';
import React from 'react';
import { DesignFactory } from 'shared/testing';
import { DesignResponseData } from 'shared/types';
import { renderWithFlowProvider, screen, waitFor } from 'tests/test-utils';

import {
	calculateFlowHeight,
	calculateFlowWidth,
	FlowContainer,
} from '@/components/design-canvas-page/flow/flow-container';
import { DEFAULT_FLOW_HEIGHT, Dimensions } from '@/constants';

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
		mockBackground: () => <div data-test-id="mock-background" />,
		mockControls: () => <div data-test-id="mock-controls" />,
		mockPanel: ({ children }: any) => (
			<div data-test-id="mock-panel">{children}</div>
		),
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
			expect(result).toEqual(DEFAULT_FLOW_HEIGHT);
		});

		it('returns the expected value when "isFullWidth" is false and width is smaller than 0', () => {
			const windowWidth = -10;
			const isFullWidth = false;
			const result = calculateFlowWidth(windowWidth, isFullWidth);
			expect(result).toEqual(DEFAULT_FLOW_HEIGHT);
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
			const reactFlowContainer = screen.getByTestId(
				'react-flow-container',
			);
			expect(reactFlowContainer).toBeInTheDocument();
			await waitFor(() => {
				expect(mockSetReactFlowInstance).toHaveBeenCalled();
			});
		});
	});
});
