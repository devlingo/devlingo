import {
	Design,
	Project,
	UserProjectPermission,
	DesignVersion,
} from '@prisma/client';

export type ProjectResponseData = Project & {
	designs: [Omit<Design, 'projectId'>];
	userPermissions: [Omit<UserProjectPermission, 'projectId'>];
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

export type DesignVersionResponse = Omit<DesignVersion, 'data'> & {
	data:
		| {
				nodes: NodeData[];
				edges: EdgeData[];
		  }
		| null
		| string;
};

export type DesignResponseData = Design & {
	versions: Omit<DesignVersion, 'designId' | 'data'>[];
};
