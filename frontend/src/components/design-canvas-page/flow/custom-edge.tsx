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

const edgeTypeToEdgeComponentMap: Record<EdgeType, React.FC<EdgeProps>> = {
	[EdgeType.StraightEdge]: StraightEdge,
	[EdgeType.BezierEdge]: BezierEdge,
	[EdgeType.StepEdge]: StepEdge,
	[EdgeType.SmoothStepEdg]: SmoothStepEdge,
	[EdgeType.SimpleBezier]: SimpleBezierEdge,
};

export function CustomEdge({
	data: { edgeType } = { edgeType: EdgeType.BezierEdge },
	...props
}: EdgeProps<CustomEdgeData>) {
	console.log(props);
	const EdgeComponent = edgeTypeToEdgeComponentMap[edgeType];
	// const onContextMenu = useContextMenu(ContextMenuType.CustomEdge, nodeId);

	return <EdgeComponent {...props} />;
}
