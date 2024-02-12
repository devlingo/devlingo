import { Edge, Node, Position } from '@reactflow/core';

enum RelativePosition {
	Above = 'above',
	Aligned = 'aligned',
	Below = 'below',
	Left = 'left',
	Right = 'right',
}

export function positionHandle({
	sourcePosition,
	targetPosition,
}: {
	sourcePosition: { x: number; y: number };
	targetPosition: { x: number; y: number };
}): { sourceHandle: Position; targetHandle: Position } {
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
			? { sourceHandle: Position.Bottom, targetHandle: Position.Top }
			: { sourceHandle: Position.Top, targetHandle: Position.Bottom };
	}

	if (
		targetRelativeVerticalPosition === RelativePosition.Aligned ||
		Math.abs(targetPosition.x - sourcePosition.x) >
			Math.abs(targetPosition.y - sourcePosition.y)
	) {
		return targetRelativeHorizontalPosition === RelativePosition.Right
			? { sourceHandle: Position.Right, targetHandle: Position.Left }
			: { sourceHandle: Position.Left, targetHandle: Position.Right };
	}

	return targetRelativeVerticalPosition === RelativePosition.Above
		? { sourceHandle: Position.Bottom, targetHandle: Position.Top }
		: { sourceHandle: Position.Top, targetHandle: Position.Bottom };
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
