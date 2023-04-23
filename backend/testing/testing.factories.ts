import { faker } from '@faker-js/faker';
import { ConfigurationOption, Project } from '@prisma/client';
import { TypeFactory } from 'interface-forge';

export const ProjectFactory = new TypeFactory<Project>(() => ({
	id: faker.datatype.uuid(),
	name: faker.company.name(),
	createdAt: new Date(),
	updatedAt: new Date(),
}));

export const ConfigurationOptionFactory = new TypeFactory<ConfigurationOption>(
	(i) => ({
		id: faker.datatype.uuid(),
		key: `key${i}`,
		description: faker.lorem.sentence(),
		isEnabled: true,
		projectId: faker.datatype.uuid(),
		schema: '{}',
		createdAt: new Date(),
		updatedAt: new Date(),
	}),
);
