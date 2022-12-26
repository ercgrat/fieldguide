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
  const isChecked = selectedValue === value;

  const handleClick = useCallback(() => {
    radioRef.current?.click();
  }, []);

  return (
    <Card
      border="solid 1px"
      borderColor={isChecked ? 'cornflower.100' : 'transparent'}
      boxSizing="border-box"
      cursor="pointer"
      onClick={handleClick}
      p={6}
      shadow="sm"
    >
      <Stack>
        <HStack justifyContent="space-between">
          <T.HeadingMd>{label}</T.HeadingMd>
          <Radio isChecked={isChecked} ref={radioRef} size="md" value={value} />
        </HStack>
        <Stack justify="space-between">{children}</Stack>
      </Stack>
    </Card>
  );
};

export default React.memo(RadioCard);
