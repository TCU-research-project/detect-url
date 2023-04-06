import '@/styles/globals.css';
import Head from 'next/head';
import React from 'react';

export default function App({ Component, pageProps }) {
	const getLayout = Component.getLayout || ((page) => page);
	return (
		<React.Fragment>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
				<link rel="icon" href="/favicon.png" />
				<title>Detect Phishing</title>
			</Head>
			{getLayout(<Component {...pageProps} />)}
		</React.Fragment>
	);
}
