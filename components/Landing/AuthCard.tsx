import { Card } from 'fgui';
import React from 'react';

type Props = {
  children: React.ReactNode;
};
const AuthCard: React.FC<Props> = ({ children }) => {
  return <Card shadow="md">{children}</Card>;
};

export default React.memo(AuthCard);
