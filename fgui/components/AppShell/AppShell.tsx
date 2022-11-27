import { BoxProps, forwardRef, useStyleConfig } from '@chakra-ui/react';
import { Box, Drawer, HStack, Icon, Link, useDisclosure } from 'fgui';
import { useEffect, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { FOOTER_ID } from '.';

type Props = BoxProps & {
  header: React.ReactNode;
  menu: React.ReactNode;
  footer: React.ReactNode;
};

const AppShell = forwardRef<Props, 'div'>(({ children, header, menu, footer, ...props }, ref) => {
  const styles = useStyleConfig('AppShell.Base');
  const headerStyles = useStyleConfig('AppShell.Header');
  const menuStyles = useStyleConfig('AppShell.Menu');
  const contentStyles = useStyleConfig('AppShell.Content');
  const footerStyles = useStyleConfig('AppShell.Footer');
  const { isOpen, onToggle } = useDisclosure();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        const current = menuRef.current;
        if (current) {
          current.style.left = '0';
        }
      }, 0);
    }
  }, [isOpen]);

  return (
    <>
      <Box __css={styles} {...props} ref={ref}>
        <Box __css={headerStyles}>
          <HStack flex={1} gap={1}>
            <Link _hover={{ background: 'forest.100' }} color="bark.5" onClick={onToggle} p={2}>
              <Icon.Menu />
            </Link>
            {header}
          </HStack>
        </Box>
        <Box __css={contentStyles}>{children}</Box>
        <Box __css={footerStyles} id={FOOTER_ID}>
          {footer}
        </Box>
      </Box>

      <Drawer
        header={
          <FormattedMessage
            defaultMessage="Field Guide"
            description="Title of the application in the nav menu"
          />
        }
        isOpen={isOpen}
        onClose={onToggle}
        placement="left"
      >
        <Box __css={menuStyles} ref={menuRef}>
          {menu}
        </Box>
      </Drawer>
    </>
  );
});

export default AppShell;
