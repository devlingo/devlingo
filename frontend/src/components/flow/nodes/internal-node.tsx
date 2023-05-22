import { Cog8ToothIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';
import { useContext } from 'react';
import { Handle, NodeProps, Position, useNodeId } from 'reactflow';

import { TypeSVGMap } from '@/assets';
import { TypeTagMap } from '@/constants';
import { InternalNodeData } from '@/types';
import { NodeContext } from '@/utils/context';

export function InternalNode({
	data: { nodeType, formData },
}: NodeProps<InternalNodeData>) {
	const nodeContext = useContext(NodeContext);

	const nodeId = useNodeId()!;
	const { t } = useTranslation('assets');

	const { SVG, props } = TypeSVGMap[nodeType];

	return (
		<div className="bg-accent shadow-xl w-48 h-24 flex-col rounded border-neutral border-2">
			<Handle
				type="source"
				position={Position.Top}
				id={`${nodeId}-source-${Position.Top}`}
				className="bg-accent-content rounded"
			/>
			<Handle
				type="source"
				position={Position.Right}
				id={`${nodeId}-source-${Position.Right}`}
				className="bg-accent-content rounded"
			/>
			<Handle
				type="source"
				position={Position.Left}
				id={`${nodeId}-source-${Position.Left}`}
				className="bg-accent-content rounded"
			/>
			<Handle
				type="source"
				position={Position.Bottom}
				id={`${nodeId}-source-${Position.Bottom}`}
				className="bg-accent-content rounded"
			/>
			<div className="flex justify-evenly border-b border-neutral gap-10 p-2">
				<figure>
					<SVG className="text-accent-content w-10 h-10" {...props} />
				</figure>
				<div className="flex-col gap-0">
					<h2 className="text-accent-content text-sm">
						{formData.nodeName}
					</h2>
					{formData.nodeName && (
						<span className="text-accent-content text-xs">
							{t(TypeTagMap[nodeType])}
						</span>
					)}
				</div>
			</div>
			<div className="flex justify-end pr-3 pt-1">
				<button>
					<Cog8ToothIcon
						className="h-5 w-5 text-accent-content hover:text-neutral-content"
						onClick={() => {
							nodeContext.handleNodeConfig(nodeId);
						}}
					/>
				</button>
			</div>
		</div>
	);
}
