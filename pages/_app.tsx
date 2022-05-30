import type { AppProps } from 'next/app';
import { IntlProvider } from 'react-intl';
import ThemeProvider from '../theme/ThemeProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <IntlProvider locale="en">
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </IntlProvider>
  );
}

export default MyApp;
