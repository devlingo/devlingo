import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Navigation } from '@/constants';
import { useUserProfile, useUserProjects } from '@/hooks/use-api';
import { User } from '@/types';
import { log } from '@/utils/logging';

export function LoggedInView({ user }: { user: User }) {
	const { data, error, isLoading } = useUserProjects();

	return (
		<div>
			{isLoading && <div className="loading loading-lg" />}
			{error && <div className="alert alert-error">{error.message}</div>}
			{data && (
				<div className="alert alert-success">
					Welcome {user.name} here are your projects:{' '}
					{JSON.stringify(data)}
				</div>
			)}
		</div>
	);
}

export default function Projects() {
	const { data, error, isLoading } = useUserProfile();
	const router = useRouter();

	useEffect(() => {
		if (!!error && Object.keys(error).length) {
			log('error', error);
			void router.push(Navigation.Login);
		}
	}, [error]);

	return (
		<main className="h-screen w-screen bg-base-300 flex items-center">
			{isLoading || !data ? (
				<div className="loading loading-lg" />
			) : (
				<LoggedInView user={data} />
			)}
		</main>
	);
}
