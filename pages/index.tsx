import { useCallback, useState } from 'react';
import { NextPage } from 'next';
import {
  Button,
  Card,
  Center,
  Container,
  createStyles,
  Stack,
  Text,
  TextInput
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { defineMessage, FormattedMessage, useIntl } from 'react-intl';

import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = 'https://gybxqjtroqkyzeudyjhh.supabase.co';
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const useStyles = createStyles(theme => ({
  purple: {
    color: theme.colors.purple[5],
    display: 'inline'
  },
  cinnabar: {
    color: theme.colors.cinnabar[5],
    fontStyle: 'italic',
    display: 'inline'
  }
}));

const Home: NextPage = () => {
  const intl = useIntl();

  const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? '';
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const { classes } = useStyles();

  const form = useForm({
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

  return (
    <Container>
      <Center>
        <Text className={classes.purple} size="xl" weight="bold">
          Relay
        </Text>
        <Text className={classes.cinnabar} size="xl" weight="bold">
          !
        </Text>
      </Center>
      <Card shadow="md">
        <form onSubmit={form.onSubmit(values => console.log(values))}>
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
              type="password"
            />
            <Button type="submit">
              <FormattedMessage
                defaultMessage="Log in"
                description="Button used to log into the main application"
              />
            </Button>
          </Stack>
        </form>
      </Card>
    </Container>
  );
};

export default Home;
