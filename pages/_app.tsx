import React from 'react';
import type { AppProps } from 'next/app';
import { IntlProvider } from 'react-intl';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <IntlProvider locale='en'>
      <Component {...pageProps} />
    </IntlProvider>
  );
}

export default MyApp;
