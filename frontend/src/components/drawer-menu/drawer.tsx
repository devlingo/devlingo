export function Drawer({
	isOpen,
	children,
}: {
	isOpen: boolean;
	children: React.ReactNode;
}) {
	return (
		<div
			className={`menu mx-0 border-r-2 bg-base-100 border-base-200 transition-all duration-300 ease-in-out ${
				isOpen ? `p-$4 mr-3 min-w-fit max-w-[33%]` : 'w-0'
			}`}
		>
			{isOpen && children}
		</div>
	);
}
