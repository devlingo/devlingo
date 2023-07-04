import { DesignFactory, ProjectFactory, UserFactory } from 'shared/testing';
import { DesignResponseData, ProjectResponseData } from 'shared/types';
import { beforeEach } from 'vitest';

import { apiStoreStateCreator } from '@/stores/api-store';
import { sortByDateProp } from '@/utils/time';

describe('apiStoreStateCreator tests', () => {
	const set = vi.fn();
	const get = vi.fn();

	beforeEach(() => {
		vi.resetAllMocks();
	});

	it('sets user', async () => {
		const store = apiStoreStateCreator(set, get, {} as any);
		const user = await UserFactory.build();
		store.setUser(user);
		expect(set).toHaveBeenCalledWith({ user });
	});

	it('sets projects', async () => {
		const store = apiStoreStateCreator(set, get, {} as any);
		const projects = await ProjectFactory.batch(3);
		store.setProjects(projects as ProjectResponseData[]);
		expect(set).toHaveBeenCalledWith({
			projects: sortByDateProp(projects)('createdAt', 'desc'),
		});
	});

	it('sets currentDesign', async () => {
		const store = apiStoreStateCreator(set, get, {} as any);
		const currentDesign = await DesignFactory.build();
		store.setCurrentDesign(currentDesign as DesignResponseData);
		expect(set).toHaveBeenCalledWith({ currentDesign });
	});
});
