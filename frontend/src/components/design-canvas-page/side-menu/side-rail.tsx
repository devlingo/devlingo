import { ChevronLeftIcon, CommandLineIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';

import { TypeSVGMap } from '@/assets';
import { MenuItem } from '@/components/design-canvas-page/side-menu/menu-item';
import {
	MenuItemType,
	NAV_BAR_HEIGHT_PIXELS,
	ServiceNodeType,
} from '@/constants';

const menuItems = [
	{
		icon: TypeSVGMap[MenuItemType.Frontend].SVG,
		subItems: [
			{
				category: 'Javascript',
				nodes: [
					ServiceNodeType.NextJs,
					ServiceNodeType.React,
					ServiceNodeType.Angular,
					ServiceNodeType.Vue,
					ServiceNodeType.Svelte,
					ServiceNodeType.Solid,
				],
			},
			{
				category: 'Mobile',
				nodes: [
					ServiceNodeType.IOS,
					ServiceNodeType.Android,
					ServiceNodeType.Flutter,
					ServiceNodeType.ReactNative,
				],
			},
		],
	},
	{
		icon: TypeSVGMap[MenuItemType.Backend].SVG,
		subItems: [
			{
				category: 'Javascript',
				nodes: [
					ServiceNodeType.NestJs,
					ServiceNodeType.ExpressJs,
					ServiceNodeType.Fastify,
					ServiceNodeType.HapiJs,
					ServiceNodeType.KoaJs,
				],
			},
			{
				category: 'Python',
				nodes: [
					ServiceNodeType.Django,
					ServiceNodeType.Litestar,
					ServiceNodeType.Flask,
					ServiceNodeType.FastAPI,
				],
			},
			{
				category: 'Java',
				nodes: [],
			},
			{
				category: 'Go',
				nodes: [],
			},
			{
				category: '.Net',
				nodes: [],
			},
		],
	},
	{
		icon: TypeSVGMap[MenuItemType.Database].SVG,
		subItems: [
			{
				category: 'No-SQL',
				nodes: [
					ServiceNodeType.Redis,
					ServiceNodeType.Firestore,
					ServiceNodeType.DynamoDB,
					ServiceNodeType.CosmosDB,
					ServiceNodeType.Cassandra,
				],
			},
			{
				category: 'SQL',
				nodes: [
					ServiceNodeType.PostgresSQL,
					ServiceNodeType.Oracle,
					ServiceNodeType.MariaDB,
					ServiceNodeType.SQLite,
					ServiceNodeType.MySQL,
					ServiceNodeType.MicrosoftSQL,
					ServiceNodeType.Firebird,
				],
			},
			{
				category: 'Graph',
				nodes: [],
			},
			{
				category: 'Warehouse',
				nodes: [],
			},
			{
				category: 'Vector',
				nodes: [],
			},
		],
	},
	{
		icon: TypeSVGMap[MenuItemType.Cloud].SVG,
		subItems: [],
	},
	{
		icon: TypeSVGMap[MenuItemType.API].SVG,
		subItems: [
			{
				category: 'Marketing',
				nodes: [ServiceNodeType.SendGrid, ServiceNodeType.MailGun],
			},
			{
				category: 'Ai',
				nodes: [ServiceNodeType.OpenAi],
			},
			{ category: 'Payment', nodes: [ServiceNodeType.Stripe] },
		],
	},
];

export function SideRail({
	isMenuOpen,
	setIsMenuOpen,
	togglePromptModal,
}: {
	isMenuOpen: boolean;
	setIsMenuOpen: (isOpen: boolean) => void;
	togglePromptModal: () => void;
}) {
	const [activeItem, setActiveItem] = useState<number>(0);

	const handleItemHover = (index: number) => {
		setActiveItem(index);
		setIsMenuOpen(true);
	};

	return (
		<div
			className={`flex border-r-2 bg-base-100 border-base-200 h-[calc(100vh-${NAV_BAR_HEIGHT_PIXELS})] ${
				isMenuOpen ? 'grow' : 'shrink'
			}`}
		>
			<div className="flex flex-col">
				<button
					className="btn btn-primary btn-md p-2 my-6 mt-8 rounded-lg shadow-md mx-auto"
					onClick={() => {
						if (isMenuOpen) {
							setIsMenuOpen(false);
						}
						togglePromptModal();
					}}
				>
					<CommandLineIcon className="w-6 h-6 text-primary-content" />
				</button>

				<ul className="menu p-2 rounded-box grow">
					{menuItems.map((item, i) => (
						<li key={i} tabIndex={0}>
							<a
								className={`block items-center rounded-full ${
									isMenuOpen && activeItem === i
										? 'opacity-100'
										: 'opacity-60'
								}`}
								onMouseEnter={() => handleItemHover(i)}
							>
								<item.icon className="h-6 w-6 text-base-content" />
							</a>
						</li>
					))}
				</ul>
			</div>
			{isMenuOpen && (
				<div className="flex flex-col mt-4 bg-base-100 border-base-200 transition-all duration-300 ease-in-out grow w-fit max-h-full overscroll-y-auto">
					{menuItems[activeItem].subItems.map((subItem, j) => (
						<div
							key={j}
							tabIndex={0}
							className="collapse text-base-content collapse-arrow bg-base-100 rounded-box transition-opacity duration-700 ease-in-out flex-none hover:opacity-100 opacity-80"
						>
							<input type="checkbox" />
							<div className="collapse-title text-sm font-medium">
								{subItem.category}
							</div>

							<div className="collapse-content">
								{subItem.nodes.map((node) => (
									<MenuItem nodeType={node} key={node} />
								))}
							</div>
						</div>
					))}
					<button
						className="btn btn-xs btn-ghost btn-natural h-fit w-fit"
						onClick={() => {
							setIsMenuOpen(false);
						}}
					>
						<ChevronLeftIcon className="h-4 w-4 text-base-content" />
					</button>
				</div>
			)}
		</div>
	);
}
