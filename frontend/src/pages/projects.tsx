import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Navigation, ONE_SECOND_IN_MILLISECONDS } from '@/constants';
import { useUserProfile } from '@/hooks/use-api';
import { useToken } from '@/hooks/use-user-store';

export function LoggedInView({ token }: { token: string }) {
	const { data, error, isLoading } = useUserProfile(token);

	return (
		<div>
			{isLoading && <div className="loading loading-lg" />}
			{error && <div className="alert alert-error">{error.message}</div>}
			{data && (
				<div className="alert alert-success">
					Welcome {JSON.stringify(data)}
				</div>
			)}
		</div>
	);
}

export default function Projects() {
	const token = useToken();
	const router = useRouter();

	useEffect(() => {
		setTimeout(() => {
			if (!token) {
				void router.push(Navigation.Login);
			}
		}, ONE_SECOND_IN_MILLISECONDS);
	});

	return token ? (
		<LoggedInView token={token} />
	) : (
		<div className="loading loading-lg" />
	);
}
