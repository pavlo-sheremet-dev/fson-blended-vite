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
      query: () => "/comments",
      providesTags: ["Comment"],
    }),
    postComment: builder.mutation({
      query: (comment) => ({
        url: "/comments",
        method: "POST",

        body: comment,
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const { useGetCommentsQuery, usePostCommentMutation } = commentApi;
