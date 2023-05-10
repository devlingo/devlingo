import { ReactFlowInstance } from '@reactflow/core';
import { nanoid } from 'nanoid';
import { Node } from 'reactflow';

import { NestJSIcon, NextJSIcon } from '@/assets';
import { NodeType } from '@/constants';

export function createNode({
	data,
	reactFlowInstance,
	type,
	x,
	y,
}: {
	data: Record<string, any>;
	reactFlowInstance: ReactFlowInstance;
	type: NodeType;
	x: number;
	y: number;
}): Node {
	return {
		id: nanoid(),
		type: 'NodeWithIcon',
		data: {
			Icon: type === NodeType.NestJs ? NestJSIcon : NextJSIcon,
			tag: type === NodeType.NestJs ? 'nest-service' : 'next-service',
			name: 'My Service',
			type,
			internalNodes: [],
			internalEdges: [],
			...data,
		},
		position: reactFlowInstance.project({ x, y }),
	};
}
