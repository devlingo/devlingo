import {
	BezierEdge,
	EdgeProps,
	SimpleBezierEdge,
	SmoothStepEdge,
	StepEdge,
	StraightEdge,
} from 'reactflow';
import { EdgeType } from 'shared/constants';
import { CustomEdgeData } from 'shared/types';

import { ContextMenuType } from '@/constants/context-menu.constants';
import { useContextMenu } from '@/hooks/use-context-menu';

const edgeTypeToEdgeComponentMap: Record<EdgeType, React.FC<EdgeProps>> = {
	[EdgeType.StraightEdge]: StraightEdge,
	[EdgeType.BezierEdge]: BezierEdge,
	[EdgeType.StepEdge]: StepEdge,
	[EdgeType.SmoothStepEdg]: SmoothStepEdge,
	[EdgeType.SimpleBezier]: SimpleBezierEdge,
};

export function CustomEdge({
	data: { edgeType } = { edgeType: EdgeType.BezierEdge },
	id: edgeId,
	...props
}: EdgeProps<CustomEdgeData>) {
	const EdgeComponent = edgeTypeToEdgeComponentMap[edgeType];
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
