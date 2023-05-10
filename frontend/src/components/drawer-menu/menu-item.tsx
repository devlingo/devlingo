import { useTranslation } from 'next-i18next';
import { useDrag } from 'react-dnd';

import { NodeType, TypeIconMap, TypeTagMap } from '@/constants';

export interface MenuItemProps {
	type: NodeType;
}

export function MenuItem({ type }: MenuItemProps) {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'MenuItem',
		item: { type },
		collect: (monitor) => ({ isDragging: monitor.isDragging() }),
	}));

	const { t } = useTranslation('assets');

	const Icon = TypeIconMap[type];
	const tag = TypeTagMap[type];

	return (
		<li className="p-2">
			<div
				ref={drag}
				className={`flex justify-between p-2 bg-neutral ${
					isDragging ? 'opacity-60' : 'opacity-100'
				}`}
			>
				<figure>
					<Icon width={16} height={16} alt={t(`${tag}-logo-alt`)} />
				</figure>

				<h2 className="text-xs text-base-content">{t(tag)}</h2>
			</div>
		</li>
	);
}
