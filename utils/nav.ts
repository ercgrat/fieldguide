import dynamic from 'next/dynamic';
import { useMemo } from 'react';

export const useFooterPortal = () =>
  useMemo(
    () =>
      dynamic(() => import('components/Landing/Footer').then(({ FooterPortal }) => FooterPortal), {
        ssr: false
      }),
    []
  );
