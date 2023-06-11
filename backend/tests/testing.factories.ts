import { faker } from '@faker-js/faker';
import { Design, Project } from '@prisma/client';
import { TypeFactory } from 'interface-forge';

export const ProjectFactory = new TypeFactory<Project>(() => ({
	id: faker.string.uuid(),
	name: faker.company.name(),
	createdAt: new Date(),
	updatedAt: new Date(),
}));

export const DesignFactory = new TypeFactory<Design>((i) => ({
	id: faker.string.uuid(),
	name: `design-${i}`,
	version: i + 1,
	projectId: faker.string.uuid(),
	data: '{}',
	createdAt: new Date(),
	updatedAt: new Date(),
}));
