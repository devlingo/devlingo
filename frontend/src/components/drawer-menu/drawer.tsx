export function Drawer({
	isOpen,
	children,
}: {
	isOpen: boolean;
	children: React.ReactNode;
}) {
	return (
		<div
			className={`border-r-2 bg-base-100 border-base-200 transition-all duration-300 ease-in-out flex-none ${
				isOpen ? `w-fit` : 'w-0'
			}`}
		>
			{isOpen && children}
		</div>
	);
}
