import dynamic from 'next/dynamic';

export { default as AppShell } from './AppShell';
export { default as NavMenuItem } from './NavMenuItem';
export const FOOTER_ID = 'app-shell-footer';

const FooterPortal = dynamic(() => import('./FooterPortal'), { ssr: false });
export { FooterPortal };
