import {
	ArrowPathIcon,
	Cog8ToothIcon,
	ListBulletIcon,
} from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';
import { useEffect, useRef, useState } from 'react';
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
import { Dimensions, NodeDefaultSizePX, TypeTagMap } from '@/constants';
import { ContextMenuType } from '@/constants/context-menu.constants';
import { useContextMenu } from '@/hooks/use-context-menu';
import { useSetConfiguredNode, useUpdateNode } from '@/stores/design-store';

export const ShapeComponents: Record<
	NodeShape,
	React.FC<
		{
			width: number;
			height: number;
		} & React.SVGProps<any>
	>
> = {
	[NodeShape.ArrowRight]: ({ width = 100, height = 100, ...props }) => (
		<svg height={height} width={width} fill="currentColor" {...props}>
			<path
				d={`M0,0 L${width - 55},0  L${width},${height / 2} L${
					width - 55
				},${height} L0,${height} z`}
			/>
		</svg>
	),
	[NodeShape.ArrowLeft]: ({ width = 100, height = 100, ...props }) => (
		<svg height={height} width={width} fill="currentColor" {...props}>
			<path
				d={`M0,${
					height / 2
				} L55,0  L${width},0 L${width},${height} L55,${height} z`}
			/>
		</svg>
	),
	[NodeShape.Circle]: ({ width, height, ...props }) => (
		<svg height={height} width={width} fill="currentColor" {...props}>
			<circle cx={width / 2} cy={width / 2} r={width / 2} />
		</svg>
	),
	[NodeShape.Database]: ({ width, height, ...props }) => (
		<svg height={height} width={width} fill="currentColor" {...props}>
			<path
				d={`M0,${height * 0.125}  L 0,${height - height * 0.125} A ${
					width / 2
				} ${height * 0.125} 0 1 0 ${width} ${
					height - height * 0.125
				} L ${width},${height * 0.125} A ${width / 2} ${
					height * 0.125
				} 0 1 1 0 ${height * 0.125} A ${width / 2} ${
					height * 0.125
				} 0 1 1 ${width} ${height * 0.125} A ${width / 2} ${
					height * 0.125
				} 0 1 1 0 ${height * 0.125} z`}
			/>
		</svg>
	),
	[NodeShape.Diamond]: ({ width, height, ...props }) => (
		<svg height={height} width={width} fill="currentColor" {...props}>
			<path
				d={`M0,${height / 2} L${width / 2},0 L${width},${height / 2} L${
					width / 2
				},${height} z`}
			/>
		</svg>
	),
	[NodeShape.Ellipse]: ({ width, height, ...props }) => (
		<svg height={height} width={width} fill="currentColor" {...props}>
			<ellipse
				cx={width / 2}
				cy={height / 2}
				rx={width / 2}
				ry={height / 3}
			/>
		</svg>
	),
	[NodeShape.Hexagon]: ({ width, height, ...props }) => (
		<svg height={height} width={width} fill="currentColor" {...props}>
			<path
				d={`M${width * 0.25},0 L${width * 0.75},0  L${width},${
					height / 2
				} L${width * 0.75},${height} L${width * 0.25},${height} L0,${
					height / 2
				} z`}
			/>
		</svg>
	),
	[NodeShape.ParallelogramRight]: ({ width, height, ...props }) => (
		<svg height={height} width={width} fill="currentColor" {...props}>
			<path
				d={`M0,${height} L${width * 0.25},0 L${width},0 L${
					width - width * 0.25
				},${height} z`}
			/>
		</svg>
	),
	[NodeShape.ParallelogramLeft]: ({ width, height, ...props }) => (
		<svg height={height} width={width} fill="currentColor" {...props}>
			<path
				d={`M${width * 0.25},${height} L0,0 L${width},0 L${
					width - width * 0.25
				},0 L${width}, ${height} z`}
			/>
		</svg>
	),
	[NodeShape.Rectangle]: ({ width, height, ...props }) => (
		<svg height={height} width={width} fill="currentColor" {...props}>
			<rect x={0} y={0} width={width} height={height} />
		</svg>
	),
	[NodeShape.RoundedRectangle]: ({ width, height, ...props }) => (
		<svg height={height} width={width} fill="currentColor" {...props}>
			<rect x={0} y={0} rx={20} width={width} height={height} />
		</svg>
	),
	[NodeShape.Triangle]: ({ width, height, ...props }) => (
		<svg height={height} width={width} fill="currentColor" {...props}>
			<path d={`M0,${height} L${width / 2},0 L${width},${height} z`} />
		</svg>
	),
};

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
	const [resizeFactor, setResizeFactor] = useState(1.0);

	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (contentRef.current) {
			const result = calculateMinimalContentDimensions(
				Array.from(contentRef.current.childNodes) as HTMLElement[],
			);
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

export function CanvasNodeComponent({
	data: { nodeType, formData, shape, width, height },
	selected,
}: NodeProps<CustomNodeData>) {
	const nodeId = useNodeId()!;
	const updateNode = useUpdateNode();
	const setConfiguredNode = useSetConfiguredNode();
	const onContextMenu = useContextMenu(ContextMenuType.CustomNode, nodeId);

	const { SVG, props } = TypeSVGMap[nodeType];
	const { t } = useTranslation('assets');
	const Shape = ShapeComponents[shape];

	const handleUpdateNodeShape = (): void => {
		const shapes = Object.values(NodeShape);
		const shapeIndex = shapes.findIndex((s) => shape === s);

		const nextShape =
			shapes[shapeIndex === shapes.length - 1 ? 0 : shapeIndex + 1];
		updateNode(nodeId, { shape: nextShape });
	};

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
			/>
			<NodeHandles
				nodeId={nodeId}
				className="bg-accent rounded opacity-0"
			/>
			<Shape
				width={width}
				height={height}
				strokeWidth={selected ? 2 : 1}
				stroke={'#fff'}
			/>
			<div
				className={`flex flex-col items-center absolute h-full w-full left-0 top-0 text-base-content ${
					shape === NodeShape.Triangle
						? 'justify-end pb-3'
						: 'justify-center'
				}`}
				ref={contentRef}
			>
				<div
					id={`${nodeId}-node-content`}
					className="flex justify-center gap-3"
				>
					<figure>
						<SVG
							height={baseFontSize * 3.35}
							width={baseFontSize * 3.25}
							data-testid={`svg-${nodeId}`}
							className="z-10"
							{...props}
						/>
					</figure>
					<div>
						<h2
							className="text-base-content"
							style={{ fontSize: baseFontSize * 1.25 }}
							data-testid={`node-name-${nodeId}`}
						>
							{formData.nodeName}
						</h2>
						<p
							className="text-base-content"
							style={{ fontSize: baseFontSize }}
							data-testid={`type-tag-${nodeId}`}
						>
							{t(TypeTagMap[nodeType])}
						</p>
					</div>
				</div>
				<div
					id={`${nodeId}-node-actions`}
					className="flex justify-center gap-2"
				>
					<button
						className="btn btn-xs btn-ghost text-accent hover:text-primary-content"
						data-testid={`todo-btn-${nodeId}`}
					>
						<ListBulletIcon
							height={baseFontSize * 1.5}
							width={baseFontSize * 1.5}
						/>
					</button>
					<button
						className="btn btn-xs btn-ghost text-accent hover:text-primary-content"
						data-testid={`config-btn-${nodeId}`}
						onClick={() => {
							setConfiguredNode(nodeId);
						}}
					>
						<Cog8ToothIcon
							height={baseFontSize * 1.5}
							width={baseFontSize * 1.5}
						/>
					</button>
					<button
						className="btn btn-xs btn-ghost text-accent hover:text-primary-content"
						data-testid={`switch-shape-btn-${nodeId}`}
						onClick={handleUpdateNodeShape}
					>
						<ArrowPathIcon
							height={baseFontSize * 1.5}
							width={baseFontSize * 1.5}
						/>
					</button>
				</div>
			</div>
		</div>
	);
}
