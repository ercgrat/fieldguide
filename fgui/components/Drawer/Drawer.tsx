import {
  Drawer as ChakraDrawer,
  DrawerProps,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerBody
} from '@chakra-ui/react';
import { Button, Divider, Flex, HStack, Icon, T } from 'fgui';

type Props = DrawerProps & {
  header?: React.ReactNode;
  footer?: React.ReactNode;
};
const Drawer: React.FC<Props> = ({ children, header, footer, onClose, ...props }) => (
  <ChakraDrawer onClose={onClose} {...props}>
    <DrawerOverlay />
    <DrawerContent>
      <Flex alignItems="flex-start" direction="column">
        <DrawerHeader p={2}>
          <HStack justifyContent="space-between" px={1} w="100%">
            <T.HeadingLg>{header}</T.HeadingLg>
            <Button onClick={onClose}>
              <Icon.X />
            </Button>
          </HStack>
        </DrawerHeader>
        <Divider />
        <DrawerBody>{children}</DrawerBody>
        <DrawerFooter>{footer}</DrawerFooter>
      </Flex>
    </DrawerContent>
  </ChakraDrawer>
);

export default Drawer;
