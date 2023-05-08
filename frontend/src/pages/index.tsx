import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
	Background,
	BackgroundVariant,
	Controls,
	Node,
	ReactFlow,
	ReactFlowProvider,
	useNodesState,
} from 'reactflow';

export async function getStaticProps({ locale }: { locale: string }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['home', 'navbar'])),
		},
	};
}

const initialNodes: Node[] = [
	{
		id: '1',
		data: { label: 'Node 1' },
		position: { x: 50, y: 50 },
	},
];

export default function Flow() {
	const [nodes, , onNodesChange] = useNodesState(initialNodes);

	return (
		<ReactFlowProvider>
			<ReactFlow
				nodes={nodes}
				onNodesChange={onNodesChange}
				proOptions={{ hideAttribution: true }}
			>
				<Controls />
				<Background variant={BackgroundVariant.Dots} />
			</ReactFlow>
		</ReactFlowProvider>
	);
}
