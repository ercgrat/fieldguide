import type { AppProps } from 'next/app';
import React from 'react';
import { IntlProvider } from 'react-intl';
import ThemeProvider from '../fgui/ThemeProvider';
import './globalStyles.css';
import App from '../components/Landing/App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SessionProvider } from 'next-auth/react';
import { Open_Sans } from '@next/font/google';

const queryClient = new QueryClient();
const openSans = Open_Sans({ subsets: ['latin'] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <IntlProvider locale="en">
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <SessionProvider>
              <main className={openSans.className}>
                <App>
                  <Component {...pageProps} />
                </App>
              </main>
            </SessionProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </IntlProvider>
    </React.StrictMode>
  );
}

export default MyApp;
