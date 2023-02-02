import '@/styles/globals.css';
import Head from 'next/head';
import React from 'react';

export default function App({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Detect Phishing</title>
      </Head>
      <Component {...pageProps} />
    </React.Fragment>
  );
}
