import { useTranslation } from 'next-i18next';
import { useContext, useEffect, useRef, useState } from 'react';
import {
	Handle,
	HandleProps,
	NodeProps,
	NodeResizer,
	Position,
	useNodeId,
} from 'reactflow';
import { NodeShape } from 'shared/constants';
import { CustomNodeData } from 'shared/types';

import { TypeSVGMap } from '@/assets';
import { ShapeComponents } from '@/components/design-canvas-page/shapes';
import { Dimensions, NodeDefaultSizePX, TypeTagMap } from '@/constants';
import { ContextMenuType } from '@/constants/context-menu.constants';
import { ThemeContext } from '@/context';
import { useContextMenu } from '@/hooks/use-context-menu';
import { useUpdateNode } from '@/stores/design-store';

export function NodeHandles({
	nodeId,
	className,
	positions = Object.values(Position),
	...props
}: {
	nodeId: string;
	className?: string;
	positions?: Position[];
} & Omit<HandleProps, 'position' | 'type'>) {
	return (
		<>
			{positions.map((position, i) => (
				<Handle
					data-testid={`handle-${nodeId}-source-${position}`}
					className={className}
					id={position}
					key={i}
					position={position}
					type="source"
					{...props}
				/>
			))}
		</>
	);
}

export function calculateMinimalContentDimensions(childNodes: HTMLElement[]) {
	return childNodes.reduce<{
		minWidth: number;
		minHeight: number;
	}>(
		(acc, cur) => {
			const { width, height } = cur.getBoundingClientRect();
			acc.minWidth =
				width / 2 + Dimensions.Half > acc.minWidth
					? width / 2 + Dimensions.Half
					: acc.minWidth;
			acc.minHeight =
				height / 2 + Dimensions.Half > acc.minHeight
					? height / 2 + Dimensions.Half
					: acc.minHeight;

			return acc;
		},
		{
			minWidth: 0,
			minHeight: 0,
		},
	);
}

export function useNodeResize({
	width,
	height,
}: {
	width: number;
	height: number;
}) {
	const [minWidth, setMinWidth] = useState(0);
	const [minHeight, setMinHeight] = useState(0);
	const [resizeFactor, setResizeFactor] = useState(1);

	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (contentRef.current) {
			const result = calculateMinimalContentDimensions([
				...contentRef.current.childNodes,
			] as HTMLElement[]);
			setMinWidth(result.minWidth);
			setMinHeight(result.minHeight);
		}
	}, [contentRef.current, width, height]);

	useEffect(() => {
		setResizeFactor(height / NodeDefaultSizePX);
	}, [height, width]);

	return {
		contentRef,
		resizeFactor,
		minWidth,
		minHeight,
	};
}

export function CustomNode({
	data: { nodeType, formData, shape, width, height },
	selected,
}: NodeProps<CustomNodeData>) {
	const nodeId = useNodeId()!;
	const themeContext = useContext(ThemeContext);
	const updateNode = useUpdateNode();
	const onContextMenu = useContextMenu(ContextMenuType.CustomNode, nodeId);

	const { SVG, props } = TypeSVGMap[nodeType];
	const { t } = useTranslation('assets');
	const Shape = ShapeComponents[shape];

	const { minWidth, minHeight, contentRef, resizeFactor } = useNodeResize({
		width,
		height,
	});

	const baseFontSize = Math.abs(Dimensions.Rem * resizeFactor);

	return (
		<div
			className="relative text-base-100"
			data-testid={`node-${nodeId}`}
			onContextMenu={onContextMenu}
		>
			<NodeResizer
				onResize={(_, params) => {
					updateNode(nodeId, {
						width: params.width,
						height: params.height,
					});
				}}
				minHeight={minHeight}
				minWidth={minWidth}
				keepAspectRatio={true}
				isVisible={selected}
			/>
			<NodeHandles
				nodeId={nodeId}
				className="bg-accent rounded opacity-0"
			/>
			<Shape
				width={width}
				height={height}
				strokeWidth={selected ? 2 : 1}
				stroke={themeContext.themeColors?.primaryContent ?? '#fff'}
			/>
			<div
				className={`flex flex-col items-center absolute h-full w-full left-0 top-0 text-primary-content ${
					shape === NodeShape.Triangle
						? 'justify-end pb-3'
						: 'justify-center'
				}`}
				ref={contentRef}
			>
				<div>
					<div
						id={`${nodeId}-node-content`}
						className="flex justify-center items-end gap-3"
					>
						<figure>
							<SVG
								height={baseFontSize * 2}
								width={baseFontSize * 2}
								data-testid={`svg-${nodeId}`}
								className="z-10"
								{...props}
							/>
						</figure>
						<p
							className="text-primary-content"
							style={{ fontSize: baseFontSize * 0.75 }}
							data-testid={`type-tag-${nodeId}`}
						>
							{t(TypeTagMap[nodeType])}
						</p>
					</div>
					<div className="divider mt-0 mb-0" />
				</div>
				<div>
					<h2
						className="text-primary-content"
						style={{ fontSize: baseFontSize * 1.25 }}
						data-testid={`node-name-${nodeId}`}
					>
						{formData.nodeName}
					</h2>
				</div>
			</div>
		</div>
	);
}
