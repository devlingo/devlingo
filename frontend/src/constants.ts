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

export const REM = 16;

export const NAV_BAR_HEIGHT_PIXELS = 56;
export const FOOTER_HEIGHT_PIXELS = 40;
