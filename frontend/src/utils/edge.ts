import { Position } from 'reactflow';

export function positionHandle(id: string, edgeSource: string) {
	const position = edgeSource.includes(Position.Top)
		? Position.Top
		: edgeSource.includes(Position.Bottom)
		? Position.Bottom
		: edgeSource.includes(Position.Left)
		? Position.Left
		: Position.Right;
	return `${id}-source-${position}`;
}
