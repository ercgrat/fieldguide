import { SupabaseClient } from '@supabase/supabase-js';
import React, { useContext } from 'react';
import { definitions } from 'types/supabase';

export const SupabaseContext = React.createContext<SupabaseClient>({} as SupabaseClient);

export const useSupabase = () => {
  return useContext(SupabaseContext);
};

export const useDatabase = () => {
  const supabase = useSupabase();

  return {
    members: supabase.from<definitions['members']>('members'),
    users: supabase.from<definitions['users']>('users')
  };
};
