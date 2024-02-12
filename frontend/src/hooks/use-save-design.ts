import { useEffect, useState } from 'react';
import {
	CustomEdgeType,
	CustomNodeType,
	DesignResponseData,
	VersionData,
	ViewPortData,
} from 'shared/types';

import { createVersion } from '@/api';
import { wait } from '@/utils/time';

export interface UseSaveDesignProps {
	currentDesign: DesignResponseData;
	debounceThreshold: number;
	edges: CustomEdgeType[];
	nodes: CustomNodeType[];
	saveCheckInterval: number;
	saveDelay: number;
	viewport: ViewPortData;
}

export function useSaveDesign({
	currentDesign,
	debounceThreshold,
	edges,
	nodes,
	saveCheckInterval,
	saveDelay,
	viewport,
}: UseSaveDesignProps): {
	error: Error | null;
	isSaving: boolean;
	setLastChangeTimestamp: (timestamp: number) => void;
} {
	const [lastChangeTimestamp, setLastChangeTimestamp] = useState<
		null | number
	>(null);
	const [isSaving, setIsSaving] = useState(false);
	const [error, setError] = useState<null | Error>(null);

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (
				!isSaving &&
				lastChangeTimestamp &&
				Date.now() - lastChangeTimestamp >= debounceThreshold
			) {
				(async () => {
					const startTime = Date.now();
					setLastChangeTimestamp(null);
					setError(null);
					setIsSaving(true);
					try {
						const data = {
							edges,
							nodes,
							viewport,
						} satisfies VersionData;

						await createVersion({
							data,
							designId: currentDesign.id,
							projectId: currentDesign.projectId,
						});
					} catch (error_: unknown) {
						setError(error_ as Error);
					} finally {
						// we artificially insert a delay here to ensure there is a nice looking animation for the loader
						const timePassed = Date.now() - startTime;
						if (timePassed < saveDelay) {
							await wait(saveDelay - timePassed - 1);
						}
						setIsSaving(false);
					}
				})();
			}
		}, saveCheckInterval);
		return () => {
			clearInterval(intervalId);
		};
	});

	return {
		error,
		isSaving,
		setLastChangeTimestamp,
	};
}
