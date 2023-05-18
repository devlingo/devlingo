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
	reactFlowInstance: ReactFlowInstance;
	x: number;
	y: number;
	data: Partial<ServiceNodeData> & { nodeType: ServiceNodeType };
}): Node {
	return {
		id: nanoid(),
		type: 'ServiceNode',
		data: { nodeType, allowExpansion, formData },
		position: reactFlowInstance.project({ x, y }),
	};
}
