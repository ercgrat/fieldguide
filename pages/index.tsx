import { NextPage } from 'next';
import { Center, Divider, Skeleton, Stack } from '@mantine/core';

import React, { useEffect } from 'react';
import AuthCard from 'components/Landing/AuthCard';
import Logo from 'components/Landing/Logo';
import { FormattedMessage } from 'react-intl';
import LoginButton from 'components/Landing/LoginButton';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Route } from 'utils/enums';
import T from 'components/Base/T';

const Root: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(Route.Home);
    }
  }, [router, status]);

  return (
    <Center>
      <Stack>
        <Center>
          <Logo isHomeLinkEnabled={false} />
        </Center>
        <AuthCard>
          {status === 'loading' ? (
            <Stack>
              <Skeleton height={8} radius="xl" />
              <Skeleton height={8} radius="xl" />
              <Skeleton height={8} radius="xl" />
              <Skeleton height={8} radius="xl" />
              <Skeleton height={8} radius="xl" />
            </Stack>
          ) : (
            <Stack>
              <Center>
                <T.Title>
                  <FormattedMessage
                    defaultMessage="Log In"
                    description="Label for a form to log into the app"
                  />
                </T.Title>
              </Center>
              <Divider />
              <Center>
                <LoginButton />
              </Center>
            </Stack>
          )}
        </AuthCard>
      </Stack>
    </Center>
  );
};

export default React.memo(Root);
