import { useEffect, useState } from 'react';
import { createVersion } from '@/api';
import { useCurrentDesign } from '@/stores/api-store';
import { EdgeData, NodeData, VersionData, ViewPortData } from 'shared/types';
import { log } from '@/utils/logging';
import { TimeUnit } from 'shared/constants';
import { wait } from '@/utils/time';

export function useSaveDesign({
	saveCheckInterval,
	debounceThreshold,
	nodes,
	edges,
	viewPort,
}: {
	saveCheckInterval: number;
	debounceThreshold: number;
	nodes: NodeData[];
	edges: EdgeData[];
	viewPort: ViewPortData;
}): {
	isSaving: boolean;
	setLastChangeTimestamp: (timestamp: number) => void;
} {
	const [lastChangeTimestamp, setLastChangeTimestamp] = useState<
		null | number
	>(null);
	const [isSaving, setIsSaving] = useState(false);

	const currentDesign = useCurrentDesign()!;

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (
				!isSaving &&
				lastChangeTimestamp &&
				new Date().getTime() - lastChangeTimestamp >= debounceThreshold
			) {
				(async () => {
					const startTime = new Date().getTime();
					setIsSaving(true);
					try {
						const data = {
							nodes,
							edges,
							viewPort,
						} satisfies VersionData;

						await createVersion({
							projectId: currentDesign.projectId,
							designId: currentDesign.id,
							data,
						});
					} catch (e: unknown) {
						log('error saving data', e as Error);
					} finally {
						setLastChangeTimestamp(null);
						// we artificially insert a delay here to ensure there is a nice looking animation for the loader
						while (
							new Date().getTime() - startTime <
							TimeUnit.OneSecondInMilliseconds * 3
						) {
							await wait(TimeUnit.OneSecondInMilliseconds);
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

	return { isSaving, setLastChangeTimestamp };
}
