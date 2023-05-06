import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
	Background,
	BackgroundProps,
	BackgroundVariant,
	Node,
	ReactFlow,
	ReactFlowProvider,
	useNodesState,
} from 'reactflow';

export async function getStaticProps({ locale }: { locale: string }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['home'])),
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

export function Flow({
	id,
	bgProps,
}: {
	id: string;
	bgProps: BackgroundProps[];
}) {
	const [nodes, , onNodesChange] = useNodesState(initialNodes);

	return (
		<ReactFlowProvider>
			<ReactFlow id={id} nodes={nodes} onNodesChange={onNodesChange}>
				{bgProps.map((props, idx) => (
					<Background key={idx} id={idx.toString()} {...props} />
				))}
			</ReactFlow>
		</ReactFlowProvider>
	);
}

export default function Index() {
	return (
		<div className="w-screen h-screen">
			<Flow
				id="flow-a"
				bgProps={[
					{
						variant: BackgroundVariant.Dots,
						color: 'yellow',
						size: 2,
					},
				]}
			/>
		</div>
	);
}
