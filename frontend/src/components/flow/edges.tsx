import { ConnectionLineComponentProps } from '@reactflow/core';
import {
	BaseEdge,
	EdgeLabelRenderer,
	EdgeProps,
	getBezierPath,
} from 'reactflow';

const onEdgeClick = (
	event: React.MouseEvent<HTMLButtonElement>,
	id: string,
) => {
	event.stopPropagation();
	alert(`clicked ${id}`);
};

export function HttpRestEdge({
	id,
	sourceX,
	sourceY,
	targetX,
	targetY,
	sourcePosition,
	targetPosition,
	style = {},
	markerEnd,
}: EdgeProps) {
	const [edgePath, labelX, labelY] = getBezierPath({
		sourceX,
		sourceY,
		sourcePosition,
		targetX,
		targetY,
		targetPosition,
	});

	return (
		<>
			<BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
			<EdgeLabelRenderer>
				<div
					style={{
						transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
						fontSize: 12,
						pointerEvents: 'all',
					}}
					className="nodrag nopan absolute"
				>
					<button
						className="w-fit h-10 p-2 bg-accent text-accent-content cursor-pointer border rounded hover:shadow hover:bg-base-content hover:text-accent-content"
						onClick={(event) => onEdgeClick(event, id)}
					>
						HTTP GET
					</button>
				</div>
			</EdgeLabelRenderer>
		</>
	);
}

export function ConnectionLine({
	fromX,
	fromY,
	toX,
	toY,
}: ConnectionLineComponentProps) {
	return (
		<g>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={1.5}
				className="animated"
				d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
			/>
			<circle
				cx={toX}
				cy={toY}
				fill="currentColor"
				r={3}
				stroke="currentColor"
				strokeWidth={1.5}
			/>
		</g>
	);
}
