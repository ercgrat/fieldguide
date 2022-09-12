import { APIQueryParams } from 'types/backend';
import { stringifyParams } from './fetch';

const API = '/api';

export default {
  organizations: (params?: APIQueryParams.Organization) =>
    `${API}/organizations?${stringifyParams(params)}`,
  users: (params: APIQueryParams.User) => `${API}/users?${stringifyParams(params)}`
};
