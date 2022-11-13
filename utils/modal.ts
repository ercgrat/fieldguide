import { useCallback, useState } from 'react';

export const useDisclosure = (defaultIsOpen = false) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onToggle = useCallback(() => setIsOpen(open => !open), []);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle
  };
};
