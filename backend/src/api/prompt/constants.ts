import { EdgeType, ServiceType, SystemComponentType } from 'shared/constants';

export enum PromptCommand {
	AddEdge = 'A_E',
	AddNode = 'A_N',
	RemoveEdge = 'R_E',
	RemoveNode = 'R_N',
	UpdateEdge = 'U_E',
	UpdateNode = 'U_N',
}

export const ExampleInterface = `
interface DesignData {
	nodes: {
		nodeType: ${[
			...Object.values(ServiceType),
			...Object.values(SystemComponentType),
		].join(' | ')};
		nodeName: string;
		id: string;
		xPos: number;
		yPos: number;
	}[]
	edges: {
		id: string;
		source: string;
		target: string;
		type: ${Object.values(EdgeType).join(' | ')};
	}[]
}
`;
