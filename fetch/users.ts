import { User } from '@prisma/client';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import { QueryKey } from 'utils/enums';
import { handleError } from 'utils/error';
import urls from 'utils/urls';

export const useCurrentUserQuery = () => {
  const { data: sessionData, status } = useSession();
  const email = sessionData?.user?.email ?? '';

  return useQuery<User, Error>(
    [QueryKey.User, email],
    async () => {
      const { data } = await axios.get<User>(urls.users.get({ email }));
      return data;
    },
    {
      enabled: status === 'authenticated',
      cacheTime: Number.POSITIVE_INFINITY,
      staleTime: Number.POSITIVE_INFINITY,
      onError: handleError
    }
  );
};
