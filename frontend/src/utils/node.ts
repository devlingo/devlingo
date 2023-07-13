import { getRectOfNodes, getTransformForBounds } from '@reactflow/core';
import { toJpeg, toPng, toSvg } from 'html-to-image';
import { Options as HtmlToImageOptions } from 'html-to-image/lib/types';
import { Node } from 'reactflow';
import { NodeShape } from 'shared/constants';
import { CustomNodeData, CustomNodeType } from 'shared/types';
import { v4 as uuidv4 } from 'uuid';

import { Dimensions, NodeDefaultSizePX } from '@/constants';
import { ImageType } from '@/types';

export type CreateNodeParams = {
	data: Pick<CustomNodeData, 'nodeType'> & {
		formData?: Record<string, any>;
		shape?: NodeShape;
		height?: number;
		width?: number;
	};
	position: { x: number; y: number };
} & Omit<Partial<Node<CustomNodeData>>, 'data' | 'type' | 'className'>;

export function createNode({
	id,
	data: { shape = NodeShape.Rectangle, formData, nodeType },
	position,
	...props
}: Omit<CreateNodeParams, 'height' | 'width'>): CustomNodeType {
	return {
		...props,
		data: {
			height: NodeDefaultSizePX,
			width: NodeDefaultSizePX,
			shape,
			nodeType,
			formData: formData ?? { nodeName: 'Untitled' },
		},
		id: id ?? uuidv4(),
		position,
		type: 'CustomNode',
	} as CustomNodeType;
}

const imageWidth = 1024;
const imageHeight = 768;

const imageExporterMap: Record<
	ImageType,
	typeof toPng | typeof toJpeg | typeof toSvg
> = {
	png: toPng,
	jpeg: toJpeg,
	svg: toSvg,
};

export async function convertNodesToImageString({
	nodes,
	imageType,
	backgroundColor,
	...options
}: {
	nodes: Node[];
	imageType: ImageType;
} & HtmlToImageOptions & { backgroundColor: string }) {
	// we calculate a transform for the nodes so that all nodes are visible
	// we then overwrite the transform of the `.react-flow__viewport` element
	// with the style option of the html-to-image library
	const nodesBounds = getRectOfNodes(nodes);
	const transform = getTransformForBounds(
		nodesBounds,
		imageWidth,
		imageHeight,
		Dimensions.HalfPixel,
		Dimensions.OnePixel * 2,
	);

	const imageExporter = imageExporterMap[imageType];

	return await imageExporter(
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
		document.querySelector('.react-flow__viewport')! as HTMLElement,
		{
			backgroundColor,
			width: options.width ?? imageWidth,
			height: options.height ?? imageHeight,
			style: {
				width: (options.width ?? imageWidth).toString(),
				height: (options.height ?? imageHeight).toString(),
				transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
			},
			...options,
		},
	);
}
