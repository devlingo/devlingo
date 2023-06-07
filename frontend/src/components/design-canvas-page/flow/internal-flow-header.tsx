import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';

import { TypeSVGMap } from '@/assets';
import { NAV_BAR_HEIGHT_PIXELS, TypeTagMap } from '@/constants';
import { useSetExpandedNode } from '@/hooks/use-design-canvas-store';
import { ServiceNodeData } from '@/types';

export function InternalFlowHeader({ nodeType, formData }: ServiceNodeData) {
	const setExpandedNode = useSetExpandedNode();

	const { t } = useTranslation('assets');
	const { SVG } = TypeSVGMap[nodeType];

	return (
		<div
			className={`bg-base-100 border-b-2 border-base-200 w-full h-[${NAV_BAR_HEIGHT_PIXELS}px] flex-none`}
		>
			<div className="flex justify-between p-4 border-b-2 border-b-neutral gap-4">
				<div className="flex justify-between gap-4">
					<figure>
						<SVG className="w-12 h-12" />
					</figure>
					<div>
						<h2 className="text-base-content text-md">
							{t(TypeTagMap[nodeType])}
						</h2>
						{formData.nodeName && (
							<p className="text-base-content text-sm">
								{formData.nodeName}
							</p>
						)}
					</div>
				</div>
				<button>
					<ChevronLeftIcon
						className="h-12 w-12 text-base-content hover:text-primary"
						onClick={() => {
							setExpandedNode(null);
						}}
					/>
				</button>
			</div>
		</div>
	);
}
