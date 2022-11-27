import React from 'react';
import { useRedirects } from 'utils/router';
import { AppShell, Button, HStack, Icon, T, VStack } from 'fgui';
import { FormattedMessage } from 'react-intl';
import { useBreakpointValue } from '@chakra-ui/react';
import { Route } from 'utils/enums';
import { useRouter } from 'next/router';

type Props = {
  children: React.ReactNode;
};
const App: React.FC<Props> = ({ children }) => {
  const router = useRouter();

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
          <T.H3>
            <FormattedMessage defaultMessage="Field Guide" description="Title of the application" />
          </T.H3>
          <Button display={display} variant="danger">
            <FormattedMessage
              defaultMessage="Log out"
              description="Button to log the user out of the application"
            />
          </Button>
        </HStack>
      }
      menu={
        <VStack alignItems="flex-start" w="100%">
          <Button onClick={() => router.push(Route.Crops)} variant="primary">
            <Icon.List />
            <FormattedMessage
              defaultMessage="Crops"
              description="Title of the nav item for the crops screen"
            />
          </Button>
        </VStack>
      }
    >
      {children}
    </AppShell>
  );
};

export default React.memo(App);
