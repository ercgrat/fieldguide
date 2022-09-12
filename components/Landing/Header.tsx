import React, { useCallback, useState } from 'react';
import {
  Button,
  Burger,
  Header as MantineHeader,
  Group,
  MediaQuery,
  useMantineTheme,
  createStyles
} from '@mantine/core';
import T from 'components/Base/T';
import { FormattedMessage } from 'react-intl';
import { useSession, signOut } from 'next-auth/react';

const useStyles = createStyles(() => ({
  header: {
    maxWidth: '100vw'
  }
}));

type Props = {
  isNavOpen: boolean;
  handleBurgerClick: () => void;
  routeAllowsNavigation: boolean;
};
const Header: React.FC<Props> = ({ isNavOpen, handleBurgerClick, routeAllowsNavigation }) => {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const { data, status } = useSession();
  const isLoggedIn = status === 'authenticated';
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogOut = useCallback(() => {
    setIsLoggingOut(true);
    signOut().finally(() => setIsLoggingOut(false));
  }, []);

  return (
    <MantineHeader className={classes.header} height={50} px={12}>
      <Group align="center" position="apart" style={{ height: '100%' }}>
        <Group>
          {routeAllowsNavigation ? (
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                color={theme.colors.davysGrey[6]}
                mr="xl"
                onClick={handleBurgerClick}
                opened={isNavOpen}
                size="sm"
              />
            </MediaQuery>
          ) : null}
          <T.Title>
            <FormattedMessage defaultMessage="Field Guide" description="Title of the app" />
          </T.Title>
        </Group>
        {isLoggedIn && (
          <Group>
            <T.Body>{data?.user?.name}</T.Body>
            <Button color="cinnabar" loading={isLoggingOut} onClick={handleLogOut}>
              <FormattedMessage
                defaultMessage="Log out"
                description="Text of a button that logs the user out"
              />
            </Button>
          </Group>
        )}
      </Group>
    </MantineHeader>
  );
};

export default React.memo(Header);
