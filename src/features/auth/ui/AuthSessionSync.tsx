import { useEffect } from 'react';
import { useUserControllerGetMe } from '@/api/generated/user/user';
import { userStore } from '@/entities/user/model/userStore';
import { mapSessionToUser } from '../lib/mapSessionUser';
import { sessionUserQueryOptions } from '../lib/sessionUserQueryOptions';

export function AuthSessionSync() {
  const { data, isSuccess, isError } = useUserControllerGetMe({
    query: sessionUserQueryOptions,
  });

  useEffect(() => {
    if (isSuccess) {
      userStore.setUser(mapSessionToUser(data));
    } else if (isError) {
      userStore.setUser(null);
    }
  }, [isSuccess, isError, data]);

  return null;
}
