import { Card, createStyles } from '@mantine/core';
import React from 'react';

const useStyles = createStyles(() => ({
  loginCard: {
    width: '30rem',
    maxWidth: '90vw'
  }
}));

const AuthCard: Relay.FCWithChildren = ({ children }) => {
  const { classes } = useStyles();
  return (
    <Card className={classes.loginCard} shadow="md">
      {children}
    </Card>
  );
};

export default React.memo(AuthCard);
