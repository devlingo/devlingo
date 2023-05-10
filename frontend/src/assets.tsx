import Image, { ImageProps } from 'next/image';

export type IconProps = Omit<ImageProps, 'src'>;

export function NestJSIcon({ alt = 'NestJS Logo', ...props }: IconProps) {
	return (
		<Image priority src="/images/nestjs-logo.svg" alt={alt} {...props} />
	);
}

export function NextJSIcon({ alt = 'NextJS Logo', ...props }: IconProps) {
	return (
		<Image
			priority
			src="/images/nextjs-logo.svg"
			className="text-accent"
			alt={alt}
			{...props}
		/>
	);
}
