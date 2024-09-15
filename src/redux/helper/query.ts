import { formatToLabel } from "@/components/helper/component";
import { BaseQueryApi, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { REDUX } from "../constant/slice";
import { ApiErrorSchema } from "@/model/api";
// import { RootState } from "../services/store";

export const getQueryHeaders = (
  headers: Headers,
  api: Pick<BaseQueryApi, "type" | "getState" | "extra" | "endpoint" | "forced">,
) => {
  // [TBC] add auth slice
  // const { getState } = api;
  // const state = getState() as RootState;
  // if (state && state.auth.access) {
  //   headers.set('Authorization', `Bearer ${state.auth.access}`);
  // }
  return headers;
};

export const getBaseFetchQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: getQueryHeaders,
});

/**
 * Tranforming Redux API query error response.
 */
export const transformErrorResponse = (returnValue: FetchBaseQueryError, meta: FetchBaseQueryMeta | undefined) => {
  const errorResponseValidation = ApiErrorSchema.safeParse(returnValue.data);
  const errorData = errorResponseValidation.data;

  return {
    status: meta?.response?.status || 400,
    message: errorData?.message || "Something went wrong",
    detail: errorData?.detail || "Something went wrong",
    hint: errorData?.hint,
    error: returnValue.data || {},
  };
};

/**
 * Formatting Redux Throw errors response.
 * @param error Error object from try catch block
 */
export const getApiError = (error: unknown) => {
  const errorResponseValidation = ApiErrorSchema.safeParse(error);
  const errorData = errorResponseValidation.data;

  const apiMessage = errorData?.error || {};
  let errors = {} as Record<string, any>;

  Object.keys(errorData?.error || {}).forEach((key) => {
    const err = apiMessage[key];
    if (typeof err === "object" && "detail" in err) {
      errors = {
        ...errors,
        [key]: formatToLabel(String(err["detail"])),
      };
      return;
    }
    if (!Array.isArray(err)) return;
    if (!err.length) return;
    errors = {
      ...errors,
      [key]: err[0],
    };
  });

  const keys = Object.keys(errorData?.error || {});

  return {
    code: errorData?.status || 400,
    message: errorData?.message || "Something went wrong",
    detail: errors?.detail || errorData?.detail || "Something went wrong",
    hint: errorData?.hint,
    error: errors,
    errors: Object.values(errors).join(", "),
    keys,
    key: !keys.length ? null : keys[0],
  };
};

/**
 * Transforming API Params.
 */
export const toQueryString = (params: IApiParams) => {
  const { order, orderBy, [REDUX.FIELD.KEY]: lastKey, ...otherParams } = params;
  const ordering = orderBy ? `${order === "asc" ? "" : "-"}${orderBy}` : "";
  const newParams = {
    ordering,
    ...otherParams,
  } as Record<string, any>;
  const queryString = new URLSearchParams(newParams).toString();
  return queryString;
};
