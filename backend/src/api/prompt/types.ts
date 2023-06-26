export interface PromptRequest {
	promptContent: string;
	designData: DesignData;
	nodeTypes: string[];
	edgeTypes: string[];
}

export interface DesignData {
	nodes: NodeData[];
	edges: EdgeData[];
}

export interface NodeData {
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
}

export interface EdgeData {
	id: string;
	source: string;
	target: string;
	type: string;
}
