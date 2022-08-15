import queryString from 'qs';

export type StringifyURLParams = {
  [key: string]: string | number | null | boolean | undefined | number[] | string[];
};
export const stringifyParams = <T = StringifyURLParams>(params?: T): string => {
  if (!params) {
    return '';
  }
  return queryString.stringify(params, {
    encode: true,
    indices: false,
    addQueryPrefix: false,
    arrayFormat: 'repeat'
  });
};
