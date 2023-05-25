import {
	ChevronRightIcon,
	Cog8ToothIcon,
	ListBulletIcon,
} from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';
import { useContext } from 'react';
import { Handle, HandleProps, NodeProps, Position, useNodeId } from 'reactflow';

import { TypeSVGMap } from '@/assets';
import { ServiceNodeAllowedInternalNodesMap, TypeTagMap } from '@/constants';
import { InternalNodeData, ServiceNodeData } from '@/types';
import { NodeContext } from '@/utils/context';

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
					id={`${nodeId}-source-${position}`}
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
	const nodeContext = useContext(NodeContext);
	const nodeId = useNodeId()!;

	const { t } = useTranslation('assets');
	const { SVG, props } = TypeSVGMap[nodeType];

	const internalNodeTypes = ServiceNodeAllowedInternalNodesMap[nodeType];

	return (
		<div
			className="bg-base-100 shadow-2xl flex-col justify-between rounded border-2 border-neutral h-34 w-60"
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
			<div className="flex justify-between p-4">
				<div className="btn-group btn-group-horizontal gap-2">
					<NodeButton
						Icon={ListBulletIcon}
						data-testid={`todo-btn-${nodeId}`}
					/>
					<NodeButton
						Icon={Cog8ToothIcon}
						data-testid={`config-btn-${nodeId}`}
						onClick={() => {
							nodeContext.handleNodeConfig(nodeId);
						}}
					/>
				</div>
				{internalNodeTypes?.length && (
					<NodeButton
						Icon={ChevronRightIcon}
						data-testid={`expand-btn-${nodeId}`}
						onClick={() => {
							nodeContext.handleNodeExpand(nodeId);
						}}
					/>
				)}
			</div>
		</div>
	);
}

export function InternalNode({
	data: { nodeType, formData, parentNodeId },
}: Partial<NodeProps<InternalNodeData>> & { data: InternalNodeData }) {
	const nodeContext = useContext(NodeContext);

	const nodeId = useNodeId()!;
	const { t } = useTranslation('assets');

	const { SVG, props } = TypeSVGMap[nodeType];

	return (
		<div
			className="bg-accent shadow-xl w-48 h-24 flex-col rounded border-neutral border-2"
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
					<h2 className="text-accent-content text-sm">
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
						nodeContext.handleNodeConfig(nodeId, parentNodeId);
					}}
				/>
			</div>
		</div>
	);
}
