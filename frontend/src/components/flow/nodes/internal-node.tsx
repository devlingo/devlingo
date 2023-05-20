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
		<div className="bg-accent shadow-xl w-48 h-24 flex justify-between p-4 gap-4 rounded">
			<Handle
				type="source"
				position={Position.Top}
				id={`${nodeId}-source-${Position.Top}`}
			/>
			<Handle
				type="source"
				position={Position.Right}
				id={`${nodeId}-source-${Position.Right}`}
			/>
			<Handle
				type="source"
				position={Position.Left}
				id={`${nodeId}-source-${Position.Left}`}
			/>
			<Handle
				type="source"
				position={Position.Bottom}
				id={`${nodeId}-source-${Position.Bottom}`}
			/>
			<figure className="mx-auto mt-auto mb-auto">
				<SVG className="text-accent-content w-10 h-10" {...props} />
			</figure>
			<div className="flex-col gap-0">
				<h2 className="text-accent-content text-sm">
					{t(TypeTagMap[nodeType])}{' '}
				</h2>
				{formData.nodeName && (
					<span className="text-accent-content text-xs">
						{formData.nodeName}
					</span>
				)}
			</div>
			<button>
				<Cog8ToothIcon
					className="h-5 w-5 text-accent-content hover:text-neutral-content"
					onClick={() => {
						nodeContext.handleNodeConfig(nodeId);
					}}
				/>
			</button>
		</div>
	);
}
