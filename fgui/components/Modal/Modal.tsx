import React from 'react';

import {
  forwardRef,
  Modal as ChakraModal,
  ModalBody as ChakraModalBody,
  ModalContent as ChakraModalContent,
  ModalFooter as ChakraModalFooter,
  ModalHeader as ChakraModalHeader,
  ModalOverlay as ChakraModalOverlay,
  ModalProps as ChakraModalProps,
  ModalOverlayProps as ChakraModalOverlayProps,
  ModalBodyProps as ChakraModalBodyProps,
  ModalContentProps as ChakraModalContentProps,
  ModalHeaderProps as ChakraModalHeaderProps,
  ModalFooterProps as ChakraModalFooterProps,
  useModalContext
} from '@chakra-ui/react';

import { Button, Divider, Flex, HStack, Icon, T } from 'fgui';
const ModalOverlayBase: React.FC<ChakraModalOverlayProps> = forwardRef<
  ChakraModalOverlayProps,
  'div'
>((props, ref) => {
  return <ChakraModalOverlay {...props} ref={ref} />;
});

const ModalContent: React.FC<ChakraModalContentProps> = forwardRef<
  ChakraModalContentProps,
  'section'
>((props, ref) => {
  return <ChakraModalContent {...props} ref={ref} />;
});

type ModalProps = ChakraModalProps & Pick<React.CSSProperties, 'overflow' | 'height'>;
const ModalBase: React.FC<ModalProps> = ({ children, overflow, height, ...props }) => {
  return (
    <ChakraModal {...props} isCentered>
      <ModalOverlayBase />
      <ModalContent h={height} overflow={overflow}>
        {children}
      </ModalContent>
    </ChakraModal>
  );
};

const ModalHeader: React.FC<ChakraModalHeaderProps> = forwardRef<ChakraModalHeaderProps, 'header'>(
  ({ children, ...props }, ref) => {
    const { onClose } = useModalContext();
    return (
      <ChakraModalHeader {...props} ref={ref}>
        <HStack justifyContent="space-between" p={4} w="100%">
          {typeof children === 'string' ? <T.HeadingLg>{children}</T.HeadingLg> : children}
          <Button onClick={onClose}>
            <Icon.X color="neutral.70" />
          </Button>
        </HStack>
        <Divider />
      </ChakraModalHeader>
    );
  }
);

type FooterProps = ChakraModalFooterProps & {
  confirmText?: string;
  onConfirm?: () => void;
  cancelText?: string;
  onCancel?: () => void;
  isDestructive?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
};
const ModalFooter: React.FC<FooterProps> = forwardRef<FooterProps, 'footer'>(
  (
    {
      children,
      onCancel,
      cancelText,
      isDestructive,
      onConfirm,
      confirmText,
      isDisabled,
      isLoading,
      ...props
    },
    ref
  ) => {
    return (
      <ChakraModalFooter {...props} ref={ref}>
        <Flex alignItems="start" direction="column" justifyContent="stretch" w="100%">
          <Divider />
          <HStack gap={1} justifyContent="flex-end" p={2} w="100%">
            {children}
          </HStack>
        </Flex>
      </ChakraModalFooter>
    );
  }
);

const ModalBody: React.FC<ChakraModalBodyProps> = forwardRef<ChakraModalBodyProps, 'div'>(
  (props, ref) => {
    return <ChakraModalBody data-test="modal-body" {...props} ref={ref} />;
  }
);

const Modal: typeof ModalBase & {
  Header: typeof ModalHeader;
  Footer: typeof ModalFooter;
  Body: typeof ModalBody;
} = Object.assign(ModalBase, {
  Header: ModalHeader,
  Footer: ModalFooter,
  Body: ModalBody
});

export default Modal;
