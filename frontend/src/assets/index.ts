/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Controller from '@/assets/internal-nodes/controller.svg';
import Endpoint from '@/assets/internal-nodes/endpoint.svg';
import Module from '@/assets/internal-nodes/module.svg';
import Service from '@/assets/internal-nodes/service.svg';
import API from '@/assets/menu-icons/api.svg';
import Backend from '@/assets/menu-icons/backend.svg';
import Cloud from '@/assets/menu-icons/cloud.svg';
import Database from '@/assets/menu-icons/database.svg';
import Frontend from '@/assets/menu-icons/frontend.svg';
import Marketing from '@/assets/menu-icons/marketing.svg';
import OpenAi from '@/assets/services-nodes/api-services/ai/openai.svg';
import MailGun from '@/assets/services-nodes/api-services/marketing/mailgun.svg';
import SendGrid from '@/assets/services-nodes/api-services/marketing/sendgrid.svg';
import Stripe from '@/assets/services-nodes/api-services/payment/stripe.svg';
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
import Angular from '@/assets/services-nodes/frontend-frameworks/js/angular.svg';
import NextJS from '@/assets/services-nodes/frontend-frameworks/js/nextjs.svg';
import ReactLogo from '@/assets/services-nodes/frontend-frameworks/js/react.svg';
import Solid from '@/assets/services-nodes/frontend-frameworks/js/solid.svg';
import Svelte from '@/assets/services-nodes/frontend-frameworks/js/svelte.svg';
import Vue from '@/assets/services-nodes/frontend-frameworks/js/vue.svg';
import Android from '@/assets/services-nodes/mobile-frameworks/android.svg';
import Flutter from '@/assets/services-nodes/mobile-frameworks/flutter.svg';
import Ios from '@/assets/services-nodes/mobile-frameworks/ios.svg';
import ReactNative from '@/assets/services-nodes/mobile-frameworks/reactnative.svg';
import {
	ContainerNodeType,
	InternalNodeType,
	MenuItemType,
	ServiceNodeType,
} from '@/constants';

export {
	Android,
	Angular,
	API,
	Backend,
	Cassandra,
	Cloud,
	Controller,
	CosmosDB,
	Database,
	Django,
	DynamoDB,
	Endpoint,
	FastAPI,
	Firebird,
	Firestore,
	Flask,
	Flutter,
	Frontend,
	Hbase,
	Ios,
	Litestar,
	MailGun,
	MariaDB,
	Marketing,
	MicrosoftSQL,
	Module,
	MongoDB,
	MySQL,
	NestJS,
	NextJS,
	OpenAi,
	Oracle,
	PostgresSQL,
	ReactLogo,
	ReactNative,
	Redis,
	SendGrid,
	Service,
	Solid,
	SQLite,
	Stripe,
	Svelte,
	Vue,
};

const defaultClassName = 'text-base-content h-12 w-12';

export const TypeSVGMap: Record<
	MenuItemType | ServiceNodeType | InternalNodeType | ContainerNodeType,
	{
		SVG: React.ComponentType<React.SVGProps<SVGElement>>;
		props?: Partial<React.SVGProps<SVGElement>>;
	}
> = {
	//menu items
	[MenuItemType.Frontend]: { SVG: Frontend },
	[MenuItemType.Backend]: { SVG: Backend },
	[MenuItemType.Database]: { SVG: Database },
	[MenuItemType.Cloud]: { SVG: Cloud },
	[MenuItemType.Marketing]: { SVG: Marketing },
	[MenuItemType.API]: { SVG: API },

	//front js
	[ServiceNodeType.NextJs]: {
		SVG: NextJS,
		props: { className: defaultClassName },
	},
	[ServiceNodeType.Angular]: { SVG: Angular },
	[ServiceNodeType.React]: { SVG: ReactLogo },
	[ServiceNodeType.Solid]: { SVG: Solid },
	[ServiceNodeType.Svelte]: { SVG: Svelte },
	[ServiceNodeType.Vue]: { SVG: Vue },
	//front mobile
	[ServiceNodeType.ReactNative]: { SVG: ReactNative },
	[ServiceNodeType.Flutter]: { SVG: Flutter },
	[ServiceNodeType.IOS]: { SVG: Ios },
	[ServiceNodeType.Android]: { SVG: Android },
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
	[ServiceNodeType.ExpressJs]: {
		SVG: ExpressJS,
		props: { className: defaultClassName },
	},
	[ServiceNodeType.KoaJs]: { SVG: KoaJS },
	[ServiceNodeType.HapiJs]: { SVG: HapiJS },
	[ServiceNodeType.Fastify]: { SVG: Fastify },
	// server Python
	[ServiceNodeType.Litestar]: {
		SVG: Litestar,
		props: { className: 'h-12 w-12 p-0' },
	},
	[ServiceNodeType.Django]: { SVG: Django },
	[ServiceNodeType.Flask]: {
		SVG: Flask,
		props: { className: defaultClassName },
	},
	[ServiceNodeType.FastAPI]: { SVG: FastAPI },
	// api services
	[ServiceNodeType.Stripe]: { SVG: Stripe },
	[ServiceNodeType.OpenAi]: { SVG: OpenAi },
	[ServiceNodeType.MailGun]: { SVG: MailGun },
	[ServiceNodeType.SendGrid]: { SVG: SendGrid },

	// internal nodes
	[InternalNodeType.Controller]: { SVG: Controller },
	[InternalNodeType.Endpoint]: { SVG: Endpoint },
	[InternalNodeType.Service]: { SVG: Service },
	[ContainerNodeType.Module]: { SVG: Module },
};
