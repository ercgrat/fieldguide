import { Organization } from '@prisma/client';
import axios from 'axios';
import { useQuery } from 'react-query';
import { QueryKey } from 'utils/enums';
import { handleError } from 'utils/error';
import urls from 'utils/urls';
import { useCurrentUserQuery } from './users';

export const useCurrentOrganizationsQuery = () => {
  const { data: user } = useCurrentUserQuery();
  const userId = user?.id ?? '';

  return useQuery<Organization[], Error>(
    [QueryKey.User, userId],
    async () => {
      const { data } = await axios.get<Organization[]>(urls.organizations.get({ userId }));
      return data;
    },
    {
      enabled: !!userId,
      onError: handleError
    }
  );
};
