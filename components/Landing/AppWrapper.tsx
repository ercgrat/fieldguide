import { AppShell, Navbar } from '@mantine/core';
import { Container, createStyles } from '@mantine/core';
import T from 'components/Base/T';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { Route } from 'utils/enums';
import { useSupabase } from 'utils/supabase';
import Header from './Header';

const useStyles = createStyles(() => ({
  container: {
    width: '100%',
    maxWidth: 'unset',
    margin: 0,
    padding: 0
  }
}));

type Props = {
  children: React.ReactNode;
};
const AppWrapper: React.FC<Props> = ({ children }) => {
  const { classes } = useStyles();
  const [isNavOpen, setIsNavOpen] = useState(true);
  const supabase = useSupabase();

  const handleBurgerClick = useCallback(() => {
    setIsNavOpen(o => !o);
  }, []);

  const router = useRouter();
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      if (!supabase.auth.user()) {
        router.push(Route.Login);
      }
    });

    return () => listener?.unsubscribe();
  }, [router, supabase.auth]);

  return (
    <AppShell
      header={<Header handleBurgerClick={handleBurgerClick} isNavOpen={isNavOpen} />}
      navbar={
        <Navbar hidden={!isNavOpen} hiddenBreakpoint="sm" p="md" width={{ sm: 200, lg: 300 }}>
          <T.Body>
            <FormattedMessage
              defaultMessage="Dashboard"
              description="Title of the nav item for the dashboard screen"
            />
          </T.Body>
        </Navbar>
      }
    >
      <Container className={classes.container}>{children}</Container>
    </AppShell>
  );
};

export default React.memo(AppWrapper);
