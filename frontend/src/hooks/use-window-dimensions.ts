import { useEffect, useState } from 'react';

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
