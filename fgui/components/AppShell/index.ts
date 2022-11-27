import dynamic from 'next/dynamic';

export { default as AppShell } from './AppShell';
export const FOOTER_ID = 'app-shell-footer';

const FooterPortal = dynamic(() => import('./FooterPortal'), { ssr: false });
export { FooterPortal };
