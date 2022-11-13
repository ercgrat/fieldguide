import { APIQueryParams } from 'types/backend';
import { stringifyParams } from './fetch';

const API = '/api';
const url = (path: string, params?: Record<string | number, unknown>) =>
  `${API}/${path}${params ? `?${stringifyParams(params)}` : ''}`;

export default {
  crops: (params?: APIQueryParams.Crop) => url('crops', params),
  organizations: (params?: APIQueryParams.Organization) => url('organizations', params),
  users: (params: APIQueryParams.User) => url('users', params)
};
