type IApiProps = {
  params?: IApiParams;
  skip?: boolean;
  ignore?: string[];
};

type IApiPostProps<T = Record<string, IValue>> = {
  payload: T;
};

type IApiPutProps<T = Record<string, IValue>> = {
  id: ID;
  payload: T;
};

type IApiParams = Record<string, any>;

type IOrdering = Record<string, IValue> & {
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
  data?: T;
};

type IApiResponse<T, U = Record<string, IValue>> = IApiSuccessResponse<T> | IApiErrorResponse<U>;

type IList<T> = {
  count: number;
  results: T[];
};
