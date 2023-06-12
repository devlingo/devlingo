import { faker } from '@faker-js/faker';
import { Design, DesignVersion, Project } from '@prisma/client';
import { TypeFactory } from 'interface-forge';

export const ProjectFactory = new TypeFactory<Project>(() => ({
	id: faker.string.uuid(),
	name: faker.company.name(),
	description: null,
	createdAt: new Date(),
	updatedAt: new Date(),
}));

export const DesignFactory = new TypeFactory<Design>((i) => ({
	id: faker.string.uuid(),
	name: `design-${i}`,
	description: null,
	projectId: faker.string.uuid(),
	createdAt: new Date(),
	updatedAt: new Date(),
}));

export const DesignVersionFactory = new TypeFactory<DesignVersion>(() => ({
	id: faker.string.uuid(),
	designId: faker.string.uuid(),
	data: '{}',
	createdAt: new Date(),
}));
