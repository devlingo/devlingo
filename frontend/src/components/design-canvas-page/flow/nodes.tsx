import { Cog8ToothIcon, ListBulletIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';
import { Handle, HandleProps, NodeProps, Position, useNodeId } from 'reactflow';
import { NodeShape } from 'shared/constants';
import { CustomNodeData } from 'shared/types';

import { TypeSVGMap } from '@/assets';
import { TypeTagMap } from '@/constants';
import { ContextMenuType } from '@/constants/context-menu.constants';
import { useContextMenu } from '@/hooks/use-context-menu';
import { useSetConfiguredNode } from '@/stores/design-store';

export const ShapeComponents: Record<
	NodeShape,
	React.FC<
		{
			width: number;
			height: number;
			selected: boolean;
		} & React.SVGProps<any>
	>
> = {
	[NodeShape.ArrowRectangle]: ({ width, height, selected, ...rest }) => (
		<path
			d={`M0,0 L${width - 10},0  L${width},${height / 2} L${
				width - 10
			},${height} L0,${height} z`}
			strokeWidth={selected ? 2 : 0}
			{...rest}
		/>
	),
	[NodeShape.Circle]: ({ width, selected, ...rest }) => (
		<circle
			cx={width / 2}
			cy={width / 2}
			r={width}
			strokeWidth={selected ? 2 : 0}
			{...rest}
		/>
	),
	[NodeShape.Database]: ({ width, height, selected, ...rest }) => (
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
			{...rest}
			strokeWidth={selected ? 2 : 1}
		/>
	),
	[NodeShape.Diamond]: ({ width, height, selected, ...rest }) => (
		<path
			d={`M0,${height / 2} L${width / 2},0 L${width},${height / 2} L${
				width / 2
			},${height} z`}
			strokeWidth={selected ? 2 : 0}
			{...rest}
		/>
	),
	[NodeShape.Ellipse]: ({ width, height, selected, ...rest }) => (
		<ellipse
			cx={width / 2}
			cy={height / 2}
			rx={width}
			ry={height}
			strokeWidth={selected ? 2 : 0}
			{...rest}
		/>
	),
	[NodeShape.Hexagon]: ({ width, height, selected, ...rest }) => (
		<path
			d={`M10,0 L${width - 10},0  L${width},${height / 2} L${
				width - 10
			},${height} L10,${height} L0,${height / 2} z`}
			strokeWidth={selected ? 2 : 0}
			{...rest}
		/>
	),
	[NodeShape.Parallelogram]: ({ width, height, selected, ...rest }) => (
		<path
			d={`M0,${height} L${width * 0.25},0 L${width},0 L${
				width - width * 0.25
			},${height} z`}
			strokeWidth={selected ? 2 : 0}
			{...rest}
		/>
	),
	[NodeShape.Rectangle]: ({ width, height, selected, ...rest }) => (
		<rect
			x={0}
			y={0}
			width={width}
			height={height}
			strokeWidth={selected ? 2 : 0}
			{...rest}
		/>
	),
	[NodeShape.RoundedRectangle]: ({ width, height, selected, ...rest }) => (
		<rect
			x={0}
			y={0}
			rx={20}
			width={width}
			height={height}
			strokeWidth={selected ? 2 : 0}
			{...rest}
		/>
	),
	[NodeShape.Triangle]: ({ width, height, selected, ...rest }) => (
		<path
			d={`M0,${height} L${width / 2},0 L${width},${height} z`}
			strokeWidth={selected ? 2 : 0}
			{...rest}
		/>
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

function NodeButton({
	Icon,
	color = 'text-base-content',
	hoverColor = 'text-primary',
	...props
}: {
	color?: string;
	hoverColor?: string;
	size?: number;
	Icon: React.ComponentType<any>;
} & Omit<React.ButtonHTMLAttributes<any>, 'className'>) {
	return (
		<button {...props}>
			<Icon className={`h-5 w-5 ${color} hover:${hoverColor}`} />
		</button>
	);
}

export function CanvasNodeComponent({
	data: { nodeType, formData, shape, height, width },
	selected,
}: Partial<NodeProps<CustomNodeData>> & { data: CustomNodeData }) {
	const setConfiguredNode = useSetConfiguredNode();

	const nodeId = useNodeId()!;
	const onContextMenu = useContextMenu(ContextMenuType.CustomNode, nodeId);

	const { SVG, props } = TypeSVGMap[nodeType];
	const { t } = useTranslation('assets');
	const Shape = ShapeComponents[shape];
	return (
		<div data-testid={`node-${nodeId}`} onContextMenu={onContextMenu}>
			<NodeHandles
				nodeId={nodeId}
				className="bg-accent rounded opacity-0"
			/>
			<svg
				style={{ display: 'block', overflow: 'visible' }}
				height={height}
				width={width}
			>
				<Shape
					width={width}
					height={height}
					selected={selected ?? false}
					className="bg-base-100"
				/>
			</svg>
			<div className="flex justify-start p-4 border-b-2 border-b-neutral gap-8">
				<figure>
					<SVG
						className="max-w-12 max-h-12 h-full w-full"
						data-testid={`svg-${nodeId}`}
						{...props}
					/>
				</figure>
				<div>
					<h2 className="text-base-content text-lg">
						{formData.nodeName}
					</h2>
					<p
						className="text-base-content text-sm"
						data-testid={`type-tag-${nodeId}`}
					>
						{t(TypeTagMap[nodeType])}
					</p>
				</div>
			</div>
			<div className="flex justify-between p-3">
				<div className="join join-horizontal gap-2">
					<NodeButton
						Icon={ListBulletIcon}
						data-testid={`todo-btn-${nodeId}`}
					/>
					<NodeButton
						Icon={Cog8ToothIcon}
						data-testid={`config-btn-${nodeId}`}
						onClick={() => {
							setConfiguredNode(nodeId);
						}}
					/>
				</div>
			</div>
		</div>
	);
}

// function ShapeNode({ data, selected }: NodeProps) {
// 	const width = data?.width || 100;
// 	const height = data?.height || 100;
// 	const shape = useShape({
// 		type: data?.shape,
// 		width,
// 		height,
// 		color: data?.color,
// 		selected,
// 	});
//
// 	return (
// 		<div style={{ position: 'relative' }}>
// 			<Handle
// 				id="top"
// 				style={handleStyle}
// 				position={Position.Top}
// 				type="source"
// 			/>
// 			<Handle
// 				id="right"
// 				style={handleStyle}
// 				position={Position.Right}
// 				type="source"
// 			/>
// 			<Handle
// 				id="bottom"
// 				style={handleStyle}
// 				position={Position.Bottom}
// 				type="source"
// 			/>
// 			<Handle
// 				id="left"
// 				style={handleStyle}
// 				position={Position.Left}
// 				type="source"
// 			/>
// 			<svg
// 				style={{ display: 'block', overflow: 'visible' }}
// 				width={width}
// 				height={height}
// 			>
// 				{shape}
// 			</svg>
// 			<div
// 				style={{
// 					display: 'flex',
// 					justifyContent: 'center',
// 					alignItems: 'center',
// 					position: 'absolute',
// 					top: 0,
// 					left: 0,
// 					width: '100%',
// 					height: '100%',
// 				}}
// 			>
// 				<div
// 					style={{
// 						fontFamily: 'monospace',
// 						fontWeight: 'bold',
// 						color: 'white',
// 						fontSize: 12,
// 					}}
// 				>
// 					{data?.label}
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
