import {
	Design,
	Project,
	UserProjectPermission,
	Version,
} from '@prisma/client';

export type ProjectResponseData = Project & {
	designs: Design[];
	userPermissions: Omit<UserProjectPermission, 'projectId'>[];
};

export type NodeData = {
	data: {
		nodeType: string;
		formData: {
			nodeName: string;
		};
	};
	id: string;
	position: {
		x: number;
		y: number;
	};
	type: string;
};

export type EdgeData = {
	id: string;
	source: string;
	target: string;
	sourceHandle: string;
	targetHandle: string;
	type: string;
};

export type VersionResponse = Omit<Version, 'data'> & {
	data:
		| {
				nodes: NodeData[];
				edges: EdgeData[];
		  }
		| null
		| string;
};

export type DesignResponseData = Design & {
	versions: Omit<Version, 'designId' | 'data'>[];
};
