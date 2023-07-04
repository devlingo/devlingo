/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ServiceType, SystemComponentType } from 'shared/constants';
import { NodeType } from 'shared/types';

import API from '@/assets/menu-icons/api.svg';
import Backend from '@/assets/menu-icons/backend.svg';
import Cloud from '@/assets/menu-icons/cloud.svg';
import Database from '@/assets/menu-icons/database.svg';
import Frontend from '@/assets/menu-icons/frontend.svg';
import Marketing from '@/assets/menu-icons/marketing.svg';
import OpenAi from '@/assets/services-types/api-services/ai/openai.svg';
import MailGun from '@/assets/services-types/api-services/marketing/mailgun.svg';
import SendGrid from '@/assets/services-types/api-services/marketing/sendgrid.svg';
import Stripe from '@/assets/services-types/api-services/payment/stripe.svg';
import ExpressJS from '@/assets/services-types/backend-frameworks/js/expressjs.svg';
import Fastify from '@/assets/services-types/backend-frameworks/js/fastifyjs.svg';
import HapiJS from '@/assets/services-types/backend-frameworks/js/hapijs.svg';
import KoaJS from '@/assets/services-types/backend-frameworks/js/koajs.svg';
import NestJS from '@/assets/services-types/backend-frameworks/js/nestjs.svg';
import Django from '@/assets/services-types/backend-frameworks/python/django.svg';
import FastAPI from '@/assets/services-types/backend-frameworks/python/fastapi.svg';
import Flask from '@/assets/services-types/backend-frameworks/python/flask.svg';
import Litestar from '@/assets/services-types/backend-frameworks/python/litestar.svg';
import Cassandra from '@/assets/services-types/databases/no-sql/cassandra.svg';
import CosmosDB from '@/assets/services-types/databases/no-sql/cosmosdb.svg';
import DynamoDB from '@/assets/services-types/databases/no-sql/dynamodb.svg';
import Firestore from '@/assets/services-types/databases/no-sql/firestore.svg';
import Hbase from '@/assets/services-types/databases/no-sql/hbase.svg';
import MongoDB from '@/assets/services-types/databases/no-sql/mongodb.svg';
import Redis from '@/assets/services-types/databases/no-sql/redis.svg';
import Firebird from '@/assets/services-types/databases/sql/firebird.svg';
import MariaDB from '@/assets/services-types/databases/sql/mariadb.svg';
import MySQL from '@/assets/services-types/databases/sql/mysql.svg';
import Oracle from '@/assets/services-types/databases/sql/oracle.svg';
import PostgresSQL from '@/assets/services-types/databases/sql/postgresql.svg';
import MicrosoftSQL from '@/assets/services-types/databases/sql/sql-server.svg';
import SQLite from '@/assets/services-types/databases/sql/sqlite.svg';
import Angular from '@/assets/services-types/frontend-frameworks/js/angular.svg';
import NextJS from '@/assets/services-types/frontend-frameworks/js/nextjs.svg';
import ReactLogo from '@/assets/services-types/frontend-frameworks/js/react.svg';
import Solid from '@/assets/services-types/frontend-frameworks/js/solid.svg';
import Svelte from '@/assets/services-types/frontend-frameworks/js/svelte.svg';
import Vue from '@/assets/services-types/frontend-frameworks/js/vue.svg';
import Android from '@/assets/services-types/mobile-frameworks/android.svg';
import Flutter from '@/assets/services-types/mobile-frameworks/flutter.svg';
import Ios from '@/assets/services-types/mobile-frameworks/ios.svg';
import ReactNative from '@/assets/services-types/mobile-frameworks/reactnative.svg';
import Controller from '@/assets/system-component-types/controller.svg';
import Endpoint from '@/assets/system-component-types/endpoint.svg';
import Module from '@/assets/system-component-types/module.svg';
import Service from '@/assets/system-component-types/service.svg';
import { MenuItemType } from '@/constants';

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
	MenuItemType | NodeType,
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
	[ServiceType.NextJs]: {
		SVG: NextJS,
		props: { className: defaultClassName },
	},
	[ServiceType.Angular]: { SVG: Angular },
	[ServiceType.React]: { SVG: ReactLogo },
	[ServiceType.Solid]: { SVG: Solid },
	[ServiceType.Svelte]: { SVG: Svelte },
	[ServiceType.Vue]: { SVG: Vue },
	//front mobile
	[ServiceType.ReactNative]: { SVG: ReactNative },
	[ServiceType.Flutter]: { SVG: Flutter },
	[ServiceType.IOS]: { SVG: Ios },
	[ServiceType.Android]: { SVG: Android },
	// db-nosql
	[ServiceType.MongoDB]: { SVG: MongoDB },
	[ServiceType.Firestore]: { SVG: Firestore },
	[ServiceType.Cassandra]: { SVG: Cassandra },
	[ServiceType.DynamoDB]: { SVG: DynamoDB },
	[ServiceType.Redis]: { SVG: Redis },
	[ServiceType.Hbase]: { SVG: Hbase },
	[ServiceType.CosmosDB]: { SVG: CosmosDB },
	// db-sql
	[ServiceType.MySQL]: { SVG: MySQL },
	[ServiceType.PostgresSQL]: { SVG: PostgresSQL },
	[ServiceType.MicrosoftSQL]: { SVG: MicrosoftSQL },
	[ServiceType.MariaDB]: { SVG: MariaDB },
	[ServiceType.Firebird]: { SVG: Firebird },
	[ServiceType.SQLite]: { SVG: SQLite },
	[ServiceType.Oracle]: { SVG: Oracle },
	// server js
	[ServiceType.NestJs]: { SVG: NestJS },
	[ServiceType.ExpressJs]: {
		SVG: ExpressJS,
		props: { className: defaultClassName },
	},
	[ServiceType.KoaJs]: { SVG: KoaJS },
	[ServiceType.HapiJs]: { SVG: HapiJS },
	[ServiceType.Fastify]: { SVG: Fastify },
	// server Python
	[ServiceType.Litestar]: {
		SVG: Litestar,
		props: { className: 'h-12 w-12 p-0' },
	},
	[ServiceType.Django]: { SVG: Django },
	[ServiceType.Flask]: {
		SVG: Flask,
		props: { className: defaultClassName },
	},
	[ServiceType.FastAPI]: { SVG: FastAPI },
	// api services
	[ServiceType.Stripe]: { SVG: Stripe },
	[ServiceType.OpenAi]: { SVG: OpenAi },
	[ServiceType.MailGun]: { SVG: MailGun },
	[ServiceType.SendGrid]: { SVG: SendGrid },

	// internal nodes
	[SystemComponentType.Controller]: { SVG: Controller },
	[SystemComponentType.Endpoint]: { SVG: Endpoint },
	[SystemComponentType.Service]: { SVG: Service },
	[SystemComponentType.Module]: { SVG: Module },
};
