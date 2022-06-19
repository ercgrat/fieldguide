import { NextPage } from 'next';
import { Button, Center, Divider, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { defineMessage, FormattedMessage, useIntl } from 'react-intl';

import { createClient } from '@supabase/supabase-js';
import { useCallback, useState } from 'react';
import React from 'react';
import { showNotification } from '@mantine/notifications';
import { handleError } from '../utils/error';
import AuthCard from '../components/Landing/AuthCard';
import { useRouter } from 'next/router';
import Logo from '../components/Landing/Logo';
const SUPABASE_URL = 'https://gybxqjtroqkyzeudyjhh.supabase.co';
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

type LoginForm = {
  email: string;
  password: string;
};

const Root: NextPage = () => {
  const intl = useIntl();

  const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? '';
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  const form = useForm<LoginForm>({
    initialValues: {
      email: '',
      password: ''
    },

    validate: {
      email: value =>
        EMAIL_REGEX.test(value)
          ? null
          : intl.formatMessage(
              defineMessage({
                defaultMessage: 'Please enter a valid email',
                description:
                  'Validation message when user enters invalid email in the log in screen'
              })
            ),
      password: (value: string) =>
        value.length >= 8
          ? null
          : intl.formatMessage(
              defineMessage({
                defaultMessage: 'Passwords must be greater than 8 characters',
                description:
                  'Validation message when user enters invalid password in the log in screen'
              })
            )
    }
  });

  const handleSubmit = useCallback(
    (values: LoginForm) => {
      setIsLoggingIn(true);
      supabase.auth
        .signIn(values)
        .then(result => {
          if (result.error) {
            showNotification({
              message: result.error.message,
              color: 'red'
            });
          } else {
            alert(`success: ${result.user?.email}`);
          }
        })
        .catch(handleError)
        .finally(() => setIsLoggingIn(false));
    },
    [supabase.auth]
  );

  const handleSignupClick = useCallback(() => {
    router.push('/signup');
  }, [router]);

  return (
    <Center>
      <Stack>
        <Center>
          <Logo isHomeLinkEnabled={false} />
        </Center>
        <AuthCard>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              <TextInput
                label={intl.formatMessage(
                  defineMessage({
                    defaultMessage: 'Email',
                    description: 'Label for the email input on the log in screen'
                  })
                )}
                placeholder={intl.formatMessage(
                  defineMessage({
                    defaultMessage: 'Enter email address',
                    description: 'Placeholder for the email input on the log in screen'
                  })
                )}
                required
                {...form.getInputProps('email')}
                autoComplete="email"
                id="email"
                type="email"
              />
              <TextInput
                label={intl.formatMessage(
                  defineMessage({
                    defaultMessage: 'Password',
                    description: 'Label for the password input on the log in screen'
                  })
                )}
                placeholder={intl.formatMessage(
                  defineMessage({
                    defaultMessage: 'Enter password',
                    description: 'Placeholder for the password input on the log in screen'
                  })
                )}
                required
                {...form.getInputProps('password')}
                autoComplete="current-password"
                id="password"
                type="password"
              />
              <Button loading={isLoggingIn} type="submit">
                <FormattedMessage
                  defaultMessage="Log in"
                  description="Button used to log into the main application"
                />
              </Button>
            </Stack>
          </form>
          <Divider my={12} />
          <Center>
            <Button color="honeydew" fullWidth onClick={handleSignupClick}>
              <FormattedMessage
                defaultMessage="Sign up"
                description="Button to visit the new account sign up screen"
              />
            </Button>
          </Center>
        </AuthCard>
      </Stack>
    </Center>
  );
};

export default React.memo(Root);
