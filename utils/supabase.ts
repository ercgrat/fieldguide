import { SupabaseClient, User } from '@supabase/supabase-js';
import React, { useContext, useState } from 'react';
import { definitions } from 'types/supabase';

export const SupabaseContext = React.createContext<SupabaseClient>({} as SupabaseClient);

export const useSupabase = () => {
  return useContext(SupabaseContext);
};

export const useSupabaseUser = () => {
  const supabase = useSupabase();
  const [user, setUser] = useState<User | undefined>(supabase.auth.user() ?? undefined);
  supabase.auth.onAuthStateChange(() => {
    setUser(supabase.auth.user() ?? undefined);
  });
  return user;
};

export const useDatabase = () => {
  const supabase = useSupabase();

  return {
    members: supabase.from<definitions['members']>('members'),
    users: supabase.from<definitions['users']>('users')
  };
};
