import { ChevronRightIcon, Cog8ToothIcon } from '@heroicons/react/24/solid';
import { Edge } from '@reactflow/core';
import { useTranslation } from 'next-i18next';
import { useContext } from 'react';
import { Handle, Node, NodeProps, Position, useNodeId } from 'reactflow';

import { TypeSVGMap } from '@/assets';
import { ServiceNodeType, TypeTagMap } from '@/constants';
import { InternalNodeData, ServiceNodeData } from '@/types';
import { NodeContext } from '@/utils/context';

export function ServiceNode({
	data: { nodeType, allowExpansion, formData },
}: NodeProps<ServiceNodeData>) {
	const nodeContext = useContext(NodeContext);
	const nodeId = useNodeId()!;

	const { t } = useTranslation('assets');
	const { SVG, props } = TypeSVGMap[nodeType];

	return (
		<div className="bg-base-100 shadow-2xl flex-col justify-between rounded border-2 border-neutral h-34 w-60">
			<Handle
				type="source"
				position={Position.Top}
				id={`${nodeId}-source-${Position.Top}`}
				className="bg-accent rounded"
			/>
			<Handle
				type="source"
				position={Position.Right}
				id={`${nodeId}-source-${Position.Right}`}
				className="bg-accent rounded"
			/>
			<Handle
				type="source"
				position={Position.Left}
				id={`${nodeId}-source-${Position.Left}`}
				className="bg-accent rounded"
			/>
			<Handle
				type="source"
				position={Position.Bottom}
				id={`${nodeId}-source-${Position.Bottom}`}
				className="bg-accent rounded"
			/>
			<div className="flex justify-between p-4 border-b-2 border-b-neutral gap-4">
				<figure>
					<SVG
						className="max-w-12 max-h-12 h-full w-full"
						{...props}
					/>
				</figure>
				<div>
					<h2 className="text-base-content text-md">
						{formData.nodeName}
					</h2>
					{formData.nodeName && (
						<p className="text-base-content text-xs">
							{t(TypeTagMap[nodeType])}
						</p>
					)}
				</div>
			</div>
			<div className="flex justify-end gap-2 p-4">
				<button>
					<Cog8ToothIcon
						className="h-5 w-5 text-base-content hover:text-primary"
						onClick={() => {
							nodeContext.handleNodeConfig(nodeId);
						}}
					/>
				</button>
				{allowExpansion && (
					<button>
						<ChevronRightIcon
							className="h-5 w-5 text-base-content hover:text-primary"
							onClick={() => {
								nodeContext.handleNodeExpand(nodeId);
							}}
						/>
					</button>
				)}
			</div>
		</div>
	);
}

export function createServiceNode({
	props,
	nodeType,
	formData = {},
	allowExpansion = true,
	childNodes = [],
	childEdges = [],
}: {
	props: Omit<Node, 'data' | 'type' | 'className'>;
	nodeType: ServiceNodeType;
	formData: Record<string, any>;
	allowExpansion?: boolean;
	childNodes?: Node<InternalNodeData>[];
	childEdges?: Edge[];
}): Node<ServiceNodeData, 'ServiceNode'> {
	return {
		data: { nodeType, formData, allowExpansion, childNodes, childEdges },
		type: 'ServiceNode',
		...props,
	};
}
