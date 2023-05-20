import { createContext } from 'react';
import { Node } from 'reactflow';

import { InternalNodeData, ServiceNodeData } from '@/types';

export const ThemeContext = createContext<{
	setTheme: (theme: string) => void;
}>({ setTheme: () => undefined });

export const NodeContext = createContext<{
	childNodes: Node<InternalNodeData>[];
	expandedNode: Node<ServiceNodeData> | null;
	handleNodeConfig: (nodeId: string | null) => void;
	handleNodeExpand: (nodeId: string | null) => void;
}>({
	childNodes: [],
	expandedNode: null,
	handleNodeConfig: () => undefined,
	handleNodeExpand: () => undefined,
});
