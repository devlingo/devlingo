import { ServiceType, SystemComponentType } from 'shared/constants';
import { NodeType } from 'shared/types';

export const TypeTagMap: Record<NodeType, string> = {
	[ServiceType.NextJs]: 'nextjs',
	[ServiceType.Angular]: 'angular',
	[ServiceType.React]: 'react',
	[ServiceType.Solid]: 'solid',
	[ServiceType.Svelte]: 'svelte',
	[ServiceType.Vue]: 'vue',
	// mobile frameworks
	[ServiceType.ReactNative]: 'react-native',
	[ServiceType.Flutter]: 'flutter',
	[ServiceType.IOS]: 'ios',
	[ServiceType.Android]: 'android',
	// db-nosql
	[ServiceType.MongoDB]: 'mongo',
	[ServiceType.Firestore]: 'firestore',
	[ServiceType.Cassandra]: 'cassandra',
	[ServiceType.DynamoDB]: 'dynamo',
	[ServiceType.Redis]: 'redis',
	[ServiceType.Hbase]: 'hbase',
	[ServiceType.CosmosDB]: 'cosmos',
	// db-sql
	[ServiceType.MySQL]: 'mysql',
	[ServiceType.PostgresSQL]: 'postgres',
	[ServiceType.MicrosoftSQL]: 'sqlserver',
	[ServiceType.MariaDB]: 'mariadb',
	[ServiceType.Firebird]: 'firebird',
	[ServiceType.SQLite]: 'sqlite',
	[ServiceType.Oracle]: 'oracle',
	// server js
	[ServiceType.NestJs]: 'nest',
	[ServiceType.ExpressJs]: 'express',
	[ServiceType.KoaJs]: 'koa',
	[ServiceType.HapiJs]: 'hapi',
	[ServiceType.Fastify]: 'fastify',
	// server Python
	[ServiceType.Litestar]: 'litestar',
	[ServiceType.Django]: 'django',
	[ServiceType.Flask]: 'flask',
	[ServiceType.FastAPI]: 'fastapi',
	// api services
	[ServiceType.OpenAi]: 'openai',
	[ServiceType.SendGrid]: 'sendgrid',
	[ServiceType.Stripe]: 'stripe',
	[ServiceType.MailGun]: 'mailgun',

	// system
	[SystemComponentType.Controller]: 'controller',
	[SystemComponentType.Service]: 'service',
	[SystemComponentType.Endpoint]: 'endpoint',
	[SystemComponentType.Module]: 'module',
};
