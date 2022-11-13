import { Container, createStyles, AppShell } from '@mantine/core';
import React, { useState, useCallback } from 'react';
import { useIntl } from 'react-intl';
import Header from './Header';
import { useRedirects } from 'utils/router';
import { useRouter } from 'next/router';
import { Route } from 'utils/enums';
import Footer from './Footer';
import NavBar from './NavBar';

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
  const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();
  const routeAllowsNavigation = router.pathname !== Route.Onboarding;

  const handleBurgerClick = useCallback(() => {
    setIsNavOpen(o => !o);
  }, []);

  useRedirects();

  return (
    <AppShell
      footer={<Footer />}
      header={
        <Header
          handleBurgerClick={handleBurgerClick}
          isNavOpen={isNavOpen}
          routeAllowsNavigation={routeAllowsNavigation}
        />
      }
      navbar={routeAllowsNavigation ? <NavBar isOpen={isNavOpen} /> : undefined}
    >
      <Container className={classes.container}>{children}</Container>
    </AppShell>
  );
};

export default React.memo(AppWrapper);
