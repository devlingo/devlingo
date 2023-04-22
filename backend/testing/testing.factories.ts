import { faker } from '@faker-js/faker';
import { ConfigSchema, Project } from '@prisma/client';
import { TypeFactory } from 'interface-forge';

export const ProjectFactory = new TypeFactory<Project>(() => ({
	id: faker.datatype.uuid(),
	createdAt: new Date(),
	updatedAt: new Date(),
}));

export const ConfigSchemaFactory = new TypeFactory<ConfigSchema>((i) => ({
	id: faker.datatype.uuid(),
	version: i + 1,
	projectId: faker.datatype.uuid(),
	schema: '{}',
	createdAt: new Date(),
	updatedAt: new Date(),
	deletedAt: null,
}));
