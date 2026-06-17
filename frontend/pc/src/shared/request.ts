import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import type { RestfulAPIResponse } from '@agent-project-app/shared'

export const request: AxiosInstance = axios.create({
  baseURL: '/llm',
  timeout: 10000,
})

request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  (error: AxiosError) => Promise.reject(error),
)

request.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => Promise.reject(error),
)

export const get = <T = unknown>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<RestfulAPIResponse<T>> =>
  request.get<RestfulAPIResponse<T>, RestfulAPIResponse<T>>(url, config)

export const post = <T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>,
): Promise<RestfulAPIResponse<T>> =>
  request.post<RestfulAPIResponse<T>, RestfulAPIResponse<T>, D>(
    url,
    data,
    config,
  )

export const put = <T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>,
): Promise<RestfulAPIResponse<T>> =>
  request.put<RestfulAPIResponse<T>, RestfulAPIResponse<T>, D>(
    url,
    data,
    config,
  )

export const del = <T = unknown>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<RestfulAPIResponse<T>> =>
  request.delete<RestfulAPIResponse<T>, RestfulAPIResponse<T>>(url, config)

export default request
