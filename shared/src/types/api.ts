import {
	Design,
	Project,
	UserProjectPermission,
	Version,
} from '@prisma/client';
import { NodeType } from 'shared/types/nodes';

export type ProjectResponseData = Project & {
	designs: Design[];
	userPermissions: Omit<UserProjectPermission, 'projectId'>[];
};

export interface NodeData {
	data: {
		nodeType: NodeType;
		formData: {
			nodeName: string;
		};
	};
	id: string;
	position: {
		x: number;
		y: number;
	};
	type?: string;
}

export interface EdgeData {
	id: string;
	source: string;
	target: string;
	sourceHandle?: string | null;
	targetHandle?: string | null;
	type?: string;
}

export interface ViewPortData {
	x: number;
	y: number;
	zoom: number;
}

export interface DesignData {
	nodes: NodeData[];
	edges: EdgeData[];
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
