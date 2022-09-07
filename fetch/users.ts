import { useMutation, useQuery } from 'react-query';
import { definitions } from 'types/supabase';
import { QueryKey } from 'utils/enums';
import { handleError } from 'utils/error';
import { useDatabase, useSupabase } from 'utils/supabase';

export const useSelectUserQuery = () => {
  const supabase = useSupabase();
  const user = supabase.auth.user();
  const { users } = useDatabase();

  const { data: res } = useQuery(
    [QueryKey.User, user?.id],
    async () => await users.select().eq('user_id', user?.id).single(),
    {
      enabled: !!user?.id,
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

  return res?.body;
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
