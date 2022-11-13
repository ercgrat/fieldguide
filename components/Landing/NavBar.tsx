import { Navbar, NavLink, ThemeIcon } from '@mantine/core';
import { IconPlant } from '@tabler/icons';
import { useRouter } from 'next/router';
import React from 'react';
import { useIntl } from 'react-intl';
import { Route } from 'utils/enums';

type Props = {
  isOpen: boolean;
};
const NavBar: React.FC<Props> = ({ isOpen: isNavOpen }) => {
  const intl = useIntl();
  const router = useRouter();

  return (
    <Navbar hidden={!isNavOpen} hiddenBreakpoint="sm" p="md" width={{ sm: 200, lg: 300 }}>
      <Navbar.Section>
        <NavLink
          active={router.route === Route.Crops}
          icon={
            <ThemeIcon>
              <IconPlant />
            </ThemeIcon>
          }
          label={intl.formatMessage({
            defaultMessage: 'Crops',
            description: 'Title of the nav item for the crops screen'
          })}
          onClick={() => router.push(Route.Crops)}
        />
      </Navbar.Section>
    </Navbar>
  );
};

export default React.memo(NavBar);
