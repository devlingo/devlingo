import { ReactFlowInstance } from '@reactflow/core';
import { nanoid } from 'nanoid';
import { Node } from 'reactflow';

import { ServiceNodeType } from '@/constants';
import { ServiceNodeData } from '@/types';

export function createNode({
	reactFlowInstance,
	data: { nodeType, allowExpansion = false, formData = {} },
	x,
	y,
}: {
	data: Partial<ServiceNodeData> & { nodeType: ServiceNodeType };
	reactFlowInstance: ReactFlowInstance;
	x: number;
	y: number;
}): Node {
	return {
		data: { nodeType, allowExpansion, formData },
		id: nanoid(),
		position: reactFlowInstance.project({ x, y }),
		type: 'ServiceNode',
	};
}
