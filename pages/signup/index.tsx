import { Center, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import AuthCard from 'components/Landing/AuthCard';
import Logo from 'components/Landing/Logo';
import { isClient } from 'utils/browser';
import { Route } from 'utils/enums';
import { useSupabase, useSupabaseUser } from 'utils/supabase';
import { useInsertUserMutation, useSelectUserQuery } from 'fetch/users';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button } from '@mantine/core';
import { Group } from '@mantine/core';
import { useCallback } from 'react';
import T from 'components/Base/T';
import { Divider } from '@mantine/core';

const Signup: NextPage = () => {
  const intl = useIntl();
  const router = useRouter();
  const supabase = useSupabase();
  const authUser = useSupabaseUser();
  const { data: user } = useSelectUserQuery(authUser?.id);
  const [isLoading, setIsLoading] = useState(false);

  const { getInputProps, onSubmit, values } = useForm({
    initialValues: {
      user_id: authUser?.id ?? '',
      first_name: '',
      last_name: ''
    }
  });

  const { mutate } = useInsertUserMutation(values, () => {
    router.push(Route.Home);
  });
  const handleSubmit = useMemo(
    () =>
      onSubmit(() => {
        mutate();
      }),
    [mutate, onSubmit]
  );

  const handleCancelClick = useCallback(() => {
    setIsLoading(true);
    supabase.auth.signOut().finally(() => setIsLoading(false));
  }, [supabase.auth]);

  if (isClient && !!user?.user_id) {
    // If non-auth user is already created, reroute to main page
    router.push(Route.Home);
  }

  return (
    <Center>
      <Stack>
        <Center>
          <Logo />
        </Center>
        <AuthCard>
          <form onSubmit={handleSubmit}>
            <Stack>
              <Center>
                <T.Title>
                  <FormattedMessage
                    defaultMessage="Create Account"
                    description="Title for a form where user can enter their details to sign up"
                  />
                </T.Title>
              </Center>
              <Divider />
              <Stack spacing="xs">
                <TextInput
                  {...getInputProps('first_name')}
                  label={intl.formatMessage({
                    defaultMessage: 'First Name',
                    description: 'Label for input where user enters their first name'
                  })}
                  required
                />

                <TextInput
                  {...getInputProps('last_name')}
                  label={intl.formatMessage({
                    defaultMessage: 'Last Name',
                    description: 'Label for input where user enters their last name'
                  })}
                  required
                />
              </Stack>
              <Group align="end" position="right" spacing="sm">
                <Button color="davysGrey" loading={isLoading} onClick={handleCancelClick}>
                  <FormattedMessage
                    defaultMessage="Cancel"
                    description="Button to exit signup flow and go back to login page"
                  />
                </Button>
                <Button color="cinnabar" type="submit">
                  <FormattedMessage
                    defaultMessage="Create account"
                    description="Button to submit user info and create an account"
                  />
                </Button>
              </Group>
            </Stack>
          </form>
        </AuthCard>
      </Stack>
    </Center>
  );
};

export default React.memo(Signup);
