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
		<div className="bg-base-100 w-2/3">
			<h1 className="text-3xl text-base-content">{title}</h1>
			<p className="text-base-content ml-1 mb-4">{lastUpdated}</p>
			{sections.map((section, index) => (
				<div key={index}>
					<h2 className="text-md text-base-content">
						{section.title}
					</h2>
					<p className="text-base-content/80 text-sm mb-2">
						{section.content}
					</p>
				</div>
			))}
		</div>
	);
}
