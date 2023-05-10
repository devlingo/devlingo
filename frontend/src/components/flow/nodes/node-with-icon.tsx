import { ChevronRightIcon, Cog8ToothIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';
import { memo } from 'react';
import { Edge, Handle, Node, NodeProps, Position, useNodeId } from 'reactflow';

import { IconProps } from '@/assets';
import { NodeType } from '@/constants';
import { NodeData } from '@/types';

export interface NodeWithIconData {
	Icon: React.ComponentType<IconProps>;
	expandNodeHandler?: (nodeData: NodeData) => void;
	internalEdges: Edge[];
	internalNodes: Node[];
	name: string;
	tag: string;
	type: NodeType;
}

export function NodeWithIcon({
	data: {
		Icon,
		expandNodeHandler,
		internalEdges,
		internalNodes,
		name,
		tag,
		type,
	},
}: NodeProps<NodeWithIconData>) {
	const nodeId = useNodeId()!;
	const { t } = useTranslation('assets');

	return (
		<div className="bg-neutral shadow-xl w-[256px] h-[128px] flex-col justify-between">
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
			<div className="flex justify-between p-4">
				<figure>
					<Icon width={56} height={56} alt={t(`${tag}-logo-alt`)} />
				</figure>
				<div>
					<h2 className="text-base-content">{t(tag)}</h2>
					<p className="text-neutral-content">{name}</p>
				</div>
			</div>
			<div
				className={`flex justify-end gap-2 ${
					expandNodeHandler ? 'pr-2' : 'pr-3'
				}`}
			>
				<button>
					<Cog8ToothIcon className="h-5 w-5 text-neutral-content hover:text-accent" />
				</button>
				{expandNodeHandler && (
					<button>
						<ChevronRightIcon
							className="h-5 w-5 text-neutral-content hover:text-accent"
							onClick={() => {
								expandNodeHandler({
									NodeIcon: Icon,
									id: nodeId,
									initialEdges: internalEdges,
									initialNodes: internalNodes,
									name,
									type,
								});
							}}
						/>
					</button>
				)}
			</div>
		</div>
	);
}

export default memo(NodeWithIcon);
