/* istanbul ignore next */
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body>
				<Main />
				<NextScript />
				<input
					type="checkbox"
					id="my-modal-4"
					className="modal-toggle"
				/>
				<label htmlFor="ai-modal" className="modal cursor-pointer">
					<label className="modal-box relative" htmlFor="">
						<h3 className="text-lg font-bold">
							Congratulations random Internet user!
						</h3>
						<p className="py-4">
							Youve been selected for a chance to get one year of
							subscription to use Wikipedia for free!
						</p>
					</label>
				</label>
			</body>
		</Html>
	);
}
