import { NextPage } from 'next';
import { Center, Divider, Stack, Text } from '@mantine/core';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

import React, { useCallback } from 'react';
import AuthCard from '../components/Landing/AuthCard';
import Logo from '../components/Landing/Logo';
import { FormattedMessage, useIntl } from 'react-intl';
import { GOOGLE_CLIENT_ID } from '../utils/const';
import { useMutation } from 'react-query';
import { QueryKey } from '../utils/enums';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';

const Root: NextPage = () => {
  const intl = useIntl();
  const { mutate: logIn } = useMutation<void, Error, string>(
    QueryKey.Login,
    (token: string) => axios.get(`/api/login?token=${token}`),
    {
      onError: () =>
        showNotification({
          title: intl.formatMessage({
            defaultMessage: 'Failed to log in',
            description:
              'Title of toast error presented to the user after successfully logging into Google but failing to log into Field Guide'
          }),
          message: intl.formatMessage({
            defaultMessage: 'Your Google credentials were not recognized',
            description:
              'Body of toast error presented to the user after successfully logging into Google but failing to log into Field Guide'
          })
        }),
      onSuccess: () => {
        alert('logged in');
      }
    }
  );
  const handleGoogleLoginSuccess = useCallback((token: string) => logIn(token), [logIn]);

  return (
    <Center>
      <Stack>
        <Center>
          <Logo isHomeLinkEnabled={false} />
        </Center>
        <AuthCard>
          <Stack>
            <Center>
              <Text color="purple" size="xl">
                <FormattedMessage
                  defaultMessage="Sign in"
                  description="Label for a button to log in with Google"
                />
              </Text>
            </Center>
            <Divider />
            <Center>
              <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <GoogleLogin
                  onError={() => alert('error')}
                  onSuccess={({ credential }) => handleGoogleLoginSuccess(credential ?? '')}
                  useOneTap={false}
                />
              </GoogleOAuthProvider>
            </Center>
          </Stack>
        </AuthCard>
      </Stack>
    </Center>
  );
};

export default React.memo(Root);
