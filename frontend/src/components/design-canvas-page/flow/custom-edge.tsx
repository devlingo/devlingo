import {
	BezierEdge,
	EdgeProps,
	SimpleBezierEdge,
	SmoothStepEdge,
	StepEdge,
	StraightEdge,
} from 'reactflow';
import { EdgeType } from 'shared/constants';
import { CustomEdgeData } from 'shared/types';
import { ContextMenuType } from '@/constants/context-menu.constants';
import { useContextMenu } from '@/hooks/use-context-menu';
import { useEffect, useState } from 'react';

const edgeTypeToEdgeComponentMap: Record<EdgeType, React.FC<EdgeProps>> = {
	[EdgeType.StraightEdge]: StraightEdge,
	[EdgeType.BezierEdge]: BezierEdge,
	[EdgeType.StepEdge]: StepEdge,
	[EdgeType.SmoothStepEdg]: SmoothStepEdge,
	[EdgeType.SimpleBezier]: SimpleBezierEdge,
};

export function CustomEdge({
	data: { edgeType } = { edgeType: EdgeType.BezierEdge },
	id: edgeId,
	...props
}: EdgeProps<CustomEdgeData>) {
	const [isRendered, setIsRendered] = useState(false);
	const EdgeComponent = edgeTypeToEdgeComponentMap[edgeType];
	const onContextMenu = useContextMenu(ContextMenuType.CustomEdge, edgeId);

	useEffect(() => {
		setIsRendered(true);
	}, []);

	useEffect(() => {
		if (isRendered) {
			// in order to set an event listener on the edge, we have to do some hacky stuff here.
			// FIXME: remove this once reactflow resolve this issue.
			// see: https://github.com/wbkd/react-flow/issues/3224
			const element = document.getElementById(`${edgeId}-marker`)!;
			const parent = element?.parentElement!;
			const interactionContainer = Array.from(parent.childNodes).filter(
				(node) => {
					return (node as HTMLElement).classList.contains(
						'react-flow__edge-interaction',
					);
				},
			)[0];
			interactionContainer.addEventListener(
				'contextmenu',
				onContextMenu as unknown as EventListener,
			);
			return () => {
				interactionContainer.removeEventListener(
					'contextmenu',
					onContextMenu as unknown as EventListener,
				);
			};
		}
	}, [isRendered]);

	return (
		<>
			<EdgeComponent id={edgeId} {...props} />
			<span id={`${edgeId}-marker`} />
		</>
	);
}
