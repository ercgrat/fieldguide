import type { AppProps } from 'next/app';
import React from 'react';
import { IntlProvider } from 'react-intl';
import ThemeProvider from '../theme/ThemeProvider';
import { NotificationsProvider } from '@mantine/notifications';
import './globalStyles.css';
import AppWrapper from '../components/Landing/AppWrapper';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <IntlProvider locale="en">
        <ThemeProvider>
          <NotificationsProvider>
            <QueryClientProvider client={queryClient}>
              <AppWrapper>
                <Component {...pageProps} />
              </AppWrapper>
            </QueryClientProvider>
          </NotificationsProvider>
        </ThemeProvider>
      </IntlProvider>
    </React.StrictMode>
  );
}

export default MyApp;
