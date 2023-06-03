export const REM = 16;

export const NAV_BAR_HEIGHT_PIXELS = 56;
export const DEFAULT_FLOW_HEIGHT = 1024;

export const RAIL_WIDTH_PIXELS = 160;

export const ONE_SECOND_IN_MILLISECONDS = 1000;

export enum MenuItemType {
	Frontend = 'Frontend',
	Backend = 'Backend',
	Database = 'Database',
	Cloud = 'Cloud',
	Marketing = 'Marketing',
	API = 'API',
}

export enum ServiceNodeType {
	NestJs = 'NestJS',
	NextJs = 'NextJS',
	MongoDB = 'MongoDB',
	Firestore = 'Firestore',
	Cassandra = 'Cassandra',
	DynamoDB = 'DynamoDB',
	Redis = 'Redis',
	Hbase = 'Hbase',
	CosmosDB = 'CosmosDB',
	MySQL = 'MySQL',
	PostgresSQL = 'Postgres',
	MicrosoftSQL = 'SQL Server',
	MariaDB = 'MariaDB',
	Firebird = 'Firebird',
	SQLite = 'SQLite',
	Oracle = 'Oracle',
	ExpressJs = 'Express.js',
	KoaJs = 'Koa.js',
	HapiJs = 'Hapi.js',
	Fastify = 'Fastify',
	Litestar = 'Litestar',
	Django = 'Django',
	Flask = 'Flask',
	FastAPI = 'FastAPI',
	Angular = 'Angular',
	React = 'React',
	Solid = 'Solid',
	Svelte = 'Svelte',
	Vue = 'Vue',
	Android = 'Android',
	IOS = 'IOS',
	Flutter = 'Flutter',
	ReactNative = 'ReactNative',
}

export enum ContainerNodeType {
	Module = 'Module',
}

export enum InternalNodeType {
	Controller = 'Controller',
	Endpoint = 'Endpoint',
	Service = 'Service',
}

export const TypeTagMap: Record<
	ServiceNodeType | InternalNodeType | ContainerNodeType,
	string
> = {
	[ServiceNodeType.NextJs]: 'nextjs',
	[ServiceNodeType.Angular]: 'angular',
	[ServiceNodeType.React]: 'react',
	[ServiceNodeType.Solid]: 'solid',
	[ServiceNodeType.Svelte]: 'svelte',
	[ServiceNodeType.Vue]: 'vue',
	// mobile frameworks
	[ServiceNodeType.ReactNative]: 'react-native',
	[ServiceNodeType.Flutter]: 'flutter',
	[ServiceNodeType.IOS]: 'ios',
	[ServiceNodeType.Android]: 'android',
	// db-nosql
	[ServiceNodeType.MongoDB]: 'mongo',
	[ServiceNodeType.Firestore]: 'firestore',
	[ServiceNodeType.Cassandra]: 'cassandra',
	[ServiceNodeType.DynamoDB]: 'dynamo',
	[ServiceNodeType.Redis]: 'redis',
	[ServiceNodeType.Hbase]: 'hbase',
	[ServiceNodeType.CosmosDB]: 'cosmos',
	// db-sql
	[ServiceNodeType.MySQL]: 'mysql',
	[ServiceNodeType.PostgresSQL]: 'postgres',
	[ServiceNodeType.MicrosoftSQL]: 'sqlserver',
	[ServiceNodeType.MariaDB]: 'mariadb',
	[ServiceNodeType.Firebird]: 'firebird',
	[ServiceNodeType.SQLite]: 'sqlite',
	[ServiceNodeType.Oracle]: 'oracle',
	// server js
	[ServiceNodeType.NestJs]: 'nest',
	[ServiceNodeType.ExpressJs]: 'express',
	[ServiceNodeType.KoaJs]: 'koa',
	[ServiceNodeType.HapiJs]: 'hapi',
	[ServiceNodeType.Fastify]: 'fastify',
	// server Python
	[ServiceNodeType.Litestar]: 'litestar',
	[ServiceNodeType.Django]: 'django',
	[ServiceNodeType.Flask]: 'flask',
	[ServiceNodeType.FastAPI]: 'fastapi',
	// internal
	[InternalNodeType.Controller]: 'controller',
	[InternalNodeType.Service]: 'service',
	[InternalNodeType.Endpoint]: 'endpoint',
	// container
	[ContainerNodeType.Module]: 'module',
};

export const ServiceNodeAllowedInternalNodesMap: Record<
	string,
	(InternalNodeType | ContainerNodeType)[] | undefined
> = {
	[ServiceNodeType.NestJs]: [
		ContainerNodeType.Module,
		InternalNodeType.Controller,
		InternalNodeType.Service,
		InternalNodeType.Endpoint,
	],
};
export const AI_SERVICE_BASE_URL = process.env.NEXT_PUBLIC_AI_SERVICE_HOST;
export enum EdgeTypes {
	BezierEdge = 'default',
	StraightEdge = 'straight',
	StepEdge = 'step',
	SmoothStepEdg = 'smoothstep',
	SimpleBezier = 'simplebezier',
}
