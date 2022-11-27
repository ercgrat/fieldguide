import React, { useCallback, useRef } from 'react';
import { Card, HStack, Radio, Stack, T } from 'fgui';

type Props = {
  children: React.ReactNode;
  label: string;
  value: string;
  selectedValue: string;
};
const RadioCard: React.FC<Props> = ({ children, label, value, selectedValue }) => {
  const radioRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    radioRef.current?.click();
  }, []);

  return (
    <Card onClick={handleClick} p={6} shadow="sm">
      <Stack>
        <HStack justifyContent="space-between">
          <T.H2>{label}</T.H2>
          <Radio isChecked={selectedValue === value} ref={radioRef} size="md" value={value} />
        </HStack>
        <Stack justify="space-between">{children}</Stack>
      </Stack>
    </Card>
  );
};

export default React.memo(RadioCard);
