import {
	ChevronRightIcon,
	Cog8ToothIcon,
	ListBulletIcon,
} from '@heroicons/react/24/solid';
import { NodeResizer } from '@reactflow/node-resizer';
import { useTranslation } from 'next-i18next';
import { Handle, HandleProps, NodeProps, Position, useNodeId } from 'reactflow';

import { TypeSVGMap } from '@/assets';
import { ServiceNodeAllowedInternalNodesMap, TypeTagMap } from '@/constants';
import {
	useDisplayNodes,
	useSetConfiguredNode,
	useSetExpandedNode,
} from '@/hooks/use-design-canvas-store';
import { ContainerNodeData, InternalNodeData, ServiceNodeData } from '@/types';

export function NodeHandles({
	nodeId,
	className = 'bg-accent rounded',
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

export function ServiceNode({
	data: { nodeType, formData },
}: Partial<NodeProps<ServiceNodeData>> & { data: ServiceNodeData }) {
	const setConfiguredNode = useSetConfiguredNode();
	const setExpandedNode = useSetExpandedNode();

	const internalNodeTypes = ServiceNodeAllowedInternalNodesMap[nodeType];
	const nodeId = useNodeId()!;
	const { SVG, props } = TypeSVGMap[nodeType];
	const { t } = useTranslation('assets');

	return (
		<div
			className="bg-base-100 shadow-2xl flex-col justify-between rounded border-2 border-neutral h-32 w-60"
			data-testid={`node-${nodeId}`}
		>
			<NodeHandles nodeId={nodeId} />
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
				{internalNodeTypes?.length && (
					<NodeButton
						Icon={ChevronRightIcon}
						data-testid={`expand-btn-${nodeId}`}
						onClick={() => {
							setExpandedNode(nodeId);
						}}
					/>
				)}
			</div>
		</div>
	);
}

export function ContainerNode({
	selected,
	data: { nodeType, formData },
}: Partial<NodeProps<ContainerNodeData>> & { data: ContainerNodeData }) {
	const displayNodes = useDisplayNodes();
	const setConfiguredNode = useSetConfiguredNode();

	const nodeId = useNodeId()!;
	const { SVG, props } = TypeSVGMap[nodeType];
	const { t } = useTranslation('assets');

	const { width: minWidth, height: minHeight } = (displayNodes.find(
		(n) => n.id === nodeId,
	)?.style ?? {
		width: 208,
		height: 96,
	}) as {
		width: number;
		height: number;
	};

	return (
		<div
			className="bg-base-300 shadow-xl flex-col rounded border-neutral border-2 p-1 h-full w-full"
			data-testid={`node-${nodeId}`}
		>
			<NodeResizer
				isVisible={selected}
				keepAspectRatio
				minWidth={minWidth}
				minHeight={minHeight}
			/>
			<NodeHandles nodeId={nodeId} />
			<div className="flex justify-evenly items-end border-b border-neutral gap-10 p-2">
				<figure>
					<SVG
						className="text-base-content w-12 h-12"
						data-testid={`svg-${nodeId}`}
						{...props}
					/>
				</figure>
				<div className="flex-col gap-0">
					<h2 className="text-base-content text-md truncate">
						{formData.nodeName}
					</h2>
					<span
						className="text-base-content text-sm"
						data-testid={`type-tag-${nodeId}`}
					>
						{t(TypeTagMap[nodeType])}
					</span>
				</div>
				<div className="flex-end">
					<NodeButton
						Icon={Cog8ToothIcon}
						color="text-base-content"
						data-testid={`config-btn-${nodeId}`}
						hoverColor="text-neutral-content"
						onClick={() => {
							setConfiguredNode(nodeId);
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export function InternalNode({
	data: { nodeType, formData },
}: Partial<NodeProps<InternalNodeData>> & { data: InternalNodeData }) {
	const setConfiguredNode = useSetConfiguredNode();

	const nodeId = useNodeId()!;
	const { SVG, props } = TypeSVGMap[nodeType];
	const { t } = useTranslation('assets');

	return (
		<div
			className="bg-accent shadow-xl flex-col rounded border-neutral border-2 p-1 h-24 w-52"
			data-testid={`node-${nodeId}`}
		>
			<NodeHandles nodeId={nodeId} />
			<div className="flex justify-evenly border-b border-neutral gap-10 p-2">
				<figure>
					<SVG
						className="text-accent-content w-10 h-10"
						data-testid={`svg-${nodeId}`}
						{...props}
					/>
				</figure>
				<div className="flex-col gap-0">
					<h2 className="text-accent-content text-sm truncate">
						{formData.nodeName}
					</h2>
					<span
						className="text-accent-content text-xs"
						data-testid={`type-tag-${nodeId}`}
					>
						{t(TypeTagMap[nodeType])}
					</span>
				</div>
			</div>
			<div className="flex justify-end pr-3 pt-1">
				<NodeButton
					Icon={Cog8ToothIcon}
					color="text-accent-content"
					data-testid={`config-btn-${nodeId}`}
					hoverColor="text-neutral-content"
					onClick={() => {
						setConfiguredNode(nodeId);
					}}
				/>
			</div>
		</div>
	);
}