import { useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';

import { ServiceNodeType } from '@/constants';
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
			drop: (item: { type: ServiceNodeType }, monitor) => {
				const offset = monitor.getSourceClientOffset();

				if (offset && ref.current) {
					const { left, top } = ref.current.getBoundingClientRect();
					return {
						...item,
						...{
							x: offset.x - left,
							y: offset.y - top,
						},
					};
				}
				return null;
			},
			collect: (monitor) => monitor.getDropResult<DropTargetData>(),
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

export function useWindowsDimensions(): [height: number, width: number] {
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	// NOTE: we have to useEffect because the initial render is server side.
	// useEffect is only called client side, where the "window" global is defined.
	useEffect(() => {
		const updateDimensions = () => {
			setWidth(window.innerWidth);
			setHeight(window.innerHeight);
		};

		window.addEventListener('resize', updateDimensions);
		updateDimensions();

		return () => window.removeEventListener('resize', updateDimensions);
	}, []);

	return [height, width];
}
