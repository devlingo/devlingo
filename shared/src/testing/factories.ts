import { faker } from '@faker-js/faker';
import { Design, Project, User, Version } from '@prisma/client';
import { TypeFactory } from 'interface-forge';
import { CustomEdgeType, CustomNodeType } from 'shared/types';
import { EdgeType, ServiceType } from 'shared/constants';

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

export const VersionFactory = new TypeFactory<Version>(() => ({
	id: faker.string.uuid(),
	designId: faker.string.uuid(),
	data: {
		nodes: TypeFactory.use(async (i) => NodeFactory.batch(i + 1)),
		edges: TypeFactory.use(async (i) => EdgeFactory.batch(i + 1)),
		viewport: { x: 0, y: 0, zoom: 1 },
	},
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

export const NodeFactory = new TypeFactory<CustomNodeType>(() => ({
	id: faker.string.uuid(),
	position: {
		x: faker.number.int({ min: 0, max: 1000 }),
		y: faker.number.int({ min: 0, max: 1000 }),
	},
	data: {
		formData: {
			nodeName: TypeFactory.iterate(
				Object.values(ServiceType).map((v) => v + ' Service'),
			),
		},
		nodeType: TypeFactory.iterate(Object.values(ServiceType)),
	},
}));

export const EdgeFactory = new TypeFactory<CustomEdgeType>(() => {
	const source = faker.string.uuid();
	const target = faker.string.uuid();
	return {
		id: faker.string.uuid(),
		type: TypeFactory.iterate(Object.values(EdgeType)),
		data: { edgeType: EdgeType.SmoothStep },
		source,
		target,
	};
});
