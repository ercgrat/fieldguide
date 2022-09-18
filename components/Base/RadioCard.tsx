import { createStyles, Group, Paper, Radio, Stack } from '@mantine/core';
import React, { useCallback, useRef } from 'react';
import T from './T';

interface RadioProps {
  isSelected: boolean;
}
const useStyles = createStyles((theme, { isSelected }: RadioProps) => ({
  paper: {
    cursor: 'pointer',
    boxShadow: isSelected ? `0px 0px 6px ${theme.colors.middleBlue[5]}` : undefined,
    transition: '.5s box-shadow'
  },
  outerStack: {
    height: '100%'
  },
  innerStack: {
    flexGrow: 1
  }
}));

type Props = {
  children: React.ReactNode;
  label: string;
  value: string;
  selectedValue: string;
};
const RadioCard: React.FC<Props> = ({ children, label, value, selectedValue }) => {
  const radioRef = useRef<HTMLInputElement>(null);
  const { classes } = useStyles({ isSelected: selectedValue === value });

  const handleClick = useCallback(() => {
    radioRef.current?.click();
  }, []);

  return (
    <Paper className={classes.paper} onClick={handleClick} p={16} shadow="sm">
      <Stack className={classes.outerStack}>
        <Group position="apart">
          <T.Subtitle>{label}</T.Subtitle>
          <Radio ref={radioRef} size="md" value={value} />
        </Group>
        <Stack className={classes.innerStack} justify="space-between">
          {children}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default React.memo(RadioCard);
