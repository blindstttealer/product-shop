import type { User } from '@/entities/user/model/types';

/** Maps `/api/user/me` or login payload to the app {@link User} model. */
export function mapSessionToUser(data: unknown): User | null {
  if (data == null || typeof data !== 'object') return null;
  const o = data as Record<string, unknown>;
  const id = o.id != null ? String(o.id) : undefined;
  const login = typeof o.login === 'string' ? o.login : undefined;
  const email = typeof o.email === 'string' ? o.email : undefined;
  if (!id && !login && !email) return null;
  return { id, login, email };
}
