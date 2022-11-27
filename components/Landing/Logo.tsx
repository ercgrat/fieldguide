/* eslint-disable i18next/no-literal-string */
import { HStack, T } from 'fgui';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

type Props = {
  isHomeLinkEnabled?: boolean;
};
const Logo: React.FC<Props> = () => {
  const router = useRouter();

  const handleLogoClick = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <HStack mt={40} onClick={handleLogoClick} spacing="xs">
      <T.H1>Field Guide!</T.H1>
    </HStack>
  );
};

export default React.memo(Logo);
