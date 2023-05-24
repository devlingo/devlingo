export const REM = 16;

export const NAV_BAR_HEIGHT_PIXELS = 56;
export const FOOTER_HEIGHT_PIXELS = 40;
export const DEFAULT_FLOW_HEIGHT = 1024;

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
	PostgresSQL = 'PostgresSQL',
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
}

export enum InternalNodeType {
	Controller = 'Controller',
	Endpoint = 'Endpoint',
	Module = 'Module',
	Service = 'Service',
}

export const TypeTagMap: Record<ServiceNodeType | InternalNodeType, string> = {
	[ServiceNodeType.NextJs]: 'nextjs',
	//db-nosql
	[ServiceNodeType.MongoDB]: 'mongo',
	[ServiceNodeType.Firestore]: 'firestore',
	[ServiceNodeType.Cassandra]: 'cassandra',
	[ServiceNodeType.DynamoDB]: 'dynamo',
	[ServiceNodeType.Redis]: 'redis',
	[ServiceNodeType.Hbase]: 'hbase',
	[ServiceNodeType.CosmosDB]: 'cosmos',
	//db-sql
	[ServiceNodeType.MySQL]: 'mysql',
	[ServiceNodeType.PostgresSQL]: 'postgres',
	[ServiceNodeType.MicrosoftSQL]: 'sqlserver',
	[ServiceNodeType.MariaDB]: 'mariadb',
	[ServiceNodeType.Firebird]: 'firebird',
	[ServiceNodeType.SQLite]: 'sqlite',
	[ServiceNodeType.Oracle]: 'oracle',
	//server js
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
	[InternalNodeType.Module]: 'module',
};

export const ServiceNodeAllowedInternalNodesMap: Record<
	ServiceNodeType,
	InternalNodeType[] | null
> = {
	[ServiceNodeType.NextJs]: null,
	//db-nosql
	[ServiceNodeType.MongoDB]: null,
	[ServiceNodeType.Firestore]: null,
	[ServiceNodeType.Cassandra]: null,
	[ServiceNodeType.DynamoDB]: null,
	[ServiceNodeType.Redis]: null,
	[ServiceNodeType.Hbase]: null,
	[ServiceNodeType.CosmosDB]: null,
	//db-sql
	[ServiceNodeType.MySQL]: null,
	[ServiceNodeType.PostgresSQL]: null,
	[ServiceNodeType.MicrosoftSQL]: null,
	[ServiceNodeType.MariaDB]: null,
	[ServiceNodeType.Firebird]: null,
	[ServiceNodeType.SQLite]: null,
	[ServiceNodeType.Oracle]: null,
	//server js
	[ServiceNodeType.NestJs]: [
		InternalNodeType.Module,
		InternalNodeType.Controller,
		InternalNodeType.Service,
		InternalNodeType.Endpoint,
	],
	[ServiceNodeType.ExpressJs]: null,
	[ServiceNodeType.KoaJs]: null,
	[ServiceNodeType.HapiJs]: null,
	[ServiceNodeType.Fastify]: null,
	// server Python
	[ServiceNodeType.Litestar]: null,
	[ServiceNodeType.Django]: null,
	[ServiceNodeType.Flask]: null,
	[ServiceNodeType.FastAPI]: null,
};
