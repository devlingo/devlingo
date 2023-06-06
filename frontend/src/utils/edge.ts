import { Edge, Node, Position } from '@reactflow/core';

enum RelativePosition {
	Above = 'above',
	Below = 'below',
	Aligned = 'aligned',
	Left = 'left',
	Right = 'right',
}

export function positionHandle({
	sourcePosition,
	targetPosition,
}: {
	sourcePosition: { x: number; y: number };
	targetPosition: { x: number; y: number };
}): { targetHandle: Position; sourceHandle: Position } {
	const targetRelativeHorizontalPosition =
		targetPosition.x === sourcePosition.x
			? RelativePosition.Aligned
			: targetPosition.x > sourcePosition.x
			? RelativePosition.Right
			: RelativePosition.Left;

	const targetRelativeVerticalPosition =
		targetPosition.y === sourcePosition.y
			? RelativePosition.Aligned
			: targetPosition.y > sourcePosition.y
			? RelativePosition.Above
			: RelativePosition.Below;

	if (targetRelativeHorizontalPosition === RelativePosition.Aligned) {
		return targetRelativeVerticalPosition === RelativePosition.Above
			? { targetHandle: Position.Top, sourceHandle: Position.Bottom }
			: { targetHandle: Position.Bottom, sourceHandle: Position.Top };
	}

	if (
		targetRelativeVerticalPosition === RelativePosition.Aligned ||
		Math.abs(targetPosition.x - sourcePosition.x) >
			Math.abs(targetPosition.y - sourcePosition.y)
	) {
		return targetRelativeHorizontalPosition === RelativePosition.Right
			? { targetHandle: Position.Left, sourceHandle: Position.Right }
			: { targetHandle: Position.Right, sourceHandle: Position.Left };
	}

	return targetRelativeVerticalPosition === RelativePosition.Above
		? { targetHandle: Position.Top, sourceHandle: Position.Bottom }
		: { targetHandle: Position.Bottom, sourceHandle: Position.Top };
}

export function NormalizeEdges(edges: Edge[], nodes: Node[]): Edge[] {
	return edges.map((edge) => {
		if (!edge.sourceHandle || !edge.targetHandle) {
			const sourceNode = nodes.find((n) => n.id === edge.source)!;
			const targetNode = nodes.find((n) => n.id === edge.target)!;

			return {
				...edge,
				...positionHandle({
					sourcePosition: sourceNode.position,
					targetPosition: targetNode.position,
				}),
			};
		}
		return edge;
	});
}
