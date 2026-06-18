export interface RestfulAPIResponse<T> {
  code: number;
  message: string;
  data: T;
}

export enum RESTFULAPICODE {
  SUCCESS = 200, // 成功
  TIMEOUT = 408, // 超时
  UNAUTHORIZED = 401, // 未授权
  ERROR = 400, // 错误
}

export const RESTFULAPIERROR = {
  [RESTFULAPICODE.TIMEOUT]: "接口超时，请稍后重试",
  [RESTFULAPICODE.UNAUTHORIZED]: "未授权",
  [RESTFULAPICODE.ERROR]: "未知错误",
  [RESTFULAPICODE.SUCCESS]: "成功",
};

export function formatResponse<T = any>(data: T, code: RESTFULAPICODE = RESTFULAPICODE.SUCCESS): RestfulAPIResponse<T> {
  return {
    code,
    message: RESTFULAPIERROR[code],
    data,
  };
}

export function formatDefaultResponse(code: RESTFULAPICODE = RESTFULAPICODE.SUCCESS): RestfulAPIResponse<null> {
  return formatResponse(null, code);
}

export function formatErrorResponse<T>(message: string, code: RESTFULAPICODE = RESTFULAPICODE.ERROR): RestfulAPIResponse<T | null> {
  return {
    code,
    message,
    data: null,
  };
}
