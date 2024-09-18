import API from "../API";

/**
 * Converts an object or IApiParams into URLSearchParams, with optional default parameters.
 *
 * @param {IApiParams} [params] - The parameters to be converted.
 * @param {Record<string, any>} [defaultParams] - Default parameters that will be merged with the provided `params`. These will only be included if not overridden by `params`.
 * @returns {URLSearchParams} - The URLSearchParams object generated from the combined `params` and `defaultParams`.
 *
 * @example
 * ```ts
 * const params = toSearchParams({ q: 'search' }, { limit: 10 });
 * console.log(params.toString()); // Output: "q=search&limit=10"
 * ```
 */
export const toSearchParams = (params?: IApiParams, defaultParams?: Record<string, any>): URLSearchParams => {
  let _params: IApiParams = {};
  if (params instanceof URLSearchParams) {
    params.forEach((value, key) => {
      _params[key] = value;
    });
  } else {
    _params = params ?? {};
  }
  const newParams = new URLSearchParams({ ..._params, ...defaultParams });
  return newParams;
};

/**
 * Parses URLSearchParams or IApiParams into a plain object, converting strings to numbers or booleans where possible.
 *
 * @param {IApiParams | URLSearchParams} [params] - The input parameters to parse.
 * @returns {Record<string, any>} - An object containing parsed values, with numbers and booleans automatically converted.
 *
 * @example
 * ```ts
 * const paramsObj = parseSearchParams('q=search&limit=10');
 * console.log(paramsObj); // Output: { limit: 10 }
 * ```
 */
export const parseSearchParams = (params?: IApiParams | URLSearchParams): Record<string, any> => {
  const search = toSearchParams(params);
  const USED_KEYS = Object.values(API.PARAMS.KEYS) as string[];

  const paramsObj: Record<string, any> = {};
  search.forEach((value, key) => {
    if (USED_KEYS.includes(key)) return;
    const numberValue = Number(value);
    const booleanValue = value === "true" ? true : value === "false" ? false : null;
    if (!isNaN(numberValue)) {
      paramsObj[key] = numberValue;
    } else if (typeof booleanValue === "boolean") {
      paramsObj[key] = booleanValue;
    } else {
      paramsObj[key] = value;
    }
  });

  return paramsObj;
};

/**
 * Extracts search parameters and converts them into an object with predefined keys and defaults.
 *
 * @param {IApiParams | URLSearchParams} [params] - The input search parameters.
 * @returns {Record<string, any>} - An object with parsed search parameters, including defaults for `q`, `page`, and `limit`.
 *
 * @example
 * ```ts
 * const searchParams = getSearchParams('q=search&page=2');
 * console.log(searchParams); // Output: { q: 'search', page: 2, limit: 10 }
 * ```
 */
export const getSearchParams = (params?: IApiParams | URLSearchParams): Record<string, any> => {
  const search = toSearchParams(params);

  const q = search.get(API.PARAMS.KEYS.Q);
  const page = Number(search.get(API.PARAMS.KEYS.PAGE)) || 1;
  const limit = Number(search.get(API.PARAMS.KEYS.LIMIT)) || API.PARAMS.DEFAULT.LIMIT;

  const paramsObj = parseSearchParams(search);

  return {
    ...paramsObj,
    q,
    page,
    limit,
  };
};

export const getOrderingParams = (params?: IApiParams | URLSearchParams): Record<string | "order" | "key", any> => {
  const search = toSearchParams(params);

  let _key = "";
  let _order = "";
  const orderingParams: Record<string, any> = {};
  const paramsObj = parseSearchParams(search);

  const paramsKeys = Object.keys(paramsObj);

  paramsKeys.forEach((key) => {
    const value = paramsObj[key];
    if (value !== "desc" && value !== "asc") return;
    orderingParams[key] = value;
    _key = key;
    _order = value;
  });

  return {
    ...orderingParams,
    key: _key,
    order: _order,
    ordering: { order: _order, orderBy: _key },
  };
};

type ISuccessResponse<T> = {
  data: T;
  code?: number;
};

/**
 * Creates a success response object.
 *
 * @template T
 * @param {ISuccessResponse<T>} props - The properties for the success response.
 * @returns {IApiSuccessResponse<T>} - The formatted success response object.
 *
 * @example
 * ```ts
 * const response = successResponse({ data: { id: 1, name: 'John' } });
 * console.log(response); // Output: { status: "ok", code: 200, data: { id: 1, name: "John" } }
 * ```
 */
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
  error?: string;
};

/**
 * Creates an error response object.
 *
 * @template T
 * @param {IErrorResponse<T>} props - The properties for the error response.
 * @returns {IApiErrorResponse<T>} - The formatted error response object.
 *
 * @example
 * ```ts
 * const response = errorResponse({ data: null });
 * console.log(response); // Output: { status: null, code: 400, data: {}, error: "Process failed..." }
 * ```
 */
export const errorResponse = <T = any>(props: IErrorResponse<T>): IApiErrorResponse<T> => {
  const { code = API.CODE.ERROR.BAD_REQUEST, data = {}, error } = props;
  return {
    status: null,
    code: code,
    data: data as T,
    error: error || "Process failed...",
  };
};
