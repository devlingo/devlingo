/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable unicorn/prefer-export-from */
import { ServiceType, SystemComponentType } from 'shared/constants';
import { NodeType } from 'shared/types';

import API from '@/assets/menu-icons/api.svg';
import Backend from '@/assets/menu-icons/backend.svg';
import Cloud from '@/assets/menu-icons/cloud.svg';
import Database from '@/assets/menu-icons/database.svg';
import Frontend from '@/assets/menu-icons/frontend.svg';
import Marketing from '@/assets/menu-icons/marketing.svg';
import Android from '@/assets/services-types//frontend/mobile/android.svg';
import Flutter from '@/assets/services-types//frontend/mobile/flutter.svg';
import Ios from '@/assets/services-types//frontend/mobile/ios.svg';
import ReactNative from '@/assets/services-types//frontend/mobile/reactnative.svg';
import AdobeTarget from '@/assets/services-types/api-services/ab-testing/adobe-target.svg';
import GoogleOptimize from '@/assets/services-types/api-services/ab-testing/google-optimize.svg';
// AB Testing
import OptimizelyAbTesting from '@/assets/services-types/api-services/ab-testing/optimizely.svg';
import Unbounce from '@/assets/services-types/api-services/ab-testing/unbounce.svg';
import VisualWebsiteOptimizer from '@/assets/services-types/api-services/ab-testing/visual-website-optimizer.svg';
import FacebookAds from '@/assets/services-types/api-services/ad-networks/facebook-ads.svg';
// Ad networks
import GoogleAdwords from '@/assets/services-types/api-services/ad-networks/google-adwords.svg';
import LinkedInAds from '@/assets/services-types/api-services/ad-networks/linkedin-ads.svg';
import TwitterAds from '@/assets/services-types/api-services/ad-networks/twitter-ads.svg';
import ClarifaiAPI from '@/assets/services-types/api-services/ai/clarifai-api.svg';
import GoogleAI from '@/assets/services-types/api-services/ai/google-ai.svg';
import GoogleCloudVisionAPI from '@/assets/services-types/api-services/ai/google-cloud-vision-api.svg';
import IBMWatson from '@/assets/services-types/api-services/ai/ibm-watson.svg';
// AI
import Openai from '@/assets/services-types/api-services/ai/openai.svg';
import Amplitude from '@/assets/services-types/api-services/analytics/amplitude.svg';
// Analytics
import GoogleAnalytics from '@/assets/services-types/api-services/analytics/google-analytics.svg';
import Heap from '@/assets/services-types/api-services/analytics/heap.svg';
import Mixpanel from '@/assets/services-types/api-services/analytics/mixpanel.svg';
import Pendo from '@/assets/services-types/api-services/analytics/pendo.svg';
import Woopra from '@/assets/services-types/api-services/analytics/woopra.svg';
import Adjust from '@/assets/services-types/api-services/attribution/adjust.svg';
import Appsflyer from '@/assets/services-types/api-services/attribution/appsflyer.svg';
import Branch from '@/assets/services-types/api-services/attribution/branch.svg';
// Attribution
import Kochava from '@/assets/services-types/api-services/attribution/kochava.svg';
import Singular from '@/assets/services-types/api-services/attribution/singular.svg';
import Alchemy from '@/assets/services-types/api-services/blockchain/alchemy.svg';
import BlockCypher from '@/assets/services-types/api-services/blockchain/blockcypher.svg';
// Blockchain
import CoinAPI from '@/assets/services-types/api-services/blockchain/coinapi.svg';
import CoinGecko from '@/assets/services-types/api-services/blockchain/coingecko.svg';
import Coinpaprika from '@/assets/services-types/api-services/blockchain/coinpaprika.svg';
import CryptoCompare from '@/assets/services-types/api-services/blockchain/crypto-compare.svg';
import Infura from '@/assets/services-types/api-services/blockchain/infura.svg';
import Nomics from '@/assets/services-types/api-services/blockchain/nomics.svg';
import Quicknode from '@/assets/services-types/api-services/blockchain/quicknode.svg';
import Tierion from '@/assets/services-types/api-services/blockchain/tierion.svg';
// CDP
import OptimizelyCdp from '@/assets/services-types/api-services/cdp/optimizely.svg';
import Segment from '@/assets/services-types/api-services/cdp/segment.svg';
import Tealium from '@/assets/services-types/api-services/cdp/tealium.svg';
import Hubspot from '@/assets/services-types/api-services/crm/hubspot.svg';
// CRM
import Pipedrive from '@/assets/services-types/api-services/crm/pipedrive.svg';
import Salesforce from '@/assets/services-types/api-services/crm/salesforce.svg';
import ZohoCRM from '@/assets/services-types/api-services/crm/zohocrm.svg';
import Clearbit from '@/assets/services-types/api-services/data-enrichment/clearbit.svg';
import FullContact from '@/assets/services-types/api-services/data-enrichment/fullcontact.svg';
// Data Enrichment
import Leadiq from '@/assets/services-types/api-services/data-enrichment/leadiq.svg';
import Snovio from '@/assets/services-types/api-services/data-enrichment/snov.svg';
import ZoomInfo from '@/assets/services-types/api-services/data-enrichment/zoominfo.svg';
import Finbox from '@/assets/services-types/api-services/financial-data/finbox.svg';
import Intrinio from '@/assets/services-types/api-services/financial-data/intrinio.svg';
// Financial data
import Plaid from '@/assets/services-types/api-services/financial-data/plaid.svg';
import Quodd from '@/assets/services-types/api-services/financial-data/quodd.svg';
import Yodlee from '@/assets/services-types/api-services/financial-data/yodlee.svg';
import BingGeoLocation from '@/assets/services-types/api-services/geo-location/bing.svg';
import GoogleMapsGeoLocation from '@/assets/services-types/api-services/geo-location/google-maps.svg';
import HereGeoLocation from '@/assets/services-types/api-services/geo-location/here.svg';
import MapboxGeoLocation from '@/assets/services-types/api-services/geo-location/mapbox.svg';
// Geolocation
import TomTom from '@/assets/services-types/api-services/geo-location/tomtom.svg';
// Identity verification
import Jumio from '@/assets/services-types/api-services/identity-verification/jumio.svg';
import Onfido from '@/assets/services-types/api-services/identity-verification/onfido.svg';
import Passbase from '@/assets/services-types/api-services/identity-verification/passbase.svg';
import Trulioo from '@/assets/services-types/api-services/identity-verification/trulioo.svg';
import Veriff from '@/assets/services-types/api-services/identity-verification/veriff.svg';
import Crowdin from '@/assets/services-types/api-services/localization/crowdin.svg';
import DeepLApi from '@/assets/services-types/api-services/localization/deepl-api.svg';
import GoogleTranslateApi from '@/assets/services-types/api-services/localization/google-translate-api.svg';
// Localization & translation
import Lokalise from '@/assets/services-types/api-services/localization/lokalise.svg';
import MicrosoftTranslatorTextApi from '@/assets/services-types/api-services/localization/microsoft-translator-text-api.svg';
import Phrase from '@/assets/services-types/api-services/localization/phrase.svg';
import Smartling from '@/assets/services-types/api-services/localization/smartling.svg';
import Transifex from '@/assets/services-types/api-services/localization/transifex.svg';
import YandexTranslateApi from '@/assets/services-types/api-services/localization/yandex-translate-api.svg';
import BingMaps from '@/assets/services-types/api-services/maps/bing-maps.svg';
import GoogleMapsMaps from '@/assets/services-types/api-services/maps/google-maps.svg';
import HereMaps from '@/assets/services-types/api-services/maps/here.svg';
import MapboxMaps from '@/assets/services-types/api-services/maps/mapbox.svg';
// Maps
import OpenCageGeocoder from '@/assets/services-types/api-services/maps/opencage-geocoder.svg';
import MailGun from '@/assets/services-types/api-services/marketing/mailgun.svg';
import SendGrid from '@/assets/services-types/api-services/marketing/sendgrid.svg';
import Activecampaign from '@/assets/services-types/api-services/marketing-automation/activecampaign.svg';
import Constantcontact from '@/assets/services-types/api-services/marketing-automation/constantcontact.svg';
// Marketing Automation
import Convertkit from '@/assets/services-types/api-services/marketing-automation/convertkit.svg';
import Freshsales from '@/assets/services-types/api-services/marketing-automation/freshsales.svg';
import Mailchimp from '@/assets/services-types/api-services/marketing-automation/mailchimp.svg';
import SendgridMarketingAutomation from '@/assets/services-types/api-services/marketing-automation/sendgrid.svg';
import Deezer from '@/assets/services-types/api-services/multimedia/deezer.svg';
import SoundCloud from '@/assets/services-types/api-services/multimedia/soundcloud.svg';
import Spotify from '@/assets/services-types/api-services/multimedia/spotify.svg';
// Multimedia
import Vimeo from '@/assets/services-types/api-services/multimedia/vimeo.svg';
import YouTube from '@/assets/services-types/api-services/multimedia/youtube.svg';
// Payment
import Adyen from '@/assets/services-types/api-services/payment/adyen.svg';
import AppStore from '@/assets/services-types/api-services/payment/app-store.svg';
import Braintree from '@/assets/services-types/api-services/payment/braintree.svg';
import Paypal from '@/assets/services-types/api-services/payment/paypal.svg';
import Playstore from '@/assets/services-types/api-services/payment/playstore.svg';
import Razorpay from '@/assets/services-types/api-services/payment/razorpay.svg';
import Revenuecat from '@/assets/services-types/api-services/payment/revenuecat-.svg';
import Square from '@/assets/services-types/api-services/payment/square.svg';
import Stripe from '@/assets/services-types/api-services/payment/stripe.svg';
import DHLAPI from '@/assets/services-types/api-services/shipping/dhl-api.svg';
import EasyPost from '@/assets/services-types/api-services/shipping/easypost.svg';
import FedEx from '@/assets/services-types/api-services/shipping/fedex.svg';
import UPS from '@/assets/services-types/api-services/shipping/ups.svg';
// Shipping
import USPS from '@/assets/services-types/api-services/shipping/usps.svg';
import Freshdesk from '@/assets/services-types/api-services/support/freshdesk.svg';
import HelpScoutAPI from '@/assets/services-types/api-services/support/help-scout-api.svg';
import Intercom from '@/assets/services-types/api-services/support/intercom.svg';
import Zendesk from '@/assets/services-types/api-services/support/zendesk.svg';
// Support
import ZohoDesk from '@/assets/services-types/api-services/support/zoho-desk.svg';
// Telecommunication
import Bandwidth from '@/assets/services-types/api-services/telecommunication/bandwidth.svg';
import Infobip from '@/assets/services-types/api-services/telecommunication/infobip.svg';
import Plivo from '@/assets/services-types/api-services/telecommunication/plivo.svg';
import Twilio from '@/assets/services-types/api-services/telecommunication/twilio.svg';
import Vonage from '@/assets/services-types/api-services/telecommunication/vonage.svg';
import AccuWeather from '@/assets/services-types/api-services/weather/accuweather.svg';
// Weather
import OpenWeather from '@/assets/services-types/api-services/weather/openweather.svg';
import Weatherstack from '@/assets/services-types/api-services/weather/weatherstack.svg';
import ExpressJS from '@/assets/services-types/backend/js/expressjs.svg';
import Fastify from '@/assets/services-types/backend/js/fastifyjs.svg';
import HapiJS from '@/assets/services-types/backend/js/hapijs.svg';
import KoaJS from '@/assets/services-types/backend/js/koajs.svg';
import NestJS from '@/assets/services-types/backend/js/nestjs.svg';
import Django from '@/assets/services-types/backend/python/django.svg';
import FastAPI from '@/assets/services-types/backend/python/fastapi.svg';
import Flask from '@/assets/services-types/backend/python/flask.svg';
import Litestar from '@/assets/services-types/backend/python/litestar.svg';
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
import Oracle from '@/assets/services-types/databases/sql/oracledb.svg';
import PostgresSQL from '@/assets/services-types/databases/sql/postgresql.svg';
import SQLite from '@/assets/services-types/databases/sql/sqlite.svg';
import MicrosoftSQL from '@/assets/services-types/databases/sql/sqlserver.svg';
import Angular from '@/assets/services-types/frontend/web/angular.svg';
import NextJS from '@/assets/services-types/frontend/web/nextjs.svg';
import ReactLogo from '@/assets/services-types/frontend/web/react.svg';
import Solid from '@/assets/services-types/frontend/web/solid.svg';
import Svelte from '@/assets/services-types/frontend/web/svelte.svg';
import Vue from '@/assets/services-types/frontend/web/vue.svg';
import Controller from '@/assets/system-component-types/controller.svg';
import Endpoint from '@/assets/system-component-types/endpoint.svg';
import Module from '@/assets/system-component-types/module.svg';
import Service from '@/assets/system-component-types/service.svg';
import { MenuItemType } from '@/constants';

