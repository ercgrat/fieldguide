import React, { useCallback } from 'react';
import { useRedirects } from 'utils/router';
import { AppShell, Button, HStack, Icon, NavMenuItem, T, VStack, useDisclosure } from 'fgui';
import { FormattedMessage } from 'react-intl';
import { useBreakpointValue } from '@chakra-ui/react';
import { Route } from 'utils/enums';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

type Props = {
  children: React.ReactNode;
};
const App: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const { isOpen, onToggle } = useDisclosure();
  const { status } = useSession();
  const handleLogOut = useCallback(() => {
    signOut();
  }, []);
  const handleRouteChange = useCallback(
    (route: Route) => {
      router.push(route);
      onToggle();
    },
    [onToggle, router]
  );

  const display = useBreakpointValue(
    {
      xs: 'none',
      sm: 'none',
      md: 'block'
    },
    {
      ssr: true,
      fallback: 'block'
    }
  );
  useRedirects();

  return (
    <AppShell
      footer={null}
      header={
        <HStack flex={1} justifyContent="space-between">
          <T.HeadingXl>
            <FormattedMessage
              defaultMessage="Field Guide"
              description="Title of the application"
              id="w6OLlU"
            />
          </T.HeadingXl>
          {status === 'authenticated' && (
            <Button display={display} onClick={handleLogOut} variant="danger">
              <FormattedMessage
                defaultMessage="Log out"
                description="Button to log the user out of the application"
                id="8xX0PK"
              />
            </Button>
          )}
        </HStack>
      }
      isOpen={isOpen}
      menu={
        <VStack alignItems="flex-start" w="100%">
          <NavMenuItem onClick={() => handleRouteChange(Route.Crops)}>
            <Icon.List />
            <FormattedMessage
              defaultMessage="Crops"
              description="Title of the nav item for the crops screen"
              id="U/8/fS"
            />
          </NavMenuItem>
        </VStack>
      }
      onToggle={onToggle}
    >
      {children}
    </AppShell>
  );
};

export default React.memo(App);
