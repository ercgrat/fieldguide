import { Center, Input, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useIntl } from 'react-intl';
import AuthCard from '../../components/Landing/AuthCard';
import Logo from '../../components/Landing/Logo';

const Signup: NextPage = () => {
  const intl = useIntl();
  const router = useRouter();
  const { email, name } = router.query as APIResponse.Login;

  if (typeof email !== 'string' || typeof name !== 'string') {
    throw new Error(
      intl.formatMessage({
        defaultMessage: 'Email or name param is invalid',
        description:
          'Error thrown when visiting the signup page without valid email or name provided'
      })
    );
  }

  const { getInputProps } = useForm<APIResponse.Login>({
    initialValues: {
      email,
      name
    }
  });

  return (
    <Center>
      <Stack>
        <Center>
          <Logo />
        </Center>
        <AuthCard>
          <Input {...getInputProps('email')} />
          <Input {...getInputProps('name')} />
        </AuthCard>
      </Stack>
    </Center>
  );
};

export default React.memo(Signup);
