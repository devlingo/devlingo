import { Cog8ToothIcon, ListBulletIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';
import { Handle, HandleProps, NodeProps, Position, useNodeId } from 'reactflow';

import { TypeSVGMap } from '@/assets';
import { TypeTagMap } from '@/constants';
import { useSetConfiguredNode } from '@/stores/design-store';
import { CustomNodeData } from '@/types';

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

export function CanvasNodeComponent({
	data: { nodeType, formData },
}: Partial<NodeProps<CustomNodeData>> & { data: CustomNodeData }) {
	const setConfiguredNode = useSetConfiguredNode();

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
			</div>
		</div>
	);
}
