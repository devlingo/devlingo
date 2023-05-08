import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';

export const FullHeightPage = () => (
	// @ts-expect-error, booleans must be passed as strings
	<style global="true" jsx="true">{`
		html,
		body,
		body > div:first-child,
		div#__next,
		div#__next > div {
			height: 100%;
		}
	`}</style>
);

export default function Layout({ children }: { children: any }) {
	return (
		<div className="flex-col bg-white mx-auto h-full">
			<Navbar />
			<main className="grow h-full w-full">{children}</main>
			<Footer />
		</div>
	);
}
