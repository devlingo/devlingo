import { createContext } from 'react';
import { Node } from 'reactflow';

import { InternalNodeData, ServiceNodeData } from '@/types';

export const ThemeContext = createContext<{
	setTheme: (theme: string) => void;
}>({ setTheme: () => undefined });

export const NodeContext = createContext<{
	handleNodeConfig: (nodeId: string | null) => void;
	handleNodeExpand: (nodeId: string | null) => void;
	expandedNode: Node<ServiceNodeData> | null;
	childNodes: Node<InternalNodeData>[];
}>({
	handleNodeConfig: () => undefined,
	handleNodeExpand: () => undefined,
	expandedNode: null,
	childNodes: [],
});