export {
	Activecampaign,
	AdobeTarget,
	Adyen,
	Alchemy,
	Android,
	Angular,
	API,
	AppStore,
	Backend,
	BingGeoLocation,
	BingMaps,
	BlockCypher,
	Braintree,
	Cassandra,
	ClarifaiAPI,
	Clearbit,
	Cloud,
	CoinAPI,
	CoinGecko,
	Coinpaprika,
	Constantcontact,
	Controller,
	Convertkit,
	CosmosDB,
	CryptoCompare,
	Database,
	DHLAPI,
	Django,
	DynamoDB,
	EasyPost,
	Endpoint,
	FastAPI,
	FedEx,
	Firebird,
	Firestore,
	Flask,
	Flutter,
	Freshdesk,
	Freshsales,
	Frontend,
	FullContact,
	GoogleAI,
	GoogleCloudVisionAPI,
	GoogleMapsGeoLocation,
	GoogleMapsMaps,
	GoogleOptimize,
	Hbase,
	HelpScoutAPI,
	HereGeoLocation,
	HereMaps,
	Hubspot,
	IBMWatson,
	Infura,
	Intercom,
	Ios,
	Jumio,
	Leadiq,
	Litestar,
	Mailchimp,
	MailGun,
	MapboxGeoLocation,
	MapboxMaps,
	MariaDB,
	Marketing,
	MicrosoftSQL,
	Module,
	MongoDB,
	MySQL,
	NestJS,
	NextJS,
	Nomics,
	Onfido,
	Openai,
	OpenCageGeocoder,
	OptimizelyAbTesting,
	OptimizelyCdp,
	Oracle,
	Passbase,
	Paypal,
	Pipedrive,
	Playstore,
	PostgresSQL,
	Quicknode,
	Razorpay,
	ReactLogo,
	ReactNative,
	Redis,
	Revenuecat,
	Salesforce,
	Segment,
	SendGrid,
	SendgridMarketingAutomation,
	Service,
	Snovio,
	Solid,
	SQLite,
	Square,
	Stripe,
	Svelte,
	Tealium,
	Tierion,
	TomTom,
	Trulioo,
	Unbounce,
	UPS,
	USPS,
	Veriff,
	VisualWebsiteOptimizer,
	Vue,
	Zendesk,
	ZohoCRM,
	ZohoDesk,
	ZoomInfo,
};

