import { useRouter } from 'next/router';

import { Navigation } from '@/constants';
import { useUserProfile } from '@/hooks/use-user-profile';
import { useToken } from '@/hooks/use-user-store';

export function LoggedInView({ token }: { token: string }) {
	const { user, error, isLoading } = useUserProfile(token);

	return (
		<div>
			{isLoading && <div className="loading loading-lg" />}
			{error && <div className="alert alert-error">{error.message}</div>}
			{user && (
				<div className="alert alert-success">
					Welcome {JSON.stringify(user)}
				</div>
			)}
		</div>
	);
}

export default function Projects() {
	const token = useToken();
	const router = useRouter();

	if (!token) {
		void router.push(Navigation.Login);

		return <div className="loading loading-lg" />;
	}

	return <LoggedInView token={token} />;
}
