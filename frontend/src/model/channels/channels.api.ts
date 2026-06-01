import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../@redux/store";
import type {
  Channel,
  PostQueryArg,
  PatchQueryArg,
  DeleteQueryArg,
  DeleteResultType,
} from "./channels.types";
import { channelsActions } from "./channels.slice";

const channelsApi = createApi({
  reducerPath: "channels-api",
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
  tagTypes: ["ChannelsApi"],
  endpoints: (builder) => ({
    fetchChannels: builder.query<Channel[], void>({
      query: () => ({
        url: "api/v1/channels",
      }),
      async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
        // Делаем активным первый чат (channel)
        const { data } = await queryFulfilled;
        const { selectedChannel } = (getState() as RootState).channels;

        if (selectedChannel === null && data?.length > 0) {
          dispatch(channelsActions.select(data[0]));
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "ChannelsApi", id }) as const),
              { type: "ChannelsApi", id: "LIST" },
            ]
          : [{ type: "ChannelsApi", id: "LIST" }],
    }),
    postChannel: builder.mutation<Channel, PostQueryArg>({
      query: (body) => ({
        url: "api/v1/channels",
        method: "POST",
        body,
      }),
      invalidatesTags: (_, error) => {
        if (error) {
          return [];
        }

        return [{ type: "ChannelsApi", id: "LIST" }];
      },
    }),
    patchChannel: builder.mutation<Channel, PatchQueryArg>({
      query: ({ id, ...body }) => ({
        url: `/api/v1/channels/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_, error, { id }) => {
        if (error) {
          return [];
        }

        return [{ type: "ChannelsApi", id }];
      },
    }),
    deleteChannel: builder.mutation<DeleteResultType, DeleteQueryArg>({
      query: ({ id }) => ({
        url: `/api/v1/channels/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, error, { id }) => {
        if (error) {
          return [];
        }

        return [{ type: "ChannelsApi", id }];
      },
    }),
  }),
});

const {
  useFetchChannelsQuery,
  useLazyFetchChannelsQuery,
  usePostChannelMutation,
  usePatchChannelMutation,
  useDeleteChannelMutation,
} = channelsApi;

export {
  channelsApi,
  useFetchChannelsQuery,
  useLazyFetchChannelsQuery,
  usePostChannelMutation,
  usePatchChannelMutation,
  useDeleteChannelMutation,
};
