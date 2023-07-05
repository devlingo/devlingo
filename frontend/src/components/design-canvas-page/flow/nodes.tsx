import {
	ArrowPathIcon,
	Cog8ToothIcon,
	ListBulletIcon,
} from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';
import {
	Handle,
	HandleProps,
	NodeProps,
	Position,
	useNodeId,
	useUpdateNodeInternals,
} from 'reactflow';
import { NodeShape } from 'shared/constants';
import { CustomNodeData } from 'shared/types';

import { TypeSVGMap } from '@/assets';
import { TypeTagMap } from '@/constants';
import {
	useNodes,
	useSetConfiguredNode,
	useSetNodes,
} from '@/stores/design-store';
import { ContextMenuType } from '@/constants/context-menu.constants';
import { useContextMenu } from '@/hooks/use-context-menu';

export const ShapeComponents: Record<
	NodeShape,
	React.FC<{
		width: number;
		height: number;
	}>
> = {
	[NodeShape.ArrowRectangle]: ({ width = 100, height = 100 }) => (
		<svg height={height} width={width}>
			<path
				d={`M0,0 L${width - 10},0  L${width},${height / 2} L${
					width - 10
				},${height} L0,${height} z`}
			/>
		</svg>
	),
	[NodeShape.Circle]: ({ width }) => (
		<svg height={width} width={width}>
			<circle cx={width / 2} cy={width / 2} r={width} />
		</svg>
	),
	[NodeShape.Database]: ({ width, height }) => (
		<svg height={height} width={width}>
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
	[NodeShape.Diamond]: ({ width, height }) => (
		<svg height={height} width={width}>
			<path
				d={`M0,${height / 2} L${width / 2},0 L${width},${height / 2} L${
					width / 2
				},${height} z`}
			/>
		</svg>
	),
	[NodeShape.Ellipse]: ({ width, height }) => (
		<svg height={height} width={width}>
			<ellipse cx={width / 2} cy={height / 2} rx={width} ry={height} />
		</svg>
	),
	[NodeShape.Hexagon]: ({ width, height }) => (
		<svg height={height} width={width}>
			<path
				d={`M10,0 L${width - 10},0  L${width},${height / 2} L${
					width - 10
				},${height} L10,${height} L0,${height / 2} z`}
			/>
		</svg>
	),
	[NodeShape.Parallelogram]: ({ width, height }) => (
		<svg height={height} width={width}>
			<path
				d={`M0,${height} L${width * 0.25},0 L${width},0 L${
					width - width * 0.25
				},${height} z`}
			/>
		</svg>
	),
	[NodeShape.Rectangle]: ({ width, height }) => (
		<svg height={height} width={width}>
			<rect x={0} y={0} width={width} height={height} />
		</svg>
	),
	[NodeShape.RoundedRectangle]: ({ width, height }) => (
		<svg height={height} width={width}>
			<rect x={0} y={0} rx={20} width={width} height={height} />
		</svg>
	),
	[NodeShape.Triangle]: ({ width, height }) => (
		<svg height={height} width={width}>
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

export function CanvasNodeComponent({
	data: { nodeType, formData, shape, height, width },
	selected,
}: NodeProps<CustomNodeData>) {
	const setConfiguredNode = useSetConfiguredNode();
	const nodeId = useNodeId()!;
	const nodes = useNodes();
	const setNodes = useSetNodes();
	const updateNodeInternals = useUpdateNodeInternals();
	const onContextMenu = useContextMenu(ContextMenuType.CustomNode, nodeId);

	const { SVG, props } = TypeSVGMap[nodeType];
	const { t } = useTranslation('assets');
	console.log('shape', shape);
	const Shape = ShapeComponents[shape];

	const handleUpdateNodeShape = (): void => {
		setNodes(
			nodes.map((node) => {
				if (node.id === nodeId) {
					const shapes = Object.values(NodeShape);
					const shapeIndex = shapes.findIndex(
						(s) => node.data.shape === s,
					);
					console.log(shapeIndex);
					const nextShape =
						shapes[
							shapeIndex === shapes.length - 1
								? 0
								: shapeIndex + 1
						];
					console.log('nextShape', nextShape);
					const { data, ...rest } = node;
					return { ...rest, data: { ...data, shape: nextShape } };
				}
				return node;
			}),
		);
		updateNodeInternals(nodeId);
	};

	return (
		<div className="relative" data-testid={`node-${nodeId}`} onContextMenu={onContextMenu}>
			<NodeHandles
				nodeId={nodeId}
				className="bg-accent rounded opacity-0"
			/>
			<figure
				className={`border-2 block overflow-visible ${
					selected ? 'border-accent' : 'border-neutral'
				}`}
			>
				<Shape width={width} height={height} />
			</figure>
			<div className="flex flex-col justify-center items-center absolute h-full w-full left-0 top-0">
				<div className="flex justify-start p-4 border-b-2 border-b-neutral gap-4">
					<figure>
						<SVG
							height={height / 4}
							width={height / 4}
							data-testid={`svg-${nodeId}`}
							className="z-10"
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
				<div className="flex justify-between w-full p-4">
					<div className="join join-horizontal gap-2">
						<button
							className="btn btn-xs btn-ghost text-accent hover:text-primary-content"
							data-testid={`todo-btn-${nodeId}`}
						>
							<ListBulletIcon
								height={height / 12}
								width={height / 12}
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
								height={height / 12}
								width={height / 12}
							/>
						</button>
					</div>
					<button
						className="btn btn-xs btn-ghost text-accent hover:text-primary-content"
						data-testid={`switch-shape-btn-${nodeId}`}
						onClick={handleUpdateNodeShape}
					>
						<ArrowPathIcon
							height={height / 12}
							width={height / 12}
						/>
					</button>
				</div>
			</div>
		</div>
	);
}
