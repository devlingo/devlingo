/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Controller from '@/assets/internal-nodes/controller.svg';
import Endpoint from '@/assets/internal-nodes/endpoint.svg';
import Service from '@/assets/internal-nodes/service.svg';
import NestJS from '@/assets/services-nodes/nestjs-logo.svg';
import NextJS from '@/assets/services-nodes/nextjs-logo.svg';
import { InternalNodeType, ServiceNodeType } from '@/constants';

export { Controller, Endpoint, NestJS, NextJS, Service };

export const TypeSVGMap: Record<
	ServiceNodeType | InternalNodeType,
	{
		SVG: React.ComponentType<React.SVGProps<SVGElement>>;
		props?: Partial<React.SVGProps<SVGElement>>;
	}
> = {
	[ServiceNodeType.NestJs]: { SVG: NestJS },
	[ServiceNodeType.NextJs]: { SVG: NextJS },
	[InternalNodeType.Controller]: { SVG: Controller },
	[InternalNodeType.Endpoint]: { SVG: Endpoint },
	[InternalNodeType.Service]: { SVG: Service },
};
