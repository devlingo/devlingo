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
	MailGun = 'Mailgun',
	OpenAi = 'OpenAI',
	SendGrid = 'Sendgrid',
	Stripe = 'Stripe',
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
	// api services
	[ServiceNodeType.OpenAi]: 'openai',
	[ServiceNodeType.SendGrid]: 'sendgrid',
	[ServiceNodeType.Stripe]: 'stripe',
	[ServiceNodeType.MailGun]: 'mailgun',

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
export enum EdgeTypes {
	BezierEdge = 'default',
	StraightEdge = 'straight',
	StepEdge = 'step',
	SmoothStepEdg = 'smoothstep',
	SimpleBezier = 'simplebezier',
}

export enum NodeCategory {
	DotNet = '.Net',
	Go = 'Go',
	Graph = 'Graph',
	Java = 'Java',
	Javascript = 'Javascript',
	Mobile = 'Mobile',
	NoSQL = 'NoSQL',
	Python = 'Python',
	SQL = 'SQL',
	Vector = 'Vector',
	Warehouse = 'Warehouse',
	Marketing = 'Marketing',
	AI = 'AI',
	Payment = 'Payment',
}
