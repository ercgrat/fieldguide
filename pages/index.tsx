import { NextPage } from 'next';
import { Center, Divider, Stack } from '@mantine/core';

import React from 'react';
import AuthCard from 'components/Landing/AuthCard';
import Logo from 'components/Landing/Logo';
import { FormattedMessage } from 'react-intl';
import LoginButton from 'components/Landing/LoginButton';
import { useSupabase } from 'utils/supabase';
import { useRouter } from 'next/router';
import { Route } from 'utils/enums';
import T from 'components/Base/T';

const Root: NextPage = () => {
  const supabase = useSupabase();
  const router = useRouter();

  supabase.auth.onAuthStateChange(() => {
    const user = supabase.auth.user();
    if (user) {
      router.push(Route.Signup);
    }
  });

  return (
    <Center>
      <Stack>
        <Center>
          <Logo isHomeLinkEnabled={false} />
        </Center>
        <AuthCard>
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
        </AuthCard>
      </Stack>
    </Center>
  );
};

export default React.memo(Root);
