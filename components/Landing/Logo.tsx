/* eslint-disable i18next/no-literal-string */
import { createStyles, Group, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

type StyleProps = {
  isHomeLinkEnabled?: boolean;
};
const useStyles = createStyles((theme, { isHomeLinkEnabled }: StyleProps) => ({
  purple: {
    color: theme.colors.purple[5],
    display: 'inline',
    fontSize: 60
  },
  cinnabar: {
    color: theme.colors.cinnabar[5],
    fontStyle: 'italic',
    display: 'inline',
    fontSize: 60
  },
  logo: {
    gap: 0,
    pointerEvents: isHomeLinkEnabled ? 'all' : 'none',
    cursor: 'pointer'
  }
}));

type Props = {
  isHomeLinkEnabled?: boolean;
};
const Logo: Relay.FC<Props> = ({ isHomeLinkEnabled = true }) => {
  const { classes } = useStyles({ isHomeLinkEnabled });
  const router = useRouter();

  const handleLogoClick = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <Group className={classes.logo} mt={40} onClick={handleLogoClick} spacing="xs">
      <Text className={classes.purple} weight="bold">
        Field Guide
      </Text>
      <Text className={classes.cinnabar} weight="bold">
        !
      </Text>
    </Group>
  );
};

export default React.memo(Logo);
