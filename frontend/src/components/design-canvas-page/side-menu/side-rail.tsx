import {
	ChevronLeftIcon,
	CommandLineIcon,
	DocumentArrowDownIcon,
	PhotoIcon,
	ShareIcon,
} from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { ServiceType } from 'shared/constants';
import { NodeType } from 'shared/types';

import { TypeSVGMap } from '@/assets';
import { MenuItem } from '@/components/design-canvas-page/side-menu/menu-item';
import { Dimensions, MenuCategory, MenuItemType } from '@/constants';
import { useDisplayNodes } from '@/stores/design-store';
import { ImageType } from '@/types';
import { downloadFile } from '@/utils/file';
import { convertNodesToImageString } from '@/utils/node';

interface MenuCategoryWithNodes {
	category: MenuCategory;
	nodes: NodeType[];
}

const menuItems: {
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
					ServiceType.MicrosoftSQL,
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
				category: MenuCategory.Marketing,
				nodes: [ServiceType.SendGrid, ServiceType.MailGun],
			},
			{
				category: MenuCategory.AI,
				nodes: [ServiceType.OpenAi],
			},
			{ category: MenuCategory.Payment, nodes: [ServiceType.Stripe] },
		],
	},
];

export function ExportFlowCanvasToImage() {
	const displayNodes = useDisplayNodes();
	const handleDownload = async (imageType: ImageType) => {
		const backgroundColor = `hsl(${getComputedStyle(
			document.querySelector(':root')!,
		).getPropertyValue('--b3')})`;

		const dataUrl = await convertNodesToImageString({
			nodes: displayNodes,
			imageType,
			backgroundColor,
		});

		// FIXME: filenames should be meaningful. For now this works though.
		downloadFile({ dataUrl, filename: Date.now().toString() });
	};

	return (
		<li className="dropdown dropdown-top">
			<label
				tabIndex={0}
				className="btn btn-ghost rounded-full opacity-80"
			>
				<PhotoIcon className="h-6 w-6 text-base-content mt-1" />
			</label>
			<ul
				tabIndex={0}
				className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-fit z-10 border-2 border-base-200"
			>
				{(['png', 'jpeg', 'svg'] as ImageType[]).map((imageType, i) => (
					<li key={i}>
						<a
							className="text-base-content"
							onClick={() => {
								void handleDownload(imageType);
							}}
						>
							save as {imageType}
						</a>
					</li>
				))}
			</ul>
		</li>
	);
}

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
		<div className="flex flex-col justify-between border-r-2 border-base-200">
			<div className="flex flex-col">
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
				<ul className="menu p-2 rounded-box gap-2">
					{menuItems.map((item, i) => (
						<li key={i} tabIndex={0}>
							<figure
								className={`block rounded-full ${
									isMenuOpen && activeItem === i
										? 'opacity-100'
										: 'opacity-60'
								}`}
								onMouseEnter={() => handleItemHover(i)}
							>
								<item.icon className="h-6 w-6 text-base-content" />
							</figure>
						</li>
					))}
				</ul>
			</div>
			<div>
				<div className="divider" />
				<ul className="menu rounded-box pb-4">
					<li>
						<button className="btn btn-ghost rounded-full opacity-80">
							<ShareIcon className="h-6 w-6 text-base-content mt-1" />
						</button>
					</li>
					<ExportFlowCanvasToImage />
					<li>
						<button className="btn btn-ghost rounded-full opacity-80">
							<DocumentArrowDownIcon className="h-6 w-6 text-base-content mt-1" />
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
}

export function RailExpandedMenu({
	categories,
	closeMenuHandler,
}: {
	categories: MenuCategoryWithNodes[];
	closeMenuHandler: () => void;
}) {
	return (
		<div className="menu justify-between mt-4 bg-base-100 border-base-200 transition-all duration-300 ease-in-out grow w-fit overscroll-y-auto border-r-2 overflow-y-scroll no-scrollbar">
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
			}px)] ${isMenuOpen ? 'grow' : 'shrink'}`}
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