const defaultClassName = 'text-base-content h-12 w-12';

export const TypeSVGMap: Record<
	MenuItemType | NodeType | ServiceType,
	{
		SVG: React.ComponentType<React.SVGProps<SVGElement>>;
		props?: Partial<React.SVGProps<SVGElement>>;
	}
> = {
	// Front JS
	[ServiceType.NextJs]: {
		SVG: NextJS,
		props: { className: defaultClassName },
	},
	[ServiceType.Angular]: { SVG: Angular },
	[ServiceType.React]: { SVG: ReactLogo },
	[ServiceType.Solid]: { SVG: Solid },
	[ServiceType.Svelte]: { SVG: Svelte },
	[ServiceType.Vue]: { SVG: Vue },
	// Menu items
	[MenuItemType.Frontend]: { SVG: Frontend },
	[MenuItemType.Backend]: { SVG: Backend },
	[MenuItemType.Database]: { SVG: Database },
	[MenuItemType.Cloud]: { SVG: Cloud },
	[MenuItemType.Marketing]: { SVG: Marketing },
	[MenuItemType.API]: { SVG: API },
	// Front mobile
	[ServiceType.ReactNative]: { SVG: ReactNative },
	[ServiceType.Flutter]: { SVG: Flutter },
	[ServiceType.IOS]: { SVG: Ios },
	[ServiceType.Android]: { SVG: Android },

	// DB - NoSQL
	[ServiceType.MongoDB]: { SVG: MongoDB },
	[ServiceType.Firestore]: { SVG: Firestore },
	[ServiceType.Cassandra]: { SVG: Cassandra },
	[ServiceType.DynamoDB]: { SVG: DynamoDB },
	[ServiceType.Redis]: { SVG: Redis },
	[ServiceType.Hbase]: { SVG: Hbase },
	[ServiceType.CosmosDB]: { SVG: CosmosDB },

	// DB - SQL
	[ServiceType.MySQL]: { SVG: MySQL },
	[ServiceType.PostgresSQL]: { SVG: PostgresSQL },
	[ServiceType.SQLServer]: { SVG: MicrosoftSQL },
	[ServiceType.MariaDB]: { SVG: MariaDB },
	[ServiceType.Firebird]: { SVG: Firebird },
	[ServiceType.SQLite]: { SVG: SQLite },
	[ServiceType.Oracle]: { SVG: Oracle },

	// Server JS
	[ServiceType.NestJs]: { SVG: NestJS },
	[ServiceType.ExpressJs]: {
		SVG: ExpressJS,
		props: { className: defaultClassName },
	},
	[ServiceType.KoaJs]: { SVG: KoaJS },
	[ServiceType.HapiJs]: { SVG: HapiJS },
	[ServiceType.Fastify]: { SVG: Fastify },

	// Server Python
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

	// Internal nodes
	[SystemComponentType.Controller]: { SVG: Controller },
	[SystemComponentType.Endpoint]: { SVG: Endpoint },
	[SystemComponentType.Service]: { SVG: Service },
	[SystemComponentType.Module]: { SVG: Module },

	// Maps
	[ServiceType.OpenCageGeocoder]: { SVG: OpenCageGeocoder },
	[ServiceType.BingMaps]: { SVG: BingMaps },
	[ServiceType.HereMaps]: { SVG: HereMaps },
	[ServiceType.Mapbox]: { SVG: MapboxMaps },
	[ServiceType.GoogleMaps]: { SVG: GoogleMapsMaps },

	// CDP
	[ServiceType.Optimizely]: { SVG: OptimizelyCdp },
	[ServiceType.Segment]: { SVG: Segment },
	[ServiceType.Tealium]: { SVG: Tealium },

	// Geolocation
	[ServiceType.TomTom]: { SVG: TomTom },
	[ServiceType.HereGeo]: { SVG: HereGeoLocation },
	[ServiceType.BingGeo]: { SVG: BingGeoLocation },
	[ServiceType.MapboxGeo]: { SVG: MapboxGeoLocation },
	[ServiceType.GoogleMapsGeo]: { SVG: GoogleMapsGeoLocation },

	// AB Testing
	[ServiceType.OptimizelyAb]: { SVG: OptimizelyAbTesting },
	[ServiceType.VisualWebsiteOptimizer]: { SVG: VisualWebsiteOptimizer },
	[ServiceType.Unbounce]: { SVG: Unbounce },
	[ServiceType.AdobeTarget]: { SVG: AdobeTarget },
	[ServiceType.GoogleOptimize]: { SVG: GoogleOptimize },

	// Identity verification
	[ServiceType.Jumio]: { SVG: Jumio },
	[ServiceType.Veriff]: { SVG: Veriff },
	[ServiceType.Onfido]: { SVG: Onfido },
	[ServiceType.Trulioo]: { SVG: Trulioo },
	[ServiceType.Passbase]: { SVG: Passbase },

	// Payment
	[ServiceType.Stripe]: { SVG: Stripe },
	[ServiceType.Adyen]: { SVG: Adyen },
	[ServiceType.Braintree]: { SVG: Braintree },
	[ServiceType.Razorpay]: { SVG: Razorpay },
	[ServiceType.RevenueCat]: { SVG: Revenuecat },
	[ServiceType.Square]: { SVG: Square },
	[ServiceType.Paypal]: { SVG: Paypal },
	[ServiceType.PlayStore]: { SVG: Playstore },
	[ServiceType.AppStore]: { SVG: AppStore },

	// CRM
	[ServiceType.Pipedrive]: { SVG: Pipedrive },
	[ServiceType.ZohoCRM]: { SVG: ZohoCRM },
	[ServiceType.Hubspot]: { SVG: Hubspot },
	[ServiceType.Salesforce]: { SVG: Salesforce },

	// Shipping
	[ServiceType.USPS]: { SVG: USPS },
	[ServiceType.FedEx]: { SVG: FedEx },
	[ServiceType.DHLAPI]: { SVG: DHLAPI },
	[ServiceType.EasyPost]: { SVG: EasyPost },
	[ServiceType.UPS]: { SVG: UPS },

	// Blockchain
	[ServiceType.CoinAPI]: { SVG: CoinAPI },
	[ServiceType.BlockCypher]: { SVG: BlockCypher },
	[ServiceType.Nomics]: { SVG: Nomics },
	[ServiceType.Infura]: { SVG: Infura },
	[ServiceType.Quicknode]: { SVG: Quicknode },
	[ServiceType.Alchemy]: { SVG: Alchemy },
	[ServiceType.CryptoCompare]: { SVG: CryptoCompare },
	[ServiceType.Coinpaprika]: { SVG: Coinpaprika },
	[ServiceType.Tierion]: { SVG: Tierion },
	[ServiceType.CoinGecko]: { SVG: CoinGecko },

	// Data Enrichment
	[ServiceType.Leadiq]: { SVG: Leadiq },
	[ServiceType.FullContact]: { SVG: FullContact },
	[ServiceType.Clearbit]: { SVG: Clearbit },
	[ServiceType.ZoomInfo]: { SVG: ZoomInfo },
	[ServiceType.SnovIo]: { SVG: Snovio },

	// Marketing Automation
	[ServiceType.SendGrid]: { SVG: SendGrid },
	[ServiceType.MailGun]: { SVG: MailGun },
	[ServiceType.ConvertKit]: { SVG: Convertkit },
	[ServiceType.MailChimp]: { SVG: Mailchimp },
	[ServiceType.FreshSales]: { SVG: Freshsales },
	[ServiceType.ActiveCampaign]: { SVG: Activecampaign },
	[ServiceType.ConstantContact]: { SVG: Constantcontact },

	// Support
	[ServiceType.ZohoDesk]: { SVG: ZohoDesk },
	[ServiceType.Zendesk]: { SVG: Zendesk },
	[ServiceType.Intercom]: { SVG: Intercom },
	[ServiceType.HelpScoutApi]: { SVG: HelpScoutAPI },
	[ServiceType.Freshdesk]: { SVG: Freshdesk },

	// AI
	[ServiceType.OpenAi]: { SVG: Openai },
	[ServiceType.IbmWatson]: { SVG: IBMWatson },
	[ServiceType.GoogleAi]: { SVG: GoogleAI },
	[ServiceType.ClarifaiApi]: { SVG: ClarifaiAPI },
	[ServiceType.GoogleCloudVisionApi]: { SVG: GoogleCloudVisionAPI },

	// Attribution
	[ServiceType.Kochava]: { SVG: Kochava },
	[ServiceType.Singular]: { SVG: Singular },
	[ServiceType.Adjust]: { SVG: Adjust },
	[ServiceType.Appsflyer]: { SVG: Appsflyer },
	[ServiceType.Branch]: { SVG: Branch },

	// Multimedia
	[ServiceType.Vimeo]: { SVG: Vimeo },
	[ServiceType.Spotify]: { SVG: Spotify },
	[ServiceType.Deezer]: { SVG: Deezer },
	[ServiceType.YouTube]: { SVG: YouTube },
	[ServiceType.SoundCloud]: { SVG: SoundCloud },

	// Weather
	[ServiceType.OpenWeather]: { SVG: OpenWeather },
	[ServiceType.AccuWeather]: { SVG: AccuWeather },
	[ServiceType.Weatherstack]: { SVG: Weatherstack },

	// Ad networks
	[ServiceType.GoogleAdwords]: { SVG: GoogleAdwords },
	[ServiceType.LinkedInAds]: { SVG: LinkedInAds },
	[ServiceType.TwitterAds]: { SVG: TwitterAds },
	[ServiceType.FacebookAds]: { SVG: FacebookAds },

	// Financial data
	[ServiceType.Plaid]: { SVG: Plaid },
	[ServiceType.Quodd]: { SVG: Quodd },
	[ServiceType.Intrinio]: { SVG: Intrinio },
	[ServiceType.Yodlee]: { SVG: Yodlee },
	[ServiceType.Finbox]: { SVG: Finbox },

	// Telecommunication
	[ServiceType.Bandwidth]: { SVG: Bandwidth },
	[ServiceType.Plivo]: { SVG: Plivo },
	[ServiceType.Twilio]: { SVG: Twilio },
	[ServiceType.Vonage]: { SVG: Vonage },
	[ServiceType.Infobip]: { SVG: Infobip },

	// Localization & translation
	[ServiceType.Lokalise]: { SVG: Lokalise },
	[ServiceType.Phrase]: { SVG: Phrase },
	[ServiceType.DeepLApi]: { SVG: DeepLApi },
	[ServiceType.Smartling]: { SVG: Smartling },
	[ServiceType.YandexTranslateApi]: { SVG: YandexTranslateApi },
	[ServiceType.GoogleTranslateApi]: { SVG: GoogleTranslateApi },
	[ServiceType.Crowdin]: { SVG: Crowdin },
	[ServiceType.Transifex]: { SVG: Transifex },
	[ServiceType.MicrosoftTranslatorTextApi]: {
		SVG: MicrosoftTranslatorTextApi,
	},

	// Analytics
	[ServiceType.GoogleAnalytics]: { SVG: GoogleAnalytics },
	[ServiceType.Amplitude]: { SVG: Amplitude },
	[ServiceType.Pendo]: { SVG: Pendo },
	[ServiceType.Heap]: { SVG: Heap },
	[ServiceType.Mixpanel]: { SVG: Mixpanel },
	[ServiceType.Woopra]: { SVG: Woopra },
};
