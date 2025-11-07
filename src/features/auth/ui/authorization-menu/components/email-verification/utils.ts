export function getTokenFromSearch(search: string): string | null {
  const params = new URLSearchParams(search);
  return params.get('token');
}
