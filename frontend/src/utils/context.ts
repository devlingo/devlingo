import { createContext } from 'react';
import { Node } from 'reactflow';

import { ServiceNodeData } from '@/types';

export const ThemeContext = createContext<{
	currentTheme: string;
	setTheme: (theme: string) => void;
}>({ currentTheme: 'dracula', setTheme: () => undefined });

export const NodeContext = createContext<{
	expandedNode: Node<ServiceNodeData> | null;
	handleNodeConfig: (
		nodeId: string | null,
		parentNodeId?: string | null,
	) => void;
	handleNodeExpand: (nodeId: string | null) => void;
}>({
	expandedNode: null,
	handleNodeConfig: () => undefined,
	handleNodeExpand: () => undefined,
});
