import {
	Design,
	Project,
	UserProjectPermission,
	Version,
} from '@prisma/client';
import {
	CustomEdgeData,
	CustomEdgeType,
	CustomNodeData,
	CustomNodeType,
} from 'shared/types/nodes';

export type ProjectResponseData = Project & {
	designs: Design[];
	userPermissions: Omit<UserProjectPermission, 'projectId'>[];
};

export interface NodeData {
	data: CustomNodeData;
	id: string;
	position: {
		x: number;
		y: number;
	};
	type: 'CustomNode';
}

export interface EdgeData {
	data: CustomEdgeData;
	id: string;
	source: string;
	target: string;
	sourceHandle?: string | null;
	targetHandle?: string | null;
	type: 'CustomEdge';
}

export interface ViewPortData {
	x: number;
	y: number;
	zoom: number;
}

export interface DesignData {
	nodes: CustomNodeType[];
	edges: CustomEdgeType[];
}

export interface VersionData extends DesignData {
	viewport: ViewPortData;
}

export type VersionResponse = Omit<Version, 'data'> & {
	data: VersionData;
};

export type DesignResponseData = Design & {
	versions: Omit<Version, 'designId' | 'data'>[];
};
