import { createContext } from 'react';
import { Node } from 'reactflow';

import { InternalNodeData, ServiceNodeData } from '@/types';

export const ThemeContext = createContext<{
	currentTheme: string;
	setTheme: (theme: string) => void;
}>({ currentTheme: 'dracula', setTheme: () => undefined });

export const NodeContext = createContext<{
	displayNodes: Node<ServiceNodeData | InternalNodeData>[];
	expandedNode: Node<ServiceNodeData> | null;
	handleNodeConfig: (
		nodeId: string | null,
		parentNodeId?: string | null,
	) => void;
	handleNodeExpand: (nodeId: string | null) => void;
}>({
	displayNodes: [],
	expandedNode: null,
	handleNodeConfig: () => undefined,
	handleNodeExpand: () => undefined,
});
