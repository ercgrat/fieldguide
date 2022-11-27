import {
  Drawer as ChakraDrawer,
  DrawerProps,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerBody
} from '@chakra-ui/react';
import { Button, Divider, HStack, Icon, T, VStack } from 'fgui';

type Props = DrawerProps & {
  header?: React.ReactNode;
  footer?: React.ReactNode;
};
const Drawer: React.FC<Props> = ({ children, header, footer, onClose, ...props }) => (
  <ChakraDrawer onClose={onClose} {...props}>
    <DrawerOverlay />
    <DrawerContent>
      <VStack alignItems="flex-start">
        <DrawerHeader>
          <HStack justifyContent="space-between" px={1} w="100%">
            <T.H3>{header}</T.H3>
            <Button onClick={onClose}>
              <Icon.X />
            </Button>
          </HStack>
          <Divider mt={2} />
        </DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
        <DrawerFooter>{footer}</DrawerFooter>
      </VStack>
    </DrawerContent>
  </ChakraDrawer>
);

export default Drawer;
