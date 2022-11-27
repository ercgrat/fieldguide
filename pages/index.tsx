import { NextPage } from 'next';

import React, { useEffect } from 'react';
import AuthCard from 'components/Landing/AuthCard';
import Logo from 'components/Landing/Logo';
import { FormattedMessage } from 'react-intl';
import LoginButton from 'components/Landing/LoginButton';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Route } from 'utils/enums';
import { Divider, Skeleton, Stack, T, VStack } from 'fgui';

const Root: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(Route.Home);
    }
  }, [router, status]);

  return (
    <VStack>
      <Stack>
        <VStack>
          <Logo isHomeLinkEnabled={false} />
        </VStack>
        <AuthCard>
          {status === 'loading' ? (
            <Stack>
              <Skeleton height={8} />
              <Skeleton height={8} />
              <Skeleton height={8} />
              <Skeleton height={8} />
              <Skeleton height={8} />
            </Stack>
          ) : (
            <Stack>
              <VStack>
                <T.H3>
                  <FormattedMessage
                    defaultMessage="Log In"
                    description="Label for a form to log into the app"
                  />
                </T.H3>
              </VStack>
              <Divider />
              <VStack>
                <LoginButton />
              </VStack>
            </Stack>
          )}
        </AuthCard>
      </Stack>
    </VStack>
  );
};

export default React.memo(Root);
