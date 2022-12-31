import { Organization } from '@prisma/client';
import React, { useContext } from 'react';

export const OrganizationContext = React.createContext<Organization | null>(null);

export const useOrganization = () => {
  const organization: Partial<Organization> = useContext(OrganizationContext) ?? {};

  return {
    organization,
    bedLengthUnits: organization?.unitSystem === 'Metric' ? 'm' : 'ft',
    inRowSpacingUnits: organization?.unitSystem === 'Metric' ? 'cm' : 'in'
  };
};
