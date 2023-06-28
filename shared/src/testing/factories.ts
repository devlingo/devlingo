import { faker } from '@faker-js/faker';
import { Design, DesignVersion, Project, User } from '@prisma/client';
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
	isDefault: false,
	projectId: faker.string.uuid(),
	createdAt: new Date(),
	updatedAt: new Date(),
}));

export const VersionFactory = new TypeFactory<DesignVersion>(() => ({
	id: faker.string.uuid(),
	designId: faker.string.uuid(),
	data: {},
	createdAt: new Date(),
}));

export const UserFactory = new TypeFactory<User>(() => ({
	id: faker.string.uuid(),
	firebaseId: faker.string.uuid(),
	name: faker.person.fullName(),
	email: faker.internet.email(),
	avatarUrl: faker.internet.url(),
	createdAt: new Date(),
	updatedAt: new Date(),
}));
