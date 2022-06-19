import { Center, Stack } from '@mantine/core';
import { NextPage } from 'next';
import React from 'react';
import AuthCard from '../../components/Landing/AuthCard';
import Logo from '../../components/Landing/Logo';

const Signup: NextPage = () => {
  return (
    <Center>
      <Stack>
        <Center>
          <Logo />
        </Center>
        <AuthCard>sign up!</AuthCard>
      </Stack>
    </Center>
  );
};

export default React.memo(Signup);
