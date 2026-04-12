import Axios, { AxiosError, AxiosRequestConfig } from 'axios';

/**
 * Axios instance used by Orval-generated React Query hooks.
 * Aligns with {@link apiService} defaults (base URL, cookies).
 */
export const orvalAxiosInstance = Axios.create({
  baseURL: process.env.REACT_APP_API_URL ?? '',
  withCredentials: true,
  timeout: 10_000,
});

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => orvalAxiosInstance({ ...config, ...options }).then(({ data }) => data);

export type ErrorType<Error> = AxiosError<Error>;
export type BodyType<BodyData> = BodyData;
