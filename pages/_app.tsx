import type { AppProps } from 'next/app';
import React from 'react';
import { IntlProvider } from 'react-intl';
import ThemeProvider from '../theme/ThemeProvider';
import { NotificationsProvider } from '@mantine/notifications';
import './globalStyles.css';
import AppWrapper from '../components/Landing/AppWrapper';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_KEY, SUPABASE_URL } from '../utils/const';
import { SupabaseContext } from '../utils/supabase';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  return (
    <React.StrictMode>
      <IntlProvider locale="en">
        <ThemeProvider>
          <NotificationsProvider>
            <QueryClientProvider client={queryClient}>
              <SupabaseContext.Provider value={supabase}>
                <AppWrapper>
                  <Component {...pageProps} />
                </AppWrapper>
              </SupabaseContext.Provider>
            </QueryClientProvider>
          </NotificationsProvider>
        </ThemeProvider>
      </IntlProvider>
    </React.StrictMode>
  );
}

export default MyApp;
