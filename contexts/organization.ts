import { Organization } from '@prisma/client';
import React from 'react';

export const OrganizationContext = React.createContext<Organization | null>(null);
