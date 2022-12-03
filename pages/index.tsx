import { NextPage } from 'next';

import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import LoginButton from 'components/Landing/LoginButton';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Route } from 'utils/enums';
import { Card, Divider, Flex, Image, Skeleton, Stack, T, VStack } from 'fgui';

const Root: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(Route.Crops);
    }
  }, [router, status]);

  return (
    <VStack>
      <Flex alignItems="flex-start" direction="column" maxWidth="90vw">
        <T.Heading4xl color="forest.100" ml={[0, 0, 4]} mt={[6, 6, 20]}>
          <FormattedMessage
            defaultMessage="Spend more time in the field"
            description="Marketing message on the login page"
          />
        </T.Heading4xl>
        <T.Heading2xl color="forest.60" ml={[0, 0, 4]} mt={2}>
          <FormattedMessage
            defaultMessage="Get organized with our advanced crop planning tools"
            description="Marketing message on the login page"
          />
        </T.Heading2xl>
        <Card mt={4}>
          <Flex
            alignItems={['flex-start', 'flex-start', 'center']}
            direction={['column', 'column', 'row']}
          >
            <Image
              fit="cover"
              height={[180, 200, 200, 300]}
              src="farm.jpg"
              width={['100%', '100%', 'auto']}
            />
            {status === 'loading' ? (
              <Stack>
                <Skeleton height={8} />
                <Skeleton height={8} />
                <Skeleton height={8} />
                <Skeleton height={8} />
                <Skeleton height={8} />
              </Stack>
            ) : (
              <Flex alignItems="center" alignSelf="stretch" direction="column" p={6}>
                <T.Heading2xl>
                  <FormattedMessage
                    defaultMessage="Welcome to Field Guide"
                    description="Welcome message on the log in page"
                  />
                </T.Heading2xl>
                <Divider my={6} />
                <VStack flex={1} justifyContent="space-around">
                  <LoginButton />
                </VStack>
              </Flex>
            )}
          </Flex>
        </Card>
      </Flex>
    </VStack>
  );
};

export default React.memo(Root);
