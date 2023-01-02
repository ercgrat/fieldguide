import { Crop } from '@prisma/client';
import { APIQueryParams } from 'types/backend';
import { stringifyParams } from './fetch';

const API = '/api';
const url = (path: string, params?: Record<string | number, unknown>) =>
  `${API}/${path}${params ? `?${stringifyParams(params)}` : ''}`;

export default {
  crops: (params?: Partial<Crop>) => url('crops', params),
  organizations: (params?: APIQueryParams.OrganizationRead) => url('organizations', params),
  units: (params?: APIQueryParams.UnitRead) => url('units', params),
  users: (params: APIQueryParams.UserRead) => url('users', params)
};
