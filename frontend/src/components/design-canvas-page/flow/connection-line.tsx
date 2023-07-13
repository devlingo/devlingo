import { ConnectionLineComponentProps } from '@reactflow/core';

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
