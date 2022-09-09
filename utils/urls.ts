import { stringifyParams } from './fetch';

const API = '/api';

export default {
  user: {
    get: (params: { email: string }) => `${API}/user/get?${stringifyParams(params)}`
  }
};
