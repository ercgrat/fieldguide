import type { AppProps } from 'next/app';
import React from 'react';
import { IntlProvider } from 'react-intl';
import ThemeProvider from '../theme/ThemeProvider';
import { NotificationsProvider } from '@mantine/notifications';
import './globalStyles.css';
import AppWrapper from '../components/Landing/AppWrapper';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <IntlProvider locale="en">
        <ThemeProvider>
          <NotificationsProvider>
            <AppWrapper>
              <Component {...pageProps} />
            </AppWrapper>
          </NotificationsProvider>
        </ThemeProvider>
      </IntlProvider>
    </React.StrictMode>
  );
}

export default MyApp;
