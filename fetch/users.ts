import { useMutation, useQuery } from 'react-query';
import { definitions } from 'types/supabase';
import { QueryKey } from 'utils/enums';
import { handleError } from 'utils/error';
import { useDatabase } from 'utils/supabase';

export const useSelectUserQuery = (userID: string | undefined, options?: { enabled?: boolean }) => {
  const { enabled = true } = options ?? {};

  const { users } = useDatabase();

  const result = useQuery(
    [QueryKey.User, userID],
    async () => await users.select().eq('user_id', userID),
    {
      enabled: enabled && !!userID,
      cacheTime: Number.POSITIVE_INFINITY,
      staleTime: Number.POSITIVE_INFINITY,
      onError: (e: Error) => handleError(e),
      onSuccess: data => {
        if (data.error) {
          handleError(new Error(data.error.message));
          return;
        }
      }
    }
  );

  return {
    ...result,
    data: result.data?.body?.[0]
  };
};

export const useInsertUserMutation = (user: definitions['users'], onSuccess: () => void) => {
  const { users } = useDatabase();
  return useMutation(
    [QueryKey.User, user.user_id],
    async () =>
      await users.insert(user, {
        returning: 'minimal'
      }),
    {
      onSuccess: data => {
        if (data.error) {
          handleError(new Error(data.error.message));
          return;
        }
        onSuccess();
      },
      onError: (e: Error) => handleError(e)
    }
  );
};
