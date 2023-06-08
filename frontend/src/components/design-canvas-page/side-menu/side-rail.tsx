import { ChevronLeftIcon, CommandLineIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';

import { TypeSVGMap } from '@/assets';
import { MenuItem } from '@/components/design-canvas-page/side-menu/menu-item';
import {
	ContainerNodeType,
	Dimensions,
	InternalNodeType,
	MenuItemType,
	NodeCategory,
	ServiceNodeType,
} from '@/constants';

interface MenuCategory {
	category: NodeCategory;
	nodes: (ServiceNodeType | ContainerNodeType | InternalNodeType)[];
}

const menuItems: {
	icon: React.ComponentType<React.SVGProps<SVGElement>>;
	categories: MenuCategory[];
}[] = [
	{
		icon: TypeSVGMap[MenuItemType.Frontend].SVG,
		categories: [
			{
				category: NodeCategory.Javascript,
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
				category: NodeCategory.Mobile,
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
		categories: [
			{
				category: NodeCategory.Javascript,
				nodes: [
					ServiceNodeType.NestJs,
					ServiceNodeType.ExpressJs,
					ServiceNodeType.Fastify,
					ServiceNodeType.HapiJs,
					ServiceNodeType.KoaJs,
				],
			},
			{
				category: NodeCategory.Python,
				nodes: [
					ServiceNodeType.Django,
					ServiceNodeType.Litestar,
					ServiceNodeType.Flask,
					ServiceNodeType.FastAPI,
				],
			},
			{
				category: NodeCategory.Java,
				nodes: [],
			},
			{
				category: NodeCategory.Go,
				nodes: [],
			},
			{
				category: NodeCategory.DotNet,
				nodes: [],
			},
		],
	},
	{
		icon: TypeSVGMap[MenuItemType.Database].SVG,
		categories: [
			{
				category: NodeCategory.NoSQL,
				nodes: [
					ServiceNodeType.Redis,
					ServiceNodeType.Firestore,
					ServiceNodeType.DynamoDB,
					ServiceNodeType.CosmosDB,
					ServiceNodeType.Cassandra,
				],
			},
			{
				category: NodeCategory.SQL,
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
				category: NodeCategory.Graph,
				nodes: [],
			},
			{
				category: NodeCategory.Warehouse,
				nodes: [],
			},
			{
				category: NodeCategory.Vector,
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
				category: NodeCategory.Marketing,
				nodes: [ServiceNodeType.SendGrid, ServiceNodeType.MailGun],
			},
			{
				category: NodeCategory.AI,
				nodes: [ServiceNodeType.OpenAi],
			},
			{ category: NodeCategory.Payment, nodes: [ServiceNodeType.Stripe] },
		],
	},
];

export function RailBaseMenu({
	activeItem,
	closeMenuHandler,
	handleItemHover,
	isMenuOpen,
	togglePromptModal,
}: {
	activeItem: number;
	closeMenuHandler: () => void;
	handleItemHover: (i: number) => void;
	isMenuOpen: boolean;
	togglePromptModal: () => void;
}) {
	return (
		<div className="flex flex-col border-r-2 border-base-200">
			<button
				className="btn btn-primary btn-md p-2 my-6 mt-8 rounded-lg shadow-md mx-auto"
				onClick={() => {
					if (isMenuOpen) {
						closeMenuHandler();
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
	);
}

export function RailExpandedMenu({
	categories,
	closeMenuHandler,
}: {
	categories: MenuCategory[];
	closeMenuHandler: () => void;
}) {
	return (
		<div className="menu justify-between mt-4 bg-base-100 border-base-200 transition-all duration-300 ease-in-out grow w-fit max-h-full overscroll-y-auto border-r-2">
			<div>
				{categories.map((item, j) => (
					<div
						key={j}
						tabIndex={0}
						className="collapse text-base-content collapse-arrow bg-base-100 rounded-box transition-opacity duration-700 ease-in-out flex-none hover:opacity-100 opacity-80"
					>
						<input type="checkbox" />
						<div className="collapse-title text-sm font-medium">
							{item.category}
						</div>

						<div className="collapse-content">
							{item.nodes.map((node) => (
								<MenuItem nodeType={node} key={node} />
							))}
						</div>
					</div>
				))}
			</div>
			<div className="self-end p-3">
				<button
					className="btn btn-xs btn-ghost btn-natural h-fit w-fit"
					onClick={closeMenuHandler}
				>
					<ChevronLeftIcon className="h-6 w-6 text-base-content" />
				</button>
			</div>
		</div>
	);
}

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

	const handleMenuClose = () => {
		setIsMenuOpen(false);
		setActiveItem(0);
	};

	return (
		<div
			className={`flex bg-base-100 h-[calc(100vh-${
				Dimensions.Sixteen
			})] ${isMenuOpen ? 'grow' : 'shrink'}`}
		>
			<RailBaseMenu
				activeItem={activeItem}
				handleItemHover={handleItemHover}
				isMenuOpen={isMenuOpen}
				togglePromptModal={togglePromptModal}
				closeMenuHandler={handleMenuClose}
			/>
			{isMenuOpen && (
				<RailExpandedMenu
					categories={menuItems[activeItem].categories}
					closeMenuHandler={handleMenuClose}
				/>
			)}
		</div>
	);
}
