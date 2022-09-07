import { NextPage } from 'next';
import { Center, Divider, Skeleton, Stack } from '@mantine/core';

import React from 'react';
import AuthCard from 'components/Landing/AuthCard';
import Logo from 'components/Landing/Logo';
import { FormattedMessage } from 'react-intl';
import LoginButton from 'components/Landing/LoginButton';
import { useSupabaseUser } from 'utils/supabase';
import { useRouter } from 'next/router';
import { Route } from 'utils/enums';
import T from 'components/Base/T';
import { useSelectUserQuery } from 'fetch/users';
import { useEffect } from 'react';

const Root: NextPage = () => {
  const router = useRouter();
  const authUser = useSupabaseUser();
  const { refetch, isLoading } = useSelectUserQuery(authUser?.id, { enabled: false });

  useEffect(() => {
    if (authUser) {
      refetch().then(res => {
        if (res.data?.body?.[0]) {
          router.push(Route.Home);
        } else {
          router.push(Route.Signup);
        }
      });
    }
  }, [authUser, refetch, router]);

  return (
    <Center>
      <Stack>
        <Center>
          <Logo isHomeLinkEnabled={false} />
        </Center>
        <AuthCard>
          {isLoading ? (
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
