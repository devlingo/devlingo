import { EdgeProps } from 'reactflow';
import { EdgeType } from 'shared/constants';
import { CustomEdgeData } from 'shared/types';

import { EdgeTypeToEdgeComponentMap } from '@/components/design-canvas-page/constants';
import { ContextMenuType } from '@/constants/context-menu.constants';
import { useContextMenu } from '@/hooks/use-context-menu';

export function CustomEdge({
	data: { edgeType } = { edgeType: EdgeType.Bezier },
	id: edgeId,
	...props
}: EdgeProps<CustomEdgeData>) {
	const EdgeComponent = EdgeTypeToEdgeComponentMap[edgeType];
	const onContextMenu = useContextMenu(ContextMenuType.CustomEdge, edgeId);

	return (
		<g
			onContextMenu={onContextMenu}
			data-testid={`edge-container-${edgeId}`}
		>
			<EdgeComponent id={edgeId} {...props} />
		</g>
	);
}
