import { useEffect, useState } from 'react';

export function useIsClientSide() {
	const [isClientSide, setIsClientSide] = useState(false);

	useEffect(() => {
		setIsClientSide(true);
	}, []);

	return isClientSide;
}
