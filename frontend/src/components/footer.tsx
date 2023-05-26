import { FOOTER_HEIGHT_PIXELS } from '@/constants';

export function Footer() {
	return (
		<footer
			className={`h-[${FOOTER_HEIGHT_PIXELS}px] flex-none bg-base-100 border-b-2 border-base-200`}
			data-testid="footer"
		/>
	);
}
