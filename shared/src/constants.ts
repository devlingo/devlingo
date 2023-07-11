export enum ApiVersions {
	V1 = '1',
}

export enum TimeUnit {
	OneHourInSeconds = 3600,
	OneSecondInMilliseconds = 1000,
}

export enum Environment {
	Development = 'development',
	Production = 'production',
	Test = 'test',
}

export enum HttpMethod {
	Get = 'GET',
	Post = 'POST',
	Patch = 'PATCH',
	Put = 'PUT',
	Delete = 'DELETE',
}

export enum ServiceType {
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

export enum SystemComponentType {
	Module = 'Module',
	Controller = 'Controller',
	Endpoint = 'Endpoint',
	Service = 'Service',
}

export enum EdgeType {
	BezierEdge = 'default',
	StraightEdge = 'straight',
	StepEdge = 'step',
	SmoothStepEdg = 'smoothstep',
	SimpleBezier = 'simplebezier',
}

export enum NodeShape {
	ArrowRight = 'arrowRight',
	ArrowLeft = 'arrowLeft',
	Circle = 'circle',
	Database = 'database',
	Diamond = 'diamond',
	Ellipse = 'ellipse',
	Hexagon = 'hexagon',
	ParallelogramRight = 'parallelogramRight',
	ParallelogramLeft = 'parallelogramLeft',
	Rectangle = 'rectangle',
	RoundedRectangle = 'roundedRectangle',
	Triangle = 'triangle',
}
