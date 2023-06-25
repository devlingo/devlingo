import { EventHandler, SyntheticEvent } from 'react';

export function handleChange<T = any>(
	cb: (value: any) => void,
): EventHandler<SyntheticEvent<T>> {
	return (event: SyntheticEvent<T> & { target: { value: any } }) => {
		event.preventDefault();
		cb(event.target.value);
	};
}
