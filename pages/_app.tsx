import type { AppProps } from 'next/app';
import React from 'react';
import { IntlProvider } from 'react-intl';
import ThemeProvider from '../theme/ThemeProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <IntlProvider locale="en">
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </IntlProvider>
    </React.StrictMode>
  );
}

export default MyApp;
