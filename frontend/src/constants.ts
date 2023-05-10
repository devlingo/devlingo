import { IconProps, NestJSIcon, NextJSIcon } from '@/assets';

export enum NodeType {
	NestJs = 'NestJS',
	NextJs = 'NextJS',
}

export const TypeTagMap: Record<NodeType, string> = {
	[NodeType.NestJs]: 'nest-service',
	[NodeType.NextJs]: 'next-service',
};

export const TypeIconMap: Record<NodeType, React.ComponentType<IconProps>> = {
	[NodeType.NestJs]: NestJSIcon,
	[NodeType.NextJs]: NextJSIcon,
};
