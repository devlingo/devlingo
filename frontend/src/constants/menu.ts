import React from 'react';
import { ServiceType } from 'shared/constants';
import { NodeType } from 'shared/types';

import { TypeSVGMap } from '@/assets';

export enum MenuItemType {
	Frontend = 'Frontend',
	Backend = 'Backend',
	Database = 'Database',
	Cloud = 'Cloud',
	Marketing = 'Marketing',
	API = 'API',
}
export enum MenuCategory {
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
	LocalizationTranslation = 'Localization',
	Maps = 'Maps',
	CDP = 'CDP',
	GeoLocation = 'GeoLocation',
	AbTesting = 'AbTesting',
	IdentityVerification = 'Identity Verification',
	CRM = 'CRM',
	Shipping = 'Shipping',
	Blockchain = 'Blockchain',
	DataEnrichment = 'DataEnrichment',
	Support = 'Support',
	Attribution = 'Attribution',
	Multimedia = 'Multimedia',
	Weather = 'Weather',
	AdNetworks = 'Ad Networks',
	FinancialData = 'Financial Data',
	Telecommunication = 'Telecommunication',
	Analytics = 'Analytics',
}
export interface MenuCategoryWithNodes {
	category: MenuCategory;
	nodes: NodeType[];
}
export const menuItems: {
	icon: React.ComponentType<React.SVGProps<SVGElement>>;
	categories: MenuCategoryWithNodes[];
}[] = [
	{
		icon: TypeSVGMap[MenuItemType.Frontend].SVG,
		categories: [
			{
				category: MenuCategory.Javascript,
				nodes: [
					ServiceType.NextJs,
					ServiceType.React,
					ServiceType.Angular,
					ServiceType.Vue,
					ServiceType.Svelte,
					ServiceType.Solid,
				],
			},
			{
				category: MenuCategory.Mobile,
				nodes: [
					ServiceType.IOS,
					ServiceType.Android,
					ServiceType.Flutter,
					ServiceType.ReactNative,
				],
			},
		],
	},
	{
		icon: TypeSVGMap[MenuItemType.Backend].SVG,
		categories: [
			{
				category: MenuCategory.Javascript,
				nodes: [
					ServiceType.NestJs,
					ServiceType.ExpressJs,
					ServiceType.Fastify,
					ServiceType.HapiJs,
					ServiceType.KoaJs,
				],
			},
			{
				category: MenuCategory.Python,
				nodes: [
					ServiceType.Django,
					ServiceType.Litestar,
					ServiceType.Flask,
					ServiceType.FastAPI,
				],
			},
			{
				category: MenuCategory.Java,
				nodes: [],
			},
			{
				category: MenuCategory.Go,
				nodes: [],
			},
			{
				category: MenuCategory.DotNet,
				nodes: [],
			},
		],
	},
	{
		icon: TypeSVGMap[MenuItemType.Database].SVG,
		categories: [
			{
				category: MenuCategory.NoSQL,
				nodes: [
					ServiceType.Redis,
					ServiceType.Firestore,
					ServiceType.DynamoDB,
					ServiceType.CosmosDB,
					ServiceType.Cassandra,
				],
			},
			{
				category: MenuCategory.SQL,
				nodes: [
					ServiceType.PostgresSQL,
					ServiceType.Oracle,
					ServiceType.MariaDB,
					ServiceType.SQLite,
					ServiceType.MySQL,
					ServiceType.SQLServer,
					ServiceType.Firebird,
				],
			},
			{
				category: MenuCategory.Graph,
				nodes: [],
			},
			{
				category: MenuCategory.Warehouse,
				nodes: [],
			},
			{
				category: MenuCategory.Vector,
				nodes: [],
			},
		],
	},
	{
		icon: TypeSVGMap[MenuItemType.Cloud].SVG,
		categories: [],
	},
	{
		icon: TypeSVGMap[MenuItemType.API].SVG,
		categories: [
			{
				category: MenuCategory.AI,
				nodes: [
					ServiceType.OpenAi,
					ServiceType.IbmWatson,
					ServiceType.GoogleAi,
					ServiceType.ClarifaiApi,
					ServiceType.GoogleCloudVisionApi,
				],
			},
			{
				category: MenuCategory.Marketing,
				nodes: [
					ServiceType.SendGrid,
					ServiceType.MailGun,
					ServiceType.ConvertKit,
					ServiceType.MailChimp,
					ServiceType.FreshSales,
					ServiceType.ActiveCampaign,
					ServiceType.ConstantContact,
				],
			},
			{
				category: MenuCategory.Payment,
				nodes: [
					ServiceType.Stripe,
					ServiceType.Adyen,
					ServiceType.Braintree,
					ServiceType.Razorpay,
					ServiceType.RevenueCat,
					ServiceType.Square,
					ServiceType.Paypal,
					ServiceType.PlayStore,
					ServiceType.AppStore,
				],
			},
			{
				category: MenuCategory.Maps,
				nodes: [
					ServiceType.OpenCageGeocoder,
					ServiceType.BingMaps,
					ServiceType.HereMaps,
					ServiceType.Mapbox,
					ServiceType.GoogleMaps,
				],
			},
			{
				category: MenuCategory.CDP,
				nodes: [
					ServiceType.Optimizely,
					ServiceType.Segment,
					ServiceType.Tealium,
				],
			},
			{
				category: MenuCategory.GeoLocation,
				nodes: [
					ServiceType.TomTom,
					ServiceType.HereGeo,
					ServiceType.BingGeo,
					ServiceType.MapboxGeo,
					ServiceType.GoogleMapsGeo,
				],
			},
			{
				category: MenuCategory.AbTesting,
				nodes: [
					ServiceType.OptimizelyAb,
					ServiceType.VisualWebsiteOptimizer,
					ServiceType.Unbounce,
					ServiceType.AdobeTarget,
					ServiceType.GoogleOptimize,
				],
			},
			{
				category: MenuCategory.IdentityVerification,
				nodes: [
					ServiceType.Jumio,
					ServiceType.Veriff,
					ServiceType.Onfido,
					ServiceType.Trulioo,
					ServiceType.Passbase,
				],
			},
			{
				category: MenuCategory.CRM,
				nodes: [
					ServiceType.Pipedrive,
					ServiceType.ZohoCRM,
					ServiceType.Hubspot,
					ServiceType.Salesforce,
				],
			},
			{
				category: MenuCategory.Shipping,
				nodes: [
					ServiceType.USPS,
					ServiceType.FedEx,
					ServiceType.DHLAPI,
					ServiceType.EasyPost,
					ServiceType.UPS,
				],
			},
			{
				category: MenuCategory.Blockchain,
				nodes: [
					ServiceType.CoinAPI,
					ServiceType.BlockCypher,
					ServiceType.Nomics,
					ServiceType.Infura,
					ServiceType.Quicknode,
					ServiceType.Alchemy,
					ServiceType.CryptoCompare,
					ServiceType.Coinpaprika,
					ServiceType.Tierion,
					ServiceType.CoinGecko,
				],
			},
			{
				category: MenuCategory.DataEnrichment,
				nodes: [
					ServiceType.Leadiq,
					ServiceType.FullContact,
					ServiceType.Clearbit,
					ServiceType.ZoomInfo,
					ServiceType.SnovIo,
				],
			},
			{
				category: MenuCategory.Support,
				nodes: [
					ServiceType.ZohoDesk,
					ServiceType.Zendesk,
					ServiceType.Intercom,
					ServiceType.HelpScoutApi,
					ServiceType.Freshdesk,
				],
			},

			{
				category: MenuCategory.Attribution,
				nodes: [
					ServiceType.Kochava,
					ServiceType.Singular,
					ServiceType.Adjust,
					ServiceType.Appsflyer,
					ServiceType.Branch,
				],
			},
			{
				category: MenuCategory.Multimedia,
				nodes: [
					ServiceType.Vimeo,
					ServiceType.Spotify,
					ServiceType.Deezer,
					ServiceType.YouTube,
					ServiceType.SoundCloud,
				],
			},
			{
				category: MenuCategory.Weather,
				nodes: [
					ServiceType.OpenWeather,
					ServiceType.AccuWeather,
					ServiceType.Weatherstack,
				],
			},
			{
				category: MenuCategory.AdNetworks,
				nodes: [
					ServiceType.GoogleAdwords,
					ServiceType.LinkedInAds,
					ServiceType.TwitterAds,
					ServiceType.FacebookAds,
				],
			},
			{
				category: MenuCategory.FinancialData,
				nodes: [
					ServiceType.Plaid,
					ServiceType.Quodd,
					ServiceType.Intrinio,
					ServiceType.Yodlee,
					ServiceType.Finbox,
				],
			},
			{
				category: MenuCategory.Telecommunication,
				nodes: [
					ServiceType.Bandwidth,
					ServiceType.Plivo,
					ServiceType.Twilio,
					ServiceType.Vonage,
					ServiceType.Infobip,
				],
			},
			{
				category: MenuCategory.LocalizationTranslation,
				nodes: [
					ServiceType.Lokalise,
					ServiceType.Phrase,
					ServiceType.DeepLApi,
					ServiceType.Smartling,
					ServiceType.YandexTranslateApi,
					ServiceType.GoogleTranslateApi,
					ServiceType.Crowdin,
					ServiceType.Transifex,
					ServiceType.MicrosoftTranslatorTextApi,
				],
			},
			{
				category: MenuCategory.Analytics,
				nodes: [
					ServiceType.GoogleAnalytics,
					ServiceType.Amplitude,
					ServiceType.Pendo,
					ServiceType.Heap,
					ServiceType.Mixpanel,
					ServiceType.Woopra,
				],
			},
		],
	},
];
