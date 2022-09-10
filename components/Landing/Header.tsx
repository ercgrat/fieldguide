import React, { useCallback, useState } from 'react';
import {
  Button,
  Burger,
  Header as MantineHeader,
  Group,
  MediaQuery,
  useMantineTheme
} from '@mantine/core';
import T from 'components/Base/T';
import { FormattedMessage } from 'react-intl';
import { useSession, signOut } from 'next-auth/react';

type Props = {
  isNavOpen: boolean;
  handleBurgerClick: () => void;
};
const Header: React.FC<Props> = ({ isNavOpen, handleBurgerClick }) => {
  const theme = useMantineTheme();
  const { data, status } = useSession();
  const isLoggedIn = status === 'authenticated';
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogOut = useCallback(() => {
    setIsLoggingOut(true);
    signOut().finally(() => setIsLoggingOut(false));
  }, []);

  return (
    <MantineHeader height={50} px={12}>
      <Group align="center" position="apart" style={{ height: '100%' }}>
        <Group>
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Burger
              color={theme.colors.davysGrey[6]}
              mr="xl"
              onClick={handleBurgerClick}
              opened={isNavOpen}
              size="sm"
            />
          </MediaQuery>
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
