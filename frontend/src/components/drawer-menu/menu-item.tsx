import { useTranslation } from 'next-i18next';
import { useDrag } from 'react-dnd';

import { TypeSVGMap } from '@/assets';
import { ServiceNodeType, TypeTagMap } from '@/constants';

export interface MenuItemProps {
	nodeType: ServiceNodeType;
}

export function MenuItem({ nodeType }: MenuItemProps) {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'MenuItem',
		item: { nodeType },
		collect: (monitor) => ({ isDragging: monitor.isDragging() }),
	}));

	const { t } = useTranslation('assets');

	const { SVG, props } = TypeSVGMap[nodeType];
	const tag = TypeTagMap[nodeType];

	return (
		<li className="p-2">
			<div
				ref={drag}
				className={`flex justify-between p-2 bg-neutral ${
					isDragging ? 'opacity-60' : 'opacity-100'
				}`}
			>
				<figure>
					<SVG height={16} width={16} {...props} />
				</figure>

				<h2 className="text-xs text-base-content">{t(tag)}</h2>
			</div>
		</li>
	);
}
