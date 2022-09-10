import { Container, createStyles, AppShell, Navbar } from '@mantine/core';
import T from 'components/Base/T';
import React, { useState, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import Header from './Header';
import { useRedirects } from 'utils/router';

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

  const handleBurgerClick = useCallback(() => {
    setIsNavOpen(o => !o);
  }, []);

  useRedirects();

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
