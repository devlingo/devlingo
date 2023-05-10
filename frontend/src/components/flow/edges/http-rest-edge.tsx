import React from 'react';
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
