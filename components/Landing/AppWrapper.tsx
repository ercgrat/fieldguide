import { Container, createStyles } from '@mantine/core';
import React from 'react';

const useStyles = createStyles(theme => ({
  container: {
    width: '100vw',
    maxWidth: 'unset',
    height: '100vh',
    margin: 0,
    padding: 0,
    backgroundColor: theme.colors.davysGrey[0]
  }
}));
const AppWrapper: Relay.FCWithChildren = ({ children }) => {
  const { classes } = useStyles();

  return <Container className={classes.container}>{children}</Container>;
};

export default React.memo(AppWrapper);
