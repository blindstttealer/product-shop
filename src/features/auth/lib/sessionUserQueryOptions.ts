/** Shared options for {@link useUserControllerGetMe} (session bootstrap). */
export const sessionUserQueryOptions = {
  retry: false,
  staleTime: 60_000,
  refetchOnWindowFocus: true,
} as const;
