import API from "../API";

export const toSearchParams = (params?: IApiParams) => {
  const newParams = new URLSearchParams(params);
  return newParams;
};

type ISuccessResponse<T> = {
  data: T;
  code?: number;
};

export const successResponse = <T>(props: ISuccessResponse<T>): IApiSuccessResponse<T> => {
  const { code = API.CODE.SUCCESS.OK, data } = props;
  return {
    status: "ok",
    code: code,
    data: data as T,
  };
};

type IErrorResponse<T> = {
  data?: T;
  code?: number;
};

export const errorResponse = <T = Record<string, IValue>>(props: IErrorResponse<T>): IApiErrorResponse<T> => {
  const { code = API.CODE.ERROR.BAD_REQUEST, data = {} } = props;
  return {
    status: null,
    code: code,
    data: data as T,
    error: "Process failed...",
  };
};
