import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_ENDPOINT = "/comments";
const BASE_URL = "https://637785ab81a568fc2518138f.mockapi.io/api";

export const commentApi = createApi({
  reducerPath: "comments",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Comment"],
  endpoints: (builder) => ({
    getComments: builder.query({
      // query: () => ({ url: "/comments", method: "GET" }),
      query: () => API_ENDPOINT,
      providesTags: ["Comment"],
    }),
    postComment: builder.mutation({
      query: (comment) => ({
        url: API_ENDPOINT,
        method: "POST",

        body: comment,
      }),
      invalidatesTags: ["Comment"],
    }),
    updateComment: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `${API_ENDPOINT}/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  usePostCommentMutation,
  useUpdateCommentMutation,
} = commentApi;
