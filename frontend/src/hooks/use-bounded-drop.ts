import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { ServiceType } from 'shared/constants';

import { DropTargetData } from '@/types';

export function useBoundedDrop(): [
	DropTargetData | null,
	(element: HTMLDivElement) => void,
] {
	const ref = useRef<HTMLDivElement>();
	// noinspection JSUnusedGlobalSymbols
	const [dropData, dropRef] = useDrop<any, any, DropTargetData | null>(
		() => ({
			accept: 'MenuItem',
			collect: (monitor) => monitor.getDropResult<DropTargetData>(),
			drop: (item: { type: ServiceType }, monitor) => {
				const offset = monitor.getSourceClientOffset();

				if (offset && ref.current) {
					const { left, top } = ref.current.getBoundingClientRect();
					return {
						...item,

						x: offset.x - left,
						y: offset.y - top,
					};
				}
				return null;
			},
		}),
	);

	return [
		dropData,
		(element: HTMLDivElement) => {
			ref.current = element;
			dropRef(element);
		},
	];
}
