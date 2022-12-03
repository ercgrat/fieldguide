import { Organization } from '@prisma/client';
import axios from 'axios';
import { useMemo } from 'react';
import { useMutation, useQuery } from 'react-query';
import { APIRequestBody } from 'types/backend';
import { QueryKey } from 'utils/enums';
import { useErrorHandler } from 'utils/error';
import { useDebouncedQuery } from 'utils/timing';
import urls from 'utils/urls';
import { useCurrentUserQuery } from './users';

export const useCurrentOrganizationsQuery = () => {
  const { data: user, isFetching } = useCurrentUserQuery();
  const userId = user?.id ?? '';
  const { handleError } = useErrorHandler();

  const queryResult = useQuery<Organization[], Error>(
    [QueryKey.Organization, { userId }],
    async () => {
      const { data } = await axios.get<Organization[]>(urls.organizations({ userId }));
      return data;
    },
    {
      enabled: !!userId,
      onError: handleError
    }
  );

  return {
    ...queryResult,
    isFetching: isFetching || queryResult.isFetching
  };
};

export type OrganizationNameCheckQueryKey = {
  name: string;
};
export const useOrganizationNameCheckQuery = (name: string) => {
  const subKey: OrganizationNameCheckQueryKey = useMemo(() => ({ name }), [name]);
  const queryKey = useMemo(() => [QueryKey.Organization, subKey], [subKey]);
  const queryFn = useMemo(() => {
    return async () => {
      const { data } = await axios.get<Organization[]>(urls.organizations({ name }));
      return data;
    };
  }, [name]);
  const { handleError } = useErrorHandler();
  return useDebouncedQuery<Organization[], Error>(queryKey, queryFn, {
    enabled: !!name,
    onError: handleError
  });
};

export const useCreateOrganizationMutation = (args?: {
  onSuccess?:
    | ((
        data: Organization,
        variables: APIRequestBody.CreateOrganization,
        context: unknown
      ) => void | Promise<unknown>)
    | undefined;
}) => {
  const { handleError } = useErrorHandler();
  return useMutation<Organization, Error, APIRequestBody.CreateOrganization>(
    [QueryKey.Organization],
    organization => axios.post(urls.organizations(), organization),
    {
      onError: handleError,
      onSuccess: args?.onSuccess
    }
  );
};
