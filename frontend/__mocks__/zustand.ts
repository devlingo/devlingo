import { act } from 'react-dom/test-utils';
import { create as actualCreate, StateCreator } from 'zustand';

const storeResetFns = new Set<() => void>();

const create =
	() =>
	<S>(createState: StateCreator<S>) => {
		const store = actualCreate(createState);
		const initialState = store.getState();
		storeResetFns.add(() => store.setState(initialState, true));
		return store;
	};

beforeEach(() => {
	act(() => storeResetFns.forEach((resetFn) => resetFn()));
});

export * from 'zustand';
export { create };
