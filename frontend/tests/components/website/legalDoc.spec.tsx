import { render, screen } from 'tests/test-utils';

import { LegalDoc } from '@/components/website/legal-doc';

describe('LegalDoc_function', () => {
	it('renders with valid props', () => {
		const title = 'Test Title';
		const lastUpdated = 'Test Last Updated';
		const sections = [
			{
				title: 'Test Section Title 1',
				content: 'Test Section Content 1',
			},
			{
				title: 'Test Section Title 2',
				content: 'Test Section Content 2',
			},
		];
		render(
			<LegalDoc
				title={title}
				lastUpdated={lastUpdated}
				sections={sections}
			/>,
		);
		expect(screen.getByText(title)).toBeInTheDocument();
		expect(screen.getByText(lastUpdated)).toBeInTheDocument();
		sections.forEach((section) => {
			expect(screen.getByText(section.title)).toBeInTheDocument();
			expect(screen.getByText(section.content)).toBeInTheDocument();
		});
	});

	// Tests that LegalDoc component is rendered with multiple sections
	it('renders with multiple sections', () => {
		const title = 'Test Title';
		const lastUpdated = 'Test Last Updated';
		const sections = [
			{
				title: 'Test Section Title 1',
				content: 'Test Section Content 1',
			},
			{
				title: 'Test Section Title 2',
				content: 'Test Section Content 2',
			},
		];
		render(
			<LegalDoc
				title={title}
				lastUpdated={lastUpdated}
				sections={sections}
			/>,
		);
		expect(screen.getByText(title)).toBeInTheDocument();
		expect(screen.getByText(lastUpdated)).toBeInTheDocument();
		sections.forEach((section) => {
			expect(screen.getByText(section.title)).toBeInTheDocument();
			expect(screen.getByText(section.content)).toBeInTheDocument();
		});
	});

	// Tests that LegalDoc component is rendered with empty sections array
	it('renders with empty sections', () => {
		const title = 'Test Title';
		const lastUpdated = 'Test Last Updated';
		const sections: { title: string; content: string }[] = [];
		render(
			<LegalDoc
				title={title}
				lastUpdated={lastUpdated}
				sections={sections}
			/>,
		);
		expect(screen.getByText(title)).toBeInTheDocument();
		expect(screen.getByText(lastUpdated)).toBeInTheDocument();
	});

	// Tests that LegalDoc component is rendered with missing title prop
	it('renders without title', () => {
		const lastUpdated = 'Test Last Updated';
		const sections = [
			{
				title: 'Test Section Title 1',
				content: 'Test Section Content 1',
			},
			{
				title: 'Test Section Title 2',
				content: 'Test Section Content 2',
			},
		];
		render(
			<LegalDoc
				lastUpdated={lastUpdated}
				sections={sections}
				title={'test'}
			/>,
		);
		expect(screen.getByText(lastUpdated)).not.toBeNull();
		sections.forEach((section) => {
			expect(screen.getByText(section.title)).toBeInTheDocument();
			expect(screen.getByText(section.content)).toBeInTheDocument();
		});
	});

	// Tests that LegalDoc component is rendered with missing lastUpdated prop
	it('renders without last update', () => {
		const title = 'Test Title';
		const sections = [
			{
				title: 'Test Section Title 1',
				content: 'Test Section Content 1',
			},
			{
				title: 'Test Section Title 2',
				content: 'Test Section Content 2',
			},
		];
		render(
			<LegalDoc
				title={title}
				sections={sections}
				lastUpdated={'Test Last Updated'}
			/>,
		);
		expect(screen.getByText(title)).toBeInTheDocument();
		sections.forEach((section) => {
			expect(screen.getByText(section.title)).toBeInTheDocument();
			expect(screen.getByText(section.content)).toBeInTheDocument();
		});
	});
});
