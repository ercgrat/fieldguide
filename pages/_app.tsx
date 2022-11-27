import type { AppProps } from 'next/app';
import React from 'react';
import { IntlProvider } from 'react-intl';
import ThemeProvider from '../fgui/ThemeProvider';
import './globalStyles.css';
import App from '../components/Landing/App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SessionProvider } from 'next-auth/react';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <IntlProvider locale="en">
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <SessionProvider>
              <App>
                <Component {...pageProps} />
              </App>
            </SessionProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </IntlProvider>
    </React.StrictMode>
  );
}

export default MyApp;
