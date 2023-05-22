/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Controller from '@/assets/internal-nodes/controller.svg';
import Endpoint from '@/assets/internal-nodes/endpoint.svg';
import Service from '@/assets/internal-nodes/service.svg';
import ExpressJS from '@/assets/services-nodes/backend-frameworks/js/expressjs.svg';
import Fastify from '@/assets/services-nodes/backend-frameworks/js/fastifyjs.svg';
import HapiJS from '@/assets/services-nodes/backend-frameworks/js/hapijs.svg';
import KoaJS from '@/assets/services-nodes/backend-frameworks/js/koajs.svg';
import NestJS from '@/assets/services-nodes/backend-frameworks/js/nestjs.svg';
import Django from '@/assets/services-nodes/backend-frameworks/python/django.svg';
import FastAPI from '@/assets/services-nodes/backend-frameworks/python/fastapi.svg';
import Flask from '@/assets/services-nodes/backend-frameworks/python/flask.svg';
import Litestar from '@/assets/services-nodes/backend-frameworks/python/litestar.svg';
import Cassandra from '@/assets/services-nodes/databases/no-sql/cassandra.svg';
import CosmosDB from '@/assets/services-nodes/databases/no-sql/cosmosdb.svg';
import DynamoDB from '@/assets/services-nodes/databases/no-sql/dynamodb.svg';
import Firestore from '@/assets/services-nodes/databases/no-sql/firestore.svg';
import Hbase from '@/assets/services-nodes/databases/no-sql/hbase.svg';
import MongoDB from '@/assets/services-nodes/databases/no-sql/mongodb.svg';
import Redis from '@/assets/services-nodes/databases/no-sql/redis.svg';
import Firebird from '@/assets/services-nodes/databases/sql/firebird.svg';
import MariaDB from '@/assets/services-nodes/databases/sql/mariadb.svg';
import MySQL from '@/assets/services-nodes/databases/sql/mysql.svg';
import Oracle from '@/assets/services-nodes/databases/sql/oracle.svg';
import PostgresSQL from '@/assets/services-nodes/databases/sql/postgresql.svg';
import MicrosoftSQL from '@/assets/services-nodes/databases/sql/sql-server.svg';
import SQLite from '@/assets/services-nodes/databases/sql/sqlite.svg';
import NextJS from '@/assets/services-nodes/frontend-frameworks/js/nextjs.svg';
import { InternalNodeType, ServiceNodeType } from '@/constants';

export {
	Cassandra,
	Controller,
	CosmosDB,
	Django,
	DynamoDB,
	Endpoint,
	FastAPI,
	Firebird,
	Firestore,
	Flask,
	Hbase,
	Litestar,
	MariaDB,
	MicrosoftSQL,
	MongoDB,
	MySQL,
	NestJS,
	NextJS,
	Oracle,
	PostgresSQL,
	Redis,
	Service,
	SQLite,
};

export const TypeSVGMap: Record<
	ServiceNodeType | InternalNodeType,
	{
		SVG: React.ComponentType<React.SVGProps<SVGElement>>;
		props?: Partial<React.SVGProps<SVGElement>>;
	}
> = {
	[ServiceNodeType.NextJs]: { SVG: NextJS },
	// db-nosql
	[ServiceNodeType.MongoDB]: { SVG: MongoDB },
	[ServiceNodeType.Firestore]: { SVG: Firestore },
	[ServiceNodeType.Cassandra]: { SVG: Cassandra },
	[ServiceNodeType.DynamoDB]: { SVG: DynamoDB },
	[ServiceNodeType.Redis]: { SVG: Redis },
	[ServiceNodeType.Hbase]: { SVG: Hbase },
	[ServiceNodeType.CosmosDB]: { SVG: CosmosDB },
	// db-sql
	[ServiceNodeType.MySQL]: { SVG: MySQL },
	[ServiceNodeType.PostgresSQL]: { SVG: PostgresSQL },
	[ServiceNodeType.MicrosoftSQL]: { SVG: MicrosoftSQL },
	[ServiceNodeType.MariaDB]: { SVG: MariaDB },
	[ServiceNodeType.Firebird]: { SVG: Firebird },
	[ServiceNodeType.SQLite]: { SVG: SQLite },
	[ServiceNodeType.Oracle]: { SVG: Oracle },
	// server js
	[ServiceNodeType.NestJs]: { SVG: NestJS },
	[ServiceNodeType.ExpressJs]: { SVG: ExpressJS },
	[ServiceNodeType.KoaJs]: { SVG: KoaJS },
	[ServiceNodeType.HapiJs]: { SVG: HapiJS },
	[ServiceNodeType.Fastify]: { SVG: Fastify },
	// server Python
	[ServiceNodeType.Litestar]: {
		SVG: Litestar,
		props: { className: 'h-12 w-12 p-0' },
	},
	[ServiceNodeType.Django]: { SVG: Django },
	[ServiceNodeType.Flask]: { SVG: Flask },
	[ServiceNodeType.FastAPI]: { SVG: FastAPI },
	// internal
	[InternalNodeType.Controller]: { SVG: Controller },
	[InternalNodeType.Endpoint]: { SVG: Endpoint },
	[InternalNodeType.Service]: { SVG: Service },
};
