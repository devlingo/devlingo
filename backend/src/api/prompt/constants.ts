import { EdgeType, ServiceType } from 'shared/constants';

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
		data: {
			nodeType: ${Object.values(ServiceType).join(' | ')};
			formData: {
				nodeName: string;
			};
		};
		id: string;
		position: {
			x: number;
			ty: number;
		};
	}[]
	edges: {
		id: string;
		source: string;
		target: string;
		type: ${Object.values(EdgeType).join(' | ')};
	}[]
}
`;
