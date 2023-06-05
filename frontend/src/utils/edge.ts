import { Position } from 'reactflow';

import { log } from '@/utils/logging';

export function positionHandle(id: string, edgeSource?: string | null): string {
	if (Object.values(Position).includes(edgeSource as unknown as Position)) {
		return `${id}-source-${edgeSource}`;
	}
	if (
		Object.values(Position).some(
			(pos) => `${id}-source-${pos}` === edgeSource,
		)
	) {
		return edgeSource as unknown as string;
	}
	log('edgeSource is not defined');
	throw new Error(`unexpected edgeSource value ${edgeSource}`);
}
