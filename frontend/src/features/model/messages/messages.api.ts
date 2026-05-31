import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../../@redux/store";
import type {
  Message,
  PostQueryArg,
  PatchQueryArg,
  DeleteQueryArg,
  DeleteResultType,
} from "./messages.types";

const messagesApi = createApi({
  reducerPath: "messages-api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["MessagesApi"],
  endpoints: (builder) => ({
    fetchMessages: builder.query<Message[], void>({
      query: () => ({
        url: "api/v1/messages",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "MessagesApi", id }) as const),
              { type: "MessagesApi", id: "LIST" },
            ]
          : [{ type: "MessagesApi", id: "LIST" }],
    }),
    postMessage: builder.mutation<Message, PostQueryArg>({
      query: (body) => ({
        url: "api/v1/messages",
        method: "POST",
        body,
      }),
      invalidatesTags: (_, error) => {
        if (error) {
          return [];
        }

        return [{ type: "MessagesApi", id: "LIST" }];
      },
    }),
    patchMessage: builder.mutation<Message, PatchQueryArg>({
      query: ({ body: id, ...body }) => ({
        url: `/api/v1/messages/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_, error, { id }) => {
        if (error) {
          return [];
        }

        return [{ type: "MessagesApi", id }];
      },
    }),
    deleteMessage: builder.mutation<DeleteResultType, DeleteQueryArg>({
      query: ({ id }) => ({
        url: `/api/v1/messages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, error, { id }) => {
        if (error) {
          return [];
        }

        return [{ type: "MessagesApi", id }];
      },
    }),
  }),
});

const {
  useFetchMessagesQuery,
  useLazyFetchMessagesQuery,
  usePostMessageMutation,
  usePatchMessageMutation,
  useDeleteMessageMutation,
} = messagesApi;

export {
  messagesApi,
  useFetchMessagesQuery,
  useLazyFetchMessagesQuery,
  usePostMessageMutation,
  usePatchMessageMutation,
  useDeleteMessageMutation,
};
