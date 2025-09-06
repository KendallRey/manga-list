type ApiPropsType = {
  params?: ApiParamsType;
  skip?: boolean;
  ignore?: string[];
  defaultParams?: ApiParamsType;
  overrideParams?: ApiParamsType;
};

type ApiPostPropsType<T = Record<string, IValue>> = {
  payload: T;
};

type ApiPutPropsType<T = Record<string, IValue>> = {
  id: ID;
  payload: T;
};

type ApiParamsType = Record<string, any>;

type OrderingType = Record<string, IValue> & {
  order?: "asc" | "desc" | false;
  orderBy?: string;
};

type ApiSuccessResponseType<T> = {
  status: "ok";
  code: number;
  data: T;
  error?: null;
};

type ApiErrorResponseType<T> = {
  status: null;
  code: number;
  error: string;
  data?: T | null;
};

type ApiResponseType<T, U = Record<string, IValue>> = ApiSuccessResponseType<T> | ApiErrorResponseType<T>;

type ListType<T> = {
  count: number;
  results: T[];
};
