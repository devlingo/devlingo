import {
	BezierEdge,
	EdgeProps,
	SimpleBezierEdge,
	SmoothStepEdge,
	StepEdge,
	StraightEdge,
} from 'reactflow';
import { EdgeType } from 'shared/constants';

export const EdgeTypeToEdgeComponentMap: Record<
	EdgeType,
	React.FC<EdgeProps>
> = {
	[EdgeType.Straight]: StraightEdge,
	[EdgeType.Bezier]: BezierEdge,
	[EdgeType.SimpleBezier]: SimpleBezierEdge,
	[EdgeType.Step]: StepEdge,
	[EdgeType.SmoothStep]: SmoothStepEdge,
};
