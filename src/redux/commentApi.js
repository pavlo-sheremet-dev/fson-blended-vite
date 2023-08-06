import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_ENDPOINT = "/comments";
const BASE_URL = "https://637785ab81a568fc2518138f.mockapi.io/api";

export const commentApi = createApi({
  reducerPath: "comments",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Comments"],
  endpoints: (builder) => ({
    getComments: builder.query({
      query: () => "/comments",
      providesTags: ["Comments"],
    }),
    addNewComment: builder.mutation({
      query: (newComment) => ({
        url: "/comments",
        method: "POST",
        body: newComment,
      }),
      invalidatesTags: ["Comments"],
    }),
    addFeedBack: builder.mutation({
      query: ({ id, ...newFeedBack }) => ({
        url: `/comments/${id}`,
        method: "PUT",
        body: newFeedBack,
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const { useGetCommentsQuery, useAddNewCommentMutation, useAddFeedBackMutation } = commentApi;

// slice
// operations
// selectors

// commentApi =
