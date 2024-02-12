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
	shape,
	width,
	height,
	...props
}: {
	className?: string;
	height: number;
	nodeId: string;
	shape: NodeShape;
	width: number;
} & Omit<HandleProps, 'position' | 'type'>) {
	const positions = Object.values(Position).map((position, i) => {
		const style: Record<string, any> = {};
		if (shape === NodeShape.Triangle) {
			if (position === Position.Left) {
				style.left = width * 0.23;
			} else if (position === Position.Right) {
				style.right = width * 0.23;
			}
		} else if (shape === NodeShape.Ellipse) {
			if (position === Position.Top) {
				style.top = height * 0.15;
			} else if (position === Position.Bottom) {
				style.bottom = height * 0.15;
			}
		}
		return (
			<Handle
				data-testid={`handle-${nodeId}-source-${position}`}
				key={i}
				className={className}
				id={position}
				position={position}
				type="source"
				style={style}
				{...props}
			/>
		);
	});

	return <>{positions}</>;
}

export function calculateMinimalContentDimensions(childNodes: HTMLElement[]) {
	return childNodes.reduce<{
		minHeight: number;
		minWidth: number;
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
			minHeight: 0,
			minWidth: 0,
		},
	);
}

export function useNodeResize({
	width,
	height,
}: {
	height: number;
	width: number;
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
		minHeight,
		minWidth,
		resizeFactor,
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
		height,
		width,
	});

	const baseFontSize = Math.abs(Dimensions.Rem * resizeFactor);

	return (
		<>
			<NodeHandles
				width={width}
				height={height}
				nodeId={nodeId}
				className="bg-accent rounded z-20"
				shape={shape}
			/>
			<NodeResizer
				onResize={(_, params) => {
					updateNode(nodeId, {
						height: params.height,
						width: params.width,
					});
				}}
				minHeight={minHeight}
				minWidth={minWidth}
				keepAspectRatio={true}
				isVisible={selected}
			/>
			<div
				className="relative text-base-100"
				data-testid={`node-${nodeId}`}
				onContextMenu={onContextMenu}
			>
				<Shape
					width={width}
					height={height}
					strokeWidth={selected ? 2 : 1}
					stroke={themeContext.themeColors?.primaryContent ?? '#fff'}
					id={`${nodeId}-${shape}`}
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
		</>
	);
}
