import { Organization } from '@prisma/client';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { APIRequestBody } from 'types/backend';
import { QueryKey } from 'utils/enums';
import { handleError } from 'utils/error';
import { useDebouncedQuery } from 'utils/timing';
import urls from 'utils/urls';
import { useCurrentUserQuery } from './users';

export const useCurrentOrganizationsQuery = () => {
  const { data: user } = useCurrentUserQuery();
  const userId = user?.id ?? '';

  return useQuery<Organization[], Error>(
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
};

export const useOrganizationNameCheckQuery = (name: string) => {
  return useDebouncedQuery<Organization[], Error>(
    [QueryKey.Organization, { name }],
    async () => {
      const { data } = await axios.get<Organization[]>(urls.organizations({ name }));
      return data;
    },
    {
      enabled: !!name,
      onError: handleError
    }
  );
};

export const useCreateOrganizationMutation = () => {
  return useMutation<Organization, Error, APIRequestBody.CreateOrganization>(
    [QueryKey.Organization],
    organization => axios.post(urls.organizations(), organization),
    {
      onError: handleError
    }
  );
};
