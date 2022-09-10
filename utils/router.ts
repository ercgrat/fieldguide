import { useCurrentOrganizationsQuery } from 'fetch/organizations';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Route } from './enums';

export const useRedirects = () => {
  const { status } = useSession();
  const router = useRouter();
  const { data: organizations } = useCurrentOrganizationsQuery();

  useEffect(() => {
    if (status === 'unauthenticated' && router.pathname !== Route.Login) {
      router.push(Route.Login);
    }
  }, [router, status]);

  useEffect(() => {
    if (
      status === 'authenticated' &&
      !organizations?.length &&
      router.pathname !== Route.Onboarding
    ) {
      router.push(Route.Onboarding);
    }
  }, [organizations?.length, router, status]);
};
