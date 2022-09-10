import { stringifyParams } from './fetch';

const API = '/api';

export default {
  organizations: {
    get: (params: { userId: string }) => `${API}/organizations/get?${stringifyParams(params)}`
  },
  users: {
    get: (params: { email: string }) => `${API}/users/get?${stringifyParams(params)}`
  }
};
