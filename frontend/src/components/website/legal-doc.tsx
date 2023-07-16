export function LegalDoc({
	title,
	lastUpdated,
	sections,
}: {
	title: string;
	lastUpdated: string;
	sections: { title: string; content: string }[];
}) {
	return (
		<div className="px-12 md:px-32 lg:px-52 py-10 2xl:w-5/6">
			<h1 className="text-3xl text-base-content">{title}</h1>
			<p className="text-base-content/60 ml-1 mb-8">{lastUpdated}</p>
			{sections.length > 0 &&
				sections.map((section, index) => (
					<div
						key={section.title + index.toString()}
						className="ml-2"
					>
						<h2 className="text-md text-base-content/90">
							{section.title}
						</h2>
						<p className="text-base-content/70 text-sm mb-4">
							{section.content}
						</p>
					</div>
				))}
		</div>
	);
}
