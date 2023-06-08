import { useTranslation } from 'next-i18next';
import { useDrag } from 'react-dnd';

import { TypeSVGMap } from '@/assets';
import {
	ContainerNodeType,
	InternalNodeType,
	ServiceNodeType,
	TypeTagMap,
} from '@/constants';

export interface MenuItemProps {
	nodeType: ServiceNodeType | InternalNodeType | ContainerNodeType;
}

export function MenuItem({ nodeType }: MenuItemProps) {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'MenuItem',
		item: { nodeType },
		collect: (monitor) => ({ isDragging: monitor.isDragging() }),
	}));

	const { t } = useTranslation('assets');

	const { SVG } = TypeSVGMap[nodeType];
	const tag = TypeTagMap[nodeType];

	return (
		<li className="p-2 list-none text-base-content">
			<div
				ref={drag}
				className={`flex justify-start p-2 bg-transparent hover:bg-neutral hover:text-neutral-content rounded-2xl  ${
					isDragging ? 'opacity-60' : 'opacity-100'
				}`}
			>
				<figure>
					<SVG height={16} width={16} />
				</figure>

				<h2 className="text-xs pl-2 overflow:hidden">{t(tag)}</h2>
			</div>
		</li>
	);
}
