export enum ServiceNodeType {
	NestJs = 'NestJS',
	NextJs = 'NextJS',
}

export enum InternalNodeType {
	Controller = 'Controller',
	Service = 'Service',
	Endpoint = 'Endpoint',
}

export const TypeTagMap: Record<ServiceNodeType | InternalNodeType, string> = {
	[ServiceNodeType.NestJs]: 'nest-service',
	[ServiceNodeType.NextJs]: 'next-service',
	[InternalNodeType.Controller]: 'controller',
	[InternalNodeType.Service]: 'service',
	[InternalNodeType.Endpoint]: 'endpoint',
};

export const REM = 16;

export const NAV_BAR_HEIGHT_PIXELS = 56;
export const FOOTER_HEIGHT_PIXELS = 40;
