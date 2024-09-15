type IApiProps = {
  params?: IApiParams;
  skip?: boolean;
};

type IApiPostProps<T = Record<string, any>> = {
  payload: T;
};

type IApiParams = Record<string, any>;

type IOrdering = Record<string, any> & {
  order?: "asc" | "desc" | false;
  orderBy?: string;
};

type IApiSuccessResponse<T> = {
  status: "ok";
  code: number;
  data: T;
  error?: null;
};

type IApiErrorResponse<T> = {
  status: null;
  code: number;
  error: string;
};

type IApiResponse<T, U = any> = IApiSuccessResponse<T> | IApiErrorResponse<U>;
