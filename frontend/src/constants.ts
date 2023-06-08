export const DEFAULT_FLOW_HEIGHT = 1024;

export const ONE_SECOND_IN_MILLISECONDS = 1000;

export enum Dimensions {
	// standard values
	OnePixel = 1,
	HalfPixel = 0.5,
	Rem = 16,
	// tailwind values
	Zero = 0, // 0rem
	Quarter = 1, // 0.0625rem
	Half = 2, // 0.125rem
	One = 4, // 0.25rem
	OneAndHalf = 6, // 0.375rem
	Two = 8, // 0.5rem
	TwoAndHalf = 10, // 0.625rem
	Three = 12, // 0.75rem
	ThreeAndHalf = 14, // 0.875rem
	Four = 16, // 1rem
	Five = 20, // 1.25rem
	Six = 24, // 1.5rem
	Seven = 28, // 1.75rem
	Eight = 32, // 2rem
	Nine = 36, // 2.25rem
	Ten = 40, // 2.5rem
	Eleven = 44, // 2.75rem
	Twelve = 48, // 3rem
	Fourteen = 56, // 3.5rem
	Sixteen = 64, // 4rem
	Twenty = 80, // 5rem
	TwentyFour = 96, // 6rem
	TwentyEight = 112, // 7rem
	ThirtyTwo = 128, // 8rem
	ThirtySix = 144, // 9rem
	Forty = 160, // 10rem
	FortyFour = 176, // 11rem
	FortyEight = 192, // 12rem
	FiftyTwo = 208, // 13rem
	FiftySix = 224, // 14rem
	Sixty = 240, // 15rem
	SixtyFour = 256, // 16rem
	SeventyTwo = 288, // 18rem
	Eighty = 320, // 20rem
	NinetySix = 384, // 24rem
}

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
export const AI_SERVICE_BASE_URL = process.env.NEXT_PUBLIC_AI_SERVICE_HOST;
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
