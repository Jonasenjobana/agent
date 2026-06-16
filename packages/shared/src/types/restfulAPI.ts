export interface RestfulAPIResponse<T> {
  code: number;
  message: string;
  data: T;
}
