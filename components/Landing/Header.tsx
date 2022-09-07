import React from 'react';
import { Burger, Header as MantineHeader, Group, MediaQuery } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import T from 'components/Base/T';
import { FormattedMessage } from 'react-intl';
import { useSelectUserQuery } from 'fetch/users';
import { Button } from '@mantine/core';
import { useSupabase, useSupabaseUser } from 'utils/supabase';
import { useCallback } from 'react';
import { useState } from 'react';

type Props = {
  isNavOpen: boolean;
  handleBurgerClick: () => void;
};
const Header: React.FC<Props> = ({ isNavOpen, handleBurgerClick }) => {
  const theme = useMantineTheme();
  const authUser = useSupabaseUser();
  const { data: user } = useSelectUserQuery(authUser?.id);
  const isLoggedIn = !!user?.user_id;
  const supabase = useSupabase();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogOut = useCallback(() => {
    setIsLoggingOut(true);
    supabase.auth.signOut().finally(() => setIsLoggingOut(false));
  }, [supabase.auth]);

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
          <Button color="cinnabar" loading={isLoggingOut} onClick={handleLogOut}>
            <FormattedMessage
              defaultMessage="Log out"
              description="Text of a button that logs the user out"
            />
          </Button>
        )}
      </Group>
    </MantineHeader>
  );
};

export default React.memo(Header);
