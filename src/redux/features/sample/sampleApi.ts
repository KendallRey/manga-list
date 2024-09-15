import { REDUX } from "@/redux/constant/slice";
import { getBaseFetchQuery, toQueryString, transformErrorResponse } from "@/redux/helper/query";
import { createApi } from "@reduxjs/toolkit/query/react";

const TAGS = [REDUX.API.TAGS.SAMPLE_LIST, REDUX.API.TAGS.SAMPLE_ID];

export const sampleApi = createApi({
  reducerPath: REDUX.API.SAMPLE,
  baseQuery: getBaseFetchQuery,
  tagTypes: TAGS,
  endpoints: (builder) => ({
    getSampleList: builder.query<any, IApiParams>({
      query: (params) => {
        const qs = toQueryString(params);
        return `/api/sample/list?${qs}`;
      },
      transformErrorResponse: transformErrorResponse,
      providesTags: [REDUX.API.TAGS.SAMPLE_LIST],
    }),
    getSampleById: builder.query<any, string>({
      query: (id) => `/api/sample/${id}`,
      transformErrorResponse: transformErrorResponse,
      providesTags: [REDUX.API.TAGS.SAMPLE_ID],
    }),
    createSample: builder.mutation<any, any>({
      query: (data) => ({
        url: `/api/sample/`,
        method: "POST",
        body: data,
      }),
      transformErrorResponse: transformErrorResponse,
      invalidatesTags: [REDUX.API.TAGS.SAMPLE_ID, REDUX.API.TAGS.SAMPLE_LIST],
    }),
    updateSample: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/api/sample/${id}`,
        method: "PUT",
        body: data,
      }),
      transformErrorResponse: transformErrorResponse,
      invalidatesTags: [REDUX.API.TAGS.SAMPLE_ID, REDUX.API.TAGS.SAMPLE_LIST],
    }),
    patchSample: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/api/sample/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformErrorResponse: transformErrorResponse,
      invalidatesTags: [REDUX.API.TAGS.SAMPLE_ID, REDUX.API.TAGS.SAMPLE_LIST],
    }),
    deleteSample: builder.mutation<any, any>({
      query: (id) => ({
        url: `/api/sample/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: transformErrorResponse,
      invalidatesTags: [REDUX.API.TAGS.SAMPLE_ID, REDUX.API.TAGS.SAMPLE_LIST],
    }),
  }),
});

export const {
  useCreateSampleMutation,
  useDeleteSampleMutation,
  useGetSampleByIdQuery,
  useGetSampleListQuery,
  useLazyGetSampleByIdQuery,
  useLazyGetSampleListQuery,
  usePatchSampleMutation,
  useUpdateSampleMutation,
} = sampleApi;
